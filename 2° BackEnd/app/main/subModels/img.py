from django.db import models
from main.subModels.game import Game

class Img(models.Model):
    value = models.CharField(max_length = 300, blank=False, null=False)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)