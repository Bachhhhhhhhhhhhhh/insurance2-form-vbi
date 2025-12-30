document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('insurance-form');
  if (!form) return;

  // DÁN URL /exec CỦA APPS SCRIPT VÀO ĐÂY:
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxAjGzRekpiG6tOHr2v4-11No7BKwBt56i9Sd94GJHgte7Xh7zi9F2YJZAKvv2K-hwW/exec';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Lấy giá trị theo đúng ID trong HTML hiện tại
    const fullName = document.getElementById('fullName')?.value || '';
    const dob = document.getElementById('dob')?.value || '';
    const passport = document.getElementById('passport')?.value || '';

    // CHÚ Ý: HTML của bạn đang là departure / return / days / insuredCount
    const departureDate = document.getElementById('departure')?.value || '';
    const returnDate = document.getElementById('return')?.value || '';
    const travelDays = document.getElementById('days')?.value || '';
    const program = document.getElementById('program')?.value || '';
    const insuredPeople = document.getElementById('insuredCount')?.value || '';

    const address = document.getElementById('address')?.value || '';
    const bankName = document.getElementById('bankName')?.value || '';
    const bankAccount = document.getElementById('bankAccount')?.value || '';
    const paymentReference = document.getElementById('paymentReference')?.value || '';

    // Gửi theo đúng key để Apps Script nhận ở e.parameter.<key>
    const payload = new URLSearchParams({
      fullName,
      dob,
      passport,
      departureDate,
      returnDate,
      travelDays,
      program,
      insuredPeople,
      address,
      bankName,
      bankAccount,
      paymentReference
    });

    try {
      const res = await fetch(scriptUrl, { method: 'POST', body: payload });
      const data = await res.json();

      if (data.ok) {
        alert('Gửi thành công! Dữ liệu đã lưu vào Google Sheets.');
        form.reset();
      } else {
        alert('Có lỗi: ' + (data.error || 'unknown'));
      }
    } catch (err) {
      alert('Không gửi được: ' + err);
    }
  });
});
