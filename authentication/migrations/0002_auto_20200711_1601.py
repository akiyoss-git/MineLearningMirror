# Generated by Django 2.2.5 on 2020-07-11 13:01

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='user_type',
        ),
        migrations.AddField(
            model_name='customuser',
            name='rights',
            field=django.contrib.postgres.fields.jsonb.JSONField(null=True),
        ),
    ]
