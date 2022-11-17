from django.contrib.auth.models import AbstractUser
from django.db import models

# Referencing User Model:
# https://docs.djangoproject.com/en/4.0/topics/auth/customizing/#referencing-the-user-model
# https://learndjango.com/tutorials/django-best-practices-referencing-user-model
# Custom User Model:
# https://docs.djangoproject.com/en/4.0/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
# https://learndjango.com/tutorials/django-custom-user-model
# Reset Migration:
# https://raturi.in/blog/how-reset-django-migrations/

# Cusstom User Based on: 
# https://learndjango.com/tutorials/django-custom-user-model
class MyUser(AbstractUser):
    pass
    # add additional fields in here

    def __str__(self):
        return self.username

# checked
class Gender(models.Model):
    gender_name = models.CharField(max_length=64)
    gender_code = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# checked
class Client(models.Model):
    first_name = models.CharField(max_length=64)
    middle_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthdate = models.DateField()
    sin = models.CharField(max_length=64)
    gender = models.ForeignKey(Gender, on_delete=models.PROTECT, related_name="clients")
    # Owner Datetime
    created_by = models.ForeignKey(MyUser, on_delete=models.PROTECT, related_name="created_clients")
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()

# checked
class Country(models.Model):
    country_name = models.CharField(max_length=64)
    country_code = models.CharField(max_length=64)

# checked
class ProvinceState(models.Model):
    province_state_name = models.CharField(max_length=64)
    province_state_code = models.CharField(max_length=64)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="provinces_states")
    
# checked
class AddressType(models.Model):
    address_type_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# checked
class Address(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    stree_address = models.CharField(max_length=1024)
    city = models.CharField(max_length=64)
    province_state = models.ForeignKey(ProvinceState, on_delete=models.PROTECT, related_name="addresses")
    country = models.ForeignKey(Country, on_delete=models.PROTECT, related_name="addressess")
    postal_code = models.CharField(max_length=64)
    address_type = models.ForeignKey(AddressType, on_delete=models.PROTECT, related_name="addresses")

# checked
class PhoneType(models.Model):
    phone_type_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# checked
class Phone(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="phones")
    area_code = models.CharField(max_length=64)
    phone_number = models.CharField(max_length=64)
    phone_type = models.ForeignKey(PhoneType, on_delete=models.PROTECT, related_name="phones")
    is_primary = models.BooleanField()
    is_active = models.BooleanField()
    is_archived = models.BooleanField()
    notes = models.CharField(max_length=1024)

# checked
class EmailType(models.Model):
    email_type_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# checked
class Email(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="emails")
    email = models.CharField(max_length=1024)
    email_type = models.ForeignKey(EmailType, on_delete=models.PROTECT, related_name="emails")
    is_primary = models.BooleanField()
    is_active = models.BooleanField()
    is_primary = models.BooleanField()

# checked
class ProductType(models.Model):
    product_type_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# checked
class Product(models.Model):
    product_name = models.CharField(max_length=64)
    product_type = models.ForeignKey(ProductType, on_delete=models.PROTECT, related_name="products")
    description = models.CharField(max_length=1024)

# Checked
class BusinessStatus(models.Model):
    status_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# Checked
class BusinessType(models.Model):
    business_type_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)    

# Checked
class MyBusiness(models.Model):
    business_type = models.ForeignKey(BusinessType, on_delete=models.PROTECT, related_name="mybusinesses")
    product = models.ForeignKey(Product, on_delete = models.PROTECT, related_name="mybusinesses")
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name="businesses")
    status = models.ForeignKey(BusinessStatus, on_delete=models.PROTECT, related_name="mybusinesses")
    projected_FYC = models.FloatField()
    application_date = models.DateField()
    application_location = models.CharField(max_length=64)
    # Owner Datetime
    created_by = models.ForeignKey(MyUser, on_delete=models.PROTECT, related_name="created_businesses")
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()

# Checked
class BusinessUserRole(models.Model):
    user_role_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)
    default_split = models.IntegerField() # 0 to 10000, with two implied decimals

# Checked
# M-2-M Association
class Business_User(models.Model):
    business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE, related_name="users")
    user = models.ForeignKey(MyUser, on_delete = models.PROTECT, related_name="businesses")
    split = models.IntegerField() # 0 to 10000, with two implied decimals
    user_role = models.ForeignKey(BusinessUserRole, on_delete=models.PROTECT, related_name = "businessusers")
    notes = models.CharField(max_length=1024)
    # Owner Datetime
    created_by = models.ForeignKey(MyUser, on_delete=models.PROTECT, related_name="created_businessusers")
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()

# Checked
class ComplianceEntity(models.Model):
    compliance_entity_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# Checked
# M-2-M Association
class Business_ComplianceEntity(models.Model):
    compliance_entity = models.ForeignKey(ComplianceEntity, on_delete=models.PROTECT, name="businesses")
    businesss = models.ForeignKey(MyBusiness, on_delete=models.CASCADE, name="complianceentities")
    notes = models.CharField(max_length=1024)

# Checked
class Document(models.Model):
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING, related_name="document")
    document_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# Checked
# M-2-M Association
class Business_Document(models.Model):
    business = models.ForeignKey(MyBusiness, on_delete=models.CASCADE, related_name="documents")
    document = models.ForeignKey(Document, on_delete=models.PROTECT, related_name="mybusinesses")
    is_submitted = models.BooleanField()
    url = models.CharField(max_length=1024)

# Checked
class InsuranceProvider(models.Model):
    insurance_provider_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# Checked
class InsurancePlanType(models.Model):
    insurnace_plan_type_name = models.CharField(max_length=64)
    insurance_plan_type_code = models.CharField(max_length=64, null=True)
    description = models.CharField(max_length=1024)

# Checked
class InsurancePlan(models.Modle):
    insurance_plan_name = models.CharField(max_length=64)
    insurance_plan_code = models.CharField(max_length=64, null=True)
    description = models.CharField(max_length=1024)

# Checked
class InsuranceApplication(models.Model):
    businesss = models.ForeignKey(MyBusiness, on_delete=models.CASCADE, related_name="insurance_application") #1-2-1 relationship
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name = "insurance_applications")
    provider = models.ForeignKey(InsuranceProvider, on_delete=models.PROTECT, related_name="insurance_applications")
    plan_type = models.ForeignKey(InsurancePlanType, on_delete=models.PROTECT, related_name="insurance_applications")
    plan = models.ForeignKey(InsurancePlan, on_delete=models.PROTECT, related_name="insurance_applications")
    face_amount = models.FloatField()
    planned_premium = models.FloatField()

# Checked
class Medical(models.Model):
    medical_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# Checked
class InsuranceApplication_Medical(models.Model):
    insurance_application = models.ForeignKey(InsuranceApplication, on_delete=models.CASCADE, related_name="insurance_applications")
    medical = models.ForeignKey(Medical, on_delete=models.PROTECT, related_name="insurance_applications")

class ActivityLog(models.Model):
    pass





