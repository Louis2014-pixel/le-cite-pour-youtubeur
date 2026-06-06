# Le Cité pour YouTubeur 🎬

Une plateforme web simple et personnalisable pour les YouTubeurs, permettant de partager des conseils, des vidéos et des ressources pour progresser dans la création de contenu.

## Fonctionnalités

✅ **Système d'authentification** - Créez un compte ou connectez-vous  
✅ **Système de sections** - Organisez votre contenu en différentes catégories  
✅ **Intégration vidéo** - Intégrez des vidéos YouTube ou MP4  
✅ **Mode propriétaire** - Modifiez le contenu du site en temps réel  
✅ **Cartes personnalisées** - Ajoutez des notes et des idées  
✅ **Sauvegarde personnelle** - Chaque utilisateur a son propre espace  
✅ **Design responsive** - Fonctionne sur tous les appareils  

## Structure du projet

```
├── index.html      # Page principale
├── admin.html      # Page d'administration
├── app.js          # Logique principale de l'application
├── admin.js        # Logique du panneau administrateur
├── config.js       # Configuration de l'application
├── styles.css      # Feuilles de style
└── favicon.svg     # Icône du site
```

## Installation

1. Clonez le repository
```bash
git clone https://github.com/Louis2014-pixel/le-cite-pour-youtubeur.git
```

2. Ouvrez `index.html` dans votre navigateur

## Utilisation

### Connexion
- Créez un compte avec un identifiant, un email et un mot de passe
- Connectez-vous avec vos identifiants

### Mode propriétaire
- Cliquez sur "Modifier" pour accéder au mode d'édition
- Entrez le mot de passe propriétaire : `@CraftStudio456`
- Modifiez le titre, la couleur, les sections et le contenu

### Gestion du contenu
- Éditez les sections (vidéos, textes, etc.)
- Ajoutez des cartes personnalisées
- Enregistrez vos modifications

## Configuration

Modifiez le fichier `config.js` pour personnaliser :
- Le titre du site
- Les sections disponibles
- Les cartes par défaut
- La couleur principale
- Le mot de passe propriétaire

## Stockage des données

L'application utilise **localStorage** pour stocker :
- Les comptes utilisateurs
- Les préférences de chaque utilisateur
- Le contenu personnalisé

## Auteur

**Louis Magron** - louis.magron.1214@outlook.fr

## Licence

Ce projet est personnel et n'est pas ouvert aux contributions externes.
