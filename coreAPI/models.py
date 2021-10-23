from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone



class AccidentClass(models.Model):
    '''Таблица с классами инцидентов'''
    number = models.IntegerField('Класс происшествия')
    name = models.CharField('Название класса происшествия', max_length=64)

    def __str__(self) -> str:
        return f'Class {self.number}:{self.name}'

class Accident(models.Model):
    ACC_HIST_ARGS = ('accident_class', 'description')
    '''Основная информация происшествия'''
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='accidents', on_delete=models.CASCADE)
    # Время появления проблемы (момент нажатия кнопки)
    time_appeared = models.DateTimeField('Время появления происшествия', blank=False, default=timezone.now, unique=True)
    # Время решения проблемы (мастер зарегестрировал в системе) TODO: узнать как это поле заполнять
    time_solved = models.DateTimeField('Время решения происшествия', blank=True, null=True)
    post = models.IntegerField('Пост с происшествием')
    accident_class = models.ForeignKey(to=AccidentClass, on_delete=models.SET_NULL, null=True, default=None)
    description = models.TextField('Описание происшествия', blank=True, null=True)
    
    def get_history_set(self):
        return AccidentHistory.objects.filter(accident=self)
    
    def add_history_record(self, **kwargs):
        if len(kwargs) < len(self.ACC_HIST_ARGS):
            raise Exception('Not enough arguments to create Accident History record')
        if not set(self.ACC_HIST_ARGS) & set(kwargs.keys()) == set(self.ACC_HIST_ARGS):
            raise Exception('Some arguments are not provided')
        his_args = {}
        for arg in self.ACC_HIST_ARGS:
            his_args[arg] = kwargs[arg]
        history_record = AccidentHistory(accident=self, **his_args)
        # TODO: add tests and .save() 
        return history_record

    def __str__(self) -> str:
        return f'[{self.user.username}][{self.time_appeared}]: {self.accident_class}'

class AccidentHistory(models.Model):
    '''Таблица истори изменений происшествий'''
    accident = models.ForeignKey(Accident, related_name='accident_history', on_delete=models.SET_NULL, null=True, default=None)
    time_changed = models.DateTimeField('Время внесения изменений', blank=False, default=timezone.now)
    accident_class = models.ForeignKey(to=AccidentClass, on_delete=models.SET_NULL, null=True)
    description = models.TextField('Описание происшествия', blank=True, null=True)

    def __str__(self) -> str:
        return f'History record [{self.pk}]: {self.accident}'


class ConveyorState(models.Model):
    '''Таблица с 14 записями состояний постов'''
    class StatusChoices(models.IntegerChoices):
        ACTIVE = 1
        SUCCESS = 2
        ERROR = 3

    post = models.IntegerField('Номер поста')
    status = models.CharField('Статус поста', max_length=12, default='success')
    # status = models.SmallIntegerField('Статус поста', choices=StatusChoices.choices)

    def __str__(self) -> str:
        return f'[{self.status}]: post {self.post}'