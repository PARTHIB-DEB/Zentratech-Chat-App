from django.urls import path, include, re_path
from users.views import *
from chat.views import *
from chat.consumers import *

urlpatterns = [
    path("auth", include("rest_framework.urls", namespace="rest_framework")),  # auth/login -> login , auth/logout -> logout
    path("register", UserView.as_view(), name="Register-User"),
    path("request",Requestview.as_view(),name="Friend-Request"),
]

websocket_urlpatterns = [
    re_path(r"ws/chat", ChatConsumer.as_asgi()),
]
