import rest_framework
from authorization.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django_filters import rest_framework as filters

from accident.models import Accident, AccidentClass, AccidentHistory
from accident.permissions import IsOwnerOrReadOnly
from accident.serializers import AccidentClassSerializer, AccidentHistorySerializer, AccidentSerializer
from accident.filters import AccidentFilter

"""
TODO: 1. UPDATE request [v]
TODO: 2. POST not allowed? [v]
TODO: 3. Pagination settings
TODO: 4. Filter params [page?, post, last]
"""

class AccidentRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Accident.objects.all()
    serializer_class = AccidentSerializer

    @method_decorator(ensure_csrf_cookie)
    def update(self, request, *args, **kwargs):
        """При PATCH запросе в инциденте должны обновиться только класс, описание"""
        # Получаем модель инцидента
        instance = self.get_object()
        # Инициализируем сериализатор, передавая модель для сериализации, джсон из реквеста. 
        # partial=true - передаем не все необходимые поля модели
        serializer = self.get_serializer(instance, request.data, partial=True)
        # Валидируем данные и сохраняем в БД
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

class AccidentList(generics.ListCreateAPIView):
    '''GET - выводит все инциденты. POST - создает инцидент'''
    queryset = Accident.objects.order_by('-id')
    serializer_class = AccidentSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AccidentFilter
    sort_params = {
        'sort': None,
        'last': None,
        'posts_block': None,
        'dateStart': None,
        'dateEnd': None,
        'accClass': None,
    }

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    # def get_filter_params(self) -> 'tuple[dict, str]':
    #     """Очищает словарь от непереданных фильтров, парсит фильтры. 
    #     Возвращает словарь аргументов для фильтрации и порядок сортировки"""
    #     # Чистим лишние элементы словаря (параметры, которые не были переданы)
    #     tmp = self.sort_params.copy()
    #     [tmp.pop(param) for param in self.sort_params if self.sort_params[param] is None]
    #     # Если не передан параметр order или равен любой строке, кроме DESC - '', иначе '-'
    #     ordering = '' if tmp.pop('order', 'ASC') == 'DESC' else '-'

    #     acc_class_filter = tmp.get('accClass')
    #     # во избежание ValueError (NoneType не может .split())
    #     if acc_class_filter is not None:
    #         acc_class_filter = None if acc_class_filter == 'null' else tuple(map(int, acc_class_filter.split(';')))
    #     d = {
    #         'time_appeared__date__range': (tmp.get('dateStart'), tmp.get('dateEnd')),
    #     }
    #     # Если класс инцидента null - будем искать инциденты только с классом None, иначе ищем в переданной последовательности
    #     if acc_class_filter is None:
    #         d['accident_class__number'] = acc_class_filter
    #     else: 
    #         d['accident_class__number__in'] = acc_class_filter
    #     return d, ordering

    # def get_queryset(self):
    #     queryset = self.queryset
    #     params = self.request.query_params
    #     if params:
    #         for key in self.sort_params:
    #             self.sort_params[key] = params.get(key)

    #         filter_params, ordering = self.get_filter_params()
    #         try:
    #             queryset = self.queryset.filter(**filter_params).order_by(f'{ordering}time_appeared')
    #         except:
    #             pass
    #     return queryset

    def perform_create(self, serializer):
        '''пробрасывает user из request в serializer'''
        serializer.save(user=self.request.user)


class AccidentHistoryList(generics.ListCreateAPIView):
    '''GET - выводит все истории изменений. POST - создает историю изменения к определенному инциденту'''
    queryset = AccidentHistory.objects.all()
    serializer_class = AccidentHistorySerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        '''
        Сценарий создания истории (редактирования инцидента):
        1. клиент заполняет форму опредленного инцидента с полями (класс инцидента, описание)
        2. с фронта приходит джсон {accident_id, accident_class, description}
        3. необходимо положить класс и описание в инцидент по айди и историю уже сохранить с описанием, классом инцидента по айди
        '''
        accident = Accident.objects.get(id=serializer.validated_data['accident_id'])
        current_description, current_class = accident.description, accident.accident_class
        accident.description = serializer.validated_data.get('description')
        accident.accident_class = serializer.validated_data.get('accident_class')
        accident.save()
        acc_history_elem = AccidentHistory(accident=accident, accident_class=current_class,
                                           description=current_description)
        acc_history_elem.save()

class AccidentClassList(generics.ListCreateAPIView):
    queryset = AccidentClass.objects.all()
    serializer_class = AccidentClassSerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)