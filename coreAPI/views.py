from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import generics, views
from rest_framework import authentication, permissions

from .models import Accident, ConveyorState
from .serializers import AccidentListSerializer, ConveyorStateSerializer

# @csrf_exempt
@api_view(['GET', 'POST'])
def conveyor_state_list(request):
    '''
    POST:   обрабатывает json, присланный модулятором, сохраняет в БД
    GET:    достает состояния постов из БД и отправляет json
    '''
    if request.method == 'GET':
        conv_state_set = ConveyorState.objects.order_by('id')
        serializer = ConveyorStateSerializer(conv_state_set, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ConveyorStateSerializer(data=data, many=True)
        if serializer.is_valid():
            stats_set = ConveyorState.objects.order_by('id')
            # Обновление статусов
            for i, conv_stat in enumerate(stats_set):
                tmp = conv_stat
                if tmp.status != serializer.validated_data[i]['status']:
                    tmp.status = serializer.validated_data[i]['status']
                    tmp.save()
            
            print()
            print('CHANGES SAVED')
            print(ConveyorState.objects.order_by('id'))
            print()
            
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400, safe=False)

@api_view(['POST', ])
def accident_create(request):
    pass

@api_view(['GET', ])
def accident_detail(request):
    pass


        

class AccidentListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AccidentListSerializer
    # lookup_field
    def get_queryset(self):
        return Accident.get_all_rows()

class AccidentList(views.APIView):
    # authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)



# Можно так. Тогда наследуя определенные классы, будут обрабатываться разные запросы, 
# ну либо можно множественно наследовать. По идее должно работать (Create - POST, List - GET...)
# class TestSerializerView(generics.CreateAPIView):
#     serializer_class = TestSerializer


# Но можно и функцией возвращать ответы
# @api_view(['GET', 'POST'])
# def test_list(request):
#     if request.method == 'GET':
#         pass

#     elif request.method == 'POST':
#         serializer = TestSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(data=serializer.data, status=status.HTTP_201_CREATED)
#         return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)