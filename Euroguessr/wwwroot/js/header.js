let nav = document.getElementById('nav');
let toggle = document.getElementById('toggle');
let header = document.getElementById('header');

toggle.addEventListener('click', () => {
    document.body.style.overflow = "hidden";
    nav.classList.toggle('active');
    setTimeout(() => {
        document.body.style.overflow = "auto";
    }, 300);
});

// check if the scroll is not at the top
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});