from django.db import models
from users.models import *
import datetime

# Create your models here.

class NewChat(models.Model):
    sender_username = models.CharField(max_length=150)
    receiver_username = models.CharField(max_length=150)
    Date = models.DateField(default=datetime.date.today)
    start_time = models.TimeField(default=datetime.datetime.now().time)
    message = models.CharField()
    
    def __str__(self) -> str:
        return f"Sender:{self.sender_username} , Receiver:{self.receiver_username}"