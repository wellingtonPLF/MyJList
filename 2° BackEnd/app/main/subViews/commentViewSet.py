from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from main.enum.jwtEnum import JwtEnum
from main.subModels.comment import Comment
from main.serializers.commentSerializer import CommentSerializer

from main.authenticate import CommentAuthentication

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    authentication_classes = [CommentAuthentication]
    serializer_class = CommentSerializer

    def list(self, request):
        comments = self.get_queryset()
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)

    def get_comment(self, id):
        try:
            return Comment.objects.get(id = id)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def update(self, request, pk):
        comment = self.get_comment(request.data["id"])

        if (request.data["content"] != None and request.data["content"] != comment.content):
            comment.content = request.data["content"]
        elif (request.data["vote"] != None and request.data["vote"] != comment.vote):
            comment.vote = request.data["vote"]
        elif (request.data["publication"] != None and request.data["publication"] != comment.publication):
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