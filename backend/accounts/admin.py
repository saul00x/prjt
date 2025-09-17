from django.contrib import admin
from .models import Account, PlayerCard, WhatsAppLink, AdminAccess

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['is_active']

@admin.register(PlayerCard)
class PlayerCardAdmin(admin.ModelAdmin):
    list_display = ['account', 'position', 'player_name', 'rating']
    list_filter = ['position', 'account']
    search_fields = ['player_name', 'account__name']

@admin.register(WhatsAppLink)
class WhatsAppLinkAdmin(admin.ModelAdmin):
    list_display = ['link', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']

@admin.register(AdminAccess)
class AdminAccessAdmin(admin.ModelAdmin):
    list_display = ['access_token', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']