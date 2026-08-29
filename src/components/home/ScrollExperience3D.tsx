'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Landmark, Eye, Clock, Compass } from 'lucide-react';
import Card3DTilt from '@/components/common/Card3DTilt';
import HeritageImage from '@/components/common/HeritageImage';

export default function ScrollExperience3D() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      epoch: 'c. 2600 BCE',
      title: 'Indus Valley Urbanism',
      subtitle: 'Harappan Metallurgy & Grid Cities',
      desc: 'Lost-wax bronze metallurgy, steatite seals, and standardized burnt-brick architecture across Mohenjo-daro and Dholavira.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dancing_girl_of_Mohenjo-daro.jpg',
      badge: 'Urban Civil Engineering',
      link: '/timeline?epoch=indus-valley'
    },
    {
      epoch: 'c. 300 BCE',
      title: 'Mauryan Imperial Zenith',
      subtitle: 'Ashokan Rock Edicts & Polished Sandstone',
      desc: 'Monolithic pillars with mirror polish, the Sarnath Lion Capital, and pan-Indian cultural missions advocating Dhamma.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lion_Capital_of_Ashoka_2.jpg',
      badge: 'Subcontinental Unity',
      link: '/timeline?epoch=mauryan-era'
    },
    {
      epoch: 'c. 5th Century CE',
      title: 'Gupta Golden Classical Age',
      subtitle: 'Ajanta Cave Murals & Mathematics',
      desc: 'The formulation of zero, Aryabhatiya astronomy, classical Sanskrit poetry of Kalidasa, and eternal mineral frescoes at Ajanta.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ajanta_Padmapani.jpg',
      badge: 'Classical Arts & Sciences',
      link: '/timeline?epoch=gupta-era'
    },
    {
      epoch: 'c. 11th Century CE',
      title: 'Imperial Chola Dynasties',
      subtitle: 'Lost-Wax Panchaloha Bronzes & Granite Vimanas',
      desc: 'Master sculptors cast the cosmic Nataraja while royal architects built the 66-meter monolithic granite Brihadisvara tower.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg',
      badge: 'Maritime Supremacy',
      link: '/timeline?epoch=chola-era'
    },
    {
      epoch: '2026 CE — Present',
      title: 'Digital Living Heritage',
      subtitle: 'AI Preservation & Multimodal Museums',
      desc: 'Preserving 5,000 years of civilization through 3D scanning, multimodal AI neural archives, and GI-tag artisan empowerment.',
      img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kathakali_dancer.jpg',
      badge: 'Living Continuity',
      link: '/explore'
    }
  ];

  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const container = canvasContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x12100e, 0.045);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffecd0, 0.9);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xf59e0b, 3.5, 40);
    goldPoint.position.set(0, 5, 10);
    scene.add(goldPoint);

    const cyanPoint = new THREE.PointLight(0xb45309, 2.8, 30);
    cyanPoint.position.set(-8, -4, 5);
    scene.add(cyanPoint);

    // 3D Civilizational Tunnel Ring Geometries
    const ringCount = 20;
    const ringGroup = new THREE.Group();
    const rings: THREE.Mesh[] = [];

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true
    });

    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.TorusGeometry(3.5 + Math.sin(i * 0.4) * 0.6, 0.04, 16, 64);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -i * 3.5;
      ringGroup.add(ring);
      rings.push(ring);
    }
    scene.add(ringGroup);

    // 3,000 Star Particle Field
    const particleCount = 3000;
    const particleGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xf59e0b);
    const c2 = new THREE.Color(0xef4444);
    const c3 = new THREE.Color(0xfffbeb);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 70 - 15;

      const clr = Math.random() > 0.6 ? c1 : Math.random() > 0.3 ? c2 : c3;
      col[i * 3] = clr.r;
      col[i * 3 + 1] = clr.g;
      col[i * 3 + 2] = clr.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Floating 3D Geometric Glyphs in Space
    const glyphGroup = new THREE.Group();
    const glyphs: THREE.Mesh[] = [];

    for (let g = 0; g < 8; g++) {
      const geo = g % 2 === 0 ? new THREE.OctahedronGeometry(0.8, 0) : new THREE.IcosahedronGeometry(0.7, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.95,
        roughness: 0.15,
        wireframe: g % 3 === 0
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10, -g * 7);
      glyphGroup.add(mesh);
      glyphs.push(mesh);
    }
    scene.add(glyphGroup);

    // Scroll Listener
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      targetScrollY = progress;

      const stageIndex = Math.min(4, Math.floor(progress * 5));
      setActiveStage(stageIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Resize
    const handleResize = () => {
      if (!canvasContainerRef.current) return;
      const nw = canvasContainerRef.current.clientWidth;
      const nh = canvasContainerRef.current.clientHeight;
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

      // Smooth scroll lerp
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Move camera through 3D tunnel based on scroll
      camera.position.z = 18 - scrollY * 45;
      camera.position.x = Math.sin(scrollY * Math.PI * 2) * 1.8;
      camera.position.y = Math.cos(scrollY * Math.PI * 2) * 1.2;
      camera.rotation.z = scrollY * Math.PI * 0.5;

      // Rotate rings
      rings.forEach((r, idx) => {
        r.rotation.z = elapsed * 0.3 + idx * 0.15;
        r.scale.setScalar(1 + Math.sin(elapsed * 1.5 + idx) * 0.05);
      });

      // Rotate floating glyphs
      glyphs.forEach((gl, idx) => {
        gl.rotation.x = elapsed * 0.5 + idx;
        gl.rotation.y = elapsed * 0.4 + idx;
      });

      // Rotate particle field
      particles.rotation.z = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#12100E] text-white py-24 sm:py-32 border-b border-[#78350F]/40 overflow-hidden"
    >
      {/* 3D WebGL Background Canvas */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-amber-300 text-xs font-sans font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Scroll Journey</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Journey Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400">
              5,000 Years of Eternity
            </span>
          </h2>
          <p className="font-serif-editorial text-lg sm:text-xl text-[#D6D3D1] font-normal leading-relaxed">
            Scroll down to fly through our three-dimensional civilizational wormhole, uncovering the defining eras of Indian architecture, philosophy, and metallurgy.
          </p>
        </div>

        {/* 3D Interactive Stage Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Epoch Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {stages.map((st, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={st.title}
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#78350F]/70 to-[#451A03]/60 border-[#F59E0B] shadow-lg shadow-amber-950/40 ring-1 ring-[#F59E0B]/40'
                      : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors ${
                        isActive ? 'bg-[#F59E0B] text-black' : 'bg-white/10 text-stone-300'
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 block">
                        {st.epoch}
                      </span>
                      <h4 className="font-serif-display text-base sm:text-lg font-bold text-white">
                        {st.title}
                      </h4>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#F59E0B] translate-x-1' : 'text-stone-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: 3D Stage Card Focus */}
          <div className="lg:col-span-7">
            <Card3DTilt maxTilt={8} scaleOnHover={1.01} className="rounded-3xl">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1C1917] to-[#0C0A09] border border-amber-500/30 shadow-2xl p-6 sm:p-8 space-y-6">
                
                {/* Visual Frame */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-stone-900 border border-white/10 shadow-inner">
                  <HeritageImage
                    src={stages[activeStage].img}
                    alt={stages[activeStage].title}
                    className="w-full h-full object-cover object-center brightness-95 transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-[11px] font-mono font-semibold text-amber-300">
                    {stages[activeStage].badge}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-mono uppercase text-amber-300 block">
                      {stages[activeStage].epoch}
                    </span>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                      {stages[activeStage].title}
                    </h3>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="space-y-4">
                  <h4 className="font-serif-display text-xl font-bold text-amber-100">
                    {stages[activeStage].subtitle}
                  </h4>
                  <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
                    {stages[activeStage].desc}
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-mono">
                    Civilizational Milestone {activeStage + 1} of 5
                  </span>
                  <Link
                    href={stages[activeStage].link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-sans font-semibold transition-all shadow-md group"
                  >
                    <span>Examine Artifacts of this Era</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </Card3DTilt>
          </div>

        </div>

      </div>
    </section>
  );
}
