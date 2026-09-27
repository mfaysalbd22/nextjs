import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-black">404</h1>

      <p className="mt-4 text-white/60">
        Workout not found.
      </p>

      <Link
        href="/"
        className="mt-6 bg-[#ccff00] px-6 py-3 font-bold text-black"
      >
        GO TO WORKOUTS
      </Link>
    </main>
  );
}