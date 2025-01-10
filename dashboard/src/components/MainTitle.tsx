export default function MainTitle( { text }: { text: string } ) {
    return (
        <div className="relative">
            <h1 className="text-2xl font-semibold uppercase relative after:content-[''] after:block after:h-full after:w-[3px] after:bg-[#0a0a0a]  after:dark:bg-[#fafafa] after:absolute after:top-0 after:-right-3">
                { text }
            </h1>
        </div>
    );
}