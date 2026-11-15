/* ORBIT D3 — shared story page logic: trail map + popup + progress
   Reads mission data from window.STORY (set in each story's script.js) */
(function () {
    'use strict';

    const story = window.STORY;
    const map = document.querySelector('.trail-map');
    if (!story || !map) return;

    const stops = story.stops;
    const svg = map.querySelector('svg');
    const base = svg.querySelector('.trail-base');
    const progress = svg.querySelector('.trail-progress');
    const nodesWrap = map.querySelector('.trail-nodes');

    const dlg = document.getElementById('stop-dialog');
    const progressText = document.getElementById('progress-text');
    const stars = Array.from(document.querySelectorAll('.stars span'));
    const done = document.getElementById('trail-done');
    const prevBtn = document.getElementById('stop-prev');
    const nextBtn = document.getElementById('stop-next');
    const el = (id) => document.getElementById(id);

    /* ---- Two layouts: tall winding path (mobile) / wide wave (desktop) ---- */
    const LAYOUTS = {
        mobile: {
            viewBox: '0 0 360 940',
            d: 'M 70 50 C 330 50 330 190 180 190 C 30 190 30 330 180 330 C 330 330 330 470 180 470 C 30 470 30 610 180 610 C 330 610 330 750 180 750 C 30 750 30 890 180 890',
        },
        desktop: {
            viewBox: '0 0 1100 460',
            d: 'M 60 320 C 180 320 200 90 340 90 C 480 90 480 360 620 360 C 760 360 760 110 900 110 C 980 110 1010 200 1050 260',
        },
    };
    const desktopQuery = window.matchMedia('(min-width: 901px)');

    /* ---- Background image of the map (per mission) ---- */
    if (story.bg) map.style.setProperty('--trail-bg', 'url("' + story.bg + '")');

    /* ---- Saved progress ---- */
    const KEY = 'orbit-d3:visited:' + location.pathname;
    const visited = new Set();
    try {
        JSON.parse(localStorage.getItem(KEY) || '[]').forEach((i) => {
            if (Number.isInteger(i) && i >= 0 && i < stops.length) visited.add(i);
        });
    } catch (e) {
        /* storage not available */
    }

    function save() {
        try {
            localStorage.setItem(KEY, JSON.stringify(Array.from(visited)));
        } catch (e) {}
    }

    /* ---- Build path + nodes for the current layout ---- */
    let nodes = [];
    let lengths = [];
    let total = 0;

    function build() {
        const layout = desktopQuery.matches ? LAYOUTS.desktop : LAYOUTS.mobile;
        svg.setAttribute('viewBox', layout.viewBox);
        base.setAttribute('d', layout.d);
        progress.setAttribute('d', layout.d);

        const vb = svg.viewBox.baseVal;
        total = base.getTotalLength();
        lengths = stops.map((_, i) => (stops.length > 1 ? (total * i) / (stops.length - 1) : 0));

        nodesWrap.innerHTML = '';
        nodes = stops.map((stop, i) => {
            const p = base.getPointAtLength(lengths[i]);
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'trail-node';
            b.style.left = (p.x / vb.width) * 100 + '%';
            b.style.top = (p.y / vb.height) * 100 + '%';
            b.setAttribute('aria-label', 'Stop ' + (i + 1) + ': ' + stop.title);
            b.innerHTML = '<span class="num"></span><span class="label"></span>';
            b.querySelector('.num').textContent = i + 1;
            b.querySelector('.label').textContent = stop.title;
            b.addEventListener('click', () => openStop(i));
            nodesWrap.appendChild(b);
            return b;
        });

        render();
    }

    /* ---- Render progress ---- */
    function render() {
        nodes.forEach((n, i) => {
            n.classList.toggle('is-visited', visited.has(i));
            n.classList.remove('is-next');
        });

        const next = nodes.findIndex((_, i) => !visited.has(i));
        if (next > -1) nodes[next].classList.add('is-next');

        const last = visited.size ? Math.max.apply(null, Array.from(visited)) : -1;
        progress.style.strokeDasharray = total + ' ' + total;
        progress.style.strokeDashoffset = last < 0 ? total : total - lengths[last];

        const count = visited.size;
        progressText.textContent = count + ' of ' + stops.length + ' stops explored';

        const earned = Math.floor((count / stops.length) * 3);
        stars.forEach((s, i) => s.classList.toggle('on', i < earned));

        done.hidden = count < stops.length;
    }

    /* ---- Popup ---- */
    let current = 0;

    function openStop(i) {
        current = i;
        const s = stops[i];

        el('stop-step').textContent = 'Stop ' + (i + 1) + ' of ' + stops.length;
        el('stop-date').textContent = s.date;
        el('stop-title-text').textContent = s.title;
        el('stop-text').textContent = s.text;
        el('stop-fact').textContent = s.fact;

        prevBtn.disabled = i === 0;
        nextBtn.textContent = i === stops.length - 1 ? 'Finish ✓' : 'Next →';

        visited.add(i);
        save();
        render();

        if (!dlg.open) {
            if (typeof dlg.showModal === 'function') dlg.showModal();
            else dlg.setAttribute('open', '');
        }
    }

    function closeStop() {
        if (typeof dlg.close === 'function') dlg.close();
        else dlg.removeAttribute('open');
    }

    prevBtn.addEventListener('click', () => {
        if (current > 0) openStop(current - 1);
    });
    nextBtn.addEventListener('click', () => {
        if (current < stops.length - 1) openStop(current + 1);
        else closeStop();
    });
    el('stop-close').addEventListener('click', closeStop);
    dlg.addEventListener('click', (e) => {
        if (e.target === dlg) closeStop();
    });

    /* ---- Reset ---- */
    el('trail-reset').addEventListener('click', () => {
        visited.clear();
        save();
        render();
    });

    desktopQuery.addEventListener('change', build);
    /* ---- Read aloud (Web Speech API) ---- */
    const listenBtn = el('stop-listen');
    const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;

    if (listenBtn && !synth) listenBtn.hidden = true;

    if (listenBtn && synth) {
        let run = 0;

        function setListening(on) {
            listenBtn.setAttribute('aria-pressed', String(on));
            listenBtn.classList.toggle('is-speaking', on);
            listenBtn.querySelector('.label').textContent = on ? 'Stop' : 'Listen';
            listenBtn.querySelector('.icon').textContent = on ? '⏹' : '🔊';
        }

        function stopSpeech() {
            run++;
            synth.cancel();
            setListening(false);
        }

        function pickVoice() {
            const voices = synth.getVoices();
            return voices.find((v) => /^en[-_]/i.test(v.lang) && /google|natural|aria|jenny|samantha/i.test(v.name)) || voices.find((v) => /^en/i.test(v.lang)) || null;
        }

        function speak() {
            const text = [el('stop-title-text').textContent + '.', el('stop-text').textContent, 'Did you know? ' + el('stop-fact').textContent].join(' ');

            // sentence by sentence (long text cuts off in some browsers)
            const chunks = text.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [text];
            const id = ++run;
            synth.cancel();
            const voice = pickVoice();
            setListening(true);

            // small delay: Chrome can stay silent if speak() runs right after cancel()
            setTimeout(() => {
                if (id !== run) return;
                chunks.forEach((chunk, i) => {
                    const u = new SpeechSynthesisUtterance(chunk.trim());
                    u.lang = 'en-US';
                    u.rate = 0.95;
                    if (voice) u.voice = voice;
                    if (i === chunks.length - 1)
                        u.onend = () => {
                            if (id === run) setListening(false);
                        };
                    u.onerror = () => {
                        if (id === run) setListening(false);
                    };
                    synth.speak(u);
                });
            }, 80);
        }

        listenBtn.addEventListener('click', () => {
            if (listenBtn.classList.contains('is-speaking')) stopSpeech();
            else speak();
        });

        // stop when the popup changes or closes
        prevBtn.addEventListener('click', stopSpeech);
        nextBtn.addEventListener('click', stopSpeech);
        el('stop-close').addEventListener('click', stopSpeech);
        dlg.addEventListener('close', stopSpeech);
        window.addEventListener('pagehide', stopSpeech);
    }

    build();
})();
