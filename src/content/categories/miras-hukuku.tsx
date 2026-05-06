// Long-form content for /hizmetler/miras-hukuku.
// Targets "miras avukatı istanbul". TMK 495-682 (miras kitabı), 1.4.1974
// tarihli İBK (muris muvazaası) ve uygulamadaki Yargıtay 1. ve 8. HD
// içtihatları çerçevesinde.

import type { CategoryArticle } from "./bosanma-hukuku";

export const mirasHukukuArticle: CategoryArticle = {
  lead: "Miras hukuku, sevdiklerini kaybetmiş kişilerin hak ve yükümlülüklerini düzenleyen, hem teknik hem duygusal yönüyle dikkat isteyen bir alandır. AvukatIstanbul, İstanbul'da veraset ilamından mirasın reddine, vasiyetname iptalinden ortaklığın giderilmesi davalarına kadar her aşamada miras hukukunda deneyimli avukatları size ulaştırır.",
  sections: [
    {
      id: "miras-hukuku-nedir",
      title: "Miras hukuku ve mahkemelerin yapısı",
      body: (
        <>
          <p>
            Miras hukuku, ölümle birlikte kişinin malvarlığının (terekenin)
            kimlere ve nasıl geçeceğini düzenler. Temel kaynak{" "}
            <strong>4721 sayılı Türk Medeni Kanunu (TMK)</strong>'nun "Miras
            Hukuku" başlıklı üçüncü kitabıdır (m. 495-682).
          </p>
          <p>
            Miras davalarının görüldüğü mahkemeler genellikle{" "}
            <strong>Sulh Hukuk Mahkemesi</strong> (veraset ilamı, mirasın
            reddi, ortaklığın giderilmesi) veya <strong>Asliye Hukuk
            Mahkemesi</strong>'dir (tapu iptal-tescil, muris muvazaası,
            tenkis, vasiyetname iptali). Yetki kuralı; çoğu davada{" "}
            <strong>murisin son yerleşim yeri</strong> mahkemesidir (TMK m.
            576). İstanbul'da yoğunluk Anadolu, Çağlayan ve Bakırköy adliyelerinde
            olup büyük taşınmazların aynına ilişkin davalar ise gayrimenkulün
            bulunduğu yerde görülür.
          </p>
        </>
      ),
    },
    {
      id: "yasal-mirasci",
      title: "Yasal mirasçılar ve saklı pay",
      body: (
        <>
          <p>
            TMK, mirasçıları <strong>zümre sistemi</strong>yle düzenler:
          </p>
          <ul>
            <li>
              <strong>1. zümre — altsoy:</strong> Çocuklar, torunlar.
            </li>
            <li>
              <strong>2. zümre — anne, baba ve onların altsoyu:</strong>{" "}
              Kardeşler, yeğenler.
            </li>
            <li>
              <strong>3. zümre — büyükanne, büyükbaba ve onların altsoyu:</strong>{" "}
              Amca, hala, dayı, teyze ve onların çocukları.
            </li>
          </ul>
          <p>
            Sağ kalan eş, zümrelerle birlikte mirasçı olur ve zümre değiştikçe
            payı artar (TMK m. 499). Devlet ise mirasçısı bulunmayan terekeyi
            alan son sıradaki mirasçıdır.
          </p>
          <p>
            <strong>Saklı pay (TMK m. 506)</strong>: Murisin tasarruf özgürlüğü
            sınırlıdır. Altsoy için yasal payın 1/2'si, anne-baba için 1/4'ü,
            sağ kalan eş için yasal payının duruma göre tamamı veya 3/4'ü
            saklı paydır. Murisin sağlığında veya vasiyetname ile saklı paya
            tecavüz eden kazandırmalar <strong>tenkis davasına</strong> konu
            olur (TMK m. 560 vd.).
          </p>
        </>
      ),
    },
    {
      id: "veraset-ve-mirasin-reddi",
      title: "Veraset ilamı ve mirasın reddi",
      body: (
        <>
          <h3>Veraset (mirasçılık) belgesi</h3>
          <p>
            TMK m. 598 uyarınca mirasçılık belgesi, mirasçıların kim olduğunu
            ve paylarını gösteren resmî belgedir. <strong>Sulh Hukuk
            Mahkemesinden</strong> ya da <strong>noterden</strong> talep
            edilebilir; aile kayıtları sade ise noter çoğunlukla daha hızlıdır.
            Belge, banka, tapu ve trafik tescil işlemlerinde zorunlu evraktır.
          </p>
          <h3>Mirasın gerçek reddi (TMK m. 605)</h3>
          <ul>
            <li>
              Süresi: Murisin ölümünü öğrenmeden itibaren <strong>3 ay</strong>.
            </li>
            <li>
              Yer: <strong>Sulh Hukuk Mahkemesi</strong>'ne yazılı veya sözlü
              beyanla bildirim.
            </li>
            <li>
              Sonuç: Reddeden mirasçı, hiç mirasçı olmamış sayılır; payı,
              kanunî sıraya göre diğerlerine geçer.
            </li>
          </ul>
          <h3>Hükmen ret (TMK m. 605/2)</h3>
          <p>
            Tereke, ölüm anında borca batıksa mirasçılar başvuru yapmamış
            olsa dahi mirası reddetmiş sayılır. Alacaklılar takibe başladığında
            hükmen reddin tespiti için "mirasın hükmen reddi" davası açılır.
          </p>
          <h3>Mirasın resmî tasfiyesi (TMK m. 632)</h3>
          <p>
            Borca batık fakat hükmen ret koşulları net değilse mirasçılar,
            terekenin resmî tasfiyesini isteyerek borçlardan korunabilir.
          </p>
        </>
      ),
    },
    {
      id: "vasiyetname",
      title: "Vasiyetname türleri ve iptali",
      body: (
        <>
          <p>
            TMK m. 531 vd. üç tip vasiyetname tanır:
          </p>
          <ul>
            <li>
              <strong>Resmî vasiyetname:</strong> Noter veya sulh hâkimi
              huzurunda, iki tanıkla.
            </li>
            <li>
              <strong>El yazılı vasiyetname:</strong> Murisin tüm metni el
              yazısıyla yazıp tarih ve imza atması yeterlidir.
            </li>
            <li>
              <strong>Sözlü vasiyetname:</strong> Yalnızca olağanüstü hâllerde
              (ölüm tehlikesi, ulaşım imkânsızlığı), iki tanık huzurunda; tehlike
              kalktığında 1 ay içinde geçerliliği son bulur.
            </li>
          </ul>
          <p>
            <strong>Vasiyetnamenin iptali davası (TMK m. 557)</strong> sebepleri:
          </p>
          <ol>
            <li>Şekil eksikliği,</li>
            <li>Ehliyetsizlik,</li>
            <li>Yanılma, aldatma, korkutma gibi irade sakatlıkları,</li>
            <li>Hukuka veya ahlâka aykırı içerik.</li>
          </ol>
          <p>
            Süre, vasiyetnamenin öğrenilmesinden itibaren{" "}
            <strong>1 yıl, her hâlde 10 yıl</strong>'dır (TMK m. 559). Asliye
            Hukuk Mahkemesinde açılır; murisin son yerleşim yeri yetkilidir.
          </p>
        </>
      ),
    },
    {
      id: "muris-muvazaasi",
      title: "Muris muvazaası: mirastan mal kaçırma",
      body: (
        <>
          <p>
            Muris (miras bırakan), saklı paylı mirasçısını yoksun bırakmak
            amacıyla taşınmazını sağlığında "satış" görüntüsü altında bir
            başkasına devredebilir. Görünürde satış olan bu işlem aslında
            <strong> bağışlama</strong>dır ve <strong>1.4.1974 tarihli
            İçtihatları Birleştirme Kararı</strong> uyarınca tüm mirasçılar
            yönünden geçersizdir.
          </p>
          <p>
            Açılacak dava, <strong>tapu iptali ve tescili</strong>{" "}
            niteliğinde; görevli mahkeme Asliye Hukuk Mahkemesi, yetkili
            mahkeme taşınmazın bulunduğu yerdir. Davacı, bağış kastını ve
            satış bedelinin gerçekte ödenmediğini her türlü delille
            ispatlayabilir.
          </p>
          <p>
            Davanın açılabilmesi için terekede saklı pay sahibi mirasçı
            olması veya işlemin saklı pay tecavüzü oluşturması koşulu aranmaz;
            tüm mirasçılar (saklı pay sahibi olmasa da) muvazaa iddiasında
            bulunabilir.
          </p>
        </>
      ),
    },
    {
      id: "tenkis-paylasim",
      title: "Tenkis ve mirasın paylaştırılması",
      body: (
        <>
          <h3>Tenkis davası (TMK m. 560)</h3>
          <p>
            Murisin sağlığında veya vasiyetname ile yaptığı kazandırmalar
            saklı paya tecavüz ediyorsa, saklı paylı mirasçı{" "}
            <strong>tenkis</strong> talep edebilir. Süre, saklı payın
            ihlalinin öğrenilmesinden itibaren <strong>1 yıl, her hâlde 10
            yıl</strong>'dır.
          </p>
          <h3>Paylaşma ve ortaklığın giderilmesi (izale-i şuyu)</h3>
          <ul>
            <li>
              Mirasçılar arasında anlaşma sağlanırsa <strong>noterde
              paylaşma sözleşmesi</strong>.
            </li>
            <li>
              Anlaşılamazsa <strong>sulh hukuk mahkemesinde ortaklığın
              giderilmesi davası</strong> açılır.
            </li>
            <li>
              Mahkeme, taşınmazın aynen taksimi mümkün değilse{" "}
              <strong>satış suretiyle</strong> ortaklığı giderir; satış icra
              müdürlüğünce yapılır.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "kim-basvurmali",
      title: "Hangi durumlarda miras avukatına başvurmalısınız?",
      body: (
        <>
          <ul>
            <li>
              Bir yakının vefatı sonrası <strong>3 aylık ret süresi</strong>{" "}
              içindesiniz ve borca batık tereke ihtimali var.
            </li>
            <li>
              Kardeşinizden veya diğer mirasçılardan saklanmış vasiyetname
              ortaya çıktı; saklı payınıza tecavüz edildiğini düşünüyorsunuz.
            </li>
            <li>
              Murisin sağlığında bir taşınmazını çocuklarından birine "satış"
              görüntüsünde devrettiği ve <strong>muris muvazaası</strong>{" "}
              olduğunu düşünüyorsunuz.
            </li>
            <li>
              Mirasçılar arasında ortak taşınmaz var; kimse satışa
              yanaşmıyor — <strong>ortaklığın giderilmesi</strong> davasıyla
              hak kayıplarını önlemek istiyorsunuz.
            </li>
            <li>
              Yurt dışında ölen yakınınızın Türkiye'deki malları üzerinde tasarruf
              için <strong>tanıma-tenfiz</strong> ve veraset ilamı işlemlerine
              ihtiyaç duyuyorsunuz.
            </li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Mirasın reddi süresi 3 ay; bu süre nasıl başlar?",
      answer:
        "TMK m. 606 uyarınca süre, yasal mirasçılar için ölümü öğrendikleri tarihten; atanmış mirasçılar için ise vasiyetnamenin tebliğinden itibaren işler. Reddi gerçekleştirmek için Sulh Hukuk Mahkemesine yazılı veya sözlü beyanda bulunmak yeterlidir; tutanağa geçirildiğinde sonuç doğurur.",
    },
    {
      question: "Mirası reddedersem çocuklarım sorumlu olur mu?",
      answer:
        "Reddeden mirasçının payı, kendi yerine geçecek altsoyuna geçer. Borç riskini tamamen ortadan kaldırmak için altsoy da kendi adına 3 ay içinde reddetmelidir. Soybağı zincirinde her halkanın ayrı ayrı reddi gerekir; aksi hâlde son halkadakiler borçlarla karşı karşıya kalır.",
    },
    {
      question:
        "Babam tüm taşınmazını ablama satış olarak devretmiş; mirastan mal kaçırma diyebilir miyim?",
      answer:
        "Eğer satış bedeli gerçekte ödenmemiş ise ve devir, sizi mirastan yoksun bırakma kastıyla yapılmışsa muris muvazaası söz konusudur. 1.4.1974 İBK uyarınca dava, taşınmazın bulunduğu yerin Asliye Hukuk Mahkemesinde tapu iptal-tescil davası olarak açılır. Bağış kastı ve bedelsizlik tanık dahil her türlü delille ispatlanabilir.",
    },
    {
      question: "Vasiyetname iptali davasını hangi süreler içinde açmalıyım?",
      answer:
        "TMK m. 559 uyarınca iptal sebebini ve kendi hakkını öğrenen mirasçı 1 yıl, her hâlde vasiyetnamenin açılmasından itibaren 10 yıl içinde dava açmalıdır. Süre hak düşürücüdür; geçirildiğinde dava reddedilir.",
    },
    {
      question:
        "Mirasçılar arasında bir taşınmazda anlaşılamazsa ne olur?",
      answer:
        "Mirasçılardan herhangi biri Sulh Hukuk Mahkemesinde ortaklığın giderilmesi (izale-i şuyu) davası açabilir. Mahkeme önce aynen taksimi mümkün görür; mümkün değilse satış suretiyle paylaştırır. Satış icra müdürlüğünce yapılır ve elde edilen bedel paylar oranında dağıtılır.",
    },
    {
      question:
        "Veraset ilamı için noter mi yoksa mahkeme mi tercih edilmeli?",
      answer:
        "Aile kayıtları açık ve mirasçılar arasında çelişki yoksa noter daha hızlı ve uygun maliyetlidir. Yabancı uyruklu mirasçı, gaiplik, evlat edinme veya çelişkili nüfus kayıtları varsa Sulh Hukuk Mahkemesinin mirasçılık belgesi tercih edilmelidir.",
    },
    {
      question:
        "Yurt dışında ölen anne/babamın Türkiye'deki malları için ne yapmalıyım?",
      answer:
        "Yabancı bir veraset belgesi Türkiye'de doğrudan geçerli değildir; tanıma-tenfiz davası ile Türk mahkemesinde geçerlilik kazandırılması gerekir. Gerek yabancı mahkeme kararının tanınması gerekse Türk mahkemesinden ayrı bir mirasçılık belgesi alınması yoluna gidilebilir.",
    },
  ],
};

