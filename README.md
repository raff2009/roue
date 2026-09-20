# Site vitrine — Un seul produit

Site vitrine e-commerce pour **un seul produit** : présentation, points
forts, "comment ça marche", avis clients, FAQ et formulaire de commande.
Tout est dans **un seul fichier** (`index.html`) — HTML, CSS et JavaScript
regroupés ensemble, pour que ça marche à coup sûr, peu importe comment tu
l'ouvres (double-clic, Live Server, hébergement en ligne...).

## 🚀 Comment voir le site

Double-clique simplement sur **`index.html`** — il s'ouvre dans ton
navigateur (Chrome, Edge, Firefox...) et fonctionne immédiatement, sans
rien installer.

```
roue/
├── index.html   → TOUT le site (structure + style + interactions)
└── images/       → mets tes vraies photos ici (optionnel)
```

## ✏️ Modifier le produit (le plus important)

Ouvre `index.html` avec un éditeur de texte (ex: [VS Code](https://code.visualstudio.com/),
gratuit) et cherche la balise `<script>` vers la fin du fichier. Tout en
haut de ce `<script>`, tu trouveras des blocs faciles à modifier :

### Le produit lui-même
```js
const PRODUCT = {
  name: "Nom Du Produit",
  tagline: "Une phrase courte qui explique le produit.",
  price: 49.90,
  oldPrice: 64.90,      // prix barré, mets `null` si pas de promo
  reviewCount: 128,
  image: "",             // ex: "images/produit.jpg"
  emoji: "📦"            // affiché tant qu'il n'y a pas d'image
};
```
Change simplement les valeurs. Tant que `image` est vide (`""`), c'est
l'emoji qui s'affiche à la place de la photo.

### Les points forts (section "Pourquoi ce produit")
```js
const FEATURES = [
  { icon: "⚡", title: "Rapide", text: "..." },
  ...
];
```
Ajoute, modifie ou supprime des blocs `{ ... }` dans ce tableau — autant
que tu veux.

### "Comment ça marche"
```js
const STEPS = [
  { title: "Tu commandes", text: "..." },
  ...
];
```

### Les avis clients
```js
const TESTIMONIALS = [
  { name: "Camille R.", initials: "CR", quote: "...", stars: 5 },
  ...
];
```

### La FAQ
```js
const FAQS = [
  { q: "Ma question ?", a: "Ma réponse." },
  ...
];
```

Pour chaque liste, il suffit de copier/coller un bloc `{ ... },` pour en
ajouter un nouveau, ou de le supprimer pour en retirer un.

## 🖼️ Ajouter une vraie photo du produit

1. Mets ta photo dans le dossier `images/` (ex: `images/produit.jpg`).
2. Dans le bloc `PRODUCT`, remplace :
   ```js
   image: "",
   ```
   par :
   ```js
   image: "images/produit.jpg",
   ```

## 🎨 Changer les couleurs

Tout en haut du fichier, dans la balise `<style>`, cherche ce bloc :

```css
:root {
  --color-primary: #0f766e;   /* couleur principale (boutons, prix) */
  --color-accent: #f4a340;    /* petite touche de couleur */
  ...
}
```

Change juste les codes couleur (ex: `#2563eb` pour du bleu) et tout le
site s'adapte automatiquement.

## 📝 Changer les textes fixes

Le titre du site, le nom dans le menu, l'adresse mail/téléphone du footer,
etc. sont écrits directement dans le HTML (la partie entre `<body>` et
`<script>`). Cherche le texte avec Ctrl+F dans ton éditeur et remplace-le.

## 🌍 Mettre le site en ligne (gratuit)

**GitHub Pages** (le plus simple si le projet est déjà sur GitHub) :
1. Sur la page du repo GitHub → **Settings** → **Pages**
2. Source : "Deploy from a branch", choisis ta branche et le dossier `/ (root)`
3. Sauvegarde — le site sera visible à une adresse du type
   `https://<pseudo>.github.io/<repo>/`

Alternatives tout aussi simples : [Netlify](https://www.netlify.com) ou
[Vercel](https://vercel.com) — glisse-dépose simplement le dossier.

## ⚠️ Limites de cette démo

- Pas de vraie base de données : le produit est écrit en dur dans le fichier.
- Pas de vrai paiement (pas de Stripe/PayPal branché) : le formulaire de
  commande simule juste une confirmation.
- Pour une vraie boutique avec paiement réel et gestion des stocks, il
  faudra un jour ajouter un vrai système derrière (Shopify, Stripe,
  développement sur-mesure...) — mais ce site est déjà parfaitement
  fonctionnel comme vitrine pour présenter et vendre un produit.
