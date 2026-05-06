export default function Body() {
  return (
    <>
      <p>
        Kişisel verilerin hukuka aykırı yollarla başkalarınca elde edildiğinin
        öğrenilmesi, veri sorumlusu için 72 saatlik bir kritik süreyi
        başlatır. KVKK m. 12/5 ve Kurul kararları ışığında, doğru bildirimin
        nasıl yapılacağını ve neyi içermesi gerektiğini ele alıyoruz.
      </p>

      <h2>Hangi olay "veri ihlali" sayılır?</h2>
      <p>
        KVKK kapsamında veri ihlali; kişisel verilerin yetkisiz kişilerce
        ele geçirilmesi, açıklanması, değiştirilmesi veya kaybedilmesidir.
        Tipik örnekler:
      </p>
      <ul>
        <li>
          Yetkisiz erişim (siber saldırı, çalınmış kullanıcı kimliği),
        </li>
        <li>
          Çalışan kasıtlı veya hatalı paylaşım,
        </li>
        <li>
          Yedek diskin/dosyanın kaybolması veya çalınması,
        </li>
        <li>
          Yanlış alıcıya gönderilmiş kitle e-postaları (örneğin BCC yerine
          CC kullanımı),
        </li>
        <li>
          Dış sağlayıcıdan kaynaklanan ihlaller (bulut hizmet, e-posta
          sağlayıcı).
        </li>
      </ul>

      <h2>72 saat kuralı</h2>
      <p>
        Veri sorumlusu, ihlalden haberdar olduğu andan itibaren <strong>en
        kısa sürede ve her hâlükârda 72 saat içinde</strong> Kurul'a
        bildirimde bulunmak zorundadır (KVKK m. 12/5). Etkilenen veri
        sahiplerine de <strong>makul sürede</strong> bilgi verilir.
      </p>
      <p>
        Süre, ihlalin teyit edildiği değil; veri sorumlusunun ihlalden
        haberdar olduğu anda işlemeye başlar. Bu nedenle, henüz teyit
        edilmemiş ancak güçlü bulgu içeren olaylarda dahi süre işler.
      </p>

      <h2>Kurula bildirim formu içeriği</h2>
      <p>
        KVKK Kurulu'nun yayımladığı bildirim formu en az aşağıdakileri
        içermelidir:
      </p>
      <ul>
        <li>
          Veri sorumlusu kimliği ve iletişim bilgileri,
        </li>
        <li>
          İhlalin tarihi, fark edildiği tarih ve nasıl fark edildiği,
        </li>
        <li>
          Etkilenen kişi ve kayıt sayısı (ya da en iyi tahmin),
        </li>
        <li>
          Etkilenen veri kategorileri (kimlik, iletişim, finansal, sağlık,
          özel nitelikli vb.),
        </li>
        <li>
          İhlalin olası sonuçları ve riskleri,
        </li>
        <li>
          Alınan / alınacak teknik ve idari tedbirler,
        </li>
        <li>
          Etkilenen kişilere yapılacak/yapılmış bildirim hakkında bilgi.
        </li>
      </ul>
      <p>
        İlk başta tüm bilgiler net olmayabilir; bildirim aşamalı yapılabilir.
        İlk bildirim sonrasında ek bildirimle bilgiler güncellenir.
      </p>

      <h2>Etkilenen kişilere bildirim</h2>
      <p>
        Bildirim, kişiye doğrudan, anlaşılır bir dille yapılır. İçeriği:
      </p>
      <ul>
        <li>
          İhlalin nedeni ve nasıl olduğu (genel hatlarıyla),
        </li>
        <li>
          Etkilenen veri kategorileri,
        </li>
        <li>
          Olası sonuçlar ve kişinin kendisini koruması için önerilen
          adımlar,
        </li>
        <li>
          Veri sorumlusunun aldığı tedbirler,
        </li>
        <li>
          Kişinin başvurabileceği iletişim noktaları (KVKK aydınlatma
          metnindeki kanallar).
        </li>
      </ul>

      <h2>Geç bildirim ve ceza riski</h2>
      <p>
        72 saatlik sürenin aşılması ya da bildirimin hiç yapılmaması, ayrı
        bir idari para cezası sebebidir. KVKK m. 18 cezalar her yıl yeniden
        değerleme oranıyla güncellenir. Geç bildirim, dosyada
        ağırlaştırıcı bir unsur olarak da değerlendirilir.
      </p>
      <p>
        Bildirimin "kısmen yapılmış" olması, hiç yapılmamış olmasından her
        zaman daha iyidir; eksik kalan bilgiler ek bildirimle tamamlanabilir.
      </p>

      <h2>İhlal sonrası yapılacaklar</h2>
      <ol>
        <li>
          <strong>Olay yönetimi:</strong> İhlali sınırlamak, etkilenen
          sistemleri izole etmek, sızıntı kanalını kapatmak.
        </li>
        <li>
          <strong>Adli bilişim incelemesi:</strong> Saldırı vektörünün ve
          etkilenen verilerin tespiti.
        </li>
        <li>
          <strong>Kurum içi kayıt:</strong> İhlal kayıt defterine olay
          ayrıntılı işlenmeli (KVKK rehber dokümanı).
        </li>
        <li>
          <strong>Kurul bildirimi (72 saat):</strong> KVKK Kurulu'nun
          formuyla.
        </li>
        <li>
          <strong>Veri sahibi bildirimi:</strong> Risk seviyesine göre
          makul sürede.
        </li>
        <li>
          <strong>Müteakip iyileştirmeler:</strong> Aynı ihlalin tekrarını
          önleyecek teknik (şifreleme, MFA, segmentasyon) ve idari
          (eğitim, erişim politikası) önlemler.
        </li>
      </ol>

      <h2>İhlal kaydı ve denetim hazırlığı</h2>
      <p>
        Veri sorumlusu, ihlal süreciyle ilgili tüm kararları, bildirimleri
        ve tedbirleri belgelemek zorundadır. Kurul incelemesinde bu kayıt
        zinciri sorulduğunda; eksik dokümanlar veri sorumlusunun aleyhine
        kullanılır.
      </p>

      <h2>Sıkça yapılan hatalar</h2>
      <ul>
        <li>
          "İhlal kesinleşmedi, bildirim yapmayalım" yaklaşımı; oysa süre
          haberdar olunduğu andan itibaren işler.
        </li>
        <li>
          Bildirim içeriğinde sayısal verileri tahmini olarak bile vermemek;
          oysa Kurul bilinmeyen alanları kabul eder, ek bildirim için
          süre tanır.
        </li>
        <li>
          Kişilere yapılacak bildirimin "tek paragraf" tarzı yapılması; oysa
          kişiler kendilerini koruma adımlarını anlayabilmelidir.
        </li>
        <li>
          Kurul kararına itiraz süresinin (60 gün, idare mahkemesi)
          kaçırılması.
        </li>
      </ul>

      <h2>Sonuç</h2>
      <p>
        Veri ihlali, hızı ve disiplini birlikte gerektiren bir krizdir. 72
        saatlik süre içinde teknik tespit, hukuki bildirim ve iletişim
        kanallarının paralel yürütülmesi, hem cezayı azaltır hem de
        veri sorumlusunun itibarını koruyabilir. KVKK uyum projelerinde,
        ihlal yönetimi prosedürünün önceden hazırlanmış olması bu süreci
        belirgin biçimde kolaylaştırır.
      </p>
    </>
  );
}
