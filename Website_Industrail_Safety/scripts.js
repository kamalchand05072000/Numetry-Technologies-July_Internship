document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        if (validateForm()) {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            console.log("Form Submitted", data);

            alert("Thank you for contacting us! We will get back to you soon.");

            form.reset();
        } else {
            alert("Please fill out all required fields.");
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll("input, textarea");

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        });

        return isValid;
    }
});
