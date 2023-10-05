from rest_framework import serializers
from main.subModels.registry import Registry
from main.serializers.statusSerializer import StatusSerializer
from main.serializers.gameTypeSerializer import GameTypeSerializer
from main.serializers.tagSerializer import TagSerializer

class RegistrySerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField()
    note = serializers.SerializerMethodField()
    tag = TagSerializer()

    def get_note(self, registry):
        return registry.get_note_display()

    def get_game(self, registry):
        game = None
        try:
            game = {
                "id": registry.game.id,
                "name": registry.game.name,
                "gameImage": registry.game.gameImage,
                "playtime": registry.game.playtime
            }
        except:
            return game
        return game

    class Meta:
        model = Registry
        # fields = '__all__'
        fields = ("id", "note", "favorite", "progress", "tag", "user", "game")
