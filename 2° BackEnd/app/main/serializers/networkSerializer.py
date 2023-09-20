from rest_framework import serializers
from main.subModels.network import Network

class NetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Network
        fields = '__all__'