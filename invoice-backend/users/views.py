from rest_framework import generics, permissions, views
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class CurrentUserView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
