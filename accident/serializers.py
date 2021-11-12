from rest_framework import serializers
# from django.contrib.auth.models import User
from authorization.models import User

from accident.models import *


class AccidentHistorySerializer(serializers.ModelSerializer):
    """Сериализатор для создания изменений в инцидентах."""
    accident_id = serializers.IntegerField()

    class Meta:
        model = AccidentHistory
        fields = ('id', 'time_changed', 'accident_id', 'accident_class', 'description')

class AccidentSerializer(serializers.ModelSerializer):
    """Сериализатор для таблицы инцидентов. 
    В поле accident_history подтягивает все записи изменений, касаемые данного инцидента и сериализует"""
    user = serializers.ReadOnlyField(source='user.username')
    accident_history = AccidentHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Accident
        fields = (
            'id', 'user', 'time_appeared', 'time_solved', 'post', 'accident_class', 'description', 'accident_history')

class AccidentClassSerializer(serializers.ModelSerializer):
    """Сериализатор для классов инцидентов"""

    class Meta:
        model = AccidentClass
        fields = '__all__'