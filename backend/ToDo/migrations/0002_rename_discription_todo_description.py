# Generated by Django 4.0.3 on 2022-10-16 18:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ToDo', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='discription',
            new_name='description',
        ),
    ]