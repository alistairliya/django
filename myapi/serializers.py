# https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
# https://www.django-rest-framework.org/
# https://www.django-rest-framework.org/tutorial/quickstart/

from rest_framework import serializers
from mybusiness.models import *

class MyBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyBusiness 
        fields = ('product',) 