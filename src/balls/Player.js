import Controller from "ecctrl";
import {Gltf, useGLTF} from "@react-three/drei";
import {useRef} from "react";

export default function Player(props) {
    const {nodes, materials, animations} = useGLTF(props.url);
    const ref = useRef();
    return <>
        <Controller maxVelLimit={props.speed}
                    jumpVel={props.jump}
                    disableControl={false}
                    camInitDir={{x: 0.4, y: 0}}
                    density={1}
                    mass={props.mass}
                    followLight={true}
                    friction={props.friction}
                    mode={"FixedCamera"}
                    ref={ref}
                    capsuleRadius={0.9}
                    capsuleHalfHeight={0.1}
                    camInitDis={-20}
                    colliders={"ball"}>

                <mesh geometry={nodes.ball.geometry} material={materials['Материал']} scale={3}  />

        </Controller>
    </>
}