from main.subModels.img import Img
from main.subModels.game import Game
from main.subModels.achievement import Achievement
from rest_framework import serializers
from main.enum.gameEnum import GameEnum
from main.subModels.registry import Registry
from main.subModels.comment import Comment
from main.serializers.imgSerializer import ImgSerializer
from main.serializers.themeSerializer import ThemeSerializer
from main.serializers.studioSerializer import StudioSerializer
from main.serializers.producerSerializer import ProducerSerializer
from main.serializers.statusSerializer import StatusSerializer
from main.serializers.languageSerializer import LanguageSerializer
from main.serializers.gameTypeSerializer import GameTypeSerializer
from main.serializers.plataformSerializer import PlataformSerializer
from main.serializers.perspectiveSerializer import PerspectiveSerializer
from main.serializers.achievementSerializer import AchievementSerializer
from django.db.models.functions import Cast
from django.db.models import FloatField
from django.db.models import Avg

class GameSerializer(serializers.ModelSerializer):
    theme = ThemeSerializer(many=True, read_only=True)
    studio = StudioSerializer(many=True, read_only=True)
    producer = ProducerSerializer(many=True, read_only=True)
    status = StatusSerializer(many=True, read_only=True)
    language = LanguageSerializer(many=True, read_only=True)
    gameType = GameTypeSerializer(many=True, read_only=True)
    plataform = PlataformSerializer(many=True, read_only=True)
    perspective = PerspectiveSerializer(many=True, read_only=True)

    imgs = serializers.SerializerMethodField()
    ranked = serializers.SerializerMethodField()
    popularity = serializers.SerializerMethodField()
    favRank = serializers.SerializerMethodField()
    achievements = serializers.SerializerMethodField()

    score = serializers.SerializerMethodField()
    recommendation = serializers.SerializerMethodField()
    commentTotal = serializers.SerializerMethodField()

    planning = serializers.SerializerMethodField()
    playing = serializers.SerializerMethodField()
    onHold = serializers.SerializerMethodField()
    dropped = serializers.SerializerMethodField()
    replayed = serializers.SerializerMethodField()
    completed = serializers.SerializerMethodField()

    def get_recommendation(self, game):
        recommendation = None
        try:
            recommendation = len(Registry.objects.filter(game=game.id, recommendation=1))
        except:
            return recommendation
        return recommendation
    
    def get_commentTotal(self, game):
        total = None
        try:
            total = len(Comment.objects.filter(game=game.id))
        except:
            return total
        return total
    
    def get_popularity(self, game):
        highScore = 'Great'
        percent = 80/100
        minimum = 1430
        popularity = False
        try:
            views = len(Registry.objects.filter(game=game.id))
            if (views >= minimum):
                atLeast = views * percent
                result = len(Registry.objects.filter(game=game.id, note=highScore))
                if(atLeast >= result):
                    popularity = True
        except:
            return popularity
        return popularity

    def get_favRank(self, game):
        result = 0
        try:
            result = len(Registry.objects.filter(favorite=1, game=game.id))
        except:
            return result
        return result
    
    def get_score(self, game):
        score = 'N/A'
        try:
            notNullRegistry = Registry.objects.filter(note__isnull=False, game=game.id)
            result = notNullRegistry.aggregate(score=Avg(Cast('note', output_field=FloatField())))
            score = round(result['score'], 1)
            if (score == None):
                score = 'N/A'
            result = None
        except:
            return score
        return score

    def get_ranked(self, game):
        ranked = 'N/A'
        try:
            notNullRegistry = Registry.objects.filter(note__isnull=False)
            gameList = notNullRegistry.values('game_id').annotate(scoreResult=Avg(Cast('note', output_field=FloatField()))).order_by('-scoreResult')
            ranked = list(gameList.values_list('game_id', flat=True)).index(game.id) + 1
        except:
            return ranked
        return ranked

    def get_achievements(self, game):
        result = None
        try:
            achievements = Achievement.objects.filter(game=game.id)
            serializer = AchievementSerializer(achievements, many=True, read_only=True)
            result = serializer.data
        except:
            return result
        return result

    def get_imgs(self, game):
        result = None
        try:
            imgs = Img.objects.filter(game=game.id)
            serializer = ImgSerializer(imgs, many=True, read_only=True)
            result = serializer.data
        except:
            return result
        return result

    def get_planning(self, game):
        planning = 'N/A'
        try:
            result = Registry.objects.filter(game=game.id)
            filter_result = len(result.filter(progress=GameEnum.PLAN.name))
            total = len(result)
            planning = round(filter_result/total * 100, 0)
        except:
            return planning
        return planning

    def get_playing(self, game):
        playing = 'N/A'
        try:
            result = Registry.objects.filter(game=game.id)
            filter_result = len(result.filter(progress=GameEnum.PLAY.name))
            total = len(result)
            playing = round(filter_result/total * 100, 0)
        except:
            return playing
        return playing

    def get_onHold(self, game):
        onHold = 'N/A'
        try:
            result = Registry.objects.filter(game=game.id)
            filter_result = len(result.filter(progress=GameEnum.HOLD.name))
            total = len(result)
            onHold = round(filter_result/total * 100, 0)
        except:
            return onHold
        return onHold

    def get_dropped(self, game):
        dropped = 'N/A'
        try:
            result = Registry.objects.filter(game=game.id)
            filter_result = len(result.filter(progress=GameEnum.DROP.name))
            total = len(result)
            dropped = round(filter_result/total * 100, 0)
        except:
            return dropped
        return dropped

    def get_replayed(self, game):
        replayed = 'N/A'
        try:
            result = Registry.objects.filter(game=game.id)
            filter_result = len(result.filter(progress=GameEnum.REPLAY.name))
            total = len(result)
            replayed = round(filter_result/total * 100, 0)
        except:
            return replayed
        return replayed

    def get_completed(self, game):
        completed = 'N/A'
        try:
            result = Registry.objects.filter(game=game.id)
            filter_result = len(result.filter(progress=GameEnum.COMPLETE.name))
            total = len(result)
            completed = round(filter_result/total * 100, 0)
        except:
            return completed
        return completed

    class Meta:
        model = Game
        #fields = '__all__'
        fields = (
            'id', 'score', 'name', 'playtime', 'release', 'favRank', 'ranked', 'popularity', 
            'recommendation', 'source', 'premiede', 'gameImage', 'description',
            "planning", "playing", "onHold", "dropped", "replayed", "completed", "commentTotal",
            'theme', 'studio', 'producer', 'status', 'language', 'gameType', 
            'plataform', 'perspective', 'achievements', 'imgs'
        )