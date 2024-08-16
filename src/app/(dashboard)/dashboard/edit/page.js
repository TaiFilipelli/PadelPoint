import { Montserrat } from "next/font/google";

const mont = Montserrat({subsets:['latin'],weight:'600'});

export default function Page() {
    return (
        <section className="flex items-center flex-col">
            <h1 className={`${mont.className} text-3xl my-2`}>Menú de edición</h1>
        </section>
    );
}