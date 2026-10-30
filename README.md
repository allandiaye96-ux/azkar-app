# Azkar — invocations et compteur

Application web (HTML/CSS/JS, sans dépendance) pour réciter les azkar de la Sunna avec un compteur intégré à chaque invocation.

## Contenu

195 azkar répartis en 15 catégories :

| Catégorie | Azkar |
|---|---|
| Matin et soir (bascule Matin / Soir, texte du soir affiché quand il diffère) | 24 |
| Après la prière | 13 |
| Coucher et nuit | 17 |
| Réveil | 4 |
| Toilettes et ablutions | 6 |
| Maison et vêtements | 8 |
| Mosquée et appel à la prière | 6 |
| Pendant la prière | 25 |
| Dhikr et istighfar | 10 |
| Épreuves, angoisse et protection | 21 |
| Repas et jeûne | 10 |
| Voyage et déplacements | 10 |
| Vie quotidienne et relations | 18 |
| Pluie, vent et lune | 10 |
| Malades et défunts | 13 |

Chaque azkar contient : le texte arabe vocalisé, une translittération, une traduction française du sens, le nombre de répétitions, le mérite rapporté quand la source en mentionne un, et ses références.

## Sources et vérification

- **Texte arabe et références** : *Hisn al-Muslim* (Sa'id ibn 'Ali ibn Wahf al-Qahtani), dans la numérotation de sunnah.com. Chaque azkar renvoie à sa page `sunnah.com/hisn:N` et liste les recueils cités par l'ouvrage (tome/page).
- **Texte coranique** (Ayat al-Kursi, Ikhlas/Falaq/Nas, fin d'Al-Baqara, fin d'Al 'Imran, Al-Hadid 57:3) : repris de l'édition Tanzil, verset par verset.
- **Contre-vérification** : le texte arabe a été comparé automatiquement à une seconde édition numérique de *Hisn al-Muslim*. Une erreur a été trouvée et corrigée (un « الله » en trop dans « Allahumma 'afini fi badani »). La sourate Al-Ikhlas de la première source omettait aussi un « وَ » : elle est désormais tirée de Tanzil.
- **Numéros de hadith vérifiés** (champ `verified`) : uniquement ceux confirmés dans au moins une base de hadiths en ligne (sunnah.com, dorar.net, hadeethenc.com, tohed.com, hadithunlocked.com…). Exemples : Muslim 591 et 597, Al-Bukhari 843, 2311, 3293, 5017, 6306, 6324, Muslim 2692, 2726, Abu Dawud 5082, 5067, Ibn Majah 3871.
- **Remarques de fiabilité** (champ `warn`, signalées « à lire » dans la liste) :
  - *Hasbiyallah* ×7 : rapporté par Abu Dawud (5081) comme parole du Compagnon Abu ad-Darda'. *Hisn al-Muslim* l'attribue au Prophète ﷺ, ce qui est contesté.
  - *Allahumma 'afini fi badani* (Abu Dawud 5090) : chaîne jugée hasan par Al-Albani et Ibn Baz, faible selon d'autres.
- **Traductions françaises** : traductions du sens rédigées pour l'application. Elles ne remplacent pas le texte arabe.

## Utilisation

1. Choisir une catégorie, puis un azkar dans la liste.
2. Toucher le cercle (ou appuyer sur Espace/Entrée) à chaque récitation. Une vibration signale la fin, et un nouveau toucher passe à l'azkar suivant.
3. « Annuler une » retire une récitation ; « Recommencer » remet l'azkar à zéro.
4. La progression est enregistrée dans le navigateur (localStorage) et repart à zéro chaque jour.

Raccourcis clavier : Espace/Entrée pour compter, ← → pour naviguer, Échap pour revenir à la liste. Les boutons ع− / ع+ règlent la taille du texte arabe, et la lune bascule le thème clair/sombre.

## Fichiers

- `index.html`, `styles.css`, `script.js` : interface.
- `azkar-data.js` : données (généré, ne pas éditer à la main).
- `manifest.webmanifest`, `icon.svg` : installation sur l'écran d'accueil.
- `tools/` : scripts Python de génération des données.
  - `entries*.py` : sélection, titres, traductions, compteurs, numéros vérifiés.
  - `build.py` : nettoyage du texte arabe, intégration du Coran (Tanzil), extraction des références.

  Ils attendent les jeux de données sources dans `/tmp/ref` : `4thel00z/hadith.json` (Hisn al-Muslim), `rn0x/Adhkar-json` et `risan/quran-json`.

## Lancer en local

Ouvrir `index.html` via un petit serveur (les modules JS ne se chargent pas en `file://`) :

```
python3 -m http.server 8000
```
