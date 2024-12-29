import {Box, Cylinder, Gltf, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three";
import {routable} from "../actions";
import {BallCollider, RigidBody, useRevoluteJoint} from "@react-three/rapier";
import * as THREE from "three";
import Controller from "ecctrl";
import {get, set} from "lockr"
import {useSelector} from "react-redux";


export default function Gear(props) {
    const body = useRef()
    const wheel = useRef();
    const [, get] = useKeyboardControls();
    const carRef = useRef();
    const {nodes, materials, animations} = useGLTF('./asset/model/wheel-tree.glb');
    const restart = useSelector((state) => state.restart.value);
//console.log(nodes)
    const speed = props.speed;
    const turnSpeed = props.control;
    useFrame((state, delta) => {
        const {forward, backward, leftward, rightward} = get();
        if (forward || backward || leftward || rightward) {
            carRef.current?.wakeUp();
        } else {
            //  body.current?.sleep();
        }

        if (carRef.current) {
            const body = carRef.current;
            // Get the car's current velocity and rotation
            const velocity = body.linvel();
            const rotation = body.rotation();
            const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

            // Calculate the forward direction vector
            const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion).normalize();

            // Determine the desired movement (forward/backward)
            let forwardVelocity = 0;
            if (forward) {
                forwardVelocity = speed;
            } else if (backward) {
                forwardVelocity = -speed;
            }

            // Apply forward/backward movement


            // Apply turning (left/right)
            let angularVelocity = 0;
            if (leftward) {
                angularVelocity = turnSpeed;
            } else if (rightward) {
                angularVelocity = -turnSpeed;
            }

            // Apply angular velocity for turning
            body?.setAngvel({
                x: forwardVelocity * forwardVector.x,
                y: angularVelocity,
                z: forwardVelocity * forwardVector.z
            });

        }


    })


    useEffect(()=>{
        if (restart) {
            carRef.current?.setTranslation({
                x: props.position[0],
                y: props.position[1],
                z: props.position[2]
            })
        }
        console.log(restart)
    },[restart])
    return <>
        <Controller position={props.position} name={"player"} camInitDir={{x: routable(20), y: routable(90)}}
                    friction={props.friction} disableControl={true} turnSpeed={1} camInitDis={-20} colliders={"hull"}
                    ref={carRef} type={"dynamic"} mass={props.mass}>
            <group scale={0.3} rotation={[routable(90), 0, 0]}>
                <mesh geometry={nodes.wheel.geometry}/>
            </group>


            <BallCollider args={[1, 1, 1]} sensor={true} onIntersectionEnter={(e) => {


            }}/>
        </Controller>

    </>
}