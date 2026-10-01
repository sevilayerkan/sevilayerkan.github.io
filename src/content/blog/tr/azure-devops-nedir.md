---
title: "Azure Devops Nedir?"
description: "Bu yazıda Microsoft’un Azure DevOps ürününü anlatmaya çalıştım. Ve Azure DevOps’un Test, Pipelines, Repos gibi birkaç servisini inceledim."
publishDate: 2022-09-04
category: DevOps
tags:
  - Azure DevOps
  - DevOps
  - CI/CD
locale: tr
translationKey: azure-devops-nedir
draft: false
originalUrl: "https://medium.com/@sevilayerkan/azure-devops-nedir-fd294bee72db"
canonicalUrl: "https://medium.com/@sevilayerkan/azure-devops-nedir-fd294bee72db"
---

![Azure DevOps](https://cdn-images-1.medium.com/max/800/1*lpTlxxrJpvRA9C5EfDpzbQ.png)

Azure DevOps

Merhabalar, bu makalede Microsoft’un [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) ürününü anlatmaya çalışacağım. Azure DevOps’u anlatmaya başlamadan önce bazı temel kavramların üzerinden geçmek daha doğru olacaktır. Bunlardan ilki olan ‘Yazılım Yaşam Döngüsü’ yle başlayalım.

**SDLC — Yazılım Yaşam Döngüsü**(Software Development Life Cycle (SDLC) — Yazılım Geliştirme Yaşam Döngüsü)  
Her yazılım projesi şu üç aşamaya sahip olmalıdır: Bunlar projeye göre bazen iç içe bazen ayrıdır.   
Bunlar:  
-**Planlama** (Project management)  
-**Geliştirme**(Source control)  
-**Operasyon** (Build ve development)  
   
Yani bir akış halinde gösterecek olursak yazılım geliştirmede süreç şu şekilde ilerliyor diyebiliriz basitçe: Develop -> Test -> Build -> Deploy

**DevOps**  
DevOps’u anlatmaya kelimeler yetmez tabi ki ama kısaca insanları, prosesleri ve teknolojileri bir araya getirerek sürekli bir değer sunmak şeklinde tanımlayabiliriz. Detaylı bilgi için bu videoya bakabilirsiniz.

<https://www.youtube.com/watch?v=0yWAtQ6wYNM>  
   
**CI/CD**

![](https://cdn-images-1.medium.com/max/800/0*Wue0fWDCxi5IkuPg)

*(CI-Continuous Integration yani Sürekli Entegrasyon, CD ise Continuous Delivery yani Sürekli Dağıtım)*

Yazılım gelişmeye devam edecektir. Bu süreçte projede değişiklik yaptığımızda bu değişikliklerin gerekli test ve kontrollerden geçerek canlı ortama bir an önce dahil olmasını isteriz ki bu süreci CI/CD olarak adlandırıyoruz.  
   
Örneğin projemizi konteyner üzerinde canlı ortama çıkaracağımızı varsayalım.Geliştirme aşamasından sonra,  
   
Code -> Test -> Build Image -> Push Repo -> Deploy -> Release aşamalarından geçirmemiz gerekiyor ve bu aşamalar her bir değişiklik oldukça tekrarlanır. Adeta bir döngü gibi.

Bunlardan Kod-Test-İmaj yaratma-Repoyu Gönderme CI, Deploy ve Release(Canlıya Alma) ise CD kısmına dahilmiş gibi düşünebiliriz şimdilik. Ancak bu süreçleri birbirinin içine geçmiş bir zincir gibi düşünmek daha doğru olacaktır.

![CI/CD Süreçlerine Genel bir Bakış](https://cdn-images-1.medium.com/max/800/0*3hoiN17CneLnqvAn)

CI/CD Süreçlerine Genel bir Bakış

*Peki bu süreçlerin yönetiminde ne kullanabiliriz?*

Her ihtiyaca ve yazılım geliştirme döngüsünün her bir parçasına ait bir sürü çözüm var. Her bir geliştirme adımı için ayrı teknolojiler kullanabilirsiniz. Örneğin planlama-haberleşme adımı için Jira/Slack, versiyon kontrolü-ci-build için Github, Jenkins; deployment için farklı bir araç vs. şeklinde bu böyle gidecektir. Bu yaklaşımın şöyle bir eksisi olabilir süreçler arasındaki bağlantının nasıl yapılacağı. Bunun için de…

### **Azure DevOps**

bize yardımcı olabilecek güzel bir platform.  
[Azure](https://azure.microsoft.com/) ve [Azure Devops](https://azure.microsoft.com/en-us/services/devops/) ile geliştirme dahil bütün bu süreçleri tek bir ortamdan otomatize bir şekilde yapabiliriz. Yani bir projede değişiklik yapıp git reposuna değişikliği ilettiğimizde yapılandırmada ilettiğimiz bütün bu aşamaları Azure biz hiçbir şey yapmadan koşar ve bu aşamalardaki sonuç başarılıysa değişikliği canlıda tekrar bütün bu aşamaları elle yapmadan görebiliriz.

![](https://cdn-images-1.medium.com/max/800/0*MX-DIWLUiYGtFDXV)

Yazılım geliştirme süreçlerinden bahsederken ilk başta 3 temel aşamaya ayırmıştık. Plan-Geliştirme-Operasyon yani başka bir deyişle Plan-Dev-Ops. Azure DevOps’u bu süreçlerin hepsi için çözümleri tek bir yerde sunuyor.

*Azure bize başka nasıl bir avantaj sağlar?*

- Uçtan uca bütün servisler entegredir.  
- Ekip ve projenin büyüklüğü önemsizdir. Ölçeklenebilir   
- On-prem, hybrid, cloud her ortamda kullanılabilir.  
- Gerektiğinde destek alınabilir.  
- Admin ve erişim kontrolleri tutarlıdır.

*Azure DevOps’u SDLC süreçlerinin neresinde kullanabiliriz?*

- Planlama için; *Azure boards*   
  -Geliştirme; *Azure repos*   
  -Operasyon; Deployment: Azure’nun kendisine deployment yapabileceğimiz gibi AWS,Google Cloud veya On Premise gibi ortamlarda da deployment ve diğer süreçleri kullanabiliriz.

![](https://cdn-images-1.medium.com/max/800/0*Sslorvy4VeP5AIYt)

Bazı servisleri kısaca tanıtmak gerekirse ilk servisimiz olan Azure Boards’a bakalım.

### **Azure Boards**

![](https://cdn-images-1.medium.com/max/800/0*btucRudUSRmj4t1a)

Planlama kısmı SDLC ve DevOps sürecinde en önemli kısımlardan biri Azure DevOps’un planlama özelliklerinden biri olan [Azure Boards](https://azure.microsoft.com/tr-tr/services/devops/boards/) bu planlama, takım çalışması ve görev yönetimi konusunda oldukça güzel bir özellik olarak karşımıza çıkıyor.  
Agile ve Scrum tabloları oluşturma, planlama, ve bütün featurelar boardta bir göreve atanabilmesi gibi bir çok özelliği barındırmasının yanında aynı Jiradaki gibi kişilere/gruplara iş parçaları/taskler tanımlanabiliyor.   
Yine burada da aynı web arayüzü üzerinde sürükle bırakla kanban tabloları üzerinde süreçlerimizi planlayabiliyoruz.

Özet olarak Azure Boards ile;  
-Test planları vb. planlamalar yapılabilir.  
-Analiz araçları sayesinde projenin durumuna dair bilgi edinebiliriz.  
-Üstelik diğer tüm Azure DevOps servisleriyle ve Github gibi servislerle bağlantılıdır.

### **Azure Repos**

![](https://cdn-images-1.medium.com/max/800/0*jyF1eibgBxNkVuUn)

[Azure Repos](https://azure.microsoft.com/tr-tr/services/devops/repos/) bir git reposu gibi düşünülebilir, diğer git çözümlerindeki tüm özelliklere sahiptir. Kaynak kontrolü, git akışı ve hatta bu tarafta bütün özellikler Azure Boards’taki iş planına bağlanabiliyor. Ayrıca Github gibi servislerdeki var olan reponuzu buraya implement edebiliyorsunuz. Kodunuzu browser üzerinden düzenleyebilmeniz de tablet gibi mobil cihazlarınız üzerinden geliştirme yapmanıza olanak sağlıyor.

### **Azure Test Plans**

![](https://cdn-images-1.medium.com/max/800/0*8fo8Amdt9j5qq9I6)

Bu çözümde yine browser üzerinde testleri koşabilir, defectlere ait logları görüntüleyebilirsiniz.

Aplikasyonunuzu nasıl ve nerede olursa olsun, olduğu yerde, web, desktop, on-premise, cloud olması farketmeksizin test edebilirsiniz. Bütün ekip aynı test sürecini kullanabilirsiniz.

### Azure Pipelines

[Burası](https://azure.microsoft.com/tr-tr/services/devops/pipelines/) DevOps’un yani Azure DevOps’un kalbi diyebileceğimiz bir yer. Burada yazılım sürecine (CI/CD sürecine) dair her şeyi yapabilir otomatize edebiliriz bu sayede derleme ve deployment süreçlerinde zamanda ciddi avantaj sağlayabiliriz.

- Her dilde build, test, deploy(canlıya alma) süreçlerimizi buradan yönetebilir,
- İstersek paralel bir şekilde hem Linux hem Windows makineler üzerinde uygulamamızı koşabilir,
- İstediğimiz yere (Azure, AWS, GCP veya kendi sunucularımıza) deploy edebilir,
- Konteynerların faydalarından yararlanabilir,
- Uygulamayı direkt Azure DevOps üzerinde bir imaj haline getirip Docker Hub veya [Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/) üzerine pushlayabiliriz.
- Bütün bu işlemleri shellden de web üzerinden de tıkla çalıştır şeklinde yapabiliriz, bu bize esneklik sağlar istediğimiz cihazdan hatta mobilden CI/CD süreçlerini takip edebilir veya kodlarımızı düzenleyebiliriz.
- Bunun yanı sıra DevOpsla ilgisi olmayan kişilerin de bu süreçlere dahil olmasını sağlar. Yaml (yani konfigürasyon dosyalarının) oluşturulması işlemi dahil bütün işlemler web ara yüzü üzerinden gerçekleştirilebilir.

#### **Faydalı Linkler:**

[**Azure DevOps Services | Microsoft Azure**  
*Eski adı Visual Studio Team Services olan Azure DevOps Services ile daha akıllı planlar yapın, büyük ekiplerde daha…*azure.microsoft.com](https://azure.microsoft.com/tr-tr/services/devops/ "https://azure.microsoft.com/tr-tr/services/devops/")

[**Azure DevOps documentation**  
*Collaborate on software development through source control, work tracking, and continuous integration and delivery…*docs.microsoft.com](https://docs.microsoft.com/tr-tr/azure/devops/?view=azure-devops "https://docs.microsoft.com/tr-tr/azure/devops/?view=azure-devops")

> Makalemi okuyup vakip ayırdığınız için çok teşekkür ederim. :)

> Bu Medium’daki ilk makalem eğer bir hatam olduysa, düzeltmemi istediğiniz bir yer olursa veya iletişime geçmek isterseniz [Twitter](https://www.twitter.com/sevilayerkan0) ve [Linkedin](https://www.linkedin.com/in/sevilayerkan/) adreslerinden bana ulaşabilirsiniz. Twitch’teki yazılımla ilgili yayınlarım için [kanalıma](https://www.twitch.tv/notdepressedeveloper) gelebilirsiniz. İleride yayınlayacağım yazılarda görüşmek üzere… ❤
