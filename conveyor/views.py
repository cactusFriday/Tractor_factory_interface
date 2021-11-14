from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.parsers import JSONParser

from conveyor.models import PostsState, ButtonsBlocks
from conveyor.serializers import PostsStateSerializer, ButtonsBlocksSerializer


@api_view(['GET'])
def posts_state_list(request):
    """
    GET:    достает состояния постов из БД и отправляет json
    """
    if request.method == 'GET':
        conv_state_set = PostsState.objects.order_by('post')
        serializer = PostsStateSerializer(conv_state_set, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def update_posts_status(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ButtonsBlocksSerializer(data=data, many=True)
        if serializer.is_valid():
            status_set = ButtonsBlocks.objects.all()
            print(ButtonsBlocks.posts)
            for i, conv_stat in enumerate(status_set):
                """if tmp.posts_state != serializer.validated_data[i]['status_post']:
                    tmp.posts_state = serializer.validated_data[i]['status_post']
                    tmp.save()"""
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.data, status=201, safe=False)


class ButtonsBlocksRetrieveAPIView(ListAPIView):
    queryset = ButtonsBlocks.objects.all()
    serializer_class = ButtonsBlocksSerializer
