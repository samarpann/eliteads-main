import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Sphere, OrbitControls, Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

// Location data with lat/lng converted to 3D positions
const locations = [
  { name: "United States", lat: 39.8283, lng: -98.5795 },
  { name: "United Kingdom", lat: 51.5074, lng: -0.1278 },
  { name: "UAE", lat: 23.4241, lng: 53.8478 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "India", lat: 20.5937, lng: 78.9629 },
  { name: "Germany", lat: 51.1657, lng: 10.4515 },
];

// Convert lat/lng to 3D sphere coordinates
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

// Animated location marker
function LocationMarker({ position, delay }: { position: THREE.Vector3; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 2 + delay) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
    if (ringRef.current && ringMatRef.current) {
      const ringScale = 1 + Math.sin(clock.elapsedTime * 1.5 + delay) * 0.5;
      ringRef.current.scale.setScalar(ringScale);
      ringMatRef.current.opacity = 0.5 - Math.sin(clock.elapsedTime * 1.5 + delay) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Glowing core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#00FF88" />
      </mesh>
      {/* Pulsing ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.08, 32]} />
        <meshBasicMaterial ref={ringMatRef} color="#00FF88" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Outer glow */}
      <pointLight color="#00FF88" intensity={0.5} distance={0.5} />
    </group>
  );
}

// Data flow particle traveling along arc
function DataFlowParticle({ 
  curve, 
  color, 
  speed = 1, 
  delay = 0 
}: { 
  curve: THREE.QuadraticBezierCurve3; 
  color: string; 
  speed?: number; 
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const progressRef = useRef(delay % 1);
  
  // Create trail positions
  const trailCount = 8;
  const trailPositions = useMemo(() => new Float32Array(trailCount * 3), []);
  
  useFrame((_, delta) => {
    progressRef.current += delta * speed * 0.3;
    if (progressRef.current > 1) progressRef.current = 0;
    
    const t = progressRef.current;
    const point = curve.getPoint(t);
    
    if (meshRef.current) {
      meshRef.current.position.copy(point);
    }
    
    // Update trail
    if (trailRef.current) {
      const geometry = trailRef.current.geometry;
      for (let i = trailCount - 1; i > 0; i--) {
        trailPositions[i * 3] = trailPositions[(i - 1) * 3];
        trailPositions[i * 3 + 1] = trailPositions[(i - 1) * 3 + 1];
        trailPositions[i * 3 + 2] = trailPositions[(i - 1) * 3 + 2];
      }
      trailPositions[0] = point.x;
      trailPositions[1] = point.y;
      trailPositions[2] = point.z;
      geometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Main particle */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Particle glow */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      
      {/* Trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailCount}
            array={trailPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          color={color} 
          size={0.015} 
          transparent 
          opacity={0.6} 
          sizeAttenuation 
        />
      </points>
    </group>
  );
}

// Connection arc between two points with data flow
function ConnectionArc({ 
  start, 
  end, 
  color,
  index 
}: { 
  start: THREE.Vector3; 
  end: THREE.Vector3; 
  color: string;
  index: number;
}) {
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1.5); // Arc height
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  
  // Multiple particles per arc with different speeds and offsets
  const particles = useMemo(() => [
    { speed: 0.8, delay: 0 },
    { speed: 1.0, delay: 0.33 },
    { speed: 0.9, delay: 0.66 },
  ], []);

  return (
    <group>
      {/* Arc line */}
      <Line
        points={points}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.3}
      />
      
      {/* Data flow particles */}
      {particles.map((p, i) => (
        <DataFlowParticle
          key={i}
          curve={curve}
          color={color}
          speed={p.speed}
          delay={p.delay + index * 0.15}
        />
      ))}
    </group>
  );
}

// Star field background
function StarField({ count = 2000 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#4488ff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Main rotating globe
function RotatingGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Calculate 3D positions for all locations
  const locationPositions = useMemo(
    () => locations.map((loc) => latLngToVector3(loc.lat, loc.lng, 1.02)),
    []
  );

  // Create connection pairs
  const connections = useMemo(() => {
    const pairs: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];
    const colors = ["#00FF88", "#FFD700", "#00BFFF"];
    for (let i = 0; i < locationPositions.length - 1; i++) {
      pairs.push({
        start: locationPositions[i],
        end: locationPositions[i + 1],
        color: colors[i % colors.length],
      });
    }
    // Connect last to first
    pairs.push({
      start: locationPositions[locationPositions.length - 1],
      end: locationPositions[0],
      color: colors[2],
    });
    return pairs;
  }, [locationPositions]);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = clock.elapsedTime * 0.08;
    }
  });

  return (
    <>
      {/* Star field */}
      <StarField />

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshBasicMaterial
          color="#0066ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Globe group */}
      <group ref={globeRef}>
        {/* Solid globe */}
        <Sphere args={[1, 64, 64]}>
          <meshPhongMaterial
            color="#0a0a1a"
            emissive="#001133"
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </Sphere>

        {/* Wireframe overlay */}
        <mesh ref={wireframeRef}>
          <sphereGeometry args={[1.01, 32, 32]} />
          <meshBasicMaterial
            color="#1a4a7a"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Grid lines - latitude */}
        {[...Array(8)].map((_, i) => {
          const lat = -60 + i * 20;
          const radius = Math.cos((lat * Math.PI) / 180) * 1.015;
          const height = Math.sin((lat * Math.PI) / 180) * 1.015;
          return (
            <mesh key={`lat-${i}`} position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius - 0.002, radius, 64]} />
              <meshBasicMaterial color="#2a5a9a" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
          );
        })}

        {/* Location markers */}
        {locationPositions.map((pos, i) => (
          <LocationMarker key={i} position={pos} delay={i * 0.5} />
        ))}

        {/* Connection arcs with data flow */}
        {connections.map((conn, i) => (
          <ConnectionArc key={i} start={conn.start} end={conn.end} color={conn.color} index={i} />
        ))}
      </group>
    </>
  );
}

// Loading fallback
function GlobeLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

// Main exported component
export default function Globe3D() {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <Suspense fallback={<GlobeLoader />}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={0.5} color="#ffffff" />
          <pointLight position={[-5, -3, -5]} intensity={0.3} color="#0088ff" />

          {/* Globe */}
          <RotatingGlobe />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
        </Canvas>
      </Suspense>

      {/* Overlay gradient for blending */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-background/50" />
    </div>
  );
}
