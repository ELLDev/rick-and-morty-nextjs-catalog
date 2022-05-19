import Image from "next/image";
import Link from "next/link";
import { ArrowUDownRight } from "phosphor-react";

export default function Custom404() {
  return (
    <div className="flex flex-1 justify-start items-center flex-col gap-10 mx-4 md:mx-8 md:gap-14">
      <div>
        <h1 className="text-center font-Roboto font-bold text-8xl py-8 text-stone-800 drop-shadow-3d md:text-9xl md:py-10 2xl:text-[10vw]">
          404
        </h1>
        <p className="text-center font-Roboto text-lg md:text-3xl lg:max-w-xl 2xl:text-4xl 2xl:max-w-[50vw]">
          Relax Morty, this is the 404th dimension.
          <br /> There is nothing here. By the time they know this, we&apos;ll
          be long gone...
        </p>
      </div>

      <div className="min-w-full lg:min-w-[35vw]">
        <Image
          src="/images/404.png"
          alt="rick and morty"
          className="saturate-125"
          layout="responsive"
          width={800}
          height={663}
        />
      </div>

      <Link href={"/"}>
        <a className="w-full py-3 mb-3 text-xl flex font-Roboto bg-[#08BAE3] rounded-full border-transparent flex-1 justify-center items-center hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-rose-500 transition-colors md:py-5 2xl:p-8 md:text-2xl lg:w-[35vw] lg:mx-0 lg:py-3 2xl:py-4 2xl:text-3xl 2xl:mb-6">
          <button className="text-white w-full ml-11 md:ml-16">Back To Catalog</button>
          <ArrowUDownRight
            className="w-8 h-8 mr-5 md:w-10 md:h-10 md:mr-8 2xl:w-12 2xl:h-12 2xl:mr-1"
            color="#ffffff"
            weight="bold"
          />
        </a>
      </Link>
    </div>
  );
}
