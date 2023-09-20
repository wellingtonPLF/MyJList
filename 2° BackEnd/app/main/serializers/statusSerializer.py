from rest_framework import serializers
from main.subModels.status import Status

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'