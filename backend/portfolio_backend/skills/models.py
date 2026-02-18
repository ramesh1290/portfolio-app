from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)  # store Tailwind color class
    image = models.ImageField(upload_to='skills/images', null=True, blank=True)  # optional icon

    def __str__(self):
        return self.name
