# Generated by Django 3.2.5 on 2023-07-05 20:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0050_auto_20230523_2330'),
    ]

    operations = [
        migrations.AddField(
            model_name='insuranceapplication',
            name='insured_client',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='insurance_applications', to='mybusiness.client'),
        ),
    ]
