import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MeteorShower = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Only run if WebGL is supported
        if (!window.WebGLRenderingContext) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize for high DPI

        if (containerRef.current) {
            containerRef.current.appendChild(renderer.domElement);
        }

        // Camera position
        camera.position.z = 1;
        camera.rotation.x = Math.PI / 2;

        // Create stars (static background)
        const starGeo = new THREE.BufferGeometry();
        const starCount = 2000;
        const starPos = new Float32Array(starCount * 3);
        const starVel = []; // If we want moving stars later

        for(let i=0; i<starCount * 3; i++) {
            starPos[i] = (Math.random() - 0.5) * 600;
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.7,
            transparent: true,
            opacity: 0.8
        });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        // Meteor implementation
        const meteors = [];
        const meteorCount = 10; // Number of active meteors

        const createMeteor = () => {
             // A meteor is a line with a gradient/trail
             // Since Three.js lines are simple, we simulate trail with a stretched geometry or specific shader
             // Simple approach: Use a stretched mesh
             const geometry = new THREE.CylinderGeometry(0, 0.1, 8, 3); // Tail to head
             const material = new THREE.MeshBasicMaterial({
                 color: 0xffffff,
                 transparent: true,
                 opacity: 0.6
             });
             const meteor = new THREE.Mesh(geometry, material);

             // Random start position
             resetMeteor(meteor);

             scene.add(meteor);
             meteors.push(meteor);
        };

        const resetMeteor = (meteor) => {
            meteor.position.x = (Math.random() - 0.5) * 400;
            meteor.position.y = (Math.random() - 0.5) * 400;
            meteor.position.z = -100 + Math.random() * 100; // Far away

            // Orientation: Coming towards camera or crossing
            // Let's make them rain down-ish (in Z/Y space)
            meteor.rotation.x = Math.PI / 2;
            meteor.rotation.z = -Math.PI / 4; // Slanted

            // Custom velocity property
            meteor.userData = {
                speed: 2 + Math.random() * 3
            };
        };

        // Create pool
        for(let i=0; i<meteorCount; i++) {
            createMeteor();
        }

        // Animation Loop
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Animate meteors
            meteors.forEach(meteor => {
                meteor.position.x -= meteor.userData.speed;
                meteor.position.y -= meteor.userData.speed;
                meteor.position.z += meteor.userData.speed;

                // Reset if out of bounds
                if (meteor.position.z > 50 || meteor.position.y < -200) {
                    resetMeteor(meteor);
                    meteor.position.z = -200; // Reset far back
                }
            });

            // Subtle star movement (optional)
            stars.rotation.y += 0.0002;

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            cancelAnimationFrame(animationId);
            // Dispose geometries/materials to avoid leaks
            starGeo.dispose();
            starMat.dispose();
            meteors.forEach(m => {
                m.geometry.dispose();
                m.material.dispose();
            });
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none"
            id="meteor-canvas"
        />
    );
};

export default MeteorShower;
