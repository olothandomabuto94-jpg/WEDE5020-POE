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