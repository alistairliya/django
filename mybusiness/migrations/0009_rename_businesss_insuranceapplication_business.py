# Generated by Django 3.2.5 on 2023-01-14 23:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0008_mybusiness_settled_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='insuranceapplication',
            old_name='businesss',
            new_name='business',
        ),
    ]
