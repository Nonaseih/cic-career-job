import Image from 'next/image'

/**
 * Registration hero: construction-site background photo + a thick light overlay
 * for legibility, with the transparent worker cutout (t-hero.png) placed next
 * to the headline. The cutout has no background, so it can sit anywhere without
 * a hard edge. The 1536×1024 PNG is served through next/image so it's delivered
 * as an optimized, right-sized webp instead of the raw ~2.3MB file.
 */
export default function RegisterHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      {/* Construction-site background */}
      <img
        src="/hero-back.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Thick light overlay so the headline reads clearly over the photo */}
      <div className="absolute inset-0 bg-white/75" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <div className="relative h-72 sm:h-80 md:h-96 flex items-center">
          {/* Headline */}
          <h1 className="relative z-10 font-display font-black leading-[1.22] text-[clamp(1.6rem,4.8vw,2.9rem)] text-[var(--color-ink)]">
            <span className="text-[var(--color-red)]">建設業専門</span>の<br />
            キャリアアドバイザーが<br />
            徹底サポート！
          </h1>

          {/* Worker cutout — transparent, stands at the bottom close to the text */}
          <div className="absolute inset-y-0 right-0 w-[58%] sm:w-[52%] md:w-[48%]">
            <Image
              src="/t-hero.png"
              alt="建設業専門のキャリアアドバイザー"
              fill
              priority
              sizes="(max-width: 768px) 58vw, 620px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
