from django.db import models

class TestModel(models.Model):
    # аттрибуты - поля таблицы
    first_name = models.CharField(verbose_name='First Name', null=True, unique=False, max_length=64)
    description = models.TextField('some description', blank=True, null=True)
    creation_time = models.DateTimeField('Created At', auto_now_add=True)

    def some_method(self):
        # Можно создавать методы для обработки модели, получения каких то определенных полей и т.д.
        pass

    def __str__(self) -> str:
        return self.first_name

