from django.db import models
from main.subModels.game import Game
from main.subModels.user import User
from main.subModels.tag import Tag
from main.enum.gameEnum import GameEnum
from main.subModels.auth import Auth

PROGRESS_CHOICES = [
    (GameEnum.PLAN.name, GameEnum.PLAN.value), 
    (GameEnum.PLAY.name, GameEnum.PLAY.value),
    (GameEnum.DROP.name, GameEnum.DROP.value),
    (GameEnum.HOLD.name, GameEnum.HOLD.value),
    (GameEnum.REPLAY.name, GameEnum.REPLAY.value),
    (GameEnum.COMPLETE.name, GameEnum.COMPLETE.value)
]

NOTE_CHOICES = [
    ('3', GameEnum.HORRIBLE.value),
    ('5', GameEnum.MEH.value),
    ('7', GameEnum.FINE.value),
    ('8', GameEnum.GOOD.value),
    ('9', GameEnum.GREAT.value),
    ('10', GameEnum.BEST.value)
]

class Registry(models.Model):
    progress = models.CharField(max_length = 30, default=GameEnum.PLAN.name, choices=PROGRESS_CHOICES)
    note = models.CharField(max_length = 30, null=True, default=None, choices=NOTE_CHOICES)
    favorite = models.BooleanField(default=False)
    updateDate = models.DateTimeField(auto_now=True)
    recommendation = models.BooleanField(default=False)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'game'], name='unique_user_game')
        ]

    def __str__(self):
        return f"\n| Id: {self.id}\n| Note: {self.note}\n UpdateDate: {self.updateDate}\n Favorite: {self.favorite}\n Progress: {self.progress} |\n"