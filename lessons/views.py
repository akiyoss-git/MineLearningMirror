from lessons.models import Lesson
from rest_framework import generics, views
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response

from .serializers import (
    LessonListSerializer,
    LessonDeleteSerializer,
    LessonCreateSerializer,
    LessonUpdateSerializer,
    LessonDetailSerializer
)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, generics


class LessonListAPIView(generics.ListAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonListSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['course__slug']
    ordering_fields = '__all__'


class LessonCreateAPIView(generics.CreateAPIView):
    serializer_class = LessonCreateSerializer
    queryset = Lesson.objects.all()
    permission_classes = [IsAdminUser]


class LessonDetailAPIView(generics.RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class LessonDeleteAPIView(generics.DestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonDeleteSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'


class LessonUpdateAPIView(generics.UpdateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonUpdateSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'
