import Image from "next/image";
import miss from "@/assets/images/miss.png"
import MainButton from "../MainButton";

export default function DontMiss() {
    return (
        <div className="my-10">
            <h1 className="font-semibold mb-7">Don&apos;t Miss</h1>

            <Image src={ miss } className="w-full" alt="" />

            <div className="my-10 flex justify-center items-center flex-col gap-5">
                <h1 className="text-3xl font-bold uppercase">FLIGHT ESSENTIALS</h1>
                <p className="max-w-[600px]">Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.</p>
                <div className="flex gap-3 items-center">
                    <MainButton text="Shop" />
                </div>
            </div>
        </div>
    )
}
