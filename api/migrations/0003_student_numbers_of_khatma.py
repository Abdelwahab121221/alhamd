# Generated by Django 5.2.1 on 2025-05-22 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_remove_assistant_age"),
    ]

    operations = [
        migrations.AddField(
            model_name="student",
            name="numbers_of_khatma",
            field=models.IntegerField(default=0),
        ),
    ]
