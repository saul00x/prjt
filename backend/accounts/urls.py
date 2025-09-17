from django.urls import path
from .views import AccountListView, AccountDetailView, whatsapp_link_view

urlpatterns = [
    path('accounts/', AccountListView.as_view(), name='account-list'),
    path('accounts/<int:pk>/', AccountDetailView.as_view(), name='account-detail'),
    path('whatsapp-link/', whatsapp_link_view, name='whatsapp-link'),
]