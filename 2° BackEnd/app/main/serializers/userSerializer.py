from rest_framework import serializers
from main.subModels.user import User
from main.subModels.auth import Auth
from main.subModels.nationality import Nationality
from django.forms.models import model_to_dict

class UserSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    auth_id = serializers.IntegerField() 
    nationality_id = serializers.IntegerField() 

    def get_email(self, user):
        try:
            auth = Auth.objects.get(id=user.auth_id)
            email = auth.email
        except Auth.DoesNotExist:
            email = None

        return email

    class Meta:
        model = User
        fields = ('id', 'nickname', 'bornDate', 'sexuality', 'email', 'joined', 'note', 'status', 'auth_id', 'nationality_id')

    def create(self, data):
        auth_id = data.get("auth_id")
        nationality_id = data.get("nationality_id")
        try:
            User.objects.get(auth_id=auth_id)
            raise serializers.ValidationError("User already exist.")
        except User.DoesNotExist:
            user = {
                'nickname': data["nickname"],
                'bornDate': data["bornDate"],
                'sexuality': data['sexuality']
            }
            auth = Auth.objects.get(id=auth_id)
            nationality = Nationality.objects.get(id=nationality_id)
            authData = model_to_dict(auth)
            authData = {key: value for key, value in authData.items() if key != 'roles'}
            auth = Auth(**authData)
            user = User(**user)
            user.auth = auth
            user.nationality = nationality
            user.save()
            return user
