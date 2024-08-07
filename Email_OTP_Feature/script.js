document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateOTP();
});

function sendOTP() {
    const email = document.getElementById('email').value;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    Email.send({
        SecureToken : " cb196af3-cc92-4834-966e-c0a889525e6c2",
        To : email.value,
        From : "kamalchand05072000@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}
   