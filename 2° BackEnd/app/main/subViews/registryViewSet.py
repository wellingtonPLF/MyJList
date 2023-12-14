from main.subModels.registry import Registry
from main.subModels.tag import Tag

from rest_framework.response import Response
from main.authenticate import RegistryAuthentication
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from main.serializers.registrySerializer import RegistrySerializer
from main.serializers.registryActionSerializer import RegistryActionSerializer
from rest_framework.exceptions import ParseError

class RegistryViewSet(viewsets.ModelViewSet):
    queryset = Registry.objects.all()
    authentication_classes = [RegistryAuthentication]
    serializer_class = RegistrySerializer

    def list(self, request):
        registryList = self.get_queryset()[:100]
        serializer = self.get_serializer(registryList, many=True)
        return Response(serializer.data)
    
    #/registry/getRegistryByUserID
    @action(detail=False, methods=['GET'], url_path='getRegistryByUserID/(?P<user_id>\d+)')
    def getRegistryByUserID(self, request, user_id):
        try:
            query_registry = Registry.objects.filter(user=user_id)[:24]
            result = RegistrySerializer(query_registry, many=True, read_only=True).data
            return Response(result)
        except:
            raise ParseError("Something went Wrong in getRegistryByUserID")

    #/registry/getRegistryByUserGame_ID
    @action(detail=False, methods=['POST'], url_path='getRegistryByUserGame_ID')
    def getRegistryByUserGame_ID(self, request):
        try:
            user_id = request.data["user_id"]
            game_id = request.data["game_id"]
            result = Registry.objects.filter(game=game_id, user=user_id)
            registry = RegistrySerializer(result[0]).data
            return Response(registry)
        except:
            raise ParseError("Something went Wrong in getRegistryByUserGame_ID")

    def get_registry(self, id):
        try:
            return Registry.objects.get(id = id)
        except Registry.DoesNotExist:
            raise ParseError("Registry Not Found")

    def create(self, request):
        try:
            serializer = RegistryActionSerializer(data=request.data)
            if serializer.is_valid():
                result = serializer.save()
                registry = self.get_serializer(instance=result)
                return Response(registry.data)
            return Response(serializer.errors)
        except Exception as e:
            raise ParseError(e)

    def update(self, request, pk):
        try:
            instance = self.get_registry(request.data["id"])
            serializer = RegistryActionSerializer(instance, data=request.data, partial=True)
            if request.data['note'] == '':
                request.data['note'] = None
            if serializer.is_valid():
                result = serializer.save()
                registry = self.get_serializer(instance=result)
                return Response(registry.data)
            raise ParseError(serializer.errors)
        except Exception as e:
            raise ParseError(e)
        
    def destroy (self, request, pk):
        try:
            self.get_registry(pk).delete()
            return Response({'Result': "Successfully Deletion"}, status=status.HTTP_204_NO_CONTENT)
        except:
            raise ParseError("The requested Game Id was not found.")