const arKeywords =
  "ايجار سيارات, تأجير سيارات, ايجار عربيات, تأجير عربيات, ايجار سيارة, تأجير سيارة, شركة تأجير سيارات, شركة ايجار سيارات, ايجار سيارات رخيصة, ايجار سيارات بدون سائق, ايجار سيارات مع سائق, ايجار سيارات يومي, ايجار سيارات اسبوعي, ايجار سيارات شهري, ايجار سيارات طويل المدى, ايجار سيارات قصير المدى, ايجار سيارات بالساعة, حجز سيارة, حجز سيارات اونلاين, حجز سيارة ايجار, احسن شركة ايجار سيارات, افضل شركة ايجار سيارات في مصر, اسعار ايجار السيارات, ايجار سيارات اقتصادية, ايجار سيارات عائلية, ايجار سيارات للسفر, ايجار سيارات للمناسبات, ايجار سيارات زفاف, سيارات زفاف للايجار, ايجار سيارات للشركات, ايجار سيارات للسياح, ايجار سيارات من المطار, توصيل السيارة للمطار, استلام السيارة من المطار, ليموزين, لاموزين, ايجار ليموزين, ايجار لاموزين, ليموزين مطار, ليموزين زفاف, ليموزين مع سائق, ايجار ميكروباص, ايجار ميني فان, ايجار فان, ايجار سيارات 7 راكب, ايجار سيارة سيدان, ايجار سيارة SUV, ايجار سيارة دفع رباعي, ايجار سيارة اوتوماتيك, ايجار سيارة مانيوال, ايجار سيارات في القاهرة, ايجار سيارات في الجيزة, ايجار سيارات في الاسكندرية, ايجار سيارات في شرم الشيخ, ايجار سيارات في الغردقة, ايجار سيارات في الاقصر, ايجار سيارات في اسوان, ايجار سيارات في القاهرة الجديدة, ايجار سيارات في التجمع الخامس, ايجار سيارات في مدينة نصر, ايجار سيارات في مصر الجديدة, ايجار سيارات في 6 اكتوبر, ايجار سيارات في الشيخ زايد, ايجار سيارات مطار القاهرة, ايجار سيارات في الساحل الشمالي, ايجار سيارات في العين السخنة, ايجار سيارات في دهب, ايجار سيارات في مرسى علم, ايجار سيارة بدون سائق في القاهرة, ايجار سيارة اوتوماتيك رخيصة, ايجار سيارة لمدة شهر في القاهرة, ايجار سيارة عائلية 7 راكب مع سائق, ايجار سيارة من مطار القاهرة, ايجار سيارة زفاف مع سائق";

const enKeywords =
  "car rental, car hire, rent a car, rent car online, car rental company, car rental service, cheap car rental, affordable car rental, best car rental, car rental near me, car rental with driver, car rental without driver, self drive car rental, daily car rental, weekly car rental, monthly car rental, long term car rental, short term car rental, hourly car rental, economy car rental, family car rental, wedding car rental, corporate car rental, airport car rental, airport pickup, car delivery service, online car booking, book a car online, car booking, car rental prices, car rental deals, car rental offers, vehicle rental, van rental, minibus rental, limousine, limousine rental, limo rental, limousine service, airport limousine, wedding limousine, limousine with driver, chauffeur service, tourist car rental, SUV rental, sedan rental, 4x4 rental, automatic car rental, manual car rental, car rental Egypt, car rental Cairo, car rental Giza, car rental Alexandria, car rental Sharm El Sheikh, car rental Hurghada, car rental Luxor, car rental Aswan, Cairo airport car rental, rent a car Cairo airport, rent a car Egypt, car hire Egypt, cheap car rental in Cairo with no deposit, rent a car in Egypt for tourists, monthly car rental Cairo price, self drive car rental Egypt";

const toList = (text: string) =>
  Array.from(new Set(text.split(",").map((k) => k.trim()).filter(Boolean)));

export const SEO: Record<
  "ar" | "en",
  { siteName: string; title: string; description: string; keywords: string[] }
> = {
  ar: {
    siteName: "ASCarRental",
    title: "ASCarRental | ايجار سيارات في القاهرة والجيزة والشيخ زايد",
    description:
      "ايجار سيارات بسائق وبدون سائق في الشيخ زايد والقاهرة والجيزة: سيارات اقتصادية وعائلية وفاخرة، توصيل واستلام من المطار، أفضل الأسعار وخدمة موثوقة.",
    keywords: toList(arKeywords),
  },
  en: {
    siteName: "ASCarRental",
    title: "ASCarRental | Rent a Car in Cairo, Giza & Sheikh Zayed, Egypt",
    description:
      "Rent a car in Egypt with or without a driver. Economy, family and luxury cars, airport pickup and delivery, best prices and reliable service in Cairo and Giza.",
    keywords: toList(enKeywords),
  },
};
