from django.db import models
from main.subModels.theme import Theme
from main.subModels.studio import Studio
from main.subModels.status import Status
from main.subModels.language import Language
from main.subModels.gametype import GameType
from main.subModels.producer import Producer
from main.subModels.plataform import Plataform
from main.subModels.perspective import Perspective

from django.contrib.postgres.indexes import GinIndex

class Game(models.Model):
    release = models.DateField()
    playtime = models.FloatField(default = 0.0)
    source = models.CharField(default="gameAPI", max_length = 50, blank=False, null=False)
    premiede = models.CharField(default="unknow", max_length = 30, blank=False, null=False)
    gameImage = models.CharField(max_length = 300, blank=False, null=False)
    description = models.CharField(max_length = 500, blank=False, null=False)
    name = models.CharField(max_length = 100)

    theme =  models.ManyToManyField(Theme)
    studio = models.ManyToManyField(Studio)
    producer = models.ManyToManyField(Producer)
    status = models.ManyToManyField(Status)
    language = models.ManyToManyField(Language)
    gameType = models.ManyToManyField(GameType) #Fps, Moba and Etc
    plataform = models.ManyToManyField(Plataform)
    perspective = models.ManyToManyField(Perspective)

    class Meta:
        indexes = [
            GinIndex(name='NewGinIndex', fields=['name'])
        ]

    def __str__(self):
        return f"\n| Id: {self.id}\n| gameImage: {self.gameImage}\n| Name: {self.name}"