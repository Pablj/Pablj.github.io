/* ============================================================
   script.js — Pablo Cruz Portfolio
   Path: assets/js/script.js
   ============================================================ */

'use strict';

/* ── 1. NAV — shrink on scroll + active link highlight ── */
(function initNav() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id], div[id]');

    function onScroll() {
        // Shrink nav
        if (window.scrollY > 60) {
            navbar.classList.add('shrunk');
        } else {
            navbar.classList.remove('shrunk');
        }

        // Highlight active nav link based on section in view
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
})();


/* ── 2. MOBILE DRAWER ── */
(function initDrawer() {
    const burger  = document.getElementById('navBurger');
    const drawer  = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const close   = document.getElementById('drawerClose');

    if (!burger || !drawer) return;

    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('show');
        burger.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('show');
        burger.classList.remove('open');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', openDrawer);
    close.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Close on any drawer link click
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
})();


/* ── 3. SCROLL REVEAL ── */
(function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings that enter at the same time
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
})();


/* ── 4. SMOOTH ANCHOR SCROLL (offset for fixed nav) ── */
(function initSmoothScroll() {
    const navHeight = () => document.getElementById('navbar')?.offsetHeight || 64;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight();
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();


/* ── 5. CONTACT FORM ── */
(function initContactForm() {
    const form   = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name    = form.querySelector('#cname')?.value.trim();
        const email   = form.querySelector('#cemail')?.value.trim();
        const message = form.querySelector('#message')?.value.trim();

        // Basic validation
        if (!name || !email || !message) {
            setStatus('Por favor completa los campos requeridos.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            setStatus('Ingresa un email válido.', 'error');
            return;
        }

        // Simulate send (replace with actual API/EmailJS/Formspree endpoint)
        const submitBtn = form.querySelector('.form-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        setTimeout(() => {
            setStatus('¡Mensaje enviado! Te responderé a la brevedad.', 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar mensaje →';
        }, 1200);
    });

    function setStatus(msg, type) {
        status.textContent = msg;
        status.className = 'form-status ' + type;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
})();


/* ── 6. CURSOR GLOW (desktop only) ── */
(function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: left 0.12s ease, top 0.12s ease;
        will-change: left, top;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top  = e.clientY + 'px';
    });
})();
