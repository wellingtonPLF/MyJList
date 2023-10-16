from main.subModels.token import Token
from main.subModels.auth import Auth
from main.serializers.tokenSerializer import TokenSerializer
from rest_framework import exceptions as rest_exceptions
from rest_framework_simplejwt import tokens
from main.enum.tokenEnum import TokenEnum
from main.enum.jwtEnum import JwtEnum
from main.utils.jwtUtil import JwtUtil
from main.services.authService import AuthService
from main.utils.cookieUtil import CookieUtil

class TokenService():
    queryset = Token.objects.all()
    cookieUtil = CookieUtil()
    jwtUtil = JwtUtil()
    authService = AuthService()
    serializer_class = TokenSerializer
    accessTokenName = TokenEnum.TOKEN_NAME.value
    
    def findById(self, token_id):
        try:
            token = Token.objects.get(id=token_id)
        except Token.DoesNotExist:
            raise rest_exceptions.ParseError("The requested TokenId was not found.")
        return token
    
    def findByToken(self, key):
        try:
            token = Token.objects.get(key=key)
        except Token.DoesNotExist:
            raise rest_exceptions.ParseError(JwtEnum.INVALID_AT.value)
        return token

    def findByAuthID(self, auth_id):
        try:
            token = Token.objects.get(auth_id=auth_id)
        except Token.DoesNotExist:
            raise rest_exceptions.ParseError(JwtEnum.INVALID_AT.value)
        return token

    def insert(self, token):
        try:
            token.save()
        except:
            raise rest_exceptions.ParseError("Can't insert token!")

    def update(self, token):
        try:
            token.save()
        except:
            raise rest_exceptions.ParseError("Can't update token!")

    def delete(self, pk):
        try:
            Token.objects.get(id = pk).delete()
        except:
            raise rest_exceptions.ParseError("The requested TokenId was not found.")

    def deleteByAuthID(self, pk):
        try:
            Token.objects.get(auth_id = pk).delete()
        except:
            pass #No token relationated with that auth_id

    def getTokenValidation(self, request, pk):
        admin = 1
        accessToken = self.cookieUtil.getCookieValue(request, self.accessTokenName)
        jwt = self.findByToken(accessToken)
        authID = self.jwtUtil.extractSubject(jwt.key, TokenEnum.TOKEN_NAME.value)
        authList = self.authService.findAuthRolesByAuthId(int(authID))
        result = next(filter(lambda obj: obj.id == admin, authList), None)
        
        if (int(authID) == pk):
            return True
        elif (result != None):
            return True
        return False
