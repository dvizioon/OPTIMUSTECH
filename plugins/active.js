
// Função para remover a classe 'active' de todos os itens de navegação
function removeActiveClasses() {
    const navItems = document.querySelectorAll('.navigation-global ul a');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
}

// Adiciona evento de clique a todos os itens de navegação
document.querySelectorAll('.navigation-global ul a').forEach(item => {
    item.addEventListener('click', function () {
        removeActiveClasses(); // Remove a classe 'active' de todos os itens
        this.classList.add('active'); // Adiciona a classe 'active' ao item clicado
    });
});

