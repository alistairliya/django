# Generated by Django 3.2.5 on 2023-07-08 07:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0053_remove_insuranceapplication_applicant_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='insuranceapplication',
            name='insured_client_address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='insurance_applications', to='mybusiness.address'),
        ),
        migrations.AddField(
            model_name='insuranceapplication',
            name='insured_client_phone',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='insurance_applications', to='mybusiness.phone'),
        ),
    ]
