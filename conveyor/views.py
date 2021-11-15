from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.parsers import JSONParser
from django.utils import timezone

from conveyor.models import PostsState, ButtonsBlocks
from accident.models import Accident
from conveyor.serializers import PostsStateSerializer, ButtonsBlocksSerializer, ButtonsBlocksConfiguratorSerializer


@api_view(['GET'])
def posts_state_list(request):
    """
    GET:    достает состояния блоков кнопок, которые связаны с постами из БД и отправляет json
    """
    if request.method == 'GET':
        conv_state_set = PostsState.objects.all()
        serializer = PostsStateSerializer(conv_state_set, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def update_posts_status(request):
    """
    POST:   принимает номер блока кнопки и её статус и обновляет данные в БД.
    Если статус блока error, то создаётся инцидент.
    Если статус блока был error, а стал active или success, то инцидент становится решённым
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ButtonsBlocksSerializer(data=data, many=True)
        if serializer.is_valid():
            buttons_blocks = ButtonsBlocks.objects.all()
            for i, buttons_block in enumerate(buttons_blocks):
                if buttons_block.status_block != serializer.validated_data[i]['status_block']:
                    if serializer.validated_data[i]['status_block'] == 'error':
                        for post in buttons_block.posts.all():
                            accident = Accident(post=post.post_number)
                            accident.save()
                    elif buttons_block.status_block == 'error':
                        for post in buttons_block.posts.all():
                            accidents = Accident.objects.filter(post=post.post_number)
                            for accident in accidents:
                                accident.time_solved = timezone.now()
                                accident.save()
                    buttons_block.status_block = serializer.validated_data[i]['status_block']
                    buttons_block.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.data, status=201, safe=False)


class ButtonsBlocksRetrieveAPIView(ListAPIView):
    queryset = ButtonsBlocks.objects.all()
    serializer_class = ButtonsBlocksConfiguratorSerializer
