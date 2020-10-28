from rest_framework import status, permissions
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.http import Http404
from .permissions import IsOwnerOrAdminOrReadOnly
from rest_framework import generics, views

from .models import CustomUser


from .serializers import (
    UserCreateSerializer,
    UserDetailSerializer,
    UserListSerializer,
    UserUpdateSerializer,
    MyTokenObtainPairSerializer
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)



class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class TEST_API_LIST(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        json = {"hello": "world"}
        return Response(json, status=status.HTTP_201_CREATED)


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    throttle_scope = 'create_user'


class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'username'
    permission_classes = [AllowAny]


class UserDeleteAPIView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'username'
    permission_classes = [IsOwnerOrAdminOrReadOnly]


class UserUpdateAPIView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'username'
    permission_classes = [AllowAny]
    throttle_scope = 'edit_user'


class UserListAPIView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserListSerializer
    permission_classes = [AllowAny]


class CurrentUserDataAPIView(APIView):
    def get_object(self):
        try:
            return self.request.user
        except:
            raise Http404

    def get(self, request):
        user = CustomUser.objects.get(username=request.user)
        serializer = UserDetailSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            if str(e) == "Token is invalid or expired":
                return Response("Token Broken", status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_400_BAD_REQUEST)
