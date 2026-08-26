const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


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


document.getElementById("year").textContent =
    new Date().getFullYear();