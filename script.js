let equipes = [];
var idteam = 0;
let personnes = [];
var idp = 0;
function ajouterEquipe() {
  idteam++;
  // lecture des champs input 
  let nomTeam = document.querySelector('#equipeNom').value;
  document.querySelector('#equipeNom').value = ''; // on vide les champ input
  let equipe = {}; // je crée un objet
  equipe.id = idteam;
  equipe.nom = nomTeam;
  equipe.personne = [];
  equipes.push(equipe);
  console.log(equipes);

  afficherEquipe();
}

function ajouterPersonne() {
  idp++;
  let prenom = document.querySelector('#prenom').value;
  let nom = document.querySelector('#nom').value;
  document.querySelector('#prenom').value = ''; // on vide les champ input
  document.querySelector('#nom').value = ''; // on vide les champ input
  let equipeIndice = document.querySelector("#selectEquipe").value;
  document.querySelector("#selectEquipe").value = -1; // vider input
  let personne = {}; // je crée un objet
  personne.prenom = prenom;
  personne.nom = nom;
  personne.idp = idp;
  personnes.push(personne);
  console.log(personnes);
  if (equipeIndice != -1) {
    equipes[equipeIndice].personne.push(personne);
    afficherEquipe();
  }
  afficherPersonne();
}

function afficherEquipe() {
  let emplacementEquipe = document.querySelector("#emplacementEquipe");
  emplacementEquipe.innerHTML = ""; // je vide les equipes pour les recontruire

  let template = document.querySelector('#templateEquipe');
  let select = document.querySelector("#selectEquipe");
  select.innerHTML = ""; // je vide les equipes de <select> pour les recontruire

  let initOption = creaOption("Pas d'équipe", -1);
  select.appendChild(initOption);

  for (let i = 0; i < equipes.length; i++) {
    let option = creaOption(equipes[i].nom, i);
    select.appendChild(option);

    let clone = template.content.cloneNode(true);
    clone.querySelector('.titre').innerHTML = equipes[i].nom;

    let btnDelete = clone.querySelector('.btn-danger');
    btnDelete.onclick = function () {
      let i = btnDelete.parentElement.parentElement.rowIndex-1;
      equipes.splice(i, 1);
      afficherEquipe();
    }
    let tbody = clone.querySelector('.ligneTableau');
    let tempaleLigne = document.querySelector('#templateLigne');

    for (let p of equipes[i].personne) {
      console.log(p);
      let clone2 = tempaleLigne.content.cloneNode(true);
      clone2.querySelector('.prenom').textContent = p.prenom;
      clone2.querySelector('.nom').textContent = p.nom;
      
      let btnDel = clone2.querySelector('.btn-secondary');
      btnDel.onclick = function () {
        let j = btnDel.parentElement.parentElement.rowIndex-2;
        console.log(j);
        console.log(equipes[i].personne[j]);
        equipes[i].personne.splice(j, 1);
        personnes.splice(j, 1);
        this.parentElement.parentElement.remove();
        ajouterPersonne();
        afficherEquipe();
      }
      tbody.appendChild(clone2);
    }
    emplacementEquipe.appendChild(clone);
  }
}
function afficherPersonne() {

}
function creaOption(nom, valeur) {
  let option = document.createElement("option");
  option.textContent = nom;
  option.setAttribute("value", valeur);
  return option;
}