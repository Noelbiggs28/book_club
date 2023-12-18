# Generated by Django 4.2.7 on 2023-12-18 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_userprofile_top_five_books'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='friends',
            field=models.ManyToManyField(related_name='friends_list', to='accounts.userprofile'),
        ),
    ]
