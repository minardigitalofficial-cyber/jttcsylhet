const galleryItems = document.querySelectorAll("#gallery .gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");
const counter = document.getElementById("lightboxCounter");

let currentIndex = 0;

const galleryImages = Array.from(galleryItems).map((item) => {
  return item.querySelector("img");
});

// Open Lightbox
function openLightbox(index) {
  currentIndex = index;
  updateLightbox();

  lightbox.classList.remove("hidden");
  lightbox.classList.add("flex");

  document.body.style.overflow = "hidden";
}

// Update Image
function updateLightbox() {
  lightboxImage.src = galleryImages[currentIndex].src;
  lightboxImage.alt = galleryImages[currentIndex].alt;

  counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
}

// Next Image
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateLightbox();
}

// Previous Image
function prevImage() {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;

  updateLightbox();
}

// Close Lightbox
function closeLightbox() {
  lightbox.classList.add("hidden");
  lightbox.classList.remove("flex");

  lightboxImage.src = "";
  document.body.style.overflow = "";
}

// Gallery Click
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openLightbox(index);
  });
});

// Button Events
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Outside Click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("hidden")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});
