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
      <div className="relative max-w-6xl mx-auto h-40 sm:h-48 md:h-56">
        {/* Photo — worker anchored to the right */}
        <img
          src="/register-hero.jpg"
          alt="建設業専門のキャリアアドバイザーが徹底サポート"
          className="absolute inset-0 w-full h-full object-cover object-[88%_18%]"
        />
        {/* Legibility scrim so the headline reads over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />

        {/* Headline */}
        <div className="relative h-full flex items-center px-6 sm:px-10">
          <h1 className="font-display font-black leading-[1.22] text-[clamp(1.4rem,4.4vw,2.5rem)] text-[var(--color-ink)]">
            <span className="text-[var(--color-red)]">建設業専門</span>の<br />
            キャリアアドバイザーが<br />
            徹底サポート！
          </h1>
        </div>
      </div>
    </section>
  )
}
