# Generated by Django 3.2.5 on 2023-04-20 08:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0037_auto_20230419_2131'),
    ]

    operations = [
        migrations.AddField(
            model_name='insuranceapplication',
            name='applicant_address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='insurance_applications', to='mybusiness.address'),
        ),
    ]
