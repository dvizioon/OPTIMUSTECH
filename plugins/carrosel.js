
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelector('.slide');
    const totalSlides = slides.children.length;
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function moveSlide(n) {
    slideIndex += n;
    const slides = document.querySelector('.slide');
    const totalSlides = slides.children.length;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

setInterval(showSlides, 4000);


