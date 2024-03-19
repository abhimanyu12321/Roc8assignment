"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Signup() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [Password, setPassword] = useState<string>();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("clicked");
  }
  return (
    <div className="flex h-[600px] w-[576px] flex-col items-center rounded-[20px] border border-[#C1C1C1]  bg-[#FFFFFF]">
      <p className="font-600 mt-6 text-[32px] leading-[38px]">
        Create your Account
      </p>
      <form
        className="mt-4 flex flex-col gap-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-1">
          <label className="font-400 text-[16px] leading-[19px]">Name</label>
          <input
            type="text"
            placeholder="Enter"
            className="w-[456px] rounded-[6px] border border-[#C1C1C1] px-2 py-2 text-[16px] leading-[19px] text-[#848484] outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-400 text-[16px] leading-[19px]">Email</label>
          <input
            type="text"
            placeholder="Enter"
            className="w-[456px] rounded-[6px] border border-[#C1C1C1] px-2 py-2 text-[16px] leading-[19px] text-[#848484] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-400 text-[16px] leading-[19px]">
            Password
          </label>
          <input
            type="text"
            placeholder="Enter"
            className="w-[456px] rounded-[6px] border border-[#C1C1C1] px-2 py-2 text-[16px] leading-[19px] text-[#848484] outline-none"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-[456px] cursor-pointer rounded-[6px] border bg-black px-[74px] py-[9px] text-white hover:bg-gray-600"
        >
          CREATE ACCOUNT
        </button>
      </form>
      <p className="font-400 mt-12 text-[16px] leading-[19px]">
        Have an Account?{" "}
        <Link href="/login">
          <span className="font-[500]">LOGIN</span>
        </Link>
      </p>
    </div>
  );
}
