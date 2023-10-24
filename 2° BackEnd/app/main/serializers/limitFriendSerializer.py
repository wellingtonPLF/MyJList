from rest_framework import serializers
from main.subModels.user import User

class LimitFriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'friend')