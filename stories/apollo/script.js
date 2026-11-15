/* ==========================================================
   ORBIT D3 — APOLLO 11 STORY INTERACTIONS
   Reading progress, chapter state and progressive reveals
   ========================================================== */

// The shared mission-trail script reads these seven Apollo 11 stops.
window.STORY = {
  bg: "../../assets/images/apollo/eagle-lunar-module.jpg",
  stops: [
    {
      title: "Launch: The Journey Begins",
      date: "July 16, 1969",
      text: "A Saturn V rocket launched Apollo 11 into space. Neil Armstrong, Buzz Aldrin, and Michael Collins began the journey to the Moon.",
      fact: "Eagle was the Lunar Module built to land Armstrong and Aldrin on the Moon and lift them back into lunar orbit."
    },
    {
      title: "Eagle Leaves Columbia",
      date: "July 20, 1969",
      text: "Armstrong and Aldrin traveled inside Eagle as it separated from Columbia and began its descent toward the lunar surface.",
      fact: "Michael Collins remained aboard Columbia, orbiting the Moon while Eagle descended."
    },
    {
      title: "Touchdown at Tranquility Base",
      date: "July 20, 1969",
      text: "Rocks and a crater made the planned landing area dangerous, so Armstrong guided Eagle toward safer ground. Eagle landed in the Sea of Tranquility.",
      fact: "This was the first time humans had safely landed on the Moon."
    },
    {
      title: "Exploration and Science",
      date: "July 20–21, 1969",
      text: "Armstrong became the first human to walk on the Moon, and Aldrin joined him. They collected rocks and soil, deployed a passive seismic experiment and a laser retroreflector, and gathered solar wind particles.",
      fact: "About 21.5 kilograms of lunar samples returned to Earth. The solar wind experiment's foil was also brought back for study."
    },
    {
      title: "The Final Lunar Takeoff",
      date: "July 21, 1969",
      text: "Eagle's Ascent Stage lifted Armstrong and Aldrin from the surface and carried them back toward Columbia in lunar orbit.",
      fact: "Eagle's Descent Stage stayed on the Moon and served as the launch platform for the Ascent Stage."
    },
    {
      title: "The Crew Returns Home",
      date: "July 24, 1969",
      text: "After rejoining Collins aboard Columbia, Armstrong and Aldrin returned with him to Earth. All three astronauts arrived home safely.",
      fact: "Eagle's Ascent Stage was later discarded in lunar orbit; it did not return to Earth."
    },
    {
      title: "A New View from Orbit",
      date: "2009",
      text: "NASA's Lunar Reconnaissance Orbiter photographed the Apollo 11 landing site. Eagle's Descent Stage could be identified at Tranquility Base.",
      fact: "The separately deployed laser retroreflector remained useful for measurements of the Earth–Moon distance."
    }
  ]
};

(() => {
  "use strict";

  const progress = document.querySelector(".reading-progress");
  const progressBar = document.getElementById("reading-progress-bar");
  const chapterNav = document.querySelector(".chapter-nav");
  const chapterLinks = Array.from(document.querySelectorAll("[data-chapter-link]"));
  const chapters = Array.from(document.querySelectorAll("[data-chapter]"));
  const storyStart = document.getElementById("journey");
  const storyEnd = document.querySelector(".ending");
  const mainContent = document.getElementById("main-content");
  const backToTopButton = document.getElementById("back-to-top");
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
    if (backToTopButton) {
      backToTopButton.hidden = window.scrollY < Math.max(500, window.innerHeight * 0.75);
    }
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

  backToTopButton?.addEventListener("click", () => {
    mainContent?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  });

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
