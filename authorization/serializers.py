from django.db.models.fields import files
from rest_framework import fields, serializers
from .models import TestModel

class TestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TestModel
        # fields = ('pk', 'first_name', 'description')
        fields = '__all__'
