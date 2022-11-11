from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "business/index.html")

def new_business(request):
    return render(request, "business/new_business.html")
