# Education/api/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Education
from ..serializers import EducationSerializer


class EducationAPIView(APIView):
    """
    CRUD API for Education
    GET    -> list all Educations / get one
    POST   -> create new Education
    PATCH  -> update Education by id
    DELETE -> delete Education by id
    """

    def get(self, request, pk=None):
        if pk:
            try:
                education = Education.objects.get(pk=pk)
                serializer = EducationSerializer(education)
                return Response(serializer.data)
            except Education.DoesNotExist:
                return Response({"error": "Education not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            educations = Education.objects.all()
            serializer = EducationSerializer(educations, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = EducationSerializer(data=request.data )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        if not pk:
            return Response({"error": "Education ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            education = Education.objects.get(pk=pk)
        except Education.DoesNotExist:
            return Response({"error": "Education not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EducationSerializer(
            education,
            data=request.data,
            partial=True
            
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if not pk:
            return Response({"error": "Education ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            education = Education.objects.get(pk=pk)
        except Education.DoesNotExist:
            return Response({"error": "Education not found"}, status=status.HTTP_404_NOT_FOUND)

        education.delete()
        return Response({"message": "Education deleted"}, status=status.HTTP_204_NO_CONTENT)
