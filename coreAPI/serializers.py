from django.db.models.base import Model
from rest_framework import fields, serializers
from .models import *

POST_AMOUNT = 13

class ConveyorStateSerializer(serializers.ModelSerializer):
    
    # def alter_posts_states(self):
    #     if self.is_valid():
    #         stats_set = ConveyorState.objects.order_by('id')
    #         for i, conv_stat in enumerate(stats_set):
    #             tmp = conv_stat
    #             if tmp.status != self.validated_data[i]['status']:
    #                 tmp.status = self.validated_data[i]['status']
    #                 tmp.save()
    #     else:
    #         return self.errors

    class Meta:
        model = ConveyorState
        fields = ('id', 'post', 'status')
    
# class ConveyorState

class AccidentListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Accident
        fields = '__all__'
        read_only_fields = ('timestamp', )


# class TestSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Accident
#         fields = '__all__'
