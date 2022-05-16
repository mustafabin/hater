from django.test import tag
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib import auth
from django.contrib.auth.models import User
from hater_app.models import User_profile
from hater_app.serializers import User_profileSerializer
from .serializers import UserSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})

        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated'})
            else:
                return Response({'error': 'Error Authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in'})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logged Out'})
        except:
            return Response({'error': 'Something went wrong when logging out'})


class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']
        tag = data['tag']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({"error": "Username already exists"})
                else:
                    if len(password) < 6:
                        return Response({"error": "Password must be at least 6 characters"})
                    else:
                        user = User.objects.create_user(
                            username=username, password=password)

                        user = User.objects.get(id=user.id)

                        user_profile = User_profile.objects.create(
                            user=user, name=username, tag=tag)

                        return Response({'success': "User created successfully"})
            else:
                return Response({'error': "Passwords do not match"})
        except:
            return Response({"error": "Something went wrong signing up"})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
      
        return Response({'success': 'CSRF cookie set'},200,None,{"Access-Control-Expose-Headers": "*","Access-Control-Allow-Origin": "*"})


class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            user = User.objects.filter(id=user.id).delete()

            return Response({'success': 'User deleted successfully'})
        except:
            return Response({'error': 'Something went wrong when trying to delete user'})


class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return Response(users.data)


class GrabProfile(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user
            profile = User_profile.objects.get(user=user)
            profile_json = User_profileSerializer(profile)
            return Response({'profile': profile_json.data})
        except:
            return Response({'error': "( ﾟДﾟ)b error; make sure ur logged in "})
