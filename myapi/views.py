from django.shortcuts import render

from rest_framework import viewsets
from .serializers import MyBusinessSerializer
from mybusiness.models import * 

# Create your views here.

class MyBusinessView(viewsets.ModelViewSet):
    serializer_class = MyBusinessSerializer
    queryset = MyBusiness.objects.all()