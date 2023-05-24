from django.db import models

# Create your models here.
# File Upload based on:
# https://blog.vivekshukla.xyz/uploading-file-using-api-django-rest-framework/
class File(models.Model):
    file = models.FileField(blank=False, null=False)
    remark = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True) 
