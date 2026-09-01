const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


// Mobile navigation
if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("active");

        }
    );


    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove("active");

                }
            );

        });

}


// Dynamic copyright year
const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}