import ContentPage from "@/components/chatting/content-page";
import VoicePage from "@/components/chatting/voice-page";

export default function ChattingPage() {
  // Render the appropriate content based on the user's plan
  return (
    <div className="w-full h-full">
      {/* <ContentPage /> */}
      <VoicePage />
    </div>
  );
}
