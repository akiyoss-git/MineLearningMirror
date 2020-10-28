from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    CourseCreateAPIView,
    CourseDetailAPIView,
    CourseListAPIView,
    CourseDeleteAPIView,
    CourseUpdateAPIView
)

urlpatterns = [
    path('', CourseListAPIView.as_view(), name='course-list'),
    path('create/', CourseCreateAPIView.as_view(), name='course-create'),
    path('<slug:slug>/', CourseDetailAPIView.as_view(), name='course-detail'),
    path('<slug:slug>/edit/', CourseUpdateAPIView.as_view(), name='course-update'),
    path('<slug:slug>/delete/', CourseDeleteAPIView.as_view(), name='course-delete'),
]
