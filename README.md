# RoueStore — Site de vente en ligne

Site vitrine e-commerce statique (**HTML / CSS / JavaScript**, sans backend)
avec panier, filtres, recherche et mode sombre. Idéal comme base pour
une petite boutique en ligne.

## 🚀 Comment voir le site

Aucune installation nécessaire : ouvre simplement le fichier **`index.html`**
avec ton navigateur (double-clic dessus, ou clic droit → "Ouvrir avec...").

Structure du projet :

```
roue/
├── index.html        → la structure de toutes les pages/sections
├── css/
│   └── style.css     → les couleurs, polices, mise en page
├── js/
│   └── script.js      → les produits, le panier, les interactions
└── images/            → mets tes photos de produits ici
```

## 🛒 Fonctionnalités déjà incluses

- Catalogue de produits avec catégories, recherche et tri par prix/nom
- Fiche produit (vue rapide) au clic sur le nom d'un produit
- Panier latéral avec quantités, suppression, total, sauvegardé
  automatiquement (le panier reste rempli même si on ferme le navigateur)
- Simulation de commande (formulaire) — **aucun paiement réel**, c'est une démo
- Mode sombre / clair (bouton 🌙 en haut à droite)
- Menu mobile responsive (site adapté téléphone/tablette)
- Newsletter (formulaire de démo, n'envoie rien réellement)

## ✏️ Modifier les produits (le plus important)

Tout se passe dans **`js/script.js`**, tout en haut du fichier, dans le
tableau `PRODUCTS`. Chaque produit est un bloc comme celui-ci :

```js
{
  id: 1,
  name: "Jante Alu Sport 18\"",
  category: "jantes",          // jantes | pneus | accessoires | entretien
  price: 189.90,
  oldPrice: 219.90,             // prix barré, ou null si pas de promo
  rating: 4.8,                  // note sur 5
  badge: "Promo",               // "Promo", "Nouveau", ou null
  image: "",                    // ex: "images/jante1.jpg"
  emoji: "🛞",                  // affiché si pas d'image
  description: "..."            // texte affiché dans la vue rapide
}
```

### Pour changer un produit existant
Modifie simplement les valeurs (nom, prix, description...).

### Pour ajouter un nouveau produit
Copie un bloc `{ ... }` entier, colle-le à la fin de la liste (avant le `]`
final), et change au minimum le `id` (il doit être unique, donc prends
le prochain numéro libre) et les autres informations.

### Pour supprimer un produit
Supprime tout son bloc `{ ... },`.

## 🖼️ Ajouter des vraies photos

1. Mets tes images dans le dossier `images/` (ex: `images/jante1.jpg`).
   Formats conseillés : `.jpg`, `.png` ou `.webp`, poids léger si possible.
2. Dans `js/script.js`, sur le produit concerné, remplace :
   ```js
   image: "",
   ```
   par :
   ```js
   image: "images/jante1.jpg",
   ```
   Tant que `image` est vide (`""`), c'est l'emoji qui s'affiche à la place —
   pratique en attendant d'avoir de vraies photos.

Le logo et les images de la section "Accueil" sont pour l'instant des
emojis (🛞) directement dans `index.html` — tu peux les remplacer par une
balise `<img src="images/logo.png">` si tu as un logo.

## 🎨 Changer les couleurs

Tout en haut de **`css/style.css`**, dans le bloc `:root { ... }` :

```css
:root {
  --color-primary: #ff5722;   /* couleur principale (boutons, prix...) */
  --color-primary-dark: #e64a19;
  ...
}
```

Change juste le code couleur (ex: `#2563eb` pour du bleu) et toutes les
boutons/liens/prix changeront automatiquement partout sur le site.

## 📝 Changer les textes

Tous les textes (titres, descriptions, adresse, téléphone, réseaux sociaux...)
sont directement dans **`index.html`**. Ouvre le fichier avec un éditeur de
texte (ex: [VS Code](https://code.visualstudio.com/), gratuit) et cherche le
texte à modifier avec Ctrl+F, puis remplace-le.

Sections à personnaliser en priorité :
- `<title>` et `<meta name="description">` en haut du fichier (nom du site
  dans l'onglet du navigateur et sur Google)
- Section `hero` (le grand titre d'accueil)
- Section `apropos` (qui êtes-vous, vos avantages)
- Section `contact` / footer (adresse, téléphone, email, réseaux sociaux)

## 🌍 Mettre le site en ligne (gratuit)

Le plus simple pour un site comme celui-ci est **GitHub Pages** :

1. Pousse ce projet sur GitHub (déjà fait si tu lis ce fichier depuis le repo).
2. Sur GitHub : Settings → Pages → Source → choisis la branche `main` → Save.
3. Ton site sera accessible à une adresse du type
   `https://<ton-pseudo>.github.io/<nom-du-repo>/`.

Alternatives tout aussi simples : [Netlify](https://www.netlify.com) ou
[Vercel](https://vercel.com) — il suffit de glisser-déposer le dossier.

## ⚠️ Limites de cette démo

- Il n'y a **pas de vraie base de données** : les produits sont écrits en dur
  dans le fichier JavaScript.
- Il n'y a **pas de vrai paiement** (pas de Stripe/PayPal branché) : le
  formulaire de commande simule juste une confirmation.
- Pour une vraie boutique avec gestion des stocks, comptes clients et
  paiement réel, il faudra à terme ajouter un backend (ex: Shopify, WooCommerce,
  ou un développement sur-mesure) — mais ce site est déjà parfaitement
  fonctionnel comme vitrine ou pour démarrer.
