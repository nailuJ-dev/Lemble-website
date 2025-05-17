# Horizon Patrimoine
## Wireframe & Structure du site proposé

Ce document présente la structure du site one-page premium proposé pour LEMBLE & Co, une société de gestion de fortune opérant en Bretagne, à Paris et à La Réunion.

## 1. Architecture globale
```
├── Section Hero
├── Section Services
├── Section À propos
│   ├── Profil gestionnaire
│   ├── Philosophie
│   ├── Implantations
│   └── Témoignages
├── Section FAQ
├── Section Tarifs
│   ├── Calculatrice (option en fonction de la difficulté)
│   └── Formules tarifaires
└── Section Contact
```

## 2. Maquette wireframe

### Header & Navigation
![Header]

- Design fixe avec effet de transparence au scroll
- Logo avec point doré (symbolisant l'expertise/précision)
- Navigation: Accueil, Services, À propos, FAQ, Tarifs, Contact
- Adaptation mobile avec menu hamburger

### Section Hero
![Hero Section]

- Composition asymétrique avec texte à gauche, visuel à droite
- Formes organiques évoquant l'océan en arrière-plan
- Statistiques flottantes: "15+ années d'expérience", "500+ clients satisfaits"
- Double CTA: "Découvrir nos services" et "Prendre rendez-vous"
- Indicateur de défilement animé au bas de la section

### Section Services
![Services Section]

- 4 cartes pivotantes avec effet 3D au survol:
  - Gestion de Portefeuille
  - Planification Fiscale
  - Gestion de Patrimoine
  - Conseil en Investissement
- Recto: icône, titre, description courte
- Verso: liste détaillée des services et CTA

### Section À propos
![About Section]

- Présentation de la gestionnaire avec photo professionnelle
- Certifications affichées avec icônes
- Philosophie d'investissement en 3 points
- Carte de France stylisée avec points d'implantation interactifs
- Slider de témoignages clients avec citation et photo

### Section FAQ
![FAQ Section]

- Layout asymétrique avec image à gauche, questions à droite
- Système d'accordéon pour les questions/réponses
- Option "voir plus" pour afficher des questions supplémentaires
- Focus sur l'expertise grâce à des questions techniques

### Section Tarifs
![Pricing Section]

- Calculatrice d'investissement interactive avec visualisation graphique
- 3 formules de prix présentées en parallèle
- Mise en avant de l'offre "Premium" avec badge "Recommandé"
- Liste claire des fonctionnalités incluses/non-incluses
- Design épuré avec contraste élevé pour faciliter la comparaison

### Section Contact
![Contact Section]

- Disposition en deux colonnes: coordonnées et formulaire
- Carte de coordonnées sur fond bleu profond avec icônes dorées
- Formulaire complet avec validation en temps réel
- Intégration EmailJS pour l'envoi direct des messages
- Protection anti-spam par honeypot invisible

### Footer
![Footer]

- Structure en grille avec logo et résumé de la mission
- Liens rapides vers les sections
- Liens légaux (mentions légales, politique de confidentialité)
- Numéros d'enregistrement professionnel (ORIAS, etc.)

## 3. Fonctionnalités distinctives

### Expérience utilisateur premium
- Animation de chargement avec effet d'eau
- Curseur personnalisé changeant au survol des éléments interactifs
- Animations au défilement fluides et élégantes
- Transitions entre sections avec timing optimisé

### Éléments interactifs
- Cartes de service avec effet 3D au survol
- Calculatrice d'investissement avec mise à jour visuelle instantanée
- Carte de France interactive montrant les implantations
- Formulaire de contact avec validation en temps réel
- Bouton flottant "Prendre RDV" avec effet de pulsation

### Design distinctif
- Thématique océan cohérente (vagues, bleus, fluidité)
- Accents dorés symbolisant l'expertise et la valeur
- Typographie premium (DM Serif Display + Montserrat)
- Formes organiques et asymétriques
- Espacements généreux créant une sensation d'élégance

## 4. Aspects techniques

### Performance & optimisation
- Lazy loading des images et sections
- Animation CSS optimisée pour les performances
- Structure HTML sémantique pour le SEO
- Compatibilité mobile complète (responsive design)

### Sécurité
- Protection du formulaire par honeypot
- Stockage sécurisé des clés API dans un fichier distinct
- Validation côté client pour limiter les requêtes malveillantes
- Politique de confidentialité complète et RGPD

### Accessibilité
- Contraste élevé entre texte et fond
- Navigation au clavier optimisée
- Attributs ARIA pour les éléments interactifs
- Structure sémantique respectant les standards web

## 5. Mises à jour futures possibles

- Connexion à un CMS headless pour faciliter les mises à jour
- Version multilingue (français/anglais)
- Blog intégré pour le content marketing
- Espace client sécurisé
- Système de prise de rendez-vous en ligne