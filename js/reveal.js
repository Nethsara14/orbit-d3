/* ORBIT D3 — scroll reveal: sections fade in slowly when they enter the screen */
(function () {
    'use strict';

    if (!('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll('.trail-head, .trail-map, .legacy-content, .legacy-card, .story-text, #more-title, .more-links');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    targets.forEach((el, i) => {
        el.classList.add('reveal');
        /* එකම row එකේ items දෙකක් නම් දෙවැන්න ටිකක් පරක්කු වෙනවා */
        if (el.classList.contains('legacy-card')) el.style.transitionDelay = '.15s';
        observer.observe(el);
    });
})();
