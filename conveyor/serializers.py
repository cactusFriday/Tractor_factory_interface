from rest_framework import serializers
from conveyor.models import *


class ButtonsBlocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ButtonsBlocks
        fields = ('buttons_block_number', 'status_block')


class PostsStateSerializer(serializers.ModelSerializer):
    post_number = serializers.IntegerField(read_only=True)
    buttons_set = ButtonsBlocksSerializer(many=True)

    class Meta:
        model = PostsState
        fields = ['post_number', 'buttons_set']
