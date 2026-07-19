async function apiUrl() {
    try {
        const url = 'https://rickandmortyapi.com/api/character/';
        const returnUrl = await fetch(url)
        const data = await returnUrl.json()

        console.log(data)
    } catch (err) {
        console.error('Erro ao buscar informações', err)
    }
}

apiUrl()