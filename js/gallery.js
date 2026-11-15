/* ORBIT D3 — hero photo slideshow (reads window.STORY.gallery) */
(function () {
    'use strict';

    const fig = document.getElementById('story-gallery');
    const data = window.STORY && window.STORY.gallery;
    if (!fig || !data || !data.length) return;

    const DELAY = 3000; // ms
    const stage = fig.querySelector('.gallery-stage');
    const caption = fig.querySelector('.gallery-caption');
    const dotsWrap = fig.querySelector('.gallery-dots');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let slides = []; // { el, item }
    let index = 0;
    let timer = null;

    stage.innerHTML = '';

    data.forEach((item, i) => {
        const img = document.createElement('img');
        img.alt = item.alt || '';
        img.decoding = 'async';
        img.loading = i === 0 ? 'eager' : 'lazy';
        img.src = item.src;
        // broken image: remove it from the slideshow
        img.addEventListener('error', () => {
            const pos = slides.findIndex((s) => s.el === img);
            if (pos === -1) return;
            slides.splice(pos, 1);
            img.remove();
            if (index >= slides.length) index = 0;
            buildDots();
            show(index);
        });
        stage.appendChild(img);
        slides.push({ el: img, item });
    });

    function buildDots() {
        dotsWrap.innerHTML = '';
        dotsWrap.hidden = slides.length <= 1;
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'gallery-dot';
            b.setAttribute('aria-label', 'Show photo ' + (i + 1) + ' of ' + slides.length);
            b.addEventListener('click', () => {
                show(i);
                restart();
            });
            dotsWrap.appendChild(b);
        });
    }

    function show(i) {
        if (!slides.length) return;
        index = (i + slides.length) % slides.length;
        slides.forEach((s, n) => s.el.classList.toggle('is-active', n === index));
        caption.textContent = slides[index].item.caption || '';
        Array.from(dotsWrap.children).forEach((d, n) => {
            if (n === index) d.setAttribute('aria-current', 'true');
            else d.removeAttribute('aria-current');
        });
    }

    function start() {
        if (timer || slides.length < 2 || reduceMotion.matches || document.hidden) return;
        timer = setInterval(() => show(index + 1), DELAY);
    }
    function stop() {
        clearInterval(timer);
        timer = null;
    }
    function restart() {
        stop();
        start();
    }

    ['mouseenter', 'focusin', 'touchstart'].forEach((ev) => fig.addEventListener(ev, stop, { passive: true }));
    ['mouseleave', 'focusout', 'touchend'].forEach((ev) => fig.addEventListener(ev, start, { passive: true }));
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else start();
    });

    buildDots();
    show(0);
    start();
})();
