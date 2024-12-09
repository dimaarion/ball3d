import {RigidBody} from "@react-three/rapier";
import {useGLTF} from "@react-three/drei";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Play from "../components/Play";
import Plane from "../components/Plane";


export default function Level_1(props) {

    const {nodes, materials, animations} = useGLTF("./asset/model/level_1.glb");
    //  const object = useGLTF("./asset/model/level1.glb");
    //  const { ref,actions} = useAnimations(animations)
    const [actionsArray, setActionsArray] = useState([])
    const pause = useSelector((state) => state.pause.value);
    const ref = useRef();


    useEffect(() => {
        if (props.actionsArray) {
            setActionsArray(props.actionsArray)
        }

    }, [])

    useEffect(() => {


    }, [])

    const generateCityData = (rows, cols, spacing) => {
        const buildings = [];
        const startX = -((cols - 1) * spacing) / 2; // Центрирование по X
        const startZ = -((rows - 1) * spacing) / 2; // Центрирование по Z

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                buildings.push({
                    x: startX + j * spacing,
                    y: 0,
                    z: startZ + i * spacing,
                });
            }
        }

        return buildings;
    };

// Пример: 5 рядов и 5 колонн зданий с расстоянием 500 между ми
    const cityData = generateCityData(5, 1, 150);
//console.log(cityData)


    // Добавляем вращение HDRI окружения


    return <>
        <group position={props.position} scale={3}>
            <RigidBody ref={ref} colliders="trimesh" type="fixed">
                <group>

                    <mesh geometry={nodes.platform_1.geometry} material={materials["Material"]} />
                    <mesh geometry={nodes.platform_2.geometry} material={materials["Материал"]} />
                    <mesh geometry={nodes.platform_3.geometry} material={materials["Материал.001"]} />
                    {  //  <mesh geometry={nodes.block_2.geometry} material={materials['Материал']} />

                       // <primitive object={nodes.platform}/>
                        //<primitive object={nodes.block}/>
                    }

                </group>
            </RigidBody>
<RigidBody colliders="trimesh" type="fixed">
    <mesh geometry={nodes.point.geometry} material={materials['Материал.001']} />
</RigidBody>




        </group>

        {/*cityData.map((el)=><City position={[el.x,el.y,el.z]}/>)*/}
        {/*<CityBackground file={'./asset/texture/maxresdefault.jpg'}/>*/}
    </>
}