from django.urls import path
from .views import SkillsAPIView

urlpatterns = [
    path('', SkillsAPIView.as_view()),
    path('skills/<int:pk>/', SkillsAPIView.as_view()),
]
