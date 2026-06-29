'use client'

// Fixed pickup teasers supplied by the client. Intentionally static and without
// company names — these show pre-login, where real company names must stay
// hidden. Purely decorative: non-clickable, auto-scrolling hook for sign-ups.
const PICKUP = [
  { copy: '年間休日125日の完全週休2日制！',           category: '建築施工管理',     role: 'S・RC・SRC造の新築公共および民間工事の現場管理', salary: '800万円以上' },
  { copy: '完全週休2日制＋フレックス勤務！',            category: '管工事施工管理',   role: 'プラント設備におけるプロジェクトマネジメント補佐', salary: '800万円以上' },
  { copy: '現場常駐なし・本社勤務の超ホワイトな働き方！', category: '電気工事施工管理', role: '分譲マンション設備の施工管理',                 salary: '600～900万円' },
  { copy: '中途転職での年収UP額は平均220万円！',        category: '土木施工管理',     role: '海洋土木プロジェクトの現場管理',               salary: '650万円以上' },
  { copy: '現年収以上の支給を必ず保証！',              category: '管工事施工管理',   role: '空調・衛生設備の施工管理全般',                 salary: '700万円以上' },
  { copy: '東京営業所立ち上げコアメンバー募集！',        category: '建築施工管理',     role: '東京都内の新築案件を中心とした工程・品質管理',   salary: '700万円以上' },
  { copy: '賞与実績7.0ヶ月分＆資格手当最大月9万円！',   category: '電気工事施工管理', role: '公共施設やオフィスビル等の設備施工管理',       salary: '550～750万円' },
  { copy: '発注者側×内勤メイン！',                    category: '土木施工管理',     role: 'NEXCO事務所内での受注者の管理・監督・積算・図面修正', salary: '540～720万円' },
  { copy: '転勤なし・直行直帰・エキスパート枠での募集',   category: '電気通信工事施工管理', role: '都内近郊大型商業施設等の新築プロジェクトが主舞台', salary: '730～1000万円' },
]

export default function PickupSlider() {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...PICKUP, ...PICKUP]

  return (
    <section
      aria-label="注目の求人"
      className="relative overflow-hidden bg-[var(--color-bg-warm)] border-b border-[var(--color-line)] py-3"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[var(--color-bg-warm)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[var(--color-bg-warm)] to-transparent" />

      <ul className="flex w-max gap-3 animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((p, i) => (
          <li
            key={i}
            aria-hidden={i >= PICKUP.length}
            className="shrink-0 w-[264px] bg-white border border-[var(--color-line)] rounded-xl px-4 py-3 flex flex-col"
          >
            <p className="text-sm font-bold text-blue-700 leading-snug mb-2 line-clamp-2 min-h-[2.6em]">{p.copy}</p>
            <span className="self-start text-[11px] bg-[var(--color-bg-warm)] text-[var(--color-muted)] px-2 py-0.5 rounded-full mb-1.5">
              {p.category}
            </span>
            <p className="text-xs text-[var(--color-muted)] leading-snug line-clamp-2 min-h-[2.4em] mb-2">{p.role}</p>
            <p className="mt-auto leading-none">
              <span className="text-[11px] text-[var(--color-muted)] mr-1">年収</span>
              <span className="font-latin font-black text-lg text-[var(--color-red)]">{p.salary}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
