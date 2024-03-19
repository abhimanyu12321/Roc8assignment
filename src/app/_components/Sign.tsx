import Link from "next/link";

export default function Sign() {
  return (
    <div className="flex h-[450px] w-[576px] flex-col items-center rounded-[20px] border border-[#C1C1C1]  bg-[#FFFFFF]">
      <p className="font-600 mt-6 text-[32px] leading-[38px]">Login</p>
      <form className="mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label className="font-400 text-[16px] leading-[19px]">Email</label>
          <input
            type="text"
            placeholder="Enter"
            className="w-[456px] rounded-[6px] border border-[#C1C1C1] px-2 py-2 text-[16px] leading-[19px] text-[#848484] outline-none"
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
          />
        </div>

        <button
          type="submit"
          className="w-[456px] cursor-pointer rounded-[6px] border bg-black px-[74px] py-[9px] text-white hover:bg-gray-600"
        >
          LOGIN
        </button>
      </form>
      <div className="mt-6 h-[1px] w-[456px] bg-[#C1C1C1]"></div>
      <p className="font-400 mt-12 text-[16px] leading-[19px]">
        Don't have an Account?{" "}
        <Link href="/">
          <span className="font-[500]">SIGNUP</span>
        </Link>
      </p>
    </div>
  );
}
