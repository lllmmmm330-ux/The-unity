export type Language = 'ar' | 'en' | 'tr';

export interface Translations {
  appName: string;
  tagline: string;
  subTagline: string;
  heroBadge: string;
  pdfTools: string;
  productStudio: string;
  cvMaker: string;
  seoLogic: string;
  adSimulator: string;
  hideSimulator: string;
  contactUs: string;
  whatsapp: string;
  email: string;
  mergePdf: string;
  compressPdf: string;
  signPdf: string;
  imgToPdf: string;
  dropPdfHere: string;
  chooseFiles: string;
  mergeNow: string;
  compressNow: string;
  signNow: string;
  convertNow: string;
  downloadResult: string;
  privacyGuarantee: string;
  sellerFeaturesTitle: string;
  sellerFeaturesSub: string;
  uploadProductPhoto: string;
  testSamplePhoto: string;
  bgTypeLabel: string;
  bgTransparent: string;
  bgWhiteStudio: string;
  bgLuxuryPodium: string;
  bgInstagramSunset: string;
  bgWarm: string;
  bgSoftGray: string;
  aspectRatioLabel: string;
  addShadowLabel: string;
  badgeLabel: string;
  toleranceLabel: string;
  downloadProductPhoto: string;
  cvTitle: string;
  cvSub: string;
  demoGermany: string;
  demoTurkey: string;
  styleLabel: string;
  styleGerman: string;
  styleModern: string;
  styleExecutive: string;
  printOrSavePdf: string;
  fullName: string;
  jobTitle: string;
  legalStatus: string;
  personalInfo: string;
  languagesTitle: string;
  addLanguage: string;
  experiencesTitle: string;
  addExperience: string;
  educationTitle: string;
  skillsTitle: string;
  monthlySearchesHeader: string;
  calculatorTitle: string;
  dailyVisitors: string;
  monthlyRevenueEst: string;
  yearlyRevenueEst: string;
  allRightsReserved: string;
  instantChat: string;
  loginBtn: string;
  logoutBtn: string;
  welcomeUser: string;
  loginTitle: string;
  loginSub: string;
  continueWithGoogle: string;
  orContinueWith: string;
  tabEmail: string;
  tabPhone: string;
  enterName: string;
  enterEmail: string;
  enterPhone: string;
  enterPassword: string;
  createAccount: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  loginSuccess: string;
  verifiedAccount: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  ar: {
    appName: 'عرب تولز · ArabTools',
    tagline: 'أدوات مجانية تنجز معاملاتك في ثوانٍ',
    subTagline: 'حلول عملية فائقة السرعة: دمج وتوقيع مستندات PDF، تجهيز صور منتجات إنستغرام، وصانع السيرة الذاتية الجاهز للسوريين والمغتربين بمعايير العمل الرسمية.',
    heroBadge: 'فلسفة الأداة الحرة: ارفع الملف ← حمّل النتيجة فوراً بدون انتظار أو تسجيل',
    pdfTools: 'أدوات PDF',
    productStudio: 'استوديو إنستغرام والمتاجر',
    cvMaker: 'صانع السيرة الذاتية (CV)',
    seoLogic: 'منطق ماكينة الزوار (SEO)',
    adSimulator: 'محاكي أرباح AdSense ($)',
    hideSimulator: 'إخفاء محاكي أرباح AdSense',
    contactUs: 'تواصل مباشر ومعلن',
    whatsapp: 'واتساب: 05359726667',
    email: 'lllmmmm330@gmail.com',
    mergePdf: 'دمج PDF',
    compressPdf: 'ضغط PDF',
    signPdf: 'توقيع PDF',
    imgToPdf: 'صور إلى PDF',
    dropPdfHere: 'اسحب وأفلت ملفات الـ PDF هنا، أو انقر للاختيار من جهازك',
    chooseFiles: 'اختر ملفات من جهازك',
    mergeNow: 'دمج وتحميل الملف المدمج فوراً',
    compressNow: 'ضغط وتحميل الملف فوراً',
    signNow: 'توقيع وتحميل الـ PDF فوراً',
    convertNow: 'تحويل وتحميل الـ PDF فوراً',
    downloadResult: 'تحميل النتيجة مباشرة',
    privacyGuarantee: 'معالجة مشفرة وآمنة 100% داخل جهازك دون رفع ملفاتك لأي خادم خارجي',
    sellerFeaturesTitle: 'إزالة خلفية صور المنتجات وصناعة غلاف تجاري فخم',
    sellerFeaturesSub: 'حوّل تصوير الهاتف العادي إلى لقطة استوديو احترافية بخلفية بيضاء نقية، بوديوم فاخر، وظلال واقعية تضاعف مبيعاتك على إنستغرام وسلة وزد.',
    uploadProductPhoto: 'ارفع صورة منتجك من هاتفك أو حاسوبك',
    testSamplePhoto: 'جرّب على صورة عطر تجاري فاخر',
    bgTypeLabel: 'نوع الخلفية الجديدة:',
    bgTransparent: 'خلفية شفافة (PNG)',
    bgWhiteStudio: 'أبيض نقي 100% (معيار المتاجر)',
    bgLuxuryPodium: 'بوديوم واستوديو رخامي فاخر ✨',
    bgInstagramSunset: 'تدرج إنستغرام هادئ 🌅',
    bgWarm: 'دافئ للعطور والمأكولات',
    bgSoftGray: 'رمادي استوديو هادئ',
    aspectRatioLabel: 'مقاس النشر المطلوب:',
    addShadowLabel: 'إضافة ظل واقعي للمنتج (Realistic Soft Shadow)',
    badgeLabel: 'شارة تسويقية جاهزة للمبيعات:',
    toleranceLabel: 'حساسية عزل وتفريغ الخلفية:',
    downloadProductPhoto: 'تحميل صورة المنتج بجودة استوديو فوراً',
    cvTitle: 'صانع السيرة الذاتية السريع (Lebenslauf & CV)',
    cvSub: 'سيرة ذاتية متوافقة 100% مع معايير الـ Jobcenter ومكاتب العمل في ألمانيا وتركيا، طباعة وتحميل فوري بدون اشتراك.',
    demoGermany: 'نموذج ألمانيا (Lebenslauf) 🇩🇪',
    demoTurkey: 'نموذج تركيا (كيملك وتصريح عمل) 🇹🇷',
    styleLabel: 'النمط والقالب:',
    styleGerman: 'النمط الألماني الرسمي (Lebenslauf)',
    styleModern: 'النمط العربي الحديث',
    styleExecutive: 'النمط التنفيذي (Executive)',
    printOrSavePdf: 'طباعة أو حفظ كملف PDF عالي الدقة',
    fullName: 'الاسم الكامل',
    jobTitle: 'المسمى الوظيفي المستهدف',
    legalStatus: 'الوضع القانوني وتصريح العمل (هام جداً للشركات):',
    personalInfo: 'البيانات الشخصية ومعلومات الاتصال',
    languagesTitle: 'اللغات ومستوياتها (A1-C2):',
    addLanguage: 'إضافة لغة',
    experiencesTitle: 'الخبرات المهنية وسجل العمل:',
    addExperience: 'إضافة خبرة',
    educationTitle: 'التعليم والشهادات:',
    skillsTitle: 'المهارات والقدرات:',
    monthlySearchesHeader: 'أبرز الكلمات البحثية المليونية المستهدفة في هذه المنصة',
    calculatorTitle: 'كم تربح المنصة شهرياً من الزوار القادمين من بحث جوجل؟',
    dailyVisitors: 'عدد الزوار اليومي من بحث جوجل:',
    monthlyRevenueEst: 'العائد الشهري المتوقع:',
    yearlyRevenueEst: 'العائد السنوي المتوقع:',
    allRightsReserved: 'جميع الحقوق محفوظة © عرب تولز. مجاني 100% بدون أي رسوم.',
    instantChat: 'تواصل فوري عبر الواتساب',
    loginBtn: 'تسجيل الدخول / حساب جديد',
    logoutBtn: 'تسجيل الخروج',
    welcomeUser: 'مرحباً بك',
    loginTitle: 'تسجيل الدخول في عرب تولز',
    loginSub: 'احفظ ملفاتك وسيرك الذاتية ووثائقك الموقعة في حسابك الشخصي مجاناً',
    continueWithGoogle: 'المتابعة باستخدام حساب Google',
    orContinueWith: 'أو المتابعة عبر البريد أو الهاتف',
    tabEmail: 'البريد الإلكتروني',
    tabPhone: 'رقم الهاتف',
    enterName: 'الاسم الكامل',
    enterEmail: 'البريد الإلكتروني (مثال: user@gmail.com)',
    enterPhone: 'رقم الهاتف مع رمز الدولة (مثال: 05359726667)',
    enterPassword: 'كلمة المرور',
    createAccount: 'إنشاء حساب جديد',
    alreadyHaveAccount: 'لديك حساب بالفعل؟ تسجيل الدخول',
    dontHaveAccount: 'ليس لديك حساب؟ إنشاء حساب مجاني',
    loginSuccess: 'تم تسجيل الدخول بنجاح! أهلاً بك.',
    verifiedAccount: 'حساب موثق ومميز',
  },
  en: {
    appName: 'ArabTools Pro · Instant Micro-Tools',
    tagline: 'Free Instant Tools in Seconds',
    subTagline: 'Ultra-fast practical utilities: Merge & sign PDFs, prepare Instagram product photos with clean cutouts, and create German Lebenslauf & Turkish verified CVs.',
    heroBadge: 'Zero-Wait Philosophy: Upload File → Download Result Instantly',
    pdfTools: 'PDF Tools',
    productStudio: 'Instagram Product Studio',
    cvMaker: 'CV & Resume Builder',
    seoLogic: 'SEO Traffic Machine',
    adSimulator: 'AdSense Profit Simulator ($)',
    hideSimulator: 'Hide AdSense Simulator',
    contactUs: 'Direct Contact & Ads',
    whatsapp: 'WhatsApp: +90 535 972 66 67',
    email: 'lllmmmm330@gmail.com',
    mergePdf: 'Merge PDF',
    compressPdf: 'Compress PDF',
    signPdf: 'Sign PDF',
    imgToPdf: 'Images to PDF',
    dropPdfHere: 'Drag & drop PDF files here, or click to choose from device',
    chooseFiles: 'Choose files from device',
    mergeNow: 'Merge & Download PDF Now',
    compressNow: 'Compress & Download Now',
    signNow: 'Sign & Download PDF Now',
    convertNow: 'Convert & Download PDF Now',
    downloadResult: 'Download Result Instantly',
    privacyGuarantee: '100% Client-side processing. Your files never leave your browser.',
    sellerFeaturesTitle: 'Remove Photo Backgrounds & Craft Luxury Product Shots',
    sellerFeaturesSub: 'Turn raw phone snaps into commercial studio photography with pure white backdrop, luxury podiums, and realistic soft drop shadows.',
    uploadProductPhoto: 'Upload product photo from your device',
    testSamplePhoto: 'Try with luxury perfume bottle sample',
    bgTypeLabel: 'Background Selection:',
    bgTransparent: 'Transparent (PNG)',
    bgWhiteStudio: '100% Pure White (E-commerce Std)',
    bgLuxuryPodium: 'Luxury Studio Marble Podium ✨',
    bgInstagramSunset: 'Instagram Sunset Aesthetic 🌅',
    bgWarm: 'Warm Luxury Tone',
    bgSoftGray: 'Soft Studio Gray',
    aspectRatioLabel: 'Output Format:',
    addShadowLabel: 'Add Realistic Soft Drop Shadow',
    badgeLabel: 'Promotional Ribbon Badge:',
    toleranceLabel: 'Cutout Tolerance Sensitivity:',
    downloadProductPhoto: 'Download Studio Product Shot',
    cvTitle: 'Fast Professional CV & Lebenslauf Builder',
    cvSub: 'Compliant with German Jobcenter, Agentur für Arbeit & Turkish standards (CEFR A1-C2 languages & legal status fields). Free PDF export.',
    demoGermany: 'Germany Template (Lebenslauf) 🇩🇪',
    demoTurkey: 'Turkey Template (Kimlik & Permit) 🇹🇷',
    styleLabel: 'Template Style:',
    styleGerman: 'Official German Format (Lebenslauf)',
    styleModern: 'Modern Clean Format',
    styleExecutive: 'Executive Format',
    printOrSavePdf: 'Print or Save as High-Res PDF',
    fullName: 'Full Name',
    jobTitle: 'Target Job Title',
    legalStatus: 'Work Permit & Legal Status (Critical for Employers):',
    personalInfo: 'Personal Info & Contact Details',
    languagesTitle: 'Languages & Proficiency (CEFR):',
    addLanguage: 'Add Language',
    experiencesTitle: 'Professional Work Experience:',
    addExperience: 'Add Experience',
    educationTitle: 'Education & Qualifications:',
    skillsTitle: 'Skills & Competencies:',
    monthlySearchesHeader: 'High-Intent Search Queries Driving Traffic',
    calculatorTitle: 'Estimated Monthly AdSense Revenue from Google Traffic',
    dailyVisitors: 'Daily Google Search Visitors:',
    monthlyRevenueEst: 'Estimated Monthly Revenue:',
    yearlyRevenueEst: 'Estimated Annual Revenue:',
    allRightsReserved: 'All rights reserved © ArabTools. 100% Free Forever.',
    instantChat: 'Instant WhatsApp Chat',
    loginBtn: 'Sign In / Register',
    logoutBtn: 'Sign Out',
    welcomeUser: 'Welcome back',
    loginTitle: 'Sign In to ArabTools',
    loginSub: 'Save your documents, signed contracts, and CVs safely in your account',
    continueWithGoogle: 'Continue with Google',
    orContinueWith: 'Or continue with Email or Phone',
    tabEmail: 'Email Address',
    tabPhone: 'Phone Number',
    enterName: 'Full Name',
    enterEmail: 'Email Address (e.g. user@gmail.com)',
    enterPhone: 'Phone Number with Country Code (+90 535 972 66 67)',
    enterPassword: 'Password',
    createAccount: 'Create New Account',
    alreadyHaveAccount: 'Already have an account? Sign In',
    dontHaveAccount: 'Need an account? Create one free',
    loginSuccess: 'Successfully signed in! Welcome back.',
    verifiedAccount: 'Verified Member Account',
  },
  tr: {
    appName: 'ArabTools Pro · Hızlı Ücretsiz Araçlar',
    tagline: 'Saniyeler İçinde Ücretsiz Araçlar',
    subTagline: 'Ultra hızlı pratik çözümler: PDF birleştirme ve imzalama, Instagram ürün fotoğrafı arka plan temizleme ve Türkiye/Almanya uyumlu CV hazırlama.',
    heroBadge: 'Sıfır Bekleme Mantığı: Dosyayı Yükle → Sonucu Anında İndir',
    pdfTools: 'PDF Araçları',
    productStudio: 'Instagram Ürün Stüdyosu',
    cvMaker: 'Özgeçmiş (CV) Hazırlayıcı',
    seoLogic: 'SEO Ziyaretçi Makinesi',
    adSimulator: 'AdSense Gelir Simülatörü ($)',
    hideSimulator: 'Simülatörü Gizle',
    contactUs: 'Doğrudan İletişim & Reklam',
    whatsapp: 'WhatsApp: 0535 972 66 67',
    email: 'lllmmmm330@gmail.com',
    mergePdf: 'PDF Birleştir',
    compressPdf: 'PDF Sıkıştır',
    signPdf: 'PDF İmzala',
    imgToPdf: 'Fotoğraftan PDF',
    dropPdfHere: 'PDF dosyalarını buraya sürükleyin veya cihazınızdan seçin',
    chooseFiles: 'Cihazdan dosya seç',
    mergeNow: 'Birleştir ve Hemen İndir',
    compressNow: 'Sıkıştır ve Hemen İndir',
    signNow: 'İmzala ve Hemen İndir',
    convertNow: 'Dönüştür ve Hemen İndir',
    downloadResult: 'Sonucu Anında İndir',
    privacyGuarantee: '100% Tarayıcı içi güvenli işlem. Dosyalarınız hiçbir sunucuya yüklenmez.',
    sellerFeaturesTitle: 'Ürün Fotoğrafı Arka Planını Sil & Ticari Kapak Üret',
    sellerFeaturesSub: 'Sıradan telefon çekimini stüdyo kalitesine dönüştürün: Saf beyaz zemin, lüks podyum ve gerçekçi gölgelerle Instagram satışlarınızı artırın.',
    uploadProductPhoto: 'Ürün fotoğrafınızı yükleyin',
    testSamplePhoto: 'Lüks parfüm şişesi ile dene',
    bgTypeLabel: 'Yeni Arka Plan Türü:',
    bgTransparent: 'Şeffaf Arka Plan (PNG)',
    bgWhiteStudio: '100% Saf Beyaz (Pazaryeri Standardı)',
    bgLuxuryPodium: 'Lüks Stüdyo Mermer Podyum ✨',
    bgInstagramSunset: 'Instagram Gün Batımı Teması 🌅',
    bgWarm: 'Sıcak Parfüm ve Butik Tonu',
    bgSoftGray: 'Yumuşak Stüdyo Grisi',
    aspectRatioLabel: 'Yayın Formatı:',
    addShadowLabel: 'Gerçekçi Yumuşak Gölge Ekle',
    badgeLabel: 'Pazarlama Etiketi (Opsiyonel):',
    toleranceLabel: 'Arka Plan Kesme Hassasiyeti:',
    downloadProductPhoto: 'Ürün Fotoğrafını Hemen İndir',
    cvTitle: 'Hızlı Profesyonel CV ve Lebenslauf Oluşturucu',
    cvSub: 'Türkiye Çalışma İzni ve Almanya Jobcenter standartlarına tam uyumlu CV (A1-C2 dil seviyeleri ve oturum durumu). Ücretsiz PDF çıktı.',
    demoGermany: 'Almanya Şablonu (Lebenslauf) 🇩🇪',
    demoTurkey: 'Türkiye Şablonu (Kimlik & İzin) 🇹🇷',
    styleLabel: 'Şablon Stili:',
    styleGerman: 'Resmi Alman Formatı (Lebenslauf)',
    styleModern: 'Modern Format',
    styleExecutive: 'Yönetici Formatı',
    printOrSavePdf: 'Yazdır veya Yüksek Çözünürlüklü PDF Kaydet',
    fullName: 'Ad Soyad',
    jobTitle: 'Hedeflenen Pozisyon',
    legalStatus: 'Yasal Durum ve Çalışma İzni (İşverenler İçin Önemli):',
    personalInfo: 'Kişisel Bilgiler ve İletişim',
    languagesTitle: 'Diller ve Seviyeler (A1-C2):',
    addLanguage: 'Dil Ekle',
    experiencesTitle: 'İş Deneyimi:',
    addExperience: 'Deneyim Ekle',
    educationTitle: 'Eğitim ve Sertifikalar:',
    skillsTitle: 'Yetenekler ve Beceriler:',
    monthlySearchesHeader: 'Ziyaretçi Getiren En Çok Aranan Kelimeler',
    calculatorTitle: 'Google Trafiğinden Aylık Tahmini AdSense Kazancı',
    dailyVisitors: 'Günlük Google Arama Ziyaretçisi:',
    monthlyRevenueEst: 'Aylık Tahmini Gelir:',
    yearlyRevenueEst: 'Yıllık Tahmini Gelir:',
    allRightsReserved: 'Tüm hakları saklıdır © ArabTools. 100% Ücretsiz.',
    instantChat: 'Anında WhatsApp Sohbeti',
    loginBtn: 'Giriş Yap / Kaydol',
    logoutBtn: 'Çıkış Yap',
    welcomeUser: 'Hoş geldiniz',
    loginTitle: 'ArabTools Giriş Paneli',
    loginSub: 'Belgelerinizi, imzalı sözleşmelerinizi ve CV şablonlarınızı ücretsiz kaydedin',
    continueWithGoogle: 'Google Hesabı ile Devam Et',
    orContinueWith: 'Veya E-posta ya da Telefon ile Giriş Yap',
    tabEmail: 'E-posta Adresi',
    tabPhone: 'Telefon Numarası',
    enterName: 'Ad Soyad',
    enterEmail: 'E-posta (örn: user@gmail.com)',
    enterPhone: 'Ülke kodlu telefon numarası (örn: 0535 972 66 67)',
    enterPassword: 'Şifre',
    createAccount: 'Yeni Hesap Oluştur',
    alreadyHaveAccount: 'Zaten hesabınız var mı? Giriş yapın',
    dontHaveAccount: 'Hesabınız yok mu? Ücretsiz kaydolun',
    loginSuccess: 'Giriş başarılı! Hoş geldiniz.',
    verifiedAccount: 'Doğrulanmış Üye Hesabı',
  },
};

