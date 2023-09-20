from rest_framework import serializers
from main.subModels.achievement import Achievement

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'