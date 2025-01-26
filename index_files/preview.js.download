/**
 * Version 1.0.1
 * 
 * Usage 
 * resources\views\user\portofolio\preview.blade.php
 */
const modalSalinLink = document.getElementById('modal-lihat-link');
const modalDownloadPDF = document.getElementById('modal-download-pdf');
const myToast = document.querySelector('.my-toast');
let btnEditLink = document.querySelector('.btn-edit-link')
let btnSalinLink = document.querySelector('.btn-salin-link')
let btnSimpanLink = document.querySelector('.btn-simpan-link')
let btnBatalEditLink = document.querySelector('.btn-batal-edit-link')
let baseLink = document.querySelector('.base-link')
let modalTitle = document.querySelector('#modal-lihat-link .modal-title')
let EditableLink = document.querySelector('.editable-link')
let oldLink = document.querySelector('.old-link')
let portofolioSubscribeModal = new bootstrap.Modal(document.getElementById("modal-paket-aktivasi"), {});
const PORTOFOLIO_ID_WRAPPER = document.querySelector("input[name='portofolio_id']");
let PORTOFOLIO_ID = null;
if(PORTOFOLIO_ID_WRAPPER){
     PORTOFOLIO_ID = PORTOFOLIO_ID_WRAPPER.value;
}

function showToast(type, message, timeOut = 1000) {
    myToast.dataset.state = type;
    myToast.querySelector('.toast-message').innerHTML = message;
    setTimeout(() => {
        myToast.dataset.state = 'idle';
    }, timeOut);
}


btnEditLink?.addEventListener("click", function () {
    modalTitle.innerHTML = 'Edit Link Unik Kamu'
    console.log('Edit')
    this.classList.add('d-none')
    btnSimpanLink.classList.remove('d-none')
    btnBatalEditLink.classList.remove('d-none')
    EditableLink.focus()
    EditableLink.setSelectionRange(EditableLink.value.length, EditableLink.value.length);
    baseLink.classList.add('focused')
})

EditableLink.addEventListener('blur', function () {
    baseLink.classList.remove('focused')
})

btnSalinLink.addEventListener('click', function () {
    // copy text from base url + editable.value
    let text = "https://" + baseLink.innerHTML + EditableLink.value
    btnSalinLink.classList.add('bg-success');
    navigator.clipboard.writeText(text)
        .then(() => {
            simpleAlert({ color: 'success', message: 'Link Disalin!', duration: '2000', position: 'top-right' });
            console.log('Text copied to clipboard: ' + text)
        })

    setTimeout(() => {
        btnSalinLink.classList.remove('bg-success');
    }, 2000);
})

btnBatalEditLink.addEventListener('click', function () {
    modalTitle.innerHTML = 'Bagikan Link Portofolio Kamu!'
    baseLink.classList.remove('focused')
    EditableLink.value = oldLink.value
    btnEditLink.classList.remove('d-none')
    btnSimpanLink.classList.add('d-none')
    btnBatalEditLink.classList.add('d-none')
})

EditableLink.addEventListener('input', function () {
    let formattedText = formatAsURL(this.value);
    this.value = formattedText;
})

btnSimpanLink.addEventListener('click', async function () {
    if (EditableLink.value == oldLink.value) {
        return;
    }
    modalTitle.innerHTML = 'Bagikan Link Portofolio Kamu!'
    console.log('Simpan', EditableLink.value)
    oldLink.value = EditableLink.value
    btnBatalEditLink.classList.add('d-none')

    let defaultText = this.innerHTML;
    this.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Menyimpan...`;
    this.disabled = true;

    let res = await requestSaveLink({
        link: EditableLink.value,
        portofolio_id: PORTOFOLIO_ID
    })

    if (res.status == 'success') {
        EditableLink.classList.add('is-valid');
        EditableLink.classList.remove('is-invalid');
        btnSimpanLink.classList.add('d-none')
        btnEditLink.classList.remove('d-none')
    } else {
        EditableLink.classList.add('is-invalid');
        EditableLink.classList.remove('is-valid');
        btnBatalEditLink.classList.remove('d-none')
    }
    this.innerHTML = defaultText;
    this.disabled = false;
})

function formatAsURL(inputText) {
    let formattedText = inputText.toLowerCase();
    formattedText = formattedText.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    return formattedText;
}

async function requestSaveLink(data) {
    const options = {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
            link: data.link,
            portofolio_id: data.portofolio_id
        })
    };

    return fetch(`/user/portofolio/save-link`, options).
    then(response => response.json())
        .then(data => data)
        .catch(console.error);
}

let portofolioId = document.querySelector("input[name='portofolio_id']").value;
let isSubscribe = document.querySelector("input[name='is_subscribe']").value;
let btnLihatLink = document.querySelector('.btn-lihat-link');

async function downloadPortofolioPDF() {
    if (!portofolioId) {
        return;
    }
    let modalBody = modalDownloadPDF.querySelector('.modal-body');
    modalBody.dataset.state = 'downloading';
    $(modalDownloadPDF).modal('show');

    let targetPortofolio = getQueryString('target');
    let res = await requestDownloadPortofolioPDF(targetPortofolio);

    if (res.status == 'success') {
        console.log(res);
        modalBody.dataset.state = 'downloaded';
        downloadFileFromURL(res.url);
    }
    else if (res.status == 'error') {
        console.error(res);
        modalBody.dataset.state = 'error';
    }
}

function getQueryString(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

function requestDownloadPortofolioPDF(targetPortofolio) {
    let queryString = '';
    if (targetPortofolio) {
        queryString = `?target=${targetPortofolio}`;
    }
    const options = {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            'Content-Type': 'application/json'
        },
        method: 'GET',
        credentials: 'same-origin',
    };

    return fetch(`/user/portofolio/download${queryString}`, options).
        then(response => response.json())
        .then(data => data)
        .catch(console.error);
}

function downloadFileFromURL(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = ''; // Leave empty to use the default file name from the URL
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function openPortofolioInNewTab() {
    let link = "https://" + baseLink.innerHTML + EditableLink.value;
    window.open(link, '_blank');
}
