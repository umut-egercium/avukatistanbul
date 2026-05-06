// Long-form content for /hizmetler/gayrimenkul-kira-hukuku.
// Targets "gayrimenkul avukatı istanbul" + "kira avukatı istanbul".
// 6098 TBK kira hükümleri, 634 sayılı Kat Mülkiyeti Kanunu (KMK), 4721 TMK,
// 2942 Kamulaştırma Kanunu, 6306 sayılı Afet Riski Altındaki Alanların
// Dönüştürülmesi Hakkında Kanun.

import type { CategoryArticle } from "./bosanma-hukuku";

export const gayrimenkulKiraHukukuArticle: CategoryArticle = {
  lead: "Tapu iptal-tescil, kira tespit ve uyarlama, tahliye, kat mülkiyeti uyuşmazlıkları, kentsel dönüşüm anlaşmazlıkları… Gayrimenkul davaları küçük usul hatalarının büyük mali sonuçlar doğurduğu bir alandır. AvukatIstanbul, İstanbul'un gayrimenkul yoğunluklu ilçelerinde kira ve tapu davalarında uzmanlaşmış avukatları size doğrudan ulaştırır.",
  sections: [
    {
      id: "gayrimenkul-hukuku-nedir",
      title: "Gayrimenkul ve kira hukukunun konusu",
      body: (
        <>
          <p>
            Gayrimenkul hukuku; taşınmaz mülkiyetinin kazanılması,
            korunması, sınırlandırılması ve sona erdirilmesi ile kira gibi
            kullanım ilişkilerini düzenler. Başlıca kanunlar:
          </p>
          <ul>
            <li>
              <strong>4721 sayılı Türk Medeni Kanunu (TMK):</strong> Mülkiyet
              ve eşya hukuku genel hükümleri.
            </li>
            <li>
              <strong>6098 sayılı Türk Borçlar Kanunu (TBK):</strong> Kira
              sözleşmesi (m. 299-378).
            </li>
            <li>
              <strong>634 sayılı Kat Mülkiyeti Kanunu (KMK):</strong> Kat irtifakı,
              kat mülkiyeti, ortak alan kullanımı.
            </li>
            <li>
              <strong>2942 sayılı Kamulaştırma Kanunu:</strong> İdarenin
              taşınmaz mal edinme yöntemi.
            </li>
            <li>
              <strong>6306 sayılı Kanun:</strong> Riskli yapı tespiti ve kentsel
              dönüşüm.
            </li>
          </ul>
          <p>
            Kira ve tahliye davaları <strong>Sulh Hukuk Mahkemesinde</strong>;
            tapu iptal-tescil, ortaklığın giderilmesi gibi davalar{" "}
            <strong>Asliye Hukuk Mahkemesinde</strong>; kentsel dönüşüm ve
            kamulaştırmadan doğan idari uyuşmazlıklar ise{" "}
            <strong>İdare Mahkemesinde</strong> görülür.
          </p>
        </>
      ),
    },
    {
      id: "kira-sozlesmesi",
      title: "Kira sözleşmesi, kira artışı ve uyarlama",
      body: (
        <>
          <h3>Kira sözleşmesinin türleri</h3>
          <ul>
            <li>
              <strong>Konut kirası:</strong> Çatılı işyeri kiralarıyla birlikte
              TBK'nın özel hükümlerine tabidir (m. 339-356); kiracı lehine
              koruyucu rejim uygulanır.
            </li>
            <li>
              <strong>Çatılı işyeri kirası:</strong> Konut hükümlerine tabi
              olmakla birlikte, kira tespit ve uyarlamada bazı esneklikler
              içerir.
            </li>
            <li>
              <strong>Çatısız işyeri / arsa kirası:</strong> Genel kira
              hükümleri uygulanır; sözleşme serbestisi daha geniştir.
            </li>
          </ul>
          <h3>Kira artış sınırı (TBK m. 344)</h3>
          <p>
            Kural olarak konut ve çatılı işyeri kira artışı, bir önceki kira
            yılındaki <strong>tüketici fiyat endeksindeki on iki aylık
            ortalama</strong> oranını geçemez. 2022-2024 döneminde uygulanan{" "}
            <strong>geçici %25 sınırı</strong>'na ilişkin yasal düzenlemenin
            yürürlük durumu sözleşme tarihi ve dava açıldığı zamana göre
            tek tek değerlendirilmelidir.
          </p>
          <h3>Beş yıl ve sonrası — hâkim takdiriyle kira tespit (TBK m. 344/3)</h3>
          <p>
            Beş yıldan uzun süredir devam eden kira ilişkisinde taraflardan
            biri kira bedelinin yeniden belirlenmesini talep edebilir. Hâkim;
            piyasa rayici, taşınmazın durumu ve kiracı ile kiraya verenin
            karşılıklı menfaatlerini gözeterek <strong>hak ve nesafete
            uygun</strong> yeni kirayı belirler.
          </p>
          <h3>Uyarlama davası (TBK m. 138)</h3>
          <p>
            Beklenmeyen aşırı koşullar (yüksek enflasyon, ekonomik kriz)
            sözleşmede edimler dengesini ciddi biçimde bozarsa, taraf{" "}
            <strong>uyarlama</strong> davası açabilir. Uygulamada, sözleşmenin
            uzun süredir devam etmesi ve yeni kiranın piyasanın çok altında
            kalması temel ölçütlerdir.
          </p>
        </>
      ),
    },
    {
      id: "tahliye-davalari",
      title: "Tahliye davaları: sebepleri ve usulleri",
      body: (
        <>
          <p>
            Konut ve çatılı işyeri kiralarında kiracıyı tahliye yolları
            sınırlı sayıdadır. En sık başvurulan sebepler:
          </p>
          <ul>
            <li>
              <strong>İhtiyaç nedeniyle tahliye (TBK m. 350):</strong> Kiraya
              verenin kendi, eşinin, altsoyu, üstsoyu veya bakmakla yükümlü
              olduğu kişilerin <strong>gerçek ve samimi konut/işyeri ihtiyacı</strong>{" "}
              için. Belirli süreli kiralarda sürenin sonunda; belirsiz süreli
              kiralarda fesih bildirim sürelerine uyularak açılır.
            </li>
            <li>
              <strong>Yeniden inşa ve imar (TBK m. 350/2):</strong> Yapının
              esaslı tadilat, onarım veya yeniden inşası için kullanılması
              zorunluluğu.
            </li>
            <li>
              <strong>İki haklı ihtar (TBK m. 352/2):</strong> Kira yılı içinde
              iki haklı ihtara sebep olan kiracı, kira yılı bitiminden itibaren
              1 ay içinde tahliye edilebilir.
            </li>
            <li>
              <strong>Temerrüt nedeniyle tahliye (TBK m. 315):</strong> Kira
              ödenmediğinde 30 günlük ihtarname tebliğ edilir; süre içinde
              ödenmezse sözleşme feshedilerek tahliye istenir.
            </li>
            <li>
              <strong>10 yıllık uzama dönemi (TBK m. 347):</strong> 10 yıllık
              uzama süresinin sonunda kiraya veren, fesih bildirim süresine
              uyarak (3 ay) sebep göstermeksizin tahliye isteyebilir.
            </li>
            <li>
              <strong>Tahliye taahhüdü (TBK m. 352/1):</strong> Kiracının
              bizzat ve serbest iradesiyle, kiranın başlamasından <strong>sonra</strong>
              imzaladığı yazılı tahliye taahhüdüne dayanılarak.
            </li>
          </ul>
          <p>
            Tahliye davalarının görevli mahkemesi <strong>Sulh Hukuk
            Mahkemesi</strong>; yetkili mahkeme taşınmazın bulunduğu yerdir.
            Kira ödenmemesinde icra takibi ve "tahliye talepli icra" yolu
            paralel olarak işletilebilir.
          </p>
        </>
      ),
    },
    {
      id: "tapu-iptal-tescil",
      title: "Tapu iptal ve tescil davaları",
      body: (
        <>
          <p>
            Tapu sicilindeki bir kaydın hukuka aykırı olduğu iddiası, tapu
            iptal-tescil davası ile ileri sürülür. Sık karşılaşılan başlıklar:
          </p>
          <ul>
            <li>
              <strong>Hile, gabin, ehliyetsizlik:</strong> Sözleşmeyi sakatlayan
              irade sakatlıkları (TBK m. 30 vd.).
            </li>
            <li>
              <strong>Muris muvazaası:</strong> Mirastan mal kaçırma —
              1.4.1974 tarihli İBK uygulanır.
            </li>
            <li>
              <strong>Kazandırıcı zamanaşımıyla iktisap (TMK m. 713):</strong>{" "}
              Tapuda olmayan veya hatalı tapu kaydında 20 yıllık nizasız ve
              davasız zilyetlik.
            </li>
            <li>
              <strong>Yolsuz tescil:</strong> Sahte vekâletname, kayıttaki
              hata.
            </li>
            <li>
              <strong>Önalım (şufa) hakkı (TMK m. 732):</strong> Paylı
              mülkiyette diğer paydaşın satışına 3 ay içinde dava ile ortak
              olma.
            </li>
          </ul>
          <p>
            Görevli mahkeme <strong>Asliye Hukuk Mahkemesi</strong>; yetkili
            mahkeme taşınmazın bulunduğu yer mahkemesidir (HMK m. 12).
            Bilirkişi keşfi dava sürecinin temel aşamasıdır; piyasa rayicinin
            tespiti ve kayıt incelemesi için ayrı bilirkişiler görevlendirilir.
          </p>
        </>
      ),
    },
    {
      id: "kat-mulkiyeti",
      title: "Kat mülkiyeti uyuşmazlıkları",
      body: (
        <>
          <p>
            <strong>634 sayılı Kanun</strong> kapsamında apartman ve site
            içinde sıkça karşılaşılan uyuşmazlıklar:
          </p>
          <ul>
            <li>
              <strong>Kat malikleri kurulu kararının iptali (KMK m. 33):</strong>{" "}
              Yönetim planına veya kanuna aykırı kararlara karşı 6 ay içinde
              sulh hukuk mahkemesinde dava.
            </li>
            <li>
              <strong>Aidat ve gecikme zammı:</strong> İcra takibinin ardından
              itiraz edilirse itirazın iptali davası.
            </li>
            <li>
              <strong>Ortak yer kullanımı:</strong> Bahçe, otopark, çatı,
              cephe gibi ortak yerlerin kullanımına müdahalenin önlenmesi.
            </li>
            <li>
              <strong>Çekilmezlik ve mülkiyet hakkından yararlandırmama (KMK
              m. 25):</strong> Diğer kat maliklerine olağanüstü zorluk çıkaran
              malikten dairesinin satışının istenmesi.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "kentsel-donusum",
      title: "Kentsel dönüşüm ve kamulaştırma",
      body: (
        <>
          <h3>Kentsel dönüşüm — 6306 sayılı Kanun</h3>
          <p>
            Riskli yapı tespiti, Çevre, Şehircilik ve İklim Değişikliği
            Bakanlığınca lisanslı kuruluşlarca yapılır. Tespit kesinleştiğinde
            yapının yıkımı için süre verilir; 2/3 çoğunluk kararıyla yenileme
            kararı alınır. Karara katılmayan paydaşın hissesi, kanun
            çerçevesinde satışa konu olabilir. Kentsel dönüşüm uyuşmazlıkları
            <strong> idari yargı (idare mahkemesi)</strong> alanına girer.
          </p>
          <h3>Kamulaştırma — 2942 sayılı Kanun</h3>
          <ul>
            <li>
              <strong>Anlaşmalı kamulaştırma (m. 8):</strong> İdarenin uzlaşma
              komisyonu ile yürüttüğü pazarlık.
            </li>
            <li>
              <strong>Bedel tespit ve tescil davası (m. 10):</strong>{" "}
              Anlaşılamadığında idare, asliye hukuk mahkemesinde dava açar;
              mahkeme bilirkişi raporuyla bedeli belirler ve taşınmazın idare
              adına tescilini sağlar.
            </li>
            <li>
              <strong>Acele kamulaştırma (m. 27):</strong> Kamu yararı
              gerekçesiyle acele el koyma; bedel tespiti ardından yürütülür.
            </li>
            <li>
              <strong>Kamulaştırmasız el atma:</strong> İdarenin kamulaştırma
              kararı almadan taşınmaza fiili veya hukuki müdahalesi —
              bedel/tazminat davası.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda gayrimenkul avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Kiracınızı ihtiyaç, yeniden inşa veya temerrüt sebebiyle
              tahliye etmeyi düşünüyorsunuz — süreler ve ihtarname içeriği
              belirleyici.
            </li>
            <li>
              Kira artış oranı tartışmalı; <strong>kira tespit davası</strong>{" "}
              gündeminizde.
            </li>
            <li>
              Tapuda <strong>yolsuz tescil, miras kaynaklı muvazaa veya
              ehliyetsizlik</strong> şüphesi var.
            </li>
            <li>
              Apartman yönetim kurulu kararı aleyhinize; 6 aylık iptal davası
              süresi var.
            </li>
            <li>
              Riskli yapı tespiti yapıldı; 2/3 çoğunluk kararına itiraz
              edeceksiniz.
            </li>
            <li>
              Kamulaştırma kararı tebliğ edildi; bedele itiraz veya bedel
              artırım davası planlıyorsunuz.
            </li>
            <li>
              Yabancı gerçek/tüzel kişi olarak Türkiye'de taşınmaz alımı —
              ülke kısıtlamaları ve onay süreçleri için.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Kiracım kira ödememeye başladı; ne kadar sürede tahliye olur?",
      answer:
        "İcra Müdürlüğü aracılığıyla 30 günlük ödeme emri tebliğ ettirilir; süre içinde ödenmezse aynı dosyadan tahliye talebi yapılır ve sulh hukuk mahkemesinden tahliye kararı alınır. Sürecin İstanbul'da ortalaması itiraz aşaması dahil 4-9 aydır; itirazın olmaması hâlinde önemli ölçüde kısalır.",
    },
    {
      question:
        "Konut kira artışı %25 sınırına tabi mi yoksa TÜFE üzerinden mi?",
      answer:
        "Genel kural TBK m. 344 — son on iki aylık TÜFE ortalaması. 2022 yazından itibaren yürürlüğe giren ve birkaç kez uzatılan geçici %25 sınırının yenilenip yenilenmediği sözleşme yenileme tarihinde geçerli mevzuata göre değerlendirilir. Mevcut yıl için kesin oran avukat tarafından doğrulanmalıdır.",
    },
    {
      question:
        "Daireyi ihtiyaç sebebiyle tahliye edebilmem için ne yapmam gerekir?",
      answer:
        "Belirli süreli sözleşmede sürenin sonunda, belirsiz süreli sözleşmede fesih bildirim süresine (genelde 3 ay) uyarak 1 ay içinde tahliye davası açılır. İhtiyacın gerçek ve samimi olduğu, davacının veya kanunda sayılan yakınlarının söz konusu konuta ihtiyacı olduğu somut olarak ispat edilmelidir. İhtiyaç sona erdiğinde 3 yıl içinde başkasına kiralayan, eski kiracıya tazminatla sorumlu olur (TBK m. 355).",
    },
    {
      question:
        "Tahliye taahhüdü her zaman geçerli midir?",
      answer:
        "Hayır. Tahliye taahhüdünün geçerli olması için TBK m. 352/1 uyarınca yazılı, kiracının kendi imzasıyla ve kiranın başlamasından sonra düzenlenmiş olması gerekir. Sözleşmeyle birlikte alınan ya da ileride değiştirilmesi mümkün boşluklarla bırakılan tahliye taahhütleri, mahkeme tarafından geçersiz sayılır.",
    },
    {
      question:
        "Tapudaki bir hatayı nasıl düzelttiririm?",
      answer:
        "Maddi hata (yazım, yüzölçümü farkı) tapu müdürlüğüne başvuru ile düzeltilebilir; düzeltme reddedilirse veya hata maddi olmayan bir konuya ilişkinse asliye hukuk mahkemesinde tapu kaydının düzeltilmesi/iptali davası açılır. Yetki taşınmazın bulunduğu yer mahkemesidir.",
    },
    {
      question:
        "Riskli yapı tespitine itiraz edebilir miyim?",
      answer:
        "Evet. 6306 sayılı Kanun ve uygulama yönetmeliği uyarınca tespit kararına 15 gün içinde Çevre, Şehircilik ve İklim Değişikliği Bakanlığına bağlı teknik heyetlere itiraz edilebilir. Heyetin red kararına karşı idare mahkemesinde iptal davası açılabilir.",
    },
    {
      question:
        "Kamulaştırma bedeli düşük tutuldu; ne yapmalıyım?",
      answer:
        "İdare 2942 sayılı Kanun m. 10 uyarınca asliye hukuk mahkemesinde bedel tespit ve tescil davası açar. Bilirkişi raporuna karşı itiraz edebilir, ek bilirkişi heyeti talep edebilir, gerekirse Yargıtay aşamasına götürebilirsiniz. Davayı malikin lehine sonuçlandıran en önemli unsur, taşınmazın imar planı, emsal satışlar ve gelir verileriyle desteklenmiş alternatif rapordur.",
    },
  ],
};

