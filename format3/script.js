// script.js

// Tableau des catégories, fournisseurs et unités
let categories = [
    { id: 1, name: "Tissu" },
    { id: 2, name: "Accessoire" }
];

let fournisseurs = [
    { id: 1, name: "Mamadou Diouf" },
    { id: 2, name: "Seydou Ba" }
];

let unites = [
    { id: 1, name: "mètre" },
    { id: 2, name: "kilogramme" }
];

// Pour gérer l'image par défaut et permettre de la remplacer par une image choisie
const imageInput = document.getElementById("image");
const previewImage = document.getElementById("previewImage");

previewImage.onclick = function() {
    imageInput.click(); // Ouvre la boîte de dialogue de sélection de fichier
};

imageInput.onchange = function() {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result; // Remplace l'image par l'image sélectionnée
        };
        reader.readAsDataURL(file);
    }
};

// Fonctions pour remplir les sélecteurs
function populateSelect(selectElement, items) {
    selectElement.innerHTML = ""; // Clear existing options
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.name;
        option.textContent = item.name;
        selectElement.appendChild(option);
    });
}

function initializeSelects() {
    const categorieSelect = document.getElementById("categorieSelect");
    const fournisseurSelect = document.getElementById("fournisseurSelect");
    const uniteSelect = document.getElementById("uniteSelect");

    populateSelect(categorieSelect, categories);
    populateSelect(fournisseurSelect, fournisseurs);
    populateSelect(uniteSelect, unites);
}

initializeSelects();

// Gestion des modals
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Ajouter de nouvelles options via modals
document.getElementById("addCategoryBtn").onclick = function() {
    openModal("categoryModal");
};

document.getElementById("addFournisseurBtn").onclick = function() {
    openModal("fournisseurModal");
};

document.getElementById("addUniteBtn").onclick = function() {
    openModal("uniteModal");
};

// Sauvegarder les nouvelles catégories
document.getElementById("saveCategoryBtn").onclick = function() {
    const newCategory = document.getElementById("newCategoryLibelle").value.trim();
    if (newCategory) {
        categories.push({ id: categories.length + 1, name: newCategory });
        initializeSelects();
        closeModal("categoryModal");
    }
};

// Sauvegarder les nouveaux fournisseurs
document.getElementById("saveFournisseurBtn").onclick = function() {
    const newFournisseur = document.getElementById("newFournisseurLibelle").value.trim();
    if (newFournisseur) {
        fournisseurs.push({ id: fournisseurs.length + 1, name: newFournisseur });
        initializeSelects();
        closeModal("fournisseurModal");
    }
};

// Sauvegarder les nouvelles unités
document.getElementById("saveUniteBtn").onclick = function() {
    const newUnite = document.getElementById("newUniteLibelle").value.trim();
    if (newUnite) {
        unites.push({ id: unites.length + 1, name: newUnite });
        initializeSelects();
        closeModal("uniteModal");
    }
};

// Fermer les modals
document.getElementById("closeCategoryModal").onclick = function() {
    closeModal("categoryModal");
};
document.getElementById("closeFournisseurModal").onclick = function() {
    closeModal("fournisseurModal");
};
document.getElementById("closeUniteModal").onclick = function() {
    closeModal("uniteModal");
};

// Annuler et fermer les modals
document.getElementById("cancelCategoryBtn").onclick = function() {
    closeModal("categoryModal");
};
document.getElementById("cancelFournisseurBtn").onclick = function() {
    closeModal("fournisseurModal");
};
document.getElementById("cancelUniteBtn").onclick = function() {
    closeModal("uniteModal");
};

// Validation et ajout des produits dans le tableau
document.getElementById("valider").onclick = function() {
    const libelle = document.getElementById("libelle").value;
    const categorie = document.getElementById("categorieSelect").value;
    const quantite = document.getElementById("quantite").value;
    const unite = document.getElementById("uniteSelect").value;
    const prix = document.getElementById("prix").value;
    const fournisseur = document.getElementById("fournisseurSelect").value;
    const imageSrc = previewImage.src;

    if (libelle && categorie && quantite && prix && fournisseur && imageSrc) {
        const table = document.getElementById("produitTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${libelle}</td>
            <td>${categorie}</td>
            <td>${quantite}</td>
            <td>${prix}</td>
            <td>${fournisseur}</td>
            <td>${unite}</td>
            <td><img src="${imageSrc}" alt="Produit Image" width="50"></td>
            <td><button class="deleteBtn">Supprimer</button></td>
        `;

        const deleteBtn = newRow.querySelector(".deleteBtn");
        deleteBtn.onclick = function() {
            table.deleteRow(newRow.rowIndex - 1);
        };
    } else {
        alert("Veuillez remplir tous les champs");
    }
};
