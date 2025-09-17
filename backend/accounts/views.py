from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Account, WhatsAppLink
from .serializers import AccountSerializer, WhatsAppLinkSerializer

class AccountListView(generics.ListAPIView):
    queryset = Account.objects.filter(is_active=True)
    serializer_class = AccountSerializer

class AccountDetailView(generics.RetrieveAPIView):
    queryset = Account.objects.filter(is_active=True)
    serializer_class = AccountSerializer

@api_view(['GET'])
def whatsapp_link_view(request):
    try:
        link = WhatsAppLink.objects.filter(is_active=True).first()
        if link:
            return Response({'link': link.link})
        return Response({'link': 'https://wa.me/1234567890'})
    except:
        return Response({'link': 'https://wa.me/1234567890'})