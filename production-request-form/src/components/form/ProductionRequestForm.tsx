import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RequesterInfoSection } from './RequesterInfoSection'
import { RequestDetailsSection } from './RequestDetailsSection'
import { LStepInfoSection } from './LStepInfoSection'
import type { FormData, PageType } from '@/types/form'
import { initialFormData } from '@/types/form'
import { shouldShowLStepSection, shouldShowNewUrlField } from '@/config/constants'
import { validateURL } from '@/lib/url-validation'

export function ProductionRequestForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const showLStepSection = shouldShowLStepSection(formData.pageType)
  const showNewUrl = shouldShowNewUrlField(formData.workType)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    const errors: string[] = []

    // Requester Info
    if (!formData.requesterName) errors.push('依頼者名を入力してください')
    if (!formData.email) errors.push('メールアドレスを入力してください')
    if (formData.email && !formData.email.includes('@')) {
      errors.push('有効なメールアドレスを入力してください')
    }

    // Request Details
    if (!formData.workType) errors.push('作業タイプを選択してください')
    if (!formData.pageType) errors.push('ページタイプを選択してください')

    // Validate URL groups
    if (formData.urlGroups.length === 0 || !formData.urlGroups[0].targetUrl) {
      errors.push('対象URLを入力してください')
    } else {
      // Validate each URL group
      formData.urlGroups.forEach((group, index) => {
        if (group.targetUrl) {
          // Validate target URL format
          const targetUrlValidation = validateURL(group.targetUrl, formData.pageType as PageType)
          if (!targetUrlValidation.valid) {
            errors.push(`対象URL ${index + 1}: ${targetUrlValidation.errors.join(', ')}`)
          }
        }

        // For 移管 work type, validate new URL as well
        if (showNewUrl && group.targetUrl && !group.newUrl) {
          errors.push(`変更後URL ${index + 1}: URLを入力してください`)
        } else if (showNewUrl && group.newUrl) {
          const newUrlValidation = validateURL(group.newUrl, formData.pageType as PageType)
          if (!newUrlValidation.valid) {
            errors.push(`変更後URL ${index + 1}: ${newUrlValidation.errors.join(', ')}`)
          }
        }
      })
    }

    if (!formData.details) errors.push('詳細を入力してください')

    // Meta information validation
    if (!formData.useDefault) {
      if (!formData.titleTag && !formData.descriptionTag) {
        errors.push('meta情報: お任せをチェックするか、titleタグとdescriptionタグの両方を入力してください')
      } else if (!formData.titleTag) {
        errors.push('titleタグを入力してください')
      } else if (!formData.descriptionTag) {
        errors.push('descriptionタグを入力してください')
      }
    }

    // L-Step Info
    if (showLStepSection && !formData.lStepDataType) {
      errors.push('Lステップに連携する情報を選択してください')
    }

    if (errors.length > 0) {
      alert('以下の項目を確認してください：\n\n' + errors.join('\n'))
      setIsSubmitting(false)
      return
    }

    try {
      // TODO: Implement API calls
      // 1. Create Google Spreadsheet
      // 2. Send ChatWork notification

      console.log('Form submitted:', formData)

      alert('依頼を送信しました！\n\n（実際の送信機能は今後実装されます）')

      // Reset form
      setFormData(initialFormData)
    } catch (error) {
      console.error('Submission error:', error)
      alert('送信中にエラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <RequesterInfoSection data={formData} onChange={setFormData} />
      <RequestDetailsSection data={formData} onChange={setFormData} />

      {showLStepSection && (
        <LStepInfoSection data={formData} onChange={setFormData} />
      )}

      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {isSubmitting ? '送信中...' : '依頼を送信'}
        </Button>
      </div>
    </form>
  )
}
