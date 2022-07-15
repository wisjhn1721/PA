from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Course
from .serializers import CourseSerializer


class CourseListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        """
        List all the course items for given requested user
        """
        # courses = Course.objects.filter(user=request.user.id)
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        """
        Create the course with given data
        """
        data = {
            'title': request.data.get('title'),
            'code': request.data.get('code'),
            'building': request.data.get('building'),
            'room': request.data.get('room'),
            'user': request.user.id
        }
        serializer = CourseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
