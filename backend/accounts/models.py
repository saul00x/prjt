from django.db import models

class Account(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    image1 = models.ImageField(upload_to='accounts/images/')
    image2 = models.ImageField(upload_to='accounts/images/')
    detail_image = models.ImageField(upload_to='accounts/detail_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']

class PlayerCard(models.Model):
    POSITION_CHOICES = [
        ('managers', 'Managers'),
        ('defenders', 'Defenders'),
        ('midfielders', 'Midfielders'),
        ('forwards', 'Forwards'),
    ]
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='player_cards')
    position = models.CharField(max_length=20, choices=POSITION_CHOICES)
    image = models.ImageField(upload_to='player_cards/')
    rating = models.IntegerField(default=80)
    player_name = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"{self.account.name} - {self.position} - {self.player_name}"

class WhatsAppLink(models.Model):
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"WhatsApp Link - {self.link}"
    
    class Meta:
        ordering = ['-created_at']

class AdminAccess(models.Model):
    access_token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Admin Access - {self.access_token}"