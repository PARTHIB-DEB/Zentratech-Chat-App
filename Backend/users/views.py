from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.exceptions import NotFound

# Create your views here.

class UserView(APIView):
    def get(self,request):
        user_datas=UserSerializer(NewUser.objects.all(),many=True)
        return Response(user_datas.data)
    
    def post(self,request):
        user_datas=UserSerializer(data=request.data)
        if user_datas.is_valid():
            user_datas.save()
            uname = user_datas.validated_data.get("username")
            return Response({"Message":f"User {uname} registered successfully"})
        else:
            return Response(user_datas.errors)
        
    def put(self,request):
        data=request.data
        update_user=data['username']
        user_datas=UserSerializer(data=data)
        if user_datas.is_valid():
            user_datas.save()
            return Response({"Message":f"User {update_user} is updated completely"})
        else:
            return Response(user_datas.errors)
        
    def patch(self,request):
        data=request.data
        update_user=data['username']
        user_datas=UserSerializer(data=data,partial=True)
        if user_datas.is_valid():
            user_datas.save()
            return Response({"Message":f"User {update_user} is updated"})
        else:
            return Response(user_datas.errors)
    
    def delete(self,request):
        data=request.data
        delete_user=data['username']
        if len(delete_user)>=5:
            obj = NewUser.objects.get(username=delete_user)
            obj.delete()
            return Response({"Message":f"User {obj.username} is deleted"})
        else:
            raise NotFound(f"User of Username {delete_user} doesn't exists")

            