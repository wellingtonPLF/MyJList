from rest_framework import serializers
from main.subModels.game import Game

class ReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'name', 'gameImage', 'plataform')