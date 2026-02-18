# projects/api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Project
from ..serializers import ProjectSerializer

class ProjectsAPIView(APIView):
    """
    CRUD API for Projects
    GET    -> list all projects / get one
    POST   -> create new project
    PATCH  -> update project by id
    DELETE -> delete project by id
    """

    def get(self, request, pk=None):
        if pk:
            try:
                project = Project.objects.get(pk=pk)
                serializer = ProjectSerializer(project, context={'request': request})
                return Response(serializer.data)
            except Project.DoesNotExist:
                return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            projects = Project.objects.all()
            serializer = ProjectSerializer(projects, many=True, context={'request': request})
            return Response(serializer.data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        if not pk:
            return Response({"error": "Project ID required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if not pk:
            return Response({"error": "Project ID required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)

        project.delete()
        return Response({"message": "Project deleted"}, status=status.HTTP_204_NO_CONTENT)
