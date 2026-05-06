// Long-form content for /hizmetler/tuketici-hukuku.
// Targets "tüketici avukatı istanbul". 6502 sayılı Tüketicinin Korunması
// Hakkında Kanun (TKHK) ve uygulama yönetmelikleri çerçevesinde.

import type { CategoryArticle } from "./bosanma-hukuku";

export const tuketiciHukukuArticle: CategoryArticle = {
  lead: "Ayıplı araç, ayıplı konut, banka ücretleri, mesafeli satışlar, paket tur veya garanti süresi… Tüketici hakları çoğu zaman bilinmediği için kullanılmıyor. AvukatIstanbul, İstanbul Tüketici Mahkemelerinde dava deneyimi olan avukatları hızlı ve sade bir süreçle sizinle buluşturur.",
  sections: [
    {
      id: "tuketici-hukuku-nedir",
      title: "Tüketici hukuku ve mahkeme yapısı",
      body: (
        <>
          <p>
            Tüketici hukuku, ticari veya mesleki amaç gütmeyen gerçek ya da
            tüzel kişi tüketici ile satıcı/sağlayıcı arasındaki uyuşmazlıkları
            düzenler. Temel kanun{" "}
            <strong>6502 sayılı Tüketicinin Korunması Hakkında Kanun (TKHK)</strong>;
            yorumda Türk Borçlar Kanunu (TBK) ve Türk Ticaret Kanunu (TTK)
            tamamlayıcıdır.
          </p>
          <p>
            Uyuşmazlığın çözüm yolları parasal sınıra göre ikiye ayrılır:
          </p>
          <ul>
            <li>
              <strong>Tüketici Hakem Heyeti</strong> — yıllık parasal sınırın
              <strong> altındaki</strong> uyuşmazlıklarda zorunlu başvuru
              mercii. İlçelerde kaymakamlıklar, büyük şehirlerde il müdürlüğü
              bünyesinde toplanır. Bedelsiz ve yazılıdır.
            </li>
            <li>
              <strong>Tüketici Mahkemesi</strong> — sınırın üzerindeki
              uyuşmazlıklar veya hakem heyeti kararına itiraz dosyaları için.
              İstanbul'da Bakırköy, Çağlayan, Anadolu ve Küçükçekmece
              adliyelerinde yoğun olarak görev yapar.
            </li>
          </ul>
          <p>
            Parasal sınırlar her yıl güncellenir; başvurunuzun yılına ait
            kesin rakamı Ticaret Bakanlığı kararnameleri belirler.
          </p>
        </>
      ),
    },
    {
      id: "ayipli-mal-hizmet",
      title: "Ayıplı mal ve ayıplı hizmet",
      body: (
        <>
          <p>
            <strong>TKHK m. 8</strong> uyarınca ayıplı mal; teslim anında
            sözleşmeye uygun olmayan, taraflarca kararlaştırılan
            niteliklerden yoksun, satıcının tanımladığı niteliklere veya
            örneğine uymayan, kullanım amacına uygun olmayan maldır.
          </p>
          <h3>Tüketicinin seçimlik hakları (TKHK m. 11)</h3>
          <ol>
            <li>
              <strong>Sözleşmeden dönme</strong> (parayı iade alma);
            </li>
            <li>
              <strong>Bedel indirimi</strong>;
            </li>
            <li>
              <strong>Ücretsiz onarım</strong>;
            </li>
            <li>
              <strong>Yenisi ile değiştirme</strong>.
            </li>
          </ol>
          <p>
            Tüketici dilediğini seçer; ancak satıcı, talep edilen hak orantısız
            güçlük yaratıyorsa diğer hakka yöneltebilir. Garanti süresi içinde
            aynı arıza 4 kez tekrarlandığında veya farklı arızalar 6 kez
            tekrarladığında "tüketicinin tercih ettiği hak"tan değiştirme
            zorunluluğu doğar (Yönetmelik m. 7).
          </p>
          <h3>Süre</h3>
          <p>
            Ayıbın gizli olup olmamasına göre değişir; konutta zamanaşımı
            <strong> 5 yıl</strong>, hile ile gizlenmiş ayıplarda zamanaşımı
            işlemez (TKHK m. 12).
          </p>
          <h3>Ayıplı hizmet (TKHK m. 13-15)</h3>
          <p>
            Hizmette ayıp; sağlayıcının taahhüt ettiği niteliklerden veya
            kullanım amacından yoksunluktur. Tüketici sağlayıcıdan ücretsiz
            yeniden hizmet, indirim, sözleşmeden dönme veya tazminat
            isteyebilir.
          </p>
        </>
      ),
    },
    {
      id: "mesafeli-kapidan",
      title: "Mesafeli, kapıdan ve taksitli satışlar",
      body: (
        <>
          <h3>Mesafeli satış (TKHK m. 48)</h3>
          <ul>
            <li>
              İnternet, telefon, katalog gibi tarafların fiziksel olarak
              karşılaşmadığı satışları kapsar.
            </li>
            <li>
              Tüketici <strong>14 gün</strong> içinde herhangi bir gerekçe
              göstermeden ve cayma cezası ödemeden{" "}
              <strong>cayma hakkı</strong>na sahiptir.
            </li>
            <li>
              Satıcı, cayma sonrası en geç 14 gün içinde tutarın tamamını iade
              eder.
            </li>
          </ul>
          <h3>Kapıdan satış (TKHK m. 47)</h3>
          <p>
            İşyeri dışında yapılan satışlar. Cayma süresi 14 gündür ve daha
            kapsamlı bilgi formu zorunluluğu vardır.
          </p>
          <h3>Taksitle satış (TKHK m. 17-18)</h3>
          <ul>
            <li>
              Sözleşme yazılı olmalı, taksit tarih ve tutarları açık.
            </li>
            <li>
              Tüketici en az <strong>iki taksiti</strong> üst üste ödemediğinde
              kalan borcun tamamı muaccel olabilir; ancak satıcının önce ihtar
              çekmesi ve süre vermesi zorunludur.
            </li>
            <li>
              7 günlük cayma hakkı vardır.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "banka-kredi-kart",
      title: "Banka, kredi ve kredi kartı uyuşmazlıkları",
      body: (
        <>
          <p>
            Tüketici kredisi (TKHK m. 22-31) ve banka kart sözleşmeleri
            tüketici işlemi sayılır. Sık karşılaşılan başlıklar:
          </p>
          <ul>
            <li>
              <strong>Konut finansmanı (mortgage):</strong> 14 gün cayma hakkı,
              erken ödemede en fazla %1 erken kapatma masrafı, sözleşme öncesi
              bilgi formu zorunluluğu.
            </li>
            <li>
              <strong>Kredi kartı:</strong> Yıllık üyelik aidatı için tüketici
              talep ettiğinde ücretsiz alternatif kart sunulması; haksız
              ücretler iadeye konu olur.
            </li>
            <li>
              <strong>Banka masrafları:</strong> Dosya masrafı, hayat sigortası
              primi, ekspertiz ücreti gibi haksız tahsiller — Yargıtay
              uygulaması büyük oranda iade yönündedir.
            </li>
            <li>
              <strong>Sözleşme dışı çekim ve dolandırıcılık:</strong> Banka,
              güvenlik tedbirleri yetersizse müşteriye karşı sorumlu olabilir;
              ayrıca TCK m. 158/1-f kapsamında suç duyurusu yapılır.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "tatil-paket-tur",
      title: "Paket tur, devre tatil ve abonelikler",
      body: (
        <>
          <h3>Paket tur (TKHK m. 51)</h3>
          <ul>
            <li>
              Tur düzenleyicisi, broşür ve sözleşmeye uygun hizmet vermek
              zorundadır.
            </li>
            <li>
              Tur başlangıcından önce iptal hakkı; mücbir sebeplerde tüketici
              cayma cezası ödemez.
            </li>
            <li>
              Hizmette ayıp doğduğunda tüketici; bedel indirimi, sözleşmenin
              feshi, tazminat veya alternatif tur talep edebilir.
            </li>
          </ul>
          <h3>Devre tatil ve uzun süreli tatil hizmetleri (TKHK m. 50)</h3>
          <p>
            Sözleşme yazılı şekilde, ön bilgi formu ile düzenlenir. Tüketici
            <strong> 14 gün</strong> içinde gerekçesiz cayma hakkı kullanır;
            cayma süresinde herhangi bir ödeme talep edilemez (TKHK m. 50/4).
          </p>
          <h3>Abonelik sözleşmeleri (TKHK m. 52)</h3>
          <p>
            Tüketici, abonelik sözleşmesini herhangi bir gerekçe göstermeden ve
            cezai şart ödemeden istediği zaman feshedebilir. Sağlayıcı; iptal
            için kullanılan kanal kadar kolay bir iptal kanalı sunmak
            zorundadır.
          </p>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda tüketici avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Yeni aldığınız araç veya konutta gizli/açık ayıp tespit ettiniz —
              seçimlik hak süresi sınırlı.
            </li>
            <li>
              Bankanız haksız <strong>dosya masrafı, hayat sigortası primi,
              kart aidatı</strong> gibi ücretler kesti; iade talebiniz
              reddedildi.
            </li>
            <li>
              Mesafeli satışta cayma hakkını kullandınız ancak satıcı paranızı
              iade etmiyor.
            </li>
            <li>
              Devre tatil veya uzun süreli tatil sözleşmesinden kurtulmak
              istiyorsunuz.
            </li>
            <li>
              Cep telefonu hattı, internet veya doğalgaz aboneliğinde haksız
              fesih cezası, gecikme faizi veya yanlış faturalandırma yaşadınız.
            </li>
            <li>
              Kart bilgileriniz çalındı veya hesabınızdan rızanız dışında çekim
              yapıldı; bankaya rücu için süreç ve delil planı gerekiyor.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question:
        "Tüketici hakem heyetine başvurmak ücretli mi?",
      answer:
        "Hayır. Hakem heyeti başvurusu ücretsizdir; başvuru kaymakamlık veya il ticaret müdürlüğü bünyesinde tek formla yapılır. Karar ortalama 6 ayda çıkar; karar lehinizde olur ve karşı taraf uymazsa ilamlı icra takibine konu yapılır.",
    },
    {
      question:
        "Aldığım ürün arızalı; ücretsiz onarım vs. değişim arasında nasıl seçim yaparım?",
      answer:
        "TKHK m. 11 size dört seçimlik hak verir; tercih sizdedir. Ancak satıcı, talep ettiğiniz hakkın aşırı külfet doğuracağını ispatlayabilirse sizi diğer haklardan birine yöneltebilir. Aynı arızanın 4, farklı arızaların 6 kez tekrarlanması hâlinde değiştirme hakkı kesindir.",
    },
    {
      question:
        "Mesafeli satışta cayma hakkı her üründe geçerli mi?",
      answer:
        "Hayır. TKHK m. 48 ve uygulama yönetmeliği uyarınca özel olarak hazırlanan veya kişiye özel ürünler, hızla bozulabilen mallar, ambalajı açıldıktan sonra iadesi sağlık-hijyen açısından sakıncalı ürünler, dijital içerik ve süresinde kullanılması gereken konaklama-bilet hizmetleri cayma hakkı dışında bırakılmıştır.",
    },
    {
      question:
        "Bankadan tahsil edilen dosya masraflarını geri alabilir miyim?",
      answer:
        "Çoğu durumda evet. Yargıtay yerleşik içtihadı; tüketicinin onayı gerçekten alınmadan, sözleşmeyle 'tek yanlı şart' biçiminde dayatılan dosya masrafı, hayat sigortası primi ve benzeri haksız ücretlerin iadesi yönündedir. Zamanaşımı 10 yıl. İcradan önce hakem heyeti veya tüketici mahkemesi yolu kullanılır.",
    },
    {
      question:
        "Konutta gizli ayıp ortaya çıktı; ne kadar süre içinde dava açabilirim?",
      answer:
        "TKHK m. 12 uyarınca konut için zamanaşımı süresi 5 yıldır. Ancak satıcının ayıbı bilerek gizlemesi (hile) hâlinde zamanaşımı işlemez. Açık ayıplarda 'derhal', gizli ayıplarda 'fark edildiğinden itibaren makul sürede' satıcıya bildirim önemlidir; gecikme delil değerini düşürebilir.",
    },
    {
      question:
        "Aboneliğimi feshetmek istiyorum; sağlayıcı zorlaştırıyor.",
      answer:
        "TKHK m. 52 uyarınca aboneliğin feshi, kolay ve cezasız olmalıdır; sağlayıcı, satışta kullanılan kanal kadar erişilebilir bir iptal kanalı sunmak zorundadır. Sağlayıcının fesih başvurusunu makul sürede işleme almaması hâlinde tüketici hakem heyetine veya tüketici mahkemesine başvurulur.",
    },
    {
      question:
        "Devre tatil sözleşmesini iptal edebilir miyim?",
      answer:
        "İmza tarihinden itibaren 14 gün içinde cezasız ve gerekçesiz cayma hakkı vardır (TKHK m. 50). Cayma süresi içinde sağlayıcı sizden tahsilat yapmamalıdır. Süre geçtikten sonra ise haklı sebep, ayıp veya yanıltıcı tanıtım gibi gerekçelerle dava yoluyla iptal edilir.",
    },
  ],
};

