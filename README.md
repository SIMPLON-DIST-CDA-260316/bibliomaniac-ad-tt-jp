# 📚 Bibliomaniac

<div align="center">

**Application de découverte de livres et de gestion de bibliothèque personnelle**

[![Déployé sur Vercel](https://img.shields.io/badge/Déployé%20sur-Vercel-black?logo=vercel)](https://bibliomaniac-ad-tt-jp.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

🔗 **[Voir l'application en ligne](https://bibliomaniac-ad-tt-jp.vercel.app/)**

</div>

---

## 📖 Présentation

**Bibliomaniac** est une application web mobile-first permettant de découvrir des livres par catégorie, d'effectuer des recherches, de consulter les détails d'un ouvrage et de gérer sa bibliothèque personnelle. Les données proviennent de l'API publique [OpenLibrary](https://openlibrary.org).

### Fonctionnalités principales

- 🏠 **Accueil** — Navigation par genres (10 catégories) avec barre de recherche intégrée
- 🔍 **Recherche** — Recherche full-text paginée sur titres, auteurs et mots-clés
- 📂 **Catalogue par catégorie** — Liste paginée avec tri par titre, date de publication ou note
- 📄 **Détail d'un livre** — Couverture, métadonnées, description, avis, suggestions et système de réservation
- 🗂️ **Ma bibliothèque** — Gestion personnelle avec 4 statuts (En cours, Empruntés, Liste de souhaits, Terminés), persistée en localStorage

---

## 🛠️ Stack technique

| Catégorie             | Technologie          | Version  |
| --------------------- | -------------------- | -------- |
| Framework UI          | React                | 19.2.4   |
| Langage               | TypeScript           | ~6.0.2   |
| Routing               | React Router         | 7.14.1   |
| Data Fetching / Cache | TanStack React Query | 5.100.10 |
| Styling               | Tailwind CSS         | 4.2.2    |
| Icônes                | Lucide React         | 1.8.0    |
| Build                 | Vite                 | 8.0.4    |
| Lint                  | ESLint               | 9.39.4   |
| API de données        | OpenLibrary API      | —        |

---

## 🗂️ Architecture du projet

Le projet suit une architecture **Feature-Based** inspirée de la Clean Architecture, avec une séparation claire des responsabilités.

```
src/
├── app/                        # Composant racine, providers (QueryClient, ReservationContext)
│   └── App.tsx
├── pages/                      # Assemblage des pages
│   ├── Homepage.tsx
│   ├── BookListPage.tsx
│   ├── BookDetails.tsx
│   ├── SearchPage.tsx
│   └── LibraryPage.tsx
├── entities/                   # Logique métier et accès aux données
│   └── book/
│       ├── api/                # Appels OpenLibrary, queryKeys
│       ├── lib/                # Mappers, utilitaires de formatage
│       └── model/              # Types TypeScript
├── features/                   # Modules fonctionnels
│   ├── book/                   # Liste de livres (BookCard, BookList, useBooks)
│   ├── bookDetails/            # Détail livre (HeroSection, ReserveSection, Reviews...)
│   └── reservation/            # Contexte et types pour les réservations
└── shared/                     # Code réutilisable transverse
    ├── api/                    # Client HTTP centralisé
    ├── lib/hooks/              # useDebounce
    └── ui/                     # Composants UI génériques (Button, Pagination, Modal...)
```

### Routes de l'application

| Route                 | Page                           |
| --------------------- | ------------------------------ |
| `/`                   | Accueil                        |
| `/category/:category` | Catalogue par catégorie        |
| `/books/:id`          | Détail d'un livre              |
| `/search`             | Résultats de recherche (`?q=`) |
| `/library`            | Ma bibliothèque                |

---

## 🔌 API externe

L'application consomme l'[API OpenLibrary](https://openlibrary.org/dev/docs/api) :

- **Recherche** : `GET https://openlibrary.org/search.json`
- **Couvertures** : `https://covers.openlibrary.org/b/id/{cover_id}-M.jpg`
- Langues supportées pour la recherche : Français, Anglais, Espagnol, Allemand, Italien, Portugais

---

## ⚙️ Installation et lancement

### Prérequis

- [Node.js](https://nodejs.org/) ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/SIMPLON-DIST-CDA-260316/bibliomaniac-ad-tt-jp.git
cd bibliomaniac-ad-tt-jp

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.sample .env
```

### Variables d'environnement

Créer un fichier `.env` à la racine (voir `.env.sample`) :

```env
VITE_GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1
VITE_OPEN_LIBRARY_API_URL=https://openlibrary.org
VITE_OPEN_LIBRARY_COVERS_URL=https://covers.openlibrary.org
```

### Scripts disponibles

| Commande          | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Lance le serveur de développement avec HMR   |
| `npm run build`   | Compile le projet pour la production         |
| `npm run preview` | Prévisualise le build de production en local |
| `npm run lint`    | Analyse statique du code avec ESLint         |

---

## 🚀 Déploiement

L'application est hébergée sur **Vercel** avec déploiement continu depuis la branche `main`.

🔗 [https://bibliomaniac-ad-tt-jp.vercel.app/](https://bibliomaniac-ad-tt-jp.vercel.app/)

---

## 👥 Contributeurs

Anaïs D, Thélio T, Jordan P

---

## 📝 Licence

Ce projet est réalisé dans le cadre d'une formation CDA (Concepteur Développeur d'Applications) — [SIMPLON](https://simplon.co).
