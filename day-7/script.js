class MusicPlayer {
    constructor() {
        this.audio = new Audio('song/Thriller (2003 Edit).mp3');
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeated = false;
        this.currentRotation = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.startRotation = 0;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateTimeDisplay();
        this.initializeAnimations();
    }

    initializeElements() {
        this.playButton = document.querySelector('.play');
        this.pauseButton = document.querySelector('.pause');
        this.nextButton = document.querySelector('.next');
        this.previousButton = document.querySelector('.previous');
        this.repeatButton = document.querySelector('.repeat');
        this.shuffleButton = document.querySelector('.shuffle');
        this.disque = document.querySelector('.cover-disque-container');
        this.progressBar = document.querySelector('.lecture-bar');
        this.currentTimeDisplay = document.querySelector('.lecture-time p:first-child');
        this.totalTimeDisplay = document.querySelector('.lecture-time p:last-child');
        
        if (!this.playButton || !this.pauseButton) {
            console.error('Boutons play/pause non trouvés');
        }
    }

    initializeAnimations() {
        const main = document.querySelector('main');
        
        gsap.set(main, {
            scale: 0.8,
            y: 100,
            opacity: 0,
            rotationX: -15,
            transformOrigin: "center center"
        });

        gsap.set([this.playButton, this.pauseButton, this.nextButton, this.previousButton, this.repeatButton, this.shuffleButton], {
            scale: 0,
            opacity: 0
        });

        gsap.set(this.disque, {
            scale: 0.8,
            opacity: 0
        });

        gsap.set(this.progressBar, {
            scaleX: 0
        });

        const tl = gsap.timeline();
        
        tl.to(main, {
            scale: 1,
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "back.out(1.7)"
        })
        .to(this.disque, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=0.8")
        .to([this.playButton, this.pauseButton], {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .to([this.nextButton, this.previousButton], {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .to([this.repeatButton, this.shuffleButton], {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .to(this.progressBar, {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.2");

        this.setupPhoneEffects();
    }

    setupPhoneEffects() {
        const main = document.querySelector('main');
        
        this.createScreenGlow(main);
        
        this.createScreenReflection(main);
        
        this.setupVibrationEffect();
    }

    createScreenGlow(main) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
            pointer-events: none;
            z-index: 10;
            border-radius: 44px;
        `;
        main.appendChild(glow);
        
        gsap.to(glow, {
            opacity: 0.3,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
    }

    createScreenReflection(main) {
        const reflection = document.createElement('div');
        reflection.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%);
            pointer-events: none;
            z-index: 5;
            border-radius: 44px 44px 0 0;
        `;
        main.appendChild(reflection);
    }

    setupVibrationEffect() {
        const main = document.querySelector('main');
        
        const vibrate = (intensity = 1) => {
            gsap.to(main, {
                x: `random(-${intensity}, ${intensity})`,
                y: `random(-${intensity}, ${intensity})`,
                rotation: `random(-${intensity * 0.5}, ${intensity * 0.5})`,
                duration: 0.1,
                ease: "power2.out",
                repeat: 3,
                yoyo: true
            });
        };
        
        this.addVibrationToInteractions(vibrate);
    }

    addVibrationToInteractions(vibrate) {
        const originalTogglePlay = this.togglePlay.bind(this);
        this.togglePlay = function() {
            vibrate(2);
            originalTogglePlay();
        };
        
        const buttons = [this.nextButton, this.previousButton, this.repeatButton, this.shuffleButton];
        buttons.forEach(button => {
            if (button) {
                button.addEventListener('click', () => vibrate(1));
            }
        });
        
        const originalProgressClick = this.progressBar.onclick;
        this.progressBar.addEventListener('click', (e) => {
            vibrate(1);
            if (originalProgressClick) originalProgressClick.call(this.progressBar, e);
        });
        
        this.addPressureEffect();
        
        this.addParallaxEffect();
    }

    addPressureEffect() {
        const main = document.querySelector('main');
        
        const originalTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchStart = function(e) {
            gsap.to(main, {
                scale: 0.98,
                duration: 0.2,
                ease: "power2.out"
            });
            originalTouchStart(e);
        };
        
        const originalTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchEnd = function(e) {
            gsap.to(main, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            originalTouchEnd(e);
        };
        
        const originalMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseDown = function(e) {
            gsap.to(main, {
                scale: 0.98,
                duration: 0.2,
                ease: "power2.out"
            });
            originalMouseDown(e);
        };
        
        const originalMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseUp = function(e) {
            gsap.to(main, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            originalMouseUp(e);
        };
    }

    addParallaxEffect() {
        const main = document.querySelector('main');
        const disque = this.disque;
        
        document.addEventListener('mousemove', (e) => {
            const rect = main.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const maxTilt = 3; // Réduit pour moins d'interférence
            const maxMove = 5; // Réduit pour moins d'interférence
            
            const tiltX = (mouseY / (window.innerHeight / 2)) * maxTilt;
            const tiltY = -(mouseX / (window.innerWidth / 2)) * maxTilt;
            const moveX = (mouseX / (window.innerWidth / 2)) * maxMove;
            const moveY = (mouseY / (window.innerHeight / 2)) * maxMove;
            
            // Appliquer le parallaxe seulement si on ne fait pas glisser le disque
            if (!this.isDragging) {
                gsap.to(main, {
                    rotationX: tiltX,
                    rotationY: tiltY,
                    x: moveX,
                    y: moveY,
                    duration: 0.5,
                    ease: "power2.out"
                });
                
                // Ne pas déplacer le disque avec le parallaxe pour éviter les conflits
                // gsap.to(disque, {
                //     x: moveX * 0.3,
                //     y: moveY * 0.3,
                //     duration: 0.5,
                //     ease: "power2.out"
                // });
            }
        });
        
        document.addEventListener('mouseleave', () => {
            gsap.to(main, {
                rotationX: 0,
                rotationY: 0,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            });
            
            // Réinitialiser la position du disque
            gsap.to(disque, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    setupEventListeners() {
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.pauseButton.addEventListener('click', () => this.togglePlay());
        this.nextButton.addEventListener('click', () => this.next());
        this.previousButton.addEventListener('click', () => this.previous());
        this.repeatButton.addEventListener('click', () => this.toggleRepeat());
        this.shuffleButton.addEventListener('click', () => this.toggleShuffle());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.handleSongEnd());
        this.audio.addEventListener('loadedmetadata', () => this.updateTotalTime());
        this.audio.addEventListener('error', (e) => {
            console.error('Erreur audio:', e);
        });

        this.setupDisqueControls();
        this.setupProgressBarControls();
    }

    setupDisqueControls() {
        const disque = this.disque;

        disque.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        disque.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        disque.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        disque.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        disque.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    setupProgressBarControls() {
        this.progressBar.addEventListener('click', (e) => {
            const rect = this.progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            
            gsap.to(this.progressBar, {
                scaleY: 1.5,
                duration: 0.2,
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to(this.progressBar, {
                        scaleY: 1,
                        duration: 0.2,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            if (this.audio.duration) {
                this.audio.currentTime = percentage * this.audio.duration;
            }
        });
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.startX = touch.clientX;
        this.startY = touch.clientY;
        this.startRotation = this.currentRotation;
        this.isDragging = true;
        
        gsap.to(this.disque, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
        });
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (!this.isDragging) return;

        const touch = e.touches[0];
        const rect = this.disque.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * 180 / Math.PI;
        const rotation = angle + 90; 
        
        this.currentRotation = rotation;
        
        // Utiliser GSAP pour la rotation
        gsap.set(this.disque, {
            rotation: rotation,
            transformOrigin: "center center"
        });
        
        this.rotationStartTime = Date.now() - (rotation / 36) * 1000;
        
        const normalizedRotation = (rotation + 360) % 360;
        const progress = normalizedRotation / 360;
        if (this.audio.duration) {
            this.audio.currentTime = progress * this.audio.duration;
        }
    }

    handleTouchEnd(e) {
        this.isDragging = false;
        
        gsap.to(this.disque, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
        
        if (this.isPlaying) {
            const rotationSpeed = 36;
            const currentRotationNormalized = (this.currentRotation + 360) % 360;
            const timeOffset = (currentRotationNormalized / rotationSpeed) * 1000;
            this.rotationStartTime = Date.now() - timeOffset;
        }
    }

    handleMouseDown(e) {
        e.preventDefault();
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startRotation = this.currentRotation;
        this.isDragging = true;
        
        gsap.to(this.disque, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
        });
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;

        const rect = this.disque.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
        const rotation = angle + 90; 
        
        this.currentRotation = rotation;
        
        // Utiliser GSAP pour la rotation
        gsap.set(this.disque, {
            rotation: rotation,
            transformOrigin: "center center"
        });
        
        this.rotationStartTime = Date.now() - (rotation / 36) * 1000;
        
        const normalizedRotation = (rotation + 360) % 360;
        const progress = normalizedRotation / 360;
        if (this.audio.duration) {
            this.audio.currentTime = progress * this.audio.duration;
        }
    }

    handleMouseUp(e) {
        this.isDragging = false;
        
        gsap.to(this.disque, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
        
        if (this.isPlaying) {
            const rotationSpeed = 36; 
            const currentRotationNormalized = (this.currentRotation + 360) % 360;
            const timeOffset = (currentRotationNormalized / rotationSpeed) * 1000;
            this.rotationStartTime = Date.now() - timeOffset;
        }
    }

    togglePlay() {
        console.log('Toggle play appelé, isPlaying:', this.isPlaying);
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            
            gsap.to(this.playButton, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "back.in(1.7)",
                onComplete: () => {
                    this.playButton.style.display = 'none';
                    this.pauseButton.style.display = 'block';
                    gsap.fromTo(this.pauseButton, 
                        { scale: 0, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
                    );
                }
            });
            
            this.startDisqueRotation();
        }).catch(error => {
            console.error('Erreur lors de la lecture:', error);
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        
        gsap.to(this.pauseButton, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "back.in(1.7)",
            onComplete: () => {
                this.pauseButton.style.display = 'none';
                this.playButton.style.display = 'block';
                gsap.fromTo(this.playButton, 
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
                );
            }
        });
        
        this.stopDisqueRotation();
    }

    next() {
        gsap.to(this.nextButton, {
            scale: 1.2,
            duration: 0.2,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.to(this.nextButton, {
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        this.audio.currentTime = 0;
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    previous() {
        gsap.to(this.previousButton, {
            scale: 1.2,
            duration: 0.2,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.to(this.previousButton, {
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        this.audio.currentTime = 0;
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    toggleRepeat() {
        this.isRepeated = !this.isRepeated;
        
        gsap.to(this.repeatButton, {
            scale: 1.2,
            duration: 0.2,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.to(this.repeatButton, {
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        gsap.to(this.repeatButton, {
            opacity: this.isRepeated ? 1 : 0.5,
            duration: 0.3,
            ease: "power2.out"
        });
        
        this.audio.loop = this.isRepeated;
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        
        gsap.to(this.shuffleButton, {
            scale: 1.2,
            duration: 0.2,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.to(this.shuffleButton, {
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        gsap.to(this.shuffleButton, {
            opacity: this.isShuffled ? 1 : 0.5,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    startDisqueRotation() {
        this.disque.style.animation = 'none';
        
        const rotationSpeed = 36;
        const currentRotationNormalized = (this.currentRotation + 360) % 360;
        const timeOffset = (currentRotationNormalized / rotationSpeed) * 1000;
        
        this.rotationStartTime = Date.now() - timeOffset;
        
        this.rotationInterval = setInterval(() => {
            if (this.isPlaying && !this.isDragging) {
                const elapsed = Date.now() - this.rotationStartTime;
                const newRotation = (elapsed * rotationSpeed / 1000) % 360;
                this.currentRotation = newRotation;
                
                // Utiliser GSAP pour une rotation plus fluide et éviter les conflits
                gsap.set(this.disque, {
                    rotation: newRotation,
                    transformOrigin: "center center"
                });
            }
        }, 16);
    }

    stopDisqueRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
        
        // Utiliser GSAP pour maintenir la rotation actuelle
        gsap.set(this.disque, {
            rotation: this.currentRotation,
            transformOrigin: "center center"
        });
    }

    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            
            gsap.to(this.progressBar, {
              background: `linear-gradient(to right, #DCC04F ${progress}%, rgba(255, 255, 255, 0.2) ${progress}%)`,
              duration: 0.1,
              ease: "power2.out",
            });
        }
        this.updateTimeDisplay();
    }

    updateTimeDisplay() {
        const currentTime = this.formatTime(this.audio.currentTime);
        const totalTime = this.formatTime(this.audio.duration);
        
        this.currentTimeDisplay.textContent = currentTime;
        this.totalTimeDisplay.textContent = totalTime;
    }

    updateTotalTime() {
        this.updateTimeDisplay();
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    handleSongEnd() {
        if (this.isRepeated) {
            this.audio.currentTime = 0;
            this.audio.play();
        } else {
            this.pause();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});
