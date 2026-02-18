from rest_framework import serializers
from .models import About

class AboutSerializer(serializers.ModelSerializer):

    class Meta:
        model = About
        fields = '__all__'

        
    def get_image(self, obj):
        request = self.context.get('request')  # get request to build full URL
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

