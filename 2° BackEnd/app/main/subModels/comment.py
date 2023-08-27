from django.db import models
from main.subModels.user import User
from main.subModels.game import Game

class Comment(models.Model):
    publication = models.DateField()
    vote = models.CharField(max_length = 50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
