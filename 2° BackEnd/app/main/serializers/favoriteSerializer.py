from rest_framework import serializers
from main.subModels.registry import Registry

class FavoriteSerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField()

    def get_game(self, registry):
        game = None
        try:
            game = {
                'id': registry.game.id,
                'gameImage': registry.game.gameImage
            }
        except:
            return game
        return game

    class Meta:
        model = Registry
        fields = ('id', 'game')