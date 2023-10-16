from rest_framework import serializers
from main.subModels.user import User

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "userImage", "sexuality", "nickname")