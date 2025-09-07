import React from "react";
import Header from "@/components/Header";
import ShiftList from "@/components/ShiftList";
export default function Page() {
  return (
    <div>
      <Header />
      <div className="w-[800px] md:mx-auto max-w-full max-sm:mx-6">
        <h1 className="scroll-m-20 sm:text-center text-4xl font-extrabold tracking-tight text-balance mt-6 max-sm:text-left">
          シフト一覧表
        </h1>
        <ShiftList />
      </div>
    </div>
  );
}
