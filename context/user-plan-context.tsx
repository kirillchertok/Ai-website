'use client';

import { createContext, useContext } from 'react';

type UserPlanType = {
  isPaid: boolean;
};

const UserPlanContext = createContext<UserPlanType | undefined>(undefined);

export function UserPlanProvider({
  children,
  userPlan,
}: {
  children: React.ReactNode;
  userPlan: UserPlanType;
}) {
  return (
    <UserPlanContext.Provider value={userPlan}>
      {children}
    </UserPlanContext.Provider>
  );
}

export function useUserPlan() {
  const context = useContext(UserPlanContext);
  if (context === undefined) {
    throw new Error('useUserPlan must be used within a UserPlanProvider');
  }
  return context;
}
