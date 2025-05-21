frm = document.querySelector("form");
listUsers = document.querySelector("#list-users-table");
btnAdd = document.querySelector("#add-user");
btnUpdate = document.querySelector("#update-user");

frm.classList.add("hide");

const users = [
	{id: 0, nom: "Modou Khoulé", profil: "Admin"},
]

getAllUsers();

// FUNCTIONS
function getAllUsers() {
	users.forEach(element => {
		document.querySelector("tbody").innerHTML +=
		`
			<tr>
				<td scope="row"><b>${element.id + 1}</b></td>
				<td>${element.nom}</td>
				<td>${element.profil}</td>
				<td>
					<button class="btnDelete" onclick="deleteUser(${element.id})"><i class="fa-solid fa-trash"></i></button>
					<button class="btnUpdate" onclick="showFrmUpdateUser(${element.id});"><i class="fa-solid fa-pen-to-square"></i></button>
				</td>
			</tr>
		`;
	});
}

// Displays (form/List) Users
function showFrmAddUser() {
	frm.classList.remove("hide");
	listUsers.classList.add("hide");
	btnUpdate.classList.add("hide");
	btnAdd.classList.remove("hide");
	emptyFrm();
}

function showListUsers() {
	frm.classList.add("hide");
	listUsers.classList.remove("hide");
}

// Add User
function addUser() {
	event.preventDefault();

	// empty user object
	newUser = {id: 0, nom: "", profil: ""};

	// id user upgrade
	id = users[users.length - 1].id + 1;

	// get attributes
	nom = document.getElementById('nom').value;
	profil = document.getElementById('profil').value;

	if (nom !== "" && profil !== "") {
		// update new user object
		newUser.id = id;
		newUser.nom = nom;
		newUser.profil = profil;

		// update users table
		const indexUser = users.findIndex(user => user.nom === newUser.nom);
		if (indexUser !== -1) showMessage(`Erreur d'ajout. Impossible d'ajouter deux (2) utilisateurs de même nom !`);
		else {
			users.push(newUser);
			document.querySelector("tbody").innerHTML = "";
			getAllUsers();
			showMessage(`L'utilisateur ${newUser.nom} a été ajouté avec succès !`, "success");
			showListUsers();
			emptyFrm();
		}
	} else showMessage(`Erreur d'ajout. Le nom et le profil sont obligatoires!`);
}

// Update User
userUpdating = {};
function showFrmUpdateUser(idUser) {
	btnAdd.classList.add("hide");
	btnUpdate.classList.remove("hide");
	frm.classList.remove("hide");
	listUsers.classList.add("hide");

	userObject = {};
	stopLoop = true;

	// get user in the table
	if (stopLoop) {
		users.forEach(element => {
			if (element.id === idUser) {
				userObject = element;
				userUpdating = element;
				stopLoop = false;
			}
		});
	}
	document.getElementById("nom").value = userObject.nom;
	document.getElementById("profil").value = userObject.profil;
}
function updateUser() {
	event.preventDefault();

	nom = document.getElementById('nom').value;
	profil = document.getElementById('profil').value;
	
	if (nom !== "" && profil !== "") {
		// get user position in the table
		const userPosition = users.findIndex(user => user.id === userUpdating.id);
		users[userPosition].nom = nom; 
		users[userPosition].profil = profil; 

		document.querySelector("tbody").innerHTML = "";
		getAllUsers();
		showMessage(`L'utilisateur ${newUser.nom} a été modifié avec succès !`, "success");
		showListUsers();
		emptyFrm();
	} else showMessage(`Erreur d'ajout. Le nom et le profil sont obligatoires!`);
}

// Remove User
function deleteUser(idUser) {
	userObject = {};
	stopLoop = true;

	// get user in the table
	if (stopLoop) {
		users.forEach(element => {
			if (element.id === idUser) {
				userObject = element;
				stopLoop = false;
			}
		});
	}

	// get user position in the table
	const userPosition = users.findIndex(user => user.id === userObject.id);
	if (userPosition !== 0) {
		users.splice(userPosition, 1);
		document.querySelector("tbody").innerHTML = "";
		getAllUsers();
	} else showMessage(`Erreur d'ajout. Impossible de supprimer le premier utilisateur !`);
}

function emptyFrm() {
	document.getElementById("nom").value = "";
	document.getElementById("profil").value = "Etudiant";
}
function showMessage(message, type = "danger") {
	if (!type || type === "danger") {
		document.getElementById("message").innerHTML = message;
		document.getElementById("message").classList.add("alert", "alert-danger");
	} else if (type === "success") {
		document.getElementById("message").innerHTML = message;
		if (document.getElementById("message").classList.contains("alert-danger")) document.getElementById("message").classList.remove("alert-danger");
		document.getElementById("message").classList.add("alert", "alert-success");
	}
}