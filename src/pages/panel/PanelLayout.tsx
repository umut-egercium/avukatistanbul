import { Outlet } from "react-router-dom";

import { AuthGate } from "@/components/auth/AuthGate";
import PanelSidebar from "@/components/panel/PanelSidebar";
import { MetaTags } from "@/components/seo/MetaTags";

export default function PanelLayout() {
  return (
    <AuthGate role="lawyer">
      <MetaTags
        title="Avukat Paneli"
        description="AvukatIstanbul avukat paneli — gelen talepler, teklifler, profil ve doğrulama."
        path={null}
        noindex
      />

      <div className="min-h-screen bg-secondary/40">
        <div className="container-main py-6 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 lg:gap-10">
            <aside className="lg:sticky lg:top-6 lg:self-start lg:h-[calc(100vh-3rem)] bg-card rounded-xl border border-border/70 p-4">
              <PanelSidebar />
            </aside>

            <main className="min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
