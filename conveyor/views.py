from django.http import JsonResponse
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.parsers import JSONParser

from accident.models import Accident
from conveyor.models import PostsState, ButtonsBlocks
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
                        accident = Accident(posts_block=buttons_block.buttons_block_number)
                        accident.save()
                    elif buttons_block.status_block == 'error':
                        accidents = Accident.objects.filter(posts_block=buttons_block.buttons_block_number)
                        for accident in accidents:
                            accident.time_solved = timezone.now()
                            accident.save()
                    buttons_block.status_block = serializer.validated_data[i]['status_block']
                    buttons_block.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400, safe=False)


class ButtonsBlocksRetrieveAPIView(ListAPIView):
    queryset = ButtonsBlocks.objects.all()
    serializer_class = ButtonsBlocksConfiguratorSerializer


@api_view(['POST'])
def update_posts_buttons_configuration(request):
    data = JSONParser().parse(request)
    serializer = ButtonsBlocksConfiguratorSerializer(data=data, many=True)
    if serializer.is_valid():
        for new_button_block in serializer.validated_data:
            old_button_block = ButtonsBlocks.objects.get(
                buttons_block_number=new_button_block['buttons_block_number'])
            for post in old_button_block.posts.all():
                old_post = PostsState.objects.get(post_number=post.post_number)
                old_post.buttons_set.remove(old_button_block)
            for new_post in new_button_block['posts']:
                post = PostsState.objects.get(post_number=new_post['post_number'])
                post.buttons_set.add(old_button_block)
        return JsonResponse(serializer.data, status=201, safe=False)
    return JsonResponse(serializer.errors, status=400, safe=False)
