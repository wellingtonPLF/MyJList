from rest_framework import status
from main.subModels.auth import Auth
from main.subModels.token import Token
from main.subModels.user import User

from main.custom.erroresult import ErrorExceptionResult

from rest_framework.exceptions import AuthenticationFailed, ParseError
from main.serializers.authSerializer import AuthSerializer
from main.enum.tokenEnum import TokenEnum
from main.enum.jwtEnum import JwtEnum
from main.utils.jwtUtil import JwtUtil
from main.utils.cookieUtil import CookieUtil

class AuthService():
    queryset = Auth.objects.all()
    jwtUtil = JwtUtil()
    cookieUtil = CookieUtil()
    accessTokenName = TokenEnum.TOKEN_NAME.value

    def get_auth(self, id):
        try:
            return Auth.objects.get(id = id)
        except Auth.DoesNotExist:
            return Response(JwtEnum.INVALID_USER.value, status=status.HTTP_404_NOT_FOUND)

    def findAll(self):
        users = self.get_queryset()
        serializer = self.get_serializer(users, many=True)
        return serializer.data
    
    def findById(self, auth_id):
        try:
            authDB = self.get_auth(auth_id)
        except Auth.DoesNotExist:
            raise ParseError("The requested Id was not found.")     
        serializer = AuthSerializer(instance=authDB)
        return serializer.data
    
    def findByUserID(self, user_id):
        try:
            userDB = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise ParseError("Can't find Auth by userID")
        serializer = AuthSerializer(instance=userDB.auth)
        return serializer.data

    def findAuthRolesByAuthId(self, pk):
        auth = self.get_auth(pk)
        auth_roles = auth.roles.all()
        return auth_roles

    def getRoles(self, request):
        jwt = self.cookieUtil.getCookieValue(request, self.accessTokenName)
        try:
            try:
                token = Token.objects.get(key=jwt)
            except Token.DoesNotExist:
                raise rest_exceptions.ParseError(JwtEnum.INVALID_AT.value)
            authID = self.jwtUtil.extractSubject(jwt, TokenEnum.TOKEN_NAME.value)
            auth = self.findAuthRolesByAuthId(int(authID))
        except Exception as error:
            raise ErrorExceptionResult(status_code=status.HTTP_401_UNAUTHORIZED, detail=f'{error}', customType='EXPIRED_AT')
        roles = [obj.id for obj in auth]
        return roles
