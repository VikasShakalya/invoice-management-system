from django.contrib import admin
from .models import Invoice


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'due_date', 'created_at')
    list_filter = ('due_date',)
    search_fields = ('user__username',)
