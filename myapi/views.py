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
import json, datetime
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

    # curl -X POST -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' http://127.0.0.1:8000/api/newbusiness/create_new_business/
    @action(detail=False, methods=['post'])
    def create_new_business(self, request, pk=None):
        data = json.loads(request.body)
        # 1. Post to business
        # create client if new client. Else just get client ID
        client = None
        client_data = data.get('client')
        if client_data and client_data.get('is_new_client'):
            print('creating new client')
            client = Client(
                first_name=client_data.get('first_name'), 
                last_name=client_data.get('last_name'), 
                middle_name=client_data.get('middle_name'), 
                birthdate=client_data.get('birthdate'), 
                sin=client_data.get('sin'), 
                gender=client_data.get('gender'), 
                created_by=self.request.user)
            client.save()
        elif client_data:
            #client = Client.objects.all().filter(id=client_data.get('id'))[0]
            client = Client.objects.get(id=client_data.get('id'))
        #status = BusinessStatus.objects.all().filter(id=1)[0] # Default to ID 1 of BusinessStatus
        status = BusinessStatus.objects.get(id=1)# Default to ID 1 of BusinessStatus
        new_bus = MyBusiness(client = client, status = status, created_by = self.request.user)
        new_bus.save()
        print(f"Business: {new_bus.id}")
        
        # 2. Post to address
        address = None # Default, when Address Data not provided
        address_data = data.get('applicantAddress')
        if address_data and address_data.get('is_new_address'):
            address = Address(
                # unit_number
                unit_number = address_data['unit_number'],
                # street_address
                street_address = address_data['street_address'],
                # city
                city = address_data['city'],
                # province_state
                province_state = ProvinceState.objects.all().filter(id=address_data['province']['id'])[0],
                # country
                country = Country.objects.all().filter(id=address_data['country']['id'])[0],
                # postal_code
                postal_code = address_data['postal_code'],
            )
            address.save()
        elif address_data:
            #address = Address.objects.all().filter(id=address_data.get('id'))[0]
            address = Address.objects.get(id=address_data.get('id'))
        print(f"address: {address.id}")
        # 3. Post to phone
        phone = None
        phones_data = data.get('applicantPhones')
        if phones_data and len(phones_data) > 0 and phones_data[0].get('selection'):
            phone = Phone.objects.get(id=phones_data[0].get('selection').get('id'))
        elif phones_data and len(phones_data) > 0:
            phone_data = phones_data[0]
            phone = Phone(
                # clients, add later
                # area_code
                area_code = phone_data['area_code'],
                # phone_number
                phone_number = phone_data['phone_number'],
                # phone_type
                phone_type = PhoneType.objects.get(id=phone_data.get('phone_type').get('id')) if phone_data.get('phone_type') else PhoneType.objects.get(id=1),
                # is_primary
                is_primary = False,
                # is_active
                is_active = True,
                # is_archived
                is_archived = False,
            )
            phone.save()
            phone.clients.add(client)
            phone.save()
        print(f"phone: {phone.id}")

        # 4. Post to Insurance Application
        insuranceApplication = None
        # Need to make suer that
        ins_app_data = data.get('applicantInsurance')
        if ins_app_data and ins_app_data.get('insurance_plan') and ins_app_data.get('insurance_plan_type') and ins_app_data.get('insurance_provider'):
            amount = ins_app_data.get('face_amount') if ins_app_data.get('face_amount') else 0
            planned_premium = ins_app_data.get('planned_premium') if ins_app_data.get('planned_premium') else 0
            insurance_plan = InsurancePlan.objects.get(id=ins_app_data.get('insurance_plan').get('id'))             
            insurance_plan_type = InsurancePlanType.objects.get(id=ins_app_data.get('insurance_plan_type').get('id')) 
            insurance_provider = InsuranceProvider.objects.get(id=ins_app_data.get('insurance_provider').get('id'))
            insuranceApplication = InsuranceApplication(
                # business
                business = new_bus,
                # product
                product = Product.objects.get(id=1), # Hardcode, default to ID 1 of Product 
                # provider
                provider = insurance_provider,
                # plan_type
                plan_type = insurance_plan_type,
                # plan
                plan = insurance_plan,
                # face_amount
                face_amount = amount, 
                # planned_premium
                planned_premium = planned_premium,
                # applicant_address
                applicant_address = address,
                # applicant_phone
                applicant_phone = phone
            ) 
            insuranceApplication.save()
            print(f"insuranceApplication: {insuranceApplication.id}")
        # 5. Post to Business User
            # add current user as owner?   
        business_user = None
        collaborators_data = data.get('collaborators')
        if collaborators_data:
            for collaborator_key in collaborators_data:
                collaborator_data = collaborators_data[collaborator_key]
                advisor_data = collaborator_data.get('advisor')
                user_role_data = collaborator_data.get('role')
                collaborator_status_data = collaborator_data.get('collaboratorStatus')
                collaborator_position_data = collaborator_data.get('collaboratorPosition')
                if advisor_data and user_role_data and advisor_data.get('id') and user_role_data.get('id') and collaborator_status_data and collaborator_position_data:
                    user = MyUser.objects.get(id=advisor_data.get('id'))
                    user_role = BusinessUserRole.objects.get(id=user_role_data.get('id'))
                    collaborator_status = CollaboratorStatus.objects.get(id = collaborator_status_data.get('id'))
                    collaborator_position = CollaboratorPosition.objects.get(id = collaborator_position_data.get('id'))
                    business_user = Business_User(
                        business = new_bus,
                        user = user,
                        split = int(collaborator_data.get('split')),
                        user_role = user_role,
                        notes = "",
                        created_by = self.request.user,
                        collaborator_status = collaborator_status,
                        collaborator_position = collaborator_position,
                        cfc_code = collaborator_data.get('cfc_code'),
                    )
                    business_user.save()
                    print(f"business_user: {business_user.id}")

        # 6. Post to Business Compliance
        # 7. Post to Business Document
        # 8. Post to Business Medical
        # 9. Post to Business Supervisor
        return Response({'status':'Looking good!'})
