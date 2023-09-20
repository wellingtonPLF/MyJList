from main.subModels.game import Game
from main.subModels.comment import Comment
from main.subModels.registry import Registry
from main.enum.jwtEnum import JwtEnum
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from main.serializers.gameSerializer import GameSerializer
from main.serializers.commentSerializer import CommentSerializer
from main.serializers.favoriteSerializer import FavoriteSerializer
from main.serializers.releaseSerializer import ReleaseSerializer
from main.authenticate import GameAuthentication
from rest_framework.exceptions import ParseError
from django.db.models import Count, Avg
import datetime

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    authentication_classes = [GameAuthentication]
    serializer_class = GameSerializer

    def list(self, request):
        games = self.get_queryset()
        serializer = self.get_serializer(games, many=True)
        return Response(serializer.data)

    #/game/getMostRecommended
    @action(detail=False, methods=['GET'], url_path='getMostRecommended')
    def getMostRecommended(self, request):
        try:
            queryRecommended = Registry.objects.filter(recommendation=1).values('game_id', 'recommendation').annotate(result=Count('game_id')).order_by('-result')[:5]
            queryList = []
            for obj in queryRecommended:
                result = Comment.objects.filter(game=obj['game_id']).order_by('-vote').first()
                queryList.append(CommentSerializer(result).data)
            return Response(queryList)
        except:
            raise ParseError("Something went Wrong in getMostRecommended")

    #/game/getReleases
    @action(detail=False, methods=['GET'], url_path='getReleases')
    def getReleases(self, request):
        try:
            current_date = datetime.date.today()
            days_ago = current_date - datetime.timedelta(days=120)
            
            queryResult = Registry.objects.filter(game__release__range=[days_ago, current_date]).order_by('game__release').values('game').annotate(count=Count('game')).order_by('-count')[:5]
            expected = list(map(lambda item: item['game'], queryResult))
            
            gameResult = Game.objects.filter(id__in=expected)
            result = ReleaseSerializer(gameResult, many=True, read_only=True).data

            return Response(result)
        except:
            raise ParseError("Something went Wrong in getReleases")

    #/game/getAiring
    @action(detail=False, methods=['GET'], url_path='getAiring')
    def getAiring(self, request):
        try:
            current_date = datetime.date.today()

            queryResult = Registry.objects.filter(game__release__gte=current_date).order_by('game__release').values('game').annotate(count=Count('game')).order_by('-count')[:5]
            expected = list(map(lambda item: item['game'], queryResult))

            gameResult = Game.objects.filter(id__in=expected)
            result = ReleaseSerializer(gameResult, many=True, read_only=True).data
            
            return Response(result)
        except:
            raise ParseError("Something went Wrong in getReleases")

    #/game/getTopRated
    @action(detail=False, methods=['GET'], url_path='getTopRated')
    def getTopRated(self, request):
        try:
            queryResult = Registry.objects.values('game_id').annotate(score=Avg('note')).order_by('-score')[:5]
            resultList = []
            for i in queryResult:
                game = Game.objects.filter(id=i['game_id'])
                result = {
                    'id': game[0].id,
                    'score': round(i['score'], 2),
                    'gameImage': game[0].gameImage
                }
                resultList.append(result)
            return Response(resultList)
        except:
            raise ParseError("Something went Wrong in getTopRated")

    def get_game(self, id):
        try:
            return Game.objects.get(id = id)
        except Game.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def update(self, request, pk):

        game = self.get_game(request.data["id"])

        if (request.data["realease"] != None and request.data["realease"] != game.realease):
            game.realease = request.data["realease"]
        elif (request.data["recommendation"] != None and request.data["recommendation"] != game.recommendation):
            game.recommendation = request.data["recommendation"]
        elif (request.data["name"] != None and request.data["name"] != game.name):
            game.name = request.data["name"]
        elif (request.data["description"] != None and request.data["description"] != game.description):
            game.description = request.data["description"]
        elif (request.data["playtime"] != None and request.data["playtime"] != game.playtime):
            game.playtime = request.data["playtime"]
        elif (request.data["gameImage"] != None and request.data["gameImage"] != game.gameImage):
            game.gameImage = request.data["gameImage"]
        elif (request.data["tag"] != None and request.data["tag"] != game.tag):
            game.tag = request.data["tag"]
        elif (request.data["source"] != None and request.data["source"] != game.source):
            game.source = request.data["source"]
        elif (request.data["premiede"] != None and request.data["premiede"] != game.premiede):
            game.premiede = request.data["premiede"]

        game = Game(**game)

        if self.get_game(game.id) == None:
            raise rest_exceptions.ParseError(JwtEnum.INVALID_GAME.value)
            
        game.save()
        serializer = GameSerializer(instance=game)
        return Response(serializer.data)

    def destroy (self, request, pk):
        try:
            self.get_game(pk).delete()
            return Response("Successfully Deletion.",status=status.HTTP_204_NO_CONTENT)
        except:
            raise ParseError("The requested Game Id was not found.")