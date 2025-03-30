document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const coursesContainer = document.getElementById("courses-container");
    const addCourseBtn = document.getElementById("add-course-btn");
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("preview-image");

    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            previewImage.src = URL.createObjectURL(file);
        }
    });

    function addCourse(abbr = "", name = "", why = "") {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course-entry");

        // Course abbreviation & number
        const abbrInput = document.createElement("input");
        abbrInput.type = "text";
        abbrInput.placeholder = "Course code: e.g. ITIS 3135";
        abbrInput.required = true;
        abbrInput.name = "course-abbr[]";
        abbrInput.value = abbr;

        // Course name
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "Course Name";
        nameInput.required = true;
        nameInput.name = "course-name[]";
        nameInput.value = name;

        // Why taking the course
        const whyInput = document.createElement("input");
        whyInput.type = "text";
        whyInput.placeholder = "Why this course?";
        whyInput.required = true;
        whyInput.name = "course-why[]";
        whyInput.value = why;

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            coursesContainer.removeChild(courseDiv);
        });

        courseDiv.appendChild(abbrInput);
        courseDiv.appendChild(nameInput);
        courseDiv.appendChild(whyInput);
        courseDiv.appendChild(deleteBtn);
        coursesContainer.appendChild(courseDiv);
    }

    // Add 5 default courses on page load
    const defaultCourses = [
        ["ITSC 3146", "Intro to Operating Systems and Networking", "Required for my major, seems like it has some cool topics."],
        ["ITSC 2175", "Logic and Algorithms", "Required for my major, fortunately I like math."],
        ["ITIS 3135", "Web-Based App Design and Dev", "Required for my major, but I am excited to learn web design!"],
        ["STAT 3110", "Applied Regression", "Required for my minor, one of the few advanced classes that doesn’t require Calculus 3."],
        ["HONR 3700", "Honors Civil Rights Cinematic Chronology", "Required for my honors program, and I really like the professor."]
    ];
    defaultCourses.forEach(([abbr, name, why]) => addCourse(abbr, name, why));

    addCourseBtn.addEventListener("click", function () {
        addCourse(); // Adds a blank course when button is clicked
    });

    form.addEventListener("reset", function () {
        setTimeout(() => {
            const resultContainer = document.getElementById("result-container");
            if (resultContainer) {
                resultContainer.remove();
            }
        }, 0);
    });

    function validateForm() {
        const requiredFields = ["name", "mascot", "image-caption", "personal-background", "professional-background", "academic-background", "web-dev-background", "computer-platform"];
        for (let field of requiredFields) {
            if (!document.getElementById(field).value.trim()) {
                alert(`Please fill out the ${field.replace(/-/g, " ")} field.`);
                return false;
            }
        }

        const imageInput = document.getElementById("image");
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
                alert("Image must be a PNG or JPG file.");
                return false;
            }
        }

        if (!document.getElementById("understand-checkbox").checked) {
            alert("You must acknowledge the disclaimer.");
            return false;
        }
        return true;
    }

    function displayResults() {
        const formData = new FormData(form);
        const imageInput = document.getElementById("image");
        const previewImage = document.getElementById("preview-image");

        // Check if a file was uploaded, otherwise use the default image
        let imageSrc = previewImage.src;
        if (imageInput.files.length > 0) {
            imageSrc = URL.createObjectURL(imageInput.files[0]);
        }

        const abbrs = formData.getAll("course-abbr[]");
        const names = formData.getAll("course-name[]");
        const whys = formData.getAll("course-why[]");

        const coursesList = abbrs.map((abbr, index) => {
            return `<li><strong>${abbr} ${names[index]}:</strong> ${whys[index]}</li>`;
        }).join("");

        const resultContainer = document.createElement("div");
        resultContainer.id = "result-container";

        resultContainer.innerHTML = `
            <h3>${formData.get("name")} | ${formData.get("mascot")}</h3>
            <figure>
                <img src="${imageSrc}" alt="${formData.get("image-caption")}">
                <figcaption><em>${formData.get("image-caption")}</em></figcaption>
            </figure>
            <div class="bullet-points">
            <ul>
            <li><strong>Personal Background:</strong> ${formData.get("personal-background")}</li>
            <li><strong>Professional Background:</strong> ${formData.get("professional-background")}</li>
            <li><strong>Academic Background:</strong> ${formData.get("academic-background")}</li>
            <li><strong>Background in Web Development:</strong> ${formData.get("web-dev-background")}</li>
            <li><strong>Primary Computer Platform:</strong> ${formData.get("computer-platform")}</li>
            <li><strong>Courses:</strong></li>
                <ul>
                    ${coursesList}
                </ul>
            <li><strong>Funny Thing:</strong> ${formData.get("funny-thing")}</li>
            <li><strong>Anything Else:</strong> ${formData.get("anything-else")}</li>
            </ul>
            </div>
            <button onclick="location.reload()">Reset</button>
        `;

        form.replaceWith(resultContainer);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!validateForm()) return;
        displayResults();
    });

    document.getElementById("resetButton").addEventListener("click", function () {
        form.reset(); // Resets default values
        document.querySelectorAll("form input").forEach((input) => input.value = ""); // Clears everything
        document.getElementById("courses-container").innerHTML = ""; // Removes all dynamically added courses
    });
});
