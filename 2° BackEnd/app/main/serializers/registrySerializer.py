from rest_framework import serializers
from main.subModels.registry import Registry
from main.subModels.tag import Tag
from main.subModels.game import Game
from main.serializers.statusSerializer import StatusSerializer
from main.serializers.gameTypeSerializer import GameTypeSerializer
from main.serializers.gameSerializer import GameSerializer
from main.serializers.userSerializer import UserSerializer
from main.serializers.tagSerializer import TagSerializer

class RegistrySerializer(serializers.ModelSerializer):
    game = GameSerializer()
    tag = TagSerializer()
    progress = serializers.SerializerMethodField()
    note = serializers.SerializerMethodField()

    def get_note(self, registry):
        result = "Unknow"
        if (registry.note != None):
            result = registry.get_note_display()
        return result

    def get_progress(self, registry):
        return registry.get_progress_display()
    
    class Meta:
        model = Registry
        fields = ("id", "note", "favorite", "recommendation", "progress", "tag", "user", "game")