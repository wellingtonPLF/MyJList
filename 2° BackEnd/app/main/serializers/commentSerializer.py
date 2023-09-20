from rest_framework import serializers
from main.subModels.comment import Comment

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    game = serializers.SerializerMethodField()

    def get_game(self, comment):
        game = None
        try:
            game = {
                "id": comment.game.id,
                "gameImage": comment.game.gameImage
            }
        except:
            return game
        return game

    def get_user(self, comment):
        user = None
        try:
            user = {
                "id": comment.user.id,
                "nickname": comment.user.nickname,
                "status": comment.user.status,
                "sexuality": comment.user.sexuality,
                "userImage": comment.user.userImage
            }
        except:
            return user
        return user

    class Meta:
        model = Comment
        # fields = '__all__'
        fields = ("id", "content", "vote", "publication", "game", "user")
