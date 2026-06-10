// Shared option lists for the registration / profile forms.
// Kept in one place so RegisterForm.tsx and ProfileForm.tsx stay in sync.

export const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

// 希望勤務地のみ「その他」+ 自由入力に対応
export const PREFECTURES_WITH_OTHER = [...PREFECTURES, 'その他']

export const QUALIFICATIONS = [
  '1級建築施工管理技士', '2級建築施工管理技士',
  '1級土木施工管理技士', '2級土木施工管理技士',
  '1級管工事施工管理技士', '2級管工事施工管理技士',
  '1級電気工事施工管理技士', '2級電気工事施工管理技士',
  '1級建設機械施工管理技士', '2級建設機械施工管理技士',
  '1級造園施工管理技士', '2級造園施工管理技士',
  '1級建築士', '2級建築士', '木造建築士', 'その他',
]

// 直近の職種（単一選択）— 既存フォーム（cic-ct.co.jp/career-job/entry）準拠
export const RECENT_JOB_TYPES = [
  '建築施工管理・工事監理者', '建築施工管理(住宅・リフォーム・内装)', '土木施工管理',
  '設備施工管理(空調)', '設備施工管理(給排水設備他)', '電気施工管理', 'プラント施工管理',
  '施工管理補助(アシスタント)', '施工図・設計・CADオペレーター', '工務・積算', '測量',
  '現場作業員(一般作業員)', '職人(大工)', '職人(鉄筋工)', '職人(型枠工)', '職人(左官・塗装など)',
  '重機オペレーター', '営業', '一般事務', 'その他',
]

// 過去の経験職種（複数選択）— 上記 + 経験なし
export const EXPERIENCE_JOB_TYPES = [...RECENT_JOB_TYPES, '建設業における経験はない']

// 希望職種 — 既存フォームの「希望の職種」準拠（求人カテゴリと同一）
export const DESIRED_JOB_TYPES = [
  '建築施工管理', '土木施工管理', '電気施工管理', '管工事施工管理', '設計', '積算', 'その他',
]

export const EXPERIENCE_YEARS = ['1年未満', '1〜3年', '3〜5年', '5〜10年', '10年以上']

export const SALARY_RANGES = [
  '〜300万円', '300〜400万円', '400〜500万円', '500〜600万円',
  '600〜800万円', '800〜1000万円', '1000万円以上',
]

// 現在の登録者の最年長(75歳)に対応するため1950年以降を選択肢に含める
export const BIRTH_YEARS = Array.from({ length: 56 }, (_, i) => 2005 - i)

export const EMPLOYMENT_STATUSES = ['在職中', '離職中', 'その他']

export const RELOCATION_OPTIONS = ['全国転勤OK', '条件つきで転勤OK', '転勤不可']

// Marker value used for "その他" free-text entries
export const OTHER_VALUE = 'その他'

/**
 * Resolve a <select> field that may be "その他" + a companion `${name}_other`
 * free-text input into its final stored value.
 */
export function resolveSelectOther(formData: FormData, name: string): string | null {
  const value = (formData.get(name) as string) || ''
  if (value === OTHER_VALUE) {
    const other = (formData.get(`${name}_other`) as string)?.trim()
    return other || OTHER_VALUE
  }
  return value || null
}

/**
 * Resolve a checkbox-group field that may include "その他" + a companion
 * `${name}_other` free-text input into its final stored array.
 */
export function resolveCheckboxOther(formData: FormData, name: string): string[] {
  const values = formData.getAll(name) as string[]
  if (values.includes(OTHER_VALUE)) {
    const other = (formData.get(`${name}_other`) as string)?.trim()
    if (other) {
      return [...values.filter((v) => v !== OTHER_VALUE), other]
    }
  }
  return values
}
