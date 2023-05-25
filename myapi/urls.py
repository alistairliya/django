# Most of the URL in myapi are accessed thru the router defined in myproject/url.py
# This file is for views that cannot be registered.
# https://stackoverflow.com/questions/70377923/attributeerror-type-object-has-no-attribute-get-extra-actions
# Cannot add generic Views in routers.
# We add the views here.
from django.urls import path
from . import views
from django.conf.urls import url

app_name = "myapi"
urlpatterns = [
    url(r'^upload/$', views.UploadFileView.as_view(), name='file-upload'), #r'^upload/$' is a regular expression pattern enclosed within the r prefix, indicating a raw string. 
]