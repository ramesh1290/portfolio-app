from django.db import models

# Create your models here.
class Testimonials(models.Model):
  name=models.CharField(max_length=20)
  role=models.CharField(max_length=20)
  quote=models.CharField(max_length=500)
  picture=models.ImageField(upload_to='testimonials/images',null=True,blank=True)

  def __str__(self):
    return self.name
