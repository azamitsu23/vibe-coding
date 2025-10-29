# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

### Purpose

This is an internal production request form application for managing website/landing page creation requests. The system enables team members to:
- Submit structured creation/modification requests for landing pages and forms
- Automatically generate Google Spreadsheets with request details
- Send notifications to ChatWork for team collaboration

### Target Users

Internal team members (designers, marketers, project managers) who need to request web page production.

### Technology Stack

This application is built with:
- **Vite** 6.x - Build tool and dev server with HMR
- **React** 18.x - UI framework
- **TypeScript** 5.6.x - Type-safe JavaScript
- **Tailwind CSS** 3.x (v4.1.16) - Utility-first CSS framework
- **shadcn/ui** - Accessible, customizable component library built on Radix UI
- **ESLint** 9.x - Code linting with TypeScript ESLint integration

## ⚠️ CRITICAL: Design Specifications

**ALL UI/UX work MUST strictly follow the design specifications in `DESIGN_SPEC.md`.**

Key requirements:
- Use only Tailwind CSS utility classes (no inline styles)
- Use design tokens (CSS variables) for all colors, spacing, typography
- Install shadcn/ui components via `npx shadcn@latest add [component-name]`
- Use `cn()` utility from `@/lib/utils` for className merging
- Follow mobile-first responsive design patterns
- Maintain accessibility standards (WCAG AA)

Read `DESIGN_SPEC.md` in full before making any UI changes.

## Requirements Specification

### Functional Requirements

#### 1. Form Input System

The application must provide a comprehensive form with the following sections:

**1.1 Basic Information**
- **Page Type** (Required)
  - Type: Select dropdown
  - Options:
    - LP：LINE友達
    - LP：LINE友達（特定の広告媒体向け）
    - LP：フォーム（シュミレータ）
    - LP：Lステップ連動フォーム
    - LP：CTA直接指定
    - LP：計測不要
    - LP：多言語対応
    - フォーム：フォーム（シュミレータ）
    - フォーム：Lステップ連動フォーム
  - Description: "作成するページの仕様を選んでください"

- **Work Type** (Required)
  - Type: Select dropdown
  - Options:
    - 新規作成・移管
    - 上書き修正

**1.2 Request Details**
- **Requester Name** (Required)
  - Type: Text input
  - Validation: Required field

- **Target URL** (Required)
  - Type: URL input
  - Validation: Valid URL format

- **New URL** (Conditional - Required when Work Type is "新規作成・移管")
  - Type: URL input
  - Validation: Valid URL format
  - Display: Only show when Work Type = "新規作成・移管"

- **Details** (Required)
  - Type: Textarea
  - Description: "制作意図、作成するページの詳細な仕様や要件、仕様書のURLを記入してください。URLの権限や有効期限にご注意ください。"
  - Validation: Required field

- **Reference Information** (Optional)
  - Type: Textarea
  - Description: "参考URLや画像、資料などがあれば記入してください。記載した参考情報はどのページのものかも明記してください。URLの権限や有効期限にご注意ください。"

**1.3 Meta Information**
- **Use Default** (Optional)
  - Type: Checkbox
  - Label: "お任せ"
  - Effect: When checked, title and description fields can be empty

- **Title Tag** (Conditional)
  - Type: Text input
  - Validation: Required when "お任せ" is not checked

- **Description Tag** (Conditional)
  - Type: Textarea
  - Validation: Required when "お任せ" is not checked

**1.4 L-Step Integration Information** (Conditional section)

Display this section only when Page Type includes "Lステップ" in the value.

- **L-Step Data Type** (Required when visible)
  - Type: Radio buttons
  - Options:
    - 友達情報
    - タグ情報

- **Creation Status** (Optional)
  - Type: Checkbox
  - Label: "作成済み"

- **L-Step Test Route Information**
  - **Folder Name** (Optional)
    - Type: Text input
    - Description: "Lステップ管理画面のどこに作成するかをご記入ください"

  - **Entry Route Name** (Optional)
    - Type: Text input
    - Description: "作成する流入経路の名前をご記入ください"

- **Internal Management Screen Test Information**
  - **URL** (Optional)
    - Type: URL input
    - Description: "自社管理画面での動作確認用URLをご記入ください"

  - **Code Name** (Optional)
    - Type: Text input
    - Description: "自社管理画面での動作確認用コード名をご記入ください"

- **L-Step Account Name** (Optional)
  - Type: Textarea
  - Description: "Lステップのアカウント名をご記入ください"

- **Internal Management Domain Name** (Optional)
  - Type: Text input
  - Description: "自社管理画面ドメイン名"

#### 2. Data Validation

- **URL Format Validation**: All URL fields must validate proper URL format (http/https protocol)
- **Conditional Required Fields**: Fields marked as "Conditional" must validate based on parent field values
- **Form Submission Validation**: Prevent submission if required fields are empty or invalid

#### 3. Google Sheets Integration

- **Spreadsheet Generation** (Post-form submission)
  - Automatically create a new Google Spreadsheet with form data
  - Use Google Sheets API v4
  - Include all submitted form fields in structured format
  - Generate shareable link with appropriate permissions
  - Store spreadsheet ID for reference

- **Data Structure**:
  ```
  | Field Name | Value |
  |------------|-------|
  | ページタイプ | [value] |
  | 作業内容 | [value] |
  | 依頼者名 | [value] |
  | ... | ... |
  ```

#### 4. ChatWork Integration

- **Message Notification** (Post-spreadsheet generation)
  - Send formatted message to specified ChatWork room
  - Use ChatWork API v2
  - Include:
    - Request summary
    - Requester name
    - Page type
    - Link to generated Google Spreadsheet
    - Timestamp

- **Message Format**:
  ```
  [info][title]新規制作依頼[/title]
  依頼者: [Requester Name]
  ページタイプ: [Page Type]
  作業内容: [Work Type]

  スプレッドシート: [Spreadsheet Link]
  依頼日時: [Timestamp]
  [/info]
  ```

#### 5. User Feedback

- **Loading States**: Display loading indicators during:
  - Form submission
  - Spreadsheet generation
  - ChatWork message sending

- **Success State**: Show success message with:
  - Confirmation that request was submitted
  - Link to generated spreadsheet
  - Confirmation of ChatWork notification

- **Error Handling**: Display user-friendly error messages for:
  - Validation errors
  - API failures (Google Sheets / ChatWork)
  - Network errors
  - Permission errors

### Non-Functional Requirements

#### Performance
- Form submission should complete within 5 seconds (excluding API calls)
- Spreadsheet generation should complete within 10 seconds
- Initial page load should be under 2 seconds

#### Security
- **API Key Management**:
  - Store all API keys in environment variables (.env)
  - Never commit API keys to version control
  - Use server-side API calls when possible to hide credentials

- **Input Sanitization**: Sanitize all user inputs before:
  - Sending to Google Sheets API
  - Sending to ChatWork API
  - Displaying on screen

- **CORS Configuration**: Configure proper CORS settings for API endpoints

#### Accessibility
- Follow WCAG AA standards
- Ensure keyboard navigation support
- Provide proper ARIA labels
- Maintain color contrast ratios
- Support screen readers

#### Browser Compatibility
- Support latest 2 versions of major browsers:
  - Chrome
  - Firefox
  - Safari
  - Edge

### Data Flow Architecture

```
User Input → Form Validation → Submit
                                  ↓
                    Create Google Spreadsheet (API)
                                  ↓
                    Store Spreadsheet ID/Link
                                  ↓
                    Send ChatWork Notification (API)
                                  ↓
                    Display Success Message
```

## Development Commands

```bash
# Start development server (HMR enabled)
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## Architecture

### Application Architecture

#### Frontend Architecture
- **React 18** with functional components and hooks
- **TypeScript** for type safety
- **Form State Management**: Use React Hook Form or native React state
- **API Layer**: Separate service modules for Google Sheets and ChatWork
- **Validation**: Yup or Zod for schema validation

#### Backend/API Integration

**Note**: Since this is a Vite/React SPA, API calls must be proxied through a backend server or use CORS-enabled endpoints to protect API keys.

**Recommended Approach**:
1. Use Vite's proxy feature for development
2. Deploy with a serverless function backend (Vercel, Netlify, CloudFlare Workers)
3. Or use a lightweight Express/Fastify server

#### API Integration Specifications

**Google Sheets API v4**
- **Authentication**: OAuth 2.0 or Service Account
- **Scopes Required**:
  - `https://www.googleapis.com/auth/spreadsheets`
  - `https://www.googleapis.com/auth/drive.file`
- **Key Operations**:
  - `spreadsheets.create` - Create new spreadsheet
  - `spreadsheets.values.update` - Write form data
  - `permissions.create` - Set sharing permissions

**ChatWork API v2**
- **Authentication**: API Token (X-ChatWorkToken header)
- **Endpoints**:
  - `POST /rooms/{room_id}/messages` - Send message
- **Rate Limits**: Be aware of API rate limits
- **Message Formatting**: Use ChatWork's message decoration syntax

#### Environment Variables

Create a `.env` file in the project root (never commit this file):

```env
# Google Sheets API
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_GOOGLE_CLIENT_ID=your_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here

# ChatWork API
VITE_CHATWORK_API_TOKEN=your_chatwork_token_here
VITE_CHATWORK_ROOM_ID=your_room_id_here

# Application Settings
VITE_APP_TITLE="Production Request Form"
```

**Security Note**:
- Prefix with `VITE_` to expose to client (use carefully)
- For production, move sensitive keys to backend/serverless functions
- Never expose API secrets in client-side code

### TypeScript Configuration

The project uses TypeScript's project references feature with split configurations:
- `tsconfig.json` - Root config that references app and node configs
- `tsconfig.app.json` - App source code config (strict mode enabled)
- `tsconfig.node.json` - Vite config file compilation

### Build Process

The build command (`npm run build`) runs in two stages:
1. TypeScript compilation check (`tsc -b`)
2. Vite bundling (`vite build`)

Both must pass for a successful build.

### Module System

- Uses ES modules (`"type": "module"` in package.json)
- TypeScript `moduleResolution: "bundler"` - optimized for Vite
- `allowImportingTsExtensions: true` - allows `.tsx` imports in source
- Path aliases configured: `@/*` maps to `./src/*`

### Entry Points

- `index.html` - Root HTML file that loads the React app
- `src/main.tsx` - JavaScript entry point that renders the React app into `#root`
- `src/App.tsx` - Main React component

### Directory Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components (auto-generated, don't edit directly)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio-group.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── form/                  # Custom form components
│   │   ├── BasicInfoSection.tsx
│   │   ├── RequestDetailsSection.tsx
│   │   ├── MetaInfoSection.tsx
│   │   ├── LStepInfoSection.tsx
│   │   └── ProductionRequestForm.tsx
│   └── feedback/              # User feedback components
│       ├── LoadingSpinner.tsx
│       ├── SuccessMessage.tsx
│       └── ErrorMessage.tsx
├── lib/
│   ├── utils.ts               # Utility functions (cn() for className merging)
│   └── validation.ts          # Form validation schemas (Zod/Yup)
├── services/                  # API integration layer
│   ├── googleSheets.ts        # Google Sheets API service
│   ├── chatwork.ts            # ChatWork API service
│   └── api.ts                 # Shared API utilities
├── types/                     # TypeScript type definitions
│   ├── form.ts                # Form data types
│   └── api.ts                 # API response types
├── hooks/                     # Custom React hooks
│   ├── useFormSubmit.ts       # Form submission logic
│   └── useConditionalFields.ts # Conditional field visibility
├── config/                    # Configuration files
│   └── constants.ts           # Application constants
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Tailwind directives + design tokens (CSS variables)
```

#### Key Directories Explained

**`components/form/`**: Contains all form-related components
- Split form into logical sections for maintainability
- Each section component handles its own validation and state

**`services/`**: API integration modules
- Encapsulate all external API calls
- Handle authentication, error handling, and response formatting
- Keep API logic separate from UI components

**`types/`**: TypeScript definitions
- Define interfaces for form data
- Define types for API requests/responses
- Ensures type safety across the application

**`hooks/`**: Custom React hooks
- `useFormSubmit`: Handles the submission workflow (validation → Sheets → ChatWork)
- `useConditionalFields`: Manages conditional field visibility logic

**`config/`**: Application configuration
- Constants (page type options, work type options, etc.)
- Environment variable accessors
- Validation rules

## UI/UX Development Workflow

### Adding a New Component

1. **Check if shadcn/ui has the component:**
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add card
   npx shadcn@latest add input
   # etc.
   ```

2. **Component will be added to `src/components/ui/`**

3. **Import and use in your components:**
   ```tsx
   import { Button } from "@/components/ui/button"

   function MyComponent() {
     return <Button variant="outline">Click me</Button>
   }
   ```

4. **For custom variants, create wrapper components** (don't edit ui/ files directly)

### Styling Guidelines

- **Always use `cn()` for className merging:**
  ```tsx
  import { cn } from "@/lib/utils"

  <div className={cn("base-class", condition && "conditional", className)}>
  ```

- **Use design tokens for colors:**
  ```tsx
  <div className="bg-primary text-primary-foreground">
  <div className="border-border">
  ```

- **Follow spacing standards** (refer to DESIGN_SPEC.md section 2.2)
- **Use responsive patterns** (mobile-first approach)

## Implementation Guidelines

### Form Implementation Best Practices

#### 1. Component Structure

Split the form into smaller, manageable section components:

```tsx
// src/components/form/ProductionRequestForm.tsx
import { BasicInfoSection } from './BasicInfoSection'
import { RequestDetailsSection } from './RequestDetailsSection'
import { MetaInfoSection } from './MetaInfoSection'
import { LStepInfoSection } from './LStepInfoSection'

export function ProductionRequestForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const { handleSubmit, isLoading, error } = useFormSubmit()

  return (
    <form onSubmit={handleSubmit}>
      <BasicInfoSection data={formData} onChange={setFormData} />
      <RequestDetailsSection data={formData} onChange={setFormData} />
      <MetaInfoSection data={formData} onChange={setFormData} />
      {shouldShowLStepSection(formData.pageType) && (
        <LStepInfoSection data={formData} onChange={setFormData} />
      )}
      <Button type="submit" disabled={isLoading}>
        依頼を送信
      </Button>
    </form>
  )
}
```

#### 2. Type Safety

Define comprehensive types for form data:

```tsx
// src/types/form.ts
export type PageType =
  | 'LP：LINE友達'
  | 'LP：LINE友達（特定の広告媒体向け）'
  | 'LP：フォーム（シュミレータ）'
  | 'LP：Lステップ連動フォーム'
  | 'LP：CTA直接指定'
  | 'LP：計測不要'
  | 'LP：多言語対応'
  | 'フォーム：フォーム（シュミレータ）'
  | 'フォーム：Lステップ連動フォーム'

export type WorkType = '新規作成・移管' | '上書き修正'

export interface FormData {
  // Basic Info
  pageType: PageType
  workType: WorkType

  // Request Details
  requesterName: string
  targetUrl: string
  newUrl?: string
  details: string
  referenceInfo?: string

  // Meta Info
  useDefault: boolean
  titleTag?: string
  descriptionTag?: string

  // L-Step Info (conditional)
  lStepDataType?: '友達情報' | 'タグ情報'
  creationStatus?: boolean
  lStepFolderName?: string
  lStepRouteName?: string
  managementScreenUrl?: string
  managementCodeName?: string
  lStepAccountName?: string
  managementDomainName?: string
}
```

#### 3. Validation with Zod

Use Zod for runtime validation:

```tsx
// src/lib/validation.ts
import { z } from 'zod'

export const formSchema = z.object({
  pageType: z.string().min(1, '必須項目です'),
  workType: z.string().min(1, '必須項目です'),
  requesterName: z.string().min(1, '必須項目です'),
  targetUrl: z.string().url('有効なURLを入力してください'),
  newUrl: z.string().url('有効なURLを入力してください').optional(),
  details: z.string().min(10, '詳細は10文字以上入力してください'),
  referenceInfo: z.string().optional(),
  useDefault: z.boolean(),
  titleTag: z.string().optional(),
  descriptionTag: z.string().optional(),
}).refine(
  (data) => data.useDefault || (data.titleTag && data.descriptionTag),
  {
    message: 'お任せを選択しない場合、titleとdescriptionは必須です',
    path: ['titleTag'],
  }
).refine(
  (data) => data.workType !== '新規作成・移管' || data.newUrl,
  {
    message: '新規作成・移管の場合、変更後URLは必須です',
    path: ['newUrl'],
  }
)
```

#### 4. API Service Layer

Create clean API service modules:

```tsx
// src/services/googleSheets.ts
import { FormData } from '@/types/form'

interface CreateSpreadsheetResponse {
  spreadsheetId: string
  spreadsheetUrl: string
}

export async function createSpreadsheet(
  formData: FormData
): Promise<CreateSpreadsheetResponse> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

  // Call your backend endpoint that handles Google Sheets API
  const response = await fetch('/api/sheets/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Failed to create spreadsheet')
  }

  return response.json()
}

// src/services/chatwork.ts
export async function sendChatWorkNotification(
  message: string,
  spreadsheetUrl: string
): Promise<void> {
  const response = await fetch('/api/chatwork/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, spreadsheetUrl }),
  })

  if (!response.ok) {
    throw new Error('Failed to send ChatWork notification')
  }
}
```

#### 5. Custom Hooks for Form Logic

```tsx
// src/hooks/useFormSubmit.ts
import { useState } from 'react'
import { FormData } from '@/types/form'
import { createSpreadsheet } from '@/services/googleSheets'
import { sendChatWorkNotification } from '@/services/chatwork'

export function useFormSubmit() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // 1. Create spreadsheet
      const { spreadsheetUrl } = await createSpreadsheet(formData)

      // 2. Send ChatWork notification
      const message = formatChatWorkMessage(formData, spreadsheetUrl)
      await sendChatWorkNotification(message, spreadsheetUrl)

      // 3. Show success
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return { handleSubmit, isLoading, error, success }
}

function formatChatWorkMessage(formData: FormData, spreadsheetUrl: string): string {
  return `[info][title]新規制作依頼[/title]
依頼者: ${formData.requesterName}
ページタイプ: ${formData.pageType}
作業内容: ${formData.workType}

スプレッドシート: ${spreadsheetUrl}
依頼日時: ${new Date().toLocaleString('ja-JP')}
[/info]`
}
```

#### 6. Conditional Field Display

```tsx
// src/hooks/useConditionalFields.ts
export function useConditionalFields(pageType: string) {
  const showLStepSection = pageType.includes('Lステップ')
  const showNewUrlField = (workType: string) => workType === '新規作成・移管'
  const requireMetaFields = (useDefault: boolean) => !useDefault

  return {
    showLStepSection,
    showNewUrlField,
    requireMetaFields,
  }
}
```

### API Integration Setup

#### Required Dependencies

Install necessary packages:

```bash
# For validation
npm install zod

# For Google API client (if using client-side auth)
npm install @google/sheets

# For form handling (optional)
npm install react-hook-form @hookform/resolvers
```

#### Backend API Routes (Example with Vercel Serverless)

Create API routes in `api/` directory:

```
api/
├── sheets/
│   └── create.ts       # POST /api/sheets/create
└── chatwork/
    └── send.ts         # POST /api/chatwork/send
```

Example serverless function:

```ts
// api/sheets/create.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { google } from 'googleapis'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const formData = req.body

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Create spreadsheet
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `制作依頼_${formData.requesterName}_${new Date().toISOString()}`,
        },
        sheets: [{
          properties: { title: '依頼内容' },
          data: [{
            rowData: [
              { values: [{ userEnteredValue: { stringValue: 'Field' }}, { userEnteredValue: { stringValue: 'Value' }}]},
              // Add all form fields...
            ],
          }],
        }],
      },
    })

    return res.status(200).json({
      spreadsheetId: response.data.spreadsheetId,
      spreadsheetUrl: response.data.spreadsheetUrl,
    })
  } catch (error) {
    console.error('Error creating spreadsheet:', error)
    return res.status(500).json({ error: 'Failed to create spreadsheet' })
  }
}
```

### Environment Setup

1. **Create `.env` file**:
```bash
cp .env.example .env
```

2. **Add to `.gitignore`**:
```gitignore
.env
.env.local
.env.*.local
```

3. **Create `.env.example`** for documentation:
```env
# Google Sheets API (backend only)
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=

# ChatWork API (backend only)
CHATWORK_API_TOKEN=
CHATWORK_ROOM_ID=

# Public variables (can be prefixed with VITE_)
VITE_APP_TITLE="Production Request Form"
```

## Testing Builds

Always test both dev and production builds:
```bash
npm run build  # Must pass TypeScript checks + Vite build
npm run preview  # Test production build locally
```

### Testing Checklist

- [ ] All form fields render correctly
- [ ] Validation works for required fields
- [ ] Conditional fields show/hide correctly
- [ ] L-Step section appears only for L-Step page types
- [ ] New URL field appears only for "新規作成・移管"
- [ ] Meta fields validation works with "お任せ" checkbox
- [ ] Form submission creates spreadsheet
- [ ] ChatWork notification is sent
- [ ] Success message displays with spreadsheet link
- [ ] Error handling works for API failures
- [ ] Loading states display during submission
