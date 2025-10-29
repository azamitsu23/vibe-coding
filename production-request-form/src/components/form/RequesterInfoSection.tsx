import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { FormData } from '@/types/form'

interface RequesterInfoSectionProps {
  data: FormData
  onChange: (data: FormData) => void
}

export function RequesterInfoSection({ data, onChange }: RequesterInfoSectionProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">依頼者情報</CardTitle>
        <CardDescription className="text-muted-foreground">
          依頼者の基本情報を入力してください
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="requesterName" className="text-sm font-medium">
            依頼者名 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="requesterName"
            value={data.requesterName}
            onChange={(e) => onChange({ ...data, requesterName: e.target.value })}
            placeholder="山田 太郎"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            メールアドレス（Googleアカウント） <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Googleアカウントのメールアドレスを入力してください
          </p>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="example@gmail.com"
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
