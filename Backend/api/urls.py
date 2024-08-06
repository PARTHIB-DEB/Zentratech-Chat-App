from django.urls import path,include
from rest_framework.routers import DefaultRouter

myrouter =DefaultRouter()
'''
Registered Urls of class-based views (ModeViewSet) under Myrouter
'''
urlpatterns = myrouter

urlpatterns = [
    path("",include(myrouter.urls))
]
