/**
 * Registration hero — the original, un-processed studio photo of the worker
 * (register-hero.jpg). The client found the background-removed cutout's face
 * unnatural, so this uses the natural photo: it fills the banner (its light
 * studio background becomes the banner background), with the worker anchored
 * right and a left scrim so the headline stays readable.
 */
export default function RegisterHero() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-[var(--color-line)]">
      <div className="relative h-64 sm:h-72 md:h-80">
        <img
          src="/register-hero.jpg"
          alt="建設業専門のキャリアアドバイザー"
          className="absolute inset-0 w-full h-full object-cover object-[80%_22%]"
        />
        {/* Left scrim so the headline reads over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />

        {/* Headline — constrained to the content width */}
        <div className="relative h-full max-w-6xl mx-auto flex items-center px-6 sm:px-10">
          <h1 className="relative z-10 font-display font-black leading-[1.2] text-[clamp(1.7rem,5vw,3rem)] text-[var(--color-ink)]">
            <span className="text-[var(--color-red)]">建設業専門</span>の<br />
            キャリアアドバイザーが<br />
            徹底サポート！
          </h1>
        </div>
      </div>
    </section>
  )
}
