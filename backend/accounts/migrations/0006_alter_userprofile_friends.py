# Generated by Django 4.2.7 on 2024-01-10 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_userprofile_friend_pending'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='friends',
            field=models.ManyToManyField(to='accounts.userprofile'),
        ),
    ]
