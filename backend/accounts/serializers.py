from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import serializers

class SignupSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]



# class GetFriendsSerializer(ModelSerializer):

#     class Meta:
#         model = UserProfile
#         fields = '__all__'

class GetFriendsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = UserProfile
        fields = ('id', 'username', 'pages_completed') 

    def get_username(self, obj):
        return obj.user.username