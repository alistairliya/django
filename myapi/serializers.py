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

class MyBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyBusiness 
        fields = ('product',) 

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        fields = ['url', 'username', 'email', 'groups']

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
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'middle_name','birthdate', 'last_name','sin','gender','created_by','created_date','modified_date']

