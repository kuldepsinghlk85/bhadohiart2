export interface HeaderTheme {
  id: string;
  name: string;
  subtitle: string;
  previewColors: [string, string, string]; // [topbar, header, accent]
  topbarBg: string;
  topbarText: string;
  topbarBorder: string;
  headerBg: string;
  headerBorder: string;
  navText: string;
  navHoverText: string;
  activeIndicator: string;
  dropdownBg: string;
  dropdownBorder: string;
  dropdownText: string;
  dropdownHoverBg: string;
  dropdownHoverText: string;
  iconColor: string;
  iconHoverColor: string;
  badgeBg: string;
  badgeText: string;
  quoteBtnClasses: string;
  mobileMenuBg: string;
}

export const HEADER_THEMES: Record<string, HeaderTheme> = {
  'classic-ivory': {
    id: 'classic-ivory',
    name: 'Classic Warm Ivory',
    subtitle: 'Signature artisanal linen look with rich burgundy accents (Default)',
    previewColors: ['#1F1916', '#FAF7F0', '#990E14'],
    topbarBg: 'bg-[#1F1916]',
    topbarText: 'text-[#FAF7F0]',
    topbarBorder: 'border-white/10',
    headerBg: 'bg-[#FAF7F0]',
    headerBorder: 'border-[#E8E1D5]',
    navText: 'text-[#1F1916]',
    navHoverText: 'hover:text-[#990E14]',
    activeIndicator: 'bg-[#990E14]',
    dropdownBg: 'bg-white',
    dropdownBorder: 'border-[#E8E1D5]',
    dropdownText: 'text-[#1F1916]',
    dropdownHoverBg: 'hover:bg-[#FAF7F0]',
    dropdownHoverText: 'hover:text-[#990E14]',
    iconColor: 'text-[#1F1916]',
    iconHoverColor: 'hover:text-[#990E14]',
    badgeBg: 'bg-[#990E14]',
    badgeText: 'text-white',
    quoteBtnClasses: 'bg-[#990E14] hover:bg-[#800A0F] text-white shadow-xs',
    mobileMenuBg: 'bg-[#FAF7F0]'
  },

  'royal-burgundy': {
    id: 'royal-burgundy',
    name: 'Royal Burgundy & Gold',
    subtitle: 'Imperial palace luxury with deep wine canvas and radiant gold accents',
    previewColors: ['#280811', '#4A1525', '#DE8B22'],
    topbarBg: 'bg-[#280811]',
    topbarText: 'text-[#F3E5D8]',
    topbarBorder: 'border-[#DE8B22]/20',
    headerBg: 'bg-[#4A1525]',
    headerBorder: 'border-[#DE8B22]/30',
    navText: 'text-[#FAF7F0]',
    navHoverText: 'hover:text-[#DE8B22]',
    activeIndicator: 'bg-[#DE8B22]',
    dropdownBg: 'bg-[#3A101D]',
    dropdownBorder: 'border-[#DE8B22]/20',
    dropdownText: 'text-[#FAF7F0]',
    dropdownHoverBg: 'hover:bg-[#280811]',
    dropdownHoverText: 'hover:text-[#DE8B22]',
    iconColor: 'text-[#FAF7F0]',
    iconHoverColor: 'hover:text-[#DE8B22]',
    badgeBg: 'bg-[#DE8B22]',
    badgeText: 'text-[#1F1916]',
    quoteBtnClasses: 'bg-[#DE8B22] hover:bg-[#c97b1a] text-[#1A0E05] font-semibold shadow-md',
    mobileMenuBg: 'bg-[#3A101D]'
  },

  'imperial-dark': {
    id: 'imperial-dark',
    name: 'Imperial Midnight & Amber',
    subtitle: 'High-contrast nocturnal sophistication with shimmering amber touches',
    previewColors: ['#0A0A0C', '#141418', '#E5A93C'],
    topbarBg: 'bg-[#0A0A0C]',
    topbarText: 'text-stone-300',
    topbarBorder: 'border-white/10',
    headerBg: 'bg-[#141418]',
    headerBorder: 'border-white/10',
    navText: 'text-[#FAF7F0]',
    navHoverText: 'hover:text-[#E5A93C]',
    activeIndicator: 'bg-[#E5A93C]',
    dropdownBg: 'bg-[#1C1C22]',
    dropdownBorder: 'border-white/10',
    dropdownText: 'text-[#FAF7F0]',
    dropdownHoverBg: 'hover:bg-[#25252D]',
    dropdownHoverText: 'hover:text-[#E5A93C]',
    iconColor: 'text-[#FAF7F0]',
    iconHoverColor: 'hover:text-[#E5A93C]',
    badgeBg: 'bg-[#E5A93C]',
    badgeText: 'text-black',
    quoteBtnClasses: 'bg-[#E5A93C] hover:bg-[#d4962b] text-black font-semibold shadow-md',
    mobileMenuBg: 'bg-[#141418]'
  },

  'minimal-white': {
    id: 'minimal-white',
    name: 'Minimalist Crisp White',
    subtitle: 'Ultra-modern Scandinavian museum clarity with crisp clean lines',
    previewColors: ['#F5F5F7', '#FFFFFF', '#990E14'],
    topbarBg: 'bg-[#F5F5F7]',
    topbarText: 'text-neutral-700',
    topbarBorder: 'border-neutral-200',
    headerBg: 'bg-white',
    headerBorder: 'border-neutral-200 shadow-2xs',
    navText: 'text-neutral-900',
    navHoverText: 'hover:text-[#990E14]',
    activeIndicator: 'bg-[#990E14]',
    dropdownBg: 'bg-white',
    dropdownBorder: 'border-neutral-200 shadow-xl',
    dropdownText: 'text-neutral-800',
    dropdownHoverBg: 'hover:bg-neutral-50',
    dropdownHoverText: 'hover:text-[#990E14]',
    iconColor: 'text-neutral-800',
    iconHoverColor: 'hover:text-[#990E14]',
    badgeBg: 'bg-[#990E14]',
    badgeText: 'text-white',
    quoteBtnClasses: 'bg-neutral-900 hover:bg-[#990E14] text-white shadow-xs',
    mobileMenuBg: 'bg-white'
  },

  'emerald-luxe': {
    id: 'emerald-luxe',
    name: 'Artisan Emerald & Gold',
    subtitle: 'Regal jewel-tone emerald green reflecting heritage royal courts',
    previewColors: ['#0A1D17', '#123329', '#E5B869'],
    topbarBg: 'bg-[#0A1D17]',
    topbarText: 'text-[#E8F3EE]',
    topbarBorder: 'border-[#E5B869]/20',
    headerBg: 'bg-[#123329]',
    headerBorder: 'border-[#E5B869]/25',
    navText: 'text-[#FAF7F0]',
    navHoverText: 'hover:text-[#E5B869]',
    activeIndicator: 'bg-[#E5B869]',
    dropdownBg: 'bg-[#0E2820]',
    dropdownBorder: 'border-[#E5B869]/20',
    dropdownText: 'text-[#FAF7F0]',
    dropdownHoverBg: 'hover:bg-[#0A1D17]',
    dropdownHoverText: 'hover:text-[#E5B869]',
    iconColor: 'text-[#FAF7F0]',
    iconHoverColor: 'hover:text-[#E5B869]',
    badgeBg: 'bg-[#E5B869]',
    badgeText: 'text-[#0A1D17]',
    quoteBtnClasses: 'bg-[#E5B869] hover:bg-[#d6a54f] text-[#0A1D17] font-semibold shadow-md',
    mobileMenuBg: 'bg-[#123329]'
  }
};

export const DEFAULT_HEADER_THEME = 'classic-ivory';
