import "./portal.js";

const url = 'https://rickandmortyapi.com/api/';

const fullName = document.querySelector('#full-name');
const homeDimension = document.querySelector('#home-dimension');
const selectorSector = document.querySelector('#select-sector-btn');
const submitBtn = document.querySelector('.submit-btn');
const suggestionsList = document.querySelector('#suggestions-list');
let timerDigitacao;

fullName.addEventListener('input', (e) => {
    const textoDigitado = e.target.value.trim();

    clearTimeout(timerDigitacao);

    if (textoDigitado.length === 0) {
        suggestionsList.innerHTML = '';
        return;
    }

    timerDigitacao = setTimeout(async () => {
        try {
            const response = await fetch(`${url}character/?name=${textoDigitado}`);
            
            if (!response.ok) throw new Error('Nenhum correspondente');
            
            const data = await response.json();
            mostrarSugestoes(data.results);
            
        } catch (err) {
            suggestionsList.innerHTML = ''; 
        }
    }, 500);
});

function mostrarSugestoes(personagens) {
    suggestionsList.innerHTML = '';

    const primeirosResultados = personagens.slice(0, 5);

    primeirosResultados.forEach(personagem => {
        const li = document.createElement('li');
        li.textContent = personagem.name;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            fullName.value = personagem.name;

            if (personagem.origin.name !== 'unknown') {
                homeDimension.value = personagem.origin.name;
            } else {
                homeDimension.value = 'Origem Desconhecida';
            }
            suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(li);
    });
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const nameSearch = fullName.value;
    const homeSearch = homeDimension.value;

    if(nameSearch.trim() !== '') {
        searchPerson(nameSearch);
    } else {
        console.log('Digite um nome antes');
    }

    if(homeSearch.trim() !== '') {
        searchDimension(homeSearch);
    } else {
        console.log('Digite um lugar antes');
    }
});

async function searchPerson(namePerson) {
    try {
        const search = `${url}character/?name=${namePerson}`;
        const returnUrl = await fetch(search);
        
        if(!returnUrl.ok) {
            throw new Error('Personagem não encontrado');
        }

        const data = await returnUrl.json();
        console.log("Busca de Personagem:", data.results);

        return data.results;
        
    } catch (err) {
        console.error('Erro ao buscar personagem', err);
    }
}

async function searchDimension(nameDimension) {
    try {
        const search = `${url}location/?name=${nameDimension}`;
        const returnUrl = await fetch(search);
        
        if(!returnUrl.ok) {
            throw new Error('Destino não encontrado');
        }

        const data = await returnUrl.json();
        console.log("Busca de Dimensão:", data.results);

        return data.results;
        
    } catch (err) {
        console.error('Erro ao buscar destino', err);
    }
}

async function searchDestination() {
    try {
        const search = `${url}location`;
        const returnUrl = await fetch(search);
        
        if(!returnUrl.ok) {
            throw new Error('Destino não encontrado');
        }

        const data = await returnUrl.json();
        selectDestination(data.results);
        
    } catch (err) {
        console.error('Erro ao buscar destino inicial', err);
    }
}

function selectDestination(destination) {
    selectorSector.innerHTML = '<option value="" disabled selected>Select a destination...</option>';

    destination.forEach(e => {
        const novoSelect = document.createElement('option');
        novoSelect.value = e.name;
        novoSelect.textContent = `${e.name} (${e.type})`;
        selectorSector.appendChild(novoSelect);
    });
}

searchDestination();

