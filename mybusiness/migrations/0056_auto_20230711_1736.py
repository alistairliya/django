# Generated by Django 3.2.5 on 2023-07-11 17:36

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0055_auto_20230708_0721'),
    ]

    operations = [
        migrations.AddField(
            model_name='insuranceapplication',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='insuranceapplication',
            name='modified_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='insuranceapplication',
            name='plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='insurance_applications', to='mybusiness.insuranceplan'),
        ),
        migrations.AlterField(
            model_name='insuranceapplication',
            name='plan_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='insurance_applications', to='mybusiness.insuranceplantype'),
        ),
        migrations.AlterField(
            model_name='insuranceapplication',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='insurance_applications', to='mybusiness.product'),
        ),
        migrations.AlterField(
            model_name='insuranceapplication',
            name='provider',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='insurance_applications', to='mybusiness.insuranceprovider'),
        ),
    ]
