from rest_framework import serializers
from main.subModels.plataform import Plataform

class PlataformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plataform
        fields = '__all__'