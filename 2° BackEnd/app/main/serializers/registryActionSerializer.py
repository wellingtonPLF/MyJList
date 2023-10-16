from rest_framework import serializers
from main.subModels.registry import Registry
from main.subModels.tag import Tag
from main.subModels.game import Game
from main.serializers.statusSerializer import StatusSerializer
from main.serializers.gameTypeSerializer import GameTypeSerializer
from main.serializers.gameSerializer import GameSerializer
from main.serializers.userSerializer import UserSerializer
from main.serializers.tagSerializer import TagSerializer

class RegistryActionSerializer(serializers.ModelSerializer):
    # Se vc colocar isso, vc vai ter que passar um user dictionary instead of an id, e o retorno vai ser no Serializer referenciado e n do id
    # user = UserSerializer() 
    # Disabilita a passagem do "note" como argumento em create() method, e tb é disabilitado no serializer.data
    # note = serializers.SerializerMethodField()

    class Meta:
        model = Registry
        fields = '__all__'

    def create(self, data):
        data.pop('tag')
        game_pop = data.pop('game')
        tag = Tag.objects.get(id = 1)
        game = Game.objects.get(id = game_pop.id)
        registry = Registry(**data)
        registry.game = game
        registry.tag = tag
        registry.save()
        return registry

    def update(self, instance, validated_data):
        print(validated_data)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance