# Generated by Django 3.2.8 on 2021-10-22 02:24

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('coreAPI', '0003_auto_20211022_0223'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accident',
            name='time_appeared',
            field=models.DateTimeField(default=datetime.datetime(2021, 10, 22, 2, 24, 40, 608308, tzinfo=utc), verbose_name='Время создания инцидента'),
        ),
    ]