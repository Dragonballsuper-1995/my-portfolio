import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MeteorShower = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    // Create stars
    const starCount = 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starVel = new Float32Array(starCount); // Velocity for each star

    for(let i = 0; i < starCount; i++) {
        starPos[i*3] = (Math.random() - 0.5) * 600;     // x
        starPos[i*3+1] = (Math.random() - 0.5) * 600;   // y
        starPos[i*3+2] = -Math.random() * 200;          // z (depth)
        starVel[i] = 0;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

    // Create sprite for stars
    const sprite = new THREE.TextureLoader().load('/assets/star.png', (texture) => {
        // Optional: handle texture load
    }, undefined, (err) => {
        // Create fallback circle texture if image fails
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(16, 16, 16, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.fill();
        // Use this canvas as texture... simplified for now, relying on points
    });

    const starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        transparent: true
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // Meteors
    const meteorCount = 10;
    const meteors = [];
    const meteorGeo = new THREE.BufferGeometry();
    const meteorPos = new Float32Array(meteorCount * 3); // 2 points per line

    // Simplified meteor implementation using lines
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });

    for(let i=0; i<meteorCount; i++) {
        // Create individual meteor objects
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 3, 0) // Length of tail
        ]);
        const line = new THREE.Line(geometry, lineMaterial);

        // Random start position
        resetMeteor(line);

        scene.add(line);
        meteors.push({ mesh: line, speed: Math.random() * 0.5 + 0.5 });
    }

    function resetMeteor(meteor) {
        meteor.position.x = (Math.random() - 0.5) * 400;
        meteor.position.y = (Math.random() - 0.5) * 400;
        meteor.position.z = -Math.random() * 100;

        // Random rotation to look like it's coming from a radiant
        meteor.rotation.z = Math.random() * Math.PI;
        meteor.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                0
            )
        };
    }

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Move stars slightly
        stars.rotation.y += 0.0002;

        // Move meteors
        meteors.forEach(m => {
            m.mesh.position.z += m.speed * 2;
            m.mesh.position.y -= m.speed;

            // Reset if out of bounds
            if (m.mesh.position.z > 50 || m.mesh.position.y < -300) {
                resetMeteor(m.mesh);
                m.mesh.position.z = -200;
            }
        });

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
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Cleanup Three.js resources
      starGeo.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none" />;
};

export default MeteorShower;
