# backend/api/models.py
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField()
    link = models.URLField()
    image = models.ImageField(upload_to='projects/images', null=True, blank=True)

    def __str__(self):
        return self.title
