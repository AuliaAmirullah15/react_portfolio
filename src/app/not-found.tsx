import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Reached by an unknown /projects/<id> (dynamicParams is false, so those 404
// rather than rendering an empty case study) and by any other bad URL. Without
// this file Next serves its unstyled default, which is jarring enough to read as
// a broken site rather than a wrong address.

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 py-32 sm:px-8 lg:px-12"
      >
        <div className="ed-grid">
          <div>
            <p className="t-label text-navy-700">Error 404</p>
          </div>
          <div>
            <h1 className="t-title text-ink-950">That page isn&apos;t here.</h1>
            <p className="mt-6 max-w-xl leading-relaxed text-ink-600">
              The address may be mistyped, or the page may have moved.
              Everything that does exist is one link away.
            </p>
            <Link
              href="/"
              className="t-label-lg group mt-10 inline-flex items-center gap-2.5 text-navy-700 transition-colors hover:text-ink-950 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to the home page
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
