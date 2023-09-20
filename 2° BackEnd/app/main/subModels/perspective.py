from django.db import models

class Perspective(models.Model):
    value = models.CharField(max_length = 30, blank=False, null=False)