import ChatPage from "@/components/chatting/chat-page";
import ContentPage from "@/components/chatting/content-page";

export default function ChattingPage() {
  // Render the appropriate content based on the user's plan
  return (
    <div className="w-full h-full">
      {/* <ContentPage /> */}
      <ChatPage />
    </div>
  );
}
