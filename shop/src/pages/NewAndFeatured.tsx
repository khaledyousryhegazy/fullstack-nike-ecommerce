import DataShowing from "@/components/new-featured/DataShowing";
import Filtration from "@/components/new-featured/Filtration";

export default function NewAndFeatured() {
    return (
        <div className="container ">
            <div className="py-10 flex flex-col md:flex-row  gap-5">
                <div className="flex-[0.25] min-w-[130px] bg-gray-100">
                    <Filtration />
                </div>
                <div className="flex-1">
                    <DataShowing />
                </div>
            </div>
        </div>
    )
}
