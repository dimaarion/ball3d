import Controller, {EcctrlAnimation, useGame} from "ecctrl";
import {Gltf, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three";


export default function Player(props) {
    const {nodes, materials, animations} = useGLTF(props.url);
    const {ref, actions, names} = useAnimations(animations)
    const [, get] = useKeyboardControls()
    const [index, setIndex] = useState(false);
    const [velocity, setVelocity] = useState(false);
    const [speed, setSpeed] = useState(0);

    const body = useRef();


    const curAnimation = useGame((state) => state.curAnimation);
    const resetAnimation = useGame((state) => state.reset);
    const initializeAnimationSet = useGame(
        (state) => state.initializeAnimationSet
    );


    const animationSet = {
        idle: 'Run',
        walk: 'Run',
        run: 'Run',
        jump: 'Run',
        jumpIdle: 'Run',
        jumpLand: 'Run',
        fall: 'Run', // This is for falling from high sky
        action1: 'Run',
        action2: 'Run',
        action3: 'Run',
        action4: 'Run'
    };

    useEffect(() => {


    }, []);

    console.log(names)
    useEffect(() => {



    }, [velocity])


    useFrame((state, delta) => {
        const {forward, backward, left, right, jump} = get()
        if (body.current) {
            let v = body.current?.linvel();
            if(Math.abs(v.x) > 1 || Math.abs(v.z) > 1){
                setVelocity(true)
            }else {
                setVelocity(false)
            }

          // console.log(body.current?.linvel())
        }


    })
    for (const material in materials) {
        materials[material].metalness = -2
        materials[material].roughness = 1
    }

    return <>

        <group ref={ref}>
            <Controller
                ref={body}
                animated={true}
             ///   position={props.position}
                maxVelLimit={props.speed}
                jumpVel={props.jump}
                camInitDir={{x: 0.4, y: 0}}
                mass={props.mass}
                friction={props.friction}
                mode={"FixedCamera"}
                camInitDis={-20}
                floatHeight={2}
                capsuleRadius={0.3}
                capsuleHalfHeight={0.35}
            >
                <EcctrlAnimation  characterURL={props.url} animationSet={animationSet}>
                <group>
                    <group scale={0.5} position={[0,-2,0]}>
                        <primitive object={nodes.Scene}/>
                    </group>
                    <group>
                        {

                            <skinnedMesh
                            scale={100}
                            name="body"
                            skeleton={nodes.Body.skeleton}
                            geometry={nodes.Body.geometry}
                            material={materials["Material.001"]}
                            receiveShadow
                            castShadow
                        />
                        }

                    </group>
                </group>
                </EcctrlAnimation>
            </Controller>

        </group>


    </>

}