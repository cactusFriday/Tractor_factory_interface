from django.contrib import admin
from accident.models import *


admin.site.register(Accident)
admin.site.register(AccidentClass)
admin.site.register(AccidentHistory)