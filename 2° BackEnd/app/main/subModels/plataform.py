from django.db import models

class Plataform(models.Model):
    value = models.CharField(max_length = 50, blank=False, null=False)