import Controller, {EcctrlAnimation, useGame} from "ecctrl";
import {Gltf, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three";
import {routable} from "../actions";


export default function Player(props) {
    const {nodes, materials, animations} = useGLTF(props.url);
    const scene = useGLTF(props.url);
    const {ref, actions, names} = useAnimations(animations)
    const [, get] = useKeyboardControls()
    const [index, setIndex] = useState(false);
    const [velocity, setVelocity] = useState("Walk");
    const [speed, setSpeed] = useState(0);

    const body = useRef();


    const curAnimation = useGame((state) => state.curAnimation);
    const resetAnimation = useGame((state) => state.reset);
    const initializeAnimationSet = useGame(
        (state) => state.initializeAnimationSet
    );


    const animationSet = {
        idle: 'Idle',
        walk: 'Walk',
        run: 'Run',
        jump: 'Jump_Start',
        jumpIdle: 'Jump_Idle',
        jumpLand: 'Jump_Land',
        fall: 'Climbing', // This is for falling from high sky
        action1: 'Wave',
        action2: 'Wave',
        action3: 'Wave',
        action4: 'Attack'
    };

    useEffect(() => {

        console.log(nodes)
    }, []);


    useEffect(() => {



    }, [velocity])


    useFrame((state, delta) => {


    })

    for (const material in materials) {
        materials[material].metalness = -2
        materials[material].roughness = 1
    }


        return <>

            <group ref={ref} >
                <Controller
                    ref={body}
                    animated={true}
                   // position={props.position}
                    maxVelLimit={props.speed}
                    jumpVel={props.jump}
                    camInitDir={{ x: routable(10), y: 0 }}
                    camTargetPos = {{x: 0, y: 0.2, z: 0}}
                    mass={props.mass}
                    friction={props.friction}
                   // mode={"FixedCamera"}
                    camInitDis={-15}
                    floatHeight={1.2}
                    capsuleRadius={0.3}
                    capsuleHalfHeight={0.35}

                >
                    <EcctrlAnimation  characterURL={props.url} animationSet={animationSet}>
                        <group>
                            <primitive scale={0.3} position={[0,-1.5,0]}  object={nodes.Body}/>
                        </group>

                    </EcctrlAnimation>
                </Controller>
            </group>


        </>


}