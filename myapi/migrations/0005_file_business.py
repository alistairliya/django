# Generated by Django 3.2.5 on 2023-05-30 15:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0050_auto_20230523_2330'),
        ('myapi', '0004_file_original_filename'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='business',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mybusiness.mybusiness'),
        ),
    ]
