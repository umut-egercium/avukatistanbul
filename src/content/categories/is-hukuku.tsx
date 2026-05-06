// Long-form content for /hizmetler/is-hukuku.
// Targets "iş avukatı istanbul". 4857 sayılı İş Kanunu, 7036 İş Mahkemeleri
// Kanunu ve 6098 sayılı TBK referansları.

import type { CategoryArticle } from "./bosanma-hukuku";

export const isHukukuArticle: CategoryArticle = {
  lead: "İşten haksız çıkarılma, ödenmeyen ücret ve fazla mesai, kıdem-ihbar tazminatı, mobbing ve işe iade davalarında doğru bir avukatla çalışmak süreyi ve sonucu doğrudan etkiler. AvukatIstanbul, İstanbul İş Mahkemelerinde dava deneyimi olan İş Hukuku alanında çalışan avukatları sizinle aynı gün içinde buluşturur.",
  sections: [
    {
      id: "is-hukuku-nedir",
      title: "İş hukuku ve İstanbul iş mahkemeleri",
      body: (
        <>
          <p>
            İş hukuku, işçi ile işveren arasındaki bireysel ve toplu çalışma
            ilişkilerini düzenleyen hukuk dalıdır. Temel kanun{" "}
            <strong>4857 sayılı İş Kanunu</strong>'dur; deniz, basın ve
            kapıcılık gibi özel iş ilişkileri için ayrı kanunlar uygulanır.
            Sosyal güvenlik tarafı için <strong>5510 sayılı Sosyal Sigortalar
            ve Genel Sağlık Sigortası Kanunu</strong>, sözleşme genel teorisi
            için ise <strong>6098 sayılı Türk Borçlar Kanunu (TBK)</strong>{" "}
            tamamlayıcı kaynaklardır.
          </p>
          <p>
            İşçilik alacakları ve işe iade davaları{" "}
            <strong>İş Mahkemelerinde</strong> görülür. İstanbul'da büyük iş
            mahkemesi yoğunluğu Çağlayan, Bakırköy ve Anadolu (Kartal)
            adliyelerinde olup{" "}
            <strong>7036 sayılı İş Mahkemeleri Kanunu</strong> uyarınca dava
            açmadan önce <strong>arabuluculuk</strong> başvurusu zorunludur.
          </p>
        </>
      ),
    },
    {
      id: "isci-temel-haklar",
      title: "İşçinin temel hakları",
      body: (
        <>
          <p>
            4857 sayılı Kanun, işçiye birçok zorunlu hak ve güvence tanır.
            Bunların başlıcaları:
          </p>
          <ul>
            <li>
              <strong>Yazılı iş sözleşmesi (İK m. 8):</strong> Süresi 1 yıl ve
              daha fazla olan iş sözleşmelerinin yazılı yapılması zorunludur.
            </li>
            <li>
              <strong>Asgari ücret ve gecikmesiz ödeme (İK m. 32, 39):</strong>{" "}
              Ücret en geç ayda bir kez ve banka kanalıyla ödenmelidir; 20
              günden fazla geciktirilirse işçi haklı fesih sebebine sahip olur.
            </li>
            <li>
              <strong>Yıllık izin (İK m. 53):</strong> 1-5 yıl arası 14, 5-15
              yıl arası 20, 15 yıl ve üstü 26 iş günü. Kullanılmayan izinler
              fesihte ücrete dönüşür (İK m. 59).
            </li>
            <li>
              <strong>Fazla mesai (İK m. 41):</strong> Haftalık 45 saati aşan
              çalışmalar fazla mesai olup saat ücretinin %50 zamlısıyla
              ödenir; yıllık 270 saatin üstünde işçinin yazılı onayı gerekir.
            </li>
            <li>
              <strong>Hafta tatili ve ulusal bayram (İK m. 46, 47):</strong>{" "}
              Çalışılan hafta tatili veya ulusal bayram ücretleri ayrı ayrı
              hesaplanır.
            </li>
            <li>
              <strong>SGK bildirimi (5510 SK):</strong> İşe başlamadan en geç
              bir gün önce SGK'ya bildirim zorunlu; "sigortasız çalıştırma"
              hem işveren için idari para cezası hem de işçi için tespit
              davası nedenidir.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "fesih-turleri",
      title: "Fesih türleri: haklı, geçerli, geçersiz",
      body: (
        <>
          <p>
            İş sözleşmesinin sona ermesi, fesihten kaynaklandığında üç farklı
            sonuç doğurabilir:
          </p>
          <h3>Haklı fesih (İK m. 24, 25)</h3>
          <ul>
            <li>
              İşçi açısından: ücretin ödenmemesi, ahlâk ve iyi niyet kurallarına
              uymayan davranışlar (hakaret, taciz), sağlık sebepleri.
            </li>
            <li>
              İşveren açısından: işçinin sadakat yükümlülüğüne aykırılık,
              işyerinde 7 gün üst üste haksız devamsızlık, hırsızlık, görevini
              yerine getirmeme.
            </li>
            <li>
              Haklı fesih, 6 iş günü içinde ve fesih sebebini öğrendikten en
              geç 1 yıl içinde yapılmalıdır (İK m. 26).
            </li>
          </ul>
          <h3>Geçerli (haklı olmayan) fesih</h3>
          <p>
            İşletme gerekleri, performans düşüklüğü gibi makul sebeplerle
            yapılan fesih. İşçi kıdem ve ihbar tazminatına hak kazanır;
            koşullar oluşmuşsa işe iade davası açabilir.
          </p>
          <h3>Geçersiz fesih</h3>
          <p>
            Yazılı bildirim, somut sebep, savunma alma gibi şekil şartlarına
            uyulmadan yapılan fesih (İK m. 19). Mahkeme feshi geçersiz sayar
            ve işçinin işe iadesine hükmeder.
          </p>
        </>
      ),
    },
    {
      id: "kidem-ihbar-fazla-mesai",
      title: "Kıdem, ihbar tazminatı ve fazla mesai alacağı",
      body: (
        <>
          <h3>Kıdem tazminatı</h3>
          <ul>
            <li>
              <strong>Şart:</strong> En az 1 yıllık kıdem ve İK m. 14'te
              sayılan sebeplerden biriyle iş sözleşmesinin sona ermesi
              (işverenin haklı fesih dışı feshi, işçinin haklı feshi, askerlik,
              emeklilik, kadın için evlilik vb.).
            </li>
            <li>
              <strong>Hesabı:</strong> Her tam yıl için <strong>30 günlük
              giydirilmiş brüt ücret</strong>. Yol, yemek, prim, ikramiye gibi
              süreklilik arz eden ek ödemeler giydirilmiş ücrete dahildir.
            </li>
            <li>
              <strong>Kıdem tavanı:</strong> Memur kıdem tazminatı tavanı
              esas alınır; her yıl güncellenir.
            </li>
          </ul>
          <h3>İhbar tazminatı (İK m. 17)</h3>
          <ul>
            <li>6 aydan az: 2 hafta</li>
            <li>6 ay – 1.5 yıl: 4 hafta</li>
            <li>1.5 – 3 yıl: 6 hafta</li>
            <li>3 yıldan fazla: 8 hafta</li>
          </ul>
          <p>
            İhbar süresinin bildirimle çalıştırılması esastır; çalıştırılmazsa
            tutarı ihbar tazminatı olarak ödenir.
          </p>
          <h3>Fazla mesai ve hafta tatili alacağı</h3>
          <p>
            Fazla mesainin ispat yükü işçidedir. Tanık, mesai çizelgesi, giriş-
            çıkış kayıtları ve e-posta yazışmaları başlıca delillerdir.
            Yargıtay uygulamasında, sürekli fazla mesai iddialarında <strong>
            takdiri indirim</strong> uygulanır.
          </p>
        </>
      ),
    },
    {
      id: "ise-iade-davasi",
      title: "İşe iade davası: koşullar, süreç, sonuç",
      body: (
        <>
          <p>
            İK m. 18 vd. uyarınca işe iade davasının koşulları:
          </p>
          <ul>
            <li>
              İşyerinde <strong>30 ve daha fazla işçi</strong> çalıştırılması.
            </li>
            <li>
              İşçinin <strong>en az 6 ay kıdemi</strong> olması (yer altı
              maden işlerinde 6 ay şartı aranmaz).
            </li>
            <li>
              <strong>Belirsiz süreli</strong> iş sözleşmesiyle çalışıyor
              olması.
            </li>
            <li>
              Feshin <strong>geçerli sebebe</strong> dayanmaması veya yazılı
              olarak bildirilmemesi.
            </li>
          </ul>
          <p>
            Süreç: Fesih bildiriminden itibaren <strong>1 ay içinde</strong>{" "}
            arabuluculuk başvurusu, anlaşma sağlanamazsa <strong>2 hafta
            içinde</strong> iş mahkemesinde dava (7036 SK m. 3, 11). Dava süresi
            İstanbul'da ortalama 6-12 aydır.
          </p>
          <p>
            Karar lehe çıkarsa: işveren kararın kesinleşmesinden sonra 10 iş
            günü içinde işçiyi işe başlatmak zorundadır. Başlatmazsa{" "}
            <strong>4-8 aylık ücret tutarında iş güvencesi tazminatı</strong> ve
            karar tarihine kadar <strong>en fazla 4 aylık boşta geçen süre
            ücreti</strong> ödenir.
          </p>
        </>
      ),
    },
    {
      id: "mobbing-manevi-tazminat",
      title: "Mobbing ve manevi tazminat",
      body: (
        <>
          <p>
            Mobbing, işyerinde sistematik biçimde yıldırma, dışlama ve psikolojik
            taciz davranışlarıdır. Tek bir olay yeterli olmayıp{" "}
            <strong>süreklilik</strong> aranır. Yargıtay 9. Hukuk Dairesi, e-
            posta zincirleri, mesaj kayıtları, performans değerlendirmesindeki
            ani ve gerekçesiz değişiklikler ve tanık beyanlarını başlıca
            delil olarak kabul etmektedir.
          </p>
          <p>
            Mobbing kanıtlandığında işçi:
          </p>
          <ul>
            <li>
              İK m. 24/II uyarınca <strong>haklı feshe</strong> başvurabilir,
              kıdem tazminatına hak kazanır.
            </li>
            <li>
              TBK m. 56 uyarınca <strong>manevi tazminat</strong> talep edebilir.
            </li>
            <li>
              Hakaret, tehdit, cinsel taciz boyutuna varan davranışlar için
              ayrıca <strong>ceza şikâyetinde</strong> bulunabilir.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda iş avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              İşten çıkarıldınız ve <strong>kıdem-ihbar tazminatı veya
              ödenmemiş ücret/fazla mesai</strong> alacaklarınız var.
            </li>
            <li>
              <strong>İşe iade</strong> davası açacak koşullara sahipsiniz —
              sadece 1 ay arabuluculuk süreniz var.
            </li>
            <li>
              <strong>Mobbing</strong> veya cinsel taciz nedeniyle haklı fesih
              ve manevi tazminat talep edeceksiniz.
            </li>
            <li>
              SGK girişiniz hiç yapılmadı veya eksik gün gösterildi —{" "}
              <strong>hizmet tespit davası</strong> açılması gerekebilir.
            </li>
            <li>
              İş kazası geçirdiniz; sigorta ödemesi yetersiz —{" "}
              <strong>iş kazası tazminat davası</strong> açacaksınız.
            </li>
            <li>
              İşveren tarafında: çalışanla uyuşmazlığı arabuluculuk veya
              mahkeme aşamasına getirmeden çözmek istiyorsunuz.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Kıdem tazminatı için en az ne kadar çalışmış olmam gerekir?",
      answer:
        "İK m. 14 uyarınca kıdem tazminatına hak kazanmak için en az 1 yıllık kıdem şartı vardır. Aynı işverene bağlı farklı işyerlerinde geçen süreler birleşir. 1 yıldan az çalışmalarda kıdem tazminatı doğmaz; ancak ihbar tazminatı kıdem süresine bakılmaksızın hak edilebilir.",
    },
    {
      question: "İşten ayrıldığımda arabuluculuk zorunlu mu?",
      answer:
        "Evet. 7036 sayılı İş Mahkemeleri Kanunu uyarınca işçi-işveren arasındaki kıdem, ihbar, fazla mesai gibi tüm bireysel iş alacakları ile işe iade taleplerinde arabuluculuk dava şartıdır. Arabuluculuk olmadan açılan dava usulden reddedilir.",
    },
    {
      question:
        "İstifa edersem kıdem ve ihbar tazminatı alabilir miyim?",
      answer:
        "Kural olarak işçi tarafından yapılan istifa kıdem hakkını ortadan kaldırır. Ancak askerlik, emeklilik, kadın işçinin evlilikten itibaren 1 yıl içinde fesih hakkı veya İK m. 24'teki haklı fesih sebepleri varsa kıdem tazminatı alınır; bu hâllerde ihbar süresi vermek zorunlu olmadığından ihbar tazminatı doğmaz.",
    },
    {
      question: "Fazla mesai ücretini nasıl ispatlarım?",
      answer:
        "Fazla mesainin ispat yükü işçidedir. İşyerinde tutulan giriş-çıkış kayıtları, mesai çizelgeleri, e-posta zincirleri, mesaj kayıtları ve tanık beyanları en sık kullanılan delillerdir. Sadece tanık beyanına dayalı sürekli fazla mesai iddialarında Yargıtay uygulaması takdiri indirim yapılmasıdır.",
    },
    {
      question: "Sigortasız çalıştırılırsam ne yapabilirim?",
      answer:
        "Hizmet tespit davası açarak çalışmanın SGK'ya bildirilmediği günleri tespit ettirebilirsiniz; bu dava 5510 SK m. 86 uyarınca işten ayrılış tarihinden itibaren 5 yıl içinde açılır ve görevli mahkeme iş mahkemesidir. Ayrıca SGK'ya şikâyetle işverene idari para cezası kestirilebilir.",
    },
    {
      question:
        "Mobbing iddiamı somutlamadan dava açabilir miyim?",
      answer:
        "Hayır. Yargıtay uygulamasında mobbingin sürekliliği ve sistematik niteliği kanıtlanmalıdır. E-posta, mesaj kayıtları, tanık beyanları, ani ve gerekçesiz görev değişiklikleri ve performans notlarındaki anormal düşüşler delil olarak değerlendirilir. Tek olay yeterli sayılmaz.",
    },
    {
      question: "İş kazası geçirdim; SGK ödemesi yeterli mi?",
      answer:
        "SGK iş göremezlik ödeneği yalnızca asgari sosyal güvenliktir; kalan zarar (sürekli iş göremezlik, manevi tazminat, destekten yoksun kalma) işverenden ayrıca talep edilebilir. Kusur oranını adli/teknik bilirkişi belirler. Davalar iş mahkemesinde açılır ve arabuluculuk şartına tabidir.",
    },
  ],
};

