from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.exceptions import NotFound
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class UserView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "user": f"{str(request.user)}",
            "receivers":f"{list(NewUser.objects.values_list("username", flat=True).exclude(username=request.user.username))}"
        })

    def post(self, request):
        user_datas = UserSerializer(data=request.data)
        if user_datas.is_valid():
            user_datas.save()
            uname = user_datas.validated_data.get("username")
            return Response(
                {
                    "Message": "Successfully Registered",
                    "Logged-In": f"{NewUser.objects.get(username=uname).is_authenticated}",
                }
            )
        else:
            return Response(user_datas.errors)


class Requestview(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        return Response({
            "user":f"{NewUser.objects.get(req_got=1).username}",
            "sender":f"{[request.user]}"
        })
    
    def post(self,request):
        data = RequestSerialiser(data=request.data)
        if data.is_valid():
            senderobj = NewUser.objects.get(username=data.validated_data.get("sender"))
            senderobj.req_sent = 1
            senderobj.save()
            receiverobj = NewUser.objects.get(username=data.validated_data.get("receiver"))
            receiverobj.req_got = 1
            receiverobj.save()
        else:
            raise ValidationError("Friend Request Data Is Not in Proper Format")