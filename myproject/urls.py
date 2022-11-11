"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

# https://docs.djangoproject.com/en/4.1/ref/contrib/admin/
# https://adiramadhan17.medium.com/modify-title-and-header-django-admin-interface-a6ad6e470d92
# https://www.dothedev.com/blog/django-admin-change-color/ # for color 
# https://docs.djangoproject.com/en/4.1/howto/overriding-templates/ # overriding templates
admin.site.site_header = 'My Admin' # Django administration
admin.site.site_title = 'My Title'
admin.site.index_title = 'Site Administration' # Site administsration
#admin.site.site_url = "Your Page" # VIEW SITE


urlpatterns = [
    path('', include("users.urls")),
    path('admin/', admin.site.urls ),
    path('tasks/', include("tasks.urls")),
    path('hello/', include("hello.urls")),
    path('newyear/', include("newyear.urls")),
    path('flights/', include("flights.urls")),
    path('users/', include("users.urls")),
    path('business/',include("business.urls") )
]
