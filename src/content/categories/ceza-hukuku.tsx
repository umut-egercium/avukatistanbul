// Long-form content for /hizmetler/ceza-hukuku.
// Targets "ceza avukatı istanbul". TCK + CMK references throughout.

import type { CategoryArticle } from "./bosanma-hukuku";

export const cezaHukukuArticle: CategoryArticle = {
  lead: "Hakkınızda bir soruşturma açıldıysa veya bir suçun mağduru iseniz, ceza yargılamasının ilk saatleri sonucu doğrudan etkiler. AvukatIstanbul, İstanbul'un ağır ceza, asliye ceza ve sulh ceza mahkemelerinde sanık ve mağdur müdafiliği yapmış İstanbul Barosu'na kayıtlı ceza avukatlarını size en hızlı şekilde ulaştırır.",
  sections: [
    {
      id: "ceza-hukuku-nedir",
      title: "Ceza hukuku ve mahkemelerin yapısı",
      body: (
        <>
          <p>
            Ceza hukuku, kişiler ile devlet arasındaki cezai
            uyuşmazlıklarda <strong>suç</strong> ve <strong>cezayı</strong>{" "}
            düzenleyen kamu hukuku dalıdır. Maddi ceza hukukunun temel kanunu{" "}
            <strong>5237 sayılı Türk Ceza Kanunu (TCK)</strong>, yargılama
            usulünün temel kanunu ise{" "}
            <strong>5271 sayılı Ceza Muhakemesi Kanunu (CMK)</strong>'dur.
          </p>
          <p>
            İstanbul'da ceza yargılaması, suçun cezasının ağırlığına göre
            farklı mahkemelerde yürür:
          </p>
          <ul>
            <li>
              <strong>Sulh Ceza Hâkimliği</strong> — soruşturma aşamasındaki
              tutuklama, adli kontrol, arama, el koyma kararlarını verir;
              esas yargılama yapmaz.
            </li>
            <li>
              <strong>Asliye Ceza Mahkemesi</strong> — alt sınırı 10 yıldan az
              hapis cezası gerektiren suçların yargılamasını yapar
              (örneğin hakaret, basit yaralama, hırsızlık, taksirle yaralama).
            </li>
            <li>
              <strong>Ağır Ceza Mahkemesi</strong> — alt sınırı 10 yıl ve
              üzeri hapis cezası gerektiren suçlar (kasten öldürme, yağma,
              cinsel saldırı, uyuşturucu ticareti, devletin güvenliğine karşı
              suçlar).
            </li>
          </ul>
          <p>
            İstanbul'da büyük adliyelerin başında <strong>İstanbul Adliyesi
            (Çağlayan)</strong>, <strong>Anadolu Adliyesi (Kartal)</strong>,
            <strong>Bakırköy Adliyesi</strong> ve <strong>Küçükçekmece
            Adliyesi</strong> gelir; suçun işlendiği yer veya sanığın yakalandığı
            yer kuralı çerçevesinde dosya bunlardan birinde görülür.
          </p>
        </>
      ),
    },
    {
      id: "soruşturma-kovuşturma",
      title: "Soruşturma ve kovuşturma evreleri",
      body: (
        <>
          <p>
            Ceza yargılaması iki ana evreye ayrılır:
          </p>
          <h3>Soruşturma evresi (savcılık aşaması)</h3>
          <p>
            Şikayet, ihbar veya re'sen başlayan soruşturma, Cumhuriyet
            Başsavcılığı tarafından yürütülür. Bu evrede şüpheli ifade verir,
            tanıklar dinlenir, deliller toplanır. Savcı yeterli şüphe görürse
            <strong> iddianame</strong> düzenler ve mahkemeye gönderir; aksi
            hâlde <strong>kovuşturmaya yer olmadığına dair karar (KYOK)</strong>
            verir.
          </p>
          <h3>Kovuşturma evresi (mahkeme aşaması)</h3>
          <p>
            İddianamenin kabulüyle başlar. Sanık iddianameye karşı savunma
            yapar; tanık ve uzmanlar duruşmada dinlenir; deliller değerlendirilir.
            Yargılama sonunda mahkeme; <strong>beraat</strong>,{" "}
            <strong>mahkûmiyet</strong>, <strong>davanın düşmesi</strong> veya
            CMK m. 223'te sayılan diğer kararlardan birini verir.
          </p>
        </>
      ),
    },
    {
      id: "supheli-saniik-haklari",
      title: "Şüphelinin ve sanığın temel hakları",
      body: (
        <>
          <p>
            CMK; ifade ve sorgu sırasında şüphelinin/sanığın bilgilendirilmesi
            gereken hakları açıkça düzenler:
          </p>
          <ul>
            <li>
              <strong>Müdafi (avukat) hakkı (CMK m. 147, 149):</strong> İfade
              ve sorgu boyunca avukat bulundurma; avukat tutamayacak durumdaki
              kişiye baronun atadığı CMK avukatı.
            </li>
            <li>
              <strong>Susma hakkı (CMK m. 147/1-e):</strong> Aleyhe beyanda
              bulunmama, soruları cevaplamama hakkı; susmak aleyhe
              değerlendirilemez.
            </li>
            <li>
              <strong>Suçlamayı öğrenme hakkı (CMK m. 147/1-b):</strong>{" "}
              Suçlanan eylem ve hangi suç olarak nitelendirildiğinin açıklanması.
            </li>
            <li>
              <strong>Yakınlarına haber verilme (CMK m. 95):</strong> Gözaltına
              alınan kişinin yakınlarına gecikmeksizin haber verilmesi.
            </li>
            <li>
              <strong>Tercüman hakkı (CMK m. 202):</strong> Türkçe bilmeyen
              veya engelli sanık için ücretsiz tercüman.
            </li>
          </ul>
          <p>
            Bu haklar tutanağa geçirilmeden alınan ifadeler{" "}
            <strong>hukuka aykırı delil</strong> niteliğinde olup hükme esas
            alınamaz (CMK m. 148, 217/2).
          </p>
        </>
      ),
    },
    {
      id: "tutuklama-adli-kontrol",
      title: "Tutuklama, adli kontrol ve sulh ceza hâkimliği",
      body: (
        <>
          <p>
            Tutuklama, soruşturmanın selameti veya delil karartılmasının
            önlenmesi için son çare olarak başvurulan bir koruma tedbiridir
            (CMK m. 100). Tutuklama yerine, daha hafif bir tedbir olan{" "}
            <strong>adli kontrol</strong> uygulanabilir (CMK m. 109): yurt
            dışına çıkış yasağı, belirli yerlere gitmeme, imza atma, konutu
            terk etmeme veya elektronik kelepçe gibi.
          </p>
          <p>
            Tutuklama veya adli kontrol kararına karşı{" "}
            <strong>7 gün içinde</strong> itiraz edilebilir (CMK m. 268). İtiraz
            mercii, kararı veren sulh ceza hâkimliğine numara olarak en yakın
            olan diğer sulh ceza hâkimliğidir.
          </p>
        </>
      ),
    },
    {
      id: "uzlastirma-onodeme",
      title: "Uzlaştırma, ön ödeme ve seri muhakeme",
      body: (
        <>
          <p>
            Bazı suçlarda ceza yargılamasının yerine geçen veya onu kısaltan
            alternatif kurumlar uygulanır:
          </p>
          <h3>Uzlaştırma (CMK m. 253)</h3>
          <ul>
            <li>
              Taksirle yaralama, hakaret, tehdit, mala zarar verme, konut
              dokunulmazlığını ihlal, basit yaralama gibi suçlarda{" "}
              <strong>zorunlu</strong> bir aşamadır.
            </li>
            <li>
              Mağdur ile şüpheli, eğitimli bir uzlaştırmacı eliyle bir araya
              gelmeden, yazılı veya sözlü iletişimle uzlaşma müzakeresi yürütür.
            </li>
            <li>
              Uzlaşma sağlanırsa kovuşturmaya yer olmadığına karar verilir;
              mahkeme aşamasında ise düşme kararı verilir.
            </li>
          </ul>
          <h3>Ön ödeme (TCK m. 75)</h3>
          <ul>
            <li>
              Hapis cezasının üst sınırı 6 ayı geçmeyen veya yalnızca adli para
              cezası gerektiren suçlarda uygulanabilir.
            </li>
            <li>
              Şüpheli, savcılık tarafından bildirilen miktarı 10 gün içinde
              ödediğinde kamu davası açılmaz.
            </li>
          </ul>
          <h3>Seri muhakeme usulü (CMK m. 250)</h3>
          <ul>
            <li>
              Hakaret, tehdit gibi belirli suçlarda; sanığın suçlamayı
              kabulüyle savcı, indirimli cezayı sanığa teklif eder; mahkeme
              kabul edip onaylar.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "yargilama-sonu-istinaf",
      title: "Yargılama sonu, istinaf ve temyiz",
      body: (
        <>
          <p>
            Mahkeme kararının tefhim veya tebliğinden itibaren{" "}
            <strong>7 gün içinde</strong> istinaf (Bölge Adliye Mahkemesi)
            yoluna başvurulabilir (CMK m. 273). İstanbul Bölge Adliye
            Mahkemesi, ilk derece mahkemesinin kararını maddi vakıa ve hukuki
            yönden yeniden inceler; gerekirse yeniden duruşma açar.
          </p>
          <p>
            İstinaf kararına karşı, kanun yararına bozma yolu ayrık olmak
            üzere, hapis cezasının süresine bağlı olarak{" "}
            <strong>15 gün içinde temyiz</strong> başvurusu yapılabilir
            (CMK m. 291). Temyiz mercii Yargıtay'dır.
          </p>
          <p>
            Hükmün kesinleşmesinin ardından <strong>infaz</strong> aşaması
            başlar; bu aşamada <strong>denetimli serbestlik</strong>,{" "}
            <strong>açık ceza infaz kurumuna ayrılma</strong> ve{" "}
            <strong>koşullu salıverme</strong> hesaplamaları için ayrı bir
            uzmanlık gerekir.
          </p>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda ceza avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Hakkınızda <strong>çağrı kâğıdı, yakalama veya gözaltı kararı</strong>{" "}
              bildirimi aldıysanız, ifade vermeden önce.
            </li>
            <li>
              Bir suçun mağduru olarak <strong>şikâyet</strong>{" "}
              dilekçesi hazırlatmak ve davaya katılan sıfatıyla katılmak
              istiyorsanız.
            </li>
            <li>
              Trafik kazasında <strong>taksirle yaralama veya öldürme</strong>{" "}
              soruşturması açıldıysa.
            </li>
            <li>
              Sosyal medyada hakaret, tehdit veya bilişim suçlarında{" "}
              <strong>içerik kaldırma ve suç duyurusu</strong> birlikte
              yürütülecekse.
            </li>
            <li>
              Tutuklu yakınınızın tahliye veya adli kontrol talebi için.
            </li>
            <li>
              Mahkûmiyet sonrası <strong>infaz hukuku</strong> ve denetimli
              serbestlik hesabı için.
            </li>
          </ul>
          <p>
            Erken alınan profesyonel destek, çoğu zaman dosyanın seyrini
            belirler; özellikle ifade ve sorgu aşamasındaki avukatlı savunma,
            sonraki tüm aşamaların temelini atar.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Karakolda ifade vermeden önce avukat çağırma hakkım var mı?",
      answer:
        "Evet. CMK m. 147 uyarınca şüphelinin müdafi seçme veya baroca bir avukat görevlendirilmesini isteme hakkı vardır; bu hak ifade alınmadan önce hatırlatılmak zorundadır. Avukat hazır olmadan zorunlu ifade alınamaz; aksi hâlde ifade hükme esas alınamaz.",
    },
    {
      question: "Susma hakkımı kullanırsam aleyhime mi olur?",
      answer:
        "Hayır. Anayasa m. 38 ve CMK m. 147 uyarınca aleyhe beyanda bulunmama hakkı temel bir güvencedir. Şüphelinin susması, suçluluğun karinesi olarak kullanılamaz ve hükme dayanak yapılamaz.",
    },
    {
      question: "Hangi suçlarda uzlaştırma zorunludur?",
      answer:
        "Taksirle yaralama, kasten yaralamanın temel hâli, tehdit (TCK m. 106/1 birinci cümle), hakaret (kamu görevlisine karşı görevi nedeniyle hakaret hariç), konut dokunulmazlığını ihlâl, mala zarar verme, basit dolandırıcılık ve hırsızlık gibi pek çok suçta uzlaştırma zorunludur. Tam liste için savcılığın suçu hangi maddeye göre nitelediğine bakılmalıdır.",
    },
    {
      question:
        "Tutuklama kararına itiraz edersem ne kadar sürede sonuç alırım?",
      answer:
        "İtiraz başvurusu CMK m. 268 uyarınca 7 gün içinde yapılır; itirazı inceleyen sulh ceza hâkimliği uygulamada birkaç gün içinde dosya üzerinden karar verir. Reddedilirse aynı dosyada koşullar değiştikçe yeniden tahliye talep edilebilir.",
    },
    {
      question: "Ön ödeme önerisini kabul edersem suç işlemiş sayılır mıyım?",
      answer:
        "Hayır. TCK m. 75 uyarınca ön ödeme yapıldığında kamu davası açılmaz; sicile suç işlemiş gibi yansımaz. Ancak ön ödeme yalnızca yasada açıkça izin verilen, alt-üst sınırı 6 aydan fazla hapsi gerektirmeyen veya yalnızca adli para cezası öngörülen suçlarda uygulanabilir.",
    },
    {
      question:
        "Sosyal medyada hakarete uğradım; nasıl bir ceza süreci işler?",
      answer:
        "TCK m. 125 kapsamında savcılığa veya doğrudan kolluk üzerinden suç duyurusu yapılır; içerik bilgileri delil olarak sunulur. Bunun yanında 5651 sayılı Kanun çerçevesinde Sulh Ceza Hâkimliğinden içeriğin çıkarılması veya erişimin engellenmesi talep edilebilir; ek olarak manevi tazminat davası açılabilir.",
    },
    {
      question:
        "Yurt dışında olduğum için duruşmaya katılamayacağım; ne yapmalıyım?",
      answer:
        "Avukatınız aracılığıyla mahkemeden mazeret bildirebilir veya CMK m. 196 çerçevesinde sorgunuzun istinabe yoluyla yapılmasını talep edebilirsiniz. Bazı suçlarda hâkim, sanığın yokluğunda yargılama yapılmasına izin vermez; bu nedenle dosyanın özel durumuna göre erken planlama önemlidir.",
    },
  ],
};

