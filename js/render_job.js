class ScriptJson {
    constructor(path) {
        this.path = path;
    }

    fetchJson(callback) {
        const jsonReq = new XMLHttpRequest();
        jsonReq.open('GET', this.path, true);
        jsonReq.onload = () => {
            if (jsonReq.status >= 200 && jsonReq.status < 400) {
                const data = JSON.parse(jsonReq.responseText);
                callback(null, data);
            } else {
                callback(new Error('Failed to load JSON data'), null);
            }
        };
        jsonReq.onerror = () => {
            callback(new Error('Connection error'), null);
        };
        jsonReq.send();
    }
}



function renderVaga(jobs) {
    const container = document.getElementById('job-container');
    container.innerHTML = ''; // Limpa qualquer conteúdo existente

    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';

        jobCard.innerHTML = `
            <img src="${job.img}" alt="Company Logo">
            <div class="job-info">
                <h3>${job.nome}</h3>
                <p class="tag ${setTagClass(job.disponibilidade)}" style="color: white;">${setTagName(job.disponibilidade)}</p>
                <p><strong>Empresa:</strong> ${job.empresa}</p>
                <p><strong>Data:</strong> ${job.data}</p>
                <p><strong>Estilo:</strong> ${job.estilo}</p>
                <p><strong>Salário:</strong> R$ ${job.salario}</p>
                <p><strong>Horas por dia:</strong> ${job.horas_dia}</p>
                <div class="button-action-openVaga">
                   ${setButtonAction(job.disponibilidade)}
                </div>
            </div>
        `;

        container.appendChild(jobCard);
    });
}

function setTagClass(disponibilidade) {
    switch (disponibilidade) {
        case 'open':
            return 'open_vaga';
        case 'close':
            return 'close_vaga';
        case 'warning':
            return 'warning_vaga';
        default:
            return 'tag';
    }
}

function setTagName(disponibilidade) {
    switch (disponibilidade) {
        case 'open':
            return 'Disponível';
        case 'close':
            return 'Encerradas';
        case 'warning':
            return 'Vagas excedidas';
        default:
            return 'tag';
    }
}

function setButtonAction(disponibilidade) {
    
    switch (disponibilidade) {
        case 'open':
            return '<button class="apply-button">Quero me candidatar</button>';
        case 'close':
            return '<button class="apply-button text-close">Encerrado</button>';
        case 'warning':
            return '<button class="apply-button text-close">Encerrado</button>';
        default:
            return 'tag';
    }
}

const scriptjson = new ScriptJson('./api/vagas.json');

scriptjson.fetchJson((error, data) => {
    if (error) {
        console.error('Erro ao carregar JSON:', error.message);
    } else {
        console.log('Dados JSON carregados:', data);
        renderVaga(data); // Chamando renderVaga com os dados carregados
    }
});
