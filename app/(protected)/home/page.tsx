"use client";
import Image from "next/image";
import Header from "@/components/Header";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { data, type People } from "@/lib/data";
import { useEffect, useState } from "react";

function findNearbyInTokyo(entries: People[], minutes = 10): People[] {
  const JST_OFFSET_MS = 9 * 60 * 60 * 1000; // +9 hours
  const nowUtcMs = Date.now();

  // 現在の東京の年月日を得る（UTC時刻に +9h して、その UTC 部分を読む）
  const tokyoNow = new Date(nowUtcMs + JST_OFFSET_MS);
  const tokyoYear = tokyoNow.getUTCFullYear();
  const tokyoMonth = tokyoNow.getUTCMonth() + 1; // 1-12
  const tokyoDate = tokyoNow.getUTCDate();

  const thresholdMs = minutes * 60 * 1000;

  const results = [];

  for (const e of entries) {
    if (!e || typeof e.date !== "string" || typeof e.start !== "string")
      continue;

    // date が YYYY-MM-DD 形式であることを想定して分解
    const dateParts = e.date.split("-").map((s) => parseInt(s, 10));
    if (dateParts.length !== 3 || dateParts.some((n) => Number.isNaN(n)))
      continue;
    const [y, m, d] = dateParts;

    // "今日"（東京基準）であるかチェック
    if (y !== tokyoYear || m !== tokyoMonth || d !== tokyoDate) continue;

    // start を HH:MM または HH:MM:SS でパース
    const timeParts = e.start.split(":").map((s) => parseInt(s, 10));
    if (timeParts.length < 2 || timeParts.some((n) => Number.isNaN(n)))
      continue;
    const hour = timeParts[0];
    const minute = timeParts[1];
    const second = timeParts[2] || 0;

    // エントリの東京ローカル時刻を UTC エポックミリ秒に変換する方法：
    // 東京時刻 = (y,m,d,hour,minute,second) JST
    // この瞬間の UTC ミリ秒は Date.UTC(y,m-1,d, hour - 9, minute, second)
    // （JST = UTC+9 のため、UTC 時刻は hour - 9 になる）
    const entryUtcMs = Date.UTC(y, m - 1, d, hour - 9, minute, second);

    // 現在時刻の UTC ミリ秒との差を取る（nowUtcMs は Date.now() で得られる UTC エポック）
    const diffMs = entryUtcMs - nowUtcMs;

    if (Math.abs(diffMs) <= thresholdMs) {
      results.push(e);
    }
  }

  return results;
}
// 実行時の現在時刻で判定
console.log("matches:", findNearbyInTokyo(data));
// function toUtcMsFromTokyo(
//   y: number,
//   m: number,
//   d: number,
//   hh: number,
//   mm = 0,
//   ss = 0,
// ) {
//   // Date.UTC expects month index 0-11
//   // Tokyo local -> corresponding UTC epoch ms = Date.UTC(y, m-1, d, hh - 9, mm, ss)
//   return Date.UTC(y, m - 1, d, hh - 9, mm, ss);
// }
// const testNowMs = toUtcMsFromTokyo(2025, 9, 10, 9, 2, 0);
// console.log("test matches:", findNearbyInTokyo(data, 10, testNowMs));

function findFutureBeyond10MinInTokyo(
  entries: People[],
  minutes = 10,
): People[] {
  const JST_OFFSET_MS = 9 * 60 * 60 * 1000; // +9h
  const nowUtcMs = Date.now();

  // 東京の今日の日付
  const tokyoNow = new Date(nowUtcMs + JST_OFFSET_MS);
  const yNow = tokyoNow.getUTCFullYear();
  const mNow = tokyoNow.getUTCMonth() + 1;
  const dNow = tokyoNow.getUTCDate();

  const thresholdMs = minutes * 60 * 1000;
  const results = [];

  for (const e of entries) {
    if (!e?.date || !e?.start) continue;

    // 日付パース
    const [y, m, d] = e.date.split("-").map((s) => parseInt(s, 10));
    if ([y, m, d].some((n) => Number.isNaN(n))) continue;

    // 今日のみ対象
    if (y !== yNow || m !== mNow || d !== dNow) continue;

    // start 時刻
    const timeParts = e.start.split(":").map((s) => parseInt(s, 10));
    if (timeParts.length < 2 || timeParts.some((n) => Number.isNaN(n)))
      continue;
    const hh = timeParts[0],
      mm = timeParts[1],
      ss = timeParts[2] || 0;

    // 東京時刻を UTC に変換
    const entryUtcMs = Date.UTC(y, m - 1, d, hh - 9, mm, ss);
    const diffMs = entryUtcMs - nowUtcMs;

    // 「+10分より後」のみ残す
    if (diffMs > thresholdMs) {
      results.push(e);
    }
  }

  return results;
}
console.log("not matches:", findFutureBeyond10MinInTokyo(data, 10));

function findOtherInTokyo(entries: People[], minutes = 10): People[] {
  const JST_OFFSET_MS = 9 * 60 * 60 * 1000; // +9h
  const nowUtcMs = Date.now();

  // 東京の今日の日付
  const tokyoNow = new Date(nowUtcMs + JST_OFFSET_MS);
  const yNow = tokyoNow.getUTCFullYear();
  const mNow = tokyoNow.getUTCMonth() + 1;
  const dNow = tokyoNow.getUTCDate();

  const results = [];

  for (const e of entries) {
    if (!e?.date || !e?.start) continue;

    // 日付パース
    const [y, m, d] = e.date.split("-").map((s) => parseInt(s, 10));
    if ([y, m, d].some((n) => Number.isNaN(n))) continue;

    // start パース
    const timeParts = e.start.split(":").map((s) => parseInt(s, 10));
    if (timeParts.length < 2 || timeParts.some((n) => Number.isNaN(n)))
      continue;
    const hh = timeParts[0],
      mm = timeParts[1],
      ss = timeParts[2] || 0;

    // 東京ローカル時刻 → UTCに変換
    const entryUtcMs = Date.UTC(y, m - 1, d, hh - 9, mm, ss);

    // 今日かどうか判定
    if (y === yNow && m === mNow && d === dNow) {
      // 今日なら「過去の開始時刻」だけ抽出
      if (entryUtcMs < nowUtcMs) {
        results.push(e);
      }
    } else {
      // 今日以外は全部抽出
      results.push(e);
    }
  }

  return results;
}

export default function Home() {
  const minutes = 10;
  const [matches, setMatches] = useState<People[]>([]);
  const [pastMatches, setPastMatches] = useState<People[]>([]);
  const [notMatches, setNotMatches] = useState<People[]>([]);
  useEffect(() => {
    const update = setInterval(() => {
      setMatches(findNearbyInTokyo(data, minutes));
      console.log("Matches:" + findNearbyInTokyo(data, minutes));
      setPastMatches(findFutureBeyond10MinInTokyo(data, minutes));
      console.log("Not Matches:" + findFutureBeyond10MinInTokyo(data, minutes));
      setNotMatches(findOtherInTokyo(data, minutes));
      console.log("Other Matches:" + findOtherInTokyo(data, minutes));
    });
    return () => clearInterval(update);
  }, []);
  return (
    <div>
      <Header />
      <div className="w-[800px] md:mx-auto max-w-full max-sm:mx-6 mt-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center text-red-400 border-b-red-300 mb-3">
          直近のシフト({minutes}分以内)
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
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-3 mt-8">
          今日の残りのシフト
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {pastMatches.map((person) => (
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
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-3 mt-8">
          その他のシフト
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {notMatches.map((person) => (
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
      </div>
    </div>
  );
}
