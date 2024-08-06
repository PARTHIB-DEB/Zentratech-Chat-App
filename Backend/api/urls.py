from django.urls import path,include
from users.views import *
from chat.views import *

urlpatterns = [
    path("register",UserView.as_view(),name="Register-User"),
    # path("login",)
    # path("chats")
]
