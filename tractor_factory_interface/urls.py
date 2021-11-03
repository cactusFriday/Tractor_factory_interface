from django.urls import path, include
from .root_view import api_root

urlpatterns = [
    path('api/v1/', api_root),
    path('api/v1/accident/', include('accident.urls')),
    path('api/v1/conveyor-state/', include('conveyor.urls')),
]

# Позволяет залогиниться, в случае работы с API в браузере
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]