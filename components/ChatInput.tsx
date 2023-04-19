'use client'

import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"
import { db } from "../firebase"
import ModelSelection from "./ModelSelection"
import useSWR from 'swr'


type Props = {
    chatId: string
}


function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState<string>("")
    const { data: session } = useSession()

    const { data: model } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    })

    //TODO: useswr to get model

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return
        const input = prompt.trim()
        setPrompt("")

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message)

        //toast notification
        const notification = toast.loading('ithalli is thinking...')

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
            //toast notification
            toast.success('ithalli has responded', {
                id: notification
            })
        })
    }

    return (
        <div className='flex flex-col'>
            <div className='bg-[#41414F] text-gray-400 rounded-lg text-sm lg:mx-[446px] mt-16 mb-3'>
                <form onSubmit={sendMessage} className="p-3 space-x-5 flex">
                    <input type="text"
                        className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                        placeholder="Type your message here ..."
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                    />
                    <button type="submit"
                        className="hover:bg-[#2a2b32] text-white font-bold px-3 py-2 rounded disabled:bg-gray-300/90 disabled:cursor-not-allowed"
                        disabled={!prompt}
                    >
                        <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                    </button>
                </form>

                <div className="md:hidden">
                    {/*ModelSelection*/}
                    <ModelSelection />
                </div>
            </div>
            <h1 className='w-full text-center text-xs mb-5 text-[#7F8186] font-semibold'>Ithalli Apr 1 Version. Free Research Preview. Ithalli may produce inaccurate information about people, places, or facts.</h1>
        </div>
    )
}

export default ChatInput

