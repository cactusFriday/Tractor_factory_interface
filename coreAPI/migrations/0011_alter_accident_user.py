# Generated by Django 3.2.8 on 2021-10-22 19:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('coreAPI', '0010_alter_accident_time_appeared'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accident',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accidents', to=settings.AUTH_USER_MODEL),
        ),
    ]