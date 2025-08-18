export default function HeaderBox({ type, title, subtext, user }: HeaderBoxProps) {
    return (
        <div className="flex">
            <h1 className="text-xl font-semibold text-neutral-900 lg:text-4xl">
                {title}
                {type === 'greeting' &&
                    (<span className="text-xl font-bold text-blue-500 lg:text-4xl"> {user}</span>)
                }
                <p className="text-ml text-neutral-700 lg:text-xl">{subtext}</p>
            </h1>
        </div>
    )
}