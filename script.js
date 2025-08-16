document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scroll-container');

    if (scrollContainer) {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
            scrollContainer.scrollTop = parseInt(scrollPosition, 10);
            sessionStorage.removeItem('scrollPosition');
        }
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('scrollPosition', scrollContainer.scrollTop);
        });
    }

    // Inicializa o AOS manualmente para controle fino
    AOS.init({
        once: true,
        offset: 50,
        startEvent: 'aos:manual-init'
    });
    document.dispatchEvent(new Event('aos:manual-init'));

    // Star Particle Animation
    const star = {
        x: 0, y: 0, radius: 0, alpha: 0, twinkleSpeed: 0,
        create: function(x, y) {
            const obj = Object.create(this);
            obj.x = x;
            obj.y = y;
            obj.radius = Math.random() * 1.5 + 0.5;
            obj.alpha = Math.random();
            obj.twinkleSpeed = Math.random() * 0.005 + 0.001;
            return obj;
        },
        update: function() {
            this.alpha += this.twinkleSpeed;
            if (this.alpha > 1) { this.alpha = 1; this.twinkleSpeed *= -1; }
            else if (this.alpha < 0) { this.alpha = 0; this.twinkleSpeed *= -1; }
        },
        draw: function(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }
    };

    const initStarAnimation = (canvasId) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let stars = [];

        const createStars = () => {
            stars = [];
            for (let i = 0; i < 100; i++) {
                stars.push(star.create(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(s => { s.update(); s.draw(ctx); });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createStars();
        });

        createStars();
        animate();
    };

    initStarAnimation('particle-canvas');
    initStarAnimation('particle-canvas-section4');

    // Insect Particle Animation
    const initInsectAnimation = (canvasId) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const section = canvas.parentElement;

        canvas.width = section.offsetWidth * 0.4;
        canvas.height = section.offsetHeight * 0.5;

        let particles = [];
        const particleCount = 40;

        const insect = {
            x: 0, y: 0, vx: 0, vy: 0, radius: 0,
            create: function(x, y) {
                const obj = Object.create(this);
                obj.x = x;
                obj.y = y;
                obj.radius = Math.random() * 1.2 + 0.4;
                obj.vx = (Math.random() - 0.5) * 3;
                obj.vy = (Math.random() - 0.5) * 3;
                return obj;
            },
            update: function() {
                this.vx += (Math.random() - 0.5) * 1;
                this.vy += (Math.random() - 0.5) * 1;
                this.vx *= 0.97;
                this.vy *= 0.97;
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            },
            draw: function(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.fill();
            }
        };

        const createInsects = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(insect.create(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', () => {
            canvas.width = section.offsetWidth * 0.4;
            canvas.height = section.offsetHeight * 0.5;
            createInsects();
        });

        createInsects();
        animate();
    };

    initInsectAnimation('insect-particle-canvas');

    // AOS: Observa elementos com data-aos individualmente
    const animatables = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    animatables.forEach(el => observer.observe(el));
});