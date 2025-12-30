/* insurance_form_script.js
 * Thu thập dữ liệu form và gửi đến Google Apps Script web app.
 * Chỉnh lại scriptUrl bên dưới thành URL /exec của bạn.
 */

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('insurance-form');
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxAjGzRekpiG6tOHr2v4-11No7BKwBt56i9Sd94GJHgte7Xh7zi9F2YJZAKvv2K-hwW/exec';

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // ngăn reload trang

    // Thu thập dữ liệu form thành URLSearchParams
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

    // Gửi POST tới Apps Script
    fetch(scriptUrl, {
      method: 'POST',
      body: formData
    })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        alert('Gửi thành công! Dữ liệu đã lưu vào Google Sheets.');
        form.reset();
      } else {
        alert('Có lỗi: ' + (data.error || 'unknown'));
      }
    })
    .catch(err => {
      alert('Không gửi được: ' + err);
    });
  });
});
