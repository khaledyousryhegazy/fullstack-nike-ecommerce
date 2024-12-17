import Image from "next/image";
import Link from "next/link";

import essential1 from "@/assets/images/men.png"
import essential2 from "@/assets/images/women.png"
import essential3 from "@/assets/images/kids.png"

export default function Essentials() {
    return (
        <div className="my-10">
            <h1 className="font-semibold mb-7">The Essentials</h1>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                <div className="relative flex justify-center">
                    <Image src={ essential1 } className="" alt="" />

                    <Link href={ `/` } className='absolute bottom-7 left-7 px-6 py-2 text-black bg-white rounded-full text-sm font-semibold '>
                        Shop
                    </Link>
                </div>

                <div className="relative flex justify-center">
                    <Image src={ essential2 } className="" alt="" />

                    <Link href={ `/` } className='absolute bottom-7 left-7 px-6 py-2 text-black bg-white rounded-full text-sm font-semibold '>
                        Shop
                    </Link>
                </div>

                <div className="relative flex justify-center">
                    <Image src={ essential3 } className="" alt="" />

                    <Link href={ `/` } className='absolute bottom-7 left-7 px-6 py-2 text-black bg-white rounded-full text-sm font-semibold '>
                        Shop
                    </Link>
                </div>
            </div>
        </div>
    )
}
