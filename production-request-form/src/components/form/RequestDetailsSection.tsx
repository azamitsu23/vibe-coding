import { useState, useCallback } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { FormData, URLGroup, PageType } from '@/types/form'
import { PAGE_TYPE_OPTIONS, WORK_TYPE_OPTIONS, shouldShowNewUrlField, META_LIMITS, getCharacterCountStatus } from '@/config/constants'
import { Plus, X, Info, AlertCircle } from 'lucide-react'
import { getURLRuleForPageType, validateURL, checkURLExists } from '@/lib/url-validation'

interface RequestDetailsSectionProps {
  data: FormData
  onChange: (data: FormData) => void
}

export function RequestDetailsSection({ data, onChange }: RequestDetailsSectionProps) {
  const showNewUrl = shouldShowNewUrlField(data.workType)
  const urlFieldsEnabled = data.workType !== '' && data.pageType !== ''

  // Track URL existence errors per URL group
  const [urlExistsErrors, setUrlExistsErrors] = useState<Record<string, { targetUrl?: string; newUrl?: string }>>({})

  const addURLGroup = () => {
    const newId = String(Date.now())
    const newGroup: URLGroup = {
      id: newId,
      targetUrl: '',
      newUrl: '',
    }
    onChange({
      ...data,
      urlGroups: [...data.urlGroups, newGroup],
    })
  }

  const removeURLGroup = (id: string) => {
    if (data.urlGroups.length <= 1) return
    onChange({
      ...data,
      urlGroups: data.urlGroups.filter((group) => group.id !== id),
    })
  }

  const checkURLExistence = useCallback(async (id: string, field: 'targetUrl' | 'newUrl', url: string) => {
    // Only check the relevant URL based on work type
    const shouldCheck =
      (data.workType === '移管' && field === 'newUrl') ||
      (data.workType === '新規作成' && field === 'targetUrl')

    if (!shouldCheck || !url) {
      // Clear error for this field
      setUrlExistsErrors((prev) => {
        const newErrors = { ...prev }
        if (newErrors[id]) {
          delete newErrors[id][field]
          if (!newErrors[id].targetUrl && !newErrors[id].newUrl) {
            delete newErrors[id]
          }
        }
        return newErrors
      })
      return
    }

    // Check if URL exists
    const result = await checkURLExists(url)

    console.log(result);

    if (result.exists) {
      // URL exists (returns 200), show error
      setUrlExistsErrors((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: '既にページが存在するので別のURLを指定してください',
        },
      }))
    } else {
      // URL doesn't exist, clear error
      setUrlExistsErrors((prev) => {
        const newErrors = { ...prev }
        if (newErrors[id]) {
          delete newErrors[id][field]
          if (!newErrors[id].targetUrl && !newErrors[id].newUrl) {
            delete newErrors[id]
          }
        }
        return newErrors
      })
    }
  }, [data.workType])

  const updateURLGroup = (id: string, field: 'targetUrl' | 'newUrl', value: string) => {
    onChange({
      ...data,
      urlGroups: data.urlGroups.map((group) =>
        group.id === id ? { ...group, [field]: value } : group
      ),
    })

    // Check URL existence after update
    checkURLExistence(id, field, value)
  }

  // Get URL rules to display
  const pageTypeRule = data.pageType ? getURLRuleForPageType(data.pageType as PageType) : null

  // Determine which URL field to show rules for
  const shouldShowRulesForTargetURL = data.workType === '新規作成' || data.workType === '上書き修正'
  const shouldShowRulesForNewURL = data.workType === '移管'

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">依頼内容</CardTitle>
        <CardDescription className="text-muted-foreground">
          制作依頼の詳細を入力してください
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 作業タイプ */}
        <div className="space-y-2">
          <Label htmlFor="workType" className="text-sm font-medium">
            作業タイプ <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.workType}
            onValueChange={(value) => onChange({ ...data, workType: value as FormData['workType'] })}
          >
            <SelectTrigger id="workType" className="w-full">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {WORK_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ページタイプ */}
        <div className="space-y-2">
          <Label htmlFor="pageType" className="text-sm font-medium">
            ページタイプ <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">作成するページの仕様を選んでください</p>
          <Select
            value={data.pageType}
            onValueChange={(value) => onChange({ ...data, pageType: value as FormData['pageType'] })}
          >
            <SelectTrigger id="pageType" className="w-full">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {PAGE_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Page Type Information Box */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  ページタイプについて
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    該当のページタイプがない場合は「その他・新仕様ページ」を選択してください。
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    ページタイプの詳細については
                    <a href="#" className="underline hover:no-underline ml-1">
                      こちら
                    </a>
                    からご確認ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* URL */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">
            URL <span className="text-destructive">*</span>
          </Label>

          {data.urlGroups.map((group, index) => (
            <div key={group.id} className="relative p-4 border border-border/40 rounded-lg bg-muted/10 space-y-4 md:space-y-0">
              {data.urlGroups.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeURLGroup(group.id)}
                  className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">削除</span>
                </Button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`targetUrl-${group.id}`} className="text-sm font-medium">
                    対象URL {index === 0 && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id={`targetUrl-${group.id}`}
                    type="url"
                    value={group.targetUrl}
                    onChange={(e) => updateURLGroup(group.id, 'targetUrl', e.target.value)}
                    placeholder="https://example.com"
                    className="w-full"
                    disabled={!urlFieldsEnabled}
                  />
                  {/* Validate targetUrl only for 新規作成 and 上書き修正 */}
                  {group.targetUrl && data.pageType && data.workType !== '移管' && (() => {
                    const validation = validateURL(group.targetUrl, data.pageType as PageType)
                    return !validation.valid && (
                      <div className="flex items-start gap-1.5 text-xs text-destructive">
                        <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <div className="space-y-0.5">
                          {validation.errors.map((error, i) => (
                            <p key={i}>{error}</p>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                  {/* URL existence error for 新規作成 */}
                  {urlExistsErrors[group.id]?.targetUrl && (
                    <div className="flex items-start gap-1.5 text-xs text-destructive">
                      <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      <p>{urlExistsErrors[group.id].targetUrl}</p>
                    </div>
                  )}
                </div>

                {showNewUrl && (
                  <div className="space-y-2">
                    <Label htmlFor={`newUrl-${group.id}`} className="text-sm font-medium">
                      変更後URL {index === 0 && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id={`newUrl-${group.id}`}
                      type="url"
                      value={group.newUrl}
                      onChange={(e) => updateURLGroup(group.id, 'newUrl', e.target.value)}
                      placeholder="https://example.com/new"
                      className="w-full"
                      disabled={!urlFieldsEnabled}
                    />
                    {/* Validate newUrl only for 移管 */}
                    {group.newUrl && data.pageType && data.workType === '移管' && (() => {
                      const validation = validateURL(group.newUrl, data.pageType as PageType)
                      return !validation.valid && (
                        <div className="flex items-start gap-1.5 text-xs text-destructive">
                          <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                          <div className="space-y-0.5">
                            {validation.errors.map((error, i) => (
                              <p key={i}>{error}</p>
                            ))}
                          </div>
                        </div>
                      )
                    })()}
                    {/* URL existence error for 移管 */}
                    {urlExistsErrors[group.id]?.newUrl && (
                      <div className="flex items-start gap-1.5 text-xs text-destructive">
                        <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <p>{urlExistsErrors[group.id].newUrl}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* URL Rules - Show after all URL groups if work type and page type are selected */}
          {data.workType && data.pageType && pageTypeRule && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    {shouldShowRulesForTargetURL && '対象URL'}
                    {shouldShowRulesForNewURL && '変更後URL'}
                    のURL形式について
                  </p>

                  {/* Page Type Rule */}
                  {pageTypeRule.description !== 'ルール制限なし' && (
                    <div className="space-y-1">
                      <p className="text-xs text-blue-700 dark:text-blue-300 whitespace-pre-line">
                        {pageTypeRule.description}
                      </p>
                      {pageTypeRule.examples.length > 0 && (
                        <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
                          例: {pageTypeRule.examples.join(', ')}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addURLGroup}
              disabled={!urlFieldsEnabled}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              追加
            </Button>
          </div>
        </div>

        {/* 詳細 */}
        <div className="space-y-2">
          <Label htmlFor="details" className="text-sm font-medium">
            詳細 <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            制作意図、作成するページの詳細な仕様や要件、仕様書のURLを記入してください
          </p>
          <Textarea
            id="details"
            value={data.details}
            onChange={(e) => onChange({ ...data, details: e.target.value })}
            placeholder="制作意図、作成するページの詳細な仕様や要件、仕様書のURLを記入してください。&#10;URLの権限や有効期限にご注意ください。"
            className="min-h-[120px] w-full"
          />
        </div>

        {/* 参考情報 */}
        <div className="space-y-2">
          <Label htmlFor="referenceInfo" className="text-sm font-medium">
            参考情報 <span className="text-muted-foreground text-xs">(任意)</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            参考URLや画像、資料などがあれば記入してください。記載した参考情報はどのページのものかも明記してください
          </p>
          <Textarea
            id="referenceInfo"
            value={data.referenceInfo}
            onChange={(e) => onChange({ ...data, referenceInfo: e.target.value })}
            placeholder="参考URLや画像、資料などがあれば記入してください"
            className="min-h-[100px] w-full"
          />
        </div>

        {/* meta情報 */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <div className="space-y-2">
            <Label className="text-base font-semibold">
              meta情報 <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground">
              ※「お任せ」をチェック、または title と description の両方を入力してください
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="useDefault"
              checked={data.useDefault}
              onCheckedChange={(checked) =>
                onChange({ ...data, useDefault: checked === true })
              }
            />
            <Label
              htmlFor="useDefault"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              お任せ
            </Label>
          </div>

          {!data.useDefault && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="titleTag" className="text-sm font-medium">
                    titleタグ <span className="text-destructive">*</span>
                  </Label>
                  <span className={`text-xs ${
                    getCharacterCountStatus(data.titleTag.length, META_LIMITS.title.max) === 'error'
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}>
                    {data.titleTag.length}文字 (推奨: {META_LIMITS.title.min}〜{META_LIMITS.title.max}文字)
                  </span>
                </div>
                <Input
                  id="titleTag"
                  value={data.titleTag}
                  onChange={(e) => onChange({ ...data, titleTag: e.target.value })}
                  placeholder="ページのタイトルを入力してください"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="descriptionTag" className="text-sm font-medium">
                    descriptionタグ <span className="text-destructive">*</span>
                  </Label>
                  <span className={`text-xs ${
                    getCharacterCountStatus(data.descriptionTag.length, META_LIMITS.description.max) === 'error'
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}>
                    {data.descriptionTag.length}文字 (推奨: {META_LIMITS.description.min}〜{META_LIMITS.description.max}文字)
                  </span>
                </div>
                <Textarea
                  id="descriptionTag"
                  value={data.descriptionTag}
                  onChange={(e) => onChange({ ...data, descriptionTag: e.target.value })}
                  placeholder="ページの説明を入力してください"
                  className="min-h-[80px] w-full"
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
