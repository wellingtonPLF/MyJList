from main.subModels.registry import Registry
from rest_framework.response import Response
from main.authenticate import RegistryAuthentication
from rest_framework import viewsets
from rest_framework.decorators import action
from main.serializers.registrySerializer import RegistrySerializer

class RegistryViewSet(viewsets.ModelViewSet):
    queryset = Registry.objects.all()
    authentication_classes = [RegistryAuthentication]
    serializer_class = RegistrySerializer

    def list(self, request):
        registryList = self.get_queryset()
        serializer = self.get_serializer(registryList, many=True)
        return Response(serializer.data)
    
    #/game/getRegistryByUserID
    @action(detail=False, methods=['GET'], url_path='getRegistryByUserID/(?P<user_id>\d+)')
    def getRegistryByUserID(self, request, user_id):
        try:
            query_registry = Registry.objects.filter(user=user_id)
            result = RegistrySerializer(query_registry, many=True, read_only=True).data
            return Response(result)
        except:
            raise ParseError("Something went Wrong in getRegistryByUserID")

    def get_registry(self, id):
        try:
            return Registry.objects.get(id = id)
        except Registry.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def update(self, request, pk):
        registry = self.get_registry(request.data["id"])

        if (request.data["note"] != None and request.data["note"] != registry.note):
            registry.note = request.data["note"]
        elif (request.data["favorite"] != None and request.data["favorite"] != registry.favorite):
            registry.favorite = request.data["favorite"]
        elif (request.data["progress"] != None and request.data["progress"] != registry.progress):
            registry.progress = request.data["progress"]

        if self.get_registry(registry.id) == None:
            raise rest_exceptions.ParseError("Error In Registry Update")
            
        registry.save()
        serializer = RegistrySerializer(instance=registry)
        return Response(serializer.data)

    def destroy (self, request, pk):
        try:
            self.get_registry(pk).delete()
            return Response("Successfully Deletion.", status=status.HTTP_204_NO_CONTENT)
        except:
            raise ParseError("The requested Game Id was not found.")