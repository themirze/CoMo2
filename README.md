# Google Consent Mode V2 Implementation

Bu script, Google Consent Mode V2 gereksinimlerini karşılayan modern bir cookie consent banner'ı sağlar.

## Özellikler

- Modern ve kullanıcı dostu arayüz
- Kategorilere ayrılmış cookie yönetimi
- Google Consent Mode V2 uyumlu
- Responsive tasarım
- LocalStorage ile tercih kaydı
- Google Tag Manager, Google Analytics ve Google Ads entegrasyonu

## Kurulum

1. Script'i web sitenize ekleyin:

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ start: new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-XXXXXXX");
</script>

<!-- Google Consent Mode V2 -->
<script src="consent-manager.js"></script>

<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0"
    width="0"
    style="display:none;visibility:hidden"></iframe
></noscript>
```

## Önemli Notlar

1. Script'i Google Tag Manager'dan önce yükleyin
2. GTM-XXXXXXX yerine kendi Google Tag Manager ID'nizi yazın
3. Script, kullanıcı tercihlerini localStorage'da saklar
4. Varsayılan olarak tüm izinler reddedilmiş durumdadır
5. Kullanıcı tercihleri değiştiğinde otomatik olarak Google Consent Mode güncellenir

## Kategoriler

1. **Necessary (Gerekli)**

   - Temel site fonksiyonları için gerekli çerezler
   - Her zaman aktif

2. **Analytics (Analitik)**

   - Google Analytics çerezleri
   - Kullanıcı etkileşimlerini analiz etmek için

3. **Marketing (Pazarlama)**
   - Google Ads çerezleri
   - Reklam kişiselleştirme ve takibi için

## Özelleştirme

Script'i özelleştirmek için `consent-manager.js` dosyasındaki aşağıdaki bölümleri düzenleyebilirsiniz:

- `categories`: Cookie kategorilerini ve açıklamalarını
- CSS stilleri: Banner ve modal görünümünü
- Metinler: Banner ve modal içeriğindeki metinleri

## Teknik Detaylar

Script, Google Consent Mode V2'nin tüm gereksinimlerini karşılar:

- `ad_storage`
- `analytics_storage`
- `ad_user_data`
- `ad_personalization`

Her kullanıcı tercihi değişikliğinde, ilgili Google servisleri otomatik olarak güncellenir.
