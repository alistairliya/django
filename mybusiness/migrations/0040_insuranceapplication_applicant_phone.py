# Generated by Django 3.2.5 on 2023-05-03 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0039_alter_insuranceapplication_applicant_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='insuranceapplication',
            name='applicant_phone',
            field=models.CharField(max_length=64, null=True),
        ),
    ]
