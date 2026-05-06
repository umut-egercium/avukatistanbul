// Single source of truth for legal practice areas (hukuk dalları).
// Each category here drives:
//   - the home page hizmet grid
//   - /hizmetler list
//   - /hizmetler/:slug detail page (if a content file exists in src/content/)
//   - the customer request flow's "what kind of lawyer" step
//   - structured data (JSON-LD) for the LegalService schema

import type { LucideIcon } from "lucide-react";
import {
  HeartCrack,
  Scale,
  Briefcase,
  CarFront,
  Users,
  Building2,
  Building,
  FileWarning,
  ScrollText,
  ShoppingCart,
  Globe,
  Shield,
} from "lucide-react";

export interface LegalCategory {
  slug: string;
  /** Full name as used in headings and titles. */
  name: string;
  /** Compact label for nav, chips, breadcrumbs. */
  shortName: string;
  /** Primary high-volume search term we want to rank for. */
  searchTerm: string;
  /** One-line plain-language description for cards. */
  shortDescription: string;
  /** 2-3 sentences for the category landing hero. */
  longDescription: string;
  /** Lucide icon for the home grid + service pages. */
  icon: LucideIcon;
  /** Common case types within this area, used in the request flow. */
  caseTypes: string[];
  /** SEO meta description override (defaults to longDescription). */
  metaDescription?: string;
}

export const LEGAL_CATEGORIES: LegalCategory[] = [
  {
    slug: "bosanma-hukuku",
    name: "Boşanma Hukuku",
    shortName: "Boşanma",
    searchTerm: "boşanma avukatı istanbul",
    shortDescription:
      "Anlaşmalı ve çekişmeli boşanma, nafaka, velayet, mal paylaşımı.",
    longDescription:
      "İstanbul'da boşanma davası açmak ya da açılmış bir davada haklarınızı korumak için uzman boşanma avukatlarıyla çalışın. Anlaşmalı boşanmadan çekişmeli sürece, nafaka ve velayetten mal rejimine kadar her aşamada profesyonel destek.",
    icon: HeartCrack,
    caseTypes: [
      "Anlaşmalı boşanma",
      "Çekişmeli boşanma",
      "Nafaka davası",
      "Velayet davası",
      "Mal rejimi tasfiyesi",
      "Tanıma ve tenfiz",
    ],
  },
  {
    slug: "ceza-hukuku",
    name: "Ceza Hukuku",
    shortName: "Ceza",
    searchTerm: "ceza avukatı istanbul",
    shortDescription:
      "Soruşturma ve kovuşturma süreçlerinde sanık ve mağdur müdafiliği.",
    longDescription:
      "İstanbul'un her ilçesinde ağır ceza, asliye ceza ve sulh ceza mahkemelerinde deneyimli ceza avukatlarıyla iletişime geçin. İfade aşamasından infaza kadar her adımda haklarınızın korunması için uzman desteği alın.",
    icon: Scale,
    caseTypes: [
      "Hakaret ve tehdit",
      "Yaralama suçları",
      "Uyuşturucu suçları",
      "Cinsel suçlar",
      "Dolandırıcılık",
      "Hırsızlık",
      "Trafik kazasında ceza yargılaması",
    ],
  },
  {
    slug: "is-hukuku",
    name: "İş Hukuku",
    shortName: "İş",
    searchTerm: "iş avukatı istanbul",
    shortDescription:
      "İşçi-işveren uyuşmazlıkları, kıdem-ihbar tazminatı, işe iade davaları.",
    longDescription:
      "İşten haksız çıkarılma, ödenmeyen ücret ve fazla mesai, kıdem ve ihbar tazminatı, mobbing ve işe iade davalarında İstanbul Barosu'na kayıtlı uzman iş hukuku avukatlarıyla görüşün.",
    icon: Briefcase,
    caseTypes: [
      "Kıdem ve ihbar tazminatı",
      "Fazla mesai alacağı",
      "İşe iade davası",
      "Mobbing davası",
      "İş kazası tazminatı",
      "İşveren tarafında savunma",
    ],
  },
  {
    slug: "tazminat-hukuku",
    name: "Trafik & Tazminat Hukuku",
    shortName: "Tazminat",
    searchTerm: "tazminat avukatı istanbul",
    shortDescription:
      "Trafik kazası, iş kazası, malpraktis ve haksız fiil tazminatları.",
    longDescription:
      "Trafik kazası, iş kazası, doktor hatası (malpraktis) ve diğer haksız fiil olaylarında maddi-manevi tazminat taleplerinizi takip edecek İstanbul avukatları ile tanışın. Sigorta şirketi ile müzakereden mahkeme aşamasına kadar tam destek.",
    icon: CarFront,
    caseTypes: [
      "Trafik kazası tazminatı",
      "İş kazası tazminatı",
      "Malpraktis (doktor hatası) davası",
      "Maddi tazminat",
      "Manevi tazminat",
      "Destekten yoksun kalma",
    ],
  },
  {
    slug: "miras-hukuku",
    name: "Miras Hukuku",
    shortName: "Miras",
    searchTerm: "miras avukatı istanbul",
    shortDescription:
      "Veraset, vasiyet, tenkis, mirasın paylaşımı ve mirastan mal kaçırma.",
    longDescription:
      "Veraset ilamı, mirasın reddi, vasiyetname iptali, tenkis ve muris muvazaası davalarında uzman miras avukatlarıyla çalışın. Birden fazla mirasçının ortak olduğu taşınmazların paylaşımı ve mahkeme süreçleri.",
    icon: ScrollText,
    caseTypes: [
      "Veraset ilamı çıkarma",
      "Mirasın reddi",
      "Vasiyetname iptali",
      "Tenkis davası",
      "Muris muvazaası (mirastan mal kaçırma)",
      "Ortaklığın giderilmesi",
    ],
  },
  {
    slug: "gayrimenkul-kira-hukuku",
    name: "Gayrimenkul & Kira Hukuku",
    shortName: "Gayrimenkul",
    searchTerm: "gayrimenkul avukatı istanbul",
    shortDescription: "Tapu, kira, kentsel dönüşüm, ortaklık ve kat mülkiyeti.",
    longDescription:
      "Tapu iptal ve tescil, kira tespit ve uyarlama, kira artış uyuşmazlıkları, tahliye davaları, kentsel dönüşüm ve kat mülkiyeti uyuşmazlıklarında deneyimli İstanbul avukatları.",
    icon: Building2,
    caseTypes: [
      "Tahliye davası",
      "Kira tespit / kira uyarlama davası",
      "Tapu iptal ve tescil",
      "Kat mülkiyeti uyuşmazlıkları",
      "Kentsel dönüşüm anlaşmazlıkları",
      "İmar ve kamulaştırma",
    ],
  },
  {
    slug: "ticaret-hukuku",
    name: "Ticaret Hukuku",
    shortName: "Ticaret",
    searchTerm: "ticaret avukatı istanbul",
    shortDescription:
      "Şirket kuruluşu, ortaklık uyuşmazlıkları, ticari sözleşmeler.",
    longDescription:
      "Anonim ve limited şirket kuruluşu, pay devri, ortaklıktan çıkma-çıkarılma, genel kurul kararlarının iptali, ticari sözleşmeler ve marka koruma süreçlerinde uzman ticaret hukuku avukatları.",
    icon: Building,
    caseTypes: [
      "Şirket kuruluşu",
      "Ortaklıktan çıkma / çıkarılma",
      "Genel kurul kararı iptali",
      "Ticari sözleşme uyuşmazlığı",
      "Marka tescili / haksız rekabet",
      "Konkordato",
    ],
  },
  {
    slug: "icra-iflas-hukuku",
    name: "İcra & İflas Hukuku",
    shortName: "İcra",
    searchTerm: "icra avukatı istanbul",
    shortDescription:
      "Alacak takibi, itirazın kaldırılması, haciz, iflas ve konkordato.",
    longDescription:
      "Alacaklı ve borçlu vekilliği; ilamlı-ilamsız icra takibi, itirazın iptali ve kaldırılması, ihtiyati haciz ve iflas davalarında İstanbul'da uzmanlaşmış icra avukatlarıyla çalışın.",
    icon: FileWarning,
    caseTypes: [
      "İlamsız icra takibi",
      "İlamlı icra takibi",
      "İtirazın iptali / kaldırılması",
      "İhtiyati haciz",
      "Menfi tespit",
      "İflas / konkordato",
    ],
  },
  {
    slug: "aile-hukuku",
    name: "Aile Hukuku",
    shortName: "Aile",
    searchTerm: "aile hukuku avukatı istanbul",
    shortDescription:
      "Velayet, evlat edinme, vesayet, soybağı ve aile içi koruma kararları.",
    longDescription:
      "Boşanma sonrası velayet değişikliği, kişisel ilişki tesisi, evlat edinme, vesayet ve aile içi şiddete karşı 6284 sayılı kanun kapsamındaki koruma kararlarında uzman aile hukuku avukatları.",
    icon: Users,
    caseTypes: [
      "Velayet davası",
      "Kişisel ilişki tesisi",
      "6284 koruma kararı",
      "Evlat edinme",
      "Vesayet",
      "Soybağı (babalık) davası",
    ],
  },
  {
    slug: "tuketici-hukuku",
    name: "Tüketici Hukuku",
    shortName: "Tüketici",
    searchTerm: "tüketici avukatı istanbul",
    shortDescription:
      "Ayıplı mal, ayıplı hizmet, mesafeli sözleşme ve banka uyuşmazlıkları.",
    longDescription:
      "Ayıplı araç, ayıplı konut, banka kredi sözleşmeleri, kredi kartı ücretleri, abonelik sözleşmeleri ve mesafeli satışlardan doğan uyuşmazlıklarda Tüketici Hakem Heyeti ve Tüketici Mahkemesi davaları.",
    icon: ShoppingCart,
    caseTypes: [
      "Ayıplı araç davası",
      "Ayıplı konut davası",
      "Banka / kredi kartı ücretleri",
      "Mesafeli satış sözleşmeleri",
      "Tüketici hakem heyeti başvurusu",
      "Garanti süresi uyuşmazlıkları",
    ],
  },
  {
    slug: "yabancilar-hukuku",
    name: "Yabancılar & Vatandaşlık Hukuku",
    shortName: "Yabancılar",
    searchTerm: "yabancılar avukatı istanbul",
    shortDescription:
      "Oturma izni, çalışma izni, vatandaşlık, sınır dışı ve uluslararası koruma.",
    longDescription:
      "İstanbul'da yaşayan yabancılar için oturma ve çalışma izni başvuruları, Türk vatandaşlığı kazanma, sınır dışı kararlarına itiraz, idari gözetim ve uluslararası koruma davalarında uzman avukatlar.",
    icon: Globe,
    caseTypes: [
      "Oturma izni başvurusu / iptali",
      "Çalışma izni",
      "Türk vatandaşlığı (5901 SK)",
      "Sınır dışı kararına itiraz",
      "Uluslararası koruma",
      "İdari gözetim itirazı",
    ],
  },
  {
    slug: "kvkk-bilisim-hukuku",
    name: "KVKK & Bilişim Hukuku",
    shortName: "KVKK",
    searchTerm: "kvkk avukatı istanbul",
    shortDescription:
      "Kişisel veri ihlalleri, bilişim suçları, e-ticaret ve siber güvenlik.",
    longDescription:
      "KVKK uyum süreçleri, veri ihlali bildirimleri ve idari para cezalarına itiraz; sosyal medya hakaret, kimlik avı, dolandırıcılık ve diğer bilişim suçlarında uzman avukatlar.",
    icon: Shield,
    caseTypes: [
      "KVKK uyum projesi",
      "Veri ihlali bildirimi / KVKK Kurulu süreci",
      "Sosyal medya hakaret / içerik kaldırma (URL kapatma)",
      "Bilişim sistemleri dolandırıcılığı",
      "E-ticaret uyuşmazlıkları",
      "Banka hesabına dolandırıcılık ile giriş",
    ],
  },
];

export function findCategory(slug: string): LegalCategory | undefined {
  return LEGAL_CATEGORIES.find((c) => c.slug === slug);
}
