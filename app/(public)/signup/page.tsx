"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { logInWithFirebaseAuth } from "@/lib/firebase/firebase-auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/firebase";
import { useState } from "react";
import { signIn as signInWithNextAuth } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signUp = async () => {
    if (!email) return;
    if (!password) return;
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        const refreshToken = user.refreshToken;
        await signInWithNextAuth("credentials", {
          idToken,
          refreshToken,
          callbackUrl: "/",
        });
        toast.success("アカウントを作成しました");
        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error(errorCode);
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };
  return (
    <div className="h-full bg-white">
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/logo.svg"
            className="mx-auto h-10 w-auto"
            width={100}
            height={100}
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            アカウントを作成
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            aria-label="Sign in with Google"
            type="button"
            className="flex items-center bg-white border border-button-border-light rounded-full p-0.5 pr-4 my-3 mx-auto"
            onClick={logInWithFirebaseAuth}
          >
            <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <title>Sign up with Google</title>
                <desc>Google G Logo</desc>
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="fill-google-logo-blue"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="fill-google-logo-green"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  className="fill-google-logo-yellow"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="fill-google-logo-red"
                ></path>
              </svg>
            </div>
            <span className="text-sm text-google-text-gray tracking-wider">
              Sign up with Google
            </span>
          </button>
          <p className="text-center text-sm/6 text-gray-500">or</p>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                メールアドレス
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-stone-600 sm:text-sm/6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  パスワード
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-stone-600 sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-stone-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                onClick={signUp}
              >
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            すでにアカウントをお持ちですか？
            <Link
              href="/"
              className="font-semibold text-stone-600 hover:text-stone-500"
            >
              ログインしてください。
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
