"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

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

export default function WorkoutDetail() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        const data = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error("Failed to load workout:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-[#ccff00]">Loading workout…</p>;
  }

  if (!workout) {
    return <p className="p-6">Workout not found.</p>;
  }

  return (
    <main className="px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left side: workout image */}
        <div>
          <Image
            src={workout.image}
            alt={workout.name}
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side: workout information */}
        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-4xl font-black">
            {workout.name}
          </h1>

          <p className="mt-4 text-white/60">
            {workout.description}
          </p>

          {/* Workout specifications */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/50">Equipment</p>
              <p className="font-bold">{workout.equipment}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">Difficulty</p>
              <p className="font-bold">{workout.difficulty}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">Sets</p>
              <p className="font-bold">{workout.sets}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">Reps</p>
              <p className="font-bold">{workout.reps}</p>
            </div>

            <div>
              <p className="text-sm text-white/50">Duration</p>
              <p className="font-bold">{workout.duration} min</p>
            </div>

            <div>
              <p className="text-sm text-white/50">Calories</p>
              <p className="font-bold">{workout.caloriesBurned} kcal</p>
            </div>

            <div>
              <p className="text-sm text-white/50">Rating</p>
              <p className="font-bold">★ {workout.rating}</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-2xl font-black">HOW TO DO IT</h2>

            <ol className="mt-4 list-decimal space-y-3 pl-5 text-white/70">
              {workout.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-[#ccff00] px-5 py-3 font-bold text-black">
              ADD TO TODAYS PLAN
            </button>

            <button className="border border-[#ccff00] px-5 py-3 font-bold">
              SAVE FOR LATER
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}