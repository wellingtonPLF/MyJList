from django.db import models
from main.subModels.user import User

class Network(models.Model):
    value = models.CharField(max_length = 300)
    user = models.ForeignKey(User, on_delete=models.CASCADE)