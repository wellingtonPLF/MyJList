from rest_framework import serializers
from main.subModels.user import User
from main.subModels.game import Game
from main.subModels.auth import Auth
from main.subModels.network import Network
from main.subModels.link import Link
from main.enum.gameEnum import GameEnum
from main.subModels.registry import Registry
from main.subModels.role import Role
from main.subModels.nationality import Nationality
from main.serializers.nationalitySerializer import NationalitySerializer
from main.serializers.authSerializer import AuthSerializer
from main.serializers.linkSerializer import LinkSerializer
from main.serializers.networkSerializer import NetworkSerializer
from main.serializers.roleSerializer import RoleSerializer
from main.serializers.favoriteSerializer import FavoriteSerializer
from django.forms.models import model_to_dict

from django.db.models import Sum

class UserSerializer(serializers.ModelSerializer):
    nationality = NationalitySerializer()
    email = serializers.SerializerMethodField()
    network = serializers.SerializerMethodField()
    link = serializers.SerializerMethodField()
    friend = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        allow_null=True,
        required=False,
    )

    playing = serializers.SerializerMethodField()
    onHold = serializers.SerializerMethodField()
    dropped = serializers.SerializerMethodField()
    completed = serializers.SerializerMethodField()
    planning = serializers.SerializerMethodField()
    replayed = serializers.SerializerMethodField()

    role = serializers.SerializerMethodField()
    hours = serializers.SerializerMethodField()
    favoriteGames = serializers.SerializerMethodField()
    lastUpdated = serializers.SerializerMethodField()
    recommendations = serializers.SerializerMethodField()

    def get_role(self, user):
        role = None
        try:
            auth = Auth.objects.filter(id=user.auth.id)
            result = AuthSerializer(auth[0])
            role = result.data['roles']
        except:
            return role
        return role

    def get_network(self, user):
        network = None
        try:
            result = Network.objects.filter(user=user.id)
            network = NetworkSerializer(result, many=True, read_only=True).data
        except:
            return network
        return network

    def get_link(self, user):
        link = None
        try:
            result = Link.objects.filter(user=user.id)
            link = LinkSerializer(result, many=True, read_only=True).data
        except:
            return link
        return link

    def get_planning(self, user):
        planning = None
        try:
            planning = len(
                Registry.objects.filter(progress=GameEnum.PLAN.value, user=user.id)
            )
        except:
            return planning
        return planning

    def get_playing(self, user):
        playing = None
        try:
            playing = len(
                Registry.objects.filter(progress=GameEnum.PLAY.value, user=user.id)
            )
        except:
            return playing
        return playing

    def get_onHold(self, user):
        onHold = None
        try:
            onHold = len(
                Registry.objects.filter(progress=GameEnum.HOLD.value, user=user.id)
            )
        except:
            return onHold
        return onHold

    def get_dropped(self, user):
        dropped = None
        try:
            dropped = len(
                Registry.objects.filter(progress=GameEnum.DROP.value, user=user.id)
            )
        except:
            return dropped
        return dropped

    def get_completed(self, user):
        completed = None
        try:
            completed = len(
                Registry.objects.filter(progress=GameEnum.COMPLETE.value, user=user.id)
            )
        except:
            return completed
        return completed

    def get_replayed(self, user):
        replayed = None
        try:
            replayed = len(
                Registry.objects.filter(progress=GameEnum.REPLAY.value, user=user.id)
            )
        except:
            return replayed
        return replayed

    def get_hours(self, user):
        hours = None
        try:
            playtime = []
            result = Registry.objects.filter(progress=GameEnum.COMPLETE.value, user=user.id)
            for i in result:
                gameID = i.game.id
                game = Game.objects.filter(id=gameID)
                playtime.append(game[0].playtime)
            hours = round(sum(playtime),2)
        except:
            return hours
        return hours

    def get_favoriteGames(self, user):
        favoriteGames = None
        try:
            result = Registry.objects.filter(user=user.id, favorite=1)[:8]
            favoriteGames = FavoriteSerializer(result, many=True, read_only=True).data
        except:
            return favoriteGames
        return favoriteGames

    def get_lastUpdated(self, user):
        lastUpdated = None
        try:
            result = Registry.objects.filter(user=user.id).order_by('-id')[:4]
            lastUpdated = FavoriteSerializer(result, many=True, read_only=True).data
        except:
            return lastUpdated
        return lastUpdated

    def get_recommendations(self, user):
        recommendations = None
        try:
            recommendations = len(Registry.objects.filter(user=user.id, recommendation=1))
        except:
            return recommendations
        return recommendations

    def get_email(self, user):
        try:
            auth = Auth.objects.get(id=user.auth.id)
            email = auth.email
        except Auth.DoesNotExist:
            email = None
        return email

    class Meta:
        model = User
        fields = "__all__"
        fields = (
            "id",
            "nickname",
            "bornDate",
            "sexuality",
            "email",
            "joined",
            "note",
            "status",
            "auth",
            "nationality",
            "friend",
            "network",
            "link",
            "role",
            "playing",
            "userImage",
            "onHold",
            "dropped",
            "completed",
            "planning",
            "replayed",
            "hours",
            "favoriteGames",
            "lastUpdated",
            "recommendations",
        )

    def create(self, data):
        auth_id = data.get("auth").id
        nationality_name = data.get("nationality")["name"]
        try:
            User.objects.get(auth_id=auth_id)
            raise serializers.ValidationError("User already exist.")
        except User.DoesNotExist:
            user = {
                "nickname": data["nickname"],
                "bornDate": data["bornDate"],
                "sexuality": data["sexuality"],
            }
            auth = Auth.objects.get(id=auth_id)
            nationality = Nationality.objects.get(name=nationality_name)
            authData = model_to_dict(auth)
            authData = {key: value for key, value in authData.items() if key != "roles"}
            auth = Auth(**authData)
            user = User(**user)
            user.auth = auth
            user.nationality = nationality
            user.save()
            return user
