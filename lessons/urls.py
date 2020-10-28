from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    LessonCreateAPIView,
    LessonDetailAPIView,
    LessonListAPIView,
    LessonDeleteAPIView,
    LessonUpdateAPIView
)

urlpatterns = [
    path('', LessonListAPIView.as_view(), name='lesson-list'),
    path('create/', LessonCreateAPIView.as_view(), name='lesson-create'),
    path('<slug:slug>/', LessonDetailAPIView.as_view(), name='lesson-detail'),
    path('<slug:slug>/edit/', LessonUpdateAPIView.as_view(), name='lesson-update'),
    path('<slug:slug>/delete/', LessonDeleteAPIView.as_view(), name='lesson-delete'),
]
