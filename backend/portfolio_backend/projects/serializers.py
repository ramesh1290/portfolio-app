# backend/api/serializers.py
from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # <-- important
    class Meta:
        model = Project
        fields = '__all__'
        
    def get_image(self, obj):
        request = self.context.get('request')  # get request to build full URL
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
