export default function ProfilePage() {
    return (
        <section className="p-16 flex flex-wrap flex-row text-black w-full">
            <div className="w-1/2">
                <h1 className="font-bold text-xl my-4">Nombre:</h1>
                <h2 className="font-semibold text-lg my-4">Nombre de usuario:@</h2>
            </div>
            <div className="w-1/2">
                <h1 className="font-bold text-xl my-4">Correo electrónico:</h1>
                <h2 className="font-semibold text-lg my-4"></h2>
            </div>
        </section>
    );
}