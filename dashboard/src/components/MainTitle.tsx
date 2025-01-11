export default function MainTitle( { text }: { text: string } ) {
    return (
        <div className="relative">
            <h1 className="text-2xl font-semibold uppercase relative after:content-[''] after:block after:h-[2px] after:w-1/2 after:bg-[#0a0a0a]  after:dark:bg-[#fafafa] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2">
                { text }
            </h1>
        </div>
    );
}