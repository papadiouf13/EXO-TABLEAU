document.getElementById("addCategoryBtn").onclick = function() {
    document.getElementById("categoryModal").style.display = "block";
};

document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById("categoryModal").style.display = "none";
};

document.getElementById("saveCategoryBtn").onclick = function() {
    const newCategory = document.getElementById("newCategoryLibelle").value.trim();
    if (newCategory !== "") {
        const categorieSelect = document.getElementById("categorie");
        const option = document.createElement("option");
        option.value = newCategory;
        option.text = newCategory;
        categorieSelect.add(option);
        document.getElementById("categoryModal").style.display = "none";
        document.getElementById("newCategoryLibelle").value = "";
    }
};

document.getElementById("valider").onclick = function() {
    const libelle = document.getElementById("libelle").value;
    const categorie = document.getElementById("categorie").value;
    const quantite = document.getElementById("quantite").value;
    const unite = document.getElementById("unite").value;
    const prix = document.getElementById("prix").value;
    const fournisseur = document.getElementById("fournisseur").value;
    const imageFile = document.getElementById("image").files[0];
    
    if (libelle && categorie && quantite && prix && fournisseur && imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;

            const table = document.getElementById("produitTable").getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td>${libelle}</td>
                <td>${categorie}</td>
                <td>${quantite}</td>
                <td>${prix}</td>
                <td>${fournisseur}</td>
                <td>${unite}</td>
                <td><img src="${imageUrl}" alt="Produit Image" width="50"></td>
                <td><button class="deleteBtn">Supprimer</button></td>
            `;

            const deleteBtn = newRow.querySelector(".deleteBtn");
            deleteBtn.onclick = function() {
                table.deleteRow(newRow.rowIndex - 1);
            };
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert("Veuillez remplir tous les champs");
    }
};
