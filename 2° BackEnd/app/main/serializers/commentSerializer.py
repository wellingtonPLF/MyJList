from rest_framework import serializers
from main.subModels.comment import Comment
from main.subModels.user import User
from main.subModels.game import Game
from main.serializers.userSerializer import UserSerializer
from main.serializers.gameSerializer import GameSerializer

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    game = GameSerializer()
    # vote_display = serializers.CharField(source='get_vote_display')
    # /\ If you wanna show the value

    def create(self, data):
        user = data.pop('user')
        game = data.pop('game')

        comment = Comment(**data)
        comment.user = User.objects.get(nickname=user['nickname'])
        comment.game = Game.objects.get(name=game['name'])
        
        comment.save()
        return comment

    class Meta:
        model = Comment
        fields = '__all__'
        # fields = ("id", "content", "vote", "publication", "game", "user")