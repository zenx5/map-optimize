

export default function Title({ title, description }: { title: string, description: string }) {
    return <div className="max-w-xl mx-auto">
        <h1 className="text-4xl text-center py-2">{title}</h1>
        <p className="text-center">{description}</p>
    </div>
}