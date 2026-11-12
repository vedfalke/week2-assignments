// ===== 1. Hamburger menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

// ===== 2. Highlight the current page in the menu =====
const page = document.body.dataset.page;
document.querySelectorAll(".nav-links a").forEach(function (link) {
  if (link.dataset.p === page) link.classList.add("active");
});

// ===== 3. Fake order tracker (home page) =====
const trackForm = document.getElementById("trackForm");
if (trackForm) {
  trackForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("trackInput").value.trim().toUpperCase();
    const result = document.getElementById("trackResult");

    if (id === "") {
      result.textContent = "Please enter an order ID.";
    } else if (id === "QD123") {
      result.textContent = "🛵 Order QD123 is on the way. Arriving in 12 minutes!";
    } else {
      result.textContent = "Order not found. Try QD123.";
    }
  });
}

// ===== 4. Contact form validation =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    let valid = true;

    // helper to show or clear an error
    function setError(input, errorId, text) {
      document.getElementById(errorId).textContent = text;
      input.classList.toggle("input-bad", text !== "");
      if (text !== "") valid = false;
    }

    // name: at least 2 characters
    setError(name, "nameError", name.value.trim().length < 2 ? "Please enter your name." : "");

    // email: simple pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError(email, "emailError", emailPattern.test(email.value.trim()) ? "" : "Please enter a valid email.");

    // message: at least 10 characters
    setError(message, "messageError", message.value.trim().length < 10 ? "Message must be at least 10 characters." : "");

    const success = document.getElementById("formSuccess");
    if (valid) {
      success.textContent = "Thanks " + name.value.trim() + "! We got your message.";
      contactForm.reset();
    } else {
      success.textContent = "";
    }
  });
}

// ===== 5. Category chips (home page) =====
const chips = document.getElementById("chips");
if (chips) {
  chips.addEventListener("click", function (e) {
    const chip = e.target.closest(".chip");
    if (!chip) return;

    // move the "active" look to the clicked chip
    chips.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    chip.classList.add("active");

    // show only matching cards
    const cat = chip.dataset.cat;
    document.querySelectorAll(".item").forEach(function (item) {
      item.classList.toggle("hide", cat !== "all" && item.dataset.cat !== cat);
    });
  });
}

// ===== 6. Address search (home page) =====
const addressForm = document.getElementById("addressForm");
if (addressForm) {
  addressForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const address = document.getElementById("addressInput").value.trim();
    const result = document.getElementById("addressResult");
    result.textContent = address === ""
      ? "Please enter your address."
      : "Great! 12 stores deliver to " + address + ".";
  });
}
