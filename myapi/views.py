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

# For File Upload
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import FileSerializer
from rest_framework.decorators import action
from datetime import datetime

# Create your views here.
class MyBusinessView(viewsets.ModelViewSet):
    
    #queryset = MyBusiness.objects.filter(created_by = 1) #MyBusiness.objects.all()
    queryset = MyBusiness.objects.all().order_by('id').reverse() #get_queryset() 
    
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
        print(f'******* request_user: {request_user}') 
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

class FileViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication] 
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def get_queryset(self):
        print('get_queryset')
        request_user = self.request.user
        #files = File.objects.filter(user = request_user.id).order_by('-timestamp')[:1]
        files = File.objects.filter(user = request_user.id).order_by('-timestamp')
        return files
    
    @action(detail=False, methods=['post'])
    def upload_file(self, request, pk=None):
        file_serializer = FileSerializer(context = {'request' :request}, data=request.data)
        my_user = MyUser.objects.get(id=request.user.id)
        print(f"my_user: {request.user}")

        for key, value in request.data.items():
            print(f'{key}: {value}')

        remark = request.data.get('remark')
        businessId = request.data.get('businessId')
        my_business = MyBusiness.objects.get(id=businessId)
        if remark == None:
            remark = ""
        original_filename = request.data.get('file')
        if file_serializer.is_valid():
            file_serializer.save(user=my_user, original_filename = original_filename, remark = remark, business=my_business)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditBusinessViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]
    def list(self, request):
        return Response()
    
    @action(detail=False, methods=['put'])
    def update_status(self, request, pk=None):
        print('update_status')
        print(request.body)
        data = json.loads(request.body)
        
        business_id = data.get('business_id')
        status = data.get('status')
        my_status = BusinessStatus.objects.get(status_name=status)
        my_business = MyBusiness.objects.get(id=business_id)
        my_business.status = my_status
        my_business.save()
        notification = Notification(
            related_business = my_business,
            message_text = f'Business Status Changed to {status}',
            from_user = self.request.user,
            message_code = status,
            broadcast_group = 'STAFF'
        )
        notification.save()
        # Need to also broadcast by populating UserNotifiation
        # Loop thru all the users. If the user is a staff, insert a record
        users = MyUser.objects.all()
        for user in users:
            print(f'user: {user} is staff: {user.is_staff}')
            if user.is_staff:
                print('inserting user notification')
                user_notification = UserNotification(
                    user = user,
                    notification = notification,
                    read = False
                )
                user_notification.save()

        return Response({'result':[]})

    # curl -X PUT -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' HTTP://127.0.0.1:8000/api/editbusiness/edit_business/ 
    # curl -X PUT -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' -d '{"insuranceapplication":{"planned_premium":"$1002","plan_type":2,"provider":2,"face_amount":"$1000000111","id":59},"contact":{"street_address":"12345 ABCDEFG St.","unit":"123","province_state_id":3,"country_id":2,"phone_id":1,"address_id":1}}'  HTTP://127.0.0.1:8000/api/editbusiness/edit_business/
    @action(detail=False, methods=['put'])
    def edit_business(self, request, pk=None):
        print(f'edit_business: {request.body}')
        data = json.loads(request.body)
        message = []
        # 1. Update Client
        client_data = data.get('client')
        if client_data:
            print(client_data)
            client = Client.objects.get(id=client_data['id'])
            if client_data.get('first_name'):
                client.first_name = client_data.get('first_name')
            if client_data.get('last_name'):
                client.last_name = client_data.get('last_name')
            if client_data.get('middle_name'):
                client.middle_name = client_data.get('middle_name')
            if client_data.get('gender'):
                client.gender = client_data.get('gender')
            if client_data.get('birthdate'):
                bdstr = client_data.get('birthdate')
                bd = None
                try:
                    bd = datetime.strptime(bdstr, '%Y-%m-%d').date()
                except Exception as e:
                    message.append(f'Birth Date {bdstr} is not in the correct format: {str(e)}')

                if bd:
                    client.birthdate = bd
            if client_data.get('sin'):
                client.sin = client_data.get('sin')
            client.save()
                
        # 2. Update Contact
        contact_data = data.get('contact')
        if contact_data:
            print(contact_data)
            address = Address.objects.get(id=contact_data['address_id'])
            if contact_data.get('street_address'):
                address.street_address = contact_data.get('street_address')
            if contact_data.get('unit'):
                address.unit_number = contact_data.get('unit')
            if contact_data.get('city'):
                address.city = contact_data.get('city')
            if contact_data.get('province_state_id'):
                province = ProvinceState.objects.get(id=contact_data.get('province_state_id'))
                address.province_state = province
            if contact_data.get('country_id'):
                country = Country.objects.get(id=contact_data.get('country_id'))
                address.country = country
            address.save()
            if contact_data.get('phone_number'):
                phone = Phone.objects.get(id=contact_data.get('phone_id'))
                phone.phone_number = contact_data.get('phone_number')            
                phone.save()
            if contact_data.get('area_code'):
                phone = Phone.objects.get(id=contact_data.get('phone_id'))
                phone.area_code = contact_data.get('area_code')            
                phone.save()

        # 3. Update InsuranceApplication
        insurance_data = data.get('insuranceapplication')
        if insurance_data:
            print(insurance_data)
            insurance = InsuranceApplication.objects.get(id=insurance_data['id'])
            if insurance_data.get('provider'):
                provider = InsuranceProvider.objects.get(id=insurance_data.get('provider'))
                insurance.provider = provider
            if insurance_data.get('plan'):
                plan = InsurancePlan.objects.get(id=insurance_data.get('plan'))
                insurance.plan = plan 
            if insurance_data.get('plan_type'):
                plan_type = InsurancePlanType.objects.get(id=insurance_data.get('plan_type'))
                insurance.plan_type = plan_type
            if insurance_data.get('face_amount'):
                insurance.face_amount = insurance_data.get('face_amount')
            if insurance_data.get('planned_premium'):
                insurance.planned_premium = insurance_data.get('planned_premium')
            insurance.save()
        # 4 Update Collaborators
        business_id = data.get('business_id')
        collaborator_data = data.get('collaborators')
        if business_id and collaborator_data:
            my_business = MyBusiness.objects.get(id=business_id)
            print(collaborator_data)
            for key in collaborator_data:
                # For each collaborator, need to figure out if it's a new collaborator or an existing one
                # if a business_user_id exists, then it's an existing collaborator
                # otherwisse it is a new collaborator
                collaborator = collaborator_data.get(key)
                print(f'collaborator: {collaborator}')
                business_user_id = collaborator.get('business_user_id')
                if business_user_id:
                    pass
                else:
                    # new collaborator
                    print('new collaborator')
                    user = MyUser.objects.get(id=collaborator.get('advisor').get('id'))
                    business_user = Business_User(
                        user=user,
                        business=my_business
                    )
                    business_user.save()
        return Response({'result':message})


class NewBusinessViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication] 

    def list(self, request):
        #queryset = MyBusiness.objects.all()
        #serializer = BusinessApprovalSerializer(queryset, many=True)
        #return Response(serializer.data)
        return Response()

    # Helper Function - Create a new client
    # Corresponds to step 1 of create_new_business
    def get_or_create_client(self, client_data):
        # create client if new client. Else just get client ID
        client = None
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
            client = Client.objects.get(id=client_data.get('id'))
        return client

    def get_or_create_phone(self, client, phones_data):
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
        return phone


    def get_or_create_address(self, client, address_data):
        address = None # Default, when Address Data not provided
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
            client_address = ClientAddress(
                client=client,
                address=address,
            )
            client_address.save()
        elif address_data:
            #address = Address.objects.all().filter(id=address_data.get('id'))[0]
            address = Address.objects.get(id=address_data.get('id'))
        print(f"address: {address.id}")
        return address

    # curl -X POST -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' http://127.0.0.1:8000/api/newbusiness/create_insurance_application/
    # Creates an Business and InsuranceApplication with applicant/insured information.
    # Details of the Insurance Application are not included.
    @action(detail=False, methods=['post'])
    def create_insurance_application(self, request, pk=None):
        data = json.loads(request.body)
        print(json.dumps(data, sort_keys=True, indent=4))

        # 0. Create Applicant (and Insured) 
        applicant = self.get_or_create_client(data.get('client'))
        insured = self.get_or_create_client(data.get('insured'))
        if not insured:
            insured = applicant # If no data for insured, same as applicant
        # applicant is referenced in MyBusiness.client
        # insured is referenced in InsuranceApplication.insured_client
        print(applicant)
        print(insured)
        
        # Post to Addres
        # If newly created addres, need to connect to the client object
        if applicant and data.get('applicantAddress'):
            applicant_address = self.get_or_create_address(applicant, data.get('applicantAddress'))
        if insured and data.get('insuredAddress'):
            insured_address = self.get_or_create_address(insured, data.get('insuredAddress'))
        else:
            insured_address = applicant_address
        # Post to Phone
        if applicant and data.get('applicantPhones'):
            applicant_phone = self.get_or_create_phone(applicant, data.get('applicantPhones')) 
        if insured and data.get('insuredPhones'):
            insured_phone = self.get_or_create_phone(insured, data.get('insuredPhones'))
        else:
            insured_phone = applicant_phone

        # 1 Create a new Business object. Status should be DRAFT
        status = BusinessStatus.objects.get(status_name="DRAFT")
        new_bus = MyBusiness(
            client = applicant, 
            status = status,
            applicant_client_address = applicant_address,
            applicant_client_phone = applicant_phone, 
            created_by = self.request.user)
        new_bus.save()
        print(f"Created New Business {new_bus.id}")

        # Post to Insurance Application
        insuranceApplication = InsuranceApplication(
            # insured_client
            insured_client = insured,
            # business
            business = new_bus,
            insured_client_address = insured_address,
            insured_client_phone = insured_phone,
        )
        insuranceApplication.save()
        print(f"Created Insurance Application {insuranceApplication.id}")


        return Response({'result':'ok'})
    
    # curl -X POST -H 'Authorization: Token 9af7ed53fa7a0356998896d8224e67e65c8650a3' http://127.0.0.1:8000/api/newbusiness/create_new_business/
    # *** NO LONGER USE THIS ACTION ***
    # as we changed new business creation workfflow and we no longer run from NBF1 to NBF10
    # However, this is a good reference implmentation for how to create a new business.
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
        collaborators_data = data.get('collaborators')
        if collaborators_data:
            for collaborator_key in collaborators_data:
                business_user = None
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
        compliance_entities_data = data.get('complianceEntities')
        if compliance_entities_data:
            for compliance_key in compliance_entities_data:
                business_compliance = None
                compliance_data = compliance_entities_data[compliance_key]
                if compliance_data and compliance_data.get('id'):
                    compliance_entity = ComplianceEntity.objects.get(id=compliance_data.get('id'))
                    if compliance_entity:
                        notes = compliance_data.get('notes',"")
                        business_compliance = BusinessComplianceEntity(
                            business = new_bus,
                            compliance_entity = compliance_entity,
                            notes = notes
                        )
                        business_compliance.save()
                        print(f"business_compliance: {business_compliance.id}")
                                    
        # 7. Post to Business Document
        documents_data = data.get('documents')
        if documents_data:
            for document_key in documents_data:
                document = Document.objects.get(id=document_key)
                document_data = documents_data[document_key]
                if document:
                    business_document = Business_Document(
                        business = new_bus,
                        document = document,
                        notes = document_data.get('notes',"")
                    )
                    business_document.save()
                    print(f"business_document: {business_document.id}")
        # 8. Post to Business Medical
        medicals_data = data.get('medicals')
        if medicals_data:
            for medical_key in medicals_data:
                medical = Medical.objects.get(id=medical_key)
                medical_data = medicals_data[medical_key]
                if medical:
                    business_medical = Business_Medical(
                        business = new_bus,
                        medical = medical,
                        notes = medical_data.get('notes',""),
                        status = Status.objects.get(id=1) # Hardcode
                    )
                    business_medical.save()
                    print(f"business_medical: {business_medical.id}")
        # 9. Post to Business Supervisor
        supervisor_data = data.get('supervisor')
        if supervisor_data:
            supervisor_user = MyUser.objects.get(id=supervisor_data.get('id'))
            if supervisor_user:
                business_supervisor = BusinessSupervisor(
                    business = new_bus,
                    supervisor = supervisor_user,
                    notes = ""
                )
                business_supervisor.save()
                print(f"business_supervisor: {business_supervisor.id}")
        return Response({'status':'Looking good!'})

# https://blog.vivekshukla.xyz/uploading-file-using-api-django-rest-framework/ 
# https://testdriven.io/blog/django-static-files/#:~:text=Unfortunately%2C%20the%20Django%20development%20server,in%20your%20project%2Dlevel%20URLs.
# *** NO LONGER USING THIS CLASS ***
# No longer using this class. Use FileViewSet class instead
class UploadFileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication] 

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(context = {'request' :request}, data=request.data)
        my_user = MyUser.objects.get(id=request.user.id)
        print(f"my_user: {request.user}")

        for key, value in request.data.items():
            print(f'{key}: {value}')

        remark = request.data.get('remark')
        businessId = request.data.get('businessId')
        my_business = MyBusiness.objects.get(id=businessId)
        if remark == None:
            remark = ""
        original_filename = request.data.get('file')
        if file_serializer.is_valid():
            file_serializer.save(user=my_user, original_filename = original_filename, remark = remark, business=my_business)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

# Many-to-Nany relationship between user and notification
# Shows if user has read a notification
class UserNotificationViewSet(viewsets.ModelViewSet):
    queryset = UserNotification.objects.all()
    serializer_class = UserNotificationSerializer