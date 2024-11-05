/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getDataFromLS } from "@/app/util/localStorage";

const UserPage = () => {
  const name = getDataFromLS()
  return (
    <>{name}</>
  )
      
};
export default UserPage;
