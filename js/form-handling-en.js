let selectedCourse = null;
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxXjgYaKKd6-JK5mvwYKLoEqSnDQ8XAs9-t5n52iWL3h1U-HA9ZxwyE99BV2LXsafFfaw/exec";

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

fetch("/_data/courses.json")
    .then((res) => res.json())
    .then((data) => {
        const lang = "en";
        const content = data.courses.find((c) => c.id === courseId);
        if (content && content[lang]) {
            selectedCourse = content;
            document.getElementById("title").textContent = 'Book in " ' + selectedCourse.title + '"';
            document.getElementById("image").src = content.thumbnail;
        } else {
            selectedCourse = null;
        }
    });

document.getElementById("book-course-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const getValue = (fieldName) => {
        const field = e.target.elements[fieldName];
        return field ? field.value : "";
    };

    const formData = {
        course: selectedCourse ? selectedCourse["ar"].title : "",
        name: getValue("name"),
        email: getValue("email"),
        phoneNumber: getValue("phoneNumber"),
        courses: getValue("courses"),
        booksRead: getValue("booksRead"),
        therapist: getValue("therapist"),
        job: getValue("job"),
        kids: getValue("kids"),
        kidProblems: getValue("kidProblems"),
    };

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(formData),
        });
        document.getElementById("book-course-result").innerHTML =
            '<div class="alert alert-success text-center" role="alert">Registration completed successfully ✅</div>';
        e.target.reset();
    } catch (error) {
        document.getElementById("book-course-result").innerHTML =
            '<div class="alert alert-danger text-center" role="alert">An error occurred during registration ❌</div>';
    }
});

const inputField = document.getElementById("phoneNumber");

inputField.addEventListener("input", function (event) {
    const valid = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/.test(event.target.value);
    if (!valid) {
        inputField.style.boxShadow = "0 0 5px red";
        const errorMsg = document.getElementById("phone-error");
        if (errorMsg) {
            errorMsg.style.display = "inline";
            errorMsg.style.marginTop = "2px";
        }
    } else {
        inputField.style.boxShadow = "none";
        const errorMsg = document.getElementById("phone-error");
        if (errorMsg) {
            errorMsg.style.display = "none";
            errorMsg.style.marginTop = "0";
        }
    }
});

const nameField = document.getElementById("name");

nameField.addEventListener("input", function (event) {
    if (event.target.value.length === 0) {
        nameField.style.boxShadow = "0 0 5px red";
    } else {
        nameField.style.boxShadow = "none";
    }
});

const mailField = document.getElementById("email");

mailField.addEventListener("input", function (event) {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0 || !emailRegex.test(email)) {
        mailField.style.boxShadow = "0 0 5px red";
        const errorMsg = document.getElementById("email-error");
        if (errorMsg) {
            errorMsg.style.display = "inline";
            errorMsg.style.marginTop = "2px";
        }
    } else {
        mailField.style.boxShadow = "none";
        const errorMsg = document.getElementById("email-error");
        if (errorMsg) {
            errorMsg.style.display = "none";
        }
    }
});
