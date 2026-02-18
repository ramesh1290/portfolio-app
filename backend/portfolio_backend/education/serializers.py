from rest_framework import serializers

from .models import Education

class EducationSerializer(serializers.ModelSerializer):
  class Meta:
    model=Education
    fields='__all__' 
  
  def validate(self,data):
    degree=data.get('degree')
    institution=data.get('institution')
    if degree == institution:
       raise serializers.ValidationError(
            "Degree and Institution cannot be the same."
        )
    return data
