document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const coursesContainer = document.getElementById("courses-container");
    const addCourseBtn = document.getElementById("add-course-btn");
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("preview-image");
    const resetButton = document.getElementById("resetButton");
    const instructionHeader = document.getElementById("instruction-header");

    // Image preview functionality
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            previewImage.src = URL.createObjectURL(file);
        }
    });

    // Function to add a new course entry
    function addCourse(courseNumber = "", name = "", why = "") {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course-entry");

        courseDiv.innerHTML = `
            <input type="text" name="course-courseNumber[]" placeholder="Course code" required value="${courseNumber}" style="max-width: 100px;">
            <input type="text" name="course-name[]" placeholder="Course name" required value="${name}">
            <input type="text" name="course-why[]" placeholder="Why this course?" required value="${why}">
            <button type="button" class="delete-course" style="background-color: red;">X</button>
        `;
        
        courseDiv.querySelector(".delete-course").addEventListener("click", () => coursesContainer.removeChild(courseDiv));
        coursesContainer.appendChild(courseDiv);
    }

    // Default courses
    const defaultCourses = [
        ["ITSC 3146", "Intro to Operating Systems and Networking", "Required for my major, seems like it has some cool topics."],
        ["ITSC 2175", "Logic and Algorithms", "Required for my major, fortunately I like math."],
        ["ITIS 3135", "Web-Based App Design and Dev", "Required for my major, but I am excited to learn web design!"],
        ["STAT 3110", "Applied Regression", "Required for my minor, one of the few advanced classes that doesn’t require Calculus 3."],
        ["HONR 3700", "Honors Civil Rights Cinematic Chronology", "Required for my honors program, and I really like the professor."]
    ];
    defaultCourses.forEach(([courseNumber, name, why]) => addCourse(courseNumber, name, why));

    addCourseBtn.addEventListener("click", () => addCourse());

    // Reset functionality
    resetButton.addEventListener("click", function () {
        form.reset();
        previewImage.src = "./images/mepicture_reduce.jpg"; // Reset to default image
        coursesContainer.innerHTML = ""; // Clear dynamic courses
        defaultCourses.forEach(([courseNumber, name, why]) => addCourse(courseNumber, name, why));
    });

    // Validate form before submission
    function validateForm() {
        if (!document.getElementById("understand-checkbox").checked) {
            alert("You must acknowledge the disclaimer.");
            return false;
        }
        return true;
    }

    function formatFullName(firstName, middleInitial, nickname, lastName) {
        let fullName = firstName;
    
        if (nickname) {
            fullName += ` "${nickname}"`;
        }
    
        if (middleInitial) {
            fullName += ` ${middleInitial}.`;
        }
    
        fullName += ` ${lastName}`;
        return fullName;
    }

    // Display submitted data
    function displayResults() {
        const formData = new FormData(form);
        const imageSrc = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : previewImage.src;

        const firstName = formData.get("first-name").trim();
        const middleInitial = formData.get("middle-initial").trim();
        const nickname = formData.get("nickname").trim(); // Assuming nickname is stored in 'first-mascot'
        const lastName = formData.get("last-name").trim();
    
        const formattedName = formatFullName(firstName, middleInitial, nickname, lastName);

        const courses = formData.getAll("course-courseNumber[]").map((courseNumber, index) => `
            <li><strong>${courseNumber} ${formData.getAll("course-name[]")[index]}:</strong> ${formData.getAll("course-why[]")[index]}</li>
        `).join("");

        const resultContainer = document.createElement("div");
        resultContainer.id = "result-container";
        resultContainer.innerHTML = `
            <h3>${formattedName} | ${formData.get("first-mascot")} ${formData.get("last-mascot")}</h3>
            <figure>
                <img src="${imageSrc}" alt="${formData.get("image-caption")}">
                <figcaption><em>${formData.get("image-caption")}</em></figcaption>
            </figure>
            <ul>
                <li><strong>Personal Background:</strong> ${formData.get("personal-background")}</li>
                <li><strong>Professional Background:</strong> ${formData.get("professional-background")}</li>
                <li><strong>Academic Background:</strong> ${formData.get("academic-background")}</li>
                <li><strong>Background in Web Development:</strong> ${formData.get("web-dev-background")}</li>
                <li><strong>Primary Computer Platform:</strong> ${formData.get("computer-platform")}</li>
                <li><strong>Courses:</strong>
                    <ul>${courses}</ul>
                </li>
                <li><strong>Funny Thing:</strong> ${formData.get("funny-thing")}</li>
                <li><strong>Anything Else:</strong> ${formData.get("anything-else")}</li>
            </ul>
            <button onclick="location.reload()">Reset</button>
        `;

        instructionHeader.classList.add("hide");
        form.replaceWith(resultContainer);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) displayResults();
    });

    document.getElementById("resetButton").addEventListener("click", function () {
        form.reset(); // Resets default values
        document.querySelectorAll("form input").forEach((input) => input.value = ""); // Clears everything
        document.getElementById("courses-container").innerHTML = ""; // Removes all dynamically added courses
    });
});
