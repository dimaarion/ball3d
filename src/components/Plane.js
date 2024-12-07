import {Gltf, useGLTF} from "@react-three/drei";
import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import {useEffect} from "react";
import * as THREE from "three";

export default function Plane(props) {
    const texture = useLoader(TextureLoader, './asset/texture/plane2.jpg');
    useEffect(() => {
        // Set texture repetition to tile the texture across the surface
        texture?.repeat.set(10, 10); // Adjust these values to control how many times it repeats in each direction
        texture.wrapS = THREE.RepeatWrapping; // Wrap texture horizontally
        texture.wrapT = THREE.RepeatWrapping; // Wrap texture vertically
    }, [texture]);
    return (
        <group {...props}>
            <RigidBody type="fixed" colliders="cuboid">
                <mesh  receiveShadow rotation-x={-Math.PI / 2}  >
                    <planeGeometry args={[5000, 5000]} />
                    <meshStandardMaterial map={texture} />
                </mesh>
            </RigidBody>
        </group>

    )
}