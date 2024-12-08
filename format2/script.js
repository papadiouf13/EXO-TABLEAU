// script.js

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

// Modal Handling Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Manage Category Modal
document.getElementById("selectCategoryBtn").onclick = function() {
    openModal("categoryModal");
};

document.getElementById("addCategoryBtn").onclick = function() {
    const newCategory = document.getElementById("newCategoryLibelle").value.trim();
    if (newCategory !== "") {
        addCategoryToTable(newCategory);
        document.getElementById("newCategoryLibelle").value = "";
    }
};

function addCategoryToTable(category) {
    const categoryTable = document.getElementById("categoryTable").getElementsByTagName("tbody")[0];
    const newRow = categoryTable.insertRow();
    newRow.innerHTML = `
        <td>${category}</td>
        <td><button class="selectCategoryBtn">Sélectionner</button></td>
    `;
    newRow.querySelector(".selectCategoryBtn").onclick = function() {
        document.getElementById("categorieInput").value = category;
        closeModal("categoryModal");
    };
}

// Manage Fournisseur Modal
document.getElementById("selectFournisseurBtn").onclick = function() {
    openModal("fournisseurModal");
};

document.getElementById("addFournisseurBtn").onclick = function() {
    const newFournisseur = document.getElementById("newFournisseurLibelle").value.trim();
    if (newFournisseur !== "") {
        addFournisseurToTable(newFournisseur);
        document.getElementById("newFournisseurLibelle").value = "";
    }
};

function addFournisseurToTable(fournisseur) {
    const fournisseurTable = document.getElementById("fournisseurTable").getElementsByTagName("tbody")[0];
    const newRow = fournisseurTable.insertRow();
    newRow.innerHTML = `
        <td>${fournisseur}</td>
        <td><button class="selectFournisseurBtn">Sélectionner</button></td>
    `;
    newRow.querySelector(".selectFournisseurBtn").onclick = function() {
        document.getElementById("fournisseurInput").value = fournisseur;
        closeModal("fournisseurModal");
    };
}

// Manage Unite Modal
document.getElementById("selectUniteBtn").onclick = function() {
    openModal("uniteModal");
};

document.getElementById("addUniteBtn").onclick = function() {
    const newUnite = document.getElementById("newUniteLibelle").value.trim();
    if (newUnite !== "") {
        addUniteToTable(newUnite);
        document.getElementById("newUniteLibelle").value = "";
    }
};

function addUniteToTable(unite) {
    const uniteTable = document.getElementById("uniteTable").getElementsByTagName("tbody")[0];
    const newRow = uniteTable.insertRow();
    newRow.innerHTML = `
        <td>${unite}</td>
        <td><button class="selectUniteBtn">Sélectionner</button></td>
    `;
    newRow.querySelector(".selectUniteBtn").onclick = function() {
        document.getElementById("uniteInput").value = unite;
        closeModal("uniteModal");
    };
}

// Closing Modals
document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.onclick = function() {
        closeModal(this.parentElement.parentElement.id);
    };
});

// Validation
document.getElementById("valider").onclick = function() {
    const libelle = document.getElementById("libelle").value;
    const categorie = document.getElementById("categorieInput").value;
    const quantite = document.getElementById("quantite").value;
    const unite = document.getElementById("uniteInput").value;
    const prix = document.getElementById("prix").value;
    const fournisseur = document.getElementById("fournisseurInput").value;
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
