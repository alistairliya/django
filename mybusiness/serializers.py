from rest_framework import serializers
from .models import * 

class MyBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser 
        fields = ('id', 'first_name', 'last_name') 