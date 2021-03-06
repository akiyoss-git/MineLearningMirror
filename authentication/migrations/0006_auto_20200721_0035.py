# Generated by Django 3.0.8 on 2020-07-20 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_auto_20200711_2219'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='progress',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='rights',
        ),
        migrations.AddField(
            model_name='customuser',
            name='avatar',
            field=models.URLField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='customuser',
            name='bio',
            field=models.TextField(blank=True, default='', max_length=2000),
        ),
        migrations.AddField(
            model_name='customuser',
            name='status',
            field=models.CharField(blank=True, default='', max_length=16),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='name',
            field=models.CharField(default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='second_name',
            field=models.CharField(default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='surname',
            field=models.CharField(default='', max_length=32),
        ),
    ]
