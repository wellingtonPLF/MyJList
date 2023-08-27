from django.db import models
from enum import unique
from main.subModels.auth import Auth
from main.subModels.nationality import Nationality
from datetime import date

class User(models.Model):
    nickname = models.CharField(max_length = 50, blank=False, null=False)
    bornDate = models.DateField()
    sexuality = models.CharField(max_length=1, choices=( ('M','Masculine'), ('F', 'Female') ), blank=False, null=False)
    joined = models.DateField(default=date.today)
    note = models.CharField(max_length = 550, blank=True, null=True, default="")
    status = models.CharField(max_length = 50, blank=True, null=True, default="off")
    auth = models.ForeignKey(Auth, on_delete=models.CASCADE)
    nationality = models.ForeignKey(Nationality, on_delete=models.CASCADE)