from django.http.response import HttpResponse
from django.shortcuts import render

PAGE = '''
<br><br><hr>
<h1>Фронт находится в стадии разработки, просим прощения!</h1><hr>
'''

def index(request):
    return render(request, 'authorization/index.html', {})

def developing_page(request):
    return HttpResponse(PAGE)

def monitoring(request):
    return render(request, 'authorization/monitoring.html', {})

def not_allowed(request):
    return render(request, 'authorization/na.html', {})

def board(request):
    return render(request, 'authorization/board.html', {})

def login(request):
    return render(request, 'authorization/login.html', {})
