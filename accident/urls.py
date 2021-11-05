from django.urls import path

from accident import views

urlpatterns = [
    path('', views.AccidentList.as_view(), name='accident-list'),
    path('<int:pk>/', views.AccidentDetail.as_view(), name='accident-detail'),
    path('history/', views.AccidentHistoryList.as_view(), name='accident_history-list'),
]


'''
заходим на сайт
отправляем запрос на получение последних 10 происшествий
GET /accident/?last=10

нажимаем на править определенный запрос
заполняем форму и отправляем запрос с телом
POST /accident/<int:pk> {id, post, ....}
достаем по этому айди, создаем запись в истории, перекладываем в историю поля этого происшествия (старый), меняем поля у этого происшествия
возвращаем ЛИБО история+данное происшествие ЛИБО данное происшествие
'''