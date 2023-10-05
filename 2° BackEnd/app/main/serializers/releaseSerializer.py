from rest_framework import serializers
from main.subModels.game import Game
from main.serializers.plataformSerializer import PlataformSerializer

class ReleaseSerializer(serializers.ModelSerializer):
    plataform = PlataformSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ('id', 'name', 'gameImage', 'plataform')