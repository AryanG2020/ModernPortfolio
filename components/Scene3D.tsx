import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Stars, 
  Float, 
  PerspectiveCamera, 
  Environment,
  Trail,
  Text
} from '@react-three/drei';
import * as THREE from 'three';

// --- Components for the Simulation ---

const ParticleBrain = () => {
  const count = 2000;
  const radius = 2;
  
  // Create particles on a sphere surface
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotation
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
      
      // Pulse effect via scale
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      pointsRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={particles} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#00f3ff" 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const DataRing = ({ radius, speed, axis, color }: { radius: number, speed: number, axis: [number, number, number], color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += axis[0] * speed;
      ref.current.rotation.y += axis[1] * speed;
      ref.current.rotation.z += axis[2] * speed;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
    </mesh>
  );
};

const ConnectingLines = () => {
    // Generate random lines inside the sphere to simulate neural connections
    const count = 100;
    const radius = 1.8;
    const lines = useMemo(() => {
        const temp = new Float32Array(count * 6); // 2 points per line * 3 coords
        for(let i=0; i<count; i++) {
             const theta1 = Math.random() * Math.PI * 2;
             const phi1 = Math.acos((Math.random() * 2) - 1);
             const x1 = radius * Math.sin(phi1) * Math.cos(theta1);
             const y1 = radius * Math.sin(phi1) * Math.sin(theta1);
             const z1 = radius * Math.cos(phi1);

             // Connect to a nearby point or random point? Random for chaos/neural look
             const theta2 = Math.random() * Math.PI * 2;
             const phi2 = Math.acos((Math.random() * 2) - 1);
             const x2 = radius * Math.sin(phi2) * Math.cos(theta2);
             const y2 = radius * Math.sin(phi2) * Math.sin(theta2);
             const z2 = radius * Math.cos(phi2);

             temp[i*6] = x1; temp[i*6+1] = y1; temp[i*6+2] = z1;
             temp[i*6+3] = x2; temp[i*6+4] = y2; temp[i*6+5] = z2;
        }
        return temp;
    }, []);

    const ref = useRef<THREE.LineSegments>(null);
    useFrame((state) => {
        if(ref.current) {
            ref.current.rotation.y = -state.clock.getElapsedTime() * 0.05;
        }
    })

    return (
        <lineSegments ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count * 2} array={lines} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#7000ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </lineSegments>
    )
}

const FloatingDataBits = () => {
    const count = 50;
    const groupRef = useRef<THREE.Group>(null);
    
    // Create random positions for data bits
    const bits = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            ] as [number, number, number],
            speed: Math.random() * 0.02 + 0.01
        }))
    }, []);

    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {bits.map((bit, i) => (
                <mesh key={i} position={bit.position}>
                    <boxGeometry args={[0.05, 0.05, 0.05]} />
                    <meshBasicMaterial color={Math.random() > 0.5 ? "#00f3ff" : "#ffffff"} />
                </mesh>
            ))}
        </group>
    )
}

const Scene3D: React.FC = () => {
  return (
    <div className="canvas-container">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        
        {/* Environment */}
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 20]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
        
        {/* Main "AI Core" Simulation */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={[0, 0, 0]}>
                {/* The Brain */}
                <ParticleBrain />
                <ConnectingLines />
                
                {/* Rotating Data Rings */}
                <DataRing radius={2.5} speed={0.01} axis={[1, 1, 0]} color="#00f3ff" />
                <DataRing radius={3.0} speed={0.008} axis={[0, 1, 1]} color="#7000ff" />
                <DataRing radius={3.5} speed={0.005} axis={[1, 0, 1]} color="#ffffff" />
            </group>
        </Float>

        {/* Background Elements */}
        <FloatingDataBits />
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
      </Canvas>
    </div>
  );
};

export default Scene3D;