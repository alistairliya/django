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
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication

# Create your views here.
class MyBusinessView(viewsets.ModelViewSet):
    
    #queryset = MyBusiness.objects.filter(created_by = 1) #MyBusiness.objects.all()
    queryset = MyBusiness.objects.all() #get_queryset() 
    
    serializer_class = MyBusinessSerializer
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                  IsOwnerOrReadOnly]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]
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
        qs |= self.queryset.filter(pk__in = owner_businesses)
        return qs
    
class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = MyUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]
    def get_queryset(self):
        queryset = Client.objects.all()
        client_first_name = self.request.query_params.get('first_name')
        client_last_name = self.request.query_params.get('last_name')
        if client_last_name is not None:
            queryset = queryset.filter(last_name__icontains = client_last_name)
        if client_first_name is not None:
            queryset = queryset.filter(first_name__icontains = client_first_name)
        return queryset

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

class ComplianceEntityViewSet(viewsets.ModelViewSet):
    queryset = ComplianceEntity.objects.all()
    serializer_class = ComplianceEntitySerializer

class BusinessComplianceViewSet(viewsets.ModelViewSet):
    queryset = BusinessComplianceEntity.objects.all()
    serializer_class = BusinessComplianceSerializer

class CollaboratorStatusViewSet(viewsets.ModelViewSet):
    queryset = CollaboratorStatus.objects.all()
    serializer_class = CollaboratorStatusSerializer

class CollaboratorPositionViewSet(viewsets.ModelViewSet):
    queryset = CollaboratorPosition.objects.all()
    serializer_class = CollaboratorPositionSerializer

class InsurancePlanViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlan.objects.all()
    serializer_class = InsurancePlanSerializer

class InsuranceProviderViewSet(viewsets.ModelViewSet):
    queryset = InsuranceProvider.objects.all()
    serializer_class = InsuranceProviderSerializer

class InsurancePlanTypeViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlanType.objects.all()
    serializer_class = InsurancePlaneTypeSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class BusinessDocumentViewSet(viewsets.ModelViewSet):
    queryset = Business_Document.objects.all()
    serializer_class = BusinessDocumentSerializer

class MedicalViewSet(viewsets.ModelViewSet):
    queryset = Medical.objects.all()
    serializer_class = MedicalSerializer

class BusinessMedicalViewSet(viewsets.ModelViewSet):
    queryset = Business_Medical.objects.all()
    serializer_class = BusinessMedicalSerializer

class InsuranceApplicationViewSet(viewsets.ModelViewSet):
    queryset = InsuranceApplication.objects.all()
    serializer_class = InsuranceApplicationSerializer

class BusinessInsuranceViewSet(viewsets.ModelViewSet):
    queryset = BusinessInsurance.objects.all()
    serializer_class = BusinessInsuranceSerializer

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class ProvinceStateViewSet(viewsets.ModelViewSet):
    queryset = ProvinceState.objects.all()
    serializer_class = ProvinceStateSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class AddressTypeViewSet(viewsets.ModelViewSet):
    queryset = AddressType.objects.all()
    serializer_class = AddressTypeSerializer

class ClientAddressViewSet(viewsets.ModelViewSet):
    queryset = ClientAddress.objects.all()
    serializer_class = ClientAddressSerializer

class PhoneTypeViewSet(viewsets.ModelViewSet):
    queryset = PhoneType.objects.all()
    serializer_class = PhoneTypeSerializer

class PhoneViewSet(viewsets.ModelViewSet):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer

class EmailTypeViewSet(viewsets.ModelViewSet):
    queryset = EmailType.objects.all()
    serializer_class = EmailTypeSerializer

class EmailViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

class BusinessSupervisorViewSet(viewsets.ModelViewSet):
    queryset = BusinessSupervisor.objects.all()
    serializer_class = BusinessSupervisorSerializer


class BusinessApprovalViewSet(viewsets.ModelViewSet):
    queryset = MyBusiness.objects.all()
    serializer_class = BusinessApprovalSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication] 

    def get_queryset(self):
        #pass
        # A list of businesssupervisor that the user is the supervisor of
        request_user = self.request.user 
        approving_businesses = list(BusinessSupervisor.objects.filter(supervisor = self.request.user.id).values_list('business', flat=True))
        qs = self.queryset.filter(pk__in = approving_businesses)
        return qs

from rest_framework.decorators import action
class NewBusinessViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication] 

    def list(self, request):
        #queryset = MyBusiness.objects.all()
        #serializer = BusinessApprovalSerializer(queryset, many=True)
        #return Response(serializer.data)
        return Response()

    @action(detail=False, methods=['post'])
    def create_new_business(self, request, pk=None):
        return Response()

import datetime 
from django.http import HttpResponse
from django.shortcuts import render
def test(request):
    queryset = MyBusiness.objects.all()
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)