export default function ProfilePage({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div>
            <h1>Profile Page {id}</h1>
        </div>
    )
}