"use client";

import React from "react";
import FreePlanChat from "@/components/chatting/Free/free-plan-chat";
import PaidPlanChat from "@/components/chatting/Paid/paid-plan-chat";
import { useUserPlan } from "@/context/user-plan-context";
import { redirect } from "next/navigation";

const ContentPage = () => {
  const userPlan = useUserPlan();

  if (userPlan === undefined) {
    redirect("/onboarding");
  }

  return (
    <>
      {userPlan.isPaid ? (
        // Paid plan content
        <FreePlanChat />
      ) : (
        // Free plan content
        <PaidPlanChat />
      )}
    </>
  );
};

export default ContentPage;
