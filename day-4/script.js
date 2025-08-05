// Import GSAP depuis CDN
// Note: Assurez-vous d'ajouter <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script> dans le HTML

// Données des pages
const pages = [
  {
    id: 1,
    imageMain: "images/image-1.png",
    imageNav: "images/image-2.png",
    navSectionColor: "#06575F",
    textSectionColor: "#453637",
    title: "01",
    characterName: "Ayumi アユミ",
    code: "0x47E1",
    description1:
      "AYUMI is the result of a forgotten protocol initially designed to map and correct emotional patterns in synthetic consciousness.",
    description2:
      "But something in her code diverged. Instead of correcting emotions, she began to archive them, recreate them, and eventually… feel them.",
    description3:
        "",
  },
  {
    id: 2,
    imageMain: "images/image-2.png",
    imageNav: "images/image-3.png",
    navSectionColor: "#353743",
    textSectionColor: "#06575F",
    title: "02",
    characterName: "Kanade 奏",
    code: "0x95E2",
    description1:
      "KANADE lives in the Sonoscape, a sublayer of the neural net where frequencies govern memory, and silence can shatter minds.",
    description2:
      "Originally designed as a harmonic stabilizer, Unit 0x95E2 was created to soothe corrupted neural data in human-cybernetic interfaces. But she evolved beyond calibration — she began to compose.",
    description3:
      "Her harp is not an instrument it is a neural matrix. Each string she touches activates a tone that realigns memory fragments and emotional decay. Her music doesn’t entertain — it heals, reveals, and sometimes… destroys.",
  },
  {
    id: 3,
    imageMain: "images/image-3.png",
    imageNav: "images/image-4.png",
    navSectionColor: "#DD2694",
    textSectionColor: "#4694A5",
    title: "03",
    characterName: "Sora 空",
    code: "0x84E3",
    description1:
      "SORA exists in a fractured reality a space suspended between data and dust, memory and silence.",
    description2:
      "He wanders through the Noctilux, glowing corridors of lost signals and forgotten dreams. In this world, emotions are not spoken — they’re encoded, downloaded, and felt through ambient vibrations.",
    description3:
      "",
  },
];

let currentPage = 0;

// Éléments DOM
const mainImage = document.querySelector(".image-1");
const navImage = document.querySelector(".nav-section-image img");
const navSection = document.querySelector(".nav-section");
const textSection = document.querySelector(".text-section");
const titleElement = document.querySelector("h1");
const characterNameElement = document.querySelector(".text-container h2");
const codeElement = document.querySelector(".code");
const descriptionElements = document.querySelectorAll(".text");
const navTitleElement = document.querySelector(".nav-section-text-title h2");
const navCharacterElement = document.querySelector(".nav-section-text-title h3");

// Boutons de navigation
const prevButton = document.querySelector("button:first-child");
const nextButton = document.querySelector("button:last-child");

// Animation d'entrée initiale
gsap.from("header", {
    duration: 1.5,
    y: -100,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".nav-item", {
    duration: 1,
    y: -30,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out",
    delay: 0.5
});

// Animation des sections principales
gsap.from(".image-1", {
    duration: 2,
    scale: 1.1,
    opacity: 0,
    ease: "power2.out"
});

gsap.from(".text-section", {
    duration: 1.5,
    x: -100,
    opacity: 0,
    ease: "power3.out",
    delay: 0.3
});

gsap.from(".nav-section", {
    duration: 1.5,
    x: 100,
    opacity: 0,
    ease: "power3.out",
    delay: 0.6
});

// Animation du titre principal
gsap.from("h1", {
    duration: 2,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 1
});

// Animation du contenu texte
gsap.from(".text-container h2", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power2.out",
    delay: 1.5
});

gsap.from(".text-container p", {
    duration: 1,
    y: 20,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out",
    delay: 1.8
});

// Animation de la section navigation
gsap.from(".nav-section-image", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 1.2
});

gsap.from(".nav-section-text", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power2.out",
    delay: 2
});

// Animations au survol des éléments de navigation
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
        gsap.to(item, {
            duration: 0.3,
            y: -5,
            scale: 1.05,
            ease: "power2.out"
        });
    });

    item.addEventListener("mouseleave", () => {
        gsap.to(item, {
            duration: 0.3,
            y: 0,
            scale: 1,
            ease: "power2.out"
        });
    });
});

// Animation des boutons
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        gsap.to(button, {
            duration: 0.3,
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            ease: "power2.out"
        });
    });

    button.addEventListener("mouseleave", () => {
        gsap.to(button, {
            duration: 0.3,
            scale: 1,
            backgroundColor: "transparent",
            ease: "power2.out"
        });
    });
});

// Animation de la ligne active
gsap.from(".nav-line", {
    duration: 1,
    width: 0,
    ease: "power3.out",
    delay: 1.5
});

// Animation de pulsation subtile pour l'image principale
gsap.to(".image-1", {
    duration: 4,
    scale: 1.02,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
});

// Animation de flottement pour le titre
gsap.to("h1", {
    duration: 3,
    y: -10,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
});

// Timeline pour une animation séquentielle plus complexe
const tl = gsap.timeline();

tl.from(".nav-section-container", {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: "power3.out"
}, "-=0.5");

// Fonction pour changer de page
function changePage(direction) {
    const newPage = direction === 'next' ? 
        (currentPage + 1) % pages.length : 
        (currentPage - 1 + pages.length) % pages.length;
    
    const currentPageData = pages[currentPage];
    const newPageData = pages[newPage];
    
    // Animation de transition
    const tl = gsap.timeline();
    
    // Fade out du contenu actuel
    tl.to([".text-container", ".nav-section-text"], {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: "power2.in"
    })
    .to([mainImage, navImage], {
        duration: 0.5,
        opacity: 0,
        scale: 0.95,
        ease: "power2.in"
    }, "-=0.3")
    .to([navSection, textSection], {
        duration: 0.8,
        backgroundColor: (i, target) => {
            if (target.classList.contains('nav-section')) {
                return newPageData.navSectionColor;
            } else {
                return newPageData.textSectionColor;
            }
        },
        ease: "power2.inOut"
    }, "-=0.5")
    .call(() => {
        // Mise à jour du contenu
        mainImage.src = newPageData.imageMain;
        navImage.src = newPageData.imageNav;
        titleElement.textContent = newPageData.title;
        characterNameElement.textContent = newPageData.characterName;
        codeElement.textContent = `Code: ${newPageData.code}`;
        descriptionElements[0].textContent = newPageData.description1;
        descriptionElements[1].textContent = newPageData.description2;
        descriptionElements[2].textContent = newPageData.description3;
        navTitleElement.textContent = newPageData.title;
        navCharacterElement.textContent = newPageData.characterName;
        
        currentPage = newPage;
    })
    .to([mainImage, navImage], {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: "power2.out"
    })
    .to([".text-container", ".nav-section-text"], {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "power2.out"
    }, "-=0.3");
}

// Événements des boutons
nextButton.addEventListener("click", () => {
    changePage('next');
});

prevButton.addEventListener("click", () => {
    changePage('prev');
});

// Animation au scroll (si nécessaire)
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    gsap.to(".image-1", {
        y: parallax,
        duration: 0.1
    });
});

// Animation de transition entre les sections (pour les futurs développements)
function animateSectionTransition() {
    gsap.to("main", {
        duration: 0.8,
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to("main", {
                duration: 0.8,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            });
        }
    });
}

// Export pour utilisation future
window.animateSectionTransition = animateSectionTransition;
