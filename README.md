# Compteur Décompte

Application simple en HTML/CSS/JS.

## Objectif
- Un compteur principal démarre à `100`.
- Chaque clic sur le bouton diminue ce compteur (`100`, `99`, `98`, ...).
- Quand le compteur principal arrive à `0` puis qu'on clique encore, il revient à `100`.
- À chaque retour à `100`, le deuxième compteur augmente de `1`.
- Un bouton `Reset` demande une confirmation et remet les deux compteurs à leurs valeurs initiales (`100` et `0`).

## Fichiers
- `index.html` : structure de la page.
- `styles.css` : styles visuels.
- `script.js` : logique du compteur.

## Utilisation
1. Ouvrez le dossier `C:\Users\DELL\Documents\03_AppsSitesWeb\00CompteurSimple` dans VS Code.
2. Ouvrez `index.html`.
3. Utilisez l'extension Live Server ou ouvrez le fichier dans un navigateur.
4. Cliquez sur `Cliquer pour décrémenter` pour faire défiler le compteur.
5. Cliquez sur `Réinitialiser les deux compteurs` pour remettre le compteur principal à `100` et le compteur de cycles à `0`.

## Notes
- Le script JavaScript met à jour l'affichage à chaque clic.
- Le compteur principal reste visible et redémarre automatiquement à `100`.
