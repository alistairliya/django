# https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
# https://www.django-rest-framework.org/
# https://www.django-rest-framework.org/tutorial/quickstart/

# Serialization:
# https://www.django-rest-framework.org/tutorial/1-serialization/https://www.django-rest-framework.org/tutorial/1-serialization/
# https://www.django-rest-framework.org/api-guide/serializers/
from rest_framework import serializers
from mybusiness.models import *

# Meta Class: 
# https://www.youtube.com/watch?v=NAQEj-c2CI8
# https://stackoverflow.com/questions/60500597/what-is-the-purpose-of-the-class-meta-in-django

class MyBusinessSerializer(serializers.HyperlinkedModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    class Meta:
        model = MyBusiness 
        fields = ['id','business_type','product','client','status','projected_FYC','application_date','settled_date','application_location','created_by', 'created_date', 'modified_date', 'highlighted'] 

class UserSerializer(serializers.HyperlinkedModelSerializer):
    # corresponds to related_name in MyUser model.
    created_businesses = serializers.PrimaryKeyRelatedField(many=True,queryset=MyBusiness.objects.all())
    my_businesses = serializers.PrimaryKeyRelatedField(many=True, queryset=Business_User.objects.all())
    class Meta:
        model = MyUser
        fields = ['url', 'username', 'email', 'groups','created_businesses','my_businesses']

# >>> print(repr(serializer))
# ClientSerializer():
#     id = IntegerField(label='ID', read_only=True)
#     first_name = CharField(max_length=64)
#     middle_name = CharField(allow_blank=True, allow_null=True, max_length=64, required=False)
#     last_name = CharField(max_length=64)
#     birthdate = DateField()
#     sin = CharField(max_length=64)
#     gender = PrimaryKeyRelatedField(queryset=Gender.objects.all())
#     created_by = PrimaryKeyRelatedField(queryset=MyUser.objects.all())
#     created_date = DateTimeField()
#     modified_date = DateTimeField()
# >>> male = Gender(gender_name ='Male',description='Not a girl',gender_code='M')
# >>> male.save()
# >>> female = Gender(gender_name ='Female',description='Not a boy',gender_code='F')
# >>> female.sve()
# >>> me = MyUser.objects.all()[0]
# >>> foo = Client(first_name='Foo', middle_name='Dan', last_name='Bar', birthdate=parse_date('2022-12-01'), gender=male, created_by=me, created_date=parse_date('2022-12-01'), modified_date=parse_date('2022-12-01'))
# >>> foo.save()
# >>> from mybusiness.models import Client
# >>> from myapi.serializers import ClientSerializer
# >>> c = Client.objects.all()[0]
# >>> s = ClientSerializer(c)
# >>> s.data
# {'id': 1, 'first_name': 'Foo', 'middle_name': 'Dan', 'birthdate': '2022-12-01', 'last_name': 'Bar', 'sin': '', 'gender': 1, 'created_by': 1, 'created_date': '2022-12-01T00:00:00Z', 'modified_date': '2022-12-01T00:00:00Z'}
# >>> 
class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'middle_name','birthdate', 'last_name','sin','gender','created_by','created_date','modified_date']

class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = ['id', 'gender_name', 'gender_code', 'description']

class BusinessTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessType
        fields = ['id','business_type_name', 'description']
    
class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id','product_name','product_type', 'description']


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ['id', 'product_type_name', 'description']

class BusinessStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessStatus
        fields = ['id', 'status_name', 'description']

class BusinessUserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessUserRole
        fields = ['id', 'user_role_name', 'description']

class BusinessUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business_User
        fields = ['business', 'user', 'split', 'user_role', 'notes', 'created_by', 'created_date', 'modified_date']

class InsurancePlanSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = InsurancePlan
        fields = ['insurance_plan_name','insurance_plan_code', 'description']

class InsuranceProviderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = InsuranceProvider
        fields = ['insurance_provider_name','description']


class InsurancePlaneTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = InsurancePlanType
        fields = ['insurnace_plan_type_name','insurance_plan_type_code', 'description']
