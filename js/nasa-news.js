/* ORBIT D3 — live NASA photos via the NASA Image and Video Library API (no key needed) */
(function () {
    'use strict';

    const grid = document.getElementById('news-grid');
    const statusEl = document.getElementById('news-status');
    if (!grid || !statusEl) return;

    const API = 'https://images-api.nasa.gov/search';
    const TOPICS = ['mars', 'moon'];
    const SHOW = 6;
    const CACHE_KEY = 'orbit-d3:nasa-news:v1';
    const CACHE_MS = 60 * 60 * 1000; // 1 hour
    const FROM_YEAR = new Date().getFullYear() - 1;

    function endpoint(q) {
        return (
            API +
            '?' +
            new URLSearchParams({
                q: q,
                media_type: 'image',
                year_start: String(FROM_YEAR),
                page_size: '12',
            })
        );
    }

    async function fetchTopic(q) {
        const res = await fetch(endpoint(q));
        if (!res.ok) throw new Error('NASA API ' + res.status);
        const json = await res.json();
        return (json.collection && json.collection.items) || [];
    }

    function normalise(item) {
        const d = (item.data && item.data[0]) || {};
        const link = (item.links && item.links[0]) || {};
        return {
            id: d.nasa_id,
            title: d.title || 'NASA image',
            desc: (d.description || '').replace(/<[^>]*>/g, '').trim(),
            date: d.date_created,
            thumb: link.href,
        };
    }

    async function load() {
        try {
            const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
            if (cached && Date.now() - cached.t < CACHE_MS) return cached.items;
        } catch (e) {
            /* ignore */
        }

        const lists = await Promise.all(TOPICS.map(fetchTopic));
        const seen = new Set();
        const items = [].concat
            .apply([], lists)
            .map(normalise)
            .filter((x) => x.id && x.thumb && !seen.has(x.id) && seen.add(x.id))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, SHOW);

        try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), items: items }));
        } catch (e) {
            /* ignore */
        }
        return items;
    }

    function shorten(text, max) {
        return text.length > max ? text.slice(0, max).replace(/\s+\S*$/, '') + '…' : text;
    }

    function render(items) {
        grid.innerHTML = '';
        items.forEach((it) => {
            const card = document.createElement('article');
            card.className = 'news-card';

            const thumb = document.createElement('div');
            thumb.className = 'news-thumb';
            const img = document.createElement('img');
            img.src = it.thumb;
            img.alt = it.title;
            img.loading = 'lazy';
            img.addEventListener('error', () => img.remove());
            thumb.appendChild(img);

            const body = document.createElement('div');
            body.className = 'news-body';

            const date = document.createElement('time');
            date.className = 'news-date';
            date.dateTime = it.date;
            date.textContent = new Date(it.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });

            const h3 = document.createElement('h3');
            const a = document.createElement('a');
            a.href = 'https://images.nasa.gov/details/' + encodeURIComponent(it.id);
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = it.title;
            const hidden = document.createElement('span');
            hidden.className = 'sr-only';
            hidden.textContent = ' (opens in a new tab)';
            a.appendChild(hidden);
            h3.appendChild(a);

            const p = document.createElement('p');
            p.textContent = shorten(it.desc, 120);

            body.append(date, h3, p);
            card.append(thumb, body);
            grid.appendChild(card);
        });
    }

    load()
        .then((items) => {
            if (!items.length) throw new Error('empty');
            render(items);
            statusEl.hidden = true;
        })
        .catch(() => {
            statusEl.textContent = 'NASA updates could not load right now. You can browse them directly at images.nasa.gov.';
        });
})();
