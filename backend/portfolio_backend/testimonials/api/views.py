# Testimonials/api/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Testimonials
from ..serializers import TestimonialsSerializer


class TestimonialsAPIView(APIView):
    """
    CRUD API for Testimonials
    GET    -> list all Testimonialss / get one
    POST   -> create new Testimonials
    PATCH  -> update Testimonials by id
    DELETE -> delete Testimonials by id
    """

    def get(self, request, pk=None):
        if pk:
            try:
                testimonials = Testimonials.objects.get(pk=pk)
                serializer = TestimonialsSerializer(testimonials, context={'request': request})
                return Response(serializer.data)
            except Testimonials.DoesNotExist:
                return Response({"error": "Testimonials not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            testimonialss = Testimonials.objects.all()
            serializer = TestimonialsSerializer(testimonialss, many=True, context={'request': request})
            return Response(serializer.data)

    def post(self, request):
        serializer = TestimonialsSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        if not pk:
            return Response({"error": "Testimonials ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            testimonials = Testimonials.objects.get(pk=pk)
        except Testimonials.DoesNotExist:
            return Response({"error": "Testimonials not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TestimonialsSerializer(
            testimonials,
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
            return Response({"error": "Testimonials ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            testimonials = Testimonials.objects.get(pk=pk)
        except Testimonials.DoesNotExist:
            return Response({"error": "Testimonials not found"}, status=status.HTTP_404_NOT_FOUND)

        testimonials.delete()
        return Response({"message": "Testimonials deleted"}, status=status.HTTP_204_NO_CONTENT)
