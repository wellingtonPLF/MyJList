from django.db import models

class Nationality(models.Model):
    name = models.CharField(max_length = 50, blank=False, null=False)