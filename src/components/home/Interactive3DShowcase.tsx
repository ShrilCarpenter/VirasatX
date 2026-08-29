'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Rotate3d, Sun, Flame, Sparkles, Layers, Box, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Interactive3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<'nataraja' | 'ashoka' | 'konark' | 'kailasa'>('nataraja');
  const [materialPreset, setMaterialPreset] = useState<'bronze' | 'sandstone' | 'gold' | 'basalt' | 'terracotta'>('bronze');
  const [lightingPreset, setLightingPreset] = useState<'museum' | 'diya' | 'sunset'>('diya');
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lights Group
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;
    updateLighting(lightingPreset, lightsGroup);

    // Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;
    buildArtModel(activeModel, materialPreset, isWireframe, modelGroup);

    // Floor Reflection Grid
    const grid = new THREE.GridHelper(16, 24, 0xd97706, 0x44403c);
    grid.position.y = -2.2;
    scene.add(grid);

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modelGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.clientWidth;
      const nh = containerRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isAutoRotate && modelGroupRef.current && !isDragging) {
        modelGroupRef.current.rotation.y = elapsed * 0.35;
        modelGroupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [activeModel, materialPreset, lightingPreset, isWireframe, isAutoRotate]);

  // Lighting Preset Handler
  const updateLighting = (preset: string, group: THREE.Group) => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    if (preset === 'diya') {
      // Sacred Diya Warm Amber Flame Flicker
      const ambient = new THREE.AmbientLight(0x78350f, 1.2);
      group.add(ambient);

      const mainFlame = new THREE.PointLight(0xf59e0b, 4.0, 20);
      mainFlame.position.set(2, 2, 4);
      group.add(mainFlame);

      const secondaryFlame = new THREE.PointLight(0xd97706, 2.5, 15);
      secondaryFlame.position.set(-3, -1, 3);
      group.add(secondaryFlame);
    } else if (preset === 'sunset') {
      // Golden Hour Sunset
      const ambient = new THREE.AmbientLight(0x451a03, 0.8);
      group.add(ambient);

      const sun = new THREE.DirectionalLight(0xfb923c, 3.5);
      sun.position.set(6, 4, 5);
      group.add(sun);

      const blueSkyRim = new THREE.DirectionalLight(0x38bdf8, 1.5);
      blueSkyRim.position.set(-6, -2, -4);
      group.add(blueSkyRim);
    } else {
      // Museum Studio Halogen
      const ambient = new THREE.AmbientLight(0xfef3c7, 1.4);
      group.add(ambient);

      const keySpot = new THREE.SpotLight(0xfffbeb, 4.0, 30, Math.PI / 4, 0.3);
      keySpot.position.set(0, 7, 5);
      group.add(keySpot);

      const rim = new THREE.DirectionalLight(0xb45309, 2.0);
      rim.position.set(-4, -2, -3);
      group.add(rim);
    }
  };

  // 3D Model & Material Generator
  const buildArtModel = (model: string, matType: string, wireframe: boolean, group: THREE.Group) => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    let mat: THREE.MeshStandardMaterial;

    if (matType === 'bronze') {
      mat = new THREE.MeshStandardMaterial({
        color: 0x854d0e,
        metalness: 0.88,
        roughness: 0.28,
        wireframe,
      });
    } else if (matType === 'sandstone') {
      mat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.05,
        roughness: 0.82,
        wireframe,
      });
    } else if (matType === 'gold') {
      mat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.96,
        roughness: 0.15,
        wireframe,
      });
    } else if (matType === 'basalt') {
      mat = new THREE.MeshStandardMaterial({
        color: 0x292524,
        metalness: 0.2,
        roughness: 0.9,
        wireframe,
      });
    } else {
      // Terracotta
      mat = new THREE.MeshStandardMaterial({
        color: 0xc2410c,
        metalness: 0.02,
        roughness: 0.88,
        wireframe,
      });
    }

    const goldAccent = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
      wireframe,
    });

    if (model === 'nataraja') {
      // 3D Nataraja Cosmic Dance Composition
      const natarajaGroup = new THREE.Group();

      // Fire Ring (Prabhamandala)
      const fireHalo = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.08, 16, 64), mat);
      natarajaGroup.add(fireHalo);

      // Flame Pips around Halo
      for (let i = 0; i < 28; i++) {
        const angle = (i / 28) * Math.PI * 2;
        const flamePip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 8), goldAccent);
        flamePip.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0);
        flamePip.rotation.z = angle - Math.PI / 2;
        natarajaGroup.add(flamePip);
      }

      // Torso & Divine Figure Abstract Rig
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 1.2, 16), mat);
      torso.position.y = 0.2;
      natarajaGroup.add(torso);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20), mat);
      head.position.y = 1.0;
      natarajaGroup.add(head);

      const crown = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.5, 12), goldAccent);
      crown.position.y = 1.4;
      natarajaGroup.add(crown);

      // Four Arms
      const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8), mat);
      arm1.position.set(0.65, 0.6, 0);
      arm1.rotation.z = -Math.PI / 3;
      natarajaGroup.add(arm1);

      const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8), mat);
      arm2.position.set(-0.65, 0.6, 0);
      arm2.rotation.z = Math.PI / 3;
      natarajaGroup.add(arm2);

      const arm3 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.3, 8), mat);
      arm3.position.set(-0.3, 0.1, 0.2);
      arm3.rotation.z = Math.PI / 6;
      natarajaGroup.add(arm3);

      // Lotus Pedestal (Padmapitha)
      const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 0.4, 32), mat);
      pedestal.position.y = -1.6;
      natarajaGroup.add(pedestal);

      group.add(natarajaGroup);
    } else if (model === 'ashoka') {
      // 3D Ashoka Lion Capital
      const ashokaGroup = new THREE.Group();

      // Inverted Lotus Bell Base
      const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 1.0, 32), mat);
      bell.position.y = -1.2;
      ashokaGroup.add(bell);

      // Circular Abacus with Relief Wheels
      const abacus = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.45, 32), goldAccent);
      abacus.position.y = -0.4;
      ashokaGroup.add(abacus);

      // Four Back-to-Back Lions (Sculptural Prisms)
      for (let l = 0; l < 4; l++) {
        const lionGroup = new THREE.Group();
        const angle = (l / 4) * Math.PI * 2;

        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.2, 0.8), mat);
        body.position.set(0, 0.4, 0.45);
        lionGroup.add(body);

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), mat);
        head.position.set(0, 1.1, 0.65);
        lionGroup.add(head);

        const mane = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.12, 12, 24), goldAccent);
        mane.position.set(0, 0.9, 0.55);
        lionGroup.add(mane);

        lionGroup.rotation.y = angle;
        ashokaGroup.add(lionGroup);
      }

      group.add(ashokaGroup);
    } else if (model === 'konark') {
      // 3D Konark Sun Temple Giant Chariot Wheel
      const konarkGroup = new THREE.Group();

      const outerRim = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.16, 24, 64), mat);
      konarkGroup.add(outerRim);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.5, 32), mat);
      hub.rotation.x = Math.PI / 2;
      konarkGroup.add(hub);

      for (let s = 0; s < 24; s++) {
        const ang = (s / 24) * Math.PI * 2;
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 2.0, 12), s % 2 === 0 ? mat : goldAccent);
        spoke.position.set(Math.cos(ang) * 1.0, Math.sin(ang) * 1.0, 0);
        spoke.rotation.z = ang - Math.PI / 2;
        konarkGroup.add(spoke);

        // Medallion on each spoke
        const medallion = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16), goldAccent);
        medallion.position.set(Math.cos(ang) * 1.6, Math.sin(ang) * 1.6, 0);
        medallion.rotation.x = Math.PI / 2;
        konarkGroup.add(medallion);
      }

      group.add(konarkGroup);
    } else {
      // 3D Kailasa Monolithic Temple Complex
      const kailasaGroup = new THREE.Group();

      const rockBase = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.5, 3.0), mat);
      rockBase.position.y = -1.6;
      kailasaGroup.add(rockBase);

      const sanctum = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.2, 2.0), mat);
      sanctum.position.y = -0.7;
      kailasaGroup.add(sanctum);

      // Dravidian Vimana Tiered Roof
      for (let lvl = 0; lvl < 6; lvl++) {
        const w = 1.8 - lvl * 0.25;
        const tier = new THREE.Mesh(new THREE.BoxGeometry(w, 0.35, w), lvl % 2 === 0 ? mat : goldAccent);
        tier.position.y = 0.1 + lvl * 0.38;
        kailasaGroup.add(tier);
      }

      const finial = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.7, 16), goldAccent);
      finial.position.y = 2.4;
      kailasaGroup.add(finial);

      // Two Free-Standing Victory Pillars (Dhwajasthambhas)
      const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2.4, 16), mat);
      p1.position.set(1.4, -0.4, 1.4);
      kailasaGroup.add(p1);

      const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2.4, 16), mat);
      p2.position.set(-1.4, -0.4, 1.4);
      kailasaGroup.add(p2);

      group.add(kailasaGroup);
    }
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-[#181614] text-white border-b border-[#78350F]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9A3412]/30 border border-[#9A3412] text-amber-300 text-xs font-sans font-semibold tracking-wider uppercase">
              <Rotate3d className="w-3.5 h-3.5" />
              <span>Interactive 3D WebGL Studio</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              3D Masterpiece Inspector
            </h2>
            <p className="font-serif-editorial text-lg text-stone-300 max-w-2xl">
              Rotate, inspect, and analyze the sacred geometry, lost-wax metallurgy, and material patinas of India’s most celebrated treasures in full 360° 3D space.
            </p>
          </div>

          <Link
            href="/gallery/sculpture-gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-sans font-semibold transition-all shadow-md group shrink-0"
          >
            <span>Enter Full Virtual Museum</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Canvas Viewport */}
          <div className="lg:col-span-8 relative min-h-[440px] sm:min-h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1C1917] via-[#0C0A09] to-[#1C1917] border border-amber-500/30 shadow-2xl p-4 flex flex-col justify-between">
            
            {/* Viewport Header */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-amber-200 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Drag to Rotate • 60 FPS WebGL</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  title="Toggle Sacred Geometry Wireframe"
                  className={`p-2 rounded-full backdrop-blur-md border text-xs transition-colors ${
                    isWireframe ? 'bg-amber-500 text-black border-amber-400' : 'bg-black/60 text-stone-300 border-white/10 hover:text-white'
                  }`}
                >
                  <Box className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  title="Toggle Auto Rotation"
                  className={`p-2 rounded-full backdrop-blur-md border text-xs transition-colors ${
                    isAutoRotate ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-black/60 text-stone-300 border-white/10'
                  }`}
                >
                  <Rotate3d className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3D Canvas */}
            <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Viewport Bottom Floating Caption */}
            <div className="relative z-10 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-mono text-amber-300 uppercase block">Active 3D Artifact:</span>
                <strong className="text-white font-serif-display text-sm">
                  {activeModel === 'nataraja' && 'Nataraja — Lord of the Cosmic Dance (Chola Lost-Wax Bronze)'}
                  {activeModel === 'ashoka' && 'Lion Capital of Ashoka (Mauryan Mirror-Polished Sandstone)'}
                  {activeModel === 'konark' && 'Konark Sun Temple 24-Spoke Chariot Sundial (Ganga Dynasty)'}
                  {activeModel === 'kailasa' && 'Kailasa Monolithic Rock-Cut Temple Complex (Rashtrakuta Dynasty)'}
                </strong>
              </div>
              <span className="text-[10px] font-mono text-stone-400 hidden sm:inline">
                PBR Shaders Enabled
              </span>
            </div>

          </div>

          {/* Right Column: Studio Controls Panel */}
          <div className="lg:col-span-4 rounded-3xl bg-[#201D1A] border border-[#78350F]/40 p-6 flex flex-col justify-between space-y-6 shadow-xl">
            
            {/* Artifact Model Selectors */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                1. Select Heritage Treasure:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveModel('nataraja')}
                  className={`p-3 rounded-xl text-left border text-xs font-sans font-medium transition-all ${
                    activeModel === 'nataraja' ? 'bg-[#9A3412] text-white border-amber-400 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-stone-300'
                  }`}
                >
                  <strong className="block">Chola Nataraja</strong>
                  <span className="text-[10px] opacity-80">11th c. Tamil Nadu</span>
                </button>
                <button
                  onClick={() => setActiveModel('ashoka')}
                  className={`p-3 rounded-xl text-left border text-xs font-sans font-medium transition-all ${
                    activeModel === 'ashoka' ? 'bg-[#9A3412] text-white border-amber-400 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-stone-300'
                  }`}
                >
                  <strong className="block">Ashoka Lions</strong>
                  <span className="text-[10px] opacity-80">c. 250 BCE Sarnath</span>
                </button>
                <button
                  onClick={() => setActiveModel('konark')}
                  className={`p-3 rounded-xl text-left border text-xs font-sans font-medium transition-all ${
                    activeModel === 'konark' ? 'bg-[#9A3412] text-white border-amber-400 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-stone-300'
                  }`}
                >
                  <strong className="block">Konark Wheel</strong>
                  <span className="text-[10px] opacity-80">13th c. Odisha</span>
                </button>
                <button
                  onClick={() => setActiveModel('kailasa')}
                  className={`p-3 rounded-xl text-left border text-xs font-sans font-medium transition-all ${
                    activeModel === 'kailasa' ? 'bg-[#9A3412] text-white border-amber-400 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-stone-300'
                  }`}
                >
                  <strong className="block">Kailasa Ellora</strong>
                  <span className="text-[10px] opacity-80">8th c. Basalt Monolith</span>
                </button>
              </div>
            </div>

            {/* Material Texture Preset */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                2. Physical Material Shader:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'bronze', label: 'Chola Bronze', color: 'bg-yellow-900 border-yellow-700' },
                  { id: 'sandstone', label: 'Chunar Sandstone', color: 'bg-amber-700 border-amber-600' },
                  { id: 'gold', label: 'Imperial 24K Gold', color: 'bg-amber-500 border-amber-400' },
                  { id: 'basalt', label: 'Volcanic Basalt', color: 'bg-stone-800 border-stone-600' },
                  { id: 'terracotta', label: 'Terracotta Clay', color: 'bg-orange-800 border-orange-600' },
                ].map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => setMaterialPreset(mat.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                      materialPreset === mat.id ? `${mat.color} text-white ring-2 ring-amber-400` : 'bg-black/40 border-white/10 text-stone-300'
                    }`}
                  >
                    {materialPreset === mat.id && <Check className="w-3 h-3 text-amber-300" />}
                    <span>{mat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Curatorial Lighting Atmosphere */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                3. Ambient Museum Lighting:
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setLightingPreset('diya')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    lightingPreset === 'diya' ? 'bg-amber-600/30 border-amber-400 text-amber-200' : 'bg-black/40 border-white/10 text-stone-400'
                  }`}
                >
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Sacred Diya</span>
                </button>
                <button
                  onClick={() => setLightingPreset('sunset')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    lightingPreset === 'sunset' ? 'bg-amber-600/30 border-amber-400 text-amber-200' : 'bg-black/40 border-white/10 text-stone-400'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Golden Hour</span>
                </button>
                <button
                  onClick={() => setLightingPreset('museum')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    lightingPreset === 'museum' ? 'bg-amber-600/30 border-amber-400 text-amber-200' : 'bg-black/40 border-white/10 text-stone-400'
                  }`}
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Studio Halogen</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
