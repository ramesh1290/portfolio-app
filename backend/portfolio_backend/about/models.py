from django.db import models

class About(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='about/', null=True, blank=True)

    def __str__(self):
        return self.title
