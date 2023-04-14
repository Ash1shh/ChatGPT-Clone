// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../utils/queryApi'
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { prompt, chatId, model, session } = req.body

    if(!prompt) {
        res.status(400).json({ answer: "Please provide a prompt!" })
        return
    }

    if(!chatId) {
        res.status(400).json({ answer: "Please provide a valid chat ID" })
        return
    }

    // Query
    const response = await query(prompt, chatId, model)

    const message: Message = {
        text: response || "ithalli was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: "https://user-images.githubusercontent.com/87669361/217633335-4989329d-ed9f-47e0-95af-e24bca141fe2.jpg"
        }
    }

    await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  res.status(200).json({ answer: message.text })
}
