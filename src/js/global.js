const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const scrollSentinel = document.createElement("div");
  scrollSentinel.setAttribute("aria-hidden", "true");
  scrollSentinel.className = "site-header-scroll-sentinel";
  siteHeader.before(scrollSentinel);

  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      siteHeader.classList.toggle("is-shrunk", !entry.isIntersecting);
    },
    { threshold: 0 },
  );

  headerObserver.observe(scrollSentinel);
}
