from django.contrib import admin
from django.urls import path, include
from courses_api import urls as courses_urls
# from .Users.api import urls as auth_urls


urlpatterns = [
    path('admin/', admin.site.urls),

    # /api/auth/login -> LoginView
    # /api/auth/logout -> LogoutView
    # /api/auth/logoutall -> LogoutAllView
    path(r'api/auth/', include('Users.api.urls')),
    path('api/courses/', include(courses_urls)),
]
