from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from coreAPI.models import ConveyorState
from coreAPI.serializers import ConveyorStateSerializer



@api_view(['GET', 'POST'])
def conveyor_state_list(request):
    '''
    POST:   обрабатывает json, присланный модулятором, сохраняет в БД и возвращает его обратно
    GET:    достает состояния постов из БД и отправляет json
    '''
    if request.method == 'GET':
        conv_state_set = ConveyorState.objects.order_by('post')
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


# @api_view(['POST', ])
# def accident_create(request):
#     if request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = AccidentListSerializer(data=data)
#         user = request.user
#         accident_class = data.get('accident_class', None)
#         if serializer.is_valid():
#             ser_data = serializer.data
#             ser_data['accident_class'] = accident_class
#             ser_data['user'] = user
#             accident = Accident(**ser_data)
#             try:
#                 accident.save()
#             except:
#                 print('Something gone wrong')
#             return JsonResponse(serializer.data, status=201, safe=False)
#         return JsonResponse(serializer.errors, status=400, safe=False)

# @api_view(['POST', ])
# def accident_create(request):
#     pass

# @api_view(['GET', ])
# def accident_detail(request):
#     pass
