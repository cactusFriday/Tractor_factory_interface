from django.contrib import admin
from django.urls import path, include
from .root_view import api_root

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', api_root),
    # path('api/v1/authentication', include('authorization.urls')),
    # path('api/v1/registration', include('registration.urls')),
    path('api/v1/accident/', include('accident.urls')),
    # path('', include('authorization.urls'))
]

# Позволяет залогиниться, в случае работы с API в браузере
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]