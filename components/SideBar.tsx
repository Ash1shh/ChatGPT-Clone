'use client'

import { signOut, useSession } from "next-auth/react"
import NewChat from "./NewChat"
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "firebase/firestore"
import { db } from "../firebase"
import ChatRow from "./ChatRow"
import ModelSelection from "./ModelSelection"
import { ArrowRightOnRectangleIcon, GifIcon } from "@heroicons/react/24/solid"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import { GiftIcon } from "@heroicons/react/24/outline"



function SideBar() {
    
    const { data: session } = useSession()

    const [chats, loading, error] = useCollection(
        session && query(collection(db, 'users', session.user?.email!, 'chats'),
            orderBy("createdAt", "asc"))
    )

    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1">
                <div>
                    {/*New Chat*/}
                    <NewChat />

                    <div className="hidden sm:inline">
                        {/* Mode Selection */}
                        <ModelSelection />
                    </div>

                    <div className="flex flex-col space-y-2 my-2">

                        {loading && (
                            <div className="animate-pulse text-center text-white">Loading Chats...</div>
                        )}

                        {/*Map Through the chat rows*/}
                        {chats?.docs.map(chat =>
                            <ChatRow key={chat.id} id={chat.id} />
                        )}
                    </div>
                </div>

            </div>

            {session && (
                <img
                    onClick={() => signOut()}
                    src={session.user?.image!}
                    alt="Profile Pic"
                    className=" hidden h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
                />
            )}

            <hr className="mb-2" />

            <div className="mb-2">
                <a href="https://github.com/Ash1shh/ITHALLI" target="_blank">
                    <div className="chatrow justify-start">
                        <GiftIcon className="h-5 w-5" />
                        <p>Source Code</p>
                    </div>
                </a>

                <a href="https://github.com/Ash1shh/ITHALLI/issues" target="_blank">
                    <div
                        className="chatrow justify-start">
                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                        <p>Updates & FAQ</p>
                    </div>
                </a>

                <div onClick={() => signOut()} className=" chatrow justify-start">
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <p>Log out</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar