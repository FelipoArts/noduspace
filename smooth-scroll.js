document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.scroll-section');
    const scrollContainer = document.querySelector('.scroll-container');

    // Set sticky positioning on all sections
    gsap.set(sections, { position: 'sticky', top: 0 });

    sections.forEach((section, i) => {
        if (i < sections.length - 1) {
            gsap.fromTo(sections[i + 1], {
                yPercent: 100
            }, {
                yPercent: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    scroller: scrollContainer,
                    start: 'bottom bottom',
                    end: '+=100%',
                    scrub: true
                }
            });
        }
    });
});