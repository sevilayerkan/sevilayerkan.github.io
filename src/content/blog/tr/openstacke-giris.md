---
title: "Openstack’e Giriş"
description: "‘King of the cloud’ yani bulutun kralı olarak adlandırılan Openstack bir ‘Cloud framework’ gibi düşünülebilir, 7 core proje birlikte tek…"
publishDate: 2022-12-15
category: Cloud
tags:
  - OpenStack
  - Cloud
locale: tr
translationKey: openstacke-giris
draft: false
originalUrl: "https://medium.com/@sevilayerkan/openstacke-giri%C5%9F-94e098bcada6"
canonicalUrl: "https://medium.com/@sevilayerkan/openstacke-giri%C5%9F-94e098bcada6"
---

![OpenStack logo](https://cdn-images-1.medium.com/max/800/1*yhw8G1AIWoiJ3uwIC_lVqg.png)

OpenStack

**‘King of the cloud**’ yani bulutun kralı olarak adlandırılan **Openstack** bir ‘**Cloud** framework’ gibi düşünülebilir, 7 core proje birlikte tek bir çatı altında çalışabilir. **Nasa ve Rackspace** iş birliğinde geliştirilmeye başlanmıştır. **Kimlik, storage, image, network yönetimi ve sanallaştırma yönetimi** gibi çözümleri içinde barındırır. **Ansible**, **Terraform** gibi araçlarla da kullanılabilir.

Özetle; bir **datacenterdaki** tüm **işlem**, **depolama**, **networking** kaynaklarının **API** ve diğer **authentication** mekanizmaları sayesinde kontrolünü sağlayan bulut işletim sistemidir aslında. Dashboard desteği sayesinde adminlere ve kullanıcılara web **interface**i aracılığı ile erişim olanağı da sağlar.

Minimum 1 **node**(sunucu) üzerine kurulabilir ancak önerilen node sayısı minimum 2 adettir. (Controller/Compute veya Controller/Compute + Block Storage, Object Storage node gibi) Node sayıları ihtiyaca göre değişebilir. Hybrid yapı ile public cloud firmalarına bağlanılabilir.

**Kullanan** bazı şirketlerden bahsedersek; Nasa, Cern, Yahoo, Deutsche Telekom, Walmart, Trendyol, MEB Fatih Projesi, Turkcell (Nesne depolama)

#### **Servisler**

*-* ***Core (Esas) servisler :*** Glance (Image), Neutron (Networking), Swift (Object Storage), Keystone (Identity), Cinder (Block Storage), Nova (Compute)

*-* ***İsteğe bağlı servisler:*** Ironic(bare metal service), Freezer, Senlin(clustering), Throve, Manila(Shared storage service)

![Buradan OpenStack ile hangi servislerin nerelerde kullanıldığına başka servislerle ilişkilerine bakabiliriz.](https://cdn-images-1.medium.com/max/800/1*kCO5S9VaMloX69QxN8QrtQ.png)

Buradan OpenStack ile hangi servislerin nerelerde kullanıldığına başka servislerle ilişkilerine bakabiliriz.

![Buradaki görselde ise OpenStack’in esas komponetlerini ve ilişkilerini özet olarak görebiliriz.](https://cdn-images-1.medium.com/max/800/1*F6kU_45r2V1Uz6npKnG1kg.png)

Buradaki görselde ise OpenStack’in esas komponetlerini ve ilişkilerini özet olarak görebiliriz.

### **MAAS: Metal As A Service**

![](https://cdn-images-1.medium.com/max/800/1*BE7c9eY_ojUH1WzP5iFG3Q.png)

Fiziksel sunucuların sanki birer virtual makinelermiş gibi bulutta kontrol edilebilmesini sağlar. Fiziksel sunuculara erişim, kurulum ve yönetim işlemlerini gerçekleştirebiliriz.

Açık kaynak kodludur. Bu teknolojiyle uzaktan boot ederek fiziksel sunuculara Windows veya Linux OS lar kurabiliriz. Bilinen birçok OS ve ESXi ile uyum sağlar.

**Ansible, Chef, Salt, Puppet** gibi DevOps araçları ve diğer Openstack servisleri ile de entegrasyonu olması oldukça avantaj sağlar.

**Özet olarak;** MAAS bulutun hız ve esnekliğini, fiziksel (**bare metal**) sistemlerin gücüyle birleştirerek bize ölçeklenebilir güzel bir çözüm sunar. Adeta fiziksel makineleri clouda dönüştürür.

Örnek bir MAAS yönetim ortamı şu şekilde gözükür:

![](https://cdn-images-1.medium.com/max/800/1*BqEbDQAPp3udblBIyDafRg.png)

### **Juju**

![](https://cdn-images-1.medium.com/max/800/1*qEmGk-f8SpTqtmY379JsAQ.png)

Deploy, konfigure etme, scale ve operasyon işlemlerini yapmamızı sağlayan açık kaynaklı bir aplikasyon modelleme aracıdır.

Genelde MAAS ile kullanılır. OpenStack’i geniş ölçekte dağıtmayı, yapılandırmayı, ölçeklendirmeyi ve çalıştırmayı kolaylaştıran açık kaynak kodlu bir üründür.

Desteklenen herhangi bir cloud ortamında birbiriyle entegre çalışacak uygulamaların kurulumunu ve yönetimini sağlar.

![Örnekteki görselde MAAS, ve Juju’nun Kubernetes ile kullanıldığında nasıl bir sistem çıkar görebiliriz.](https://cdn-images-1.medium.com/max/800/1*UO-USWL2QWXkiwBCIvaxSg.png)

Örnekteki görselde MAAS, ve Juju’nun Kubernetes ile kullanıldığında nasıl bir sistem çıkar görebiliriz.

*Buraya kadar OpenStack, MaaS, Juju nedir, ne işe yarar buna bakmış oldum. Makalemi okuyup vakip ayırdığınız için çok teşekkür ederim. :)*

*Eğer bir hatam olduysa, düzeltmemi istediğiniz bir yer olursa veya iletişime geçmek isterseniz* [*Twitter*](https://www.twitter.com/sevilayerkan0) *ve* [*Linkedin*](https://www.linkedin.com/in/sevilayerkan/) *adreslerinden bana ulaşabilirsiniz. Twitch’teki yazılımla ilgili yayınlarım için* [*kanalıma*](https://www.twitch.tv/notdepressedeveloper) *gelebilirsiniz. İleride yayınlayacağım yazılarda görüşmek üzere… ❤*
