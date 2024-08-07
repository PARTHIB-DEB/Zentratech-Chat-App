from rest_framework import serializers
from .models import NewUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = "__all__"

    def create(self, validated_data):
        if not validated_data["username"] or len(validated_data["username"]) >= 5:
            raise serializers.ValidationError("Length of username must be atleast 5")

        if not validated_data["email"]:
            raise serializers.ValidationError("Email Can't be Null")

        if not validated_data["first_name"]:
            raise serializers.ValidationError("First_name Can't be Null")

        if not validated_data["last_name"]:
            raise serializers.ValidationError("Last_name Can't be Null")

        return super().create(validated_data)

    def update(self, instance, validated_data):
        responsestack = {"Existing values in": None}

        if validated_data["username"]:
            if NewUser.objects.filter(username=validated_data["username"]).exists():
                responsestack["Existing values in"] = "Username"
            if len(validated_data["username"]) >= 5:
                raise serializers.ValidationError(
                    "Length of username must be atleast 5"
                )
            else:
                instance.username = validated_data.get("username", instance.username)

        if validated_data["email"]:
            if NewUser.objects.filter(email=validated_data["email"]).exists():
                responsestack["Existing values in"] = "Email"
            else:
                instance.email = validated_data.get("email", instance.email)

        if validated_data["first_name"]:
            if NewUser.objects.filter(first_name=validated_data["first_name"]).exists():
                responsestack["Existing values in"] += " , first_name"
            else:
                instance.first_name = validated_data.get(
                    "first_name", instance.first_name
                )

        if validated_data["last_name"]:
            if NewUser.objects.filter(first_name=validated_data["last_name"]).exists():
                responsestack["Existing values in"] += " , last_name"
            else:
                instance.last_name = validated_data.get("last_name", instance.last_name)

        if validated_data["password"]:
            if NewUser.objects.filter(password=validated_data["password"]).exists():
                responsestack["Existing values in"] += " , password"
            else:
                instance.password = validated_data.get("password", instance.password)

        instance.save()
        return instance
