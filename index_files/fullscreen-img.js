/**
 * Version 1.0.2
 * 
 * Usage 
 * resources\views\user\portofolio\preview.blade.php
 */

document.querySelectorAll('.user-generated-img').forEach(function (img) {
    img.addEventListener('click', function () {
        const fullscreenView = document.querySelector('#fullscreen-view');
        const fullscreenImg = document.querySelector('#fullscreen-view .image');
        fullscreenImg.src = this.src;
        fullscreenView.style.display = 'flex';
        setTimeout(() => {
            document.body.classList.add('blur');
        }, 20);
    });
});

document.querySelector('#fullscreen-view').addEventListener('click', function () {
    this.style.display = 'none';
    document.body.classList.remove('blur');
});
