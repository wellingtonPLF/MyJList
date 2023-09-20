from rest_framework import serializers
from main.subModels.registry import Registry
from main.serializers.statusSerializer import StatusSerializer
from main.serializers.gameTypeSerializer import GameTypeSerializer

class RegistrySerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField()

    def get_game(self, registry):
        game = None
        try:
            game = {
                "id": registry.game.id,
                "tag": registry.game.tag,
                "realease": registry.game.realease,
                "playtime": registry.game.playtime,
                "status": StatusSerializer(registry.game.status, many=True, read_only=True).data,
                "gameType":  GameTypeSerializer(registry.game.gameType, many=True, read_only=True).data
            }
        except:
            return game
        return game

    class Meta:
        model = Registry
        # fields = '__all__'
        fields = ("id", "note", "favorite", "progress", "user", "game")
