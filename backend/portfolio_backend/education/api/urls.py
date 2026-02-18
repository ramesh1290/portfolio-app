from django.urls import path
from .views import EducationAPIView

urlpatterns = [
    path('', EducationAPIView.as_view(), name='education-list'),
    path('<int:pk>/', EducationAPIView.as_view(), name='education-detail'),
]
