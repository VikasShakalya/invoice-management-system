from django.urls import path
from . import views

urlpatterns = [
    path('invoices/', views.InvoiceListCreate.as_view()),
    path('invoices/<int:pk>/', views.InvoiceDetail.as_view()),
]
