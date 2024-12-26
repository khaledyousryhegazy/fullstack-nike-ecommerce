import ProductDetails from "@/components/ProductDetails"

export default async function Page( {
    params,
}: {
    params: Promise<{ _id: string }>
} ) {
    const _id = ( await params )._id

    return <ProductDetails _id={ _id } />
}
