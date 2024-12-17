import Image from "next/image";
import featured from "@/assets/images/featured.png"
import MainButton from "../MainButton";

export default function FeaturedSection() {
    return (
        <div className="my-10">
            <h1 className="font-semibold mb-7">Featured</h1>

            <Image src={ featured } className="w-full" alt="" />

            <div className="my-10 flex justify-center items-center flex-col gap-5">
                <h1 className="text-3xl font-bold uppercase">STEP INTO WHAT FEELS GOOD</h1>
                <p className="max-w-[600px]">Cause everyone should know the feeling of running in that perfect pair.</p>
                <div className="flex gap-3 items-center">
                    <MainButton text="Find Your Shoe" />
                </div>
            </div>
        </div>
    )
}
