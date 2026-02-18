from rest_framework import serializers
from .models import Skill

class SkillSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'color', 'image']
