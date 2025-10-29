import { ProductionRequestForm } from '@/components/form/ProductionRequestForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            制作依頼フォーム
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            LP・フォームの制作依頼はこちらから。必要な情報を入力して送信してください。
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <ProductionRequestForm />
        </main>

        <footer className="text-center mt-16 pb-8">
          <p className="text-sm text-muted-foreground">
            制作依頼フォーム © 2025
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
