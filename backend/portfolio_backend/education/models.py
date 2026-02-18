from django.db import models
from django.core.exceptions import ValidationError
# Create your models here.
class Education(models.Model):
  degree=models.CharField(max_length=50)
  institution=models.CharField(max_length=50)
  field_of_study=models.CharField(max_length=50)
  year=models.CharField(max_length=50)

  def __str__(self):
    return self.degree
      # <-- Add this method
  def clean(self):
        if self.degree and self.institution and self.degree == self.institution:
            raise ValidationError("Degree and Institution cannot be the same.")

