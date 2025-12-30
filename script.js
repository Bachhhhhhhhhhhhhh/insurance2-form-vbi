/*
 * Client-side script for submitting the insurance form to a Google Apps Script web app.
 *
 * Replace the value of `scriptUrl` with the deployment URL of your
 * Google Apps Script web application (ending in `/exec`). When the form is
 * submitted, the script gathers all form values into a URLSearchParams object
 * and posts them to your Apps Script. The Apps Script should read the
 * parameters from `e.parameter` and append them to your Google Sheet
 * accordingly.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Get the form element by its ID
  const form = document.getElementById('insurance-form');

  // TODO: Replace this with your own Apps Script deployment URL (ending with /exec)
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxAjGzRekpiG6tOHr2v4-11No7BKwBt56i9Sd94GJHgte7Xh7zi9F2YJZAKvv2K-hwW/exec';

  // Intercept the form submission to send the data via fetch()
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data into a URLSearchParams object
    const formData = new URLSearchParams({
      fullName: document.getElementById('fullName').value,
      dob: document.getElementById('dob').value,
      passport: document.getElementById('passport').value,
      departureDate: document.getElementById('departureDate').value,
      returnDate: document.getElementById('returnDate').value,
      travelDays: document.getElementById('travelDays').value,
      program: document.getElementById('program').value,
      insuredPeople: document.getElementById('insuredPeople').value,
      address: document.getElementById('address').value,
      bankName: document.getElementById('bankName').value,
      bankAccount: document.getElementById('bankAccount').value,
      paymentReference: document.getElementById('paymentReference').value
    });

    // Send a POST request to the Apps Script URL
    fetch(scriptUrl, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          // Success: show a confirmation and reset the form
          alert('Gửi thành công! Dữ liệu đã lưu vào Google Sheets.');
          form.reset();
        } else {
          alert('Có lỗi: ' + (data.error || 'unknown'));
        }
      })
      .catch((err) => {
        alert('Không gửi được: ' + err);
      });
  });
});
