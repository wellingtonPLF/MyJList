from django.db import models
from main.subModels.user import User
from main.subModels.game import Game
from main.enum.commentEnum import CommentEnum
from datetime import date

VOTE_CHOICES = [
    ('0', CommentEnum.PREMIATION.value),
    ('1', CommentEnum.FUNNY.value),
    ('2', CommentEnum.YES.value),
    ('3', CommentEnum.NO.value)
]

class Comment(models.Model):
    content = models.CharField(max_length = 300, blank=True, null=True)
    vote = models.CharField(max_length = 50, null=True, choices=VOTE_CHOICES)
    publication = models.DateField(default=date.today)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

    def __str__(self):
        return f"\n| Id: {self.id}\n| Content: {self.content}\n| Vote: {self.vote}\n| Publication: {self.publication}\n\n| User: [{self.user} ]\n\n| Game: [{self.game} ]\n\n"