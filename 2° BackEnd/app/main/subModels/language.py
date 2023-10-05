from django.db import models

class Language(models.Model):
    value = models.CharField(max_length = 50, blank=False, null=False)
    langcod = models.CharField(max_length = 10, blank=False, null=False)
    countrycod = models.CharField(max_length = 2, blank=False, null=False)