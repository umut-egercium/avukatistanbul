// Long-form content for /hizmetler/tazminat-hukuku.
// Targets "tazminat avukatı istanbul". 6098 TBK haksız fiil, 2918 KTK,
// 5510 SGK iş kazası ve hekim sorumluluğu çerçevesinde.

import type { CategoryArticle } from "./bosanma-hukuku";

export const tazminatHukukuArticle: CategoryArticle = {
  lead: "Trafik kazası, iş kazası, malpraktis veya bir başka haksız fiil sonucu zarara uğradığınızda, doğru hukuki strateji tazminat miktarını belirgin biçimde değiştirir. AvukatIstanbul, İstanbul'da maddi-manevi tazminat davalarında uzmanlaşmış avukatları, kazadan veya olaydan sonraki en kritik ilk haftada sizinle buluşturur.",
  sections: [
    {
      id: "tazminat-sorumluluk",
      title: "Tazminat hukuku ve sorumluluk türleri",
      body: (
        <>
          <p>
            Tazminat hukuku, hukuka aykırı bir fiil veya sözleşmeye aykırılık
            nedeniyle ortaya çıkan zararın giderilmesini düzenler. Temel
            kaynak <strong>6098 sayılı Türk Borçlar Kanunu (TBK)</strong>;
            özellikle haksız fiile ilişkin <strong>m. 49</strong> ve devamı,
            tehlike sorumluluğuna ilişkin <strong>m. 71</strong>{" "}
            hükümleridir.
          </p>
          <p>
            Sorumluluk türleri kabaca üçe ayrılır:
          </p>
          <ul>
            <li>
              <strong>Kusura dayalı sorumluluk:</strong> Genel kural; zarar
              gören kusurun varlığını ispatlar (TBK m. 49).
            </li>
            <li>
              <strong>Tehlike (kusursuz) sorumluluk:</strong> Motorlu taşıt
              işletenin sorumluluğu (KTK m. 85), tehlikeli işletmenin
              sorumluluğu (TBK m. 71). Kusur aranmaz; ancak yetki sınırlı
              hâllerde mücbir sebep, kaçınılmaz olay veya zarar görenin tam
              kusuru savunma olarak ileri sürülebilir.
            </li>
            <li>
              <strong>Sözleşmeden kaynaklanan sorumluluk:</strong> Hekim ile
              hasta arasındaki vekâlet ilişkisi, eser sözleşmesi gibi.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "trafik-kazasi",
      title: "Trafik kazasında tazminat",
      body: (
        <>
          <p>
            <strong>2918 sayılı Karayolları Trafik Kanunu (KTK)</strong> m. 85
            uyarınca motorlu taşıt işleteni, taşıtın işletilmesinden doğan
            zararlardan kusurlu olmasa da sorumludur. Davalı taraf olarak
            şunlar gösterilebilir:
          </p>
          <ul>
            <li>
              <strong>Kusurlu sürücü</strong> — kusur oranı kadar.
            </li>
            <li>
              <strong>Araç işleteni / sahibi</strong> — kusursuz sorumluluk
              çerçevesinde.
            </li>
            <li>
              <strong>Zorunlu Mali Sorumluluk Sigortası (Trafik Sigortası)
              şirketi</strong> — poliçe limiti dahilinde, doğrudan dava
              edilebilir.
            </li>
            <li>
              Kamu aracı söz konusuysa <strong>idare</strong> — idare
              mahkemesinde tam yargı davası.
            </li>
          </ul>
          <p>
            Talep edilebilecek başlıca kalemler: araçta meydana gelen{" "}
            <strong>değer kaybı</strong>, kazanç kaybı,{" "}
            <strong>tedavi masrafları</strong>, geçici-sürekli iş göremezlik,{" "}
            <strong>destekten yoksun kalma</strong> (ölümlü kaza), ve{" "}
            <strong>manevi tazminat</strong> (TBK m. 56). Bedensel zararlarda
            zamanaşımı{" "}
            <strong>ceza zamanaşımına eşit, en az 2 ve en çok 10 yıl</strong>{" "}
            (KTK m. 109) — taksirle yaralama 8, taksirle ölüm 15 yıl gibi —
            sürekli güncel rakam için dosyaya bakılır.
          </p>
        </>
      ),
    },
    {
      id: "is-kazasi",
      title: "İş kazasında SGK ve işveren sorumluluğu",
      body: (
        <>
          <p>
            5510 sayılı Kanun m. 13'te tanımlanan iş kazası kapsamında
            yararlanılan SGK ödemeleri (geçici iş göremezlik, sürekli iş
            göremezlik geliri, ölüm geliri, cenaze yardımı){" "}
            <strong>asgari sosyal güvenlik</strong> niteliğindedir.
          </p>
          <p>
            Kalan zarar — kusurlu işverenin sorumluluğunda — ayrıca dava
            yoluyla talep edilir:
          </p>
          <ul>
            <li>
              Maddi tazminat: tedavi giderleri, geçici-sürekli iş göremezlik
              tazminatı, kazancın azalmasından doğan zarar.
            </li>
            <li>
              Manevi tazminat (TBK m. 56) — zarar görenin kişiliğine yönelik.
            </li>
            <li>
              Ölümlü iş kazasında <strong>destekten yoksun kalma</strong> —
              eş, çocuklar, anne-baba ve kanunda sayılan diğer destekleneler.
            </li>
          </ul>
          <p>
            Hesap, adli/iktisadi bilirkişi raporuyla yapılır; <strong>kusur
            oranı</strong> ve <strong>kaçınılmazlık</strong> esasları
            dikkate alınır. İş mahkemesinde açılır; arabuluculuk dava şartıdır.
          </p>
        </>
      ),
    },
    {
      id: "malpraktis",
      title: "Doktor hatası (malpraktis) davaları",
      body: (
        <>
          <p>
            Hekim ile hasta arasındaki ilişki kural olarak{" "}
            <strong>vekâlet sözleşmesi</strong> (TBK m. 502 vd.); estetik
            cerrahi gibi sonuç vaat eden işlerde ise{" "}
            <strong>eser sözleşmesi</strong> niteliğindedir. Hekim,{" "}
            <strong>özen yükümlülüğüne</strong> aykırı her davranıştan dolayı
            sorumludur.
          </p>
          <p>
            Malpraktis davasında üç temel unsur kanıtlanır:
          </p>
          <ol>
            <li>
              <strong>Tıbbi standarttan sapma</strong> (kusur) — bilimsel
              olarak kabul edilmiş tedavi protokolünden ayrılma.
            </li>
            <li>
              <strong>Zarar</strong> — bedensel veya ölümle sonuçlanan zarar.
            </li>
            <li>
              <strong>Nedensellik bağı</strong> — sapma ile zarar arasındaki
              illiyet.
            </li>
          </ol>
          <p>
            Kamu hastanesinde yaşanan olaylarda dava{" "}
            <strong>idare mahkemesinde tam yargı davası</strong>; özel
            hastane veya muayenehanede ise <strong>tüketici/asliye hukuk
            mahkemesinde</strong> görülür. Bilirkişi olarak Adli Tıp Kurumu
            veya Yüksek Sağlık Şurası heyeti görevlendirilir; uygulamada
            akademisyen heyetleri de tercih edilmektedir.
          </p>
        </>
      ),
    },
    {
      id: "tazminat-kalemleri",
      title: "Maddi ve manevi tazminat kalemleri",
      body: (
        <>
          <h3>Maddi tazminat kalemleri</h3>
          <ul>
            <li>
              <strong>Tedavi gideri:</strong> Hastane, ilaç, ortez/protez,
              fizyoterapi.
            </li>
            <li>
              <strong>Kazanç kaybı:</strong> İş göremezlik süresince
              edinilemeyen gelir.
            </li>
            <li>
              <strong>Sürekli iş göremezlik tazminatı:</strong> Kalıcı
              maluliyet oranına göre — Adli Tıp veya Maluliyet Tespiti
              Yönetmeliği'ne göre rapor.
            </li>
            <li>
              <strong>Destekten yoksun kalma:</strong> Ölenin desteklediği
              kişilerin gelecekteki yoksunluğu — Çoltay/Acaroğlu ve PMF/TRH
              tabloları kullanılır.
            </li>
            <li>
              <strong>Araçta değer kaybı:</strong> Kaza sonrası araç piyasa
              değerinde meydana gelen kalıcı düşüş.
            </li>
          </ul>
          <h3>Manevi tazminat (TBK m. 56)</h3>
          <p>
            Acı, elem ve üzüntünün kısmen giderilmesi amaçlanır. Hâkim;
            tarafların kusur oranı, ekonomik durumu, olayın özellikleri ve
            yaratılan etkiyi dikkate alarak <strong>hakkaniyet</strong>{" "}
            ölçüsünde belirler.
          </p>
        </>
      ),
    },
    {
      id: "sure-mahkeme-ispat",
      title: "Süre, görevli mahkeme ve ispat",
      body: (
        <>
          <ul>
            <li>
              <strong>Trafik kazası:</strong> Asliye Hukuk Mahkemesi (sigortacıya
              karşı) veya Asliye Ticaret Mahkemesi (sigorta sözleşmesi
              uyuşmazlığı). Zamanaşımı KTK m. 109 — ceza zamanaşımıyla aynı.
            </li>
            <li>
              <strong>İş kazası:</strong> İş Mahkemesi; arabuluculuk dava
              şartı; haksız fiil zamanaşımı kural olarak 2 yıl/10 yıl, ceza
              zamanaşımı uzunsa o uygulanır (TBK m. 72).
            </li>
            <li>
              <strong>Malpraktis (özel sağlık):</strong> Tüketici Mahkemesi
              veya Asliye Hukuk Mahkemesi; ceza şikâyeti varsa zamanaşımı
              ceza zamanaşımı kadar uzar.
            </li>
            <li>
              <strong>Malpraktis (kamu sağlık):</strong> İdare Mahkemesi —
              60 gün içinde idareye başvuru, ardından 60 gün içinde dava.
            </li>
          </ul>
          <p>
            İspat yükü zarar görenin üzerindedir; ancak kusursuz sorumluluk
            hâllerinde davalı taraf, illiyet bağının kesildiğini (mücbir
            sebep, üçüncü kişinin ağır kusuru) ispat etmedikçe sorumluluktan
            kurtulamaz.
          </p>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda tazminat avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Trafik kazası geçirdiniz; sigorta şirketi yetersiz teklif
              sundu veya tedavi masraflarınızı karşılamadı.
            </li>
            <li>
              İş kazası sonrasında SGK gelir bağladı; ancak işverenin kusuru
              nedeniyle <strong>fark tazminat</strong> talep edeceksiniz.
            </li>
            <li>
              Bir yakınınızı kazada veya tıbbi bir müdahalede kaybettiniz —{" "}
              <strong>destekten yoksun kalma</strong> davası süresi bekleme
              kaldırmaz.
            </li>
            <li>
              Doktor hatası şüphesi var; öncelikle tıbbi kayıtlar ve patoloji
              raporları için <strong>bilirkişi öncesi delil tespiti</strong>{" "}
              davası gerekebilir.
            </li>
            <li>
              Kamu hastanesinde yaşanan olay için <strong>idareye 60 gün
              içinde başvuru</strong> süresini kaçırmamak.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question:
        "Trafik kazasında sigorta şirketinin teklifini kabul etmeden ne yapmalıyım?",
      answer:
        "Sigorta tarafından sunulan teklif çoğu zaman gerçek zararın altında kalır; ibraname imzalamak sonradan yapılacak fark talebini hukuken zorlaştırır. İmza atmadan önce kusur oranı, tedavi masrafları, kazanç kaybı ve manevi tazminat kalemlerinin avukat tarafından hesaplanmasını talep etmek doğru olur.",
    },
    {
      question:
        "İş kazası tazminatında SGK gelirinden ayrı dava açabilir miyim?",
      answer:
        "Evet. SGK ödemeleri sosyal güvenlik niteliğinde olup gerçek zararın tamamını karşılamaz. İşverenin kusur oranıyla orantılı olarak fark maddi tazminat ile manevi tazminat ayrıca iş mahkemesinde talep edilebilir. SGK'nın peşin sermaye değerli rücuyu hesaplamada düşülür.",
    },
    {
      question: "Manevi tazminat miktarı nasıl belirlenir?",
      answer:
        "TBK m. 56 uyarınca hâkim hakkaniyet ilkesini gözeterek belirler. Tarafların ekonomik durumu, kusur oranı, olayın gelişme şekli, mağdurun yaşı ve sürekli maluliyet derecesi başlıca kıstaslardır. Yargıtay uygulaması, ne çok düşük ne de zarar görenin zenginleşmesine yol açacak kadar yüksek miktarları kabul etmez.",
    },
    {
      question: "Trafik kazasında zamanaşımı kaç yıldır?",
      answer:
        "KTK m. 109 uyarınca 2 yıllık ve 10 yıllık zamanaşımı genel kural; ancak fiil aynı zamanda suç oluşturuyorsa, daha uzun olan ceza zamanaşımı uygulanır. Örneğin taksirle ölüme sebebiyet veren kazada bu süre 15 yıla kadar uzayabilir; her dosya tek tek değerlendirilmelidir.",
    },
    {
      question: "Kamu hastanesindeki tıbbi hata için nereye başvurmalıyım?",
      answer:
        "Kamu sağlık kurumlarında doğan zararlarda hizmet kusuru söz konusudur ve dava idare mahkemesinde açılır. Önce idareye yazılı başvuru yapılır; idarenin 60 günlük sürede cevap vermemesi veya talebi reddetmesi hâlinde 60 gün içinde tam yargı davası açılır.",
    },
    {
      question:
        "Estetik ameliyatta sonuç istediğim gibi olmadı; tazminat talep edebilir miyim?",
      answer:
        "Estetik müdahalelerde hekim-hasta ilişkisi kural olarak eser sözleşmesi olarak nitelendirilir. Bu ilişkide sadece özen değil, vaat edilen sonucun gerçekleşmesi de yükümlülüktür. Sonucun objektif olarak vaat edilenin altında kalması, kusur olarak değerlendirilebilir; tüketici mahkemesinde dava açılabilir.",
    },
    {
      question:
        "Trafik kazasında kusur oranını kim belirler?",
      answer:
        "Kusur, mahkemece görevlendirilen trafik bilirkişisi raporuyla belirlenir. Polis kaza tespit tutanağı bağlayıcı değildir; mahkeme aşamasında deliller (görgü tanıkları, kamera görüntüleri, araç hasarları, frenleme izleri) yeniden değerlendirilir. İtirazlar üzerine ek bilirkişi heyetleri de görevlendirilebilir.",
    },
  ],
};

