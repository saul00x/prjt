from rest_framework import serializers
from .models import Account, PlayerCard, WhatsAppLink

class PlayerCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerCard
        fields = ['id', 'position', 'image', 'rating', 'player_name']

class AccountSerializer(serializers.ModelSerializer):
    player_cards = PlayerCardSerializer(many=True, read_only=True)
    managers = serializers.SerializerMethodField()
    defenders = serializers.SerializerMethodField()
    midfielders = serializers.SerializerMethodField()
    forwards = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = [
            'id', 'name', 'price', 'description', 'image1', 'image2', 
            'detail_image', 'created_at', 'updated_at', 'is_active',
            'player_cards', 'managers', 'defenders', 'midfielders', 'forwards'
        ]

    def get_managers(self, obj):
        cards = obj.player_cards.filter(position='managers')
        return [card.image.url for card in cards]

    def get_defenders(self, obj):
        cards = obj.player_cards.filter(position='defenders')
        return [card.image.url for card in cards]

    def get_midfielders(self, obj):
        cards = obj.player_cards.filter(position='midfielders')
        return [card.image.url for card in cards]

    def get_forwards(self, obj):
        cards = obj.player_cards.filter(position='forwards')
        return [card.image.url for card in cards]

class WhatsAppLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsAppLink
        fields = ['id', 'link', 'is_active']