import { GearUpSectionProductsMen, GearUpSectionProductsWomen, smallBreakPoints } from "@/data";
import ProductSwiper from "../ProductSwiper";


export default function GearUpSection() {
    return (
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto">

            <div className="flex-shrink-0 w-full md:w-[48%] lg:w-[48%] mx-auto">
                <ProductSwiper
                    products={ GearUpSectionProductsMen }
                    shopLink="/"
                    shopTitle="Shop Men's"
                    mainTitle=""
                    breakPoints={ smallBreakPoints }
                />
            </div>

            <div className="flex-shrink-0 w-full sm:w-[48%] lg:w-[48%] mx-auto">
                <ProductSwiper
                    products={ GearUpSectionProductsWomen }
                    shopLink="/"
                    shopTitle="Shop Women's"
                    mainTitle=""
                    breakPoints={ smallBreakPoints }
                />
            </div>

        </div>
    );
}
