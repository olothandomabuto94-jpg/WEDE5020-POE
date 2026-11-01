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


// ---------- Interactive map (contact page) ----------

// Select the map container. It only exists on the contact page.
let mapContainer = document.getElementById("map");

if (mapContainer) {

    if (typeof L !== "undefined") {

        // Approximate position of the Chubby Chums office in Primrose Hill, Germiston.
        // TO DO: replace these with the exact latitude and longitude of 136 Cydonia Road
        // (in Google Maps, right-click the building and click the coordinates to copy them).
        let officeLocation = [-26.19, 28.155];

        // Create the map. Scroll-wheel zoom is off so the page can still be scrolled past the map.
        let map = L.map("map", { scrollWheelZoom: false }).setView(officeLocation, 14);

        // CARTO's dark map style suits the site's black theme, but CARTO now requires a free API key.
        // Request one at https://carto.com/basemaps/apikey (email only, no account needed) and paste it
        // between the quotes below. While it is empty, the map falls back to OpenStreetMap's standard tiles,
        // which only load when the site is opened through a web address (Live Server, Netlify, GitHub Pages)
        // and NOT when the HTML file is opened by double-clicking it.
        let cartoApiKey = "cb1_4zob_1_a5da09c9a748588cf63f470e";

        // Default: OpenStreetMap tiles (the attribution is required by their licence)
        let tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
        let tileOptions = {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        };

        // If a CARTO key has been added, use CARTO's dark map instead (credit to both OpenStreetMap and CARTO)
        if (cartoApiKey !== "") {
            tileUrl = "https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=" + cartoApiKey;
            tileOptions = {
                maxZoom: 20,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            };
        }

        L.tileLayer(tileUrl, tileOptions).addTo(map);

        // Add a marker for the office with a popup that opens straight away
        let officeMarker = L.marker(officeLocation, { title: "Chubby Chums office" }).addTo(map);
        officeMarker.bindPopup(
            "<strong>Chubby Chums</strong><br>136 Cydonia Road<br>Primrose Hill, Germiston, 1401<br>Tel: (011) 825 7773"
        ).openPopup();

        // Build a "Recentre map" button with JavaScript and place it directly under the map
        let recentreButton = document.createElement("button");
        recentreButton.type = "button";
        recentreButton.className = "map-recentre";
        recentreButton.textContent = "Recentre map on our office";
        mapContainer.insertAdjacentElement("afterend", recentreButton);

        recentreButton.addEventListener("click", function () {
            let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduceMotion) {
                map.setView(officeLocation, 14);
            } else {
                map.flyTo(officeLocation, 14);
            }
            officeMarker.openPopup();
        });

    } else {
        // Leaflet did not load (for example, no internet connection): show a message instead of an empty box
        let mapMessage = document.createElement("p");
        mapMessage.className = "map-message";
        mapMessage.textContent = "The map could not be loaded right now. Please use the directions link below.";
        mapContainer.appendChild(mapMessage);
    }
}


// ---------- Dynamic "Our Impact" statistics (home page) ----------
// The whole section is built with JavaScript. The HTML page only contains an empty <section id="impact">.

let impactSection = document.getElementById("impact");

if (impactSection) {

    // The facts used for the statistics. The "years of service" figure is worked out from today's date.
    let foundedYear = 1999;
    let impactStats = [
        { value: 36, label: "Children's Homes" },
        { value: new Date().getFullYear() - foundedYear, label: "Years of Service" },
        { value: 3, label: "Directors" },
        { value: 2, label: "Regions Served" }
    ];

    // Build the heading and the row that will hold the statistic boxes
    let impactHeading = document.createElement("h2");
    impactHeading.textContent = "Our Impact";

    let impactRow = document.createElement("div");
    impactRow.className = "impact-row";

    // Keep a list of the number elements so they can be animated later
    let impactNumbers = [];

    // Create one box per statistic and add it to the row
    impactStats.forEach(function (stat) {
        let box = document.createElement("div");
        box.className = "impact-stat";
        box.setAttribute("role", "group");
        box.setAttribute("aria-label", stat.value + " " + stat.label);

        let number = document.createElement("span");
        number.className = "impact-number";
        number.setAttribute("data-target", stat.value);
        number.setAttribute("aria-hidden", "true");
        number.textContent = "0";

        let label = document.createElement("p");
        label.className = "impact-label";
        label.setAttribute("aria-hidden", "true");
        label.textContent = stat.label;

        box.appendChild(number);
        box.appendChild(label);
        impactRow.appendChild(box);
        impactNumbers.push(number);
    });

    impactSection.appendChild(impactHeading);
    impactSection.appendChild(impactRow);

    // Counts a number up from 0 to its target over 1.5 seconds
    let countUp = function (element) {
        let target = Number(element.getAttribute("data-target"));
        let duration = 1500;
        let startTime = null;

        let step = function (timestamp) {
            if (startTime === null) {
                startTime = timestamp;
            }
            let progress = Math.min((timestamp - startTime) / duration, 1);
            element.textContent = Math.floor(progress * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Shows the finished numbers straight away, with no counting animation
    let showFinalNumbers = function () {
        impactNumbers.forEach(function (number) {
            number.textContent = number.getAttribute("data-target");
        });
    };

    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        showFinalNumbers();
    } else {
        // Start counting only when the section scrolls into view
        let observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                impactNumbers.forEach(countUp);
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(impactSection);
    }
}


// ---------- Dynamic enquiry form helpers (enquiry page) ----------

let enquiryForm = document.querySelector(".enquiry-form");

if (enquiryForm) {

    let reasonSelect = enquiryForm.querySelector("#reason");
    let messageBox = enquiryForm.querySelector("#message");

    // Show an emergency notice under the drop-down when abuse or neglect is chosen, and remove it otherwise
    reasonSelect.addEventListener("change", function () {
        let oldNotice = enquiryForm.querySelector(".reason-notice");
        if (oldNotice) {
            oldNotice.remove();
        }

        if (reasonSelect.value === "abuse" || reasonSelect.value === "neglect") {
            let notice = document.createElement("div");
            notice.className = "reason-notice";
            notice.setAttribute("role", "alert");

            let noticeHeading = document.createElement("strong");
            noticeHeading.textContent = "Is the child in immediate danger?";

            let noticeText = document.createElement("p");
            noticeText.textContent = "Please contact the South African Police Service (10111) or Childline (0800 055 555) right away. Use this form for non-emergency reports.";

            notice.appendChild(noticeHeading);
            notice.appendChild(noticeText);
            reasonSelect.insertAdjacentElement("afterend", notice);
        }
    });

    // Add a live character counter under the message box
    let charCounter = document.createElement("p");
    charCounter.className = "char-counter";
    charCounter.textContent = "0 characters";
    messageBox.insertAdjacentElement("afterend", charCounter);

    messageBox.addEventListener("input", function () {
        let length = messageBox.value.length;
        charCounter.textContent = length + (length === 1 ? " character" : " characters");
    });
}


// ---------- FAQ: loaded, searched, filtered and sorted with JavaScript (enquiry page) ----------

let faqSection = document.getElementById("faq");

if (faqSection) {

    // The questions and answers. Everything shown in the list is built from this array,
    // so a new question only needs a new line here. The answers use information from this website.
    let faqData = [
        {
            category: "About Us",
            question: "What is Chubby Chums?",
            answer: "Chubby Chums is a non-profit child protection organization. It was established in 1999 to help address the needs of children left destitute by poverty, disease and abuse.",
            more: { text: "Read more about our story", href: "about.html" }
        },
        {
            category: "About Us",
            question: "Where does Chubby Chums work?",
            answer: "We primarily operate in Johannesburg and the Far East Rand Regions. What started as a two-man operation working from an enclosed verandah has grown to incorporate 36 Children's Homes.",
            more: { text: "Read about our work and history", href: "about.html" }
        },
        {
            category: "About Us",
            question: "Who does Chubby Chums work with?",
            answer: "We work in partnership with Child Protection Units and Child Treatment Services to stop child abuse, child neglect and child exploitation, and to promote the importance of early childhood development (ECD).",
            more: { text: "Read about our partnerships", href: "about.html" }
        },
        {
            category: "About Us",
            question: "Is Chubby Chums a registered organization?",
            answer: "Yes. We were registered as a Section 21 Corporation in 2000, and we are also registered as a Non-Profit Organization (NPO), Non-Government Organization (NGO) and Public Benefit Organization (PBO). Our registration numbers are listed on the Donate page.",
            more: { text: "See our registration details", href: "donate.html" }
        },
        {
            category: "About Us",
            question: "Has Chubby Chums received any awards?",
            answer: "Yes. Thanks to the kindness of our donors, Chubby Chums has received an international child protection award.",
            more: { text: "Support our work on the Donate page", href: "donate.html" }
        },
        {
            category: "Reporting a Concern",
            question: "How do I report a child I am worried about?",
            answer: "Fill in the enquiry form on this page and describe your concern. Tell us the child's name (if you know it) and their location or area, and choose the reason that fits best."
        },
        {
            category: "Reporting a Concern",
            question: "Do I need proof before I report?",
            answer: "No. You don't need proof, just a genuine concern for a child's safety. Reporting your concerns could save a child's life."
        },
        {
            category: "Reporting a Concern",
            question: "What if a child is in immediate danger?",
            answer: "Contact the South African Police Service on 10111 or Childline on 0800 055 555 right away. Please use the form on this page only for non-emergency reports and enquiries."
        },
        {
            category: "Reporting a Concern",
            question: "Will my enquiry be kept confidential?",
            answer: "Every enquiry is treated with care and confidentiality. Giving your name on the form is optional."
        },
        {
            category: "Reporting a Concern",
            question: "What happens after I send an enquiry?",
            answer: "Chubby Chums works closely with Child Protection Units and Child Treatment Services to investigate reports and get children the help they need."
        },
        {
            category: "Reporting a Concern",
            question: "What kinds of concerns can I enquire about?",
            answer: "The form covers suspected abuse, suspected neglect, poverty and basic needs, and illness or disability. Anything else can be sent under \"Other\"."
        },
        {
            category: "Donating",
            question: "How can I donate to Chubby Chums?",
            answer: "You can pay into one of our two First National Bank accounts: the Chubby Chums Trust Account or the Chubby Chums account. The full banking details are on the Donate page.",
            more: { text: "Go to our banking details", href: "donate.html" }
        },
        {
            category: "Donating",
            question: "Is Chubby Chums tax exempt?",
            answer: "We are registered as a Public Benefit Organization and have a Tax Exemption Number. Our tax and registration reference numbers are listed on the Donate page.",
            more: { text: "See our tax and registration details", href: "donate.html" }
        },
        {
            category: "Contact",
            question: "How can I contact Chubby Chums?",
            answer: "You can phone us on (011) 825 7773 or (011) 873 4747, email chubbychums02@gmail.com, or send a message using the contact form on the Contact page.",
            more: { text: "Go to the Contact page", href: "contact.html" }
        },
        {
            category: "Contact",
            question: "Where is the Chubby Chums office?",
            answer: "Our office is at 136 Cydonia Road, Primrose Hill, Germiston, 1401, South Africa. There is a map with a directions link on the Contact page.",
            more: { text: "See the map and directions", href: "contact.html" }
        }
    ];

    // Select the controls and the places where results are shown
    let faqSearch = document.getElementById("faq-search");
    let faqCategory = document.getElementById("faq-category");
    let faqSort = document.getElementById("faq-sort");
    let faqCount = document.getElementById("faq-count");
    let faqList = document.getElementById("faq-list");

    // Fill the category drop-down with each different category found in the data
    let faqCategories = [];
    faqData.forEach(function (item) {
        if (faqCategories.indexOf(item.category) === -1) {
            faqCategories.push(item.category);
        }
    });
    faqCategories.forEach(function (name) {
        let option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        faqCategory.appendChild(option);
    });

    // Adds text to an element and wraps any search words in <mark> so they stand out.
    // The text is added as text nodes (not HTML), so nothing typed into the search box can change the page.
    let addHighlightedText = function (parent, text, words) {
        if (words.length === 0) {
            parent.appendChild(document.createTextNode(text));
            return;
        }

        // Escape special characters so a search such as "(011)" is treated as plain text
        let escapedWords = words.map(function (word) {
            return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        });
        let pattern = new RegExp("(" + escapedWords.join("|") + ")", "gi");

        // Because the pattern is in brackets, the odd-numbered pieces are the matches
        text.split(pattern).forEach(function (piece, index) {
            if (index % 2 === 1) {
                let mark = document.createElement("mark");
                mark.textContent = piece;
                parent.appendChild(mark);
            } else if (piece !== "") {
                parent.appendChild(document.createTextNode(piece));
            }
        });
    };

    // Works out which questions to show, then rebuilds the list on the page
    let showFaqs = function () {
        // Split what was typed into separate words
        let words = faqSearch.value.trim().toLowerCase().split(/\s+/).filter(function (word) {
            return word !== "";
        });
        let chosenCategory = faqCategory.value;

        // Filter: keep questions in the chosen category that contain every search word
        let results = faqData.filter(function (item) {
            if (chosenCategory !== "all" && item.category !== chosenCategory) {
                return false;
            }
            let text = (item.question + " " + item.answer).toLowerCase();
            return words.every(function (word) {
                return text.indexOf(word) !== -1;
            });
        });

        // Sort: A-Z or Z-A by question (otherwise the order stays as it is in the data)
        if (faqSort.value === "az") {
            results.sort(function (a, b) {
                return a.question.localeCompare(b.question);
            });
        } else if (faqSort.value === "za") {
            results.sort(function (a, b) {
                return b.question.localeCompare(a.question);
            });
        }

        // Remove the questions that were shown before
        while (faqList.firstChild) {
            faqList.removeChild(faqList.firstChild);
        }

        // Update the "Showing x of y" message
        faqCount.textContent = "Showing " + results.length + " of " + faqData.length + " questions";

        if (results.length === 0) {
            let emptyMessage = document.createElement("p");
            emptyMessage.className = "faq-empty";
            emptyMessage.textContent = "No questions match your search. Try different words, or ask us your question using the enquiry form.";
            faqList.appendChild(emptyMessage);
            return;
        }

        // Build one expandable item for each question that matched
        results.forEach(function (item) {
            let entry = document.createElement("details");
            entry.className = "faq-item";

            // While searching, open each answer so the highlighted words can be seen
            if (words.length > 0) {
                entry.open = true;
            }

            let summary = document.createElement("summary");
            addHighlightedText(summary, item.question, words);

            let answer = document.createElement("p");
            addHighlightedText(answer, item.answer, words);

            let tag = document.createElement("span");
            tag.className = "faq-category";
            tag.textContent = item.category;

            entry.appendChild(summary);
            entry.appendChild(answer);

            // Some answers include a link to the page with more information
            if (item.more) {
                let moreParagraph = document.createElement("p");
                moreParagraph.className = "faq-more";

                let moreLink = document.createElement("a");
                moreLink.href = item.more.href;
                moreLink.textContent = item.more.text;

                moreParagraph.appendChild(moreLink);
                entry.appendChild(moreParagraph);
            }

            entry.appendChild(tag);
            faqList.appendChild(entry);
        });
    };

    // Update the list whenever the visitor types or changes a drop-down, and show it once on page load
    faqSearch.addEventListener("input", showFaqs);
    faqCategory.addEventListener("change", showFaqs);
    faqSort.addEventListener("change", showFaqs);
    showFaqs();
}
