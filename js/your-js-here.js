// JavaScript Document
document.addEventListener("DOMContentLoaded", () => {
    const navButton = document.querySelector("button[aria-controls='main-nav']");
    const nav = document.getElementById("main-nav");
    nav.setAttribute("aria-hidden", "false");
    navButton.setAttribute("aria-expanded", "true");
    navButton.addEventListener("click", ()=>{
        const isExpanded = navButton.getAttribute("aria-expanded") === "true";
        navButton.setAttribute("aria-expanded", !isExpanded);
        nav.setAttribute("aria-hidden", isExpanded);
    });

    const modal = document.getElementById("modal");
    const modalTrigger = document.querySelector(".modal-trigger");
    const closeModalButton = document.querySelector(".close-modal");
    const overlay = document.querySelector(".overlay");

    const openModal = () => {
        modal.style.display ="block";
        overlay.style.display = "block";
        modalTrigger.setAttribute("aria-expanded", true);
        modal.setAttribute("aria-hidden", false);
        modal.setAttribute("tabindex", "0");
        modal.focus();
    };

    const closeModal = () => {
        modal.style.display = "none";
        overlay.style.display = "none";
        modalTrigger.setAttribute("aria-expanded", false);
        modal.setAttribute("aria-hidden", true);
        modal.removeAttribute("tabindex");
        modalTrigger.focus();
    };
    modalTrigger.addEventListener("click", openModal);
    closeModalButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    modal.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            const focusableElements = modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        } else if(event.key === "Escape") {
            closeModal();
        }
    })

    const form = document.getElementById("accessible-form");
    const resultSection = document.getElementById("submission-result");
    const displayText = document.getElementById("display-text");
    const displayNumber = document.getElementById("display-number");
    const displayEmail = document.getElementById("display-email");
    const displayRadio = document.getElementById("display-radio");
    const displayComments = document.getElementById("display-comments");

    form.addEventListener("submit", (event) => {
        console.log("form loading")
        event.preventDefault();

        const textValue = document.getElementById("text-input").value;
        const numberValue = document.getElementById("number-input").value;
        const emailValue = document.getElementById("email-input").value;
        const radioValue = document.querySelector('input[name="radio-group"]:checked')?.value;
        const commentsValue = document.getElementById("multiline").value;

        displayText.textContent = `Text Input: ${textValue}`;
        displayNumber.textContent = `Number Input: ${numberValue}`;
        displayEmail.textContent = `Email Input: ${emailValue}`;
        displayRadio.textContent = `Selected Option: ${radioValue || "No selection"}`;
        displayComments.textContent = `Comments: ${commentsValue}`;

        resultSection.style.display = "block";
    })

})