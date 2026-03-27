let selectedCourse = null;
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxXjgYaKKd6-JK5mvwYKLoEqSnDQ8XAs9-t5n52iWL3h1U-HA9ZxwyE99BV2LXsafFfaw/exec";


const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

fetch('/_data/courses.json')
    .then(res => res.json())
    .then(data => {
        const lang = "ar";
        const content = data.courses.find(c => c.id === courseId);
        if (content && content["ar"]) {
            selectedCourse = content["ar"];
            document.getElementById("title").textContent = 'احجز في " ' + selectedCourse.title + '"' ;
            document.getElementById("image").src = content.thumbnail;
        } else {
            selectedCourse = null;
        }
    });


document.getElementById("book-course-form").addEventListener("submit", async function(e) {
    e.preventDefault();
    const formData = {
        course: selectedCourse.title,
        name: e.target.elements.name.value,
        email: e.target.elements.email.value,
        phoneNumber: e.target.elements.phoneNumber.value,
        courses: e.target.elements.courses.value,
        booksRead: e.target.elements.booksRead.value,
        therapist: e.target.elements.therapist.value,
        job: e.target.elements.job.value,
        kids: e.target.elements.kids.value,
        kidProblems: e.target.elements.kidProblems.value
    };
    try{
        await(fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(formData)
        }));
        document.getElementById("book-course-result").innerHTML = `<div class="alert alert-success text-center" role="alert">تم التسجيل بنجاح ✅</div>`
        e.target.reset();
    }catch(error){
        document.getElementById("book-course-result").innerHTML = `<div class="alert alert-danger text-center" role="alert">حدث خطأ ما عند التسجيل ❌</div>`
    }
        })

// Select the input element
const inputField = document.getElementById('phoneNumber');

// Add the input event listener
inputField.addEventListener('input', function(event) {

  var valid = /^[0-9\u0660-\u0669\u06F0-\u06F9]*$/.test(event.target.value);
  if (!valid) {
    inputField.style.boxShadow = '0 0 5px red';
    var errorMsg = document.getElementById('phone-error');
    if (errorMsg) {
      errorMsg.style.display = 'inline';
      errorMsg.style.marginTop = '2px';
    }
    // event.target.value = event.target.value.replace(/[^0-9\u0660-\u0669\u06F0-\u06F9]/g, '');
  }
  else{
    inputField.style.boxShadow = 'none';
    var errorMsg = document.getElementById('phone-error');
    if (errorMsg) {
      errorMsg.style.display = 'none';
      errorMsg.style.marginTop = '0';
    }
  }
});

const nameField = document.getElementById('name');

nameField.addEventListener('input', function(event) {
    if(event.target.value.length === 0){
        nameField.style.boxShadow = '0 0 5px red';
    }else{
        nameField.style.boxShadow = 'none';
    }

});

const mailField = document.getElementById('email');

mailField.addEventListener('input', function(event) {
    const email = event.target.value;
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.length === 0 || !emailRegex.test(email)){
        mailField.style.boxShadow = '0 0 5px red';
        var errorMsg = document.getElementById('email-error');
        if (errorMsg) {
            errorMsg.style.display = 'inline';
            errorMsg.style.marginTop = '2px';
        }
    }else{
        mailField.style.boxShadow = 'none';
        var errorMsg = document.getElementById('email-error');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
    }
});
