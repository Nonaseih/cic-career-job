import { FadeUp } from '@/components/Animate'

/**
 * Marketing hero band shown above the registration form.
 *
 * The portrait on the right is a single swappable asset at
 * `public/register-hero.jpg` — drop in the preferred work-clothes photo at the
 * same path (portrait orientation, ~3:4) to replace the seeded advisor photo.
 */
export default function RegisterHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-warm)] border-b border-[var(--color-line)]">
      {/* soft brand glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-red)]/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">

          {/* Left — copy */}
          <div className="text-center md:text-left">
            <FadeUp>
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[var(--color-red)] bg-white border border-[var(--color-line)] rounded-full px-3.5 py-1.5">
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
                    className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] bg-white border border-[var(--color-line)] rounded-full px-3.5 py-1.5"
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

          {/* Right — portrait */}
          <FadeUp delay={0.2} className="hidden md:block">
            <div className="relative w-56 lg:w-64">
              <div className="absolute -inset-3 rounded-3xl bg-[var(--color-red)]/8" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--color-line)] shadow-[0_12px_40px_rgba(20,16,8,0.12)] bg-white">
                <img
                  src="/register-hero.jpg"
                  alt="建設業界専門のキャリアアドバイザー"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
