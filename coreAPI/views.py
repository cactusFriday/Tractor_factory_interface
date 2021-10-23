from django.contrib.auth.models import User
from django.http import JsonResponse, request

from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import generics, serializers
from rest_framework import authentication, permissions

from coreAPI.premissions import IsOwnerOrReadOnly
from coreAPI.models import Accident, AccidentClass, AccidentHistory, ConveyorState
from coreAPI.serializers import AccidentHistorySerializer, AccidentSerializer, ConveyorStateSerializer, UserSerializer

@api_view(['GET', ])
def api_root(request, format=None):
    '''func-based view для корневого адреса API, возвращает джсон URL'''
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'conveyor states': reverse('conveyor-list', request=request, format=format),
        'accidents': reverse('accident-list', request=request, format=format),
        'accidents history': reverse('accident_history-list', request=request, format=format),
    })

class UserList(generics.ListAPIView):
    '''GET - возвращает всех пользователей, с созданными ими инцидентами'''
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    '''GET+pk - возвращает user(id=pk)'''
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AccidentList(generics.ListCreateAPIView):
    '''GET - выводит все инциденты. POST - создает инцидент'''
    queryset = Accident.objects.all()
    serializer_class = AccidentSerializer

    def perform_create(self, serializer):
        '''пробрасывает user из request в serializer'''
        serializer.save(user=self.request.user)

class AccidentHistoryList(generics.ListCreateAPIView):
    '''GET - выводит все истории изменений. POST - создает историю изменения к определенному инциденту'''
    queryset = AccidentHistory.objects.all()
    serializer_class = AccidentHistorySerializer

    def perform_create(self, serializer):
        '''
        Сценарий создания истории (редактирования инцидента):
        1. клиент заполняет форму опредленного инцидента с полями (класс инцидента, описание)
        2. с фронта приходит джсон {accident_id, accident_class, description}
        3. необходимо положить класс и описание в инцидент по айди и историю уже сохранить с описанием, классом инцидента по айди
        '''
        accident = Accident.objects.get(id=serializer.validated_data['accident_id'])
        current_description = accident.description
        current_class = accident.accident_class
        accident.description = serializer.validated_data.get('description')
        accident.accident_class = serializer.validated_data.get('accident_class')
        accident.save()
        acc_history_elem = AccidentHistory(accident=accident, accident_class=current_class, description=current_description)
        acc_history_elem.save()
        # print(f'Updated accident:\n{accident.id}\n{accident.user}\n{accident.time_appeared}\n{accident.post}\n{accident.accident_class}\n{accident.description}')
        # print(f'Put in history:\n{acc_history_elem.id}\n{acc_history_elem.accident}\n{acc_history_elem.accident_class}\n{acc_history_elem.description}')


class AccidentDetail(generics.RetrieveUpdateDestroyAPIView):
    '''GET+pk - возвращает Accident(id=pk)'''
    permission_classes = [IsOwnerOrReadOnly,]
    queryset = Accident.objects.all()
    serializer_class = AccidentSerializer

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

@api_view(['POST', ])
def accident_history(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = request.user
        if data['accident_class'] is not None:
            acc_class = AccidentClass.objects.get(number=data['accident_class'])

        data['accident_class'] = acc_class
        data['user'] = user
        accident = Accident.objects.get(user=user, time_appeared=data['time_appeared'])
            
        history_set = accident.get_history_set()
        history_serializer = AccidentHistorySerializer(history_set, many=True)
        return JsonResponse(history_serializer.data, status=201, safe=False)

@api_view(['GET', ])
def accident_last(request):
    if request.method == 'GET':
        last_acc = Accident.objects.latest('id')
        

# @api_view(['POST', ])
# def accident_create(request):
#     pass

# @api_view(['GET', ])
# def accident_detail(request):
#     pass