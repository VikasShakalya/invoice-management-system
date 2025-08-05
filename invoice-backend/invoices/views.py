from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Invoice
from .serializers import InvoiceSerializer
from django.db.models import Sum, Count, Q
from datetime import datetime


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get invoice statistics"""
        total_invoices = Invoice.objects.count()
        total_revenue = Invoice.objects.filter(
            status__in=['paid', 'partial']
        ).aggregate(total=Sum('amount'))['total'] or 0
        
        pending_invoices = Invoice.objects.filter(
            status='pending'
        ).count()
        
        overdue_invoices = Invoice.objects.filter(
            status='overdue'
        ).count()
        
        stats_data = {
            'total_invoices': total_invoices,
            'total_revenue': float(total_revenue),
            'pending_invoices': pending_invoices,
            'overdue_invoices': overdue_invoices
        }
        
        return Response(stats_data)
