// Three.js Meteor Shower Animation with Randomized Directions & Colors
// Import Three.js from CDN (loaded via HTML)

class MeteorShower {
    constructor() {
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.meteors = [];
        this.stars = [];
        this.maxMeteors = 6; // Increased slightly
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
        // Fog for depth fading
        this.scene.fog = new THREE.FogExp2(0x020617, 0.002);
        
        // Setup camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: false, // Disabled for performance style
            powerPreference: 'high-performance',
            stencil: false,
            depth: false
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

        // Register animation loop
        if (window.rafScheduler) {
            window.rafScheduler.subscribe('meteor-shower', () => this.animateFrame());
        } else {
            const loop = () => { this.animateFrame(); requestAnimationFrame(loop); };
            requestAnimationFrame(loop);
        }
    }

    createStars() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = window.innerWidth < 768 ? 500 : 800; // More stars
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const velocities = new Float32Array(starCount * 3);
        const twinklePhases = new Float32Array(starCount);
        const twinkleSpeeds = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            
            // Spread stars wider
            positions[i3] = (Math.random() - 0.5) * 300;
            positions[i3 + 1] = (Math.random() - 0.5) * 300;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;

            // Colors: White, Cyan, Purple mixed
            const colorType = Math.random();
            if (colorType > 0.9) {
                // Cyan
                colors[i3] = 0.2; colors[i3 + 1] = 0.8; colors[i3 + 2] = 1.0;
            } else if (colorType > 0.8) {
                // Purple
                colors[i3] = 0.8; colors[i3 + 1] = 0.4; colors[i3 + 2] = 1.0;
            } else {
                // White/Blue-ish
                colors[i3] = 0.9; colors[i3 + 1] = 0.9; colors[i3 + 2] = 1.0;
            }

            velocities[i3] = (Math.random() - 0.5) * 0.05;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.05;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

            twinklePhases[i] = Math.random() * Math.PI * 2;
            twinkleSpeeds[i] = 0.5 + Math.random() * 2.0;
            sizes[i] = 0.3 + Math.random() * 0.5;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starMaterial = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 } },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    if (dist > 0.5) discard;
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
        this.spawnInterval = setInterval(() => {
            const heroSection = document.getElementById('hero');
            const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
            const isNearHero = heroRect ? (heroRect.bottom > -300) : true;
            
            if (isNearHero && this.meteors.length < this.maxMeteors) {
                this.createMeteor();
            }
        }, 1500); // Faster spawn
    }

    createMeteor() {
        const direction = Math.random();
        let startX, startY, velocityX, velocityY;

        if (direction < 0.33) {
            startX = -60 + Math.random() * 40; startY = 40 + Math.random() * 20;
            velocityX = 0.8 + Math.random() * 0.5; velocityY = -0.8 - Math.random() * 0.5;
        } else if (direction < 0.66) {
            startX = -40 + Math.random() * 80; startY = 50 + Math.random() * 20;
            velocityX = (Math.random() - 0.5) * 0.5; velocityY = -1.0 - Math.random() * 0.5;
        } else {
            startX = 40 + Math.random() * 40; startY = 40 + Math.random() * 20;
            velocityX = -0.8 - Math.random() * 0.5; velocityY = -0.8 - Math.random() * 0.5;
        }

        const meteorGroup = new THREE.Group();
        
        // Random Color: Cyan, Purple, or White
        const colorRand = Math.random();
        let meteorColor = 0xffffff;
        let glowColor = 0xa5b4fc;

        if (colorRand > 0.6) {
            meteorColor = 0x22d3ee; // Cyan
            glowColor = 0x22d3ee;
        } else if (colorRand > 0.3) {
            meteorColor = 0xd946ef; // Pink/Fuchsia
            glowColor = 0xd946ef;
        }

        // Head
        const headGeometry = new THREE.SphereGeometry(0.25, 8, 8);
        const headMaterial = new THREE.MeshBasicMaterial({ color: meteorColor, transparent: true, opacity: 1 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        meteorGroup.add(head);

        // Trail
        const trailLength = 5 + Math.random() * 5;
        const trailPoints = [];
        const velocityMag = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        const trailDirX = -velocityX / velocityMag;
        const trailDirY = -velocityY / velocityMag;
        
        for (let i = 0; i < 25; i++) {
            const t = i / 24;
            trailPoints.push(new THREE.Vector3(t * trailLength * trailDirX, t * trailLength * trailDirY, 0));
        }
        
        const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
        const trailMaterial = new THREE.LineBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: 0.8,
            linewidth: 2 // Note: WebGL linewidth 1 limitation exists on some browsers
        });
        const trail = new THREE.Line(trailGeometry, trailMaterial);
        meteorGroup.add(trail);

        // Glow
        const glowGeometry = new THREE.SphereGeometry(0.6, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.4 });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        meteorGroup.add(glow);

        meteorGroup.position.set(startX, startY, -10 + Math.random() * 20);
        this.scene.add(meteorGroup);

        this.meteors.push({
            group: meteorGroup,
            velocity: { x: velocityX, y: velocityY },
            life: 1.0,
            fadeRate: 0.005 + Math.random() * 0.005,
            head: head, trail: trail, glow: glow
        });
    }

    updateMeteors() {
        for (let i = this.meteors.length - 1; i >= 0; i--) {
            const meteor = this.meteors[i];
            meteor.group.position.x += meteor.velocity.x;
            meteor.group.position.y += meteor.velocity.y;
            meteor.life -= meteor.fadeRate;
            
            if (meteor.head.material) meteor.head.material.opacity = meteor.life;
            if (meteor.trail.material) meteor.trail.material.opacity = meteor.life * 0.8;
            if (meteor.glow.material) meteor.glow.material.opacity = meteor.life * 0.4;
            
            if (meteor.life <= 0 || Math.abs(meteor.group.position.x) > 100 || Math.abs(meteor.group.position.y) > 100) {
                this.scene.remove(meteor.group);
                meteor.head.geometry.dispose(); meteor.head.material.dispose();
                meteor.trail.geometry.dispose(); meteor.trail.material.dispose();
                meteor.glow.geometry.dispose(); meteor.glow.material.dispose();
                this.meteors.splice(i, 1);
            }
        }
    }

    animateFrame() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        this.visibleCache = isVisible;

        const heroSection = document.getElementById('hero');
        const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
        const isNearHero = heroRect ? (heroRect.bottom > -200) : true;
        this.nearHeroCache = isNearHero;

        if (!isNearHero) {
            this.frameSkipCounter++;
            if (this.frameSkipCounter % 3 !== 0) return;
        } else {
            this.frameSkipCounter = 0;
        }

        this.updateMeteors();

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
                // Wrap
                if (positions[i3] > 150) positions[i3] = -150; else if (positions[i3] < -150) positions[i3] = 150;
                if (positions[i3 + 1] > 150) positions[i3 + 1] = -150; else if (positions[i3 + 1] < -150) positions[i3 + 1] = 150;

                if (updateTwinkle) {
                    const baseSize = 0.3 + (i % 100) * 0.005;
                    const twinkle = Math.sin(time * twinkleSpeeds[i] + twinklePhases[i]) * 0.3 + 0.7;
                    sizes[i] = baseSize * twinkle;
                }
            }
            starData.points.geometry.attributes.position.needsUpdate = true;
            if (updateTwinkle) starData.points.geometry.attributes.size.needsUpdate = true;
            starData.points.rotation.y += 0.0002; // Rotate whole field slowly
        });

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
        if (window.rafScheduler) window.rafScheduler.unsubscribe('meteor-shower');
        if (this.spawnInterval) clearInterval(this.spawnInterval);
        // Disposal logic...
    }
}

function initMeteorShower() {
    if (typeof THREE !== 'undefined') window.meteorShower = new MeteorShower();
    else console.error('Three.js not loaded.');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initMeteorShower, 100));
} else {
    setTimeout(initMeteorShower, 100);
}
