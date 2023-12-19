from rest_framework.generics import CreateAPIView
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.serializers import serialize
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny
from .models import UserProfile
from rest_framework import status


# handles request and parses body for username and password
class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(username=username, password=password)
            # make a userProfile link to the username
            user_profile = UserProfile(user=user)
            user_profile.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
class PageAmount(APIView):

    def get(self, request, pk=None):
        myid = request.user.id
        user_profile = get_object_or_404(UserProfile, user=request.user)
        username = user_profile.user.username
        pages_completed = user_profile.pages_completed
        return Response({'username': username, 'pages_completed': pages_completed, 'myid' : myid})

    
    def post(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        new_pages_completed = request.data.get('pages_completed')

        if new_pages_completed is not None:
            user_profile.pages_completed += new_pages_completed
            user_profile.save()
            return Response({'message': 'updated'})
        else:
            return Response({'error': 'Not updated'})
        
class PageAmountUser(APIView):

    def get(self, request, pk):
        user= User.objects.get(pk=pk)
        user = get_object_or_404(User, pk=pk)
        user_profile = get_object_or_404(UserProfile, user=user)
        username = user_profile.user.username
        pages_completed = user_profile.pages_completed

        return Response({'username': username, 'pages_completed': pages_completed})
    
class DecreasePages(APIView):
    def post(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        new_pages_completed = request.data.get('pages')

        if new_pages_completed is not None:
            user_profile.pages_completed -= new_pages_completed
            user_profile.save()
            return Response({'message': 'updated'})
        else:
            return Response({'error': 'Not updated'})
        
class Leaderboard(APIView):
    def get(self, request, pk=None):
        user_profiles = UserProfile.objects.all()
        users_data = []
        for user_profile in user_profiles:

            username = user_profile.user.username
            pages_completed = user_profile.pages_completed
            user_id = user_profile.user.id
            users_data.append({'username': username, 'pages_completed': pages_completed, 'user_id': user_id})

        return Response(users_data)
    
class FriendsList(APIView):
    def get(self, request):
        current_user_profile = UserProfile.objects.get(user=request.user)
        friends = current_user_profile.friends.all()
        if friends.exists():
            return Response({'friends': list(friends)})
        else:
            return Response({'message': 'You have no friends.'})
    
class FriendPatch(APIView):
    def patch(self, request):
        current_user_profile = UserProfile.objects.get(user=request.user)
        action = request.data.get('action')  #'add' or 'remove'
        friend_id = request.data.get('friend_id')  

        try:
            friend_profile = UserProfile.objects.get(id=friend_id)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Friend profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if action == 'add':
            current_user_profile.friends.add(friend_profile)
            return Response({'message': 'Friend added successfully'})

        elif action == 'remove':
            current_user_profile.friends.remove(friend_profile)
            return Response({'message': 'Friend removed successfully'})

        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)