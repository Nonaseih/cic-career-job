import { FadeUp } from '@/components/Animate'

/**
 * Marketing hero band shown above the registration form.
 *
 * The photo is a single swappable asset at `public/register-hero.jpg`.
 * The layout is tuned for a LANDSCAPE shot of a worker on the right with empty
 * space on the left (the client-supplied 作業服 photo): the figure bleeds in
 * from the right and the left edge fades into the panel, so a white-background
 * photo blends seamlessly. Swap the file at the same path to replace it.
 */
export default function RegisterHero() {
  const fade = {
    WebkitMaskImage: 'linear-gradient(to right, transparent, #000 32%)',
    maskImage: 'linear-gradient(to right, transparent, #000 32%)',
  }

  return (
    <section className="relative overflow-hidden bg-white border-b border-[var(--color-line)]">
      {/* soft brand glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[var(--color-red)]/5 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-[var(--color-bg-warm)]" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-8 md:gap-6 items-center">

          {/* Left — copy */}
          <div className="text-center md:text-left">
            <FadeUp>
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[var(--color-red)] bg-[var(--color-bg-warm)] border border-[var(--color-line)] rounded-full px-3.5 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] inline-block" />
                建設キャリア転職
              </p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1 className="mt-5 font-display font-black leading-[1.18] text-[clamp(1.9rem,4.5vw,3.1rem)] text-[var(--color-ink)]">
                建設業専門の
                <br className="hidden sm:block" />
                <span className="text-[var(--color-red)]">キャリアアドバイザー</span>が
                <br className="hidden sm:block" />
                徹底サポート！
              </h1>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-5 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-md mx-auto md:mx-0">
                施工管理・建設技術者のための転職支援。
                ご登録後、専任アドバイザーが求人紹介から入社後まで無料でサポートします。
              </p>
            </FadeUp>

            {/* Trust chips */}
            <FadeUp delay={0.24}>
              <ul className="mt-7 flex flex-wrap justify-center md:justify-start gap-2.5">
                {['登録は1分・完全無料', '非公開求人も多数', '入社後もフォロー'].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-bg-warm)] border border-[var(--color-line)] rounded-full px-3.5 py-1.5"
                  >
                    <svg className="w-4 h-4 text-[var(--color-red)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Right — work-clothes photo (desktop: bleeds in from the right) */}
          <FadeUp delay={0.2} className="hidden md:block self-stretch">
            <div className="relative h-full min-h-[330px]">
              <img
                src="/register-hero.jpg"
                alt="作業服姿の建設技術者"
                className="absolute inset-0 w-full h-full object-contain object-right-bottom"
                style={fade}
              />
            </div>
          </FadeUp>

          {/* Mobile photo — full-width below the copy */}
          <FadeUp delay={0.2} className="md:hidden">
            <img
              src="/register-hero.jpg"
              alt="作業服姿の建設技術者"
              className="w-full h-auto max-h-72 object-contain object-bottom"
            />
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
