# from django.conf.urls import url
from django.urls import path, include
from .views import (
    CourseListApiView,
)

urlpatterns = [
    path('', CourseListApiView.as_view()),
]
