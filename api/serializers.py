from rest_framework import serializers
from .models import Type, Table , Student , Assistant
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name','date_joined']
        read_only_fields = ['id']
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'        
class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ['id']
class AssistantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assistant
        fields = '__all__'
        read_only_fields = ['id']