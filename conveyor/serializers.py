from rest_framework import serializers
from conveyor.models import *


class ConveyorStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConveyorState
        fields = ('post', 'status')

