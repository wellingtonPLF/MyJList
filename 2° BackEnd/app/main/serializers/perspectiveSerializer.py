from rest_framework import serializers
from main.subModels.perspective import Perspective

class PerspectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perspective
        fields = '__all__'