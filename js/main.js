
document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE NAVIGATION MENU

    const menuToggle = document.getElementById("menuToggle");
    const mainNavbar = document.getElementById("mainNavbar");

    if (menuToggle && mainNavbar) {

        function closeMenu() {
            mainNavbar.classList.remove("show-menu");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

        menuToggle.addEventListener("click", function () {
            const isOpen =
                mainNavbar.classList.toggle("show-menu");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        mainNavbar.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }


    // 2. HIGHLIGHT THE CURRENT PAGE IN THE NAVIGATION

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    document.querySelectorAll(".navbar a").forEach(function (link) {
        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });


    // 3. AUTOMATIC COPYRIGHT YEAR

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 4. APPOINTMENT FORM
    // Runs only on pages that contain the form.

    const appointmentForm =
        document.getElementById("appointmentForm");

    const formMessage =
        document.getElementById("formMessage");

    const appointmentDate =
        document.getElementById("appointmentDate");

    if (appointmentForm && formMessage && appointmentDate) {

        function setMinimumDate() {
            const today = new Date();

            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");

            appointmentDate.min = `${year}-${month}-${day}`;
        }

        setMinimumDate();

        appointmentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!appointmentForm.checkValidity()) {
                appointmentForm.reportValidity();
                return;
            }

            setMinimumDate();

            if (appointmentDate.value < appointmentDate.min) {
                formMessage.textContent =
                    "Please select today or a future date.";

                formMessage.classList.add("show");
                appointmentDate.focus();
                return;
            }

            const patientName =
                document.getElementById("patientName").value.trim();

            const serviceType =
                document.getElementById("serviceType").value;

            const selectedDate = new Date(
                appointmentDate.value + "T12:00:00"
            );

            const formattedDate = selectedDate.toLocaleDateString(
                "en-NG",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

            formMessage.textContent =
                `Thank you, ${patientName}. Your request for ` +
                `${serviceType.toLowerCase()} on ${formattedDate} ` +
                "has been prepared. This is a demonstration only; " +
                "your request has not been sent to the medical centre. " +
                "Please contact the centre to confirm your appointment.";

            formMessage.classList.add("show");

            formMessage.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });
    }

});
