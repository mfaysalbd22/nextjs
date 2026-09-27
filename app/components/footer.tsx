



export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 px-6 py-8">
<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">        
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog logo"
            className="h-7 w-7"
          />
          <span className="text-xl font-black">
            FITLOG
          </span>
        </div>

        <p className="text-sm text-white/50">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}