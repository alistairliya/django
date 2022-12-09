from django.shortcuts import render

from rest_framework import viewsets
from .serializers import *
from mybusiness.models import * 
from rest_framework import permissions
from myapi.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from myapi.permissions import IsOwnerOrReadOnly, IsOwnerOrCreator
# Create your views here.
class MyBusinessView(viewsets.ModelViewSet):
    
    #queryset = MyBusiness.objects.filter(created_by = 1) #MyBusiness.objects.all()
    queryset = MyBusiness.objects.all() #get_queryset() 
    
    serializer_class = MyBusinessSerializer
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                  IsOwnerOrReadOnly]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrCreator]
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


    def get_queryset(self):
        # A user should only see instances that
        # - he is a creator of 
        # - he is an owner of
        # Business_User related to the request user
        # somehow append the business attribute into queryset
        
        request_user = self.request.user 
        # User is the creator of:
        qs = self.queryset.filter(created_by = request_user.id)
        # User is the owner of:
        #   Query Business_User where user == request_user
        #   Loop over the result to collect the businesses (ids)
        #   Creat queryset based on the collection
        #   The query below will crash if user not authenticated.
        owner_businesses =list( Business_User.objects.filter(user = request_user).values_list('business', flat=True)) 
        q2 = self.queryset.filter(pk__in = owner_businesses)

        qs |= q2

        return qs
    

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = MyUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class GenderViewSet(viewsets.ModelViewSet):
    queryset = Gender.objects.all()
    serializer_class = GenderSerializer

class BusinessTypeViewSet(viewsets.ModelViewSet):
    queryset = BusinessType.objects.all()
    serializer_class = BusinessTypeSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductTypeViewSet(viewsets.ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer

class BusinessStatusViewSet(viewsets.ModelViewSet):
    queryset = BusinessStatus.objects.all()
    serializer_class = BusinessStatusSerializer

class BusinessUserRoleViewSet(viewsets.ModelViewSet):
    queryset = BusinessUserRole.objects.all()
    serializer_class = BusinessUserRoleSerializer

class BusinessUserViewSet(viewsets.ModelViewSet):
    queryset = Business_User.objects.all()
    serializer_class = BusinessUserSerializer
