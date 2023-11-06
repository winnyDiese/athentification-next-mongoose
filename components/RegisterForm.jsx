"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm(){
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(!name || !email || !password){
            setError('All fields are necessary')
            return
        }

        try {

            const resUserExist = await fetch("api/userExist",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({email})
            })
            
            const {user} = await resUserExist.json()

            if(user){
                setError("User already exist !")
                return 
            }

            const res = await fetch("api/register",{
                method:"POST",
                header:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({name,email,password})
            })

            if(res.ok){
                const form = e.target
                form.reset()
                router.push("/")
            }else{
                console.log("User registration failed.")
            }

        } catch (error) {
            console.log("Errorduring restration : ",error)
        }
    }

    return <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4 ">Register</h1>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input 
                    onChange={e=>setName(e.target.value)}
                    type="text" 
                    placeholder="Full Name"
                />
                <input 
                    onChange={e=>setEmail(e.target.value)}
                    type="text" 
                    placeholder="Email"
                />
                <input 
                    onChange={e=>setPassword(e.target.value)}
                    type="password" 
                    placeholder="Password"
                />
                <button type="submit" className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Register</button>

                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}

                <Link className="text-sm mt-3 text-right" href={'/'}>Already have an account ? <span className="underline">Login</span></Link>
            </form>
        </div>
    </div>
}


