// Istanbul's 39 districts, grouped by side, sorted by population.
// Used for the directory drilldown and SEO footer link grid.

export type IstanbulSide = "avrupa" | "anadolu";

export interface IstanbulDistrict {
  slug: string;
  name: string;
  side: IstanbulSide;
  population: number;
}

export const ISTANBUL_DISTRICTS: IstanbulDistrict[] = [
  { slug: "esenyurt", name: "Esenyurt", side: "avrupa", population: 977_613 },
  { slug: "kucukcekmece", name: "Küçükçekmece", side: "avrupa", population: 781_166 },
  { slug: "umraniye", name: "Ümraniye", side: "anadolu", population: 707_687 },
  { slug: "bagcilar", name: "Bağcılar", side: "avrupa", population: 723_122 },
  { slug: "pendik", name: "Pendik", side: "anadolu", population: 711_894 },
  { slug: "uskudar", name: "Üsküdar", side: "anadolu", population: 521_392 },
  { slug: "bahcelievler", name: "Bahçelievler", side: "avrupa", population: 591_654 },
  { slug: "sultangazi", name: "Sultangazi", side: "avrupa", population: 537_668 },
  { slug: "esenler", name: "Esenler", side: "avrupa", population: 449_286 },
  { slug: "kadikoy", name: "Kadıköy", side: "anadolu", population: 467_919 },
  { slug: "maltepe", name: "Maltepe", side: "anadolu", population: 521_513 },
  { slug: "sariyer", name: "Sarıyer", side: "avrupa", population: 350_437 },
  { slug: "kartal", name: "Kartal", side: "anadolu", population: 478_092 },
  { slug: "atasehir", name: "Ataşehir", side: "anadolu", population: 425_094 },
  { slug: "fatih", name: "Fatih", side: "avrupa", population: 386_727 },
  { slug: "avcilar", name: "Avcılar", side: "avrupa", population: 444_233 },
  { slug: "sancaktepe", name: "Sancaktepe", side: "anadolu", population: 480_298 },
  { slug: "tuzla", name: "Tuzla", side: "anadolu", population: 286_337 },
  { slug: "gaziosmanpasa", name: "Gaziosmanpaşa", side: "avrupa", population: 463_177 },
  { slug: "basaksehir", name: "Başakşehir", side: "avrupa", population: 506_603 },
  { slug: "beylikduzu", name: "Beylikdüzü", side: "avrupa", population: 396_649 },
  { slug: "sile", name: "Şile", side: "anadolu", population: 41_645 },
  { slug: "catalca", name: "Çatalca", side: "avrupa", population: 80_650 },
  { slug: "silivri", name: "Silivri", side: "avrupa", population: 217_734 },
  { slug: "buyukcekmece", name: "Büyükçekmece", side: "avrupa", population: 261_039 },
  { slug: "arnavutkoy", name: "Arnavutköy", side: "avrupa", population: 314_799 },
  { slug: "beykoz", name: "Beykoz", side: "anadolu", population: 251_281 },
  { slug: "cekmekoy", name: "Çekmeköy", side: "anadolu", population: 296_686 },
  { slug: "sisli", name: "Şişli", side: "avrupa", population: 263_074 },
  { slug: "beyoglu", name: "Beyoğlu", side: "avrupa", population: 226_396 },
  { slug: "besiktas", name: "Beşiktaş", side: "avrupa", population: 175_190 },
  { slug: "eyupsultan", name: "Eyüpsultan", side: "avrupa", population: 425_976 },
  { slug: "zeytinburnu", name: "Zeytinburnu", side: "avrupa", population: 287_289 },
  { slug: "bayrampasa", name: "Bayrampaşa", side: "avrupa", population: 269_677 },
  { slug: "kagithane", name: "Kağıthane", side: "avrupa", population: 432_665 },
  { slug: "bakirkoy", name: "Bakırköy", side: "avrupa", population: 226_421 },
  { slug: "gungoren", name: "Güngören", side: "avrupa", population: 287_481 },
  { slug: "adalar", name: "Adalar", side: "anadolu", population: 16_119 },
];

/** District slugs ranked by population — useful for "popular districts" UI. */
export const TOP_DISTRICTS = [...ISTANBUL_DISTRICTS]
  .sort((a, b) => b.population - a.population)
  .slice(0, 12);

export function findDistrict(slug: string): IstanbulDistrict | undefined {
  return ISTANBUL_DISTRICTS.find((d) => d.slug === slug);
}
