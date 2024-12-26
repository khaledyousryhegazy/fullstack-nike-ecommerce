import Link from 'next/link'

interface Params {
    text: string,
    path?: string
}

export default function MainButton( { text, path }: Params ) {
    return (

        <Link href={ `/${ path || '' }` } className='px-6 py-2 text-white bg-black rounded-full text-sm font-semibold shadow-md shadow-[#0000007a] hover:shadow-none'>
            { text }
        </Link>

    );
}
