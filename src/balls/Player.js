import Controller, {EcctrlAnimation, useGame} from "ecctrl";
import {Gltf, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";


export default function Player(props) {
    const { nodes, materials, animations } = useGLTF(props.url);
    const { ref, actions,names } = useAnimations(animations)
    const [, get] = useKeyboardControls()
    const[index, setIndex] = useState(false)

    const curAnimation = useGame((state) => state.curAnimation);
    const resetAnimation = useGame((state) => state.reset);
    const initializeAnimationSet = useGame(
        (state) => state.initializeAnimationSet
    );


    const animationSet = {
        idle: 'Idle',
        walk: 'Walk',
        run: 'Idle',
        jump: 'Idle',
        jumpIdle: 'Idle',
        jumpLand: 'Idle',
        fall: 'Idle', // This is for falling from high sky
        action1: 'Walk',
        action2: 'Walk',
        action3: 'Walk',
        action4: 'Walk'
    };

    useEffect(() => {
        // Initialize animation set
        initializeAnimationSet(animationSet);
    }, []);

    useEffect(()=>{


        console.log(resetAnimation)
    },[resetAnimation])






    useFrame((state,delta)=>{
        const { forward, backward, left, right, jump } = get()
setIndex(forward)


    })
    for (const material in materials) {
        materials[material].metalness = -2
        materials[material].roughness = 1
    }

    return <>

    <group ref={ref}>
            <Controller
                animated={true}
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
                        <group scale={3}>
                            <primitive object={nodes.Scene} />
                        </group>
                        <group>
                            <skinnedMesh
                                scale={100}
                                name="body"
                                skeleton={nodes.body.skeleton}
                                geometry={nodes.body.geometry}
                                material={materials["Material_0"]}
                                receiveShadow
                                castShadow
                            />
                        </group>
                    </group>

                </EcctrlAnimation>

            </Controller>

    </group>








    </>
}