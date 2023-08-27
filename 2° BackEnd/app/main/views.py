from rest_framework import routers
from main.subViews.userViewSet import UserViewSet
from main.subViews.authViewSet import AuthViewSet
from main.subViews.nationalityViewSet import NationalityViewSet

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'auth', AuthViewSet)
router.register(r'nationality', NationalityViewSet)