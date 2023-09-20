from rest_framework import serializers
from main.subModels.producer import Producer

class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producer
        fields = '__all__'