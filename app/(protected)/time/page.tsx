"use client";
import { useState, useEffect } from "react";
import moment from "moment";
import Header from "@/components/Header";
let mTimeoutId: any = 0;
let mTimeStr: string = ""; // HH:MM:SSSS
//
function Page() {
  const [updatetime, setUpdatetime] = useState<string>("");
  //
  const updateTimestap = function () {
    const dt = new Date().toString();
    setUpdatetime(dt);
  };
  /**
   * timer_func
   * @param
   *
   * @return
   */
  const timer_func = async function () {
    const now = moment();
    //        mTimeStr = now.format("YYYY-MM-DD HH:mm:ss");
    mTimeStr = now.format("HH:mm:ss");
    updateTimestap();
    //console.log("sNow=", mTimeStr);
    timeout_next();
  };
  //
  function timeout_next() {
    mTimeoutId = setTimeout(timer_func, 1000);
  }
  //
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      timeout_next();
    })();
  }, []);
  //console.log(updatetime);
  //
  return (
    <div>
      <Header />
      <div className="w-[800px] md:mx-auto max-w-full max-sm:mx-6 mt-8">
        <h3 className="text-4xl font-bold mt-8">Clock</h3>
        <span className="d-none">{updatetime}</span>
        <hr className="mb-8" />
        <div className="">
          <h3 className="text-6xl font-bold text-center">{mTimeStr}</h3>
        </div>
      </div>
    </div>
  );
}
export default Page;

/*
 */
