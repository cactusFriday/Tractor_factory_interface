from django.contrib.auth.models import User
from accident.models import Accident, AccidentClass

from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APITestCase, RequestsClient
from rest_framework import status

from requests.auth import HTTPBasicAuth
import json


def create_accident_class_table():
    names = ("Тип травма", "Тип некомплектность", "Тип экспериментальный")
    for i in range(3):
        tmp = AccidentClass(number=i, name=names[i])
        tmp.save()


class AccidentTestCase(APITestCase):

    def setUp(self) -> None:
        """Настройка тест кейса: заполнение классов инцидента, создание пользователя, 
        инициализация тестовых json"""
        create_accident_class_table()
        
        # создание тестового пользователя
        user = User.objects.create(username='test_user')

        # инициализация клиента и аутентификация
        self.client = APIClient()
        self.client.force_authenticate(user=user)

        # тело для инцидента
        self.json_accident = {
            "time_appeared": "2021-05-10 19:28:40+00:00", 
            "time_solved": None, 
            "post": 6,
            "accident_class": None, 
            "description": "Рабочий отказался работать, на данный момент не объясняет почему."
        }

        # тело для истории инцидента
        self.json_history = {
            "accident_id": 6,
            "accident_class": 1,
            "description": "Рабочий решил вернуться на РМ, была нехватка комплектующих."
        }

        # создание записи инцидента
        accident = Accident(**self.json_accident, user=user)
        accident.save()

    def test_create_accident_accidentClass_null(self):
        """Создание инцидента с незаданным классом инцидента"""
        json_accident = self.json_accident
        # изменение даты появления происшествия (ограничение на уникальную дату)
        json_accident['time_appeared'] = "2021-10-10 19:28:40+00:00"
        
        response = self.client.post(
            reverse('accident-list'), data=json.dumps(json_accident), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_accident_accidentClass_not_null(self):
        """Создание инцидента с заданным классом инцидента"""
        json_accident = self.json_accident
        # изменение даты появления происшествия (ограничение на уникальную дату)
        json_accident['time_appeared'] = "2021-10-10 19:28:40+00:00"
        json_accident['accident_class'] = 1
        response = self.client.post(
            reverse('accident-list'), data=json.dumps(json_accident), content_type='application/json')
        # print(f'test_create_accident_accidentClass_not_null: {response.content}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_accidents_authorized(self):
        """Получение списка инцидентов от неавторизованного пользователя"""
        response = self.client.get(reverse('accident-list'))
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_accidents_unauthorized(self):
        """Получение списка инцидентов от неавторизованного пользователя"""
        client = APIClient()
        response = client.get(reverse('accident-list'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    def test_create_history_accident(self):
        """Редактирование (создание записи в истории) существующего инцидента"""
        print(AccidentClass.objects.all())
        response = self.client.post(
            reverse('accident_history-list'), data=json.dumps(self.json_history), content_type='application/json')
        print(f'test_create_history_accident:\n\n {response.content}\n')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
