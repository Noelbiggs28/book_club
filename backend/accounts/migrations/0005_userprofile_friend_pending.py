# Generated by Django 4.2.7 on 2024-01-09 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_userprofile_friends'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='friend_pending',
            field=models.ManyToManyField(related_name='friends_pending', to='accounts.userprofile'),
        ),
    ]
