from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .renderers import UserJSONRenderer
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView
from .serializers import (
    LoginSerializer, RegistrationSerializer, UserSerializer, GroupSerializer, UsersRetrieve, DeleteSerializer
)
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from .models import User


class RegistrationAPIView(APIView):
    """
    Разрешить доступ к данному эндпоинту только администраторам.
    """
    permission_classes = (IsAdminUser,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    @method_decorator(ensure_csrf_cookie)
    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @method_decorator(ensure_csrf_cookie)
    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserUpdateGroupAPIView(APIView):
    permission_classes = (IsAdminUser,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = GroupSerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDeleteAPIView(APIView):
    permission_classes = (IsAdminUser,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = DeleteSerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class UsersRetrieveAPIView(ListAPIView):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UsersRetrieve
