import { Link } from 'react-router';

export default function Home() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-triton-navy text-4xl font-bold">Find housing with verified Tritons</h1>
      <p className="mx-auto mt-4 max-w-xl text-gray-600">
        Subleases and roommate matching, only for verified UCSD students. No anonymous bad actors.
      </p>
      <Link
        to="/listings"
        className="bg-triton-blue mt-8 inline-block rounded-lg px-6 py-3 font-semibold text-white"
      >
        Browse subleases
      </Link>
    </section>
  );
}
