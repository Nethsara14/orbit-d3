/* ORBIT D3 — Mission cards: pagination dots + auto-scroll
   Desktop: 3 cards per page (carousel only when more than 3 cards)
   Mobile : 1 card per page */
(function () {
    const cards = document.querySelector('.cards');
    if (!cards) return;

    const items = Array.from(cards.querySelectorAll('.card'));
    if (items.length < 2) return;

    const AUTO_DELAY = 4000; // ms
    const DESKTOP_VIEW = 3; // cards visible at once on desktop
    const mobile = window.matchMedia('(max-width: 800px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'cards-dots';
    dotsWrap.setAttribute('role', 'group');
    dotsWrap.setAttribute('aria-label', 'Choose mission cards');
    cards.insertAdjacentElement('afterend', dotsWrap);

    let perView = DESKTOP_VIEW;
    let pages = 1;
    let dots = [];
    let timer = null;

    /* ---------- Build / rebuild ---------- */
    function build() {
        perView = mobile.matches ? 1 : DESKTOP_VIEW;
        pages = Math.ceil(items.length / perView);

        cards.classList.toggle('is-carousel', !mobile.matches && items.length > DESKTOP_VIEW);
        cards.scrollTo({ left: 0 });

        dotsWrap.innerHTML = '';
        dots = [];
        for (let p = 0; p < pages; p++) {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'cards-dot';
            b.setAttribute('aria-label', `Show page ${p + 1} of ${pages}`);
            b.addEventListener('click', () => {
                goTo(p);
                restart();
            });
            dotsWrap.appendChild(b);
            dots.push(b);
        }
        dotsWrap.hidden = pages <= 1;
        updateDots();
    }

    /* ---------- Helpers ---------- */
    function padLeft() {
        return parseFloat(getComputedStyle(cards).paddingLeft) || 0;
    }

    function nearestIndex() {
        const base = cards.getBoundingClientRect().left + padLeft();
        let best = 0,
            bestDist = Infinity;
        items.forEach((item, i) => {
            const d = Math.abs(item.getBoundingClientRect().left - base);
            if (d < bestDist) {
                bestDist = d;
                best = i;
            }
        });
        return best;
    }

    function activePage() {
        const scrollable = cards.scrollWidth > cards.clientWidth + 4;
        if (scrollable && cards.scrollLeft + cards.clientWidth >= cards.scrollWidth - 4) {
            return pages - 1;
        }
        return Math.min(pages - 1, Math.round(nearestIndex() / perView));
    }

    function updateDots() {
        const a = activePage();
        dots.forEach((d, i) => {
            if (i === a) d.setAttribute('aria-current', 'true');
            else d.removeAttribute('aria-current');
        });
    }

    function goTo(page) {
        const idx = Math.max(0, Math.min(page * perView, items.length - perView));
        const delta = items[idx].getBoundingClientRect().left - cards.getBoundingClientRect().left - padLeft();
        cards.scrollTo({ left: cards.scrollLeft + delta, behavior: 'smooth' });
    }

    /* ---------- Auto-scroll ---------- */
    function tick() {
        if (document.hidden || pages <= 1) return;
        goTo((activePage() + 1) % pages);
    }

    function start() {
        if (timer || reduceMotion.matches || pages <= 1 || document.hidden) return;
        timer = setInterval(tick, AUTO_DELAY);
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }

    function restart() {
        stop();
        start();
    }

    /* ---------- Events ---------- */
    let ticking = false;
    cards.addEventListener(
        'scroll',
        () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                updateDots();
                ticking = false;
            });
        },
        { passive: true },
    );

    [cards, dotsWrap].forEach((el) => {
        ['touchstart', 'mouseenter', 'focusin'].forEach((ev) => el.addEventListener(ev, stop, { passive: true }));
        ['touchend', 'touchcancel', 'mouseleave', 'focusout'].forEach((ev) => el.addEventListener(ev, start, { passive: true }));
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else start();
    });

    mobile.addEventListener('change', () => {
        stop();
        build();
        start();
    });
    reduceMotion.addEventListener('change', () => {
        stop();
        start();
    });

    build();
    start();
})();
