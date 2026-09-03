import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Sun, Moon, Eye, Image as ImageIcon } from 'lucide-react';
import { HeritageItem } from '../types';

interface ArtifactViewer3DProps {
  item: HeritageItem;
  highContrast?: boolean;
}

export const ArtifactViewer3D: React.FC<ArtifactViewer3DProps> = ({ item, highContrast }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');
  const [isRotating, setIsRotating] = useState(true);
  const [lightingPreset, setLightingPreset] = useState<'museum' | 'direct' | 'dramatic'>('museum');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (viewMode !== '3d' || !mountRef.current) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        setViewMode('photo');
        return;
      }
    } catch {
      setWebGlSupported(false);
      setViewMode('photo');
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(highContrast ? 0x111111 : 0xF3EFEA);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, lightingPreset === 'museum' ? 0.8 : lightingPreset === 'direct' ? 1.2 : 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd2, lightingPreset === 'dramatic' ? 2.2 : 1.4);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd4af37, 1.2, 10);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // 4. Archival Pedestal & Specimen Mesh
    const group = new THREE.Group();

    // Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.15, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: highContrast ? 0x222222 : 0xDDD8CE,
      roughness: 0.7,
      metalness: 0.1
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.2;
    pedestal.receiveShadow = true;
    group.add(pedestal);

    // Dynamic Geometry based on artifact category
    let artifactMesh: THREE.Mesh;
    const tintColor = item.model3DConfig?.colorTint || (item.category === 'Artifacts' ? 0xB8860B : 0x8B7355);

    if (item.id.includes('nataraja') || item.category === 'Artifacts') {
      // Ring (Prabhamandala) + Central Totem
      const ringGeo = new THREE.TorusGeometry(0.85, 0.05, 16, 64);
      const mat = new THREE.MeshStandardMaterial({ color: tintColor, metalness: 0.75, roughness: 0.3 });
      const ring = new THREE.Mesh(ringGeo, mat);
      ring.position.y = -0.1;
      group.add(ring);

      const coreGeo = new THREE.CylinderGeometry(0.12, 0.25, 1.2, 16);
      artifactMesh = new THREE.Mesh(coreGeo, mat);
      artifactMesh.position.y = -0.1;
      group.add(artifactMesh);
    } else if (item.category === 'Monuments') {
      // Stepped Temple Vimana Pyramidal Form
      const vimanaGeo = new THREE.ConeGeometry(0.9, 1.7, 4);
      const mat = new THREE.MeshStandardMaterial({ color: 0x8B7D6B, roughness: 0.9, metalness: 0.05 });
      artifactMesh = new THREE.Mesh(vimanaGeo, mat);
      artifactMesh.position.y = -0.2;
      group.add(artifactMesh);
    } else {
      // Carved Column / Stele
      const boxGeo = new THREE.BoxGeometry(0.7, 1.5, 0.4);
      const mat = new THREE.MeshStandardMaterial({ color: tintColor, roughness: 0.6, metalness: 0.2 });
      artifactMesh = new THREE.Mesh(boxGeo, mat);
      artifactMesh.position.y = -0.1;
      group.add(artifactMesh);
    }

    scene.add(group);

    // 5. Interactive Mouse/Touch Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { isDragging = false; };

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 6. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        group.rotation.y += 0.005;
      }
      camera.position.z = 4 / zoomLevel;
      renderer.render(scene, camera);
    };
    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 480;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [viewMode, isRotating, lightingPreset, zoomLevel, highContrast, item]);

  return (
    <div className={`relative rounded-2xl overflow-hidden border ${
      highContrast ? 'bg-stone-950 border-stone-800' : 'bg-[#F6F3ED] border-stone-200'
    }`}>
      {/* Top View Mode Switcher */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-sm border border-stone-200 text-xs">
        <button
          onClick={() => setViewMode('3d')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
            viewMode === '3d' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>360° Studio</span>
        </button>
        <button
          onClick={() => setViewMode('photo')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
            viewMode === 'photo' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Archival Photo</span>
        </button>
      </div>

      {/* Lighting & Rotation Controls (for 3D Mode) */}
      {viewMode === '3d' && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-sm border border-stone-200 text-xs">
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            className={`p-1.5 rounded-lg transition-colors ${
              isRotating ? 'bg-stone-200 text-stone-900' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
            title="Zoom in"
            className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
            title="Zoom out"
            className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLightingPreset(prev => prev === 'museum' ? 'dramatic' : prev === 'dramatic' ? 'direct' : 'museum')}
            title={`Lighting: ${lightingPreset}`}
            className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          >
            {lightingPreset === 'dramatic' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Main Display Area */}
      {viewMode === '3d' && webGlSupported ? (
        <div className="relative w-full h-[460px] cursor-grab active:cursor-grabbing">
          <div ref={mountRef} className="w-full h-full" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[11px] font-medium text-stone-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-200 shadow-sm pointer-events-none">
            Drag to inspect 360° • Scroll/Pinch to zoom
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[460px] flex items-center justify-center bg-stone-900 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl">
            <span>{item.repository}</span>
            <span className="text-stone-300 font-mono text-[11px]">{item.accessionNo}</span>
          </div>
        </div>
      )}
    </div>
  );
};
