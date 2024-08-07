from django.db import models
from users.models import *
import datetime

# Create your models here.

class NewChat(models.Model):
    sender_username = models.ForeignKey(NewUser,on_delete=models.CASCADE)
    receiver_username = models.ForeignKey(NewUser,on_delete=models.CASCADE)
    Date = models.DateField(default=datetime.date.today)
    start_time = models.TimeField(default=datetime.datetime.now().second)
    end_time = models.TimeField(default=datetime.datetime.now().second)
    sender_message = models.CharField()
    receiver_message = models.CharField()
    
    def __str__(self) -> str:
        return f"Sender:{self.sender_username} , Receiver:{self.receiver_username}"