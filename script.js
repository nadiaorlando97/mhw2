init();

function init(){
  
  /*nascondo la sezione Preferiti all'inizio */
  if (document.querySelectorAll('#sectionPref div').length==0){  
    document.getElementById("sezionePreferiti").style.display="none";
  }
  createGrid();
}

/*creo i vari elementi della griglia*/
function createGrid() { 

  let section = document.getElementById("grid");

  for(let i=0; i < listTitolo.length; i++) {

    const box = document.createElement('div');
    box.id = i;
    
    const titolo = document.createElement('h1');
    titolo.textContent = listTitolo[i];

    const immagine = document.createElement('img');
    immagine.src = listImmagine[i];

    const pref = document.createElement('img');
    pref.id = "heart";
    pref.src = listPreferiti[0];
    pref.addEventListener('click',insertPref);
  
    const descrizione = document.createElement('p');
    descrizione.textContent = listDescrizione[i];
    
    descrizione.style.visibility="hidden";

    const dettagli = document.createElement('button');
    dettagli.id = "btnDetails";
    dettagli.textContent = 'Clicca per piu dettagli';
    dettagli.addEventListener('click',mostraDettagli);

    section.appendChild(box);
    box.appendChild(titolo);
    box.appendChild(immagine);
    box.appendChild(pref);
    box.appendChild(descrizione);
    box.appendChild(dettagli);
  }
}

/*Inserisco nella sezione Preferiti*/
function insertPref(event){  

  const pref = event.currentTarget;

  /*Cambio l'immagine del cuore*/
  pref.src=listPreferiti[1]; 
  pref.removeEventListener('click', insertPref);
  pref.addEventListener('click', removePref);
  
  /*Rendo visibile la sezione Preferiti nel caso in cui quello che inserisco è il primo dei Preferiti*/
  if(document.querySelectorAll('#sectionPref div').length==0){  
    document.getElementById("sezionePreferiti").style.display="block";
  }

  /*Seleziono il nodo 'padre' e la sezione dove voglio inserire il nodo,
  Poi inserisco il nodo nella sezione Preferiti.*/ 

  var source = pref.parentNode; 
  let section = document.getElementById("sectionPref"); 

  insertIntoPref(section,source);
}

/*Rimuovo dalla sezione Preferiti*/
function removePref(event) { 
  
  const pref = event.currentTarget;
  
  /*Cambio l'immagine del cuore*/
  pref.src = listPreferiti[0]; 
  pref.removeEventListener('click', removePref);
  pref.addEventListener('click',insertPref);

  /*Seleziono il nodo 'padre' e trovo l'id. 
  Seleziono tutti i div della sezione Preferiti,
  li scorro e se trovo un div con lo stesso id lo rimuovo.*/

  var source = pref.parentNode; 
  var idSource = source.id; 
  const boxes = document.querySelectorAll('#sectionPref div'); 
  for(const box of boxes){ 
    if (box.id==idSource){ 
      box.remove();
      break;
    }
  }
  
  /*Poichè ho reso cliccabile il cuore nella sezione Preferiti, se l'utente elimina
  il preferito cioè clicca sul cuore, devo aggiornare il corrispettivo elemento della sezione
  "Tutti gli elementi".*/
  
  const griglia = document.querySelectorAll('#grid div'); 
  for(const div of griglia) {  
    if(div.id == idSource) {
      div.childNodes[2].src = listPreferiti[0];
      div.childNodes[2].removeEventListener('click',removePref); 
      div.childNodes[2].addEventListener('click',insertPref);
    }
  }
  
   /*Nascondo la sezione Preferiti*/
  if(document.querySelectorAll('#sectionPref div').length==0){ 
    document.getElementById("sezionePreferiti").style.display="none";
  }
}

/*Per effettuare la ricerca, porto il contenuto della casella di testo in minuscolo
per non avere errori di case sensitive. 
Poi seleziono tutti i div della griglia, li scorro, individuo il titolo e lo porto
in minuscolo per non avere errori di case sensitive.*/ 
function cerca(){
  var x = document.getElementById("ricerca");
  var input = x.value.toLowerCase();
  
  if (input!=""){  
    
    const boxes = document.querySelectorAll('#grid div');  

    for(const box of boxes){ 
      let titolo = box.childNodes[0].textContent; 
      titolo = titolo.toLowerCase(); 

      if (!titolo.startsWith(input)){
        box.style.display="none";  /*nascondo il div*/ 
      }else{
        box.style.display="block"; /*lo rendo visibile*/
      }
    }
  }else {
    const boxes = document.querySelectorAll('#grid div');
    for(const box of boxes){ 
      box.style.display="block";
    } 

  }
}

/*Ho usato visibility anzichè display in modo da allocare lo spazio ma 
non renderlo visibile*/
function mostraDettagli(event){

  let button = event.currentTarget;
  let parent = button.parentNode;

  button.textContent = "Nascondi dettagli";
  parent.childNodes[3].style.visibility= "visible";
  button.removeEventListener('click',mostraDettagli);
  button.addEventListener('click',nascondiDettagli);

}

function nascondiDettagli(event){

  let button=event.currentTarget; 
  let parent = button.parentNode;

  button.textContent="Clicca per piu dettagli";
  parent.childNodes[3].style.visibility= "hidden";
  button.removeEventListener('click',nascondiDettagli);
  button.addEventListener('click',mostraDettagli);
}

/*creo la copia del nodo da inserire nei Preferiti*/
function insertIntoPref(section,source) {
  const box = document.createElement('div');
  box.id = source.id;
 
  const titolo = document.createElement('h1');
  titolo.textContent = source.childNodes[0].textContent;

  const immagine = document.createElement('img');
  immagine.src = source.childNodes[1].src;

  const pref = document.createElement('img');
  pref.id = "heart";
  pref.src =  source.childNodes[2].src;
  pref.addEventListener('click',removePref);

  const descrizione = document.createElement('p');
  descrizione.style.visibility="hidden";
  descrizione.id="descrizionePref";
  descrizione.textContent = source.childNodes[3].textContent;

  const dettagli = document.createElement('button');
  dettagli.textContent = 'Clicca per piu dettagli';
  dettagli.addEventListener('click',mostraDettagli);

  box.appendChild(titolo);
  box.appendChild(immagine);
  box.appendChild(pref);
  box.appendChild(descrizione);
  box.appendChild(dettagli);
  section.appendChild(box);
}




 