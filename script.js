const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("active");
        menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
        });
    });
}

// Dynamic copyright year
const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}

// Highlight active navigation link while scrolling on the homepage
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navAnchors.forEach(function (anchor) {
                        anchor.classList.toggle(
                            "active",
                            anchor.getAttribute("href") === "#" + id
                        );
                    });
                }
            });
        },
        { rootMargin: "-42% 0px -52% 0px" }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
}
