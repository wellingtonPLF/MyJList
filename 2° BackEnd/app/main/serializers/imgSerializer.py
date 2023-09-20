from rest_framework import serializers
from main.subModels.img import Img

class ImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Img
        fields = '__all__'