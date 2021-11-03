from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET', ])
def api_root(request, format=None):
    '''func-based view для корневого адреса API, возвращает json со всеми API URL'''
    return Response({
        # 'users': reverse('user-list', request=request, format=format),
        'conveyor states': reverse('conveyor-list', request=request, format=format),
        'accidents': reverse('accident-list', request=request, format=format),
        'accidents history': reverse('accident_history-list', request=request, format=format),
    })