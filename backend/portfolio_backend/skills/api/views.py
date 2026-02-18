from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Skill
from ..serializers import SkillSerializer

class SkillsAPIView(APIView):
    """
    CRUD API for Skills
    GET    -> list all / get one
    POST   -> create
    PATCH  -> update
    DELETE -> delete
    """

    def get(self, request, pk=None):
        if pk:
            try:
                skill = Skill.objects.get(pk=pk)
                serializer = SkillSerializer(skill, context={'request': request})
                return Response(serializer.data)
            except Skill.DoesNotExist:
                return Response({"error": "Skill not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            skills = Skill.objects.all()
            serializer = SkillSerializer(skills, many=True, context={'request': request})
            return Response(serializer.data)

    def post(self, request):
        serializer = SkillSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        if not pk:
            return Response({"error": "Skill ID required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            skill = Skill.objects.get(pk=pk)
        except Skill.DoesNotExist:
            return Response({"error": "Skill not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SkillSerializer(skill, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if not pk:
            return Response({"error": "Skill ID required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            skill = Skill.objects.get(pk=pk)
        except Skill.DoesNotExist:
            return Response({"error": "Skill not found"}, status=status.HTTP_404_NOT_FOUND)

        skill.delete()
        return Response({"message": "Skill deleted"}, status=status.HTTP_204_NO_CONTENT)
