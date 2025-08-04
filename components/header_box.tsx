export default function HeaderBox({ type, title, subtext, user }: HeaderBoxProps) {
    return (
        <div className="flex">
            <h1 className="text-2xl font-bold text-neutral-900 lg:text-4xl">
                {title}
                {type === 'greeting' &&
                    (<span className="text-2xl font-bold text-blue-500 lg:text-4xl"> {user}</span>)
                }
                <p className="text-xl font-bold lg:text-2xl">{subtext}</p>
            </h1>
        </div>
    )
}