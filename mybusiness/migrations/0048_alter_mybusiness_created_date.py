# Generated by Django 3.2.5 on 2023-05-20 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0047_auto_20230520_1649'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mybusiness',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]