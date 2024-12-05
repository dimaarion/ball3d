import {useDispatch, useSelector} from "react-redux";
import {updateMusic} from "../reduser/music";
import {useEffect, useState} from "react";
import {db} from "./Database";
import {getSound} from "../reduser/sound";
import CloseBtn from "./CloseBtn";
import {decrementSettings, incrementSettings} from "../reduser/settingsOpen";
import {decrementPause, incrementPause} from "../reduser/pause";
import {updateResize} from "../reduser/resize";
import {get,set,setPrefix} from "lockr";


export default function Settings() {
    const dispatch = useDispatch();
    const selectMusic = useSelector((state) => state.music.value);
    const selectSound = useSelector((state) => state.sound.value);
    const selectResize = useSelector((state) => state.resize.value);
    const [over, setOver] = useState({play: "#FF803F", border: "#00CAC9"});

    setPrefix("lockr_")
useEffect(()=>{
    dispatch(updateMusic(get('music')))
},[])


    return <>
        <div className="fixed z-30 text-center w-[400px] left-0 right-0 m-auto mt-[100px]">
            <svg width="100%" viewBox="0 0 789 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient_1" gradientUnits="userSpaceOnUse" x1="394.5" y1="0" x2="394.5"
                                    y2="800">
                        <stop offset="0" stopColor="#FFD39F"/>
                        <stop offset="0.987" stopColor="#427776"/>
                    </linearGradient>
                    <clipPath id="clip_path_2">
                        <rect width="412" height="67"/>
                    </clipPath>
                    <radialGradient id="gradient_3" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
                                    gradientTransform="matrix(0 5 -300 0 300 5)">
                        <stop offset="0" stopColor="#FF7F3D"/>
                        <stop offset="1" stopColor="#00CCCB"/>
                    </radialGradient>
                    <clipPath id="clip_path_4">
                        <rect width="100" height="100"/>
                    </clipPath>
                </defs>
                <g>
                    <rect width="789" height="800"/>
                    <g id="SettingsFrame">
                        <path id="SettingsFrame-main"
                              d="M739 0C766.618 0 789 22.382 789 50L789 750C789 777.618 766.618 800 739 800L50 800C22.382 800 0 777.618 0 750L0 50C0 22.382 22.382 0 50 0L739 0Z"
                              fill="url(#gradient_1)"/>
                        <path id="SettingsFrame-bg"
                              d="M682.643 0C710.261 0 732.643 22.382 732.643 50L732.643 700C732.643 727.618 710.261 750 682.643 750L50 750C22.382 750 0 727.618 0 700L0 50C0 22.382 22.382 0 50 0L682.643 0Z"
                              fill="#10323E" transform="translate(28 25)"/>
                        <g id="SettingsFrame-title" transform="translate(181.47 0)">
                            <g fill="#331F34" fillRule="evenodd">
                                <path id="SettingsFrame-s-r"
                                      d="M0 0L426.06 0L395.212 70.1767Q394.849 71.0025 394.456 71.8146Q394.064 72.6267 393.642 73.4241Q393.22 74.2215 392.77 75.0032Q392.32 75.7848 391.842 76.5497Q391.364 77.3145 390.858 78.0616Q390.353 78.8087 389.82 79.537Q389.288 80.2653 388.73 80.9739Q388.172 81.6826 387.589 82.3705Q387.005 83.0585 386.397 83.725Q385.789 84.3914 385.158 85.0355Q384.526 85.6795 383.872 86.3003Q383.217 86.9211 382.541 87.5179Q381.865 88.1146 381.167 88.6866Q380.47 89.2585 379.752 89.8048Q379.034 90.3512 378.297 90.8712Q377.56 91.3912 376.805 91.8843Q376.049 92.3774 375.277 92.8428Q374.504 93.3083 373.715 93.7455Q372.926 94.1827 372.122 94.5911Q371.317 94.9996 370.499 95.3787Q369.68 95.7578 368.849 96.107Q368.017 96.4563 367.173 96.7753Q366.33 97.0943 365.475 97.3826Q364.62 97.6709 363.756 97.9281Q362.891 98.1853 362.018 98.4111Q361.144 98.6369 360.263 98.831Q359.383 99.0251 358.495 99.1872Q357.608 99.3493 356.715 99.4793Q355.823 99.6093 354.926 99.7069Q354.029 99.8045 353.129 99.8697Q352.23 99.9348 351.328 99.9674Q350.427 100 349.525 100L76.5358 100Q75.6338 100 74.7323 99.9674Q73.8309 99.9348 72.9312 99.8697Q72.0316 99.8045 71.1348 99.7069Q70.2381 99.6093 69.3455 99.4793Q68.4529 99.3493 67.5656 99.1872Q66.6782 99.0251 65.7973 98.831Q64.9164 98.6369 64.0431 98.4111Q63.1698 98.1853 62.3052 97.9281Q61.4407 97.6709 60.5859 97.3826Q59.7312 97.0943 58.8875 96.7753Q58.0437 96.4563 57.2121 96.1071Q56.3804 95.7578 55.5619 95.3787Q54.7434 94.9996 53.9391 94.5912Q53.1349 94.1828 52.3459 93.7456Q51.5569 93.3083 50.7843 92.8429Q50.0116 92.3775 49.2563 91.8844Q48.5009 91.3913 47.7639 90.8713Q47.0268 90.3513 46.3091 89.8049Q45.5913 89.2586 44.8938 88.6867Q44.1962 88.1148 43.5198 87.5181Q42.8434 86.9213 42.189 86.3005Q41.5346 85.6797 40.903 85.0357Q40.2715 84.3916 39.6636 83.7252Q39.0557 83.0587 38.4723 82.3708Q37.889 81.6828 37.3308 80.9742Q36.7727 80.2656 36.2405 79.5373Q35.7083 78.8089 35.2028 78.0619Q34.6973 77.3148 34.2191 76.55Q33.7409 75.7851 33.2907 75.0035Q32.8405 74.2219 32.4188 73.4245Q31.9971 72.6271 31.6045 71.815Q31.2119 71.0029 30.8489 70.1771L0 0Z"/>
                                <path
                                    d="M1.75835 4L30.8489 70.1771Q31.2119 71.0029 31.6045 71.815Q31.9971 72.6271 32.4188 73.4245Q32.8405 74.2219 33.2907 75.0035Q33.7409 75.7851 34.2191 76.55Q34.6973 77.3148 35.2028 78.0619Q35.7083 78.8089 36.2405 79.5373Q36.7727 80.2656 37.3308 80.9742Q37.889 81.6828 38.4723 82.3708Q39.0557 83.0587 39.6636 83.7252Q40.2715 84.3916 40.903 85.0357Q41.5346 85.6797 42.189 86.3005Q42.8434 86.9213 43.5198 87.5181Q44.1962 88.1148 44.8938 88.6867Q45.5913 89.2586 46.3091 89.8049Q47.0268 90.3513 47.7639 90.8713Q48.5009 91.3913 49.2563 91.8844Q50.0116 92.3775 50.7843 92.8429Q51.5569 93.3084 52.3459 93.7456Q53.1349 94.1828 53.9391 94.5912Q54.7434 94.9996 55.5619 95.3787Q56.3804 95.7578 57.2121 96.1071Q58.0437 96.4563 58.8875 96.7753Q59.7312 97.0943 60.5859 97.3826Q61.4407 97.6709 62.3052 97.9281Q63.1698 98.1853 64.0431 98.4111Q64.9164 98.6369 65.7973 98.831Q66.6782 99.0251 67.5656 99.1872Q68.4529 99.3493 69.3455 99.4793Q70.2381 99.6093 71.1348 99.7069Q72.0316 99.8045 72.9312 99.8697Q73.8309 99.9348 74.7323 99.9674Q75.6338 100 76.5358 100L349.525 100Q350.427 100 351.328 99.9674Q352.23 99.9348 353.129 99.8697Q354.029 99.8045 354.926 99.7069Q355.823 99.6093 356.715 99.4793Q357.608 99.3493 358.495 99.1872Q359.383 99.0251 360.263 98.831Q361.144 98.6369 362.018 98.4111Q362.891 98.1853 363.756 97.9281Q364.62 97.6709 365.475 97.3826Q366.33 97.0943 367.173 96.7753Q368.017 96.4563 368.849 96.107Q369.68 95.7578 370.499 95.3787Q371.317 94.9996 372.122 94.5911Q372.926 94.1827 373.715 93.7455Q374.504 93.3083 375.277 92.8428Q376.049 92.3774 376.805 91.8843Q377.56 91.3912 378.297 90.8712Q379.034 90.3512 379.752 89.8048Q380.47 89.2585 381.167 88.6866Q381.865 88.1146 382.541 87.5179Q383.217 86.9211 383.872 86.3003Q384.526 85.6795 385.158 85.0355Q385.789 84.3914 386.397 83.725Q387.005 83.0585 387.589 82.3705Q388.172 81.6826 388.73 80.9739Q389.288 80.2653 389.82 79.537Q390.353 78.8087 390.858 78.0616Q391.364 77.3145 391.842 76.5497Q392.32 75.7848 392.77 75.0032Q393.22 74.2215 393.642 73.4241Q394.064 72.6267 394.456 71.8146Q394.849 71.0025 395.212 70.1767L424.302 4L426.06 0L0 0L1.75835 4ZM6.12776 4L34.5107 68.5674Q40.0066 81.0698 51.4427 88.5349Q62.8788 96 76.5358 96L349.525 96Q363.182 96 374.618 88.5348Q386.054 81.0695 391.55 68.5671L419.932 4L6.12776 4Z"
                                    fill="#FCD29E" fillRule="evenodd"/>
                            </g>
                            <path
                                d="M34.3018 53.9551L26.3916 53.9551L26.3916 39.6973L11.8896 39.6973L11.8896 53.9551L4.00391 53.9551L4.00391 18.9453L11.8896 18.9453L11.8896 32.9102L26.3916 32.9102L26.3916 18.9453L34.3018 18.9453L34.3018 53.9551ZM73.0957 53.9551L64.502 53.9551L62.0117 46.167L49.5605 46.167L47.0947 53.9551L38.5498 53.9551L51.2939 18.9453L60.6445 18.9453L73.0957 53.9551ZM60.2051 40.1123L56.4453 28.3447Q56.0303 27.0264 55.8594 25.1953L55.6641 25.1953Q55.542 26.7334 55.0537 28.2471L51.2451 40.1123L60.2051 40.1123ZM102.075 52.71Q98.2422 54.5654 92.0654 54.5654Q84.0088 54.5654 79.3945 49.8291Q74.7803 45.0928 74.7803 37.207Q74.7803 28.8086 79.9683 23.584Q85.1563 18.3594 93.4326 18.3594Q98.5596 18.3594 102.075 19.6533L102.075 27.2461Q98.5596 25.1465 94.0674 25.1465Q89.1357 25.1465 86.1084 28.2471Q83.0811 31.3477 83.0811 36.6455Q83.0811 41.7236 85.9375 44.7388Q88.7939 47.7539 93.6279 47.7539Q98.2422 47.7539 102.075 45.5078L102.075 52.71ZM132.764 25.3662L122.778 25.3662L122.778 53.9551L114.868 53.9551L114.868 25.3662L104.932 25.3662L104.932 18.9453L132.764 18.9453L132.764 25.3662ZM145.361 41.8945L145.361 53.9551L137.476 53.9551L137.476 18.9453L149.829 18.9453Q163.062 18.9453 163.062 30.1025Q163.062 35.376 159.265 38.6353Q155.469 41.8945 149.121 41.8945L145.361 41.8945ZM145.361 25L145.361 35.9131L148.462 35.9131Q154.761 35.9131 154.761 30.3955Q154.761 25 148.462 25L145.361 25ZM182.788 54.5654Q175.269 54.5654 170.532 49.6704Q165.796 44.7754 165.796 36.9141Q165.796 28.6133 170.605 23.4863Q175.415 18.3594 183.35 18.3594Q190.845 18.3594 195.471 23.2666Q200.098 28.1738 200.098 36.2061Q200.098 44.458 195.3 49.5117Q190.503 54.5654 182.788 54.5654ZM183.13 25.1465Q178.979 25.1465 176.538 28.2593Q174.097 31.3721 174.097 36.499Q174.097 41.6992 176.538 44.7266Q178.979 47.7539 182.935 47.7539Q187.012 47.7539 189.404 44.812Q191.797 41.8701 191.797 36.6455Q191.797 31.2012 189.478 28.1738Q187.158 25.1465 183.13 25.1465ZM237.402 53.9551L229.956 53.9551L229.956 34.7168Q229.956 31.3965 230.2 29.0527L230.054 29.0527Q229.541 30.0537 228.296 31.958L213.843 53.9551L205.908 53.9551L205.908 18.9453L213.354 18.9453L213.354 38.3057Q213.354 41.8945 213.159 43.1152L213.257 43.1152Q213.379 42.8223 215.063 40.2588L228.955 18.9453L237.402 18.9453L237.402 53.9551ZM232.446 7.25098Q232.007 11.1328 229.102 13.4277Q226.196 15.7227 221.899 15.7227Q217.529 15.7227 214.624 13.4277Q211.719 11.1328 211.499 7.25098L217.114 7.25098Q217.236 9.13087 218.652 10.3394Q220.068 11.5479 221.997 11.5479Q223.901 11.5479 225.293 10.3271Q226.685 9.10645 226.831 7.25098L232.446 7.25098ZM274.536 53.9551L264.575 53.9551L254.37 38.7451Q254.077 38.3057 253.442 36.8164L253.32 36.8164L253.32 53.9551L245.435 53.9551L245.435 18.9453L253.32 18.9453L253.32 35.498L253.442 35.498Q253.735 34.8145 254.419 33.5449L264.087 18.9453L273.486 18.9453L261.279 35.6445L274.536 53.9551ZM309.375 53.9551L301.929 53.9551L301.929 34.7168Q301.929 31.3965 302.173 29.0527L302.026 29.0527Q301.514 30.0537 300.269 31.958L285.815 53.9551L277.881 53.9551L277.881 18.9453L285.327 18.9453L285.327 38.3057Q285.327 41.8945 285.132 43.1152L285.229 43.1152Q285.352 42.8223 287.036 40.2588L300.928 18.9453L309.375 18.9453L309.375 53.9551Z"
                                transform="translate(55 16.248)" fill="#FFFFFF" clipPath="url(#clip_path_2)"/>
                        </g>
                        <g transform="translate(125 155)">
                            <rect width="100" height="100"/>
                            <path id="SettingsFrame-p"
                                  d="M30.9667 11.4712L30.9667 0C30.9667 0 13.5399 0 13.5399 0C6.80352 0 1.09219 4.95333 0.139523 11.6221C-1.12277 20.4579 6.36227 28.0754 15.2189 26.9683C15.2189 26.9683 17.5424 26.6779 17.5424 26.6779C25.2113 25.7196 30.9667 19.2 30.9667 11.4712C30.9667 11.4712 30.9667 11.4712 30.9667 11.4712Z"
                                  fill="#222222" fillRule="evenodd" transform="translate(23.2 58.333)"/>
                            <path id="SettingsFrame-figure"
                                  d="M30.9667 20.71C30.9667 20.71 30.9667 18.1621 30.9667 18.1621C30.9667 11.419 30.9667 8.04749 32.9413 5.71627C34.9163 3.38507 38.2417 2.83078 44.8933 1.72223C44.8933 1.72223 54.7129 0.0856094 54.7129 0.0856094C55.2788 -0.00868225 55.5617 -0.0558481 55.7142 0.109527C55.8671 0.274859 55.7975 0.553193 55.6583 1.10973C55.6583 1.10973 51.9275 16.0317 51.9275 16.0317C51.8654 16.2804 51.8346 16.4047 51.7471 16.488C51.6596 16.5714 51.5342 16.5965 51.2825 16.6468C51.2825 16.6468 30.9667 20.71 30.9667 20.71L30.9667 20.71ZM30.9667 20.71L30.9667 45.71M30.9667 45.71C30.9667 45.71 30.9667 57.1812 30.9667 57.1812C30.9667 64.91 25.2113 71.4296 17.5424 72.3879C17.5424 72.3879 15.2189 72.6783 15.2189 72.6783C6.36227 73.7854 -1.12277 66.1679 0.139523 57.3321C1.09219 50.6633 6.80352 45.71 13.5399 45.71C13.5399 45.71 30.9667 45.71 30.9667 45.71L30.9667 45.71Z"
                                  fill="none" strokeWidth="8" stroke="#FF7E3D" transform="translate(23.2 12.623)"/>
                        </g>
                        <g transform="translate(125 291)">
                            <rect width="100" height="100"/>
                            <path id="volume-full"
                                  d="M61.2903 0C61.2903 0 61.2903 6.62251 61.2903 6.62251C80.2322 10.2708 93.5484 25.7192 93.5484 45.1129C93.5484 64.3968 80.6451 79.3355 61.2903 83.6032C61.2903 83.6032 61.2903 90.229 61.2903 90.229C83.1484 87.029 100 68.1548 100 45.1129C100 22.0709 83.1484 3.19667 61.2903 0C61.2903 0 61.2903 0 61.2903 0L61.2903 0ZM45.1613 6.40317L22.5807 21.458L22.5807 68.7677C22.5807 68.7677 45.1613 83.8225 45.1613 83.8225C48.7226 83.8225 51.6129 80.9322 51.6129 77.3709C51.6129 77.3709 51.6129 12.8548 51.6129 12.8548C51.6129 9.29348 48.7226 6.40317 45.1613 6.40317C45.1613 6.40317 45.1613 6.40317 45.1613 6.40317L45.1613 6.40317ZM80.6451 45.1129C80.6451 33.7483 72.2193 24.4355 61.2903 22.8581C61.2903 22.8581 61.2903 29.3097 61.2903 29.3097C68.6516 30.8033 74.1935 37.3096 74.1935 45.1129C74.1935 52.9161 68.6516 59.4225 61.2903 60.916C61.2903 60.916 61.2903 67.3677 61.2903 67.3677C72.2193 65.7902 80.6451 56.4774 80.6451 45.1129C80.6451 45.1129 80.6451 45.1129 80.6451 45.1129C80.6451 45.1129 80.6451 45.1129 80.6451 45.1129ZM0 32.2096C0 32.2096 0 58.0161 0 58.0161C0 61.5774 2.89031 64.4677 6.45161 64.4677C6.45161 64.4677 16.129 64.4677 16.129 64.4677L16.129 25.758C16.129 25.758 6.45161 25.758 6.45161 25.758C2.89031 25.758 0 28.6483 0 32.2096C0 32.2096 0 32.2096 0 32.2096L0 32.2096Z"
                                  fill="#FF7E3D" fillRule="evenodd" transform="translate(0 4.887)"/>
                        </g>
                        <path id="SettingsFrame-line"
                              d="M595 0C597.762 0 600 2.23822 600 5L600 5C600 7.76178 597.762 10 595 10L5 10C2.2382 10 0 7.76178 0 5L0 5C0 2.23822 2.2382 0 5 0L595 0Z"
                              fill="url(#gradient_3)" transform="translate(95 583)"/>
                        <g clipPath="url(#clip_path_4)" transform="translate(125 428)">
                            <rect width="100" height="100"/>
                            <path id="Фигура"
                                  d="M50.0056 87.5C48.2797 87.5 46.8806 86.1009 46.8806 84.375C46.8806 84.375 46.8806 3.125 46.8806 3.125C46.8806 1.39911 48.2797 0 50.0056 0C51.7315 0 53.1306 1.39911 53.1306 3.125C53.1306 3.125 53.1306 84.375 53.1306 84.375C53.1306 86.1009 51.7315 87.5 50.0056 87.5C50.0056 87.5 50.0056 87.5 50.0056 87.5ZM0.918087 45.9625C0.330326 45.3762 1.86265e-07 44.5802 0 43.75C0 42.9198 0.330326 42.1238 0.918087 41.5375C0.918087 41.5375 13.4181 29.0375 13.4181 29.0375C14.64 27.8156 16.6212 27.8156 17.8431 29.0375C19.065 30.2594 19.065 32.2406 17.8431 33.4625C17.8431 33.4625 10.6743 40.625 10.6743 40.625C10.6743 40.625 34.3806 40.625 34.3806 40.625C36.1065 40.625 37.5056 42.0241 37.5056 43.75C37.5056 45.4759 36.1065 46.875 34.3806 46.875C34.3806 46.875 10.6743 46.875 10.6743 46.875C10.6743 46.875 17.8431 54.0375 17.8431 54.0375C19.065 55.2594 19.065 57.2406 17.8431 58.4625C16.6212 59.6844 14.64 59.6844 13.4181 58.4625C13.4181 58.4625 0.918087 45.9625 0.918087 45.9625ZM62.5056 43.75C62.5056 42.0241 63.9047 40.625 65.6306 40.625C65.6306 40.625 89.3368 40.625 89.3368 40.625C89.3368 40.625 82.1681 33.4625 82.1681 33.4625C80.9463 32.2407 80.9461 30.2599 82.1677 29.0379C83.3893 27.8159 85.3701 27.8154 86.5923 29.0367C86.5923 29.0367 99.0923 41.5367 99.0923 41.5367C99.6801 42.123 100.01 42.9191 100.01 43.7492C100.01 44.5794 99.6801 45.3755 99.0923 45.9617C99.0923 45.9617 86.5923 58.4617 86.5923 58.4617C85.3705 59.6835 83.3897 59.6837 82.1677 58.4621C80.9457 57.2406 80.9452 55.2597 82.1666 54.0375C82.1666 54.0375 89.3368 46.875 89.3368 46.875C89.3368 46.875 65.6306 46.875 65.6306 46.875C63.9047 46.875 62.5056 45.4759 62.5056 43.75C62.5056 43.75 62.5056 43.75 62.5056 43.75Z"
                                  fill="#FF7E3D" transform="translate(-0.006 6.25)"/>
                        </g>
                    </g>
                </g>
            </svg>

            <input type={"range"} id="sound" min={0} max={100}  defaultValue={get("sound")}
                   onChange={(e)=> {
                       set('sound', e.target.value);
                       dispatch(getSound(e.target.value))
                   }}
                   className="absolute top-[110px] left-[130px] w-[220px] bg-orange appearance-none h-1 border-2 border-aqua cursor-pointer range"/>

            <input type={"range"} min={0} max={100} defaultValue={get('music')}
                   onChange={(e) => {
                       set('music', e.target.value);
                       dispatch(updateMusic(e.target.value))
                   }}
                   className="absolute top-[175px] left-[130px] w-[220px] bg-orange appearance-none h-1 border-2 border-aqua cursor-pointer range"/>

            <input type={"range"} min={0} max={100} defaultValue={selectResize}
                   onChange={(e) => dispatch(updateResize(parseInt(e.target.value)))}
                   className="absolute top-[240px] left-[130px] w-[220px] bg-orange appearance-none h-1 border-2 border-aqua cursor-pointer range"/>

            <div onMouseDown={() => {
                dispatch(decrementSettings());
                dispatch(decrementPause());
             //   updateSounds()
            }} className="absolute w-[150px] bottom-10 right-0 left-0 m-auto cursor-pointer">
                <CloseBtn/>
            </div>
        </div>
    </>
}