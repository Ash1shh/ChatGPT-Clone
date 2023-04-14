'use client'

import { DocumentData } from "firebase/firestore"
import TypeIt from "typeit-react"

type Props = {
  message: DocumentData
  isLast: boolean
}

function Message({ message, isLast }: Props) {

  const isChatGPT = message.user.name === 'ChatGPT'

  return <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
    <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
      <img src={message.user.avatar} alt="" className="h-8 w-8" />
      <p className="pt-1 text-sm">
        {isChatGPT && isLast ?
          <TypeIt
            options={{
              strings: [`${message.text}`],
              speed: 20,
              waitUntilVisible: true,
            }}
          />
          :
          message.text}
      </p>
    </div>
  </div>
}

export default Message