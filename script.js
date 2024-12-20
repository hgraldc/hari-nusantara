const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.nav-button.prev');
const nextButton = document.querySelector('.nav-button.next');
const navbar = document.querySelector('.navbar');

let currentIndex = 0;
let isTransitioning = false; // Untuk mencegah spamming tombol

// Fungsi untuk mengatur posisi dan blur gambar
function updateCarousel() {
    const totalSlides = slides.length;

    slides.forEach((slide, index) => {
        const offset = (index - currentIndex + totalSlides) % totalSlides; // Hitung offset sirkular

        // Atur posisi gambar dan blur sesuai jarak dari tengah
        if (offset === 0) {
            slide.style.transform = `translateX(0) scale(1)`;
            slide.style.zIndex = 3;
            slide.style.filter = 'blur(0px)';
        } else if (offset === 1 || offset === -1 || offset === totalSlides - 1) {
            slide.style.transform = `translateX(${offset === 1 ? 100 : -100}%) scale(0.8)`;
            slide.style.zIndex = 2;
            slide.style.filter = 'blur(5px)';
        } else if (offset === 2 || offset === -2 || offset === totalSlides - 2) {
            slide.style.transform = `translateX(${offset === 2 ? 200 : -200}%) scale(0.7)`;
            slide.style.zIndex = 1;
            slide.style.filter = 'blur(10px)';
        } else {
            slide.style.transform = `translateX(${offset > 0 ? 300 : -300}%) scale(0.6)`;
            slide.style.zIndex = 0;
            slide.style.filter = 'blur(15px)';
        }
    });

    // Reset flag setelah animasi selesai
    setTimeout(() => {
        isTransitioning = false;
    }, 800); // Durasi transisi (sesuai CSS)
}

// Event listener tombol prev dengan debouncing
prevButton.addEventListener('click', () => {
    if (isTransitioning) return; // Mencegah tombol di-spam
    isTransitioning = true;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Event listener tombol next dengan debouncing
nextButton.addEventListener('click', () => {
    if (isTransitioning) return; // Mencegah tombol di-spam
    isTransitioning = true;
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

// Atur posisi awal carousel
updateCarousel();
