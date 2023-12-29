from django.contrib import admin
from rest_framework import routers
from django.urls import include, path, re_path
from main.views import router
from main.subViews.userViewSet import UserViewSet

from main.scheduler import start_scheduler

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^', include(router.urls)),
]

start_scheduler()