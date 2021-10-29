from django.db import models


# Create your models here.
class ConveyorState(models.Model):
    post = models.IntegerField('Номер поста')
    status = models.CharField('Статус поста', max_length=12, default='success')

    def __str__(self) -> str:
        return f'[{self.status}]: post {self.post}'

    @classmethod
    def get_posts(cls):
        return ConveyorState.post
