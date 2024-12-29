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


import Platform from "./components/Platform";
import {useSelector} from "react-redux";
import Pause from "./components/Pause";
import StartGame from "./components/StartGame";
import TopPanel from "./components/TopPanel";
import Settings from "./components/Settings";
import {Suspense, useEffect, useRef} from "react";
import Garage from "./components/Garage";
import garage from "./assets/garage.json"
import level from "./assets/level.json"
import {Physics} from '@react-three/rapier'
import Gear from "./balls/Gear";
import {get, set} from "lockr";
import Level_1 from "./Levels/Level_1";


export default function App() {
    const restart = useSelector((state) => state.restart.value);
    const settings = useSelector((state) => state.settings.value);
    const pause = useSelector((state) => state.pause.value);
    const music = useSelector((state) => state.music.value);
    const garageOpen = useSelector((state) => state.garageOpen.value);
    const pauseOpen = useSelector((state) => state.pauseOpen.value);
    const sound = useRef();


    if (!get("lockr_levels")) {
        set("lockr_levels", level)
    }


    const keyboardMap = [
        {name: "forward", keys: ["ArrowUp", "w", "W"]},
        {name: "backward", keys: ["ArrowDown", "s", "S"]},
        {name: "leftward", keys: ["ArrowLeft", "a", "A"]},
        {name: "rightward", keys: ["ArrowRight", "d", "D"]},
        {name: "jump", keys: ["Space"]},
        {name: "run", keys: ["Shift"]},
        // Optional animation key map
        {name: "action1", keys: ["1"]},
        {name: "action2", keys: ["2"]},
        {name: "action3", keys: ["3"]},
        {name: "action4", keys: ["KeyF"]},
    ];

    const keyboardMap2 = [
        {name: 'forward', keys: ['ArrowUp', 'KeyW']},
        {name: 'backward', keys: ['ArrowDown', 'KeyS']},
        {name: 'left', keys: ['ArrowLeft', 'KeyA']},
        {name: 'right', keys: ['ArrowRight', 'KeyD']},
        {name: 'run', keys: ['Shift']},
        {name: 'brake', keys: ['Space']},
        {name: 'gearUp', keys: ['Period']},
        {name: 'gearDown', keys: ['Comma']},
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
    console.log(get("lockr_levels"))

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

                    <hemisphereLight intensity={0.8}/>

                    <directionalLight position={[10, 30, 5]} intensity={2}/>

                    <Sky/>

                    {
                        // <Environment  ground={{scale:500,radius:5000,height:1000}} files={'./asset/texture/plane6.jpg'} />
                    }


                    <Physics debug={true} gravity={[0, -30, 0]}  >
                        <KeyboardControls map={keyboardMap}>
                            {get("lockr_levels").filter((el) => el.level === 1).map((el) =><group key={el.level + "platform"}>
                                <Platform
                                    url={el.model}
                                    position={el.position}
                                    actionsArray={el.animations}
                                    level={el.level}
                                />
                                {garage.filter((els) => els.id === 1).map((els) => <Gear url={els.model}
                                                                                      position={el.playerPosition}
                                                                                      key={els.id + "player"}
                                                                                      friction={els.friction}
                                                                                      mass={els.mass}
                                                                                      jump={els.jump}
                                                                                      control={els.control}
                                                                                      speed={els.speed}/>)}
                            </group>)}



                        </KeyboardControls>
                    </Physics>

                    <PositionalAudio
                        ref={sound}
                        hasPlaybackControl={true}
                        autoplay={true}
                        loop={false}
                        url="./asset/sound/y2mate.com - Dmitriy Lukyanov_Underwater.mp3"
                        distance={music}
                    />


                </Canvas>
            </StartGame>

        </>
    )
}
useGLTF.preload([
    './asset/model/level_1.glb',
    'public/asset/model/ball_1.glb',
    'public/asset/model/player.glb',
    './asset/model/bag.glb',
    'public/asset/model/city.glb',
    './asset/model/hest.glb',
    "./asset/model/player_hest.glb",
    './asset/model/wheel-tree.glb'
]);