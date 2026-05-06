// Long-form content for /hizmetler/kvkk-bilisim-hukuku.
// Targets "kvkk avukatı istanbul". 6698 sayılı Kişisel Verilerin Korunması
// Kanunu (KVKK), 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi
// ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun,
// 5237 sayılı TCK'nın bilişim suçları başlıklı maddeleri (243-246, 158/1-f).

import type { CategoryArticle } from "./bosanma-hukuku";

export const kvkkBilisimHukukuArticle: CategoryArticle = {
  lead: "Kişisel veri ihlali bildiriminden sosyal medya hakaretine, bilişim suçlarından e-ticaret uyuşmazlıklarına kadar dijital alanda hukuk; küçük süre kayıplarının büyük cezalara dönüştüğü hızlı bir disiplindir. AvukatIstanbul, KVKK uyum süreçleri, içerik kaldırma davaları ve bilişim suçlarında deneyimli avukatları sizinle buluşturur.",
  sections: [
    {
      id: "kvkk-bilisim-konu",
      title: "KVKK ve bilişim hukukunun konusu",
      body: (
        <>
          <p>
            KVKK ve bilişim hukuku, dijital ortamda kişisel verilerin
            işlenmesini, korunmasını, içeriklerin yayımlanmasını ve bilişim
            sistemleri aracılığıyla işlenen suçları kapsar. Başlıca kanunlar:
          </p>
          <ul>
            <li>
              <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK):</strong>{" "}
              Kişisel veri işlemenin ilkeleri, veri sorumlusu yükümlülükleri,
              Kişisel Verileri Koruma Kurulu (KVKK Kurulu) yetkileri.
            </li>
            <li>
              <strong>5651 sayılı Kanun:</strong> İnternet ortamında yayımlanan
              içeriklerin düzenlenmesi, içeriğin çıkarılması ve erişimin
              engellenmesi prosedürleri.
            </li>
            <li>
              <strong>5237 sayılı TCK:</strong> Bilişim sistemlerine girme (m. 243),
              sistemi engelleme/bozma (m. 244), banka veya kredi kartlarının
              kötüye kullanılması (m. 245), nitelikli dolandırıcılık
              (m. 158/1-f).
            </li>
            <li>
              <strong>5070 sayılı Elektronik İmza Kanunu</strong> ve{" "}
              <strong>6563 sayılı Elektronik Ticaretin Düzenlenmesi
              Hakkında Kanun</strong> ek olarak uygulanır.
            </li>
          </ul>
          <p>
            KVKK Kurulu kararlarına karşı dava{" "}
            <strong>İdare Mahkemesinde</strong>; bilişim suçlarının yargılaması
            <strong> Asliye/Ağır Ceza Mahkemelerinde</strong>; içerik
            kaldırma talepleri ise <strong>Sulh Ceza Hâkimliğinde</strong>{" "}
            görülür.
          </p>
        </>
      ),
    },
    {
      id: "kvkk-temel-ilkeler",
      title: "KVKK temel ilkeleri ve veri sorumlusu yükümlülükleri",
      body: (
        <>
          <p>
            KVKK m. 4 uyarınca kişisel verilerin işlenmesinde uyulması zorunlu
            ilkeler:
          </p>
          <ul>
            <li>Hukuka ve dürüstlük kurallarına uygunluk;</li>
            <li>Doğru ve gerektiğinde güncel olma;</li>
            <li>Belirli, açık ve meşru amaçlarla işleme;</li>
            <li>Amaçla bağlantılı, sınırlı ve ölçülü olma;</li>
            <li>Mevzuatta öngörülen veya işleme amacının gerektirdiği süre kadar muhafaza.</li>
          </ul>
          <h3>İşleme şartları (KVKK m. 5-6)</h3>
          <p>
            Kişisel veri kural olarak <strong>açık rıza</strong> ile işlenir.
            Kanunda sayılan istisnalar (sözleşmenin ifası, hukuki yükümlülük,
            meşru menfaat vb.) varsa açık rıza aranmaz. Özel nitelikli kişisel
            veriler (sağlık, cinsel hayat, biyometrik) ise daha sıkı koşullara
            tabidir.
          </p>
          <h3>Veri sorumlusunun yükümlülükleri</h3>
          <ul>
            <li>
              <strong>Aydınlatma yükümlülüğü (m. 10):</strong> Veri sahibine,
              veri işlenmesi öncesinde sade bir metinle bilgi verme.
            </li>
            <li>
              <strong>Veri güvenliği (m. 12):</strong> Teknik ve idari tedbirler
              alma; güvenlik ihlalini bildirim.
            </li>
            <li>
              <strong>VERBİS kaydı:</strong> Eşik üzerindeki veri sorumlularının
              Veri Sorumluları Sicil Bilgi Sistemi'ne kayıt zorunluluğu.
            </li>
            <li>
              <strong>Veri sahibi başvurularına yanıt (m. 13):</strong>{" "}
              Başvuruya 30 gün içinde cevap; ücret yönetmelikte düzenlenir.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "veri-ihlali-bildirimi",
      title: "Veri ihlali bildirimi: 72 saat kuralı",
      body: (
        <>
          <p>
            <strong>KVKK m. 12/5</strong> uyarınca veri sorumlusu, kişisel
            verilerin hukuka aykırı yollarla başkaları tarafından elde
            edildiğini öğrenmesi hâlinde:
          </p>
          <ol>
            <li>
              <strong>En kısa sürede</strong>, en geç 72 saat içinde KVKK
              Kurulu'na bildirim yapar.
            </li>
            <li>
              Etkilenen veri sahiplerine de makul sürede bildirim yapar.
            </li>
          </ol>
          <p>
            KVKK Kurulu kararları doğrultusunda bildirim formu, ihlalin
            tarihi, etkilenen kişi sayısı, ihlalin türü ve alınan/alınacak
            tedbirleri içerir. Eksik veya geç bildirim, ayrı bir idari yaptırım
            sebebidir. İhlalin niteliğine göre Kurul, etkilenen kişi sayısı ve
            risk seviyesine bağlı olarak ayrıca <strong>kamuoyu duyurusu</strong>{" "}
            yapılmasını isteyebilir.
          </p>
        </>
      ),
    },
    {
      id: "kvkk-kurul-cezalar",
      title: "KVKK Kurulu süreçleri ve cezalar",
      body: (
        <>
          <p>
            KVKK Kurulu, şikâyet üzerine veya re'sen inceleme başlatabilir.
            Karar verilirken:
          </p>
          <ul>
            <li>
              Veri sorumlusunun savunmasının alınması,
            </li>
            <li>
              Belge isteme ve yerinde inceleme yetkisi,
            </li>
            <li>
              İhlalin hafifletici/ağırlaştırıcı faktörleri,
            </li>
          </ul>
          <p>
            değerlendirilir. <strong>İdari para cezaları (KVKK m. 18)</strong>;
            aydınlatma yükümlülüğüne aykırılıktan veri güvenliği ihlaline,
            VERBİS kayıt zorunluluğunun ihlalinden Kurul kararına aykırılığa
            kadar farklı kalemlerde uygulanır. Cezaların alt-üst sınırları her
            yıl yeniden değerleme oranıyla güncellenir; başvuru tarihinde
            geçerli sınır esas alınır.
          </p>
          <p>
            Karara karşı 60 gün içinde Ankara İdare Mahkemesinde iptal davası
            açılabilir; ihtiyati tedbir ve yürütmenin durdurulması talepleri de
            sıkça gündeme gelir.
          </p>
        </>
      ),
    },
    {
      id: "bilisim-suclari",
      title: "Bilişim suçları (TCK)",
      body: (
        <>
          <ul>
            <li>
              <strong>Bilişim sistemine girme (TCK m. 243):</strong> Yetkisiz
              olarak sisteme girmek veya kalmaya devam etmek; verilerin
              alınmadığı durumda dahi suç oluşur.
            </li>
            <li>
              <strong>Sistemin işleyişini engelleme veya bozma (TCK m. 244):</strong>{" "}
              Veri silme, değiştirme, sistemde değişiklik yapma; nitelikli
              hâllerde ağır cezalar.
            </li>
            <li>
              <strong>Banka veya kredi kartlarının kötüye kullanılması
              (TCK m. 245):</strong> Başkasının kartını rıza dışı kullanma,
              sahte kart üretme.
            </li>
            <li>
              <strong>Bilişim sistemlerinin araç olarak kullanılması suretiyle
              dolandırıcılık (TCK m. 158/1-f):</strong> 4-10 yıl arasında hapis
              ve adli para cezası gerektiren nitelikli dolandırıcılık.
            </li>
            <li>
              <strong>Özel hayata ve kişisel verilere yönelik suçlar (TCK
              m. 134-138):</strong> Özel hayatın gizliliğini ihlal, görüntü-ses
              kaydını yayma, kişisel verileri hukuka aykırı kaydetme, yayma,
              ele geçirme, vermek; 1-4 yıl arası hapis.
            </li>
          </ul>
          <p>
            Bilişim suçları soruşturmasında <strong>delil bütünlüğü</strong>{" "}
            hayati önem taşır: ekran görüntüleri ve sosyal medya çıktılarının
            noter veya elektronik ortamda zaman damgalı olarak saklanması,
            saldırı IP'lerinin kaydı ve banka hareketleri delil zinciri için
            kritiktir.
          </p>
        </>
      ),
    },
    {
      id: "5651-icerik-kaldirma",
      title: "5651 SK: içerik kaldırma ve erişim engelleme",
      body: (
        <>
          <p>
            5651 sayılı Kanun, internette yayımlanan içeriklerin hukuka
            aykırılığı durumunda iki ana yaptırım öngörür:
          </p>
          <ul>
            <li>
              <strong>İçeriğin çıkarılması (m. 9):</strong> Kişilik haklarını
              ihlal eden içeriğin yayından kaldırılması — Sulh Ceza Hâkimliği
              kararı 24 saat içinde verilir; içerik sağlayıcısı 24 saat içinde
              gereği yapar.
            </li>
            <li>
              <strong>Erişim engelleme (m. 8):</strong> Suç oluşturan içeriğe
              (uyuşturucu reklamı, müstehcenlik, kumar vs.) hâkim kararıyla
              veya gecikmesinde sakınca olan hâllerde BTK kararıyla erişim
              engellenmesi.
            </li>
          </ul>
          <p>
            Sosyal medya platformları için ek yükümlülükler 5651 SK m. 8/A ve
            m. 9/A'da düzenlenir; ülke temsilcisi atama, Türkiye'deki kullanıcı
            verilerinin Türkiye'de barındırılması, içerik kaldırma sürelerine
            uyma. İhlalde reklam yasağı, bant daraltma ve idari para cezası
            yaptırımları uygulanabilir.
          </p>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda KVKK / bilişim avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Şirketinizde bir <strong>veri ihlali</strong> oldu — 72 saat
              süreniz işlemeye başladı.
            </li>
            <li>
              KVKK Kurulu hakkınızda inceleme başlattı; savunma süresi
              kaçırılmamalı.
            </li>
            <li>
              <strong>VERBİS kaydı, aydınlatma metinleri, açık rıza
              tasarımları</strong> ve veri envanteri için uyum projesi
              kurguluyorsunuz.
            </li>
            <li>
              Sosyal medyada hakkınızda hakaret içerikli paylaşım yapıldı —{" "}
              <strong>içerik kaldırma</strong> + <strong>ceza şikâyeti</strong>{" "}
              + <strong>manevi tazminat</strong> aynı anda yürütülmeli.
            </li>
            <li>
              Banka hesabınızdan rıza dışı çekim yapıldı; TCK m. 158/1-f
              kapsamında suç duyurusu ve banka kusur sorumluluğu.
            </li>
            <li>
              Bilişim sistemine yetkisiz erişim (hack, ransomware) saldırısı
              yaşandı; delil korunması ve adli bilişim raporu için.
            </li>
            <li>
              E-ticaret sözleşmenizde mesafeli satış, çerez, açık rıza ve
              ETBİS kaydı uyumu için danışmanlık.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question:
        "Veri ihlali bildirimini 72 saatten geç yaparsam ne olur?",
      answer:
        "Geç bildirim, KVKK m. 18 kapsamında ayrı bir idari para cezasına yol açar ve Kurul önündeki dosyanızda ağırlaştırıcı bir unsur olarak değerlendirilir. Bildirimi mümkün olan en kısa sürede yapmak; eksik kalan bilgileri ek bildirimlerle tamamlamak, gecikmiş ve hiç yapılmamış bildirimden daha az risklidir.",
    },
    {
      question:
        "Sosyal medyadaki hakaret paylaşımı için hem ceza hem hukuk davası açabilir miyim?",
      answer:
        "Evet. TCK m. 125 uyarınca hakaret suç duyurusu yapılır; bağımsız olarak Asliye Hukuk Mahkemesinde manevi tazminat davası açılabilir. Eş zamanlı olarak 5651 SK m. 9 çerçevesinde Sulh Ceza Hâkimliğinden içeriğin kaldırılmasını talep edebilirsiniz; üçü birlikte yürür.",
    },
    {
      question:
        "Bir çalışanım izinsiz müşteri verilerini başka bir firmaya götürdü; ne yapabilirim?",
      answer:
        "TCK m. 136 uyarınca kişisel verileri hukuka aykırı yollarla bir başkasına verme suçu söz konusu olabilir. Olay ayrıca KVKK'ya bildirim yapmayı, ihlal kapsamına giren veri sahiplerine bilgi vermeyi gerektirebilir. Tasarımdaki teknik tedbirlere göre veri sorumlusu olan şirket de Kurul nezdinde sorumlu olabilir.",
    },
    {
      question:
        "VERBİS kaydı zorunlu mudur?",
      answer:
        "KVKK m. 16 ve Kurul kararlarıyla belirlenen eşik üzerindeki veri sorumluları VERBİS kaydı yaptırmak zorundadır. Yıllık çalışan sayısı, mali bilanço ve özel nitelikli veri işleme durumuna göre eşik değişir. Yıllar içinde Kurul yeni muafiyet kararları yayımladığı için somut yıl mevzuatına bakılmalıdır.",
    },
    {
      question:
        "İçeriğin URL'si yurt dışında bir platformda; Türkiye'de karar verilebilir mi?",
      answer:
        "Evet. 5651 SK uyarınca içerik veya yer sağlayıcının yurt dışında olması, Sulh Ceza Hâkimliğinin içerik kaldırma veya erişim engelleme kararı vermesine engel değildir. Karar bilgisi BTK üzerinden ilgili platforma iletilir; uymayanlar için reklam yasağı ve bant daraltma uygulanabilir.",
    },
    {
      question:
        "Banka hesabımdan dolandırıcı para çektiğinde banka her zaman sorumlu mu?",
      answer:
        "Banka, müşterisine karşı sözleşmeden ve özel kanunlardan kaynaklanan güvenlik yükümlülükleri taşır. Yargıtay uygulamasında; iki faktörlü doğrulama, anormal işlem uyarısı, kart bloke prosedürü gibi güvenlik adımlarının makul ölçüde işletilmemesi hâlinde banka kusurlu kabul edilir. Müşterinin ağır kusuru veya bilgi paylaşması varsa kusur paylaştırılır.",
    },
    {
      question:
        "Aydınlatma metni ile açık rıza aynı şey mi?",
      answer:
        "Hayır. Aydınlatma yükümlülüğü (KVKK m. 10), veri işlemenin tüm hâllerinde yerine getirilir ve veri sahibine bilgi vermeyi amaçlar. Açık rıza ise (KVKK m. 5/1) belirli bir hukuki sebep niteliğindedir; sadece kanunda öngörülen istisnalar kapsamına girmediğinde aranır. İkisini aynı metinde birleştirmek, geçerli açık rıza alınmasını riske atar.",
    },
  ],
};

