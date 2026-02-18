import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about 991Collective.",
};

export default function AboutPage() {
  return (
    <section className="bg-black">
      <div className="container py-24">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">About 991Collective</h1>
          <p className="text-white/75">
            991Collective is an independent multigenre label from Sao Paulo, Brazil, focused on artist
            development and consistent releases.
          </p>
          <p className="text-white/75">
            We evaluate demos continuously and prioritize tracks with strong identity, good production quality,
            and release potential aligned with the label direction.
          </p>
          <div>
            <Link
              href="/submit"
              className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-medium text-black hover:bg-white/90"
            >
              Submit Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
