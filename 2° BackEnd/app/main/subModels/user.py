from django.db import models
from enum import unique
from main.subModels.auth import Auth
from main.subModels.nationality import Nationality
from datetime import date

class User(models.Model):
    nickname = models.CharField(max_length = 50, blank=False, null=False)
    userImage = models.CharField(max_length = 550, blank=False, null=True)
    bornDate = models.DateField()
    sexuality = models.CharField(max_length=1, choices=( ('M','Masculine'), ('F', 'Female') ), blank=False, null=False)
    joined = models.DateField(default=date.today)
    note = models.CharField(max_length = 550, blank=True, null=True, default="")
    status = models.CharField(max_length = 50, blank=True, null=True, default="off")
    auth = models.ForeignKey(Auth, on_delete=models.CASCADE)
    nationality = models.ForeignKey(Nationality, on_delete=models.CASCADE)
    friend = models.ManyToManyField('self', symmetrical=False) #on_delete=models.SET_NULL

    def __str__(self):
        part_1 = f"\n| Id: {self.id}\n| Nickname: {self.nickname}\n| BornDate: {self.bornDate}\n"
        part_2 = f"| Sexuality: {self.sexuality}\n| Joined: {self.joined}\n"
        part_3 = f"| Note: {self.note}\n| Status: {self.status}\n| Immage: {self.userImage}"
        part_4 = f"| Auth: {self.auth}\n| Nationality: {self.nationality}\n| Friend: {self.friend}"
        return part_1 + part_2 + part_3 + part_4
