from django.db import models
from main.subModels.user import User
from main.subModels.game import Game
from main.enum.commentEnum import CommentEnum

VOTE_CHOICES = [
    (CommentEnum.PREMIATION.value, CommentEnum.PREMIATION.name),
    (CommentEnum.FUNNY.value, CommentEnum.FUNNY.name),
    (CommentEnum.YES.value, CommentEnum.YES.name),
    (CommentEnum.NO.value, CommentEnum.NO.name)
]

class Comment(models.Model):
    content = models.CharField(max_length = 300, blank=True, null=True)
    vote = models.CharField(max_length = 50, null=True, choices=VOTE_CHOICES)
    publication = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

    def __str__(self):
        return f"\n| Id: {self.id}\n| Content: {self.content}\n| Vote: {self.vote}\n| Publication: {self.publication}\n\n| User: [{self.user} ]\n\n| Game: [{self.game} ]\n\n"