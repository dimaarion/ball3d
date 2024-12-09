import Controller,{EcctrlAnimation} from "ecctrl";
import {Gltf, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";


export default function Player(props) {
    const { nodes, materials, animations } = useGLTF(props.url);
    const { ref, actions,names } = useAnimations(animations)
    const [, get] = useKeyboardControls()
    const[index, setIndex] = useState(false)

    const animationSet = {
        idle: 'АрматураAction',
        walk: 'АрматураAction',
        run: 'АрматураAction',
        jump: 'АрматураAction',
        jumpIdle: 'АрматураAction',
        jumpLand: 'АрматураAction',
        fall: 'АрматураAction', // This is for falling from high sky
        action1: 'АрматураAction',
        action2: 'АрматураAction',
        action3: 'АрматураAction',
        action4: 'АрматураAction'
    };

    useEffect(()=>{


        console.log(names)
    },[])






    useFrame((state,delta)=>{
        const { forward, backward, left, right, jump } = get()
setIndex(forward)


    })

    return <>

    <group ref={ref}>
            <Controller
                animated={false}
                maxVelLimit={props.speed}
                jumpVel={props.jump}
                camInitDir={{x: 0.4, y: 0}}
                density={1}
                mass={props.mass}
                followLight={true}
                friction={props.friction}
                mode={"FixedCamera"}
                camInitDis={-20}
                floatHeight={1}

            >
                <EcctrlAnimation characterURL={props.url} animationSet={animationSet}>
                            <primitive object={nodes.body} />
                </EcctrlAnimation>

            </Controller>

    </group>








    </>
}