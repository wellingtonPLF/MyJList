from django.db import models

class Nationality(models.Model):
    cod = models.CharField(max_length = 2, blank=False, null=False)
    name = models.CharField(max_length = 50, blank=False, null=False)