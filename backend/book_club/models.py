from django.db import models
from book.models import Book
from django.contrib.auth.models import User
from django.utils import timezone

class BookClub(models.Model):
    members = models.ManyToManyField(User, related_name='book_club_members')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_book_clubs')
    name = models.CharField(max_length=50)



    
class MessageBoardPost(models.Model):
    bookclub = models.ForeignKey(BookClub, related_name='book_club', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='message_maker')
    message = models.CharField(max_length=255)
    time = models.DateTimeField(default=timezone.now)