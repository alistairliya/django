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