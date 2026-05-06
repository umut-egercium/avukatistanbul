import { Coins, Mail, Receipt, Wallet } from "lucide-react";

const COMING_FEATURES = [
  {
    icon: Wallet,
    title: "Kredi paketleri",
    body: "Aylık abonelik yok; ihtiyacınıza göre kredi yüklersiniz. Yalnızca açtığınız (iletişim bilgisini görüntülediğiniz) lead'ler için kredi düşer.",
  },
  {
    icon: Receipt,
    title: "Şeffaf hareket geçmişi",
    body: "Her kredi yüklemesini, lead başına yapılan kesintileri ve iadeleri tek bir hareket listesinde görürsünüz.",
  },
  {
    icon: Coins,
    title: "Düşük bakiye uyarısı",
    body: "Bakiyeniz lead almaya yetmediğinde panelinizde uyarı belirir; otomatik yüklemeyi açabilirsiniz.",
  },
];

export default function PanelCredits() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">Krediler</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Kredi yükleme yakında
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          AvukatIstanbul kredi sistemi ve ödeme akışı şu sıralar
          tamamlanıyor. Bu süreçte size yönlendirilen lead'ler için
          herhangi bir ücret alınmaz; doğrulanmış hesabınızla doğrudan
          ücretsiz teklif gönderebilirsiniz.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {COMING_FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="bg-card rounded-xl border border-border/70 p-5"
            >
              <span className="grid place-items-center w-10 h-10 rounded-md bg-accent/10 text-accent">
                <Icon className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <h2 className="mt-3 font-serif text-base font-semibold tracking-tight">
                {f.title}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {f.body}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-xl border border-dashed border-border bg-secondary/40 p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold tracking-tight">
          Önceden bildirim almak ister misiniz?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl">
          Kredi sistemi açıldığında erken bilgilendirilmek için bize
          yazın; ilk yüklemenizde geçerli olacak indirim koduyla size
          dönelim.
        </p>
        <a
          href="mailto:hello@avukatistanbul.net?subject=Kredi%20sistemi%20bildirimi"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          <Mail className="w-4 h-4" />
          hello@avukatistanbul.net
        </a>
      </section>
    </div>
  );
}
