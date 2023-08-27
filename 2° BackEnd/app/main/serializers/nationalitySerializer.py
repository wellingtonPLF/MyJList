from rest_framework import serializers
from main.subModels.nationality import Nationality

class NationalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Nationality
        fields = '__all__'