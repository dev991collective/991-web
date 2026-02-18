import Link from "next/link";

export default function NotFound() {
    return (
        <section className="bg-black">
            <div className="container py-24">
                <h1 className="text-2xl text-white font-semibold">Artist not found</h1>
                <p className="text-white/70 mt-2">Esse artista não existe (ou ainda não foi publicado).</p>
                <Link href="/artists" className="inline-block mt-6 text-white/80 hover:text-white">
                    ← Back to artists
                </Link>
            </div>
        </section>
    );
}
