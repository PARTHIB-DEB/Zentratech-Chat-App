from django.urls import path,include,re_path
from users.views import *
from chat.views import *
from chat.consumers import *

urlpatterns = [
    path("register",UserView.as_view(),name="Register-User"),
    path('auth', include('rest_framework.urls', namespace='rest_framework')) # auth/login -> login , auth/logout -> logout
]

websocket_urlpatterns = [
    re_path(r"ws/chat", ChatConsumer.as_asgi()),
]