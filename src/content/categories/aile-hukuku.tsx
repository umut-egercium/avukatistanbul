// Long-form content for /hizmetler/aile-hukuku.
// Targets "aile hukuku avukatı istanbul". TMK aile hukuku kitabı (m. 118-494),
// 6284 sayılı Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesine Dair
// Kanun, 5395 Çocuk Koruma Kanunu çerçevesinde.
//
// Boşanma davasının kendisi /hizmetler/bosanma-hukuku altında ayrıca işlenir;
// bu sayfa boşanma sonrası ve boşanma dışı aile hukuku konularına odaklanır.

import type { CategoryArticle } from "./bosanma-hukuku";

export const aileHukukuArticle: CategoryArticle = {
  lead: "Velayet değişikliği, kişisel ilişki, evlat edinme, vesayet, soybağı ve aile içi şiddete karşı koruma kararları, çoğu zaman boşanma sonrasında veya hiç evlilik bulunmadan da gündeme gelen aile hukuku konularıdır. AvukatIstanbul, İstanbul Aile Mahkemelerinde dava deneyimi olan aile hukuku avukatlarını sizinle hızlı şekilde buluşturur.",
  sections: [
    {
      id: "aile-hukuku-konu",
      title: "Aile hukuku ve İstanbul aile mahkemeleri",
      body: (
        <>
          <p>
            Aile hukuku, evlilik ile başlayan ve evlilik dışı durumları da
            kapsayan kişiler arası ilişkileri (eşler, ebeveyn-çocuk, vesayet)
            düzenler. Temel kaynak{" "}
            <strong>4721 sayılı Türk Medeni Kanunu (TMK)</strong>'nun aile
            hukuku kitabı (m. 118-494)'tür. Aile içi şiddete karşı koruma
            için <strong>6284 sayılı Kanun</strong>; çocuğa yönelik koruyucu-
            destekleyici tedbirler için <strong>5395 sayılı Çocuk Koruma
            Kanunu</strong> tamamlayıcıdır.
          </p>
          <p>
            Aile davaları kural olarak <strong>Aile Mahkemelerinde</strong>{" "}
            görülür; aile mahkemesi bulunmayan yerlerde Asliye Hukuk Mahkemesi
            "aile mahkemesi sıfatıyla" görev yapar. İstanbul'da büyük yoğunluk
            Çağlayan, Anadolu, Bakırköy ve Küçükçekmece adliyelerinde olup
            yetki kuralı dosyanın türüne göre farklı uygulanır (örneğin
            velayet için çocuğun yerleşim yeri).
          </p>
        </>
      ),
    },
    {
      id: "velayet-degisikligi",
      title: "Velayet ve velayet değişikliği",
      body: (
        <>
          <p>
            <strong>Velayet (TMK m. 335 vd.):</strong> Çocuğun şahsı ve
            mallarına ilişkin kararları alma yetkisidir. Evlilik içinde
            ebeveynler birlikte; boşanma hâlinde mahkemenin verdiği taraf
            tarafından kullanılır. Evlilik dışı doğan çocukta velayet kural
            olarak annededir.
          </p>
          <h3>Velayet kararının ölçütü: çocuğun üstün yararı</h3>
          <p>
            Mahkeme; çocuğun yaşı, anneyle olan duygusal bağı, eğitim koşulları,
            ekonomik ve sosyal çevre, sosyal hizmet uzmanı raporu ve idrak
            çağındaysa çocuğun görüşünü değerlendirir. Yargıtay, son yıllarda
            uygun koşullarda <strong>ortak velayet</strong> kararlarına da
            açıkça onay vermektedir (özellikle Avrupa İnsan Hakları
            Sözleşmesi 8. madde değerlendirmeleriyle).
          </p>
          <h3>Velayet değişikliği davası (TMK m. 183)</h3>
          <p>
            Velayet kararı kesin hüküm değildir; çocuğun yararını etkileyen
            yeni gelişmeler (ihmal, yer değiştirme, şiddet, sağlık) varsa diğer
            ebeveyn değişiklik davası açabilir. Mahkeme, sosyal hizmet
            inceleme raporu, pedagog ve psikolog görüşleriyle değerlendirme
            yapar.
          </p>
        </>
      ),
    },
    {
      id: "kisisel-iliski",
      title: "Kişisel ilişki kurma",
      body: (
        <>
          <p>
            <strong>TMK m. 323-324</strong> uyarınca velayeti elde etmeyen
            ebeveynin çocukla kişisel ilişki kurma hakkı vardır. Mahkeme;
          </p>
          <ul>
            <li>
              Hafta sonu, dini bayram, yarıyıl ve yaz tatili düzenini ayrıntılı
              olarak,
            </li>
            <li>
              Bebek dönemindeki kısıtlı ziyaretleri (yatılı olmaksızın),
            </li>
            <li>
              Yurt dışına götürme imkânı veya yurt dışı çıkış yasağı
              gerekliliklerini,
            </li>
            <li>
              Gerekli görüldüğünde sosyal hizmet uzmanı eşliğinde "kişisel ilişki
              merkezi"nde uygulama,
            </li>
          </ul>
          <p>
            ayrıntılı olarak hüküm altına alır. Karara aykırı davranışta
            bulunan ebeveyn için icra hukuku yoluyla "çocuk teslimi" işlemleri
            ve para cezası gündeme gelebilir.
          </p>
        </>
      ),
    },
    {
      id: "evlat-edinme",
      title: "Evlat edinme",
      body: (
        <>
          <p>
            TMK m. 305-320 evlat edinmeyi düzenler. Genel şartlar:
          </p>
          <ul>
            <li>
              Evlat edinen kişinin <strong>30 yaşını doldurmuş</strong> olması
              veya kanunda öngörülen istisnai hâllerin varlığı.
            </li>
            <li>
              Evlat edinen ile evlat edinilen arasında <strong>en az 18 yaş
              fark</strong> bulunması.
            </li>
            <li>
              Evli çiftler için — istisnai hâller hariç — <strong>birlikte
              evlat edinme zorunluluğu</strong> ve en az 5 yıllık evlilik veya
              30 yaşı doldurmuş olma şartı.
            </li>
            <li>
              Üvey çocuğun evlat edinilmesinde, eşin en az 2 yıllık evliliği veya
              30 yaşı doldurmuş olması.
            </li>
            <li>
              Küçüğün evlat edinilmesinde <strong>1 yıl bakım ve eğitim</strong>{" "}
              ön şartı.
            </li>
          </ul>
          <p>
            Süreç; Aile, Çalışma ve Sosyal Hizmetler Bakanlığına başvuru,
            sosyal inceleme, küçükle ön bakım ve mahkeme kararı aşamalarından
            geçer. Yetişkin evlat edinmede ek olarak akrabalık veya bakım
            koşulları aranır.
          </p>
        </>
      ),
    },
    {
      id: "vesayet",
      title: "Vesayet",
      body: (
        <>
          <p>
            TMK m. 396-485 vesayeti düzenler. Vesayet; küçükler için (anne-baba
            yoksa veya velayet kaldırıldıysa) ve akıl hastalığı, akıl zayıflığı,
            savurganlık, alkol/uyuşturucu bağımlılığı, kötü yönetim sebebiyle
            kısıtlanan kişiler için söz konusu olur.
          </p>
          <h3>Görev ve mahkeme</h3>
          <ul>
            <li>
              Vesayet işleri <strong>Sulh Hukuk Mahkemesinde</strong> görülür.
            </li>
            <li>
              Vesayet altına alınma kararıyla birlikte vasi atanır; vasi belirli
              periyodlarla mahkemeye hesap verir.
            </li>
            <li>
              Kayyımlık, vesayetin daha sınırlı bir biçimidir; belirli bir iş
              veya mal için (örneğin miras paylaşımı, dava takibi) atanır.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "soybagi-babalik",
      title: "Soybağı ve babalık davası",
      body: (
        <>
          <p>
            <strong>Babalık davası (TMK m. 301):</strong> Evlilik dışı doğan
            çocuğun veya annesinin babayı belirlemek için açtığı davadır.
            Doğumdan başlayarak <strong>1 yıllık hak düşürücü süre</strong>{" "}
            içinde açılır. DNA testi temel delildir.
          </p>
          <p>
            <strong>Soybağının reddi (TMK m. 286):</strong> Evlilik birliği
            içinde doğan çocuğun biyolojik baba olmadığını öne süren koca
            tarafından, doğumu öğrenmesinden itibaren 1 yıl içinde açılır.
          </p>
          <p>
            <strong>Tanıma:</strong> Baba, evlilik dışı doğan çocuğunu nüfus
            müdürlüğünde, mahkemede veya noter senedi ile resmen kabul eder.
          </p>
        </>
      ),
    },
    {
      id: "6284-koruma",
      title: "6284 sayılı Kanun: aile içi şiddete karşı koruma",
      body: (
        <>
          <p>
            <strong>6284 sayılı Kanun</strong>; aile içi ya da kadına karşı
            şiddet, tehdit veya tehlikeye karşı uzaklaştırma, koruma ve
            destekleyici tedbirler öngörür. Talep, en yakın karakola,
            savcılığa veya doğrudan Aile Mahkemesine yapılabilir; başvuru
            avukat olmaksızın da kabul edilir.
          </p>
          <h3>Verilebilecek tedbirler</h3>
          <ul>
            <li>
              Şiddet uygulayanın <strong>ortak konutdan uzaklaştırılması</strong>.
            </li>
            <li>
              Mağdurun yaklaşılma yasağı (ev, iş yeri, okul).
            </li>
            <li>
              İletişim kurmama yasağı (telefon, mesaj, sosyal medya).
            </li>
            <li>
              Geçici nafaka ve geçici velayet.
            </li>
            <li>
              Silah teslim etme zorunluluğu.
            </li>
            <li>
              Sığınmaevi yerleştirme.
            </li>
          </ul>
          <p>
            Tedbirler süreli olup ihtiyaç hâlinde uzatılır. Tedbire aykırılık,
            zorlama hapsi (3-10 gün) yaptırımına bağlıdır.
          </p>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda aile hukuku avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Boşanma sonrası velayet, kişisel ilişki veya nafaka konusunda
              değişiklik talep ediyorsunuz.
            </li>
            <li>
              Aile içi şiddete maruz kaldınız ya da yakınınız maruz kalıyor —{" "}
              <strong>6284 koruma kararı</strong> başvurusu.
            </li>
            <li>
              Evlat edinme planlıyorsunuz; özellikle yabancı devlet uyruklu
              eş veya çocuklar için ek prosedürler söz konusu.
            </li>
            <li>
              Bir küçüğün veya kısıtlının vesayetiyle ilgili başvuru yapacaksınız.
            </li>
            <li>
              Babalık veya soybağının reddi davası gündeminizde — sürelere
              dikkat.
            </li>
            <li>
              Yurt dışında alınmış velayet/koruma kararının Türkiye'de tanınması
              gerekiyor.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question:
        "Velayet değişikliği davasının açılmasını gerektiren tipik durumlar nelerdir?",
      answer:
        "Velayetli ebeveynin çocuğa karşı ihmali, fiziksel veya duygusal şiddet, çocuğun başka şehre/ülkeye götürülmesi, ağır psikiyatrik rahatsızlık, çocuğun isteği (idrak çağında) ve maddi koşulların ciddi biçimde değişmesi en sık görülen sebeplerdir. Mahkeme her dosyada sosyal hizmet uzmanı raporu ister.",
    },
    {
      question:
        "Çocukla görüş kararı varken karşı taraf engel oluyorsa ne yapabilirim?",
      answer:
        "Mahkeme kararının uygulanması için icra müdürlüğü üzerinden çocuk teslimi/kişisel ilişki kurma talebi başlatılır. Engellemeye devam eden taraf için disiplin para cezası ve nihayet TMK m. 343 uyarınca velayetin kaldırılması gündeme gelebilir.",
    },
    {
      question:
        "6284 sayılı Kanun çerçevesinde delil olmadan da koruma kararı alınabilir mi?",
      answer:
        "Evet. 6284 SK yargılama benzeri bir delil değerlendirmesi gerektirmez; mağdurun beyanı koruma kararı için yeterli kabul edilebilir. Karar geçici tedbir niteliğindedir; kalıcı sonuçlar için boşanma davası, ceza şikâyeti veya tazminat davası ayrıca yürütülür.",
    },
    {
      question: "Yetişkin birini evlat edinmek mümkün mü?",
      answer:
        "Evet, ancak ek şartlar vardır. TMK m. 313 uyarınca evlat edinilenin altsoyunun açık rızası, en az 5 yıl bakım gibi koşullar veya evlat edinilenin bedensel/zihinsel engellilik nedeniyle bakıma muhtaç olması gerekir. Mahkeme, evlat edinmenin haklı sebeplere dayandığını ayrıca değerlendirir.",
    },
    {
      question:
        "Evlilik dışı doğan çocuğum için baba kim olduğunu kabul etmiyor; ne yapabilirim?",
      answer:
        "Doğumdan itibaren 1 yıl içinde, çocuğun yerleşim yeri Aile Mahkemesinde babalık davası açılır (TMK m. 301). Mahkeme, taraflardan DNA testi ister; sonuç biyolojik bağı ortaya koyduğunda baba ile çocuk arasında soybağı kurulur ve nafaka ile miras hakkı doğar.",
    },
    {
      question:
        "Vesayet kararı için kim başvurabilir?",
      answer:
        "Kısıtlama sebepleri varsa kişinin kendisi, eşi, altsoyu, yakını, savcılık veya nüfus idaresi sulh hukuk mahkemesine başvurabilir. Mahkeme; doktor raporu, sosyal hizmet incelemesi ve kişinin dinlenmesi sonrası karar verir. Vasinin atanması da aynı dosyada yapılır.",
    },
    {
      question:
        "Yurt dışında verilmiş bir velayet kararı Türkiye'de doğrudan geçerli mi?",
      answer:
        "Hayır. Yabancı mahkeme kararının Türkiye'de hüküm doğurabilmesi için tanıma-tenfiz davası açılması gerekir (5718 sayılı MÖHUK m. 50 vd.). Çocukların menfaati başta olmak üzere belirli koşullar değerlendirilir; tanıma kararı ile birlikte velayet ve nafaka hükümleri Türkiye'de uygulanabilir.",
    },
  ],
};

