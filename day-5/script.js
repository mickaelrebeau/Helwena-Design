// Animations GSAP au chargement de la page
gsap.registerPlugin();

// Timeline principale
const tl = gsap.timeline({ delay: 0.5 });

// Animation de la section avec effet liquid glass
tl.from("section", {
  duration: 1.5,
  scale: 0.8,
  opacity: 1,
  y: 50,
  ease: "power3.out",
});

// Animation du titre
tl.from(
  "h1",
  {
    duration: 0.8,
    y: -30,
    opacity: 0,
    ease: "power2.out",
  },
  "-=0.5"
);

// Animation des labels
tl.from(
  "label",
  {
    duration: 0.6,
    x: -20,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out",
  },
  "-=0.3"
);

// Animation des inputs
tl.from(
  "input",
  {
    duration: 0.8,
    scaleX: 0,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out",
  },
  "-=0.4"
);

// Animation du lien "Forgot password"
tl.from(
  ".forgot-password",
  {
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: "power2.out",
  },
  "-=0.3"
);

// Animation du bouton Connect
tl.from(
  ".connect-button",
  {
    duration: 0.8,
    scale: 0.5,
    opacity: 0,
    ease: "back.out(1.7)",
  },
  "-=0.2"
);

// Animation du texte "Or continue with"
tl.from(
  ".form-footer-text",
  {
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: "power2.out",
  },
  "-=0.3"
);

// Animation des boutons sociaux
tl.from(
  ".social-buttons",
  {
    duration: 0.8,
    y: 20,
    opacity: 0,
    ease: "power2.out",
  },
  "-=0.4"
);

// Animation du texte "Sign up"
tl.from(
  ".sign-up-text",
  {
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: "power2.out",
  },
  "-=0.3"
);

// Effet liquid glass avec GSAP
const section = document.querySelector("section");

// Animation continue de l'effet liquid glass
gsap.to(section, {
  duration: 3,
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.15) 100%)",
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true,
});

// Animation de la section au hover
section.addEventListener("mouseenter", () => {
  gsap.to(section, {
    duration: 0.3,
    scale: 1.02,
    ease: "power2.out",
  });
});

section.addEventListener("mouseleave", () => {
  gsap.to(section, {
    duration: 0.3,
    scale: 1,
    ease: "power2.out",
  });
});

// Animation du bouton Connect au hover
const connectButton = document.querySelector(".connect-button");

connectButton.addEventListener("mouseenter", () => {
  gsap.to(connectButton, {
    duration: 0.3,
    scale: 1.05,
    backgroundColor: "#1565c0",
    ease: "power2.out",
  });
});

connectButton.addEventListener("mouseleave", () => {
  gsap.to(connectButton, {
    duration: 0.3,
    scale: 1,
    backgroundColor: "#1970f5",
    ease: "power2.out",
  });
});

// Animation des inputs au focus
const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    gsap.to(input, {
      duration: 0.3,
      scale: 1.02,
      borderColor: "rgba(255, 255, 255, 0.5)",
      ease: "power2.out",
    });
  });

  input.addEventListener("blur", () => {
    gsap.to(input, {
      duration: 0.3,
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      ease: "power2.out",
    });
  });
});

// Animation du lien "Forgot password" au hover
const forgotPassword = document.querySelector(".forgot-password");

forgotPassword.addEventListener("mouseenter", () => {
  gsap.to(forgotPassword, {
    duration: 0.2,
    y: -2,
    ease: "power2.out",
  });
});

forgotPassword.addEventListener("mouseleave", () => {
  gsap.to(forgotPassword, {
    duration: 0.2,
    y: 0,
    ease: "power2.out",
  });
});

// Animation du lien "Sign up" au hover
const signUpLink = document.querySelector(".sign-up-text a");

signUpLink.addEventListener("mouseenter", () => {
  gsap.to(signUpLink, {
    duration: 0.2,
    y: -2,
    ease: "power2.out",
  });
});

signUpLink.addEventListener("mouseleave", () => {
  gsap.to(signUpLink, {
    duration: 0.2,
    y: 0,
    ease: "power2.out",
  });
});
