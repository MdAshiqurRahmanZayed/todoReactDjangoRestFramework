# Generated by Django 4.1.3 on 2022-12-29 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ToDo", "0002_rename_discription_todo_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="todo",
            name="description",
            field=models.TextField(blank=True, null=True),
        ),
    ]
