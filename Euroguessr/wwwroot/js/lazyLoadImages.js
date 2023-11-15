// lazy load images

// get all images with data-src attribute
const imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src', image.dataset.src);
    image.onload = () => { image.dataset.src = ''; };
}

// optional parameters being set for the IntersectionalObserver
const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

// first check to see if Intersection Observer is supported
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                imgObserver.unobserve(item.target);
            }
        });
    }, imgOptions);

    // loop through each img and check status and load if necessary
    imagesToLoad.forEach((img) => {
        imgObserver.observe(img);
    });
}
else { // just load all images if not supported
    // load image if it's in the viewport
    window.addEventListener('scroll', () => {
        imagesToLoad.forEach((img) => {
            // check if the image is in the viewport
            let scrollY = window.scrollY;
            let imgTop = img.getBoundingClientRect().top;
            let imgHeight = img.getBoundingClientRect().height;
            let imgBottom = imgTop + imgHeight;
            if (scrollY < imgBottom && scrollY + window.innerHeight > imgTop) {
                loadImages(img);
            }
        });
    });
}