import Image from "next/image"
import style from "./footer.module.css"
import facebook from "@/assets/icons/facebook.png"
import youtube from "@/assets/icons/youtube.png"
import instagram from "@/assets/icons/instagram.png"
import Link from "next/link"

export default function Footer() {
    return (
        <div className="mt-20 bg-black py-10">
            <div className="container flex flex-col-reverse md:flex-row gap-10 justify-between text-white">
                {/* main links */ }
                <div className={ `${ style.mainLinks } flex flex-col md:flex-row gap-14 items-center` }>
                    <ul>
                        <li>Find Store</li>
                        <li>Become A Member</li>
                        <li>Sign Up For Email</li>
                        <li>Send Us Feedback</li>
                        <li>Discount For Students</li>
                    </ul>

                    <ul>
                        <li>Order Status</li>
                        <li>Delivery</li>
                        <li>Returns</li>
                        <li>Payment Options</li>
                        <li>Contact Us</li>
                    </ul>

                    <ul>
                        <li>News</li>
                        <li>Careers</li>
                        <li>Investors</li>
                        <li>Payment Options</li>
                        <li>Sustainability</li>
                    </ul>
                </div>

                <div className="flex gap-10 justify-center items-start">
                    <Image src={ facebook } alt="facebook" />
                    <Image src={ youtube } alt="facebook" />
                    <Image src={ instagram } alt="facebook" />
                </div>
            </div>

            {/* copy right */ }
            <div className="text-white text-center -mb-5 mt-20 uppercase text-sm">
                @2024 made by <Link target="_blank" href={ 'https://www.linkedin.com/in/khaled-yousry-a35b15234/' } className="text-blue-600 font-semibold">khaled yousry</Link>
            </div>
        </div>
    )
}
