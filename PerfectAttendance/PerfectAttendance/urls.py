from django.contrib import admin
from django.urls import path, include
from ..courses_api import urls as courses_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('todos/', include(courses_urls)),
]
