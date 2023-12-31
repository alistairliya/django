# Generated by Django 3.2.5 on 2023-08-23 21:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mybusiness', '0061_auto_20230822_0500'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='message',
            new_name='message_text',
        ),
        migrations.AddField(
            model_name='notification',
            name='message_code',
            field=models.CharField(default=None, max_length=64),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='notification',
            name='from_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='notification', to=settings.AUTH_USER_MODEL),
        ),
    ]
