# Generated by Django 3.2.5 on 2023-08-06 08:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0058_alter_business_user_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business_user',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='created_businessusers', to=settings.AUTH_USER_MODEL),
        ),
    ]
