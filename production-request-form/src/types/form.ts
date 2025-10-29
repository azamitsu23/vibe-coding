export type PageType =
  | 'LP（CTA：LINE友達登録）'
  | 'LP（CTA：フォーム・シュミレータ遷移）'
  | 'LP（CTA：Lステップ連動フォーム遷移）'
  | 'LP（CTA：URL直接指定）'
  | 'LP（自社管理画面での計測不要ページ）'
  | 'フォーム（CTA：自社管理画面にデータ登録）'
  | 'フォーム（CTA：LINE友達登録 & Lステップにデータ登録）'
  | 'その他・新仕様ページ'

export type WorkType = '新規作成' | '移管' | '上書き修正'

export type LStepDataType = '友達情報' | 'タグ情報'

export interface URLGroup {
  id: string
  targetUrl: string
  newUrl: string
}

export interface FormData {
  // Requester Info
  requesterName: string
  email: string

  // Request Details
  pageType: PageType | ''
  workType: WorkType | ''
  urlGroups: URLGroup[]
  details: string
  referenceInfo: string

  // Meta Info
  useDefault: boolean
  titleTag: string
  descriptionTag: string

  // L-Step Info (conditional)
  lStepDataType: LStepDataType | ''
  lStepCreationStatus: boolean
  lStepFolderName: string
  lStepRouteName: string
  managementScreenUrl: string
  managementCodeName: string
  lStepAccountName: string
  managementDomainName: string
}

export const initialFormData: FormData = {
  requesterName: '',
  email: '',
  pageType: '',
  workType: '',
  urlGroups: [{ id: '1', targetUrl: '', newUrl: '' }],
  details: '',
  referenceInfo: '',
  useDefault: false,
  titleTag: '',
  descriptionTag: '',
  lStepDataType: '',
  lStepCreationStatus: false,
  lStepFolderName: '',
  lStepRouteName: '',
  managementScreenUrl: '',
  managementCodeName: '',
  lStepAccountName: '',
  managementDomainName: '',
}
