import Controller, {EcctrlAnimation, useGame} from "ecctrl";
import {Gltf, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three";


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


    }, []);
    console.log(nodes)

    useEffect(() => {



    }, [velocity])


    useFrame((state, delta) => {
        const {forward, backward, left, right, jump} = get()
        if (body.current) {
            let v = body.current?.linvel();
            if(Math.abs(v.x) > 0 || Math.abs(v.z) > 0){
                setVelocity("Walk")
            }else {
                setVelocity("Run")
            }

          // console.log(body.current?.linvel())
        }


    })
    for (const material in materials) {
        materials[material].metalness = -2
        materials[material].roughness = 1
    }

    let test = true;

    if(test){
        return <>

            <group ref={ref}>
                <Controller
                    ref={body}
                    animated={true}
                   // position={props.position}
                    maxVelLimit={props.speed}
                    jumpVel={props.jump}
                    camInitDir={{x: -3, y: 0}}
                    mass={props.mass}
                    friction={props.friction}
                    mode={"FixedCamera"}
                    camInitDis={10}
                    floatHeight={1.2}
                    capsuleRadius={0.3}
                    capsuleHalfHeight={0.35}
                >
                    <EcctrlAnimation  characterURL={props.url} animationSet={animationSet}>
                        <group>
                            <group scale={0.2} position={[0,-1.8,0]}>
                                <primitive object={nodes.Body}/>
                            </group>
                        </group>
                    </EcctrlAnimation>
                </Controller>
            </group>


        </>
    }else {
        return <>

            <group ref={ref}>
                <Controller
                    ref={body}
                    animated={true}
                    ///   position={props.position}
                    maxVelLimit={props.speed}
                    jumpVel={props.jump}
                    camInitDir={{x: -3, y: 0}}
                    mass={props.mass}
                    friction={props.friction}
                    mode={"FixedCamera"}
                    camInitDis={10}
                    floatHeight={1.2}
                    capsuleRadius={0.3}
                    capsuleHalfHeight={0.35}
                >

                        <group>
                            <group scale={0.2} position={[0,-2,0]}>
                                <Gltf src={props.url}/>
                            </group>
                        </group>

                </Controller>

            </group>


        </>
    }


}