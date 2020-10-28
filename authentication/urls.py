from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (
     ObtainTokenPairWithColorView, 
     LogoutAndBlacklistRefreshTokenForUserView,
     TEST_API_LIST,
     UserCreateAPIView,
     UserDetailAPIView,
     UserListAPIView,
     UserDeleteAPIView,
     UserUpdateAPIView,
     CurrentUserDataAPIView
)
from rest_framework_simplejwt.views import (
    TokenVerifyView,
)

urlpatterns = [
    path('auth/user/create/', UserCreateAPIView.as_view(), name="user-create"),
    path('auth/user/', UserListAPIView.as_view(), name='user-list'),
    path('auth/user/current/', CurrentUserDataAPIView.as_view(), name='user-current'),
    path('auth/user/<slug:username>/',
         UserDetailAPIView.as_view(), name='user-detail'),
    path('auth/user/<slug:username>/edit/',
         UserUpdateAPIView.as_view(), name='user-update'),
    path('auth/user/<slug:username>/delete/',
         UserDeleteAPIView.as_view(), name='user-delete'),

     #token urls or test
     path('auth/token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token-create'),
     path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token-refresh'),
     path('auth/test/get/', TEST_API_LIST.as_view(), name='test-shit'),
     path('auth/blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(),
         name='blacklist'),
     path('auth/token/verify/', TokenVerifyView.as_view(), name='token-verify'),
]
