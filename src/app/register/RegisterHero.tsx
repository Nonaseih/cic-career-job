/**
 * Compact marketing banner above the registration form.
 *
 * Kept deliberately short so the first form field is visible above the fold
 * (CVR). The headline is overlaid on the left of the photo (which has the
 * worker on the right with empty space on the left). Swap the photo at
 * `public/register-hero.jpg` to replace it.
 */
export default function RegisterHero() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-[var(--color-line)]">
      <div className="relative h-72 sm:h-80 md:h-96">
        {/* Whole worker (zoomed out) pinned to the right; left edge faded so the
            sharp cut dissolves into the headline area. */}
        <img
          src="/register-hero.jpg"
          alt="建設業専門のキャリアアドバイザーが徹底サポート"
          className="absolute right-0 top-0 h-full w-auto"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, #000 28%)',
            maskImage: 'linear-gradient(to right, transparent, #000 28%)',
          }}
        />

        {/* Headline — constrained to the content width, left-aligned */}
        <div className="relative h-full max-w-6xl mx-auto flex items-center px-6 sm:px-10">
          <h1 className="font-display font-black leading-[1.22] text-[clamp(1.6rem,4.8vw,2.9rem)] text-[var(--color-ink)]">
            <span className="text-[var(--color-red)]">建設業専門</span>の<br />
            キャリアアドバイザーが<br />
            徹底サポート！
          </h1>
        </div>
      </div>
    </section>
  )
}
