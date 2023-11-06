function animateChildrens(rootElement, animation, duration) {
    let childrens = rootElement.children;
    for (let i = 0; i < childrens.length; i++) {
        let child = childrens[i];
        animate(child, animation, duration * (i + 1));
    }
}

function animate(element, animation, duration) {
    element.style.transitionDuration = '0.3s';
    element.classList.add(animation);
    setTimeout(() => {
        element.classList.remove(animation);
    }, duration);
}