
function renderTestimonials(testimonials) {
    const carousel = document.getElementById('testimonialCarousel');
    const dotsContainer = document.querySelector('.testimonial-dots');
    carousel.innerHTML = '';
    dotsContainer.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
       
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <p>${testimonial.text}</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="Autor do Testemunho">
                <div>
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.title}</p>
                </div>
            </div>
        `;
        carousel.appendChild(testimonialCard);

        // Criação do indicador de navegação (bolinha)
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot';
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
}


document.addEventListener('DOMContentLoaded', () => {

    const testimonials = [
        {
            "text": "Estamos muito satisfeitos as Soluções da OptimusTech. Eles são inovadores e sempre entregam resultados excepcionais.",
            "image": "https://avatars.githubusercontent.com/u/147283064?v=4",
            "name": "Daniel Estevão",
            "title": "CEO, Empresa OptimusTech"
        },
        {
            "text": "OptimusTech se importa com a saúde dos seus colaboradores e sempre procura nos dar todo tipo de auxílio possível.",
            "image": "./assets/img/Julia.jpg",
            "name": "Júlia Castro",
            "title": "Desenvolvedora Web"
        }
    ];

    renderTestimonials(testimonials);

    function showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dot');


        if (index < 0 || index >= testimonials.length) {
            return;
        }


        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none'; 
        });
        dots.forEach(dot => {
            dot.classList.remove('active'); 
        });


        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');
    }


    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
});
