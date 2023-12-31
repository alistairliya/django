# Generated by Django 3.2.5 on 2023-01-26 18:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0012_remove_address_client'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClientAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=1024, null=True)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='mybusiness.address')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='mybusiness.client')),
            ],
        ),
    ]
