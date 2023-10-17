from main.subModels.tag import Tag
from rest_framework import viewsets
from rest_framework.response import Response
from main.serializers.tagSerializer import TagSerializer
from main.authenticate import TagAuthentication

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    authentication_classes = [TagAuthentication]
    serializer_class = TagSerializer

    def list(self, request):
        tags = self.get_queryset()
        serializer = self.get_serializer(tags, many=True)
        return Response(serializer.data)
