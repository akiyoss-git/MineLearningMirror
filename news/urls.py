from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    NewCreateAPIView,
    NewDetailAPIView,
    NewListAPIView,
    NewDeleteAPIView,
    NewUpdateAPIView
)

urlpatterns = [
    path('', NewListAPIView.as_view(), name='new-list'),
    path('create/', NewCreateAPIView.as_view(), name='new-create'),
    path('<slug:slug>/', NewDetailAPIView.as_view(), name='new-detail'),
    path('<slug:slug>/edit/', NewUpdateAPIView.as_view(), name='new-update'),
    path('<slug:slug>/delete/', NewDeleteAPIView.as_view(), name='new-delete'),
]
