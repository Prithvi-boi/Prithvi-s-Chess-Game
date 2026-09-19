import Logo from "../Component/Logo";
import { useState } from "react";
import correct from "/src/Assets/Icons/correct.png"
import Button from "../Component/Button";

// Svg Logos Imports:
import AppleLogo from '../../public/Downloads/appleLogo.svg?react'
import GoogleLogo from '../../public/Downloads/googleLogo.svg?react'
import FacebookLogo from '../../public/Downloads/facebookLogo.svg?react'

export default function LoginPage() {
    const [rememberMe, setRememberMe] = useState(false)
    function handle_rememberMe() {
        setRememberMe(prev => !prev)
    }

    return (
        <div className="flex flex-col gap-5 mx-5 my-10 md:mx-40 lg:mx-70 xl:mx-120">
            <Logo style={"mx-auto"} />
            <div>
                <div className="w-full bg-[#262421] p-5 rounded-t-md flex flex-col gap-10">
                    <div className="flex flex-col gap-5">
                        <input className="w-full text-sm text-[#9D9C9B] bg-[#3C3A37] border border-[#62615E] rounded-md py-3 px-3" type="text" placeholder="Username or Email " />
                        <input className="w-full text-sm text-[#9D9C9B] bg-[#3C3A37] border border-[#62615E] rounded-md py-3 px-3" type="text" placeholder="Password " />
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <button onClick={() => handle_rememberMe()}
                                    className={rememberMe ? "h-5 w-5 border border-[#ffffff]  bg-[#006083] rounded-sm" : "h-5 w-5 border border-[#62615E] rounded-sm"}
                                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {rememberMe && <img src={correct} className="h-2" />}
                                </button>
                                <p className="text-[#92918f]">Remember me</p>
                            </div>
                            <p className="text-[#0297CE]">Forget Password?</p>
                        </div>
                    </div>
                    <div onClick={() => console.log("Login")}>
                        <Button label={"Login"} />
                    </div>
                    <div className="text-[#92918f] gap-4 flex items-center justify-center">
                        <hr className="w-full" />
                        <p>OR</p>
                        <hr className="w-full" />
                    </div>

                    <div className="flex flex-col gap-3">

                        <button className="text-sm flex items-center gap-6 px-7 font-medium h-12 w-full bg-black rounded-lg text-white">
                            <AppleLogo className={"h-5 w-5"} />
                            <div className="flex justify-center w-full">
                                <p>Log in with Apple</p>
                            </div>
                        </button>

                        <button className="text-sm flex items-center gap-6 px-7 font-medium h-12 w-full bg-white rounded-lg">
                            <GoogleLogo className={"h-5 w-5"} />
                            <div className="flex justify-center w-full">
                                <p>Log in with Google</p>
                            </div>
                        </button>

                        <button className="text-sm flex items-center gap-6 px-7 font-medium h-12 w-full bg-[#1778F2] rounded-lg text-white">
                            <FacebookLogo className={"h-5 w-6 rounded-full bg-white"} />
                            <div className="flex justify-center w-full">
                                <p>Log in with Facebook</p>
                            </div>
                        </button>
                    </div>

                </div>
                <div className="px-3 text-sm rounded-b-2xl flex justify-center items-center text-white h-14 w-full bg-[#211F1C]">
                    <p>New? <span className="text-[#009FD9]">Sign up - and start playing chess!</span></p>
                </div>
            </div>
        </div>
    )
}
