from django.db import models

class Studio(models.Model):
    value = models.CharField(max_length = 50, blank=False, null=False)