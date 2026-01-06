from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=21, write_only=True)
    
    class Meta:
        model = User
        fields = ["id", "username", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True},}

    def create(self, validated_data):
        validated_data.pop("password2") # user model has no password2
        user = User.objects.create_user(**validated_data)
        return user

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        
        if password != password2:
            raise serializers.ValidationError("passwords are not same")
        return attrs
    
            
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "create_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}