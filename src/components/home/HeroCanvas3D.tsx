'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass, Rotate3d, Layers, Maximize2 } from 'lucide-react';

export default function HeroCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<'chakra' | 'temple' | 'yantra' | 'torus'>('chakra');
  const [materialType, setMaterialType] = useState<'gold' | 'bronze' | 'sandstone'>('gold');
  const [isRotating, setIsRotating] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const artifactGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Clear previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 3.0);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb45309, 2.5);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xd97706, 2.0, 15);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    // Artifact Group
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);
    artifactGroupRef.current = artifactGroup;

    // Build Initial 3D Model
    buildModel(activeModel, materialType, artifactGroup);

    // 2,000 Golden Ember Cosmic Particles
    const particleCount = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const goldColor = new THREE.Color(0xd97706);
    const amberColor = new THREE.Color(0xf59e0b);
    const whiteColor = new THREE.Color(0xfffbeb);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const mixedColor = Math.random() > 0.6 ? goldColor : Math.random() > 0.3 ? amberColor : whiteColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2.5 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.8;
      mouseRef.current.targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate 3D Artifact
      if (artifactGroupRef.current) {
        if (isRotating) {
          artifactGroupRef.current.rotation.y = elapsedTime * 0.4 + mouseRef.current.x * 0.6;
          artifactGroupRef.current.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + mouseRef.current.y * 0.4;
        } else {
          artifactGroupRef.current.rotation.y = mouseRef.current.x * 1.2;
          artifactGroupRef.current.rotation.x = mouseRef.current.y * 0.8;
        }
        artifactGroupRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.12;
      }

      // Rotate Particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;
      }

      // Move fill light with mouse
      fillLight.position.x = mouseRef.current.x * 4;
      fillLight.position.y = mouseRef.current.y * 4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [activeModel, materialType, isRotating]);

  // Model & Material Builder
  const buildModel = (model: string, mat: string, group: THREE.Group) => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    let primaryMaterial: THREE.Material;

    if (mat === 'gold') {
      primaryMaterial = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.92,
        roughness: 0.18,
        emissive: 0x78350f,
        emissiveIntensity: 0.15,
      });
    } else if (mat === 'bronze') {
      primaryMaterial = new THREE.MeshStandardMaterial({
        color: 0x92400e,
        metalness: 0.85,
        roughness: 0.35,
        emissive: 0x451a03,
        emissiveIntensity: 0.1,
      });
    } else {
      primaryMaterial = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.1,
        roughness: 0.75,
      });
    }

    const secondaryMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.12,
      wireframe: false
    });

    if (model === 'chakra') {
      // 3D Ashoka / Konark Sun Temple Chariot Wheel with 24 Radial Spokes
      const wheelGroup = new THREE.Group();

      // Outer Rim
      const outerTorus = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.12, 24, 64), primaryMaterial);
      wheelGroup.add(outerTorus);

      const innerTorus = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.08, 20, 64), secondaryMaterial);
      wheelGroup.add(innerTorus);

      // Central Hub
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32), primaryMaterial);
      hub.rotation.x = Math.PI / 2;
      wheelGroup.add(hub);

      const hubCore = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 24), secondaryMaterial);
      wheelGroup.add(hubCore);

      // 24 Spokes
      const spokeGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.8, 12);
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const spoke = new THREE.Mesh(spokeGeo, i % 2 === 0 ? primaryMaterial : secondaryMaterial);
        spoke.position.set(Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0);
        spoke.rotation.z = angle - Math.PI / 2;
        wheelGroup.add(spoke);

        // Decorative Jewel on each spoke
        const jewel = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), secondaryMaterial);
        jewel.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0);
        wheelGroup.add(jewel);
      }

      // Outer Sacred Halo Ring
      const halo = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.04, 16, 64), secondaryMaterial);
      wheelGroup.add(halo);

      group.add(wheelGroup);
    } else if (model === 'temple') {
      // 3D Nagara / Dravidian Temple Vimana Prototype
      const templeGroup = new THREE.Group();

      // Plinth Base (Upapitha)
      const base1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 2.4), primaryMaterial);
      base1.position.y = -1.5;
      templeGroup.add(base1);

      const base2 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.25, 2.0), secondaryMaterial);
      base2.position.y = -1.25;
      templeGroup.add(base2);

      // Sanctum (Garbhagriha walls)
      const sanctum = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 1.6), primaryMaterial);
      sanctum.position.y = -0.7;
      templeGroup.add(sanctum);

      // Tiered Superstructure (Shikhara/Vimana)
      for (let t = 0; t < 5; t++) {
        const size = 1.4 - t * 0.22;
        const tier = new THREE.Mesh(new THREE.BoxGeometry(size, 0.3, size), t % 2 === 0 ? primaryMaterial : secondaryMaterial);
        tier.position.y = -0.1 + t * 0.32;
        templeGroup.add(tier);

        // Corner mini shrines (Kutas)
        const cornerSize = 0.18;
        const c1 = new THREE.Mesh(new THREE.BoxGeometry(cornerSize, 0.2, cornerSize), secondaryMaterial);
        c1.position.set(size / 2, -0.1 + t * 0.32, size / 2);
        templeGroup.add(c1);
        const c2 = new THREE.Mesh(new THREE.BoxGeometry(cornerSize, 0.2, cornerSize), secondaryMaterial);
        c2.position.set(-size / 2, -0.1 + t * 0.32, size / 2);
        templeGroup.add(c2);
        const c3 = new THREE.Mesh(new THREE.BoxGeometry(cornerSize, 0.2, cornerSize), secondaryMaterial);
        c3.position.set(size / 2, -0.1 + t * 0.32, -size / 2);
        templeGroup.add(c3);
        const c4 = new THREE.Mesh(new THREE.BoxGeometry(cornerSize, 0.2, cornerSize), secondaryMaterial);
        c4.position.set(-size / 2, -0.1 + t * 0.32, -size / 2);
        templeGroup.add(c4);
      }

      // Amalaka (Ribbed Stone Cap)
      const amalaka = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.25, 24), secondaryMaterial);
      amalaka.position.y = 1.6;
      templeGroup.add(amalaka);

      // Kalasha (Golden Pot Pinnacle)
      const kalasha = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.6, 16), secondaryMaterial);
      kalasha.position.y = 2.0;
      templeGroup.add(kalasha);

      group.add(templeGroup);
    } else if (model === 'yantra') {
      // 3D Sri Yantra / Sacred Cosmic Geometry
      const yantraGroup = new THREE.Group();

      const octahedron1 = new THREE.Mesh(new THREE.OctahedronGeometry(1.6, 0), primaryMaterial);
      yantraGroup.add(octahedron1);

      const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 0), secondaryMaterial);
      yantraGroup.add(icosahedron);

      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.05, 16, 64), primaryMaterial);
      ring1.rotation.x = Math.PI / 2;
      yantraGroup.add(ring1);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.05, 16, 64), secondaryMaterial);
      ring2.rotation.y = Math.PI / 2;
      yantraGroup.add(ring2);

      const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.05, 16, 64), primaryMaterial);
      yantraGroup.add(ring3);

      group.add(yantraGroup);
    } else {
      // 3D Sacred Knot / Nataraja Fire Halo Topology
      const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.4, 0.35, 128, 32, 2, 3), primaryMaterial);
      group.add(torusKnot);

      const innerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), secondaryMaterial);
      group.add(innerSphere);
    }
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[540px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1C1917] via-[#292524] to-[#1C1917] border border-[#78350F]/40 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#F59E0B]/30 text-xs font-sans text-amber-200">
        <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
        <span className="font-semibold tracking-wide uppercase text-[11px]">Real-Time 3D WebGL Engine</span>
      </div>

      {/* Top Right Fullscreen / Reset Button */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          title="Toggle Auto Rotation"
          className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#F59E0B] text-amber-200 hover:text-white transition-colors"
        >
          <Rotate3d className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/70 backdrop-blur-lg border border-white/10 text-white">
        
        {/* Model Switcher */}
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[10px] font-mono uppercase text-[#A8A29E] hidden sm:inline mr-1">3D Artifact:</span>
          <button
            onClick={() => setActiveModel('chakra')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
              activeModel === 'chakra' ? 'bg-[#9A3412] text-white shadow' : 'bg-white/5 hover:bg-white/10 text-stone-300'
            }`}
          >
            Chakra Wheel
          </button>
          <button
            onClick={() => setActiveModel('temple')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
              activeModel === 'temple' ? 'bg-[#9A3412] text-white shadow' : 'bg-white/5 hover:bg-white/10 text-stone-300'
            }`}
          >
            Temple Shikhara
          </button>
          <button
            onClick={() => setActiveModel('yantra')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
              activeModel === 'yantra' ? 'bg-[#9A3412] text-white shadow' : 'bg-white/5 hover:bg-white/10 text-stone-300'
            }`}
          >
            Sri Yantra
          </button>
          <button
            onClick={() => setActiveModel('torus')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
              activeModel === 'torus' ? 'bg-[#9A3412] text-white shadow' : 'bg-white/5 hover:bg-white/10 text-stone-300'
            }`}
          >
            Halo Topology
          </button>
        </div>

        {/* Material Texture Switcher */}
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[10px] font-mono uppercase text-[#A8A29E] hidden sm:inline mr-1">Material:</span>
          <button
            onClick={() => setMaterialType('gold')}
            className={`px-2.5 py-1 rounded text-xs transition-all ${
              materialType === 'gold' ? 'bg-amber-500/30 text-amber-300 border border-amber-500' : 'text-stone-400'
            }`}
          >
            24K Gold
          </button>
          <button
            onClick={() => setMaterialType('bronze')}
            className={`px-2.5 py-1 rounded text-xs transition-all ${
              materialType === 'bronze' ? 'bg-orange-800/40 text-orange-300 border border-orange-700' : 'text-stone-400'
            }`}
          >
            Chola Bronze
          </button>
          <button
            onClick={() => setMaterialType('sandstone')}
            className={`px-2.5 py-1 rounded text-xs transition-all ${
              materialType === 'sandstone' ? 'bg-stone-700 text-stone-200 border border-stone-500' : 'text-stone-400'
            }`}
          >
            Sandstone
          </button>
        </div>

      </div>
    </div>
  );
}
