import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { FormData } from '@/types/form'
import { LSTEP_DATA_TYPE_OPTIONS } from '@/config/constants'

interface LStepInfoSectionProps {
  data: FormData
  onChange: (data: FormData) => void
}

export function LStepInfoSection({ data, onChange }: LStepInfoSectionProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">Lステップ情報</CardTitle>
        <CardDescription className="text-muted-foreground">
          Lステップ連携に関する情報を入力してください
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Lステップに連携する情報 <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={data.lStepDataType}
            onValueChange={(value) => onChange({ ...data, lStepDataType: value as FormData['lStepDataType'] })}
            className="flex flex-col space-y-2"
          >
            {LSTEP_DATA_TYPE_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Lステップに連携する情報の作成状態
          </Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lStepCreationStatus"
              checked={data.lStepCreationStatus}
              onCheckedChange={(checked) =>
                onChange({ ...data, lStepCreationStatus: checked === true })
              }
            />
            <Label
              htmlFor="lStepCreationStatus"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              作成済み
            </Label>
          </div>
        </div>

        <div className="space-y-4 border-l-2 border-primary/20 pl-4">
          <h4 className="text-sm font-semibold text-foreground/90">Lステップテスト用経路情報</h4>

          <div className="space-y-2">
            <Label htmlFor="lStepFolderName" className="text-sm font-medium">
              フォルダ名
            </Label>
            <p className="text-xs text-muted-foreground">
              Lステップ管理画面上のフォルダ名
            </p>
            <Input
              id="lStepFolderName"
              value={data.lStepFolderName}
              onChange={(e) => onChange({ ...data, lStepFolderName: e.target.value })}
              placeholder="フォルダ名を入力"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lStepRouteName" className="text-sm font-medium">
              流入経路名
            </Label>
            <p className="text-xs text-muted-foreground">
              作成する流入経路の名前
            </p>
            <Input
              id="lStepRouteName"
              value={data.lStepRouteName}
              onChange={(e) => onChange({ ...data, lStepRouteName: e.target.value })}
              placeholder="流入経路名を入力"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4 border-l-2 border-secondary/20 pl-4">
          <h4 className="text-sm font-semibold text-foreground/90">自社管理画面テスト情報</h4>

          <div className="space-y-2">
            <Label htmlFor="managementScreenUrl" className="text-sm font-medium">
              URL
            </Label>
            <p className="text-xs text-muted-foreground">
              自社管理画面の動作確認用URL
            </p>
            <Input
              id="managementScreenUrl"
              type="url"
              value={data.managementScreenUrl}
              onChange={(e) => onChange({ ...data, managementScreenUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managementCodeName" className="text-sm font-medium">
              コード名
            </Label>
            <p className="text-xs text-muted-foreground">
              自社管理画面の動作確認用コード名
            </p>
            <Input
              id="managementCodeName"
              value={data.managementCodeName}
              onChange={(e) => onChange({ ...data, managementCodeName: e.target.value })}
              placeholder="コード名を入力"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lStepAccountName" className="text-sm font-medium">
            Lステップアカウント名
          </Label>
          <Textarea
            id="lStepAccountName"
            value={data.lStepAccountName}
            onChange={(e) => onChange({ ...data, lStepAccountName: e.target.value })}
            placeholder="アカウント名を入力してください"
            className="min-h-[80px] w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="managementDomainName" className="text-sm font-medium">
            自社管理画面ドメイン名
          </Label>
          <Input
            id="managementDomainName"
            value={data.managementDomainName}
            onChange={(e) => onChange({ ...data, managementDomainName: e.target.value })}
            placeholder="example.com"
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
