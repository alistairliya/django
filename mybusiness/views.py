from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from .serializers import MyBusinessSerializer
from .models import * 
# Create your views here.
@login_required
def index(request):
    return render(request, "mybusiness/index.html")

'''
NBF - New Business Form

'''
@login_required
def new_business(request):
    return render(request, "mybusiness/new_business.html")

class MyBusinessView(viewsets.ModelViewSet):
    serializer_class = MyBusinessSerializer
    queryset = MyUser.objects.all()