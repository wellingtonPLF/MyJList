from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from main.enum.jwtEnum import JwtEnum
from main.subModels.comment import Comment
from main.serializers.commentSerializer import CommentSerializer
from django.db.models import F
from main.authenticate import CommentAuthentication
from main.enum.tokenEnum import TokenEnum
from main.utils.jwtUtil import JwtUtil
from main.utils.cookieUtil import CookieUtil
from main.services.tokenService import TokenService

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    authentication_classes = [CommentAuthentication]
    serializer_class = CommentSerializer
    accessTokenName = TokenEnum.TOKEN_NAME.value
    cookieUtil = CookieUtil()
    jwtUtil = JwtUtil()
    tokenService = TokenService()

    def list(self, request):
        comments = self.get_queryset()[:100]
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)

    #/game/getCommentSize
    @action(detail=False, methods=['GET'], url_path='getCommentSize/(?P<id>\d+)')
    def getCommentSize(self, request, id):
        comments = Comment.objects.filter(game_id = id)
        return Response(len(comments))

    @action(detail=False, methods=['POST'], url_path='getCommentByGame')
    def getCommentByGame(self, request):
        try:
            gameID = request.data['id']
            qnt = request.data['qnt']
            try:
                accessToken = self.cookieUtil.getCookieValue(request, self.accessTokenName)
                jwt = self.tokenService.findByToken(accessToken)            
                auth_id = self.jwtUtil.extractSubject(jwt.key, self.accessTokenName)
            except:
                auth_id = 0
            comment = Comment.objects.filter(game_id = gameID)
            comment = comment.extra(
                select={'is_top': f'user_id = {auth_id}'},
                order_by=['-is_top', 'vote']
            )
            result = CommentSerializer(comment[:qnt], many=True, read_only=True).data
            return Response(result)
        except Exception as error:
            raise ParseError(f"Something went Wrong in getCommentByGame: {error}")

    def get_comment(self, id):
        try:
            return Comment.objects.get(id = id)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as error:
            print(error)

    def update(self, request, pk):
        comment = self.get_comment(request.data["id"])

        if (request.data["content"] != None and request.data["content"] != comment.content):
            comment.content = request.data["content"]
        if (request.data["vote"] != None and request.data["vote"] != comment.vote):
            comment.vote = request.data["vote"]
        if (request.data["publication"] != None and request.data["publication"] != comment.publication):
            comment.publication = request.data["publication"]

        if self.get_comment(comment.id) == None:
            raise rest_exceptions.ParseError(JwtEnum.INVALID_COMMENT.value)
            
        comment.save()
        serializer = CommentSerializer(instance=comment)
        return Response(serializer.data)

    def destroy (self, request, pk):
        try:
            self.get_comment(pk).delete()
            return Response("Successfully Deletion.",status=status.HTTP_204_NO_CONTENT)
        except:
            raise ParseError("The requested comment Id was not found.")