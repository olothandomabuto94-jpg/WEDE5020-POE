// Select all buttons with the class "accordion-button"
let buttons = document.querySelectorAll(".accordion-button");


// Add an event listener to every accordion button (replaces the two separate listeners,
// so any number of accordion sections works, and pages without an accordion cause no error)
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        // Same behaviour as before: toggle the "open" class on the panel after the button
        let panel = button.nextElementSibling;
        panel.classList.toggle("open");

        // Let screen readers know whether this section is now open or closed
        button.setAttribute("aria-expanded", panel.classList.contains("open"));
    });
});


// ---------- Gallery with lightbox (about page) ----------

// Select all gallery thumbnails and the lightbox overlay
let galleryItems = document.querySelectorAll(".gallery-item");
let lightbox = document.getElementById("lightbox");
let currentIndex = 0;

// Only run this code on pages that actually have a gallery
if (galleryItems.length > 0 && lightbox) {

    // Select the parts inside the lightbox
    let lightboxImage = lightbox.querySelector(".lightbox-image");
    let lightboxCaption = lightbox.querySelector(".lightbox-caption");
    let closeButton = lightbox.querySelector(".lightbox-close");
    let prevButton = lightbox.querySelector(".lightbox-prev");
    let nextButton = lightbox.querySelector(".lightbox-next");

    // Remembers which thumbnail was clicked so focus can return to it when the lightbox closes
    let lastFocused = null;

    // Show the image at the given position, wrapping around at either end
    let showImage = function (index) {
        if (index < 0) {
            index = galleryItems.length - 1;
        }
        if (index >= galleryItems.length) {
            index = 0;
        }
        currentIndex = index;

        let thumbnail = galleryItems[index].querySelector("img");
        lightboxImage.src = thumbnail.src;
        lightboxImage.alt = thumbnail.alt;
        lightboxCaption.textContent = (index + 1) + " / " + galleryItems.length + " - " + thumbnail.alt;
    };

    // Open the lightbox on the chosen image
    let openLightbox = function (index) {
        lastFocused = document.activeElement;
        showImage(index);
        lightbox.classList.add("open");
        document.body.classList.add("no-scroll");
        closeButton.focus();
    };

    // Close the lightbox and hand focus back to the thumbnail that opened it
    let closeLightbox = function () {
        lightbox.classList.remove("open");
        document.body.classList.remove("no-scroll");
        if (lastFocused) {
            lastFocused.focus();
        }
    };

    // Clicking a thumbnail opens the lightbox on that image
    galleryItems.forEach(function (item, index) {
        item.addEventListener("click", function () {
            openLightbox(index);
        });
    });

    // Close, previous and next buttons
    closeButton.addEventListener("click", closeLightbox);

    prevButton.addEventListener("click", function () {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        showImage(currentIndex + 1);
    });

    // Clicking the dark area around the image also closes the lightbox
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard support: Escape closes, arrow keys move between images, Tab stays inside the lightbox
    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("open")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        } else if (event.key === "Tab") {
            let focusable = [closeButton, prevButton, nextButton];
            let position = focusable.indexOf(document.activeElement);

            if (event.shiftKey && position <= 0) {
                event.preventDefault();
                focusable[focusable.length - 1].focus();
            } else if (!event.shiftKey && (position === -1 || position === focusable.length - 1)) {
                event.preventDefault();
                focusable[0].focus();
            }
        }
    });
}