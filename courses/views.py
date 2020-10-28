from courses.models import Course
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
    CourseListSerializer,
    CourseDeleteSerializer,
    CourseCreateSerializer,
    CourseUpdateSerializer,
    CourseDetailSerializer
)

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, generics

class CourseListAPIView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseListSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = '__all__'


class CourseCreateAPIView(generics.CreateAPIView):
    serializer_class = CourseCreateSerializer
    queryset = Course.objects.all()
    permission_classes = [IsAdminUser]


class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class CourseDeleteAPIView(generics.DestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDeleteSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'


class CourseUpdateAPIView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseUpdateSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'slug'
