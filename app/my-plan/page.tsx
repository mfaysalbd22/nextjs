"use client";

import { useState } from "react";
import Link from "next/link";





type Workout = {
  id: number;
  name: string;
  image: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  done?: boolean;
};



function getPlan() {
  if (typeof window === "undefined") {
    return [];
  }

  const savedPlan = localStorage.getItem("fitlog-plan");

  return savedPlan ? JSON.parse(savedPlan) : [];
}

function getSaved() {
  if (typeof window === "undefined") {
    return [];
  }

  const savedWorkouts = localStorage.getItem("fitlog-saved");

  return savedWorkouts ? JSON.parse(savedWorkouts) : [];
}

export default function MyPlan() {
  const [plan, setPlan] = useState<Workout[]>(getPlan);
  const [saved, setSaved] = useState<Workout[]>(getSaved);
  const [activeTab, setActiveTab] = useState("plan");

  const workouts = activeTab === "plan" ? plan : saved;


  function markAsDone(id: number) {
  const updatedPlan = plan.map((workout) =>
    workout.id === id
      ? { ...workout, done: true }
      : workout
  );

  setPlan(updatedPlan);
  localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));
}

function removeWorkout(id: number) {
  const updatedPlan = plan.filter((workout) => workout.id !== id);

  setPlan(updatedPlan);
  localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));
}


  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="px-6 py-12">

      {/* Page heading */}
      <h1 className="text-5xl font-black">
        MY PLAN
      </h1>

      <p className="mt-3 text-white/60">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">

        <div className="border border-white/10 p-5">
          <p className="text-sm text-white/50">
            EXERCISES
          </p>

          <p className="mt-2 text-3xl font-black">
            {plan.length}
          </p>
        </div>

        <div className="border border-white/10 p-5">
          <p className="text-sm text-white/50">
            MINUTES
          </p>

          <p className="mt-2 text-3xl font-black">
            {totalMinutes}
          </p>
        </div>

        <div className="border border-white/10 p-5">
          <p className="text-sm text-white/50">
            CALORIES
          </p>

          <p className="mt-2 text-3xl font-black">
            {totalCalories}
          </p>
        </div>

      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-6 border-b border-white/10">

        <button
          onClick={() => setActiveTab("plan")}
          className={`pb-3 text-sm font-bold ${
            activeTab === "plan"
              ? "border-b-2 border-[#ccff00] text-[#ccff00]"
              : "text-white/60"
          }`}
        >
          TODAYS PLAN
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-3 text-sm font-bold ${
            activeTab === "saved"
              ? "border-b-2 border-[#ccff00] text-[#ccff00]"
              : "text-white/60"
          }`}
        >
          SAVED
        </button>

      </div>

      {/* Workout cards */}
      {workouts.length > 0 ? (
        <div className="mt-8 space-y-4">

          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex flex-col gap-5 border border-white/10 p-4 md:flex-row md:items-center"
            >

              {/* Workout image */}
              <img
                src={workout.image}
                alt={workout.name}
                className="h-32 w-full object-cover md:w-48"
              />

              {/* Workout information */}
              <div className="flex-1">

                <h2 className="text-xl font-bold">
                  {workout.name}
                </h2>

                <p className="mt-2 text-sm text-white/50">
                  {workout.equipment}
                </p>

                <div className="mt-3 flex gap-4 text-sm text-white/60">
                  <span>
                    ⏱ {workout.duration} min
                  </span>

                  <span>
                    🔥 {workout.caloriesBurned} kcal
                  </span>

                  <span>
                    ★ {workout.rating}
                  </span>
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3">

                <Link
                  href={`/workout/${workout.id}`}
                  className="border border-white/20 px-4 py-2 text-sm font-bold"
                >
                  VIEW DETAILS
                </Link>

                {activeTab === "plan" && (
                 
                 
<button
  onClick={() => markAsDone(workout.id)}
  className="border border-[#ccff00] px-4 py-2 text-sm font-bold"
>
  ✓ MARK AS DONE
</button>
 )}

                <button
  onClick={() => removeWorkout(workout.id)}
  className="px-3 py-2 text-xl">
 ×
</button>
              </div>

            </div>
          ))}

        </div>
      ) : (
        /* Empty state */
        <div className="py-20 text-center">

          <h2 className="text-3xl font-black">
            NOTHING HERE YET
          </h2>

          <p className="mt-3 text-white/60">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block bg-[#ccff00] px-6 py-3 font-bold text-black"
          >
            GO TO WORKOUTS
          </Link>

        </div>
      )}

    </main>
  );
}