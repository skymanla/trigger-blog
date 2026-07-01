import { Html, Line, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group } from 'three'
import * as THREE from 'three'

import { PostType } from '@/types/post'

type SpaceSceneProps = {
  posts: PostType[]
}

type SceneItem = {
  accent: string
  post: PostType
  position: [number, number, number]
}

const accents = ['#38bdf8', '#f59e0b', '#22c55e', '#f472b6']
const positions: Array<[number, number, number]> = [
  [-3.1, 0.95, -0.8],
  [2.85, 1.35, -1.35],
  [-2.15, -1.25, -0.55],
  [2.35, -1.0, -0.95],
]

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)

    update()
    query.addEventListener('change', update)

    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function DeveloperAvatar({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null)
  const laptopRef = useRef<Group>(null)

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current
    if (!group) return

    const elapsed = clock.getElapsedTime()
    const floatY = reducedMotion ? 0 : Math.sin(elapsed * 0.8) * 0.18
    const driftX = reducedMotion ? 0 : pointer.x * 0.55
    const driftY = reducedMotion ? 0 : pointer.y * 0.16

    group.position.set(driftX, -0.12 + floatY + driftY, 0.1)
    group.rotation.y = pointer.x * 0.25 + Math.sin(elapsed * 0.35) * 0.08
    group.rotation.x = pointer.y * 0.06

    if (laptopRef.current && !reducedMotion) {
      laptopRef.current.rotation.x = -0.22 + Math.sin(elapsed * 1.4) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <group>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.8, 1.05, 0.42]} />
          <meshStandardMaterial color="#101827" roughness={0.72} metalness={0.12} />
        </mesh>
        <mesh position={[0, 0.55, 0.02]}>
          <sphereGeometry args={[0.33, 32, 32]} />
          <meshStandardMaterial color="#e0c8a8" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.7, 0.04]} scale={[1.08, 0.55, 0.9]}>
          <sphereGeometry args={[0.34, 32, 16]} />
          <meshStandardMaterial color="#171717" roughness={0.8} />
        </mesh>
        <mesh position={[-0.24, 0.56, 0.31]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.24, 0.56, 0.31]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[-0.55, -0.22, 0]} rotation={[0, 0, -0.45]}>
          <boxGeometry args={[0.18, 0.8, 0.22]} />
          <meshStandardMaterial color="#1f2937" roughness={0.65} />
        </mesh>
        <mesh position={[0.55, -0.22, 0]} rotation={[0, 0, 0.45]}>
          <boxGeometry args={[0.18, 0.8, 0.22]} />
          <meshStandardMaterial color="#1f2937" roughness={0.65} />
        </mesh>
        <group ref={laptopRef} position={[0, -0.36, 0.58]}>
          <mesh position={[0, -0.12, 0]}>
            <boxGeometry args={[1.05, 0.06, 0.62]} />
            <meshStandardMaterial color="#0f172a" roughness={0.42} metalness={0.35} />
          </mesh>
          <mesh position={[0, 0.14, -0.24]} rotation={[-0.48, 0, 0]}>
            <boxGeometry args={[0.98, 0.62, 0.05]} />
            <meshStandardMaterial color="#0b1120" roughness={0.35} metalness={0.22} />
          </mesh>
          <mesh position={[-0.22, 0.18, -0.19]} rotation={[-0.48, 0, 0]}>
            <boxGeometry args={[0.32, 0.025, 0.018]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
          <mesh position={[0.17, 0.07, -0.13]} rotation={[-0.48, 0, 0]}>
            <boxGeometry args={[0.46, 0.025, 0.018]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0.04, -0.04, -0.08]} rotation={[-0.48, 0, 0]}>
            <boxGeometry args={[0.58, 0.025, 0.018]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </group>
        <pointLight color="#38bdf8" intensity={1.25} distance={3} position={[0, -0.1, 1.1]} />
      </group>
    </group>
  )
}

function ArticleNode({ item, index, reducedMotion }: { item: SceneItem; index: number; reducedMotion: boolean }) {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    const node = ref.current
    if (!node || reducedMotion) return

    const elapsed = clock.getElapsedTime()
    node.rotation.y = Math.sin(elapsed * 0.35 + index) * 0.16
    node.position.y = item.position[1] + Math.sin(elapsed * 0.75 + index) * 0.08
  })

  return (
    <group ref={ref} position={item.position}>
      <mesh rotation={[0.1, index % 2 === 0 ? 0.18 : -0.18, 0]}>
        <boxGeometry args={[1.34, 0.8, 0.06]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.045]} rotation={[0.1, index % 2 === 0 ? 0.18 : -0.18, 0]}>
        <planeGeometry args={[1.2, 0.66]} />
        <meshBasicMaterial color={item.accent} transparent opacity={0.16} />
      </mesh>
      <mesh position={[-0.5, 0.29, 0.09]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={item.accent} />
      </mesh>
      <Html center distanceFactor={8} position={[0, -0.02, 0.14]} transform>
        <div
          aria-hidden="true"
          className="w-36 select-none rounded-md border border-white/15 bg-slate-950/70 px-3 py-2 text-white shadow-lg backdrop-blur"
        >
          <p className="mb-1 font-mono text-[10px] text-slate-400">0{index + 1}</p>
          <p className="m-0 line-clamp-2 text-xs font-bold leading-snug text-white">{item.post.title}</p>
        </div>
      </Html>
      <pointLight color={item.accent} intensity={0.75} distance={2.5} position={[0, 0, 0.7]} />
    </group>
  )
}

function OrbitSystem({ items, reducedMotion }: { items: SceneItem[]; reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null)
  const linePoints = useMemo(
    () => items.map((item) => new THREE.Vector3(...item.position)),
    [items]
  )

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.08) * 0.04
  })

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.15, 0.006, 8, 128]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.4, 0.15]}>
        <torusGeometry args={[2.25, 0.005, 8, 128]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.18} />
      </mesh>
      {linePoints.length > 1 && (
        <Line points={linePoints} color="#94a3b8" lineWidth={1} transparent opacity={0.22} />
      )}
    </group>
  )
}

function SceneContents({ posts, reducedMotion }: SpaceSceneProps & { reducedMotion: boolean }) {
  const items = useMemo<SceneItem[]>(
    () =>
      posts.slice(0, 4).map((post, index) => ({
        accent: accents[index % accents.length],
        post,
        position: positions[index % positions.length],
      })),
    [posts]
  )

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight color="#dbeafe" intensity={1.5} position={[4, 6, 5]} />
      <pointLight color="#f59e0b" intensity={1.2} distance={7} position={[-3, -2, 2]} />
      <Stars
        radius={75}
        depth={35}
        count={reducedMotion ? 500 : 1500}
        factor={4}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.45}
      />
      <OrbitSystem items={items} reducedMotion={reducedMotion} />
      <DeveloperAvatar reducedMotion={reducedMotion} />
      {items.map((item, index) => (
        <ArticleNode key={item.post.slug} item={item} index={index} reducedMotion={reducedMotion} />
      ))}
    </>
  )
}

export default function SpaceScene({ posts }: SpaceSceneProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.15, 7.1], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#07070a']} />
        <fog attach="fog" args={['#07070a', 7, 18]} />
        <SceneContents posts={posts} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
