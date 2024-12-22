import {Gltf, useGLTF} from "@react-three/drei";
import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import {useEffect} from "react";
import * as THREE from "three";

export default function Plane(props) {


    return (
        <group {...props}>
                <mesh  receiveShadow rotation-x={-Math.PI / 2}  >
                    <planeGeometry args={[5000, 5000]}  />
                    <meshStandardMaterial color={"green"} />
                </mesh>
        </group>

    )
}