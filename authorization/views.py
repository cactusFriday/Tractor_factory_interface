from django.http.response import HttpResponse

PAGE = '''
<br><br><hr>
<h1>Фронт находится в стадии разработки, просим прощения!</h1><hr>
'''

def developing_page(request):
    return HttpResponse(PAGE)