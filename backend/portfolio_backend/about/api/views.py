# about/api/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import About
from ..serializers import AboutSerializer


class AboutAPIView(APIView):
    """
    CRUD API for About
    GET    -> list all abouts / get one
    POST   -> create new about
    PATCH  -> update about by id
    DELETE -> delete about by id
    """

    def get(self, request, pk=None):
        if pk:
            try:
                about = About.objects.get(pk=pk)
                serializer = AboutSerializer(about, context={'request': request})
                return Response(serializer.data)
            except About.DoesNotExist:
                return Response({"error": "About not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            abouts = About.objects.all()
            serializer = AboutSerializer(abouts, many=True, context={'request': request})
            return Response(serializer.data)

    def post(self, request):
        serializer = AboutSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        if not pk:
            return Response({"error": "About ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            about = About.objects.get(pk=pk)
        except About.DoesNotExist:
            return Response({"error": "About not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AboutSerializer(
            about,
            data=request.data,
            partial=True,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if not pk:
            return Response({"error": "About ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            about = About.objects.get(pk=pk)
        except About.DoesNotExist:
            return Response({"error": "About not found"}, status=status.HTTP_404_NOT_FOUND)

        about.delete()
        return Response({"message": "About deleted"}, status=status.HTTP_204_NO_CONTENT)
