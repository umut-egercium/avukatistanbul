// Long-form content for /hizmetler/bosanma-hukuku.
// Real, accurate Turkish family-law copy targeting "boşanma avukatı istanbul".
// Each section has an `id` for in-page anchor links and TOC.

export interface CategoryArticleSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

export interface CategoryArticleFaq {
  question: string;
  answer: string;
}

export interface CategoryArticle {
  /** 2-3 sentence lead used under the H1. */
  lead: string;
  /** Main article sections. */
  sections: CategoryArticleSection[];
  /** Frequently asked questions; rendered + emitted as FAQPage JSON-LD. */
  faqs: CategoryArticleFaq[];
}

export const bosanmaHukukuArticle: CategoryArticle = {
  lead: "İstanbul'da boşanma davası açmayı düşünüyor ya da açılmış bir davada haklarınızı korumak istiyorsanız, doğru avukat süreci hızlandırır ve maddi-manevi kayıplarınızı en aza indirir. AvukatIstanbul, İstanbul Barosu'na kayıtlı boşanma hukukunda uzmanlaşmış avukatları sizinle buluşturur.",
  sections: [
    {
      id: "bosanma-davasi-nedir",
      title: "Boşanma davası nedir?",
      body: (
        <>
          <p>
            Boşanma davası, eşler arasındaki evlilik birliğinin yargı kararı
            ile sona erdirilmesini amaçlayan ve <strong>Aile Mahkemelerinde</strong>{" "}
            görülen bir hukuk davasıdır. Türk Medeni Kanunu (TMK)
            madde 161 ve devamında düzenlenmiştir. İstanbul'da boşanma davaları,
            ilgili ilçenin Aile Mahkemesinde açılır; örneğin Kadıköy'deki bir
            çift Anadolu Adliyesi'nde, Şişli'deki bir çift İstanbul Adliyesi
            (Çağlayan)'nda davasını açar.
          </p>
          <p>
            Aile Mahkemesi olmayan ilçelerde dava, Asliye Hukuk Mahkemesi
            tarafından "Aile Mahkemesi sıfatıyla" görülür. Yetkili mahkeme,
            kural olarak eşlerden birinin yerleşim yeri veya son altı aydan
            beri birlikte oturdukları yer mahkemesidir (TMK m. 168).
          </p>
        </>
      ),
    },
    {
      id: "anlasmali-cekismeli",
      title: "Anlaşmalı ve çekişmeli boşanma",
      body: (
        <>
          <p>
            Türk hukukunda boşanma davası iki ana yolda yürür: <strong>anlaşmalı</strong>{" "}
            ve <strong>çekişmeli</strong>. Doğru yolun belirlenmesi süreyi,
            maliyeti ve sonucu doğrudan etkiler.
          </p>
          <h3>Anlaşmalı boşanma (TMK m. 166/3)</h3>
          <ul>
            <li>
              Eşler en az <strong>1 yıldır evli</strong> olmalıdır.
            </li>
            <li>
              Her iki taraf da hakim huzurunda boşanma iradesini açıklamalıdır.
            </li>
            <li>
              Nafaka, velayet, kişisel ilişki ve mal paylaşımı konularında
              taraflar yazılı bir <strong>boşanma protokolü</strong> sunar.
            </li>
            <li>
              Çoğunlukla <strong>tek celsede</strong> sonuçlanır; toplam süreç
              genellikle 1-3 ay arasıdır.
            </li>
          </ul>
          <h3>Çekişmeli boşanma</h3>
          <ul>
            <li>
              Eşler boşanma iradesinde, sebebinde, nafakada, velayette veya mal
              paylaşımında <strong>anlaşamadığında</strong> açılır.
            </li>
            <li>
              Davayı açan taraf, ileri sürdüğü <strong>boşanma sebebini ispat</strong>{" "}
              etmek zorundadır (tanık, mesaj kaydı, sosyal medya, polis tutanağı,
              tıbbi rapor vb.).
            </li>
            <li>
              Süreç İstanbul Aile Mahkemelerinin yoğunluğuna bağlı olarak
              ortalama <strong>12-36 ay</strong> sürer; istinaf ve temyiz
              aşamaları ile bu süre uzayabilir.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "bosanma-sebepleri",
      title: "Boşanma sebepleri (TMK m. 161-166)",
      body: (
        <>
          <p>
            Türk hukukunda boşanma sebepleri <strong>özel</strong> ve <strong>genel</strong>{" "}
            olmak üzere ikiye ayrılır.
          </p>
          <ul>
            <li>
              <strong>Zina (TMK m. 161):</strong> Eşin sadakat yükümlülüğüne
              aykırı davranması. Öğrenildiği tarihten itibaren 6 ay,
              gerçekleşmesinden itibaren 5 yıl içinde dava açılmalıdır.
            </li>
            <li>
              <strong>Hayata kast, pek kötü veya onur kırıcı davranış (TMK
              m. 162):</strong> Fiziksel şiddet, ağır hakaret, intihara
              teşebbüse zorlama vb.
            </li>
            <li>
              <strong>Suç işleme ve haysiyetsiz hayat sürme (TMK m. 163):</strong>{" "}
              Eşin yüz kızartıcı suç işlemesi veya haysiyetsiz yaşam.
            </li>
            <li>
              <strong>Terk (TMK m. 164):</strong> Eşin ortak konutu en az 6 ay
              boyunca haklı bir sebep olmaksızın terk etmesi.
            </li>
            <li>
              <strong>Akıl hastalığı (TMK m. 165):</strong> En az 3 yıl
              sürmüş, geçmesine olanak bulunmadığı resmi raporla saptanmış
              hastalık.
            </li>
            <li>
              <strong>Evlilik birliğinin temelinden sarsılması (TMK m. 166):</strong>{" "}
              Türkiye'de en sık başvurulan sebeptir; "şiddetli geçimsizlik"
              olarak da bilinir.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "surec",
      title: "Boşanma davasında süreç",
      body: (
        <>
          <p>
            Çekişmeli bir boşanma davasında genellikle aşağıdaki adımlar
            izlenir:
          </p>
          <ol>
            <li>
              <strong>Avukatla görüşme ve dilekçe hazırlığı:</strong> Olayların
              kronolojik bir özeti çıkarılır, deliller toplanır, dava
              dilekçesi yazılır.
            </li>
            <li>
              <strong>Davanın açılması:</strong> Yetkili Aile Mahkemesine
              dilekçe sunulur; harç ve gider avansı yatırılır.
            </li>
            <li>
              <strong>Tedbir kararları:</strong> Eşin evden uzaklaştırılması,
              geçici nafaka, geçici velayet, çocukla kişisel ilişki gibi
              konularda dava sonuna kadar geçerli kararlar talep edilir.
            </li>
            <li>
              <strong>Tensip ve cevap dilekçeleri:</strong> Davalı taraf 2
              hafta içinde cevap dilekçesi sunar; karşı dava açabilir.
            </li>
            <li>
              <strong>Ön inceleme duruşması:</strong> Uyuşmazlık konuları ve
              dosyaya sunulacak deliller netleştirilir.
            </li>
            <li>
              <strong>Tahkikat:</strong> Tanıklar dinlenir, banka kayıtları,
              SMS/WhatsApp kayıtları, sosyal medya çıktıları, kameraya alınmış
              görüntüler ve uzman raporları değerlendirilir.
            </li>
            <li>
              <strong>Esas hakkında karar:</strong> Mahkeme; boşanma, nafaka,
              velayet, kişisel ilişki, maddi-manevi tazminat ve mal rejimi
              konularında karar verir.
            </li>
            <li>
              <strong>İstinaf ve temyiz:</strong> Karara karşı 2 haftalık
              istinaf, sonrasında 2 haftalık temyiz süresi vardır.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: "nafaka-velayet",
      title: "Nafaka, velayet ve mal rejimi",
      body: (
        <>
          <h3>Nafaka türleri</h3>
          <ul>
            <li>
              <strong>Tedbir nafakası:</strong> Dava süresince zayıf
              durumdaki eşe ya da çocuğa hükmedilir.
            </li>
            <li>
              <strong>Yoksulluk nafakası:</strong> Boşanma sonrası eşin
              yoksulluğa düşmesini önlemek için, koşulları oluşmuşsa süresiz
              olarak hükmedilebilir.
            </li>
            <li>
              <strong>İştirak nafakası:</strong> Velayeti almayan tarafın,
              müşterek çocuğun bakım ve eğitim giderlerine katkısıdır; çocuk
              18 yaşını dolduruncaya kadar (öğrenim devam ediyorsa öğrenim
              bitene kadar) sürer.
            </li>
          </ul>
          <h3>Velayet</h3>
          <p>
            Velayet kararında <strong>çocuğun üstün yararı</strong> esastır.
            Mahkeme; çocuğun yaşı, anne ile bağı, eğitim koşulları, ekonomik
            durum, sosyal hizmet uzmanı raporu ve idrak çağındaysa çocuğun
            görüşünü değerlendirir. Velayet hakkı tek başına bir tarafa
            verilebileceği gibi, son yıllarda Yargıtay <strong>ortak
            velayete</strong> de açık kararlar vermektedir.
          </p>
          <h3>Mal rejimi</h3>
          <p>
            1 Ocak 2002 sonrasında evlenenler için yasal mal rejimi <strong>edinilmiş
            mallara katılma rejimidir</strong> (TMK m. 218). Boşanma ile mal
            rejimi sona erer; eşler evlilik içinde edinilen değerlerin
            yarısında <strong>katılma alacağı</strong> talep edebilir. Bu
            talep, ayrı bir <em>mal rejimi tasfiyesi davası</em> ile veya
            boşanma davasıyla birlikte ileri sürülebilir.
          </p>
        </>
      ),
    },
    {
      id: "sure-maliyet",
      title: "Süre ve maliyet beklentileri",
      body: (
        <>
          <p>
            Boşanma sürecinin ne kadar süreceği ve ne kadar tutacağı,
            aşağıdaki faktörlere göre belirgin biçimde değişir:
          </p>
          <ul>
            <li>
              Davanın <strong>anlaşmalı veya çekişmeli</strong> oluşu
            </li>
            <li>
              Tarafların <strong>ortak çocuk, ortak mal varlığı</strong> ve
              <strong>tazminat talepleri</strong>
            </li>
            <li>
              Davanın görüleceği <strong>İstanbul ilçesi</strong> ve mahkemenin
              iş yükü
            </li>
            <li>
              Avukatın <strong>deneyim seviyesi</strong> ve dosyanın
              gerektirdiği uzmanlık
            </li>
          </ul>
          <p>
            Genel beklentiler:
          </p>
          <ul>
            <li>
              <strong>Anlaşmalı boşanma:</strong> 1-3 ay; tek celsede
              sonuçlanması olağandır.
            </li>
            <li>
              <strong>Çekişmeli boşanma:</strong> İlk derece mahkemesinde
              ortalama 12-24 ay; istinaf-temyiz dahil 2-4 yıl.
            </li>
          </ul>
          <p>
            Türkiye Barolar Birliği <strong>asgari ücret tarifesi</strong>{" "}
            avukatlar için bağlayıcı bir alt sınırdır; ancak nihai ücret,
            avukat ile müvekkil arasındaki sözleşmeye göre belirlenir. Mal
            rejimi tasfiyesi gibi davalarda ücret, talep edilen alacak miktarı
            üzerinden nispi olarak hesaplanır.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Tek tarafın isteği ile anlaşmalı boşanma mümkün mü?",
      answer:
        "Hayır. Anlaşmalı boşanma için her iki eşin de hakim huzurunda boşanma iradesini açıkça ortaya koyması ve protokolü serbest iradeleriyle imzalamaları zorunludur. Bir taraf vazgeçerse dava çekişmeli boşanma olarak devam eder veya düşer.",
    },
    {
      question: "Anlaşmalı boşanma kaç celsede biter?",
      answer:
        "Genellikle tek celsede sonuçlanır. Hakim, protokolü uygun bulursa boşanma kararını aynı gün verir. Karara karşı istinaf yoluna gidilmediği takdirde 2 hafta içinde kesinleşir.",
    },
    {
      question:
        "Çocuğun velayetini hangi tarafın alacağı önceden bellidir mi?",
      answer:
        "Hayır. Velayette tek belirleyici çocuğun üstün yararıdır. Çocuğun yaşı, alıştığı çevre, idrak çağındaysa kendi tercihi, tarafların ekonomik ve sosyal durumu ve sosyal hizmet uzmanının raporu birlikte değerlendirilir. Yargıtay anneye veya babaya peşin bir öncelik vermez.",
    },
    {
      question: "Boşanma davası açmak için kaç yıl evli olmak gerekir?",
      answer:
        "Anlaşmalı boşanma için TMK 166/3 uyarınca evliliğin en az 1 yıl sürmüş olması gerekir. Çekişmeli boşanmada böyle bir süre şartı yoktur; örneğin nikahtan birkaç gün sonra dahi geçerli bir sebep varsa dava açılabilir.",
    },
    {
      question: "Yurt dışında boşandım, Türkiye'de geçerli mi?",
      answer:
        "Yabancı bir mahkemenin verdiği boşanma kararının Türkiye'de hüküm doğurabilmesi için Aile Mahkemesinde tanıma ve tenfiz davası açılması gerekir. Bu dava, yabancı kararın Türk nüfus kütüğüne işlenmesini ve Türkiye'de geçerli sayılmasını sağlar.",
    },
    {
      question: "Boşanma davasını avukat olmadan kendim açabilir miyim?",
      answer:
        "Yasal olarak boşanma davasında avukat zorunluluğu yoktur. Ancak özellikle çekişmeli boşanmada delil toplanması, tanıkların ifade alma stratejisi, nafaka ve mal rejimi taleplerinin doğru zamanda ileri sürülmesi gibi teknik konular nedeniyle uzman bir avukatla çalışmak şiddetle önerilir.",
    },
    {
      question: "Eve şiddet uygulayan eşim için ne yapabilirim?",
      answer:
        "6284 sayılı Kanun kapsamında, en yakın karakola, savcılığa veya doğrudan Aile Mahkemesine başvurarak <strong>uzaklaştırma kararı</strong> alabilirsiniz. Karar, başvuru anında ve avukatsız da verilebilir; ardından boşanma davası ile birlikte tedbir nafakası ve manevi tazminat talep edilebilir.",
    },
  ],
};
