---
title: "ISTQB vs Gerçek Hayat #1: ISTQB Nedir, CTFL Ne İşe Yarar ve Test Sadece Bug Bulmak mıdır?"
description: "ISTQB nedir, CTFL ne işe yarar, test yalnızca bug bulmak mıdır — CTFL çalışmasını gerçek QA deneyimiyle birlikte ele alan serinin ilk yazısı."
publishDate: 2026-10-02
category: QA
tags:
  - ISTQB
  - CTFL
  - QA
locale: tr
translationKey: istqb-vs-real-life-01
draft: false
---

# ISTQB vs Gerçek Hayat #1: ISTQB Nedir, CTFL Ne İşe Yarar ve Test Sadece Bug Bulmak mıdır?

Bir süredir ISTQB CTFL sınavına tekrar hazırlanmak istiyordum. Daha önce sınava girdim ve az farkla kaçırdım. Bu sefer sadece syllabus okuyup soru çözmek yerine, çalıştığım konuları yayınlarda gerçek QA deneyimleriyle birlikte ele almaya karar verdim.

Böylece **“ISTQB vs Gerçek Hayat”** serisi ortaya çıktı.

Serinin ilk yayınında en temelden başladık: ISTQB nedir, CTFL nedir, neden alınır, yazılım testi gerçekten ne demektir ve günlük hayatta sık sık birbirinin yerine kullandığımız bazı kavramlar aslında ne kadar farklıdır?

## Önce en temel soru: ISTQB nedir?

ISTQB, **International Software Testing Qualifications Board** ifadesinin kısaltması.

CTFL ise **Certified Tester Foundation Level**.

Foundation Level, yazılım testi konusunda temel kavramları ve ortak terminolojiyi öğrenmek için oluşturulmuş başlangıç seviyesi. Ama “başlangıç seviyesi” deyince yalnızca “bug nedir, test case nedir?” gibi çok basit şeylerden bahsetmiyoruz.

CTFL syllabus; testin temellerinden SDLC boyunca teste, statik testlerden test tasarım tekniklerine, test yönetiminden test araçlarına kadar oldukça geniş bir kapsam içeriyor.

Bir diğer önemli nokta da şu: ISTQB yalnızca tester veya QA'ler için hazırlanmış bir yapı değil. Syllabus; geliştiriciler, proje yöneticileri, product owner'lar ve business analyst gibi farklı rollerin de bu bilgilerden faydalanabileceğini açıkça belirtiyor.

Bence burada verilmek istenen mesaj oldukça net: **kalite yalnızca QA ekibinin konusu değil.**

## Peki ISTQB neden alınır?

Ben ISTQB'yi “bu sertifikayı alırsam kesin iş bulurum” şeklinde görmüyorum.

Benim için daha çok üç konuda değerli: terminolojiyi oturtmak, zaten yaptığımız işleri teorik bir çerçeveye yerleştirmek ve eksik olduğumuz alanları fark etmek.

Günlük hayatta regression testing yapıyor olabilirsiniz. API testleri yazıyor olabilirsiniz. Risk bazlı kararlar veriyor olabilirsiniz. Ama bazen bunları hangi test yaklaşımının parçası olarak yaptığımızı veya benzer bir durumda hangi alternatif teknikleri kullanabileceğimizi bilmiyoruz.

ISTQB biraz bu dağınık bilgileri bir araya getiriyor.

Ama bence burada altı çizilmesi gereken şey şu:

**Sertifika deneyim değildir.**

CTFL almak birini otomatik olarak iyi bir tester yapmaz. Gerçek projelerde analiz yapabilmek, iletişim kurmak, doğru soruyu sormak, teknik detayları anlayabilmek ve risk görebilmek hâlâ ayrı beceriler.

## K1, K2, K3 meselesi

ISTQB syllabus'ta konuların yanında K1, K2 ve K3 seviyeleri göreceksiniz.

K1 temel olarak hatırlama, K2 anlama, K3 ise uygulama seviyesini ifade ediyor.

Ben yayın sırasında bunu biraz daha basit anlattım:

**K1:** Bunu bil.  
**K2:** Bunu kendi cümlenle açıklayabil.  
**K3:** Tamam, artık soru çözüyoruz.

Özellikle ilerleyen bölümlerde Equivalence Partitioning, Boundary Value Analysis, Decision Table gibi tekniklere geldiğimizde sadece tanım ezberlemek yetmeyecek. Gerçekten test case üretmemiz gerekecek.

## Yazılım testi gerçekten nedir?

İlk yayındaki en önemli konulardan biri buydu.

Çünkü yazılım sektöründe “test” dediğimizde çoğu kişinin aklına uygulamayı açıp bir şeyleri denemek geliyor.

Ama testing bundan daha geniş.

Syllabus'a göre yazılım testi, yalnızca yazılımı çalıştırmak ve sonuçları kontrol etmekten ibaret değil. Requirement, user story, tasarım ve kod gibi iş ürünlerinin değerlendirilmesi de test aktivitelerinin içinde yer alabiliyor. Ayrıca test hem statik hem dinamik olabilir.

Yani kod henüz yazılmamışken bile test aktivitesine katkıda bulunabilirsiniz.

Örneğin bir Jira task'ında şöyle bir acceptance criteria olduğunu düşünelim:

> Kullanıcı profilini güncelleyebilir.

Hangi alanları?

E-posta değişirse verification gerekiyor mu?

Telefon numarasının formatı nasıl olacak?

Başka bir kullanıcının profilini değiştirebilir mi?

Bunların hiçbiri belli değilse, daha development başlamadan ortada test edilebilirlik açısından bir problem var.

Bu yüzden QA'nın task'ı ilk kez test ortamına geldiğinde görmesi bana hiçbir zaman ideal bir süreç gibi gelmedi.

## Testin amacı bug bulmak mı?

Bug bulmak testin önemli bir parçası.

Ama tek amacı değil.

Syllabus test hedefleri arasında gereksinimlerin doğrulanmasını, risklerin azaltılmasını, test nesnesinin kalite kriterlerini karşılayıp karşılamadığının değerlendirilmesini ve paydaşlara karar verebilmeleri için yeterli bilgi sağlanmasını da sayıyor.

Bu ayrım benim özellikle sevdiğim konulardan biri.

Diyelim ki bütün gün test yaptınız ve hiç defect bulamadınız.

Bu, o gün hiçbir şey üretmediğiniz anlamına mı geliyor?

Hayır.

Kritik bir akışın belirli koşullarda beklendiği gibi çalıştığını göstermiş olabilirsiniz. Belirli risklerin kontrol edildiğine dair bilgi sağlamış olabilirsiniz.

Testin çıktısı yalnızca defect değildir.

Bazen en önemli çıktısı **bilgidir**.

## Verification ve Validation aynı şey değil

Bunu hatırlamanın en kolay yolu şu:

**Verification:** Ürünü doğru yaptık mı?

**Validation:** Doğru ürünü mü yaptık?

Syllabus da testin hem gereksinimlerin karşılanıp karşılanmadığını kontrol etmeyi hem de ürünün kullanıcı ve paydaş ihtiyaçlarını karşılayıp karşılamadığını değerlendirmeyi kapsadığını söylüyor.

Bir sistem requirement'a yüzde yüz uygun olabilir.

Ama requirement'ın kendisi kullanıcı ihtiyacını karşılamıyorsa yine kötü bir ürün ortaya çıkabilir.

Bu yüzden “tüm acceptance criteria pass oldu” cümlesi tek başına “ürün başarılı” anlamına gelmiyor.

## Testing ile Debugging aynı şey değil

Bu kavramlar günlük hayatta da birbirine karışıyor.

Testing sırasında bir failure ortaya çıkarabiliriz veya statik test ile doğrudan bir defect bulabiliriz.

Debugging ise failure'ın nedenini bulmak, analiz etmek ve defect'i düzeltmekle ilgili. Syllabus tipik debugging akışını problemi yeniden oluşturma, defect'i teşhis etme ve düzeltme şeklinde açıklıyor. Ardından confirmation testing ve gerekirse regression testing yapılabiliyor.

Mesela API test ederken 500 response aldığımı düşünelim.

Ben problemi reproduce ettim, request'i ve response'u kaydettim.

Developer loglara baktı, problemi buldu ve kodu düzeltti.

Sonra ben aynı senaryoyu tekrar çalıştırdım.

Burada testing ve debugging birbirinden farklı aktiviteler.

Ama bu, “QA log okuyamaz” gibi bir şey de değil. QA log okuyabilir, kod inceleyebilir, problemi analiz edebilir.

Kavramların farkı, kullanılan tool'dan çok aktivitenin amacıyla ilgili.

## Testing ve QA aynı şey mi?

Bence ilk yayının en güzel tartışmalarından biri buydu.

Çünkü çoğumuzun unvanında “QA” geçiyor ama yaptığımız işlerin büyük kısmı aslında testing olabilir.

ISTQB testing'i daha ürün odaklı ve düzeltici bir kalite kontrol yaklaşımı olarak ele alıyor. Quality Assurance ise süreç odaklı ve önleyici; süreçlerin uygulanmasına ve iyileştirilmesine bakıyor. Ayrıca QA'nın yalnızca tester'ın değil, projedeki herkesin sorumluluğu olduğu belirtiliyor.

Örneğin yanlış parola ile login endpoint'ini test etmek testing.

Ama her sprint login requirement'larının eksik geldiğini fark edip “biz refinement sürecinde neden bunu netleştiremiyoruz?” diye sorgulamak QA tarafına daha yakın.

Ben de gerçek hayatta bu ikisinin oldukça iç içe geçtiğini düşünüyorum.

## Human Error → Defect → Failure → Root Cause

Bir de sınavda karıştırılması kolay kavramlar var.

Basit bir örnek:

Requirement şöyle olsun:

> 18 yaş ve üzerindeki kullanıcı kayıt olabilir.

Developer yanlışlıkla şu koşulu yazmış olsun:

```javascript
if (age > 18) {
  allowRegistration();
}
```

Burada insanın yaptığı yanlışlık **human error**.

Kodun içindeki `> 18` koşulu **defect**.

18 yaşındaki kullanıcının kayıt olamaması ise gözlemlediğimiz **failure**.

Peki root cause?

İşte onu doğrudan koda bakıp söyleyemeyiz.

Requirement yanlış anlaşılmış olabilir. Review yapılmamış olabilir. Zaman baskısı olmuş olabilir. İletişim problemi yaşanmış olabilir.

Syllabus da insan hatası, defect, failure ve root cause kavramlarını birbirinden ayırıyor; ayrıca her defect'in her koşulda failure üretmek zorunda olmadığını belirtiyor.

Bu ayrımı özellikle seviyorum çünkü gerçek projelerde “bug nerede?” sorusuyla “bu bug neden oluştu?” sorusu aynı şey değil.

## İlk yayından benim çıkardığım sonuç

İlk bölümde daha syllabus'ın çok başındaydık ama aslında test yaklaşımı açısından temel bir şeyi oturttuk:

**Testing sadece test case çalıştırmak değil.**

Requirement okumak, risk görmek, soru sormak, kullanıcı ihtiyacını anlamak, kalite hakkında bilgi üretmek ve geliştirme sürecine geri bildirim sağlamak da işin bir parçası.

Bir sonraki yayında ISTQB'nin yedi test prensibine geçeceğim.

Özellikle şu konuyu konuşmak istiyorum:

**“Exhaustive testing is impossible.”**

Yani her şeyi test etmek mümkün değil.

Teoride kolay cümle.

Ama release yarınsa ve önünüzde 100 test case varsa asıl soru başlıyor:

**Hangilerini test edeceğiz?**
