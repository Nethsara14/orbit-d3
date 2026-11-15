/* ==========================================================
   ORBIT D3 — APOLLO 11 STORY INTERACTIONS
   Reading progress, chapter state and progressive reveals
   ========================================================== */

(() => {
  "use strict";

  const progress = document.querySelector(".reading-progress");
  const progressBar = document.getElementById("reading-progress-bar");
  const chapterNav = document.querySelector(".chapter-nav");
  const chapterLinks = Array.from(document.querySelectorAll("[data-chapter-link]"));
  const chapters = Array.from(document.querySelectorAll("[data-chapter]"));
  const storyStart = document.getElementById("journey");
  const storyEnd = document.querySelector(".ending");
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let frameRequested = false;
  let activeChapterId = "";
  let lastProgressValue = -1;
  let revealObserver = null;

  function documentOffset(element) {
    return element.getBoundingClientRect().top + window.scrollY;
  }

  function updateReadingProgress() {
    if (!progress || !progressBar || !storyStart || !storyEnd) {
      return;
    }

    const navHeight = document.querySelector(".chapter-nav-wrap")?.offsetHeight || 0;
    const start = documentOffset(storyStart) - navHeight;
    const end = documentOffset(storyEnd) + storyEnd.offsetHeight - window.innerHeight;
    const distance = Math.max(end - start, 1);
    const amount = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
    const roundedValue = Math.round(amount * 100);

    progressBar.style.transform = `scaleX(${amount})`;

    if (roundedValue !== lastProgressValue) {
      progress.setAttribute("aria-valuenow", String(roundedValue));
      lastProgressValue = roundedValue;
    }
  }

  function centerActiveLink(link) {
    if (!chapterNav || window.innerWidth > 780) {
      return;
    }

    const left = link.offsetLeft - (chapterNav.clientWidth - link.offsetWidth) / 2;

    chapterNav.scrollTo({
      left: Math.max(0, left),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  }

  function setActiveChapter(chapterId) {
    if (chapterId === activeChapterId) {
      return;
    }

    activeChapterId = chapterId;

    chapterLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${chapterId}`;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
        centerActiveLink(link);
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveChapter() {
    if (chapters.length === 0) {
      return;
    }

    const navHeight = document.querySelector(".chapter-nav-wrap")?.offsetHeight || 0;
    const marker = navHeight + Math.min(window.innerHeight * 0.24, 190);
    const firstChapterTop = chapters[0].getBoundingClientRect().top;

    if (firstChapterTop > marker) {
      setActiveChapter("");
      return;
    }

    let nextChapterId = chapters[0].id;

    chapters.forEach((chapter) => {
      if (chapter.getBoundingClientRect().top <= marker) {
        nextChapterId = chapter.id;
      }
    });

    setActiveChapter(nextChapterId);
  }

  function updateStoryState() {
    frameRequested = false;
    updateReadingProgress();
    updateActiveChapter();
  }

  function requestStoryUpdate() {
    if (frameRequested) {
      return;
    }

    frameRequested = true;
    window.requestAnimationFrame(updateStoryState);
  }

  function showAllRevealItems() {
    document.body.classList.remove("reveal-enabled");
    revealItems.forEach((item) => item.classList.add("is-visible"));

    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }
  }

  function setupReveals() {
    if (
      revealItems.length === 0 ||
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      showAllRevealItems();
      return;
    }

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        item.classList.add("is-visible");
      }
    });

    document.body.classList.add("reveal-enabled");

    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealItems.forEach((item) => {
      if (!item.classList.contains("is-visible")) {
        revealObserver.observe(item);
      }
    });
  }

  window.addEventListener("scroll", requestStoryUpdate, { passive: true });
  window.addEventListener("resize", requestStoryUpdate);
  window.addEventListener("load", requestStoryUpdate);

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        showAllRevealItems();
      }
    });
  }

  setupReveals();
  updateStoryState();
})();
