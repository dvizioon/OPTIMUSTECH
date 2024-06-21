document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    let intervalId;

    // Função para exibir o testemunho com base no índice
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    // Função para exibir o próximo testemunho
    function showNextTestimonial() {
        // Remover a classe 'active' do item atual
        dots[currentIndex].classList.remove('active');
        testimonials[currentIndex].style.display = 'none';

        // Avançar para o próximo item
        currentIndex = (currentIndex + 1) % testimonials.length;

        // Adicionar a classe 'active' ao próximo item
        dots[currentIndex].classList.add('active');
        testimonials[currentIndex].style.display = 'block';
    }

    // Iniciar o carousel após um intervalo inicial de 6 segundos
    setTimeout(function () {
        startCarousel();
    }, 6000);

    // Função para iniciar o carousel automaticamente
    function startCarousel() {
        intervalId = setInterval(showNextTestimonial, 8000); // Troca a cada 3 segundos (ajuste conforme necessário)
    }

    // Navegação manual através das bolinhas
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(intervalId); // Parar a navegação automática ao clicar nas bolinhas
            currentIndex = index;
            showTestimonial(currentIndex);
            startCarousel(); // Retomar a navegação automática após a navegação manual
        });
    });

    // Mostrar o primeiro testemunho inicialmente após 6 segundos
    showTestimonial(currentIndex);
});
