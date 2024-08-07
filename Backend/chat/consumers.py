import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from users.models import NewUser
from .models import NewChat

class ChatConsumer(WebsocketConsumer):
    time_seconds=1
    #connect to a chatgroup
    def connect(self):
        self.room_name = "testroom"
        self.room_group_name = self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()
        self.time_seconds+=1
    
    # leave chatgroup
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket (From Frontend)
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        sender_username = text_data_json["sender_username"]
        receiver_username = text_data_json["receiver_username"]
        sender_message = text_data_json["sender_message"]
        receiver_message = text_data_json["receiver_message"]

        try:
            sender = NewUser.objects.get(username=sender_username)
            receiver = NewUser.objects.get(username=receiver_username)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                    "type": "chat_message",
                    "sender_username": sender.username,
                    "receiver_username": receiver.username,
                    "sender_message": sender_message,
                    "receiver_message": receiver_message
                }
            )
            if NewChat.objects.filter(sender_username=sender,receiver_username=receiver).exists() == False:
                obj = NewChat.objects.create(
                    sender_username=sender_username,
                    receiver_username=receiver_username,
                    sender_message=sender_message,
                    receiver_message=receiver_message
                )
                obj.save()
            else:
                obj = NewChat.objects.get(sender_username=sender_username,receiver_username=receiver_username)
                obj.sender_message += "\n"+sender_message
                obj.receiver_message += "\n"+receiver_message
                obj.end_time += self.time_seconds
                obj.save()
        except NewUser.DoesNotExist:
            self.send(text_data=json.dumps({
                'error': 'User not found'
            }))
            return

    # Receive message from room group (To Frontend)
    def chat_message(self, event):
        sender_username = event["sender_username"]
        sender_message = event["sender_message"]

        self.send(text_data=json.dumps({
            "sender_username": sender_username,
            "sender_message": sender_message
        }))

