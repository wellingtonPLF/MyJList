from django.db import models

class Status(models.Model):
    value = models.CharField(max_length = 30, blank=False, null=False)

    def __str__(self):
        return f"\n| Result: {value}|\n"