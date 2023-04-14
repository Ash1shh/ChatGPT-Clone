'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"

const Login = () => {

    return (

        <div className="bg-[#353541] h-screen flex flex-col items-center justify-center text-center">
            <Image
                src="https://user-images.githubusercontent.com/87669361/217634637-85b4f9e6-9579-4d10-8ee6-39e124c3fe46.png"
                width={300}
                height={300}
                alt="logo"
            />
            <button onClick={() => signIn("google")} className="text-white font-bold text-3xl animate-pulse">Sign In to use ithalli</button>
        </div>
    )

}

export default Login