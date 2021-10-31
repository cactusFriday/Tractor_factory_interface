from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view

from conveyor.models import ConveyorState


@api_view(['GET', 'POST'])
def conveyor_state_list(request):
    '''
    POST:   обрабатывает json, присланный модулятором, сохраняет в БД и возвращает его обратно
    GET:    достает состояния постов из БД и отправляет json
    '''
    if request.method == 'GET':
        conv_state_set = ConveyorState.get_posts()
        serializer = ConveyorStateSerializer(conv_state_set, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ConveyorStateSerializer(data=data, many=True)
        if serializer.is_valid():
            stats_set = ConveyorState.objects.order_by('post')
            # Обновление статусов
            for i, conv_stat in enumerate(stats_set):
                tmp = conv_stat
                if tmp.status != serializer.validated_data[i]['status']:
                    tmp.status = serializer.validated_data[i]['status']
                    tmp.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400, safe=False)
