from rest_framework import serializers
from rest_framework.authtoken.admin import User

from .models import *


class ConveyorStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConveyorState
        fields = ('post', 'status')


class AccidentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    accident_history = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Accident
        fields = (
            'id', 'user', 'time_appeared', 'time_solved', 'post', 'accident_class', 'description', 'accident_history')


class AccidentHistorySerializer(serializers.ModelSerializer):
    accident_id = serializers.IntegerField()

    class Meta:
        model = AccidentHistory
        fields = ('id', 'time_changed', 'accident_id', 'accident_class', 'description')


class UserSerializer(serializers.ModelSerializer):
    accidents = serializers.PrimaryKeyRelatedField(many=True, queryset=Accident.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'accidents')
