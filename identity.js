document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.querySelector(".signpass-field input");
    const eyeIcon = document.querySelector(".signpass-field i");
    const requirementList = document.querySelectorAll(".requirement-list li");

    // An array of password requirements with corresponding regular expressions and index of the requirement list item
    const requirements = [
        { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
        { regex: /[0-9]/, index: 1 }, // At least one number
        { regex: /[^A-Za-z0-9]/, index: 2 }, // At least one special character
        { regex: /[A-Za-z]/, index: 3 }, // At least one uppercase letter
    ];

    // Event listener to check password requirements on keyup
    passwordInput.addEventListener("keyup", (e) => {
        requirements.forEach(item => {
            const isValid = item.regex.test(e.target.value);
            const requirementItem = requirementList[item.index];

            // Updating class and icon of requirement item if requirement matched or not
            if (isValid) {
                requirementItem.classList.add("valid");
                requirementItem.firstElementChild.className = "fa-solid fa-check";
            } else {
                requirementItem.classList.remove("valid");
                requirementItem.firstElementChild.className = "fa-solid fa-circle";
            }
        });

        // Check password strength
        strengthChecker();
    });

    // Toggle the password input type between "password" and "text"
    eyeIcon.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
    });

    let parameters = {
        count: false,
        letters: false,
        numbers: false,
        special: false,
    };

    let strengthBar = document.getElementById("strength-bar");
    let msg = document.getElementById("msg");

    function strengthChecker() {
        let password = passwordInput.value;

        parameters.letters = /[A-Za-z]+/.test(password);
        parameters.numbers = /[0-9]+/.test(password);
        parameters.special = /[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(password);
        parameters.count = password.length > 7;

        let barLength = Object.values(parameters).filter((value) => value).length;

        strengthBar.innerHTML = "";
        for (let i = 0; i < barLength; i++) {
            let span = document.createElement("span");
            span.classList.add("strength");
            strengthBar.appendChild(span);
        }

        let spanRef = document.getElementsByClassName("strength");
        for (let i = 0; i < spanRef.length; i++) {
            switch (spanRef.length - 1) {
                case 0:
                    spanRef[i].style.background = "#ff4d4d";
                    msg.textContent = "weak";
                    break;
                case 1:
                    spanRef[i].style.background = "#ffad33";
                    msg.textContent = "moderate";
                    break;
                case 2:
                    spanRef[i].style.background = "#00b300";
                    msg.textContent = "strong";
                    break;
                case 3:
                    spanRef[i].style.background = "#00b300";
                    msg.textContent = "very strong";
                    break;
            }
        }
    }

    function toggle() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.style.color = "#0be881";
        } else {
            passwordInput.type = "password";
            eyeIcon.style.color = "#808080";
        }
    }
});
