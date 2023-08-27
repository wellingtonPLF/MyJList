from main.subModels.nationality import Nationality
from rest_framework import viewsets
from rest_framework.response import Response
from main.serializers.nationalitySerializer import NationalitySerializer
from main.authenticate import NationalityAuthentication

class NationalityViewSet(viewsets.ModelViewSet):
    queryset = Nationality.objects.all()
    authentication_classes = [NationalityAuthentication]
    serializer_class = NationalitySerializer

    def list(self, request):
        nationalitys = self.get_queryset()
        serializer = self.get_serializer(nationalitys, many=True)
        return Response(serializer.data)
