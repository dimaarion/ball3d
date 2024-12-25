import { useFrame } from "@react-three/fiber";
import {useEffect, useRef, useState} from "react";
import {CylinderCollider, RigidBody, useRevoluteJoint} from "@react-three/rapier";
import {Box, useGLTF, useKeyboardControls} from "@react-three/drei";
import * as THREE from "three";
import {MathUtils} from "three";
import {routable} from "../actions";

export default function Car2(props) {
    const body = useRef(); // Ссылка на физическое тело машины


    const [speed, setSpeed] = useState(0); // Текущая скорость машины
    const [steeringAngle, setSteeringAngle] = useState(0); // Угол поворота руля
    const [carDirection, setCarDirection] = useState(0); // Текущее направление машины
    const maxSpeed = props.speed; // Максимальная скорость
    const acceleration = 10; // Ускорение
    const brakingForce = 2; // Сила торможения
    const turnSpeed = props.control; // Скорость поворота руля
    const friction = 2; // Замедление без нажатия клавиш
    const {nodes, materials, animations} = useGLTF('./asset/model/car.glb');

    const [, get] = useKeyboardControls(); // Подключение клавиатурных контролов


    const cameraOffset = new THREE.Vector3(0, 5, 20); // Камера выше и позади машины




    useFrame((state, delta) => {
        if (!body.current) return;

        const carPosition = body.current?.translation(); // Позиция машины
        const carRotation = body.current?.rotation(); // Текущее вращение машины в кватернионах

        // Получение состояния клавиш
        const { forward, backward, leftward, rightward } = get();
        if (forward || backward || leftward || rightward) {
            body.current?.wakeUp();
        }else {
          //  body.current?.sleep();
        }
        const velocity = body.current.linvel(); // Получение текущей скорости тела

        // Управление скоростью
        if (forward) {
            setSpeed((prev) => Math.min(prev - acceleration * delta, maxSpeed));
        } else if (backward) {
            setSpeed((prev) => Math.max(prev + brakingForce * delta, -maxSpeed / 2));
        } else {
            setSpeed((prev) => prev * (1 - friction * delta));
        }

        // Управление углом поворота руля
        if (leftward) {
            setSteeringAngle((prev) =>
                Math.max(prev - turnSpeed * delta, -Math.PI / 4)
            ); // Поворот влево
        } else if (rightward) {
            setSteeringAngle((prev) =>
                Math.min(prev + turnSpeed * delta, Math.PI / 4)
            ); // Поворот вправо
        } else {
            setSteeringAngle((prev) => prev * (1 - delta * 5)); // Возврат руля в нейтральное положение
        }

        // Обновление направления машины
        if (speed !== 0) {
            setCarDirection((prev) => prev + steeringAngle * delta * speed * 0.05);
        }

        // Вычисление нового направления движения машины
        const direction = new THREE.Vector3(
            Math.sin(carDirection),
            0,
            Math.cos(carDirection)
        ).normalize();

        // Применение скорости и направления к физическому телу


/*if(forward || backward){
    body.current?.setAngvel({
        x:body.current?.angvel().x,
        y:-steeringAngle * 2,
        z:body.current?.angvel().z
    })
}
    */

        const carRef = body.current;


        const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(
            carRef?.rotation()
        );
        const rightVector = new THREE.Vector3(1, 0, 0).applyQuaternion(
            carRef?.rotation()
        );

        let impulse = new THREE.Vector3();

        if (forward) {
            impulse.add(forwardVector.multiplyScalar(-speed));
        }

        if (backward) {
            impulse.add(forwardVector.multiplyScalar(speed));
        }

        if (leftward) {
            carRef?.applyTorqueImpulse({ x: 0, y: turnSpeed, z: 0 });
        }

        if (rightward) {
            carRef?.applyTorqueImpulse({ x: 0, y: -turnSpeed, z: 0 });
        }

        carRef?.applyImpulse(impulse, true);




//console.log(carRotation.y > 0.3 || carRotation.y < -0.3)


        // Управление камерой


        // Вычисление позиции камеры относительно машины

        const rotatedOffset = cameraOffset.clone().applyQuaternion(carRotation); // Учитываем поворот машины

        // Позиция камеры
        const cameraPosition = new THREE.Vector3(
            carPosition.x + rotatedOffset.x,
            carPosition.y + rotatedOffset.y,
            carPosition.z + rotatedOffset.z
        );

        // Плавное перемещение камеры

         state.camera.position.lerp(cameraPosition, 0.1);



        // Камера всегда смотрит на машину
        state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
    });

    useEffect(()=>{



    },[])


    return (
        <>
        <group scale={3} position={[0,0.5,0]} >
            <RigidBody
                ref={body}
                colliders="cuboid"
                type="dynamic"
                friction={0}
                restitution={0.5}
                mass={1}
                angularDamping={10}
                linearDamping={1}
                {...props}
                args={[0.5,0.5,0.5]}
            >


                <Box args={[2, 1, 4]}>
                    <meshStandardMaterial color="red" />
                </Box>

            </RigidBody>
        </group>
        </>
    );
}
