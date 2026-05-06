// Long-form content for /hizmetler/icra-iflas-hukuku.
// Targets "icra avukatı istanbul". 2004 sayılı İcra ve İflas Kanunu (İİK)
// referansları. Yargıtay 12. ve 23. HD uygulamaları çerçevesinde.

import type { CategoryArticle } from "./bosanma-hukuku";

export const icraIflasHukukuArticle: CategoryArticle = {
  lead: "Alacaklarınızı tahsil edemiyor ya da haksız bir takiple karşılaştıysanız, doğru icra dairesi-mahkeme stratejisi sonucu doğrudan değiştirir. AvukatIstanbul, İstanbul'un yoğun icra dairelerinde takip yürüten ve mahkeme aşamasında itirazın iptali, ihtiyati haciz ve istihkak davalarında deneyimli icra avukatlarını sizinle aynı gün buluşturur.",
  sections: [
    {
      id: "icra-hukuku-yapisi",
      title: "İcra hukuku ve İstanbul'da yapısı",
      body: (
        <>
          <p>
            İcra hukuku, mahkeme kararlarının ve para alacaklarının zorla
            yerine getirilmesini sağlar. Temel kanun{" "}
            <strong>2004 sayılı İcra ve İflas Kanunu (İİK)</strong>'dur.
          </p>
          <p>
            İstanbul'da işleyiş üç ana eksende yürür:
          </p>
          <ul>
            <li>
              <strong>İcra Müdürlükleri:</strong> Takipleri yürüten idari
              birimler. İstanbul'da Çağlayan, Anadolu, Bakırköy, Küçükçekmece
              başta olmak üzere onlarca icra dairesi vardır; takip türüne ve
              alacaklının yerleşim yerine göre seçilir.
            </li>
            <li>
              <strong>İcra Hâkimliği (İcra Mahkemesi):</strong> Müdürlük
              işlemlerine şikâyet, itirazın kaldırılması, ihalenin feshi gibi
              hızlı ve dosya üzerinden çözüm bekleyen davaları görür.
            </li>
            <li>
              <strong>Genel Mahkemeler:</strong> İtirazın iptali, menfi tespit,
              istihkak davaları gibi maddi vakıa incelemesi gerektiren davaları
              görür (asliye hukuk veya ticaret mahkemesi).
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "ilamli-ilamsiz-takip",
      title: "İlamlı, ilamsız ve kambiyo senedine özgü takip",
      body: (
        <>
          <h3>İlamlı icra (İİK m. 24-41)</h3>
          <p>
            Mahkeme kararı (ilam) veya kanunda ilam niteliğinde sayılan
            belgelere (noter senedi, hakem kararı vs.) dayanılarak başlatılır.
            İcra emri tebliğinden itibaren <strong>7 gün içinde</strong>{" "}
            borçlu borca itiraz edemez; sadece icranın geri bırakılmasını
            isteyebilir (örneğin borcun ödendiği veya zamanaşımı).
          </p>
          <h3>İlamsız icra (İİK m. 42-72)</h3>
          <p>
            Senetsiz veya adi yazılı bir alacağa dayanır. Borçluya ödeme emri
            tebliğ edilir; <strong>7 gün içinde</strong> itiraz hakkı vardır.
            İtiraz takibi durdurur. Alacaklı, durdurulan takibi yeniden
            işletmek için itirazın iptali (genel mahkemede 1 yıl içinde) veya
            itirazın kaldırılması (icra hâkimliğinde 6 ay içinde) yoluna
            başvurur.
          </p>
          <h3>Kambiyo senetlerine özgü takip (İİK m. 167-176/b)</h3>
          <p>
            Çek, bono, poliçe gibi kambiyo senetlerine dayalı, daha hızlı
            işleyen takip yoludur. Borçluya ödeme emri yerine{" "}
            <strong>5 gün içinde</strong> mal beyanı, <strong>5 gün içinde</strong>{" "}
            ödeme veya itiraz şartı içeren ödeme emri tebliğ edilir. İtiraz
            ancak imza inkârı veya borcun ödenmiş olması gibi sınırlı
            sebeplerle yapılabilir.
          </p>
        </>
      ),
    },
    {
      id: "itiraz-iptali",
      title: "İtiraz, itirazın iptali ve menfi tespit",
      body: (
        <>
          <h3>İtirazın iptali davası (İİK m. 67)</h3>
          <ul>
            <li>
              Alacaklı, ilamsız takipte itirazın tebliğinden itibaren <strong>1 yıl
              içinde</strong> genel mahkemede dava açar.
            </li>
            <li>
              Alacak ispatlanırsa hem itiraz iptal edilir hem de borçlu, alacağın
              en az %20'si oranında <strong>icra inkâr tazminatı</strong>na mahkûm
              edilir.
            </li>
          </ul>
          <h3>İtirazın kaldırılması (İİK m. 68-68/a)</h3>
          <ul>
            <li>
              Alacaklının elinde imza ve içerik itibariyle güçlü bir belge
              (noter senedi, banka kayıtları, ödeme planı tutanağı) varsa, icra
              hâkimliğinde dosya üzerinden hızlı sonuç alınabilir.
            </li>
            <li>
              <strong>Kesin mehil 6 ay</strong>; süre geçtiğinde itirazın
              iptali yoluna ancak genel mahkemede gidilebilir.
            </li>
          </ul>
          <h3>Menfi tespit ve istirdat (İİK m. 72)</h3>
          <ul>
            <li>
              <strong>Menfi tespit:</strong> Borçlu borçlu olmadığını
              ispatlamak için açar. Takipten önce, takip sırasında veya borç
              ödendikten sonra bile (istirdat) açılabilir.
            </li>
            <li>
              Borçlu kazanırsa <strong>icra inkâr tazminatı</strong>nın haksız
              istenmiş kısmını geri alır; alacağın %20 oranında tazminata da
              hükmedilir.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "haciz-satis-paylar",
      title: "Haciz, satış ve sıra cetveli",
      body: (
        <>
          <h3>Haciz (İİK m. 78-105)</h3>
          <p>
            Takibin kesinleşmesinden sonra alacaklının talebiyle borçlunun
            mal varlığına haciz konulur. Sık karşılaşılan haciz türleri:
          </p>
          <ul>
            <li>
              <strong>Maaş haczi (İİK m. 83):</strong> Maaşın 1/4'ünden fazlası
              haczedilemez; nafaka alacakları bu sınıra tabi değildir.
            </li>
            <li>
              <strong>Banka hesabı haczi:</strong> UYAP üzerinden e-haciz ile.
            </li>
            <li>
              <strong>Taşınmaz haczi:</strong> Tapuda şerh ile uygulanır;
              satış aşamasına kadar borçlu kullanmaya devam edebilir.
            </li>
            <li>
              <strong>Üçüncü kişide bulunan alacak haczi:</strong>{" "}
              Kira alacağı, müşteri alacağı vb. (İİK m. 89 ihbarnamesi).
            </li>
          </ul>
          <h3>Hacze konulamayacak mallar (İİK m. 82)</h3>
          <p>
            Borçlunun ve ailesinin "haline münasip" zorunlu eşyaları,
            mesleğinin icrası için zorunlu aletleri, gıda maddeleri vb.
            haczedilemez. Aile konutu için özel koruma rejimi vardır.
          </p>
          <h3>Satış ve sıra cetveli</h3>
          <ul>
            <li>
              Haczedilen mal, kanunda belirlenen süreler içinde icra dairesince
              satışa çıkarılır.
            </li>
            <li>
              Birden fazla alacaklının yer aldığı dosyalarda, satış bedeli{" "}
              <strong>sıra cetveli</strong>ne göre dağıtılır; rehinli ve
              imtiyazlı alacaklar öncelikli sırada yer alır.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "ihtiyati-haciz",
      title: "İhtiyati haciz ve ihtiyati tedbir",
      body: (
        <>
          <p>
            <strong>İhtiyati haciz (İİK m. 257-268):</strong> Para alacaklısı,
            henüz takibin kesinleşmesini beklemeden, alacağın güvenceye
            alınması için mahkemeden borçlunun mallarına haciz konulmasını
            isteyebilir. Talep, alacağın varlığını ve borçlunun mal kaçırma
            ihtimalini yaklaşık ispat eder; mahkeme genellikle teminat
            karşılığında karar verir.
          </p>
          <p>
            <strong>İhtiyati tedbir (HMK m. 389):</strong> Para alacağı dışındaki
            uyuşmazlıklarda (örneğin teslim, men, kullanım) gelecekteki kararın
            etkisiz kalmaması için alınan koruma tedbiridir. İhtiyati hacizden
            farklı olarak para alacağı için kural olarak başvurulmaz.
          </p>
          <p>
            Karar verildikten sonra alacaklı; ihtiyati hacizden itibaren 10 gün
            içinde takip başlatmalı veya dava açmalıdır (İİK m. 264). Aksi
            hâlde haciz kalkar.
          </p>
        </>
      ),
    },
    {
      id: "iflas-konkordato",
      title: "İflas ve konkordato (kısa)",
      body: (
        <>
          <h3>İflas (İİK m. 154 vd.)</h3>
          <p>
            Tacirin tüm malvarlığını, alacaklılarına dağıtmak üzere tasfiye
            yoluna sokan dosyadır. Adi iflas takibi ile başlatılır; takibe
            itiraz edilirse alacaklı 15 gün içinde iflas davası açar. Mahkeme
            iflas kararı verirse, iflas idaresi atanır; alacaklılar dosyaya
            kaydolarak sıralamaya göre tahsilat yapar.
          </p>
          <h3>Konkordato</h3>
          <p>
            Borçlu, alacaklılarıyla anlaşarak borçlarının bir kısmından
            kurtulmak veya vadesini uzatmak için konkordato sürecini
            başlatabilir. Geçici mühlet, kesin mühlet ve tasdik aşamalarından
            geçer. Alacaklılar açısından dosyaya zamanında alacak kaydı,
            oylamaya katılma ve red kararına itiraz süreleri kritiktir.
          </p>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda icra avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Vadesinde ödenmemiş bir <strong>fatura, sözleşme alacağı, çek
              veya kira</strong> alacağınız var; icra takibi başlatmadan önce
              hangi takip türünün uygun olduğunu belirleyin.
            </li>
            <li>
              Hakkınızda haksız bir takip başlatıldı; <strong>7 gün içinde
              itiraz</strong> ve gerekirse menfi tespit davası planı
              gerekiyor.
            </li>
            <li>
              Borçlu mal kaçırma şüphesi yaratıyor — <strong>ihtiyati haciz</strong>{" "}
              kararı için bilgi ve belgeleri toparlamak gerekiyor.
            </li>
            <li>
              Maaş haczi geldi; <strong>haczin sınırı, asgari ücret düzeyi ve
              nafaka alacaklarının önceliği</strong> birlikte değerlendirilmeli.
            </li>
            <li>
              Dosyanızda ihale yapıldı; ihalenin feshi süresi 7 gündür.
            </li>
            <li>
              Alacaklı veya borçlu olarak <strong>konkordato veya iflas</strong>{" "}
              dosyasında pozisyon almak gerekiyor.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question:
        "İlamsız icraya itiraz süresi ne kadar ve nasıl yaparım?",
      answer:
        "İİK m. 62 uyarınca ödeme emri tebliğinden itibaren 7 gün içinde takibin yapıldığı icra dairesine yazılı veya tutanağa geçirilmek üzere sözlü olarak itiraz edilir. İtiraz takibi durdurur. Borca, imzaya, faiz oranına veya yetkiye itiraz ayrı ayrı yapılmalı; sebep belirtmeyen genel itiraz da geçerlidir.",
    },
    {
      question:
        "Maaşımın ne kadarına haciz konulabilir?",
      answer:
        "İİK m. 83 uyarınca aylık ücret veya emekli maaşının 1/4'ünden fazlası haczedilemez. Nafaka alacakları bu sınıra tabi değildir; tek başına bile aşmaya elverişlidir. Asgari ücret seviyesindeki gelirlerde uygulamadaki tartışma, kalan kısmın insan onuruna yaraşır asgari geçim seviyesinin altında kalmasıdır.",
    },
    {
      question:
        "Borçluya itirazın iptali davasını hangi mahkemede açarım?",
      answer:
        "İİK m. 67 uyarınca itirazın iptali davası genel mahkemelerde açılır; alacağın hukuki niteliğine göre ticari ise asliye ticaret mahkemesi, değilse asliye hukuk mahkemesi görevlidir. Yetki kuralı; borçlunun yerleşim yeri veya alacaklının seçimine göre belirlenebilir.",
    },
    {
      question:
        "Ev eşyası haczedilebilir mi?",
      answer:
        "İİK m. 82'de belirtilen 'haline münasip' zorunlu ev eşyası (yatak, mutfak eşyaları, dolap vb.) haczedilemez. Lüks niteliğindeki eşyalar ile birden fazla bulunduğu durumda fazla olanlar haczedilebilir. Uygulamada haczedilemezlik şikâyeti, haciz tutanağının tebliğinden itibaren 7 gün içinde icra mahkemesinde yapılır.",
    },
    {
      question:
        "Kambiyo senedine itirazda ne kadar süre var?",
      answer:
        "İİK m. 168/4 uyarınca ödeme emri tebliğinden itibaren 5 gün içinde icra mahkemesine itiraz edilir. İtiraz; imza, borcun olmadığı veya senet metninde sayılan diğer dar sebeplere dayanabilir. Süre geçirilirse takip kesinleşir.",
    },
    {
      question:
        "İhalenin feshi davasını ne zaman açabilirim?",
      answer:
        "İİK m. 134 uyarınca ihalenin feshi, ihale tarihinden itibaren 7 gün içinde icra mahkemesine başvurularak istenir. Sebepleri kanunda sınırlı sayıdadır: tellal eksikliği, taşınmazın takdiri kıymetinde fahiş hata, satışın usulüne aykırı olması gibi.",
    },
    {
      question:
        "İcra inkâr tazminatı nedir, ne zaman uygulanır?",
      answer:
        "İcra inkâr tazminatı, haksız itiraz eden borçluyu ya da haksız menfi tespit talep eden alacaklıyı caydırmak için uygulanan, kural olarak alacağın %20'sinden az olmayan bir tazminattır. İtirazın iptali ve menfi tespit davalarında mahkeme talep hâlinde re'sen değerlendirir.",
    },
  ],
};

