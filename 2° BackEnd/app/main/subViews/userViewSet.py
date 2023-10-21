from rest_framework import status
from main.subModels.user import User
from main.subModels.auth import Auth
from main.subModels.nationality import Nationality
from main.serializers.userSerializer import UserSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt import tokens
from main.enum.tokenEnum import TokenEnum
from main.enum.jwtEnum import JwtEnum
from main.utils.jwtUtil import JwtUtil
from main.utils.cookieUtil import CookieUtil
from main.services.authService import AuthService
from main.services.tokenService import TokenService
from main.authenticate import UserAuthentication

from django.middleware.csrf import get_token
from django.contrib.postgres.search import TrigramSimilarity

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    authentication_classes = [UserAuthentication]
    authService = AuthService()
    tokenService = TokenService()
    cookieUtil = CookieUtil()
    jwtUtil = JwtUtil()
    serializer_class = UserSerializer
    accessTokenName = TokenEnum.TOKEN_NAME.value
    refreshTokenName = TokenEnum.REFRESH_NAME.value

    def list(self, request):
        users = self.get_queryset()
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

    #/user/searchUser
    @action(detail=False, methods=['POST'], url_path='searchUser')
    def searchUser(self, request):
        try:
            userName = request.data['nickname']
            user = User.objects.annotate(similarity=TrigramSimilarity('nickname', userName)).filter(similarity__gt = 0.1).order_by('similarity')
            result = UserSerializer(user, many=True, read_only=True).data
            return Response(result)
        except Exception as error:
            raise ParseError(error)

    @action(detail=False, methods=['GET'], url_path='getUser')
    def getAuthenticatedUser(self, request):
        get_token(request)
        accessToken = self.cookieUtil.getCookieValue(request, self.accessTokenName)
        jwt = self.tokenService.findByToken(accessToken)
        authID = self.jwtUtil.extractSubject(jwt.key, TokenEnum.TOKEN_NAME.value)
        authDB = self.authService.findById(int(authID))
        try:
            userDB = User.objects.get(auth_id=authDB["id"])
        except User.DoesNotExist:
            return Response("User sign in Token doesn't exist", status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(userDB)
        return Response(serializer.data)

    def get_user(self, id):
        try:
            return User.objects.get(id = id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = self.get_serializer(data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def update(self, request, pk):
        try:
            user = self.get_user(request.data["id"])
            nationality_name = request.data["nationality"]["name"]
            nationality = Nationality.objects.get(name=nationality_name)

            if user == None:
                raise rest_exceptions.ParseError(JwtEnum.INVALID_USER.value)
            if self.tokenService.getTokenValidation(request, user.auth.id) == False:
                raise rest_exceptions.ParseError(JwtEnum.INVALID_USER.value)

            if (request.data["nickname"] != user.nickname and request.data["nickname"] != None):
                user.nickname = request.data["nickname"]
            if (request.data["bornDate"] != user.bornDate and request.data["bornDate"] != None):
                user.bornDate = request.data["bornDate"]
            if (request.data["sexuality"] != user.sexuality and request.data["sexuality"] != None):
                user.sexuality = request.data["sexuality"]
            if (request.data["note"] != user.note and request.data["note"] != None):
                user.note = request.data["note"]
            if (request.data["userImage"] != user.userImage and request.data["userImage"] != None):
                user.userImage = request.data["userImage"]
            if (nationality != user.nationality):
                user.nationality = nationality
            if len(request.data["friend"]) == 0 and len(request.data["friend"]) != len(user.friend.all()):
                user.friend.clear()
            else:
                if len(request.data["friend"]) != 0 and len(request.data["friend"]) != len(user.friend.all()): 
                    # Add friend
                    if len(request.data["friend"]) > len(user.friend.all()): 
                            friend_id = request.data["friend"][-1]['id']
                            friend = User.objects.get(id=friend_id)
                            user.friend.add(friend)
                    else: # Removing a   friend
                        id_list = list(map(lambda instance: instance.id, user.friend.all()))
                        result = [obj for obj in request.data["friend"] if obj['id'] not in id_list]
                        friend = User.objects.get(id=result["id"])
                        user.friend.remove(friend)

            user.save()
            serializer = UserSerializer(instance=user)
            return Response(serializer.data)
        except Exception as error:
            return Response(f'${error}')

    def destroy (self, request, pk):
        response = Response("Successfully Deletion.")
        if pk == None:
            raise rest_exceptions.ParseError("UserId is null")
        auth = self.authService.findByUserID(pk)
        if(self.tokenService.getTokenValidation(request, auth["id"]) == False):
            raise rest_exceptions.ParseError(JwtEnum.INVALID_USER.value)
        self.get_user(pk).delete()
        self.cookieUtil.clear(response, self.accessTokenName)
        self.cookieUtil.clear(response, self.refreshTokenName)
        return response
