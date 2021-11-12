# Generated by Django 3.2.8 on 2021-11-10 15:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accident', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accident',
            name='user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='accidents', to=settings.AUTH_USER_MODEL),
        ),
    ]