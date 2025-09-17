# Bergomi Store - Gaming Accounts Gallery

Un site web moderne pour afficher et vendre des comptes de jeux avec une interface d'administration cachée.

## 🚀 Fonctionnalités

- **Frontend React/Next.js** avec design moderne et responsive
- **Backend Django** avec API REST
- **Interface d'administration cachée** accessible uniquement par lien sécurisé
- **Gestion des comptes** avec images multiples et descriptions
- **Catégories de joueurs** (Managers, Defenders, Midfielders, Forwards)
- **Intégration WhatsApp** pour les achats
- **Design inspiré des cartes FIFA**

## 📋 Prérequis

- Node.js 18+ 
- Python 3.8+
- PostgreSQL
- Git

## 🛠️ Installation

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd bergomi-store
```

### 2. Configuration du Backend (Django)

```bash
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer la base de données
cp .env.example .env
# Éditer .env avec vos paramètres de base de données

# Migrations
python manage.py makemigrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Lancer le serveur
python manage.py runserver
```

### 3. Configuration du Frontend (React/Next.js)

```bash
# Dans un nouveau terminal, depuis la racine du projet
npm install

# Lancer le serveur de développement
npm run dev
```

## 🔧 Configuration

### Variables d'environnement Backend (.env)
```
SECRET_KEY=votre-clé-secrète-django
DEBUG=True
DB_NAME=bergomi_store
DB_USER=postgres
DB_PASSWORD=votre-mot-de-passe
DB_HOST=localhost
DB_PORT=5432
```

### URLs importantes
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin Django**: http://localhost:8000/admin/
- **Admin Interface**: http://localhost:3000/admin/[token]

## 📱 Utilisation

### Pour l'Administrateur

1. **Accéder à l'interface d'administration**:
   - Aller sur Django Admin: http://localhost:8000/admin/
   - Créer un token d'accès dans la table `AdminAccess`
   - Utiliser le lien: http://localhost:3000/admin/[votre-token]

2. **Ajouter un compte**:
   - Nom du compte
   - Prix
   - Description
   - 3 images (défaut, survol, détail)
   - Cartes de joueurs par catégorie

3. **Configurer WhatsApp**:
   - Ajouter le lien d'invitation du groupe WhatsApp
   - Le bouton "Buy Right Now" redirigera automatiquement

### Pour les Visiteurs

1. **Navigation**:
   - Page d'accueil avec vidéo de fond
   - Galerie des comptes disponibles
   - Effet de survol sur les cartes

2. **Détails d'un compte**:
   - Cliquer sur "Check Now"
   - Voir la grande image et description
   - Explorer les catégories de joueurs
   - Acheter via WhatsApp

## 🎨 Personnalisation

### Changer le logo
Remplacer le fichier `public/logo.png`

### Modifier les couleurs
Éditer `tailwind.config.js` et les classes CSS

### Ajouter des catégories
Modifier `POSITION_CHOICES` dans `backend/accounts/models.py`

## 🚀 Déploiement sur Render

### Backend Django

1. **Créer un nouveau Web Service sur Render**
2. **Connecter votre repository GitHub**
3. **Configuration**:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && gunicorn bergomi_store.wsgi:application`
   - Environment Variables:
     ```
     SECRET_KEY=votre-clé-production
     DEBUG=False
     DB_NAME=votre-db-render
     DB_USER=votre-user-render
     DB_PASSWORD=votre-password-render
     DB_HOST=votre-host-render
     DB_PORT=5432
     ```

### Frontend Next.js

1. **Créer un nouveau Static Site sur Render**
2. **Configuration**:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `out`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://votre-backend.onrender.com/api
     ```

### Base de données PostgreSQL

1. **Créer une base PostgreSQL sur Render**
2. **Copier les informations de connexion**
3. **Mettre à jour les variables d'environnement**

## 📊 Structure du Projet

```
bergomi-store/
├── app/                    # Pages Next.js
│   ├── account/[id]/      # Page détail compte
│   ├── admin/[token]/     # Interface admin
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── account-card.tsx   # Carte de compte
│   ├── auto-slider-banner.tsx
│   └── ui/               # Composants UI
├── backend/              # Application Django
│   ├── accounts/         # App comptes
│   ├── bergomi_store/    # Configuration Django
│   └── requirements.txt
└── public/              # Assets statiques
```

## 🔒 Sécurité

- Interface d'administration accessible uniquement par token
- CORS configuré pour les domaines autorisés
- Variables d'environnement pour les données sensibles
- Validation des données côté backend

## 🐛 Dépannage

### Erreurs communes

1. **CORS Error**: Vérifier `CORS_ALLOWED_ORIGINS` dans settings.py
2. **Database Error**: Vérifier les paramètres de connexion PostgreSQL
3. **Images non affichées**: Vérifier `MEDIA_URL` et `MEDIA_ROOT`
4. **Admin non accessible**: Vérifier le token dans la base de données

### Logs utiles

```bash
# Backend Django
python manage.py runserver --verbosity=2

# Frontend Next.js
npm run dev

# Base de données
python manage.py dbshell
```

## 📞 Support

Pour toute question ou problème:
1. Vérifier les logs d'erreur
2. Consulter la documentation Django/Next.js
3. Vérifier la configuration des variables d'environnement

## 🔄 Mises à jour

Pour mettre à jour le site:
1. Modifier le code localement
2. Tester en développement
3. Commit et push vers GitHub
4. Render redéploiera automatiquement

---

**Note**: Ce README couvre l'installation et l'utilisation complète du système Bergomi Store. Suivez les étapes dans l'ordre pour une installation réussie.