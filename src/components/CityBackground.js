import {useLoader, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {Decal} from "@react-three/drei";
import {useEffect} from "react";

export default function CityBackground(props) {

    const Background = (props) => {
        const { scene } = useThree();
        useEffect(() => {
            const loader = new THREE.TextureLoader();
            loader.load(props.file, (texture) => {
                scene.background = texture; // Устанавливаем текстуру фоном
            });
        }, [scene]);

        return null;
    };

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(props.file); // Панорамное изображение
    let start = false;

if(start){
    return (
        <mesh position={[0,0,0]}>
            <sphereGeometry args={[600, 50, 50]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}else {
    return  <Background {...props} />
}

}