// Three.js Meteor Shower Animation with Randomized Directions
// Import Three.js from CDN (loaded via HTML)

class MeteorShower {
    constructor() {
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.meteors = [];
        this.stars = [];
        this.maxMeteors = 5; // Maximum number of meteors at once
        this.spawnInterval = null;
        this.frameSkipCounter = 0;
        this.initialized = false;
        this.visibleCache = true;
        this.nearHeroCache = true;
        this.init();
    }

    init() {
        // Create container for Three.js canvas
        this.container = document.createElement('div');
        this.container.id = 'meteor-canvas-container';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            pointer-events: none;
        `;
        document.body.insertBefore(this.container, document.body.firstChild);

        // Setup Three.js scene
        this.scene = new THREE.Scene();

        // Setup camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Setup renderer with performance optimizations
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: window.devicePixelRatio === 1, // Only enable on low-DPI displays
            powerPreference: 'high-performance', // Request high-performance GPU
            stencil: false, // Disable stencil buffer (not needed)
            depth: false // Disable depth buffer (not needed for 2D stars)
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Add background stars
        this.createStars();

        // Start meteor spawning system
        this.startMeteorSpawning();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Register animation loop with centralized RAF scheduler
        if (window.rafScheduler) {
            window.rafScheduler.subscribe('meteor-shower', () => this.animateFrame());
        } else {
            // Fallback if scheduler not yet loaded
            const loop = () => { this.animateFrame(); requestAnimationFrame(loop); };
            requestAnimationFrame(loop);
        }
    }

    createStars() {
        const starGeometry = new THREE.BufferGeometry();
        // Performance optimization: Reduce star count for better FPS
        const starCount = window.innerWidth < 768 ? 400 : 600;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const velocities = new Float32Array(starCount * 3);
        const twinklePhases = new Float32Array(starCount);
        const twinkleSpeeds = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;

            // Random positions
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;

            // Star colors (white to light blue/purple)
            const colorVariation = Math.random();
            colors[i3] = 0.8 + colorVariation * 0.2;     // R
            colors[i3 + 1] = 0.8 + colorVariation * 0.2; // G
            colors[i3 + 2] = 0.9 + colorVariation * 0.1; // B

            // Random velocities for subtle movement
            velocities[i3] = (Math.random() - 0.5) * 0.02;     // X velocity
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02; // Y velocity
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02; // Z velocity

            // Twinkle properties
            twinklePhases[i] = Math.random() * Math.PI * 2; // Random starting phase
            twinkleSpeeds[i] = 0.5 + Math.random() * 1.5;   // Random twinkle speed

            // Variable star sizes
            sizes[i] = 0.2 + Math.random() * 0.4;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vSize;

                void main() {
                    vColor = color;
                    vSize = size;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vSize;

                void main() {
                    // Create circular point
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    if (dist > 0.5) discard;

                    // Soft edge
                    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const starField = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(starField);

        // Store star field with animation data
        this.stars.push({
            points: starField,
            velocities: velocities,
            twinklePhases: twinklePhases,
            twinkleSpeeds: twinkleSpeeds,
            initialPositions: positions.slice(),
            time: 0
        });
    }

    startMeteorSpawning() {
        // Spawn meteors at regular intervals, but only if under the limit and near hero
        this.spawnInterval = setInterval(() => {
            const heroSection = document.getElementById('hero');
            const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
            const isNearHero = heroRect ? (heroRect.bottom > -300) : true;

            // Only spawn meteors when near hero section
            if (isNearHero && this.meteors.length < this.maxMeteors) {
                this.createMeteor();
            }
        }, 2000); // Check every 2 seconds
    }

    createMeteor() {
        // Random direction for meteor - only from top area
        const direction = Math.random();
        let startX, startY, velocityX, velocityY;

        // 3 possible directions - all from top area
        if (direction < 0.33) {
            // Top-left to bottom-right
            startX = -60 + Math.random() * 40;
            startY = 40 + Math.random() * 20;
            velocityX = 0.4 + Math.random() * 0.3;
            velocityY = -0.4 - Math.random() * 0.3;
        } else if (direction < 0.66) {
            // Top center to bottom (slight angle)
            startX = -40 + Math.random() * 80;
            startY = 50 + Math.random() * 20;
            velocityX = (Math.random() - 0.5) * 0.3;
            velocityY = -0.5 - Math.random() * 0.3;
        } else {
            // Top-right to bottom-left
            startX = 40 + Math.random() * 40;
            startY = 40 + Math.random() * 20;
            velocityX = -0.4 - Math.random() * 0.3;
            velocityY = -0.4 - Math.random() * 0.3;
        }

        // Create meteor trail
        const meteorGroup = new THREE.Group();

        // Meteor head (bright sphere)
        const headGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const headMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        meteorGroup.add(head);

        // Calculate trail direction based on velocity (trail should point opposite to movement)
        const trailLength = 3 + Math.random() * 2;
        const trailPoints = [];

        // Normalize velocity to get direction
        const velocityMag = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        const trailDirX = -velocityX / velocityMag; // Opposite to movement
        const trailDirY = -velocityY / velocityMag; // Opposite to movement

        for (let i = 0; i < 20; i++) {
            const t = i / 19;
            trailPoints.push(new THREE.Vector3(
                t * trailLength * trailDirX,
                t * trailLength * trailDirY,
                0
            ));
        }

        const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
        const trailMaterial = new THREE.LineBasicMaterial({
            color: 0x8b9dff,
            transparent: true,
            opacity: 0.8,
            linewidth: 2
        });
        const trail = new THREE.Line(trailGeometry, trailMaterial);
        meteorGroup.add(trail);

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.4, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xa5b4fc,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        meteorGroup.add(glow);

        // Position meteor (no rotation needed as trail is directional)
        meteorGroup.position.set(startX, startY, -10 + Math.random() * 20);

        this.scene.add(meteorGroup);

        // Store meteor data
        const meteorData = {
            group: meteorGroup,
            velocity: { x: velocityX, y: velocityY },
            life: 1.0,
            fadeRate: 0.003 + Math.random() * 0.002,
            head: head,
            trail: trail,
            glow: glow
        };

        this.meteors.push(meteorData);
    }

    updateMeteors() {
        for (let i = this.meteors.length - 1; i >= 0; i--) {
            const meteor = this.meteors[i];

            // Update position
            meteor.group.position.x += meteor.velocity.x;
            meteor.group.position.y += meteor.velocity.y;

            // Update life/opacity
            meteor.life -= meteor.fadeRate;

            if (meteor.head.material) meteor.head.material.opacity = meteor.life;
            if (meteor.trail.material) meteor.trail.material.opacity = meteor.life * 0.8;
            if (meteor.glow.material) meteor.glow.material.opacity = meteor.life * 0.3;

            // Remove dead meteors
            if (meteor.life <= 0 ||
                Math.abs(meteor.group.position.x) > 100 ||
                Math.abs(meteor.group.position.y) > 100) {
                this.scene.remove(meteor.group);

                // Dispose of geometries and materials
                meteor.head.geometry.dispose();
                meteor.head.material.dispose();
                meteor.trail.geometry.dispose();
                meteor.trail.material.dispose();
                meteor.glow.geometry.dispose();
                meteor.glow.material.dispose();

                this.meteors.splice(i, 1);
            }
        }
    }

    animateFrame() {
        if (!this.container) return;
        // Performance optimization: Check if canvas is visible in viewport (cache result to avoid layout thrash)
        const rect = this.container.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        this.visibleCache = isVisible;

        // Reduce quality when scrolled away from hero section
        const heroSection = document.getElementById('hero');
        const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
        const isNearHero = heroRect ? (heroRect.bottom > -200) : true;
        this.nearHeroCache = isNearHero;

        if (!isNearHero) {
            this.frameSkipCounter++;
            if (this.frameSkipCounter % 3 !== 0) {
                return; // throttle work when far from hero
            }
        } else {
            this.frameSkipCounter = 0;
        }

        // Update meteors
        this.updateMeteors();

        // Stars: batch update
        this.stars.forEach(starData => {
            const positions = starData.points.geometry.attributes.position.array;
            const sizes = starData.points.geometry.attributes.size.array;
            const velocities = starData.velocities;
            const twinklePhases = starData.twinklePhases;
            const twinkleSpeeds = starData.twinkleSpeeds;
            starData.time += 0.01;
            const time = starData.time;
            const starCount = positions.length / 3;
            const updateTwinkle = isNearHero;

            for (let i = 0; i < starCount; i++) {
                const i3 = i * 3;
                positions[i3] += velocities[i3];
                positions[i3 + 1] += velocities[i3 + 1];
                positions[i3 + 2] += velocities[i3 + 2];
                // Wrap boundaries
                if (positions[i3] > 100) positions[i3] = -100; else if (positions[i3] < -100) positions[i3] = 100;
                if (positions[i3 + 1] > 100) positions[i3 + 1] = -100; else if (positions[i3 + 1] < -100) positions[i3 + 1] = 100;
                if (positions[i3 + 2] > 100) positions[i3 + 2] = -100; else if (positions[i3 + 2] < -100) positions[i3 + 2] = 100;
                if (updateTwinkle) {
                    const baseSize = 0.2 + (i % 100) * 0.004;
                    const twinkle = Math.sin(time * twinkleSpeeds[i] + twinklePhases[i]) * 0.25 + 0.75;
                    sizes[i] = baseSize * twinkle;
                }
            }
            starData.points.geometry.attributes.position.needsUpdate = true;
            if (updateTwinkle) starData.points.geometry.attributes.size.needsUpdate = true;
            starData.points.rotation.y += 0.0001;
            starData.points.rotation.x += 0.00005;
        });

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
        // Clean up
        if (window.rafScheduler) {
            window.rafScheduler.unsubscribe('meteor-shower');
        }

        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
        }

        // Dispose of all objects
        this.meteors.forEach(meteor => {
            this.scene.remove(meteor.group);
            meteor.head.geometry.dispose();
            meteor.head.material.dispose();
            meteor.trail.geometry.dispose();
            meteor.trail.material.dispose();
            meteor.glow.geometry.dispose();
            meteor.glow.material.dispose();
        });

        this.stars.forEach(starData => {
            starData.points.geometry.dispose();
            starData.points.material.dispose();
            this.scene.remove(starData.points);
        });

        this.renderer.dispose();
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}

// Initialize meteor shower when DOM is ready and Three.js is loaded
function initMeteorShower() {
    if (typeof THREE !== 'undefined') {
        window.meteorShower = new MeteorShower();
    } else {
        console.error('Three.js not loaded. Please include Three.js library.');
    }
}

// Wait for DOM and Three.js to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Give a small delay to ensure Three.js is loaded
        setTimeout(initMeteorShower, 100);
    });
} else {
    setTimeout(initMeteorShower, 100);
}
