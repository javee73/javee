const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const modal = document.getElementById("certificateModal");
const modalTitle = document.getElementById("modalTitle");
const certificatePreview = document.getElementById("certificatePreview");
const openCertificate = document.getElementById("openCertificate");
const modalClose = document.getElementById("modalClose");

function closeCertificateModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  certificatePreview.innerHTML = "";
}

document.querySelectorAll(".certificate-row").forEach((row) => {
  row.addEventListener("click", () => {
    const file = row.dataset.certificate;
    const title = row.dataset.title;
    const extension = file.split(".").pop().toLowerCase();
    modalTitle.textContent = title;
    openCertificate.href = file;
    certificatePreview.innerHTML = "";

    if (extension === "pdf") {
      const frame = document.createElement("iframe");
      frame.src = file;
      frame.title = title;
      certificatePreview.appendChild(frame);
    } else {
      const image = document.createElement("img");
      image.src = file;
      image.alt = title + " certificate";
      image.onerror = () => {
        certificatePreview.innerHTML = '<p>Certificate file not found yet.<br>Add your image to <code>assets/certificates/</code> using the filename shown in SETUP.md.</p>';
      };
      certificatePreview.appendChild(image);
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  });
});

modalClose.addEventListener("click", closeCertificateModal);
modal.querySelectorAll("[data-close-modal]").forEach((item) => item.addEventListener("click", closeCertificateModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeCertificateModal();
});

// Contact form: set your Formspree endpoint in the HTML form action before publishing.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const endpoint = contactForm.getAttribute("action");
  if (!endpoint || endpoint.includes("YOUR_FORMSPREE_ID")) {
    formStatus.textContent = "Email delivery is not configured yet. Follow SETUP.md to add your Formspree form endpoint.";
    formStatus.className = "form-status status-warning";
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formStatus.textContent = "";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });
    if (response.ok) {
      contactForm.reset();
      formStatus.textContent = "Thank you! Your message has been sent successfully.";
      formStatus.className = "form-status status-success";
    } else {
      formStatus.textContent = "Message could not be sent. Please try again or email me directly.";
      formStatus.className = "form-status status-warning";
    }
  } catch (error) {
    formStatus.textContent = "Network error. Please try again or email me directly.";
    formStatus.className = "form-status status-warning";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send Message <span>↗</span>';
  }
});

// Highlight the current section in the navigation.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}
