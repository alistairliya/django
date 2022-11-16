from django.contrib.auth.models import AbstractUser
from django.db import models

# Referencing User Model:
# https://docs.djangoproject.com/en/4.0/topics/auth/customizing/#referencing-the-user-model
# https://learndjango.com/tutorials/django-best-practices-referencing-user-model
# Custom User Model:
# https://docs.djangoproject.com/en/4.0/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
# https://learndjango.com/tutorials/django-custom-user-model
# Reset Migration:
# https://raturi.in/blog/how-reset-django-migrations/

# Cusstom User Based on: 
# https://learndjango.com/tutorials/django-custom-user-model
class MyUser(AbstractUser):
    pass
    # add additional fields in here

    def __str__(self):
        return self.username

# class MyBusiness(models.Model):
#     pass

# class Business_User(models.Model):
#     pass

