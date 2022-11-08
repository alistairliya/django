from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponse("Hello World!")

def foo(request):
    return HttpResponse("Hello Foo!")

def bar(request):
    return HttpResponse("Hello Bar!")

def foobar(request):
    return HttpResponse("Hello FooBar!")

def greet(request, name):
    return HttpResponse(f"Hello, {name}")
