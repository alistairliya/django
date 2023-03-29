# Generated by Django 3.2.5 on 2023-03-29 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0025_remove_document_client'),
    ]

    operations = [
        migrations.CreateModel(
            name='CollaboratorStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status_name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=1024, null=True)),
            ],
        ),
    ]