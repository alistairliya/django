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

class Client(models.Model):
    pass

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

class MyBusiness(models.Model):
    business_type = models.ForeignKey(BusinessType, on_delete=models.PROTECT, related_name="mybusinesses")
    product = models.ForeignKey(Product, on_delete = models.PROTECT, related_name="mybusinesses")
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name="businesses")
    status = models.ForeignKey(BusinessStatus, on_delete=models.PROTECT, related_name="mybusinesses")
    projected_FYC = models.FloatField()
    application_date = models.DateField()
    application_location = models.CharField(max_length=64)
    # Owner Datetime
    created_by = models.ForeignKey(MyUser, on_delete=models.PROTECT, related_name="mybusinesses")
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()



class BusinessUserRole(models.Model):
    user_role_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)
    default_split = models.IntegerField() # 0 to 10000, with two implied decimals


# M-2-M Association
class Business_User(models.Model):
    business = models.ForeignKey(MyBusiness, on_delete=models.PROTECT, related_name="users")
    user = models.ForeignKey(MyUser, on_delete = models.PROTECT, related_name="businesses")
    split = models.IntegerField() # 0 to 10000, with two implied decimals
    user_role = models.ForeignKey(BusinessUserRole, on_delete=models.PROTECT, related_name = "businessusers")
    notes = models.CharField(max_length=1024)
    # Owner Datetime
    created_by = models.ForeignKey(MyUser, on_delete=models.PROTECT, related_name="businessusers")
    created_date = models.DateTimeField()
    modified_date = models.DateTimeField()

class ComplianceEntity(models.Model):
    compliance_entity_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# M-2-M Association
class Business_ComplianceEntity(models.Model):
    compliance_entity = models.ForeignKey(ComplianceEntity, on_delete=models.PROTECT, name="businesses")
    businesss = models.ForeignKey(MyBusiness, on_delete=models.PROTECT, name="complianceentities")
    notes = models.CharField(max_length=1024)



class Document(models.Model):
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name="documents")
    document_name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

# M-2-M Association
class Business_Document(models.Model):
    business = models.ForeignKey(MyBusiness, on_delete=models.PROTECT, related_name="documents")
    document = models.ForeignKey(Document, on_delete=models.PROTECT, related_name="mybusinesses")
    is_submitted = models.BooleanField()
    url = models.CharField(max_length=1024)






