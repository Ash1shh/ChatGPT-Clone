import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
import Ss from "../../../components/Ss";

type Props = {
  params: {
    id: string
  }
}

function ChatPage({ params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Ss />
      {/*Chat*/}
      <Chat chatId={id} />
      {/*Chat Input*/}
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
