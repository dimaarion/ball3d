import {RigidBody} from "@react-three/rapier";
import {Gltf, useGLTF} from "@react-three/drei";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Play from "../components/Play";
import Plane from "../components/Plane";


export default function Level_1(props) {

    const {nodes, materials} = useGLTF('./asset/model/hest.glb');

    //  const object = useGLTF("./asset/model/level1.glb");
    //  const { ref,actions} = useAnimations(animations)
    const [actionsArray, setActionsArray] = useState([])
    const pause = useSelector((state) => state.pause.value);
    const ref = useRef();


    useEffect(() => {


    }, [])

    useEffect(() => {

        console.log(nodes)
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


    const test = false;
    if (test) {
        return <>
            <group position={props.position} scale={2}>
                <RigidBody ref={ref} colliders="trimesh" type="fixed">
                    <group>

                        {  //  <mesh geometry={nodes.block_2.geometry} material={materials['Материал']} />

                            //
                            //<primitive object={nodes.block}/>
                        }
                        <mesh geometry={nodes.plane.geometry} material={materials['plane']}/>
                        <mesh geometry={nodes.doroga.geometry} material={materials['asvalt']}/>
                        <mesh geometry={nodes.arka.geometry} material={materials['Material.005']}/>
                        <mesh geometry={nodes.bardur.geometry} material={materials['tratuar']}/>
                    </group>
                </RigidBody>
                <RigidBody colliders="trimesh" type="fixed">
                    <group>
                        <primitive object={nodes.building_1}/>
                        <primitive object={nodes.building_2}/>
                        <primitive object={nodes.building_3}/>
                        <primitive object={nodes.building_4}/>
                        <primitive object={nodes.building_5}/>
                        <primitive object={nodes.zabor_1}/>
                    </group>
                </RigidBody>
                <primitive object={nodes.desirefx_me_1}/>
            </group>

            {/*cityData.map((el)=><City position={[el.x,el.y,el.z]}/>)*/}
            {/*<CityBackground file={'./asset/texture/maxresdefault.jpg'}/>*/}
        </>
    } else {
        return <>
            <group position={props.position} scale={2}>
                <RigidBody ref={ref} colliders="trimesh" type="fixed">
                    <group>
                        <primitive object={nodes.platform}/>
                    </group>
                </RigidBody>
                <RigidBody>
                    <group>
                        <mesh geometry={nodes.point.geometry} material={materials['tratuar']}/>
                    </group>
                </RigidBody>
                <group>
                    <primitive object={nodes.plane}/>
                    <primitive object={nodes.fon}/>
                    <primitive object={nodes.finih}/>
                </group>


            </group>

        </>
    }
}
