# projects/api/urls.py
from django.urls import path
from .views import ProjectsAPIView

urlpatterns = [
    path('', ProjectsAPIView.as_view(), name='projects-list-create'),       # GET all / POST
    path('<int:pk>/', ProjectsAPIView.as_view(), name='projects-detail'),    # GET one / PATCH / DELETE
]
