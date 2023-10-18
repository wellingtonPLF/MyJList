
from rest_framework_simplejwt import tokens
from rest_framework_simplejwt import authentication as jwt_authentication
from rest_framework.exceptions import ParseError
from rest_framework_simplejwt import views as jwt_views
from main.enum.tokenEnum import TokenEnum
from main.format.errorResult import ErrorResult
from main.enum.jwtEnum import JwtEnum
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
# import secrets

class JwtUtil(jwt_authentication.JWTAuthentication):
    
    def generateToken(self, auth, tokenType):
        token = None
        if (tokenType == TokenEnum.TOKEN_NAME.value):
            token = tokens.AccessToken.for_user(auth)
        elif (tokenType == TokenEnum.REFRESH_NAME.value):
            token = tokens.RefreshToken.for_user(auth)
        return str(token)

    def extractSubject(self, key, tokenType):
        if (tokenType == TokenEnum.TOKEN_NAME.value):
            try:
                token = self.get_validated_token(key)
            except:
                error = ErrorResult(JwtEnum.EXPIRED_AT.value, JwtEnum.EXPIRED_AT.name, 401)
                raise ParseError(error.as_dict())
        elif (tokenType == TokenEnum.REFRESH_NAME.value):
            token = RefreshToken(key)
            if token['exp'] < token['iat']:
                raise ParseError(JwtEnum.EXPIRED_RT.value)
        user_id = token['user_id']
        return user_id

        