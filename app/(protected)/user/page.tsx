"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { logOutWithFirebaseAuth } from "@/lib/firebase/firebase-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { data, type People } from "@/lib/data";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function filterById(targetId: number): People[] {
  return data.filter((person) => person.id === targetId);
}

function Page() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>("");
  const [id, setId] = useState("");
  const [matches, setMatches] = useState<People[]>([]);

  // useEffect(() => {
  //   const fetchUser = session?.user;
  //   console.log(fetchUser);
  //   setUser(fetchUser);
  // }, [session]);
  useEffect(() => {
    setId(localStorage.getItem("user") || "");
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      setMatches(filterById(Number(localStorage.getItem("user"))));
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="w-[800px] md:mx-auto max-w-full max-sm:mx-6 mt-5">
        <p className="text-center">
          ☆下のフォームで出席番号を登録してください。
          <br /> 反映されない場合はサイトをリロードしてください。
        </p>
        <div className="flex justify-center items-center mt-4">
          <div className="flex w-full max-w-sm items-center gap-2 ">
            <Input
              type="number"
              min="1"
              max="48"
              placeholder="出席番号（1〜48）"
              onChange={(e) => {
                setId(e.target.value);
              }}
              value={id}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                localStorage.setItem("user", id);
                toast.success("出席番号を登録しました");
              }}
            >
              登録
            </Button>
          </div>
        </div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-3 mt-8">
          自分のシフト
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {matches.map((person) => (
            <Card key={person.id}>
              <CardHeader>
                <CardTitle>{person.name}</CardTitle>
                <CardDescription>{person.role}</CardDescription>
                <CardAction>{person.id}</CardAction>
              </CardHeader>
              <CardContent>
                <p>
                  {person.date}　{person.start} 〜 {person.end}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center items-center mt-14">
          <Button onClick={logOutWithFirebaseAuth}>ログアウト</Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
