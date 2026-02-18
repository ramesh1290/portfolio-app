from django.urls import path
from .views import TestimonialsAPIView

urlpatterns = [
    path('', TestimonialsAPIView.as_view(), name='testimonials-list'),
    path('<int:pk>/', TestimonialsAPIView.as_view(), name='testimonials-detail'),
]
