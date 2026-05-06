// Long-form content for /hizmetler/yabancilar-hukuku.
// Targets "yabancılar avukatı istanbul". 6458 sayılı Yabancılar ve Uluslararası
// Koruma Kanunu (YUKK), 5901 sayılı Türk Vatandaşlığı Kanunu, 4817 sayılı /
// 6735 sayılı Yabancıların Çalışma İzinleri Hakkında Kanun çerçevesinde.

import type { CategoryArticle } from "./bosanma-hukuku";

export const yabancilarHukukuArticle: CategoryArticle = {
  lead: "Türkiye'de yaşamak veya çalışmak isteyen yabancılar ve aileleri için oturma izni, çalışma izni, vatandaşlık başvurusu, sınır dışı kararına itiraz ve uluslararası koruma süreçleri büyük ölçüde idari yargı bilgisi gerektirir. AvukatIstanbul, İstanbul'da yabancılar hukukunda dosya işletmiş avukatları size hızlı ve net bir aksiyon planıyla ulaştırır.",
  sections: [
    {
      id: "yabancilar-hukuku-nedir",
      title: "Yabancılar hukukunun konusu ve mahkemeler",
      body: (
        <>
          <p>
            Yabancılar hukuku; Türkiye'de bulunan yabancı uyruklu kişilerin
            statüsünü, izinlerini, vatandaşlığa kabul süreçlerini ve idarenin
            koruma uygulamalarını düzenler. Temel kanunlar:
          </p>
          <ul>
            <li>
              <strong>6458 sayılı Yabancılar ve Uluslararası Koruma Kanunu
              (YUKK):</strong> Türkiye'ye giriş, oturma izinleri, sınır dışı,
              uluslararası koruma.
            </li>
            <li>
              <strong>5901 sayılı Türk Vatandaşlığı Kanunu:</strong>{" "}
              Vatandaşlığın kazanılması, kaybedilmesi, yeniden kazanılması.
            </li>
            <li>
              <strong>6735 sayılı Uluslararası İşgücü Kanunu:</strong> Çalışma
              izinleri.
            </li>
            <li>
              <strong>5718 sayılı Milletlerarası Özel Hukuk ve Usul Hukuku
              Hakkında Kanun (MÖHUK):</strong> Yabancı unsurlu uyuşmazlıklarda
              uygulanacak hukuk ve tanıma-tenfiz.
            </li>
          </ul>
          <p>
            Uyuşmazlıklar büyük ölçüde <strong>İdare Mahkemesinde</strong>{" "}
            görülür: oturma izni reddi, çalışma izni reddi, sınır dışı kararı,
            vatandaşlık başvurusunun reddi gibi. Aile hukuku boyutu olan
            yabancı uyruklu davalar (boşanma, velayet, evlat edinme) Aile
            Mahkemelerinde sürer.
          </p>
        </>
      ),
    },
    {
      id: "oturma-izni",
      title: "Oturma izni türleri ve başvuru",
      body: (
        <>
          <p>
            YUKK m. 31-50 arasında düzenlenen oturma izni türleri:
          </p>
          <ul>
            <li>
              <strong>Kısa dönem ikamet izni (m. 31):</strong> Bilimsel araştırma,
              taşınmaz sahibi olma, ticari amaç, eğitim, tedavi, AB Erasmus
              gibi hâller.
            </li>
            <li>
              <strong>Aile ikamet izni (m. 34):</strong> Türk vatandaşının veya
              uzun dönem ikamet izinli yabancının eşine, çocuklarına ve
              bakmakla yükümlü kişilerine.
            </li>
            <li>
              <strong>Öğrenci ikamet izni (m. 38):</strong> Türkiye'de örgün
              eğitim gören yabancılar için.
            </li>
            <li>
              <strong>Uzun dönem ikamet izni (m. 42):</strong> Türkiye'de
              kesintisiz en az 8 yıl ikamet eden yabancı için süresiz olarak
              verilir.
            </li>
            <li>
              <strong>İnsani ikamet izni (m. 46):</strong> Türkiye'nin ulusal
              menfaatleri, mücbir sebepler veya çocuğun üstün yararı gerektiriyorsa.
            </li>
            <li>
              <strong>İnsan ticareti mağduru ikamet izni (m. 48):</strong>{" "}
              Mağdura iyileşme ve düşünme süresi sağlamak için.
            </li>
          </ul>
          <p>
            Başvuru, e-ikamet sistemi üzerinden yapılır; biyometrik fotoğraf,
            sağlık sigortası, geçerli pasaport, adres beyanı ve ikamet türüne
            özgü ek belgeler aranır. Reddedilen başvurulara karşı 60 gün
            içinde idare mahkemesinde dava açılabilir.
          </p>
        </>
      ),
    },
    {
      id: "calisma-izni",
      title: "Çalışma izni başvurusu ve reddi",
      body: (
        <>
          <p>
            <strong>6735 sayılı Kanun</strong> uyarınca çalışma izni başvurusu
            kural olarak işveren tarafından, e-Devlet üzerinden Aile, Çalışma
            ve Sosyal Hizmetler Bakanlığına yapılır. Bakanlık;{" "}
          </p>
          <ul>
            <li>
              İş yerinin niteliği,
            </li>
            <li>
              İşçi-yabancı oranı (en az 5 Türk vatandaşı kuralı genellikle
              aranır; istisnalar vardır),
            </li>
            <li>
              Sermaye ve cirosu,
            </li>
            <li>
              Yabancının niteliği (eğitim, deneyim, mesleki yeterlilik),
            </li>
          </ul>
          <p>
            kıstaslarına göre değerlendirme yapar. İlk başvuruda en fazla 1 yıl,
            uzatmalarda 2 yıla kadar süreyle verilir; uzun dönem çalışma izni
            kesintisiz 8 yıl koşulu ile mümkündür.
          </p>
          <p>
            Ret kararına karşı 30 gün içinde idari itiraz, akabinde 60 gün
            içinde idare mahkemesinde dava yoluna gidilir. Yabancı serbest
            meslek (avukat, hekim) ve şirket ortağı çalışma izinleri için
            ayrı kıstas ve belgeler söz konusudur.
          </p>
        </>
      ),
    },
    {
      id: "vatandaslik",
      title: "Türk vatandaşlığı",
      body: (
        <>
          <h3>Doğumla kazanma (5901 SK m. 7-8)</h3>
          <p>
            Türk anneden veya babadan doğan çocuk soybağı yoluyla; istisnai
            hâllerde Türkiye'de bulunmuş ve anne-babası belli olmayan çocuk
            ise vatandaş kabul edilir.
          </p>
          <h3>Sonradan kazanma yolları</h3>
          <ul>
            <li>
              <strong>Yetkili makam kararıyla (m. 11):</strong> Türkiye'de
              kesintisiz 5 yıl ikamet, iyi ahlâk, sağlık raporu, geçim koşulları,
              Türkçe iletişim ve milli güvenliğe aykırılık olmaması.
            </li>
            <li>
              <strong>Evlilik yoluyla (m. 16):</strong> Türk vatandaşıyla en az
              3 yıl evli kalma; evlilikte birlik içinde yaşam, milli güvenlik
              vd. değerlendirme.
            </li>
            <li>
              <strong>İstisnai vatandaşlık (m. 12):</strong> Türkiye'ye sanayi
              tesisi getiren, bilimsel-teknolojik ya da sosyal alanda olağanüstü
              hizmeti olan kişiler; Cumhurbaşkanı kararıyla. <strong>Yatırım
              yoluyla istisnai vatandaşlık</strong>'ın güncel sermaye/yatırım
              eşikleri yönetmelikle belirlenir ve dönem dönem değişir
              (taşınmaz alımı, sermaye yatırımı, mevduat, sabit yatırım,
              istihdam).
            </li>
            <li>
              <strong>Evlat edinme yoluyla (m. 17):</strong> Türk vatandaşı
              tarafından evlat edinilen ergin olmayan kişi.
            </li>
          </ul>
          <h3>Vatandaşlık komisyonu mülakatı</h3>
          <p>
            Pek çok başvuruda vatandaşlık komisyonu mülakat yapar; iyi niyet,
            entegrasyon ve bilgi seviyesi değerlendirilir. Reddedilen
            başvurulara karşı idare mahkemesinde dava açılabilir.
          </p>
        </>
      ),
    },
    {
      id: "sinir-disi",
      title: "Sınır dışı kararı ve itiraz",
      body: (
        <>
          <p>
            <strong>YUKK m. 54</strong> sınır dışı edilebilecek hâlleri sınırlı
            sayıda sayar: kamu düzenine veya milli güvenliğe tehdit, vize ihlali,
            ikamet izni reddi, terör örgütü mensubiyet şüphesi vb. Karar Göç
            İdaresi Genel Müdürlüğü ve İl Müdürlüklerince verilir.
          </p>
          <h3>İtiraz süresi (YUKK m. 53)</h3>
          <ul>
            <li>
              Tebligattan itibaren <strong>7 gün içinde</strong> idare
              mahkemesine başvuru.
            </li>
            <li>
              Dava açılması hâlinde idare mahkemesi <strong>15 gün içinde</strong>{" "}
              karar vermek zorundadır; karar kesindir.
            </li>
            <li>
              Dava açıldığında, mahkeme aksini söyleyene kadar sınır dışı
              <strong> uygulanmaz</strong>.
            </li>
          </ul>
          <p>
            <strong>Geri gönderme yasağı (m. 55):</strong> İşkence, zalimce ya
            da onur kırıcı ceza tehlikesi olan ülkeye gönderme yasaktır;
            uluslararası koruma ile birlikte değerlendirilir.
          </p>
          <p>
            <strong>İdari gözetim:</strong> Sınır dışı edilecek yabancıya en çok
            6 ay (zorunlu hâllerde 6 ay daha uzatılarak 12 ay) idari gözetim
            uygulanabilir; karara her ay sulh ceza hâkimliğine itiraz edilebilir.
          </p>
        </>
      ),
    },
    {
      id: "uluslararasi-koruma",
      title: "Uluslararası koruma ve geçici koruma",
      body: (
        <>
          <p>
            Türkiye, 1951 Cenevre Sözleşmesinin coğrafi sınırlama ile
            uygulayıcısıdır. <strong>YUKK m. 61-91</strong> uyarınca tanınan
            statüler:
          </p>
          <ul>
            <li>
              <strong>Mülteci:</strong> Avrupa ülkesinden gelen ve Sözleşme
              koşullarını taşıyan kişi.
            </li>
            <li>
              <strong>Şartlı mülteci:</strong> Avrupa dışı ülkelerden gelen
              Sözleşme koşullarını taşıyan kişi; üçüncü bir ülkeye yerleşene
              kadar Türkiye'de kalır.
            </li>
            <li>
              <strong>İkincil koruma:</strong> Ölüm cezası, işkence, ayrım
              gözetmeyen şiddet ortamı tehlikesi olanlara.
            </li>
            <li>
              <strong>Geçici koruma:</strong> Kitlesel akın hâllerinde, 2014
              tarihli Yönetmelik kapsamında uygulanır (Suriyeli kayıt sistemi
              gibi).
            </li>
          </ul>
          <p>
            Başvuru sonrası mülakat yapılır; başvurunun reddi hâlinde idari ve
            yargısal itiraz yolları işletilir.
          </p>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda yabancılar avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Oturma izni veya uzatma talebiniz reddedildi; 60 gün içinde
              idare mahkemesinde dava açacaksınız.
            </li>
            <li>
              Çalışma izni başvurunuz reddedildi; itiraz ve dava süresi
              başladı.
            </li>
            <li>
              Sınır dışı kararı tebliğ edildi — <strong>7 gün</strong> içinde
              dava açılmalı.
            </li>
            <li>
              Türk vatandaşlığı başvurunuz reddedildi veya komisyon mülakatına
              çağrıldınız.
            </li>
            <li>
              İstisnai vatandaşlık (m. 12) için yatırım yapacaksınız; eşikler
              ve belgelerin doğru sıralanması süreyi kısaltır.
            </li>
            <li>
              Yabancı uyruklu çocuğun Türkiye'de evlat edinilmesi veya yurt
              dışına götürülmesi söz konusu.
            </li>
            <li>
              Yabancı mahkeme kararının (boşanma, velayet, miras) Türkiye'de
              tanınması ve tenfizi gerekli.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question:
        "Türkiye'de evlilik yoluyla vatandaşlık için ne kadar evli kalmak gerekir?",
      answer:
        "5901 sayılı Kanun m. 16 uyarınca Türk vatandaşıyla en az 3 yıl evli olma şartı vardır; ayrıca evlilik birliği içinde yaşam, milli güvenlik açısından sakıncasızlık ve iyi ahlâk değerlendirmesi yapılır. Süre dolmadan başvuru reddedilir.",
    },
    {
      question:
        "Yatırım yoluyla istisnai vatandaşlığın güncel sermaye eşiği ne kadar?",
      answer:
        "İstisnai vatandaşlığın taşınmaz alımı, sermaye yatırımı, mevduat ve istihdam başlığında belirlenen güncel eşikler, dönem dönem yönetmelikle değiştirilmektedir. Başvuru tarihinde geçerli yönetmelik üzerinden hesaplanır; tarihsel rakamlar bağlayıcı değildir. Avukatınız, sizin başvuru tarihindeki resmi rakamları doğrulayacaktır.",
    },
    {
      question:
        "Sınır dışı kararına itiraz ettiğimde sürecim güvende mi?",
      answer:
        "Evet. YUKK m. 53 uyarınca dava açılması hâlinde aksini söyleyen mahkeme kararı çıkmadıkça sınır dışı kararı uygulanmaz. Mahkeme dava açıldıktan itibaren 15 gün içinde karar vermek zorundadır; karar kesindir.",
    },
    {
      question:
        "Çalışma izni reddedilirse hangi sürelerde işlem yapmalıyım?",
      answer:
        "İşveren ya da yabancı, ret kararının tebliğinden itibaren 30 gün içinde Aile, Çalışma ve Sosyal Hizmetler Bakanlığına yazılı itirazda bulunabilir. İtirazın reddinden sonra 60 gün içinde idare mahkemesinde iptal davası açılır.",
    },
    {
      question:
        "Yabancı eşim Türkiye'de boşandı; karar Türk vatandaşı olduğum ülkemde geçerli mi?",
      answer:
        "Yabancı bir mahkemenin kararı kural olarak başka ülkede doğrudan geçerli değildir; o ülkenin tanıma-tenfiz mevzuatına göre kabul edilmesi gerekir. Türkiye'de verilen kararın yurt dışında geçerliliği için ilgili ülkenin mahkemesinde tanıma-tenfiz davası açılmalıdır; Türkiye için ise MÖHUK m. 50 vd. uygulanır.",
    },
    {
      question:
        "Kesintisiz 8 yıl Türkiye'de oturmasam da uzun dönem ikamet alabilir miyim?",
      answer:
        "Hayır. YUKK m. 42 uyarınca kesintisiz 8 yıl ikamet şartı esastır. Kanunda öngörülen haklı sebepler nedeniyle 1 yıla kadar yurt dışında kalış kesintisizliği bozmaz; bunun üzerinde aralıksız Türkiye dışında kalmak uzun dönem hakkını ortadan kaldırabilir.",
    },
    {
      question:
        "Geçici koruma altındaki Suriyelilerin hukuki statüsü ne?",
      answer:
        "Geçici Koruma Yönetmeliği uyarınca kayıtlı Suriyeliler 'geçici koruma' statüsünden yararlanır. Bu statü; sağlık, eğitim ve sınırlı çalışma haklarını içerir; ancak uluslararası koruma statüsünden farklı olarak süresizdir ve idari kararlarla değiştirilebilir. Çalışma izni alındığında SGK kaydı zorunludur.",
    },
  ],
};

