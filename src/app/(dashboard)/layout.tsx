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
    <div className="mx-auto max-w-screen-2xl">
      <Sidebar />
      <main className="lg:pl-72">
        <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
          {children}
        </div>
      </main>
    </div>
  )
}
