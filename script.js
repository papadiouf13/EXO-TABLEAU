function afficherSapin(N) {
    let resultat = "";
    for (let i = 1; i <= N; i++) {
        // Ajouter des espaces pour centrer les étoiles
        let espaces = " ".repeat(N - i);
        // Ajouter les étoiles
        let etoiles = "*".repeat(2 * i - 1);
        // Construire la ligne
        resultat += espaces + etoiles + "\n";
    }
    return resultat;
}

const lignes = parseInt(prompt("Entrez le nombre de lignes pour le sapin d'étoiles :"));
console.log(afficherSapin(lignes));