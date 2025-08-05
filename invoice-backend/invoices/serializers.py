from rest_framework import serializers
from .models import Invoice
from users.serializers import UserSerializer

class InvoiceSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Invoice
        fields = ['id', 'user', 'amount', 'due_date', 'created_at']
        read_only_fields = ['created_at']
