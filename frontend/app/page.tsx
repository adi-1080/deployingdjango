import { AuthProvider } from "@/components/auth/auth-provider"
import { AppRouter } from "@/components/app-router"

export default function Home() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
