let generatedOTP;

function sendOTP() {
    const email = document.getElementById('email').value;

    if (!email) {
        alert('Please enter your email');
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    console.log(`OTP sent to ${email}: ${generatedOTP}`);  

    document.getElementById('otpSection').style.display = 'block';
}

function verifyOTP() {
    const enteredOTP = document.getElementById('otp').value;

    if (enteredOTP == generatedOTP) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('otpSection').style.display = 'none';
        alert('OTP verified successfully!');
    } else {
        alert('Invalid OTP. Please try again.');
    }
}
