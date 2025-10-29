import type { PageType, WorkType, LStepDataType } from '@/types/form'

export const PAGE_TYPE_OPTIONS: { value: PageType; label: PageType }[] = [
  { value: 'LP（CTA：LINE友達登録）', label: 'LP（CTA：LINE友達登録）' },
  { value: 'LP（CTA：フォーム・シュミレータ遷移）', label: 'LP（CTA：フォーム・シュミレータ遷移）' },
  { value: 'LP（CTA：Lステップ連動フォーム遷移）', label: 'LP（CTA：Lステップ連動フォーム遷移）' },
  { value: 'LP（CTA：URL直接指定）', label: 'LP（CTA：URL直接指定）' },
  { value: 'LP（自社管理画面での計測不要ページ）', label: 'LP（自社管理画面での計測不要ページ）' },
  { value: 'フォーム（CTA：自社管理画面にデータ登録）', label: 'フォーム（CTA：自社管理画面にデータ登録）' },
  { value: 'フォーム（CTA：LINE友達登録 & Lステップにデータ登録）', label: 'フォーム（CTA：LINE友達登録 & Lステップにデータ登録）' },
  { value: 'その他・新仕様ページ', label: 'その他・新仕様ページ' },
]

export const WORK_TYPE_OPTIONS: { value: WorkType; label: WorkType }[] = [
  { value: '新規作成', label: '新規作成' },
  { value: '移管', label: '移管' },
  { value: '上書き修正', label: '上書き修正' },
]

export const LSTEP_DATA_TYPE_OPTIONS: { value: LStepDataType; label: LStepDataType }[] = [
  { value: '友達情報', label: '友達情報' },
  { value: 'タグ情報', label: 'タグ情報' },
]

export const shouldShowLStepSection = (pageType: string): boolean => {
  return pageType.includes('Lステップ')
}

export const shouldShowNewUrlField = (workType: string): boolean => {
  return workType === '移管'
}

// Meta tag character limits (recommended for SEO)
export const META_LIMITS = {
  title: {
    min: 30,
    max: 60,
  },
  description: {
    min: 80,
    max: 160,
  },
} as const

export const getCharacterCountStatus = (
  length: number,
  max: number
): 'valid' | 'error' => {
  if (length > max) return 'error'
  return 'valid'
}
