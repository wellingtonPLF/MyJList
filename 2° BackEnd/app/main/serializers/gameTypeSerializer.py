from rest_framework import serializers
from main.subModels.gametype import GameType

class GameTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameType
        fields = '__all__'