// Burger Menu Functionality
const burgerMenu = document.getElementById('burger-menu');
const menu = document.getElementById('menu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    menu.classList.toggle('active');
});

// Close menu when clicking on menu items
const menuItemsNav = document.querySelectorAll('.menu ul li');
menuItemsNav.forEach(item => {
    item.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        menu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !menu.contains(e.target)) {
        burgerMenu.classList.remove('active');
        menu.classList.remove('active');
    }
});

gsap.fromTo('.bentley', 
    {
        opacity: 0,
        y: -100,
        scale: 0.2
    },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
    }
);

gsap.fromTo('header', 
    {
        opacity: 0,
        y: -50
    },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }
);

gsap.fromTo('.hero-container h2', 
    {
        opacity: 0,
        y: 50,
        scale: 0.8
    },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        delay: 1
    }
);

gsap.fromTo('.button-container .button-wrap', 
    {
        opacity: 0,
        y: 30,
        scale: 0.9
    },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.5,
        stagger: 0.2
    }
);

gsap.fromTo('.stats', 
    {
        opacity: 0,
        y: 50,
        scale: 0.9
    },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        delay: 2
    }
);

gsap.fromTo('.stat', 
    {
        opacity: 0,
        x: 30
    },
    {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 2.5,
        stagger: 0.1
    }
);

const bentley = document.querySelector('.bentley');

bentley.addEventListener('mouseenter', () => {
    gsap.to('.bentley', {
        y: -25,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
    });
});

bentley.addEventListener('mouseleave', () => {
    gsap.to('.bentley', {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
    });
});

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 0.98,
            duration: 0.2,
            ease: "power2.out"
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    });
});

const menuItems = document.querySelectorAll('.menu ul li');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            color: '#fff',
            duration: 0.2,
            ease: "power2.out"
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            color: '#CFD4D8',
            duration: 0.2,
            ease: "power2.out"
        });
    });
});

function getDisplacementMap({ height, width, radius, depth }) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
    <svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .mix { mix-blend-mode: screen; }
      </style>
      <defs>
        <linearGradient id="Y" x1="0" x2="0" y1="${Math.ceil(
          (radius / height) * 15
        )}%" y2="${Math.floor(100 - (radius / height) * 15)}%">
          <stop offset="0%" stop-color="#0F0" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
        <linearGradient id="X" x1="${Math.ceil(
          (radius / width) * 15
        )}%" x2="${Math.floor(100 - (radius / width) * 15)}%" y1="0" y2="0">
          <stop offset="0%" stop-color="#F00" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
      <g filter="blur(2px)">
        <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
        <rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" class="mix" />
        <rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" class="mix" />
        <rect x="${depth}" y="${depth}" height="${height - 2 * depth}" width="${
      width - 2 * depth
    }" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />
      </g>
    </svg>
  `)
  );
}

function getDisplacementFilter({
  height,
  width,
  radius,
  depth,
  strength = 100,
  chromaticAberration = 0,
}) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
    <svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="displace" color-interpolation-filters="sRGB">
          <feImage x="0" y="0" height="${height}" width="${width}" href="${getDisplacementMap(
      { height, width, radius, depth }
    )}" result="displacementMap" />
          <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${
            strength + chromaticAberration * 2
          }" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="displacedR"/>
          <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${
            strength + chromaticAberration
          }" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="displacedG"/>
          <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength}" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="displacedB"/>
          <feBlend in="displacedR" in2="displacedG" mode="screen"/>
          <feBlend in2="displacedB" mode="screen"/>
        </filter>
      </defs>
    </svg>
  `) +
    "#displace"
  );
}

// Paramètres initiaux
let params = {
  height: 480,
  width: 200,
  depth: 10,
  radius: 20,
  strength: 100,
  chromaticAberration: 1,
  blur: 1,
  debug: false,
};

const glass = document.getElementById("glass");

function updateGlass() {
  let depth = params.depth / (glass.classList.contains("clicked") ? 0.7 : 1);
  if (params.debug) {
    glass.style.background = `url("${getDisplacementMap({
      height: params.height,
      width: params.width,
      radius: params.radius,
      depth,
    })}")`;
    glass.style.boxShadow = "none";
  } else {
    glass.style.background = "rgba(255,255,255,0.2)";
    glass.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
    glass.style.backdropFilter = `blur(${
      params.blur / 2
    }px) url('${getDisplacementFilter({
      height: params.height,
      width: params.width,
      radius: params.radius,
      depth,
      strength: params.strength,
      chromaticAberration: params.chromaticAberration,
    })}') blur(${params.blur}px) brightness(1.1) saturate(1.1)`;
  }
  glass.style.height = params.height + "px";
  glass.style.width = params.width + "px";
  glass.style.borderRadius = params.radius + "px";
}

glass.addEventListener("mousedown", () => {
  glass.classList.add("clicked");
  updateGlass();
});

glass.addEventListener("mouseup", () => {
  glass.classList.remove("clicked");
  updateGlass();
});

updateGlass();