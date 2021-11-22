from django.db import models
from django.conf import settings
from django.utils import timezone

'''
Как только сообщается красная кнопка - фиксация времени.
создание происшествия с начальным временем и номером поста в соответствии с конфигурацией. Accident().save()
Больше одного НЕрешенного происшествия на одном блоке кнопок быть не может.
Значит при нажатии на клиенте на красную кнопку берем последний инцидент (GET + /?last=true)
Причем в соотетствии с конфигурацией (можно ее хранить в локалсторедж), понимаем на какой пост нажали - запрашиваем инцидент по такому посту
подгружаем время фиксации, ставим пост. Менять можно класс, описание. Время решения менять нельзя, 
оно выставляется на беке в момент переключения кнопки, в дальнейшем обновится на фронте.
'''




class AccidentClass(models.Model):
    """Таблица с классами инцидентов"""
    number = models.IntegerField('Класс происшествия')
    name = models.CharField('Название класса происшествия', max_length=64)

    def __str__(self) -> str:
        return f'Class {self.number}:{self.name}'


class Accident(models.Model):
    """Основная информация происшествия"""
    ACC_HIST_ARGS = ('accident_class', 'description')
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='accidents', on_delete=models.CASCADE, blank=True, null=True)
    # Время появления проблемы (момент нажатия кнопки)
    time_appeared = models.DateTimeField('Время появления происшествия', blank=False, default=timezone.now, unique=True)
    # Время решения проблемы (мастер зарегестрировал в системе) TODO: узнать как это поле заполнять
    time_solved = models.DateTimeField('Время решения происшествия', blank=True, null=True)
    posts_block = models.IntegerField('Пост с происшествием')
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
        return f'[{self.time_appeared}]: {self.accident_class}'


class AccidentHistory(models.Model):
    """Таблица истори изменений происшествий"""
    objects = None
    accident = models.ForeignKey(Accident, related_name='accident_history', on_delete=models.CASCADE, null=True,
                                 default=None)
    time_changed = models.DateTimeField('Время внесения изменений', blank=False, default=timezone.now)
    accident_class = models.ForeignKey(to=AccidentClass, on_delete=models.SET_NULL, null=True)
    description = models.TextField('Описание происшествия', blank=True, null=True)

    def __str__(self) -> str:
        return f'History record [{self.pk}]: {self.accident}'