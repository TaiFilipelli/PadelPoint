import { Poppins } from "next/font/google";

const pop = Poppins({subsets:['latin'], weight:'500'});
export default function Login() {
    return (
        <section className="flex text-center justify-center p-10">
            <h1 className={`${pop.className} text-5xl`}>Bienvenido de vuelta!</h1>
        </section>
    );
}