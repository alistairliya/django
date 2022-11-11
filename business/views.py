from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def index(request):
    return render(request, "business/index.html")

@login_required
def new_business(request):
    return render(request, "business/new_business.html")
