from rest_framework import serializers
from mybusiness.models import *

class MyBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyBusiness 
        fields = ('product',) 