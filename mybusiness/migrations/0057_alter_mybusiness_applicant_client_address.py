# Generated by Django 3.2.5 on 2023-07-13 23:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0056_auto_20230711_1736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mybusiness',
            name='applicant_client_address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='mybusinesses', to='mybusiness.address'),
        ),
    ]
