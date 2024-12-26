import Image from "next/image";
import hero from "@/assets/images/heroSection.svg";
import MainButton from "../MainButton";

export default function HeroSection() {
    return (
        <div>
            <div className="w-full h-full">
                <Image priority src={ hero } className=" w-full" alt="Nike" />
            </div>

            <div className="my-10 flex justify-center items-center flex-col gap-5">
                <span className="font-semibold uppercase text-sm">First Look</span>
                <h1 className="text-3xl font-bold uppercase">Nike Air Max Pulse</h1>
                <p className="max-w-[600px]">Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse <br /> — designed to push you past your limits and help you go to the max.</p>
                <div className="flex gap-3 items-center">
                    <MainButton text="Notify Me" />
                    <MainButton text="Shop Air Max" />
                </div>
            </div>
        </div>
    )
}
