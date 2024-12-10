import {Canvas, useLoader, useThree} from "@react-three/fiber"
import {
    Sky,
    PointerLockControls,
    KeyboardControls,
    Environment,
    Cloud,
    Clouds,
    useGLTF, OrbitControls, PositionalAudio, CameraControls, Gltf, PerspectiveCamera, OrthographicCamera,
} from "@react-three/drei"

import * as THREE from "three";
import Platform from "./components/Platform";
import {useSelector} from "react-redux";
import Pause from "./components/Pause";
import StartGame from "./components/StartGame";
import TopPanel from "./components/TopPanel";
import Settings from "./components/Settings";
import {useEffect, useRef} from "react";
import Garage from "./components/Garage";
import garage from "./assets/garage.json"
import level from "./assets/level.json"
import {Physics} from '@react-three/rapier'
import Player from "./balls/Player";
import CityBackground from "./components/CityBackground";


export default function App() {
    const restart = useSelector((state) => state.restart.value);
    const settings = useSelector((state) => state.settings.value);
    const pause = useSelector((state) => state.pause.value);
    const music = useSelector((state) => state.music.value);
    const garageOpen = useSelector((state) => state.garageOpen.value);
    const pauseOpen = useSelector((state) => state.pauseOpen.value);
    const sound = useRef();





    const keyboardMap = [
        {name: "forward", keys: ["ArrowUp", "w", "W"]},
        {name: "backward", keys: ["ArrowDown", "s", "S"]},
        {name: "leftward", keys: ["ArrowLeft", "a", "A"]},
        {name: "rightward", keys: ["ArrowRight", "d", "D"]},
        {name: "jump", keys: ["Space"]},
        {name: "action4", keys: ["KeyF"]},
    ];

    const keyboardMap2 = [
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'run', keys: ['Shift'] },
        { name: 'brake', keys: ['Space'] },
        { name: 'gearUp', keys: ['Period'] },
        { name: 'gearDown', keys: ['Comma'] },
    ];

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                sound.current?.pause(); // Остановить звук, если вкладка невидима
            } else {
                sound.current?.play(); // Воспроизвести звук, если вкладка активна
            }
        };

        // Слушаем изменения видимости страницы
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);


    return (
        <>

            <TopPanel/>
            {
                pauseOpen ? <Pause/> : ""
            }
            {settings ? <Settings/> : ""}
            {garageOpen ? <Garage/> : ""}

            <StartGame>
                <Canvas shadows camera={{fov: 45}}>

                    <hemisphereLight intensity={0.2} />

                    <directionalLight   position={[-10, 50, 0]} intensity={2} />

                        <Sky />

                    {
                       // <Environment  ground={{scale:500,radius:5000,height:1000}} files={'./asset/texture/plane6.jpg'} />
                    }
                    <KeyboardControls map={keyboardMap}>

                        <Physics debug={false} gravity={[0, -5, 0]} paused={pause}>
                            {level.filter((el) => el.level === 1).map((el) => <Platform key={el.level + "platform"}
                                                                                        url={el.model}
                                                                                        position={el.position}
                                                                                        actionsArray={el.animations}/>)}
                            {garage.filter((el) => el.id === 1 && !restart).map((el) => <Player url={el.model}
                                                                                                 position={el.position}
                                                                                                 key={el.id}
                                                                                                 friction={el.friction}
                                                                                                 mass={el.mass}
                                                                                                 jump={el.jump}
                                                                                                 control={el.control}
                                                                                                 speed={el.speed}/>)}


                        </Physics>

                        <PositionalAudio
                            ref={sound}
                            hasPlaybackControl={true}
                            autoplay={true}
                            loop={false}
                            url="./asset/sound/y2mate.com - Dmitriy Lukyanov_Underwater.mp3"
                            distance={music}
                        />
                    </KeyboardControls>

                </Canvas>
            </StartGame>

        </>
    )
}
useGLTF.preload([
    './asset/model/level_1.glb',
    'public/asset/model/ball_1.glb',
    'public/asset/model/player.glb'
]);