# Generated by Django 3.2.8 on 2021-11-15 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conveyor', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='buttonsblocks',
            name='posts',
            field=models.ManyToManyField(related_name='buttons_set', related_query_name='buttons', to='conveyor.PostsState'),
        ),
    ]
