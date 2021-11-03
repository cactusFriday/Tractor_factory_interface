from django.db import models


class ConveyorState(models.Model):
    """Таблица с 28 записями состояний постов"""

    objects = None

    class StatusChoices(models.IntegerChoices):
        ACTIVE = 1
        SUCCESS = 2
        ERROR = 3

    post = models.IntegerField('Номер поста')
    status = models.CharField('Статус поста', max_length=12, default='success')

    def __str__(self) -> str:
        return f'[{self.status}]: post {self.post}'
