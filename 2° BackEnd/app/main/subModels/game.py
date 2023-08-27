from django.db import models
from main.subModels.tag import Tag
from main.subModels.user import User

class Game(models.Model):
    status = models.CharField(max_length = 50)
    score = models.IntegerField()
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    fav = models.ManyToManyField(User, related_name='favorite_games')
    play = models.ManyToManyField(User, related_name='played_games')