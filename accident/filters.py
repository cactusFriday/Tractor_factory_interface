import django_filters
from django_filters import FilterSet
from accident.models import Accident


"""
TODO: Разобраться как передавать класс инцидента и фильтровать, а так же ренж даты
"""

class AccidentFilter(FilterSet):

    class Meta:
        model = Accident
        fields = {
            'accident_class': ['exact',],
            'posts_block': ['exact',],
            'time_appeared': ['gte', 'lte', 'date__range'],
            'time_solved': ['gte', 'lte']
        }
    
    @property
    def qs(self):
        """Переопределяем геттер queryset'а. 
        Вернет элемент, зафиксированный последним, с учетом фильтров"""
        # возвращает queryset Инцидентов
        parent = super().qs
        is_last = self.request.query_params.get('last')
        if is_last is not None and is_last == "True":
            # Необходимо положить в список/кортеж, чтобы пагинатор мог определить длинну последовательности
            parent = (parent.latest('time_appeared'), )
        return parent