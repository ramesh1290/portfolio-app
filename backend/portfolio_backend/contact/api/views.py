from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers import MessageSerializer
from ..models import Message
class ContactAPIView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Message sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Handle GET (fetching all messages)
    def get(self, request):
        messages = Message.objects.all().order_by('-id')  # latest first
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
