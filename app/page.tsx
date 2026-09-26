"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: number;
  rating: number;
  description: string;
  instructions: string[];
};

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");


  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);




  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return a.duration - b.duration;
  });

  

  

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-5xl font-black leading-tight">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="mt-6 text-white/60">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into todays plan, and watch the weeks work add up.
            </p>

            <a
              href="#library"
              className="mt-8 inline-block bg-[#ccff00] px-6 py-3 font-bold text-black"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          <div>
            <img
  src="/banner.png"
  alt="Workout"
  className="h-full w-full object-cover"
/>
          </div>
        </div>
      </section>

      {/* Library */}
      <section id="library" className="px-6 py-16">
        <h2 className="text-4xl font-black">THE LIBRARY</h2>

        <p className="mt-3 text-white/60">
          Twelve lifts covering every major muscle group.
        </p>

{/* sort by banano */}
<div className="mt-6">
  <label className="mr-3 text-sm font-bold">
    Sort By:
  </label>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="border border-white/20 bg-black px-4 py-2 text-sm"
  >
    <option value="duration">Duration</option>
    <option value="calories">Calories</option>
    <option value="rating">Rating</option>
  </select>
</div>


        {loading ? (
          <p className="mt-10 text-[#ccff00]">Loading workouts…</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
{sortedWorkouts.map((workout) => (
  <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="overflow-hidden border border-white/10"
              >
               <img
  src={workout.image}
  alt={workout.name}
  className="h-56 w-full object-cover"
/>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full bg-[#ccff00] px-2 py-1 text-xs font-bold text-black"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 text-xl font-bold">
                    {workout.name}
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    {workout.equipment}
                  </p>

                  <div className="mt-4 flex gap-4 text-sm text-white/60">
                    <span>⏱ {workout.duration} min</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span>★ {workout.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// import Image from "next/image";
// import Navbar from "./components/navbar";

// export default function Home(){
//   return(
// <main>
//       <Navbar/>


//       <section className="px-6 py-16">
//         <div className="grid item-center gap-10 md:grid-cols-2">
//   {/* herosec */}


//           <div>
//             <p className="mb-4 text-sm font-bold text-[#ccff00]">Workout library
//             </p>
//             <h1 className="text-5xl font-black leading-tight">
//                 TRAIN WITH INTENT. LOG EVERY SET.
//             </h1>
//             <p className="mt-6 text-white/60">
//               FitLog is a dark, no-nonsense gym companion: pick a lift,
//               lock it into todays plan, and watch the weeks work add up.</p>
//             <a href="#library"
//             className="mt-8 inline-block bg-[#ccff00] px-6 py-3 font-bold text-black">
//               BROWS WORKOUTS
//             </a>
//           </div>
          
//           <div>
//               <Image
//         src="/banner.png"
//         alt="Workout"
//         width={800}
//         height={600}
//         className="h-full w-full object-cover"/>
//           </div>
//         </div>
//       </section>

//       <section id="library" className="px-6 py-16">

//           <h2 className="text-4xl font-black">
//             THE LIBRARY
//         </h2>
//         <p className="mt-3 text-white/60">
//           Twelve lifts covering every major muscle group.
//         </p>
//       </section>




//      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//   {/* Workout Card */}
//   <div className="overflow-hidden border border-white/10">
//     <div className="h-56 bg-white/10">
//       {/* পরে API image আসবে */}
//     </div>

//     <div className="p-5">
//       <p className="text-xs font-bold text-[#ccff00]">
//         CHEST
//       </p>

//       <h3 className="mt-2 text-xl font-bold">
//         Bench Press
//       </h3>

//       <p className="mt-2 text-sm text-white/60">
//         Barbell
//       </p>

//       <div className="mt-4 flex gap-4 text-sm text-white/60">
//         <span>30 min</span>
//         <span>250 kcal</span>
//         <span>4.8 ★</span>
//       </div>
//     </div>
//   </div>
// </div>


//   </main>
//   );
// }





















// // import Image from "nex
// // t/image";

// // export default function Home() {
// //   return (
// //     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
// //         <Image
// //           className="dark:invert h-5 w-[100px]"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={100}
// //           height={20}
// //           priority
// //         />
// //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
// //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
// //             To get started, edit the{" "}
// //             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
// //               page.tsx
// //             </code>{" "}
// //             file.
// //           </h1>
// //           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
// //             Looking for a starting point or more instructions? Head over to{" "}
// //             <a
// //               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Templates
// //             </a>{" "}
// //             or the{" "}
// //             <a
// //               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Learning
// //             </a>{" "}
// //             center.
// //           </p>
// //         </div>
// //         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
// //           <a
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert h-[14px] w-4"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={16}
// //               height={14}
// //             />
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
