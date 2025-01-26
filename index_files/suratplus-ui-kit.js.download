/**
    Usage:
    resources\views\layouts\user_dashboard.blade.php
    resources\views\layouts\master.blade.php
    resources\views\admin\ui-kit\suratplus-ui-kit.blade.php
 */

// ==========================================================\
let modalConfirmation = document.getElementById('modal-confirmation');
if (modalConfirmation) {
    modalConfirmation.addEventListener('show.bs.modal', function (e) {
        let defaultCallback = () => {
            this.querySelector('.close').click();
        }
        let ctx = e.relatedTarget;
        let title = ctx.dataset.title ?? 'Lanjutkan?';
        let subtitle = ctx.dataset.subtitle ?? 'Proses ini tidak bisa Undo';
        let color = ctx.dataset.color ?? 'danger';
        let actionText = ctx.dataset.actionText ?? 'Lanjut';
        let icon = ctx.dataset.icon ?? 'exclamation-square';
        let callback = ctx.dataset.callback ?? defaultCallback;

        this.querySelector('.title').textContent = title;
        this.querySelector('.subtitle').textContent = subtitle;
        this.querySelector('.icon').classList.add(`sp-icon-${icon}`);`   `
        this.querySelector('.icon').classList.add(`sp-text-${color}`);
        this.querySelector('.confirm').classList.add(`sp-btn-${color}`);
        this.querySelector('.confirm').textContent = actionText;


        this.querySelector('.confirm').addEventListener('click', () => {
            if (typeof window[callback] === 'function') {
                window[callback]();
            } else {
                console.log('the callback is not a function');
                defaultCallback();
            }
        });
    });
}
// ==========================================================

function simpleAlert({
    color = 'primary',
    message = 'This is a simple alert',
    duration = '2000',
    position = 'top-center'
}) {
    let alert = document.createElement('div');
    // <img class="sp-filter-${color}" src="/assets-3/icons/suratplus-ui-kit/exclamation.svg" alt="">

    alert.classList.add('sp-alert', `sp-alert-${color}`, 'fade-in');
    alert.innerHTML = `
        <i class="sp-icon-check-circle sp-text-success"></i>
        <span class="message">${message}</span>
        <span class="close sp-text-${color}">
        <i class="sp-icon-x-lg"></i>
        </span>`;
    alert.querySelector('.close').addEventListener('click', () => {
        alert.remove();
    });
    document.body.appendChild(alert);

    setAlertPosition(alert, position);

    setTimeout(() => {
        alert.classList.add('fade-out');
    }, duration);
}


function setAlertPosition(alert, position) {
    switch (position) {
        case 'top-center':
            alert.style.top = '1rem';
            alert.style.left = '50%';
            alert.style.transform = 'translateX(-50%)';
            break;
        case 'bottom-center':
            alert.style.bottom = '1rem';
            alert.style.left = '50%';
            alert.style.transform = 'translateX(-50%)';
            break;
        case 'top-right':
            alert.style.top = '1rem';
            alert.style.right = '1rem';
            break;
        case 'top-left':
            alert.style.top = '1rem';
            alert.style.left = '1rem';
            break;
        case 'bottom-left':
            alert.style.bottom = '1rem';
            alert.style.left = '1rem';
            break;
        case 'bottom-right':
            alert.style.bottom = '1rem';
            alert.style.right = '1rem';
            break;
    }
}

// ==========================================================
