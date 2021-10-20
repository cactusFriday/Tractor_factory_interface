from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics

from .serializers import TestSerializer

# Можно так. Тогда наследуя определенные классы, будут обрабатываться разные запросы, 
# ну либо можно множественно наследовать. По идее должно работать (Create - POST, List - GET...)
class TestSerializerView(generics.CreateAPIView):
    serializer_class = TestSerializer


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