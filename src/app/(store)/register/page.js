import { Poppins } from "next/font/google";

const pop = Poppins({subsets:["latin"], weight:'400'})
export default function Page() {
    return (
        <main className="flex flex-col items-center justify-center text-center p-16">
            <section className="">
                <h1 className={`${pop.className} text-3xl`}>Únete a la familia PadelPoint hoy</h1>
                <form>

                </form>
            </section>
        </main>
    );
}