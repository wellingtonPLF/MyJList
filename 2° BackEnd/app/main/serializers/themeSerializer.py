from rest_framework import serializers
from main.subModels.theme import Theme

class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'