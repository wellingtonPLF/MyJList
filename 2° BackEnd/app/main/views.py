from rest_framework import routers
from main.subViews.userViewSet import UserViewSet
from main.subViews.authViewSet import AuthViewSet
from main.subViews.gameViewSet import GameViewSet
from main.subViews.commentViewSet import CommentViewSet
from main.subViews.registryViewSet import RegistryViewSet
from main.subViews.nationalityViewSet import NationalityViewSet

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'auth', AuthViewSet)
router.register(r'game', GameViewSet)
router.register(r'comment', CommentViewSet)
router.register(r'registry', RegistryViewSet)
router.register(r'nationality', NationalityViewSet)