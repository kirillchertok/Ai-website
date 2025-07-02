import Header from "@/components/chatting/header";
import Sidebar from "@/components/chatting/sideBar/sidebar";
import { UserPlanProvider } from "@/context/user-plan-context";
import { redirect } from "next/navigation";
import React from "react";

export default async function ChattingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This would be replaced with your actual authentication and plan check logic
  const getUserPlan = async () => {
    // Fetch user data from your API or auth service
    // For now, we'll simulate a user with a free plan
    return { isPaid: false };
  };

  const userPlan = await getUserPlan();
  // redirect('/onboarding');

  return (
    <UserPlanProvider userPlan={userPlan}>
      <div className="flex flex-col h-screen w-full">
        {/* Header - fixed at top */}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - fixed at left */}
          <Sidebar />

          {/* Main content area - changes based on plan */}
          <main className="flex-1 overflow-auto h-screen">
            <Header />
            <div className="lg:p-4 md:p-6 xs:p-0 h-[90%]">{children}</div>
          </main>
        </div>
      </div>
    </UserPlanProvider>
  );
}
