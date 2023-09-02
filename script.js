let giocatori = [];
let giocatoreSelezionato = null;

function aggiungiGiocatore() {
    const nome = document.getElementById('nomeGiocatore').value.trim();
    if (nome) {
        giocatori.push({ nome, punti: 0 });
        document.getElementById('nomeGiocatore').value = '';

        // Crea un pulsante per il giocatore
        const pulsante = document.createElement('button');
        pulsante.textContent = nome;
        pulsante.onclick = function() { selezionaGiocatore(nome); };
        document.getElementById('listaGiocatori').appendChild(pulsante);

        aggiornaListaGiocatori();
    }
}

function selezionaGiocatore(nome) {
    giocatoreSelezionato = giocatori.find(g => g.nome === nome);
}

function aggiungiPunti() {
    const numeroPunti = parseInt(document.getElementById('numeroPunti').value);

    if (!isNaN(numeroPunti) && giocatoreSelezionato) {
        giocatoreSelezionato.punti += numeroPunti;
        aggiornaListaGiocatori();
    }
}

function aggiornaListaGiocatori() {
    const ul = document.getElementById('elencoGiocatori');
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    giocatori.forEach(giocatore => {
        const li = document.createElement('li');
        li.textContent = `${giocatore.nome}: ${giocatore.punti} punti`;
        ul.appendChild(li);
    });
    localStorage.setItem('giocatori', JSON.stringify(giocatori));
}

function reset() {
    giocatori = [];
    aggiornaListaGiocatori();
    const lista = document.getElementById('listaGiocatori');
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

function resetStorico() {
    localStorage.removeItem('giocatori');
    reset();
}

// Carica i giocatori dal localStorage quando la pagina viene caricata
document.addEventListener('DOMContentLoaded', function() {
    const giocatoriSalvati = localStorage.getItem('giocatori');
    if (giocatoriSalvati) {
        giocatori = JSON.parse(giocatoriSalvati);
        aggiornaListaGiocatori();
        // Ricrea i pulsanti dei giocatori
        giocatori.forEach(giocatore => {
            const pulsante = document.createElement('button');
            pulsante.textContent = giocatore.nome;
            pulsante.onclick = function() { selezionaGiocatore(giocatore.nome); };
            document.getElementById('listaGiocatori').appendChild(pulsante);
        });
    }
});

document.getElementById('listaGiocatori').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName == 'BUTTON') {
        // Rimuovi la classe 'button-selected' da tutti gli altri pulsanti
        document.querySelectorAll('#listaGiocatori button').forEach(function(btn) {
            btn.classList.remove('button-selected');
        });

        // Aggiungi la classe 'button-selected' al pulsante cliccato
        e.target.classList.add('button-selected');
    }
});
