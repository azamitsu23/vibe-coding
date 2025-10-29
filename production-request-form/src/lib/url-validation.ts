import type { PageType } from '@/types/form'

export interface URLRule {
  description: string
  examples: string[]
  validator: (url: string) => boolean
}

export const COMMON_RULE: URLRule = {
  description: 'バージョン指定の場合は、末尾がver○.php （○は任意の数字）',
  examples: [],
  validator: (url: string) => {
    if (!url.endsWith('.php')) return true
    return /\/ver\d+\.php$/.test(url)
  },
}

export const URL_RULES: Record<PageType, URLRule> = {
  'LP（CTA：LINE友達登録）': {
    description: 'ドメイン/lp_line/lp○/ （○は任意の数字）\nバージョン指定の場合は、末尾がver○.php （○は任意の数字）',
    examples: ['https://example.com/lp_line/lp2/', 'https://example.com/lp_line/lp2/ver1.php'],
    validator: (url: string) => {
      return /\/lp_line\/lp\d+\/$/.test(url) || /\/lp_line\/lp\d+\/ver\d+\.php$/.test(url)
    },
  },
  'LP（CTA：フォーム・シュミレータ遷移）': {
    description: 'ドメイン/lp○/ （○は任意の数字）\nバージョン指定の場合は、末尾がver○.php （○は任意の数字）',
    examples: ['https://example.com/lp2/', 'https://example.com/lp2/ver1.php'],
    validator: (url: string) => {
      return /\/lp\d+\/$/.test(url) || /\/lp\d+\/ver\d+\.php$/.test(url)
    },
  },
  'LP（CTA：Lステップ連動フォーム遷移）': {
    description: 'ドメインに「-form」を含める \nドメイン/lp_line_form/lp○/ （○は任意の数字）\nバージョン指定の場合は、末尾がver○.php （○は任意の数字）',
    examples: ['https://example-form.com/lp_line_form/lp2/', 'https://example-form.com/lp_line_form/lp2/ver1.php'],
    validator: (url: string) => {
      try {
        const urlObj = new URL(url)
        const hasDomainForm = urlObj.hostname.includes('-form')
        const hasCorrectPath = /\/lp_line_form\/lp\d+\/$/.test(url) || /\/lp_line_form\/lp\d+\/ver\d+\.php$/.test(url)
        return hasDomainForm && hasCorrectPath
      } catch {
        return false
      }
    },
  },
  'LP（CTA：URL直接指定）': {
    description: 'ドメイン/guide/lp○/ （○は任意の数字）\nバージョン指定の場合は、末尾がver○.php （○は任意の数字）',
    examples: ['https://example.com/guide/lp2/', 'https://example.com/guide/lp2/ver1.php'],
    validator: (url: string) => {
      return /\/guide\/lp\d+\/$/.test(url) || /\/guide\/lp\d+\/ver\d+\.php$/.test(url)
    },
  },
  'LP（自社管理画面での計測不要ページ）': {
    description: 'ドメイン/content/lp○/ （○は任意の数字）\nバージョン指定の場合は、末尾がver○.php （○は任意の数字）',
    examples: ['https://example.com/content/lp2/', 'https://example.com/content/lp2/ver1.php'],
    validator: (url: string) => {
      return /\/content\/lp\d+\/$/.test(url) || /\/content\/lp\d+\/ver\d+\.php$/.test(url)
    },
  },
  'フォーム（CTA：自社管理画面にデータ登録）': {
    description: 'ドメイン/form○/ （○は任意の数字）\nバージョン指定の場合は、末尾がver○.php （○は任意の数字）',
    examples: ['https://example.com/form2/', 'https://example.com/form2/ver1.php'],
    validator: (url: string) => {
      return /\/form\d+\/$/.test(url) || /\/form\d+\/ver\d+\.php$/.test(url)
    },
  },
  'フォーム（CTA：LINE友達登録 & Lステップにデータ登録）': {
    description: 'ドメインに「-form」を含める \nドメイン/form_line/form○/ （○は任意の数字）\nバージョン指定の場合は、末尾がver○.php （○は任意の数字）',
    examples: ['https://example-form.com/form_line/form2/', 'https://example-form.com/form_line/form2/ver1.php'],
    validator: (url: string) => {
      try {
        const urlObj = new URL(url)
        const hasDomainForm = urlObj.hostname.includes('-form')
        const hasCorrectPath = /\/form_line\/form\d+\/$/.test(url) || /\/form_line\/form\d+\/ver\d+\.php$/.test(url)
        return hasDomainForm && hasCorrectPath
      } catch {
        return false
      }
    },
  },
  'その他・新仕様ページ': {
    description: 'ルール制限なし',
    examples: [],
    validator: () => true,
  },
}

export function validateURL(url: string, pageType: PageType): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!url) {
    return { valid: false, errors: ['URLを入力してください'] }
  }

  // Basic URL validation
  try {
    new URL(url)
  } catch {
    errors.push('正しいURL形式で入力してください。')
    return { valid: false, errors }
  }

  // Page type specific validation
  const pageTypeRule = URL_RULES[pageType]
  if (pageTypeRule && !pageTypeRule.validator(url)) {
    errors.push('正しいURL形式で入力してください。')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function getURLRuleForPageType(pageType: PageType): URLRule | null {
  return URL_RULES[pageType] || null
}

/**
 * Check if a URL exists (returns HTTP 200)
 * @param url - The URL to check
 * @returns Promise resolving to true if URL exists (200), false otherwise
 */
export async function checkURLExists(url: string): Promise<{ exists: boolean; status?: number; error?: string }> {
  if (!url) {
    return { exists: false }
  }

  try {
    // Validate URL format first
    new URL(url)

    // Use fetch with HEAD method and CORS mode
    const res = await fetch(url, { method: 'HEAD', mode: 'cors' })
    return { exists: res.ok, status: res.status }
  } catch (err) {
    // CORSでブロックされるかネットワークエラー
    const errorMessage = err instanceof Error ? err.message : String(err)
    return { exists: false, error: errorMessage }
  }
}
