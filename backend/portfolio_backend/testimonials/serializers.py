from rest_framework import serializers
from .models import Testimonials
class TestimonialsSerializer(serializers.ModelSerializer):
  class Meta:
    model=Testimonials
    fields='__all__'
  def get_picture(self, obj):
        request = self.context.get('request')  # get request to build full URL
        if obj.picture:
            return request.build_absolute_uri(obj.picture.url)
        return None