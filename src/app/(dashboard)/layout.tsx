import { redirect } from "next/navigation"
import { Sidebar } from "@/components/ui/navigation/sidebar"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="mx-auto max-w-screen-2xl bg-surface-base">
      <Sidebar />
      <main className="lg:pl-72">
        <div className="px-4 pb-12 pt-6 sm:px-6 sm:pt-10 lg:px-10 lg:pt-10">
          {children}
        </div>
      </main>
    </div>
  )
}
