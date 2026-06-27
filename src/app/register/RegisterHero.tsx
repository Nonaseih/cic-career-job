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
      <div className="relative h-52 sm:h-60 md:h-72">
        {/* Full-bleed photo — whole worker shown (zoomed out), anchored right */}
        <img
          src="/register-hero.jpg"
          alt="建設業専門のキャリアアドバイザーが徹底サポート"
          className="absolute inset-0 w-full h-full object-contain object-right"
        />
        {/* Legibility scrim so the headline reads over the photo on small screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent" />

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
