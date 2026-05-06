// Blog post catalog. The body of each post lives in src/content/blog/<slug>.tsx
// as a default-exported React node. This file holds metadata only — title,
// excerpt, practice-area binding, publish date, reading time — used by the
// /blog index, the /blog/<slug> page header, and the sitemap.
//
// Rules:
//   - `slug` is ASCII kebab-case, must be unique, and is the URL.
//   - `practiceArea` MUST match a slug in src/data/legalCategories.ts.
//   - `publishedAt` is ISO date "YYYY-MM-DD".
//   - `readingTimeMinutes` is a small integer estimate (~250 words/min).

export interface BlogPost {
  slug: string;
  title: string;
  /** 1-2 sentences for cards, meta description, and the post header. */
  excerpt: string;
  /** Slug of the matching legal category. */
  practiceArea: string;
  /** ISO date "YYYY-MM-DD". */
  publishedAt: string;
  readingTimeMinutes: number;
  authorName: string;
}

const EDITOR = "AvukatIstanbul Editörü";

export const BLOG_POSTS: BlogPost[] = [
  // Boşanma Hukuku
  {
    slug: "anlasmali-bosanma-2026-sure-sartlar-maliyet",
    title: "Anlaşmalı Boşanma 2026: Süre, Şartlar ve Maliyet",
    excerpt:
      "Eşler en az 1 yıldır evli ise, hakim huzurunda boşanma protokolü ile genellikle tek celsede sonuca varılır. 2026 itibarıyla anlaşmalı boşanmanın kaç ay sürdüğünü, harç ve avukat ücretlerini, protokolde yer alması gereken zorunlu maddeleri ele alıyoruz.",
    practiceArea: "bosanma-hukuku",
    publishedAt: "2026-05-02",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "cekismeli-bosanmada-tanik-ve-delil",
    title: "Çekişmeli Boşanmada Tanık ve Delil: Neye Hangi Ağırlık Verilir?",
    excerpt:
      "Tanık ifadesi, WhatsApp yazışmaları, sosyal medya çıktıları, polis tutanağı ve tıbbi rapor — çekişmeli boşanma davasında her delilin ispat değeri farklıdır. Hukuka aykırı yollarla elde edilen delillerin akıbetini de açıklıyoruz.",
    practiceArea: "bosanma-hukuku",
    publishedAt: "2026-04-22",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "bosanmada-mal-paylasimi-edinilmis-mallara-katilma",
    title: "Boşanmada Mal Paylaşımı: Edinilmiş Mallara Katılma Rejimi",
    excerpt:
      "1 Ocak 2002 sonrasında evlenenler için yasal mal rejimi edinilmiş mallara katılmadır (TMK m. 218). Edinilmiş mal nedir, kişisel mal nedir, katılma alacağı nasıl hesaplanır — uygulamalı örneklerle anlatıyoruz.",
    practiceArea: "bosanma-hukuku",
    publishedAt: "2026-04-08",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },

  // Ceza Hukuku
  {
    slug: "ifade-verirken-avukat-hakki",
    title: "İfade Verirken Avukat Hakkı: Ne Zaman ve Nasıl Talep Edilir?",
    excerpt:
      "CMK m. 147 uyarınca şüpheli ifade verirken müdafi hakkından yararlanır. Karakolda, savcılıkta ve hakimlik sorgusunda avukat talebinizin nasıl tutanağa geçirildiğini, ücretsiz baro avukatı (CMK avukatı) atamasının nasıl yapıldığını anlatıyoruz.",
    practiceArea: "ceza-hukuku",
    publishedAt: "2026-04-29",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "hakaret-sucu-tck-125-para-cezasi-mi-hapis-mi",
    title: "Hakaret Suçu (TCK m. 125): Para Cezası mı, Hapis mi?",
    excerpt:
      "Hakaret suçunun cezası 3 ay-2 yıl arası hapis veya adli para cezasıdır. Sosyal medya hakareti, alenen işlenmesi, kamu görevlisine karşı işlenmesi gibi nitelikli haller, ceza miktarını ve uzlaştırma seçeneğini doğrudan etkiler.",
    practiceArea: "ceza-hukuku",
    publishedAt: "2026-04-15",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "uzlastirma-hangi-suclar-kapsaminda",
    title: "Uzlaştırma Nedir? Hangi Suçlar Uzlaştırma Kapsamındadır?",
    excerpt:
      "CMK m. 253 uyarınca taksirle yaralama, hakaret, tehdit, mala zarar verme gibi pek çok suçta uzlaştırma zorunludur. Mağdur ve fail bir araya gelmeden, uzlaştırmacı eliyle yürüyen sürecin sonuçlarını detaylandırıyoruz.",
    practiceArea: "ceza-hukuku",
    publishedAt: "2026-04-01",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },

  // İş Hukuku
  {
    slug: "kidem-ve-ihbar-tazminati-2026",
    title: "Kıdem ve İhbar Tazminatı 2026: Kim, Ne Kadar Alır?",
    excerpt:
      "Kıdem tazminatı için en az 1 yıl çalışma şartı vardır; ihbar süresi ise hizmet süresine göre 2-8 hafta arasıdır. Hesaplama formülünü, 2026 kıdem tavanını ve haklı fesih hâllerini güncel rakamlarla ele alıyoruz.",
    practiceArea: "is-hukuku",
    publishedAt: "2026-05-05",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },
  {
    slug: "ise-iade-davasi-sartlar-sureler",
    title: "İşe İade Davası: Şartlar, Süreler ve Sonuçlar",
    excerpt:
      "30+ işçi çalıştıran işyerinde, en az 6 aylık kıdemi olan işçi, geçerli sebep gösterilmeden çıkarıldığında işe iade davası açabilir. Önce arabuluculuk zorunlu — fesih bildirim tarihinden itibaren 1 ay içinde başvurulur.",
    practiceArea: "is-hukuku",
    publishedAt: "2026-04-19",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "mobbing-davasi-nasil-acilir",
    title: "Mobbing Davası Nasıl Açılır? Hangi Deliller Geçerli?",
    excerpt:
      "Mobbing, işyerinde sistematik yıldırma davranışıdır; tek bir olay yeterli değildir. E-posta, mesaj, tanık, performans değerlendirmesi gibi delilerle mobbingin ispatı, manevi tazminat ve haklı fesih sonuçları üzerine pratik bir rehber.",
    practiceArea: "is-hukuku",
    publishedAt: "2026-04-04",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },

  // Tazminat Hukuku
  {
    slug: "trafik-kazasinda-maddi-manevi-tazminat",
    title: "Trafik Kazasında Maddi-Manevi Tazminat: Kimden, Ne Kadar?",
    excerpt:
      "Trafik kazasında zarar gören; kusurlu sürücü, araç sahibi, işleten ve zorunlu trafik sigortacısına karşı dava açabilir. Geçici-sürekli iş göremezlik, destekten yoksun kalma ve manevi tazminat kalemlerini sırayla açıklıyoruz.",
    practiceArea: "tazminat-hukuku",
    publishedAt: "2026-05-04",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },
  {
    slug: "is-kazasi-tazminati-sgk-isveren-sorumlulugu",
    title: "İş Kazası Tazminatı: SGK ve İşveren Sorumluluğu Birlikte Nasıl İşler?",
    excerpt:
      "İş kazasında SGK'dan alınan iş göremezlik geliri ile işverenden talep edilen maddi-manevi tazminat ayrı ayrı taleplerdir. Hakkaniyet indirimi, kusur oranı ve hesap bilirkişisi raporu uygulamada belirleyici olur.",
    practiceArea: "tazminat-hukuku",
    publishedAt: "2026-04-21",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "doktor-hatasi-malpraktis-davasi",
    title: "Doktor Hatası (Malpraktis) Davası: Şartlar ve Süreç",
    excerpt:
      "Tıbbi standarttan sapma, kusurun ispatı ve illiyet bağı — malpraktis davasında belirleyici üç unsur. Adli Tıp veya Yüksek Sağlık Şurası bilirkişiliği, kamu hastanesinde idari yargı yolu ve özel hastanede tüketici/asliye hukuk yolları arasındaki farkı ele alıyoruz.",
    practiceArea: "tazminat-hukuku",
    publishedAt: "2026-04-06",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },

  // Miras Hukuku
  {
    slug: "mirasin-reddi-tmk-605-borcttan-kurtulma",
    title: "Mirasın Reddi (TMK m. 605): Süreler ve Borçtan Kurtulma",
    excerpt:
      "Mirasın gerçek reddi 3 ay içinde sulh hukuk mahkemesine başvuruyla yapılır. Hükmen ret, mirasın hükmen reddi sonuçları ve borca batık tereke uygulamasını örneklerle anlatıyoruz.",
    practiceArea: "miras-hukuku",
    publishedAt: "2026-05-01",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "vasiyetname-iptali-davasi",
    title: "Vasiyetnamenin İptali Davası: Kim, Hangi Hâllerde Açabilir?",
    excerpt:
      "Şekil eksikliği, ehliyetsizlik, irade sakatlığı veya saklı paya tecavüz hâllerinde mirasçılar vasiyetname iptali davası açabilir. Tenkis davası ile farkını, dava süresini ve uygulamada en sık karşılaşılan iptal sebeplerini ele alıyoruz.",
    practiceArea: "miras-hukuku",
    publishedAt: "2026-04-17",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "muris-muvazaasi-mirastan-mal-kacirma",
    title: "Muris Muvazaası: Mirastan Mal Kaçırma Davası",
    excerpt:
      "Murisin sağlığında bir mirasçısını saklı paydan yoksun bırakmak amacıyla yaptığı görünürde satışlar, muvazaa nedeniyle geçersizdir. 1.4.1974 tarihli İBK ışığında, taşınmaz tapusunun iptali ve tescili nasıl talep edilir?",
    practiceArea: "miras-hukuku",
    publishedAt: "2026-04-03",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },

  // Gayrimenkul & Kira Hukuku
  {
    slug: "tahliye-davasi-2026-sebepler",
    title: "Tahliye Davası 2026: Kiracıyı Hangi Sebeplerle Çıkartırsınız?",
    excerpt:
      "İhtiyaç, yeniden inşa, iki haklı ihtar, temerrüt ve 10 yıllık uzama dönemi — TBK çerçevesinde en sık başvurulan tahliye sebepleri. 2026'da kira hukukunun istisnai 25% sınırının kalkmasıyla ilgili güncel durumu da netleştiriyoruz.",
    practiceArea: "gayrimenkul-kira-hukuku",
    publishedAt: "2026-05-03",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },
  {
    slug: "kira-artisi-2026-tufe-kira-tespit-davasi",
    title: "Kira Artışı 2026: TÜFE Oranı ve Kira Tespit Davası",
    excerpt:
      "Konut kiraları için yıllık artış sınırı, son 12 aylık TÜFE ortalamasıdır. 5 yıl dolduğunda hâkim, hak ve nesafete göre yeni kira bedelini belirler. Kira tespit davası açma zamanı ve dava sürerken kiranın belirsizliği konularını ele alıyoruz.",
    practiceArea: "gayrimenkul-kira-hukuku",
    publishedAt: "2026-04-23",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "tapu-iptal-ve-tescil-davasi",
    title: "Tapu İptal ve Tescil Davası: En Sık Karşılaşılan Senaryolar",
    excerpt:
      "Hile, gabin, ehliyetsizlik, muris muvazaası veya yolsuz tescil — her senaryoda dava süresi ve görevli mahkeme farklıdır. İstanbul'da tapu iptal davalarında bilirkişi keşfi ve ön ödemeli satışlardaki tescil engellerini açıklıyoruz.",
    practiceArea: "gayrimenkul-kira-hukuku",
    publishedAt: "2026-04-09",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },

  // Ticaret Hukuku
  {
    slug: "limited-sirket-kurulusu-2026-adimlar-maliyet",
    title: "Limited Şirket Kuruluşu 2026: Adımlar, Maliyet, Vergi",
    excerpt:
      "Asgari 50.000 TL sermayeli limited şirket kuruluşu, MERSİS üzerinden e-imza ile dakikalar içinde başlar. Ana sözleşme, vergi dairesi açılışı, SGK işyeri tescili ve KEP zorunluluklarını adım adım gösteriyoruz.",
    practiceArea: "ticaret-hukuku",
    publishedAt: "2026-04-30",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },
  {
    slug: "anonim-sirkette-pay-devri-genel-kurul-iptali",
    title: "Anonim Şirkette Pay Devri ve Genel Kurul Kararının İptali",
    excerpt:
      "Nama yazılı pay devirlerinde yönetim kurulu onayı, hamiline yazılı paylarda MKK bildirimi zorunludur. TTK m. 445 vd. uyarınca genel kurul kararının iptali davası şartları ve 3 aylık hak düşürücü süreyi açıklıyoruz.",
    practiceArea: "ticaret-hukuku",
    publishedAt: "2026-04-16",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },
  {
    slug: "ticari-sozlesmelerde-haksiz-sart-cezai-sart",
    title: "Ticari Sözleşmelerde Haksız Şart ve Cezai Şart",
    excerpt:
      "Tacirler arasındaki sözleşmelerde cezai şart kural olarak indirilemez (TBK m. 182, TTK m. 22). Tüketici sözleşmelerinde ise haksız şart denetimi sıkıdır. İki rejim arasındaki farkları ticari hayattan örneklerle gösteriyoruz.",
    practiceArea: "ticaret-hukuku",
    publishedAt: "2026-04-02",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },

  // İcra & İflas Hukuku
  {
    slug: "ilamli-ilamsiz-icra-takibi",
    title: "İlamlı ve İlamsız İcra Takibi: Hangi Yol, Ne Zaman?",
    excerpt:
      "Mahkeme kararı, kambiyo senedi veya kira sözleşmesi varsa ilamlı veya kambiyoya özgü takip; aksi hâlde ilamsız icra. Türleri, itiraz sürelerini ve uygulamada en sık yapılan hataları ele alıyoruz.",
    practiceArea: "icra-iflas-hukuku",
    publishedAt: "2026-04-28",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "icraya-itiraz-7-gun-itirazin-iptali",
    title: "İcraya İtiraz: 7 Günlük Süre ve İtirazın İptali Davası",
    excerpt:
      "İlamsız icrada borçlu, ödeme emrinin tebliğinden itibaren 7 gün içinde itiraz ederse takip durur. Alacaklı 1 yıl içinde itirazın iptali (genel mahkemede) veya itirazın kaldırılması (icra mahkemesinde) yoluna başvurabilir.",
    practiceArea: "icra-iflas-hukuku",
    publishedAt: "2026-04-13",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "maas-haczi-ne-kadari-haczedilebilir",
    title: "Maaş Haczi: Ne Kadarı Haczedilebilir? İİK m. 83 Sınırları",
    excerpt:
      "İİK m. 83 uyarınca maaşın 1/4'ü haczedilebilir; nafaka alacakları bu sınıra tabi değildir. Asgari ücret düzeyindeki kazanç, emekli maaşı ve birden fazla haciz arasındaki sıralamayı pratik örneklerle açıklıyoruz.",
    practiceArea: "icra-iflas-hukuku",
    publishedAt: "2026-03-30",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },

  // Aile Hukuku
  {
    slug: "velayet-degisikligi-davasi",
    title: "Velayet Değişikliği Davası: Hangi Hâllerde Açılır?",
    excerpt:
      "Velayet kararı kesin hüküm değildir. Çocuğun üstün yararını etkileyen yeni bir gelişme — sağlık, ekonomik durum, ihmal — varsa diğer eş velayet değişikliği davası açabilir. Yargıtay uygulamasında ortak velayet kararlarını da ele alıyoruz.",
    practiceArea: "aile-hukuku",
    publishedAt: "2026-04-26",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "6284-uzaklastirma-karari-nasil-alinir",
    title: "6284 Sayılı Kanunla Uzaklaştırma Kararı Nasıl Alınır?",
    excerpt:
      "Aile içi şiddet veya tehdit durumunda en yakın karakola, savcılığa veya doğrudan Aile Mahkemesine başvurarak avukatsız da uzaklaştırma kararı talep edebilirsiniz. Karar, tedbir niteliğinde olup 6 aya kadar uzayabilir.",
    practiceArea: "aile-hukuku",
    publishedAt: "2026-04-11",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "evlat-edinme-tek-cift-yetiskin",
    title: "Evlat Edinme: Tek Eşli, Çift Eşli ve Yetişkin Evlat Edinme",
    excerpt:
      "TMK m. 305 vd. uyarınca evlat edinen kişinin 30 yaşını doldurmuş ve evlat edinilenle aralarında en az 18 yaş fark olması gerekir. Evli çiftlerin birlikte evlat edinmesi, üvey çocuk ve yetişkin evlat edinme hâllerini sırayla açıklıyoruz.",
    practiceArea: "aile-hukuku",
    publishedAt: "2026-03-28",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },

  // Tüketici Hukuku
  {
    slug: "ayipli-arac-davasi-secimlik-haklar",
    title: "Ayıplı Araç Davası: Sözleşmeden Dönme, Bedel İndirimi, Yenisi",
    excerpt:
      "Ayıplı araçta tüketici 4 seçimlik haktan birini kullanabilir (6502 SK m. 11): sözleşmeden dönme, bedel indirimi, ücretsiz onarım veya yenisi ile değiştirme. Açık ayıp ile gizli ayıp arasındaki süre farkını netleştiriyoruz.",
    practiceArea: "tuketici-hukuku",
    publishedAt: "2026-04-25",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "tuketici-hakem-heyeti-2026-parasal-sinir",
    title: "Tüketici Hakem Heyeti 2026: Parasal Sınır ve Süreç",
    excerpt:
      "2026 itibarıyla tüketici hakem heyetlerinin yıllık parasal sınırının üzerindeki uyuşmazlıklar tüketici mahkemesinde görülür. Başvuru evrakı, dosyanın toplanması ve hakem heyeti kararına itiraz yolunu pratik bir checklist ile veriyoruz.",
    practiceArea: "tuketici-hukuku",
    publishedAt: "2026-04-12",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "banka-kredi-karti-ucretleri-iadesi",
    title: "Banka ve Kredi Kartı Ücretleri Davası: Geri Alma Yolları",
    excerpt:
      "Yıllık üyelik aidatı, dosya masrafı, hayat sigortası primi gibi haksız tahsil edilen banka ücretleri, hakem heyeti veya tüketici mahkemesi yoluyla geri alınabilir. Zamanaşımı 10 yıl; faiz hesabını uygulamadan örneklerle gösteriyoruz.",
    practiceArea: "tuketici-hukuku",
    publishedAt: "2026-03-29",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },

  // Yabancılar & Vatandaşlık Hukuku
  {
    slug: "turk-vatandasligi-2026-kazanma-yollari",
    title: "Türk Vatandaşlığı 2026: Kazanma Yolları ve Şartlar",
    excerpt:
      "Yetkili makam kararı, evlilik, taşınmaz veya yatırım yoluyla istisnai vatandaşlık (5901 SK m. 12). Asgari ikamet süreleri, vatandaşlık komisyonu mülakatı ve son güncel sermaye/yatırım eşiklerini ele alıyoruz.",
    practiceArea: "yabancilar-hukuku",
    publishedAt: "2026-05-01",
    readingTimeMinutes: 6,
    authorName: EDITOR,
  },
  {
    slug: "sinir-disi-kararina-itiraz",
    title: "Sınır Dışı Etme Kararına İtiraz: 7 Günlük Sürede Ne Yapılır?",
    excerpt:
      "YUKK (6458 SK) m. 53 uyarınca sınır dışı kararının tebliğinden itibaren 7 gün içinde idare mahkemesine itiraz edilir. İtiraz süresi içinde ve sonrasında geri gönderim yasağına ilişkin Anayasa Mahkemesi içtihatlarını da değerlendiriyoruz.",
    practiceArea: "yabancilar-hukuku",
    publishedAt: "2026-04-18",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "calisma-izni-basvurusu-ve-reddine-itiraz",
    title: "Çalışma İzni Başvurusu ve Reddine İtiraz",
    excerpt:
      "İşveren, e-Devlet üzerinden çalışma izni başvurusunu yapar; karar Aile, Çalışma ve Sosyal Hizmetler Bakanlığınca verilir. Ret kararına 30 gün içinde idari itiraz, akabinde idare mahkemesinde dava yolunu netleştiriyoruz.",
    practiceArea: "yabancilar-hukuku",
    publishedAt: "2026-04-05",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },

  // KVKK & Bilişim Hukuku
  {
    slug: "kvkk-veri-ihlali-bildirimi-72-saat",
    title: "KVKK Veri İhlali Bildirimi: 72 Saat Kuralı ve Süreç",
    excerpt:
      "Veri sorumlusu, bir veri ihlalinden haberdar olduğu andan itibaren en geç 72 saat içinde Kurul'a bildirimde bulunmak zorundadır (KVKK m. 12/5). Etkilenen kişilere bildirim, müteakip Kurul incelemesi ve 2026 idari para cezası alt-üst sınırlarını ele alıyoruz.",
    practiceArea: "kvkk-bilisim-hukuku",
    publishedAt: "2026-04-27",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "sosyal-medyada-hakaret-url-kapatma",
    title: "Sosyal Medyada Hakaret: URL Kapatma ve Suç Duyurusu",
    excerpt:
      "5651 sayılı Kanun çerçevesinde Sulh Ceza Hâkimliğine içerik çıkarma / erişim engelleme başvurusu, hakaret içeren paylaşımlar için 24 saat içinde sonuçlanabilir. Hakaret suçu duyurusu ve manevi tazminat davasını birlikte yürütme stratejisini açıklıyoruz.",
    practiceArea: "kvkk-bilisim-hukuku",
    publishedAt: "2026-04-14",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
  {
    slug: "bilisim-sistemleri-dolandiriciligi-tck-158",
    title: "Bilişim Sistemleri Dolandırıcılığı (TCK 158/1-f): Yargılama ve Ceza",
    excerpt:
      "Bilişim sistemleri kullanılarak işlenen dolandırıcılık nitelikli hâl olup 4-10 yıl hapis ve adli para cezası gerektirir. Banka hesabınızdan rızanız dışında çekim yapıldığında izlenecek 24-48 saatlik ilk müdahale planını sunuyoruz.",
    practiceArea: "kvkk-bilisim-hukuku",
    publishedAt: "2026-03-31",
    readingTimeMinutes: 5,
    authorName: EDITOR,
  },
];

/** Posts sorted by publishedAt DESC for the index. */
export const BLOG_POSTS_NEWEST_FIRST = [...BLOG_POSTS].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function findBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function relatedBlogPosts(slug: string, max = 3): BlogPost[] {
  const post = findBlogPost(slug);
  if (!post) return [];
  return BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.practiceArea === post.practiceArea,
  ).slice(0, max);
}
