// 1. Ação do Botão CTA (Hero)
const ctaButton = document.getElementById('cta-button');

ctaButton.addEventListener('click', () => {
    // Redireciona a tela suavemente para a área de contato
    const contactSection = document.getElementById('contato');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    // Alternativamente, para exibir um alerta como a atividade sugere:
    // alert("Obrigado pelo interesse! Role para baixo para preencher o formulário.");
});

// 2. Consumo da API ViaCEP
const cepInput = document.getElementById('cep');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');

// Ouve o evento de "saída" do campo (quando o usuário termina de digitar e clica fora)
cepInput.addEventListener('blur', async (event) => {
    // Remove qualquer caractere que não seja número
    let cep = event.target.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        return; // Sai da função se o CEP não tiver 8 dígitos
    }

    try {
        // Exibe um feedback visual enquanto busca
        cidadeInput.value = "Buscando...";
        estadoInput.value = "...";

        // Consumo da API usando fetch
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado');
        }

        // Preenche os campos com o retorno da API
        cidadeInput.value = data.localidade;
        estadoInput.value = data.uf;

    } catch (error) {
        alert("CEP inválido ou não encontrado. Tente novamente.");
        cidadeInput.value = "";
        estadoInput.value = "";
    }
});

// 3. Ação do formulário de submissão (Agradecimento)
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    const nome = document.getElementById('nome').value;
    
    alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso e logo entraremos em contato.`);
    form.reset(); // Limpa o formulário
});