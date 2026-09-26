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
  const [message, setMessage] = useState("");

  // Get single workout from API
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

  // Add workout to today's plan
  function addToPlan() {
    if (!workout) return;

    const savedPlan = localStorage.getItem("fitlog-plan");

    const plan = savedPlan ? JSON.parse(savedPlan) : [];

    const alreadyAdded = plan.some(
      (item: Workout) => item.id === workout.id
    );

    if (alreadyAdded) {
      setMessage("Already added to today's plan.");
      return;
    }

    const updatedPlan = [...plan, workout];

    localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));

    setMessage("Added to today's plan.");
  }

  // Save workout for later
  function saveWorkout() {
    if (!workout) return;

    const savedWorkouts = localStorage.getItem("fitlog-saved");

    const saved = savedWorkouts ? JSON.parse(savedWorkouts) : [];

    const alreadySaved = saved.some(
      (item: Workout) => item.id === workout.id
    );

    if (alreadySaved) {
      setMessage("Already saved for later.");
      return;
    }

    const updatedSaved = [...saved, workout];

    localStorage.setItem("fitlog-saved", JSON.stringify(updatedSaved));

    setMessage("Saved for later.");
  }

  // Loading state
  if (loading) {
    return (
      <p className="p-6 text-[#ccff00]">
        Loading workout…
      </p>
    );
  }

  // Workout not found
  if (!workout) {
    return (
      <p className="p-6">
        Workout not found.
      </p>
    );
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

          {/* Muscle group tags */}
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

          {/* Workout name */}
          <h1 className="mt-4 text-4xl font-black">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-4 text-white/60">
            {workout.description}
          </p>

          {/* Workout specifications */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-white/50">
                Equipment
              </p>
              <p className="font-bold">
                {workout.equipment}
              </p>
            </div>

            <div>
              <p className="text-sm text-white/50">
                Difficulty
              </p>
              <p className="font-bold">
                {workout.difficulty}
              </p>
            </div>

            <div>
              <p className="text-sm text-white/50">
                Sets
              </p>
              <p className="font-bold">
                {workout.sets}
              </p>
            </div>

            <div>
              <p className="text-sm text-white/50">
                Reps
              </p>
              <p className="font-bold">
                {workout.reps}
              </p>
            </div>

            <div>
              <p className="text-sm text-white/50">
                Duration
              </p>
              <p className="font-bold">
                {workout.duration} min
              </p>
            </div>

            <div>
              <p className="text-sm text-white/50">
                Calories
              </p>
              <p className="font-bold">
                {workout.caloriesBurned} kcal
              </p>
            </div>

            <div>
              <p className="text-sm text-white/50">
                Rating
              </p>
              <p className="font-bold">
                ★ {workout.rating}
              </p>
            </div>

          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-2xl font-black">
              HOW TO DO IT
            </h2>

            <ol className="mt-4 list-decimal space-y-3 pl-5 text-white/70">
              {workout.instructions.map((instruction, index) => (
                <li key={index}>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">

            <button
              onClick={addToPlan}
              className="bg-[#ccff00] px-5 py-3 font-bold text-black"
            >
              ADD TO TODAYS PLAN
            </button>

            <button
              onClick={saveWorkout}
              className="border border-[#ccff00] px-5 py-3 font-bold"
            >
              SAVE FOR LATER
            </button>

          </div>

          {/* Success / information message */}
          {message && (
            <p className="mt-4 text-sm text-[#ccff00]">
              {message}
            </p>
          )}

        </div>
      </div>
    </main>
  );
}