// Função para renderizar vagas com filtros aplicados
function renderVagasComFiltro(jobs, filtroData, filtroEmpresa, filtroStatus, filtroEstilo, filtroPesquisa) {
    const container = document.getElementById('job-container');
    container.innerHTML = '';

    jobs.forEach(job => {
        // Extrai o mês da data de publicação
        const jobMes = Number(job.data.split('/')[1]);

        // Verifica se o job atende aos critérios de filtro de data, empresa, status, estilo e pesquisa
        if ((filtroData === '' || jobMes === Number(filtroData.split('-')[1])) &&
            (filtroEmpresa === 'all' || job.empresa.toLowerCase() === filtroEmpresa.toLowerCase()) &&
            (filtroStatus === 'all' || job.disponibilidade === filtroStatus) &&
            (filtroEstilo === 'all' || job.estilo === filtroEstilo) &&
            (filtroPesquisa === '' || job.nome.toLowerCase().includes(filtroPesquisa.toLowerCase()))) {

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
        }
    });

    if (container.children.length === 0) {
        container.innerHTML = '<p>Nenhuma vaga encontrada com os filtros selecionados.</p>';
    }
}

// Evento de input no campo de pesquisa
const searchJob = document.getElementById('searchJob');
searchJob.addEventListener('input', () => {
    const filtroData = document.getElementById('filtro-data-publicacao').value;
    const filtroEmpresa = document.getElementById('filtro-empresa').value;
    const filtroStatus = document.getElementById('filtro-status').value;
    const filtroEstilo = document.getElementById('filtro-estilo').value;
    const filtroPesquisa = searchJob.value.trim();

    renderVagasComFiltro(scriptFilter.data, filtroData, filtroEmpresa, filtroStatus, filtroEstilo, filtroPesquisa);
});

// Evento de clique no botão de aplicar filtro
document.querySelector('.filter-btn').addEventListener('click', () => {
    const filtroData = document.getElementById('filtro-data-publicacao').value;
    const filtroEmpresa = document.getElementById('filtro-empresa').value;
    const filtroStatus = document.getElementById('filtro-status').value;
    const filtroEstilo = document.getElementById('filtro-estilo').value;

    renderVagasComFiltro(scriptFilter.data, filtroData, filtroEmpresa, filtroStatus, filtroEstilo, '');
});

// Criando uma instância de ScriptJson para carregar os dados do JSON
const scriptFilter = new ScriptJson('./api/vagas.json');

// Carregando os dados do JSON e inicializando a renderização inicial das vagas
scriptFilter.fetchJson((error, data) => {
    if (error) {
        console.error('Erro ao carregar JSON:', error.message);
    } else {
        console.log('Dados JSON carregados:', data);
        // Salvando os dados recebidos na instância scriptFilter para uso posterior
        scriptFilter.data = data;
        renderVagasComFiltro(data, '', 'all', 'all', 'all', ''); // Renderiza as vagas inicialmente sem filtros
    }
});
