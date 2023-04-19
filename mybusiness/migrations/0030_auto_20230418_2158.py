# Generated by Django 3.2.5 on 2023-04-18 21:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0029_client_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='business_user',
            name='cfc_code',
            field=models.CharField(max_length=64, null=True),
        ),
        migrations.AddField(
            model_name='business_user',
            name='collaborator_position',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='businessusers', to='mybusiness.collaboratorposition'),
        ),
        migrations.AddField(
            model_name='business_user',
            name='collaborator_status',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='businessusers', to='mybusiness.collaboratorstatus'),
        ),
    ]