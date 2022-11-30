from django.shortcuts import render

from rest_framework import viewsets
from .serializers import *
from mybusiness.models import * 
from rest_framework import permissions

# Create your views here.

class MyBusinessView(viewsets.ModelViewSet):
    serializer_class = MyBusinessSerializer
    queryset = MyBusiness.objects.all()

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = MyUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]