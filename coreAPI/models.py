from django.db import models
from django.conf import settings

# settings.AUTH_USER_MODEL
'''
test_user
pass
'''

class AccidentClass(models.Model):
    '''Таблица с классами инцидентов'''
    number = models.IntegerField('Класс происшествия')
    name = models.CharField('Название класса происшествия', max_length=64)

    def __str__(self) -> str:
        return f'Class {self.number}:{self.name}'


class Accident(models.Model):
    '''Основная информация происшествия'''
    post = models.IntegerField('Пост с происшествием')
    accident_class = models.ForeignKey(to=AccidentClass, on_delete=models.SET_NULL, null=True)
    description = models.TextField('Описание происшествия', blank=True, null=True)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    timestamp = models.DateTimeField('Время создания инцидента', auto_created=True)

    @staticmethod
    def get_all_rows():
        # Можно создавать методы для обработки модели, получения каких то определенных полей и т.д.
        return Accident.objects.all()
        
    def __str__(self) -> str:
        return f'[{self.user.username}][{self.timestamp}]: {self.accident_class}'


class ConveyorState(models.Model):
    '''Таблица с 14 записями состояний постов'''
    class StatusChoices(models.IntegerChoices):
        ACTIVE = 1
        SUCCESS = 2
        ERROR = 3

    post = models.IntegerField('Номер поста')
    status = models.SmallIntegerField('Статус поста', choices=StatusChoices.choices)

    def __str__(self) -> str:
        return f'[{self.status}]: post {self.post}'