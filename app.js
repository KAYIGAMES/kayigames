// Header scroll efekti
const header = document.getElementById("header");
const onScroll = () => {
  if (window.scrollY > 14) header.classList.add("is-scrolled");
  else header.classList.remove("is-scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobil menü
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    // display kontrolü (CSS class yoksa)
    mobileNav.style.display = open ? "block" : "none";
  });

  mobileNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileNav.classList.remove("is-open");
      mobileNav.style.display = "none";
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Yıl
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// Modal (Geri Bildirim)
const modal = document.getElementById("modal");
const feedbackBtn = document.getElementById("feedbackBtn");
const modalClose = document.getElementById("modalClose");
const modalX = document.getElementById("modalX");

const openModal = () => {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};
const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

if (feedbackBtn) feedbackBtn.addEventListener("click", openModal);
if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalX) modalX.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Demo form gönderimleri
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mesaj alındı (demo). Bunu daha sonra e-posta/CRM/Backend’e bağlayabiliriz.");
    contactForm.reset();
  });
}

const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Geri bildirim alındı (demo). Teşekkürler!");
    feedbackForm.reset();
    closeModal();
  });
}

// LOGO LIGHTBOX
(function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (!lightbox || !lightboxImg) return;

  const openLightbox = (src) => {
    lightboxImg.src = src;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };

  // Logoya tıklayınca aç
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".zoomable-logo");
    if (!img) return;

    const full = img.getAttribute("data-full") || img.getAttribute("src");
    if (full) openLightbox(full);
  });

  // Kapatma: X veya backdrop
  lightbox.addEventListener("click", (e) => {
    const shouldClose = e.target.getAttribute("data-close") === "true";
    if (shouldClose) closeLightbox();
  });

  // ESC ile kapat
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });

  // İstersen dışarıdan kapatmak için global yap:
  window.closeLightbox = closeLightbox;
})();
