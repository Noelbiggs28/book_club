# Generated by Django 4.2.7 on 2023-11-17 03:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('book_club', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookclub',
            name='members',
            field=models.ManyToManyField(null=True, related_name='book_club_members', to=settings.AUTH_USER_MODEL),
        ),
    ]
