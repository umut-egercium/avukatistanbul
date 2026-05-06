// Long-form content for /hizmetler/ticaret-hukuku.
// Targets "ticaret avukatı istanbul". 6102 sayılı Türk Ticaret Kanunu (TTK),
// 6098 TBK, 556/6769 SMK (sınai mülkiyet) ve 2004 İİK (konkordato) referansları.

import type { CategoryArticle } from "./bosanma-hukuku";

export const ticaretHukukuArticle: CategoryArticle = {
  lead: "Şirket kuruluşundan ortaklık uyuşmazlıklarına, pay devirlerinden ticari sözleşme ihlallerine kadar ticaret hukuku, doğru zamanda doğru avukatın yer aldığı alanlarda risklerin en aza indiği bir disiplindir. AvukatIstanbul, İstanbul Asliye Ticaret Mahkemelerinde dava deneyimi olan ticaret hukuku avukatlarını kuruluş, finansman ve uyuşmazlık aşamalarında yanınıza getirir.",
  sections: [
    {
      id: "ticaret-hukuku-nedir",
      title: "Ticaret hukuku ve İstanbul ticaret mahkemeleri",
      body: (
        <>
          <p>
            Ticaret hukuku, tacirler arasındaki ticari nitelikteki ilişkileri,
            şirketleri, kıymetli evrakı ve sigorta işlemlerini düzenler. Temel
            kanun <strong>6102 sayılı Türk Ticaret Kanunu (TTK)</strong>'dur;
            sözleşmesel ilişkilerde <strong>6098 sayılı Türk Borçlar Kanunu
            (TBK)</strong> tamamlayıcıdır.
          </p>
          <p>
            Ticari davalar kural olarak <strong>Asliye Ticaret
            Mahkemelerinde</strong> görülür. İstanbul'da Çağlayan ve
            Bakırköy başta olmak üzere büyük adliyelerde özel ticaret mahkemeleri
            bulunur. Uyuşmazlığın değeri belirli bir eşiğin altında kalan ya da
            tamamen mahkemece resen incelenebilen bazı dosyalar için heyet
            yerine tek hâkim görev yapar.
          </p>
        </>
      ),
    },
    {
      id: "sirket-turleri",
      title: "Şirket türleri ve kuruluş",
      body: (
        <>
          <p>
            TTK; sermaye ve şahıs şirketleri olmak üzere iki ana grupta şirket
            yapılarını düzenler:
          </p>
          <ul>
            <li>
              <strong>Anonim şirket (A.Ş.):</strong> Asgari sermaye ve nitelikli
              kuruluş şartlarına tabidir. Pay senetleriyle temsil edilen
              kapalı veya halka açık modelleri vardır. 2018 sonrası Mersis
              üzerinden kuruluş.
            </li>
            <li>
              <strong>Limited şirket (Ltd. Şti.):</strong> Türkiye'de en yaygın
              sermaye şirketi türü. Daha düşük asgari sermaye ve daha esnek
              kuruluş prosedürü. Tek kişilik limited şirket kurulabilir.
            </li>
            <li>
              <strong>Kollektif ve komandit şirketler:</strong> Şahıs ortaklığı
              özelliği ağır basan, ortakların kişisel sorumluluğunun farklı
              boyutlarda olduğu yapılar.
            </li>
            <li>
              <strong>Adi ortaklık (TBK m. 620 vd.):</strong> Ticaret siciline
              tescile gerek olmaksızın, ortak amaca ulaşmak için yapılan
              sözleşme; tüzel kişiliği yoktur.
            </li>
          </ul>
          <h3>Kuruluş aşamaları (sermaye şirketleri için)</h3>
          <ol>
            <li>
              <strong>Ana sözleşme:</strong> TTK m. 339 (A.Ş.) veya 575 (Ltd.)
              uyarınca asgari içeriği zorunlu maddelerle hazırlanır.
            </li>
            <li>
              <strong>MERSİS başvurusu:</strong> Tüm kurucu işlemler elektronik
              ortamda; e-imza zorunluluğu.
            </li>
            <li>
              <strong>Sermaye taahhüdü ve bloke:</strong> A.Ş.'de tescilden
              önce 1/4 oranında nakdi sermaye banka hesabına bloke edilir.
            </li>
            <li>
              <strong>Ticaret sicili tescili ve ilan:</strong> İstanbul Ticaret
              Sicili Müdürlüğünde yapılır.
            </li>
            <li>
              <strong>Vergi ve SGK açılışı, KEP, defter tasdiki:</strong>{" "}
              Kuruluş sonrası zorunlu işlemler.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: "pay-devri-genel-kurul",
      title: "Pay devri, genel kurul kararı iptali, ortaklıktan çıkma",
      body: (
        <>
          <h3>Pay devri</h3>
          <ul>
            <li>
              <strong>A.Ş. — nama yazılı pay devri (TTK m. 489-494):</strong>{" "}
              Yönetim kurulunun onayı kural olarak şart; ana sözleşmede sınırlama
              öngörülebilir. Hamiline yazılı paylarda ise Merkezi Kayıt Kuruluşu
              (MKK) bildirim zorunluluğu.
            </li>
            <li>
              <strong>Limited — pay devri (TTK m. 595):</strong> Yazılı şekil ve
              imzaların noterce onaylanması, ardından genel kurulun onayı (ana
              sözleşmede aksine düzenleme yoksa).
            </li>
          </ul>
          <h3>Genel kurul kararının iptali (TTK m. 445)</h3>
          <p>
            Kanuna, ana sözleşmeye veya dürüstlük kurallarına aykırı genel kurul
            kararlarına karşı, karara muhalefet eden veya katılma engeli bulunan
            pay sahibi <strong>3 ay içinde</strong> iptal davası açabilir.
            Görevli mahkeme şirket merkezinin bulunduğu yer asliye ticaret
            mahkemesidir.
          </p>
          <h3>Ortaklıktan çıkma ve çıkarılma</h3>
          <ul>
            <li>
              <strong>Ltd. — haklı sebeple çıkma (TTK m. 638):</strong>{" "}
              Mahkeme yoluyla; haklı sebep şartı.
            </li>
            <li>
              <strong>Ltd. — çıkarma (TTK m. 640):</strong> Genel kurul kararı
              ve haklı sebep ile.
            </li>
            <li>
              <strong>A.Ş. — haklı sebeple fesih (TTK m. 531):</strong>{" "}
              Sermayenin %10'u (halka açık şirketlerde %5'i) tarafından dava
              açılır; mahkeme fesih yerine alternatif çözümler de hükmedebilir.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "ticari-sozlesmeler",
      title: "Ticari sözleşmeler ve cezai şart",
      body: (
        <>
          <p>
            Tacirler arasındaki sözleşmelerde; sözleşme serbestisi gereği büyük
            ölçüde tarafların iradesi belirleyicidir. Ancak TTK ve TBK bazı
            sınırlar koyar:
          </p>
          <ul>
            <li>
              <strong>Tacirler için indirim yasağı (TTK m. 22):</strong>
              Tacir, kararlaştırılan cezai şartın fahiş olduğunu ileri sürerek
              indirilmesini isteyemez. Bu kural tüketici sözleşmelerinde tersine
              uygulanır.
            </li>
            <li>
              <strong>Faiz (TTK m. 8-10):</strong> Tacirler arasındaki kambiyo
              alacaklarında temerrüt faizi avans faizi olarak; sözleşme yoksa
              bile yasal faiz belirli kurallarla işler.
            </li>
            <li>
              <strong>İhtar zorunluluğu olmadan temerrüt (TBK m. 117):</strong>{" "}
              Belirli vadeye bağlı tacir borçlarında, vadenin gelmesiyle
              temerrüt başlar.
            </li>
            <li>
              <strong>Yazılı şekil ve özel hükümler:</strong> Acentelik (TTK
              m. 102), tek satıcılık, distribütörlük, lisans, gizlilik (NDA),
              hisse devir ve ortaklar arası sözleşmeler için ayrıca özel
              hükümler.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "marka-haksiz-rekabet",
      title: "Marka, haksız rekabet ve fikri mülkiyet",
      body: (
        <>
          <p>
            <strong>6769 sayılı Sınai Mülkiyet Kanunu (SMK)</strong>; marka,
            patent, faydalı model, tasarım ve coğrafi işaretleri tek çatı
            altında düzenler. Marka tescili Türk Patent ve Marka Kurumu
            (TÜRKPATENT) tarafından yapılır; uyuşmazlıklar Fikri ve Sınaî
            Haklar Hukuk Mahkemelerinde görülür (İstanbul'da Bakırköy ve
            Çağlayan'da uzman mahkemeler bulunur).
          </p>
          <p>
            <strong>TTK m. 54-63 — Haksız rekabet</strong> hükümleri; rakipler
            arasında dürüstlüğe aykırı her türlü davranışı (yanıltıcı reklam,
            kötülemiş, müşterileri ayartma, sırların ifşası vb.) yaptırıma
            bağlar. Talep edilebilecek başlıca davalar:
          </p>
          <ul>
            <li>Tespit, men, eski hâle iade.</li>
            <li>Haksız rekabetin sonuçlarının kaldırılması.</li>
            <li>Maddi ve manevi tazminat.</li>
            <li>Kararın gazetede ilanı.</li>
          </ul>
        </>
      ),
    },
    {
      id: "konkordato-iflas",
      title: "Konkordato ve iflas (kısa bakış)",
      body: (
        <>
          <p>
            Mali sıkıntı içindeki şirketlerin alacaklılardan koruma altına
            alınması için <strong>2004 sayılı İcra ve İflas Kanunu (İİK)</strong>
            içinde düzenlenen başlıca yollar:
          </p>
          <ul>
            <li>
              <strong>Geçici mühlet:</strong> Mahkeme, 3 aya kadar geçici mühlet
              verebilir; gerek görülürse 2 ay daha uzatılır.
            </li>
            <li>
              <strong>Kesin mühlet:</strong> Toplam 1 yıla kadar (gerekli
              koşullarda 6 ay uzatma) sürebilir.
            </li>
            <li>
              <strong>Konkordato projesi:</strong> Alacaklılar toplantısında
              kanunda öngörülen çoğunlukla kabul edilirse mahkeme tasdik eder.
            </li>
          </ul>
          <p>
            Konkordato ile iflas, aynı dosyanın farklı sonuçları olabilir;
            iflasta tasfiye süreci başlar ve aktiflerden alacaklıların
            sıralı ödenmesi yapılır. Her iki yol da Asliye Ticaret Mahkemesinde
            görülür ve mali tablolar / bağımsız denetim raporu büyük rol oynar.
          </p>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda ticaret avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Bir <strong>limited veya anonim şirket kuruluşu</strong>{" "}
              yapacaksınız ve ana sözleşmenin sonradan dava nedeni olmamasını
              istiyorsunuz.
            </li>
            <li>
              Ortaklarınızla <strong>pay devri, kâr payı dağıtımı veya genel
              kurul kararı</strong> üzerine anlaşmazlık var.
            </li>
            <li>
              Bir ticari sözleşmenin ihlal edildiğini düşünüyorsunuz; cezai şart,
              tazminat ve fesih süreçleri planlanacak.
            </li>
            <li>
              Markanız kullanıldığını veya benzeri bir markanın tescil
              başvurusu yapıldığını gördünüz — itiraz süresi 2 ay (SMK m.
              18).
            </li>
            <li>
              Şirketinizin nakit akışı bozuldu; <strong>konkordato</strong>{" "}
              veya yeniden yapılandırma seçeneklerini değerlendirmek
              istiyorsunuz.
            </li>
            <li>
              Yabancı yatırımcı olarak Türkiye'de şirket kuruyor veya satın
              alıyorsunuz; vergi, çalışma izni ve sermaye getirimi sürecini
              avukat ile yürütmek istiyorsunuz.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Limited şirket mi kursam, anonim şirket mi?",
      answer:
        "Küçük-orta ölçekli aile şirketleri ve danışmanlık-hizmet faaliyetleri için limited şirket genellikle daha esnektir. Hisse devri, sermaye artırımı ve halka açılma planları olan, çok ortaklı yatırımlar için anonim şirket tercih edilir. Vergi rejimleri her ikisinde de büyük ölçüde benzer; pay devri ve sermaye yapılandırması esnekliği belirleyici olur.",
    },
    {
      question: "Anonim şirket kurarken sermayenin tamamını yatırmak zorunda mıyım?",
      answer:
        "Hayır. TTK m. 344 uyarınca tescilden önce nakdi sermayenin en az 1/4'ünün ödenmiş olması yeterlidir; kalanı 24 ay içinde ödenmek üzere taahhüt edilir. Ayni sermaye ise tescilden önce tamamı yatırılır ve değeri mahkeme tarafından atanan bilirkişiyle tespit edilir.",
    },
    {
      question: "Genel kurul kararının iptali süresi nedir?",
      answer:
        "TTK m. 445/1 uyarınca iptal davası, karar tarihinden itibaren 3 ay içinde açılır. Süre hak düşürücüdür; geçirildiğinde dava reddedilir. Bu nedenle muhalefet şerhini tutanağa geçirmek ve dava süresini takip etmek kritiktir.",
    },
    {
      question:
        "Tacirler arasındaki cezai şart fahiş olsa da indirilebilir mi?",
      answer:
        "Kural olarak hayır. TTK m. 22 uyarınca tacir, kararlaştırılan cezai şartın fahiş olduğunu öne sürerek indirim isteyemez. Ancak istisnai olarak hakkın kötüye kullanılması (MK m. 2) çerçevesinde yargı, açıkça hak ve nesafete aykırı sonuçların önüne geçebilir; bu çok dar bir alandır.",
    },
    {
      question: "Ortaklıktan çıkma yolu nedir?",
      answer:
        "Limited şirkette ortaklar; ana sözleşmede çıkma hakkı düzenlenmemişse, haklı sebepler oluştuğunda mahkeme yoluyla çıkabilir (TTK m. 638). Mahkeme, çıkma kararı verirken pay bedelinin de belirlenmesine ilişkin bilirkişi raporu alır. Ortaklar arası sözleşmelerle baştan netleştirmek davaların önüne geçer.",
    },
    {
      question:
        "Markamı izinsiz kullanan rakip için ne yapabilirim?",
      answer:
        "SMK m. 149 uyarınca tescilli marka sahibi; tecavüzün durdurulması, kaldırılması, ürünlere el koyma, tazminat ve hükmün ilanı taleplerini Fikri ve Sınaî Haklar Hukuk Mahkemesinde tek davada birleştirebilir. Acil hâllerde ihtiyati tedbir kararıyla satışın durdurulması mümkündür.",
    },
    {
      question:
        "Konkordato başvurusu yaptığımda alacaklı takipleri durur mu?",
      answer:
        "Evet. Mahkemenin geçici mühlet kararı ile birlikte İİK m. 294 uyarınca rehinli alacaklılar dahil pek çok takip durur, kesin mühlette ise daha kapsamlı bir koruma uygulanır. Konkordatonun reddi veya geri alınması hâlinde takipler kaldığı yerden devam eder.",
    },
  ],
};

