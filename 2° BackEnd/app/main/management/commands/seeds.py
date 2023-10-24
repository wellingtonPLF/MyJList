from django_seed import Seed
from main.subModels.tag import Tag
from main.subModels.img import Img
from main.subModels.user import User
from main.subModels.auth import Auth
from main.subModels.role import Role
from main.subModels.game import Game
from main.subModels.token import Token
from main.subModels.theme import Theme
from main.subModels.status import Status
from main.subModels.studio import Studio
from main.subModels.comment import Comment
from main.subModels.producer import Producer
from main.subModels.language import Language
from main.subModels.registry import Registry
from main.subModels.gametype import GameType
from main.subModels.plataform import Plataform
from main.subModels.achievement import Achievement
from main.subModels.perspective import Perspective
from main.subModels.nationality import Nationality

from main.enum.gameEnum import GameEnum
from main.enum.commentEnum import CommentEnum

from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password

import os
import json
import bcrypt
from random import randrange, uniform

# python manage.py seeds

numberOfEntities = 10
numberOfRegistry = 45
numberOfComments = 100

class Command(BaseCommand):

    def handle(self, *args, **options):
        
        seeder = Seed.seeder()
        roles = ['ROLE_USER', 'ROLE_ADMIN']
        password = '12345678'
        languages = [ "zh","es","en","hi","ar","bn","pt","ru","ja",
        "pa","de","jv","wuu","id","te","vi","ko","fr","mr","ta",
        "ur","tr","it","yue","th","gu","jin","hak","pl","kn","hsn","ml","su",
        "bho","ha","or","my","uk","tl","yo","mai","uz","sd","am","ff","ro","om","ig",
        "az","awa","gan","ceb","nl","ku","sh","mg","skr","ne","si","ctg","za","km","tk",
        "as","mad","so","mwr","mag","hne","hu","hne","el","ny","deccan","ak","kk",
        "syl","zu","cs","rw","dhd","ht","ilo","qu","rn","sv","hmn","sn","ug","hil",
        "mos","xh","be","bal","gom","tji","ln"]
        progressList = [
            GameEnum.PLAN.name, 
            GameEnum.PLAY.name, 
            GameEnum.DROP.name,
            GameEnum.HOLD.name,
            GameEnum.REPLAY.name,
            GameEnum.COMPLETE.name
        ]
        votes = [
            CommentEnum.PREMIATION.value,
            CommentEnum.FUNNY.value,
            CommentEnum.YES.value,
            CommentEnum.NO.value
        ]
        tags = ['Undefined', 'Bad Script', 'Good Script']
        stat = ["On", "Off"]
        sexuality = ["M", "F"]
        notes = [3, 5, 7, 8, 9, 10]

        base_dir = os.path.dirname(os.path.abspath(__file__))
        json_game_path = os.path.join(base_dir, 'games.json')
        json_theme_path = os.path.join(base_dir, 'themes.json')
        json_studio_path = os.path.join(base_dir, 'studios.json')
        json_producer_path = os.path.join(base_dir, 'producers.json')
        json_type_path = os.path.join(base_dir, 'gametype.json')  
        json_lang_path = os.path.join(base_dir, 'languages.json')
        json_nation_path = os.path.join(base_dir, 'nationality.json')
        json_plataform_path = os.path.join(base_dir, 'plataform.json')
        json_perspective_path = os.path.join(base_dir, 'perspective.json')

        with open(json_game_path) as json_file:
            games = json.load(json_file)

        with open(json_theme_path) as json_file:
            themes = json.load(json_file)

        with open(json_studio_path) as json_file:
            stud = json.load(json_file)

        with open(json_producer_path) as json_file:
            prod = json.load(json_file)

        with open(json_type_path) as json_file:
            gameType = json.load(json_file)

        with open(json_lang_path) as json_file:
            lang = json.load(json_file)

        with open(json_nation_path) as json_file:
            data = json.load(json_file)     

        with open(json_plataform_path) as json_file:
            plataf = json.load(json_file) 

        with open(json_perspective_path) as json_file:
            perspec = json.load(json_file)      

        # Role
        for index in range(len(roles)):
            try:
                Role.objects.get(roleName=roles[index])
            except:
                objct = {
                    'id': index + 1,
                    'roleName': f'{roles[index]}'
                }
                role = Role(**objct)
                role.save()

        # Nationality
        for obj in data:
            try:
                Nationality.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'cod': obj['cod'],
                    'name': obj['name']
                }
                nationality = Nationality(**objct)
                nationality.save()

        # Language
        for obj in lang:
            try:
                Language.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'value': obj['lang'],
                    'langcod': obj['langcod'],
                    'countrycod': obj['countrycod']
                }
                language = Language(**objct)
                language.save()

        # GameType
        for obj in gameType:
            try:
                GameType.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'value': obj['value']
                }
                gameType = GameType(**objct)
                gameType.save()

        # Status ---------------------------------------------------------------
        for i in range(2):
            try:
                Status.objects.get(id=i + 1)
            except:
                objct = {
                    'id': i + 1,
                    'value': stat[i]
                }
                status = Status(**objct)
                status.save()

        # Studio
        for obj in stud:
            try:
                Studio.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'value': obj['value']
                }
                studio = Studio(**objct)
                studio.save()

         # Producer
        for obj in prod:
            try:
                Producer.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'value': obj['value']
                }
                producer = Producer(**objct)
                producer.save()

        # Theme
        for obj in themes:
            try:
                Theme.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'value': obj['value']
                }
                theme = Theme(**objct)
                theme.save()

        # Plataform
        for obj in plataf:
            try:
                Plataform.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'value': obj['value']
                }
                plataform = Plataform(**objct)
                plataform.save()

        # Perspective ---------------------------------------------------------------
        for obj in perspec:
            try:
                Perspective.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'value': obj['value']
                }
                perspective = Perspective(**objct)
                perspective.save()

        role = Role.objects.get(id=2)

        # Auth
        for index in range(numberOfEntities):
            try:
                Auth.objects.get(id=index + 1)
            except:
                salt = bcrypt.gensalt(10)
                objct = {
                    'id': index + 1,
                    'email': seeder.faker.email(),
                    'username': seeder.faker.user_name(),
                    'password': make_password(password, salt=salt, hasher='bcrypt')
                }
                auth = Auth(**objct)
                auth.save()
                auth.roles.set([role])

        # User
        for index in range(numberOfEntities):
            try:
                User.objects.get(id=index + 1)
            except:
                objct = {
                    'id': index + 1,
                    'nickname': seeder.faker.name(),
                    'bornDate': seeder.faker.date_between(start_date='-20y', end_date='today').strftime('%Y-%m-%d'),
                    'sexuality': sexuality[randrange(2)],
                    'joined': seeder.faker.date_between(start_date='-5y', end_date='today').strftime('%Y-%m-%d'),
                    'note': '',
                    'status': 'off',
                    'nationality': Nationality.objects.get(id=randrange(243) + 1),
                    'auth': Auth.objects.get(id=index + 1)
                }
                user = User(**objct)
                user.save()

        # Game
        # y = 0

        for obj in games:
            try:
                Game.objects.get(id=obj['id'])
            except:
                objct = {
                    'id': obj['id'],
                    'release': seeder.faker.date_between(start_date='-1y', end_date='+1y').strftime('%Y-%m-%d'),
                    'name': obj['name'],
                    'description': obj['description'],
                    'playtime': round(uniform(1, 900), 2),
                    'gameImage': obj['gameImg']
                }
                game = Game(**objct)
                game.save()
                
                lista = [
                    {'theme': Theme},
                    {'status': Status},
                    {'studio': Studio},
                    {'gameType': GameType},
                    {'producer': Producer},
                    {'plataform': Plataform},
                    {'perspective': Perspective}
                ]
                
                game.language.set([
                    Language.objects.get(langcod=languages[randrange(len(languages))]),
                    Language.objects.get(langcod=languages[randrange(len(languages))]),
                    Language.objects.get(langcod=languages[randrange(len(languages))])
                ])

                for o in lista:
                    result = []
                    key = list(o)
                    values = obj[key[0]]
                    for value in values:
                        result.append(o[key[0]].objects.get(value=value))
                    getattr(game, key[0]).set(result)           

                # Img
                for i in obj['img']:
                    images = {
                        'value': i,
                        'game': Game.objects.get(id=obj['id'])
                    }
                    img = Img(**images)
                    img.save()

                # Achievement 
                for i in obj['achievements']:
                    achievs = {
                        # 'id': obj['id'] + obj['achievements'].index(i) + (y),
                        'value': i,
                        'game': Game.objects.get(id=obj['id'])
                    }
                    achievement = Achievement(**achievs)
                    achievement.save()  

                # y += (len(obj['achievements']) - 1)

        # Comment
        for index in range(numberOfComments):
            try:
                Comment.objects.get(id=index + 1)
            except:
                objct = {
                    'id': index + 1,
                    'content': "Life is full of unexpected twists and turns, like a winding river that meanders through time. Each moment, a new chapter unfolds, offering opportunities for growth, laughter, and reflection. Embrace the journey, for it is in the beauty of the ordinary that we often find the extraordinary.",
                    'publication': seeder.faker.date_between(start_date='-1y', end_date='today').strftime('%Y-%m-%d'),
                    'vote': votes[randrange(len(votes))],
                    'user': User.objects.get(id=(randrange(3) + 1)),
                    'game': Game.objects.get(id=(randrange(20) + 1))
                }
                comment = Comment(**objct)
                comment.save()

        # Tag

        for index in range(len(tags)):
            try:
                Tag.objects.get(id=index + 1)
            except:
                objct = {
                    'id': index + 1,
                    'value': tags[index],
                }
                tag = Tag(**objct)
                tag.save()

        # Registry
        index = 0
        while True:
            try:
                if index == numberOfRegistry:
                    break
                Registry.objects.get(id=index + 1)
            except:
                userID = randrange(3) + 1
                gameID = randrange(20) + 1
                result = Registry.objects.filter(user=userID, game=gameID)
                if len(result) == 0:
                    objct = {
                        'id': index + 1,
                        'note': notes[randrange(len(notes))],
                        'favorite': randrange(2),
                        'recommendation': randrange(2),
                        'progress': progressList[randrange(len(progressList))],
                        'user': User.objects.get(id=(userID)),
                        'game': Game.objects.get(id=(gameID)),
                        'tag': Tag.objects.get(id=randrange(3) + 1)
                    }
                    registry = Registry(**objct)
                    registry.save()
                    index += 1
        