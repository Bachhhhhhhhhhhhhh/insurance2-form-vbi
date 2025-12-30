/*
 * Client‑side script for submitting the insurance form to a Google Apps Script web app.
 *
 * How to use:
 * 1. Create a Google Sheets document and write an Apps Script (Tools → Script Editor) that exposes a doPost(e) function.
 * 2. Deploy it as a web app (Deploy → New deployment → Web app) and set access to "Anyone" or "Anyone with the link".
 * 3. Copy the deployment URL and paste it into the scriptUrl constant below.
 *
 * The Apps Script should extract data from e.postData.contents (JSON) and append it to your sheet.
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('insurance-form');
    const successMessage = document.getElementById('success-message');

    // Replace this URL with your own Apps Script deployment URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxAjGzRekpiG6tOHr2v4-11No7BKwBt56i9Sd94GJHgte7Xh7zi9F2YJZAKvv2K-hwW/exec';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send a POST request to the Apps Script URL
        fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            form.reset();
            successMessage.classList.remove('hidden');
            // Optionally, hide the message after a few seconds
            setTimeout(() => successMessage.classList.add('hidden'), 8000);
        }).catch(err => {
            console.error('Error submitting form', err);
            alert('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        });
    });
});
