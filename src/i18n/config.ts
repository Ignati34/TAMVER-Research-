export const languages = {
  en: { name: 'English', nativeName: 'English', htmlLang: 'en' },
  ru: { name: 'Russian', nativeName: 'Русский', htmlLang: 'ru' },
  es: { name: 'Spanish', nativeName: 'Español', htmlLang: 'es' },
  ca: { name: 'Catalan', nativeName: 'Català', htmlLang: 'ca' },
  fr: { name: 'French', nativeName: 'Français', htmlLang: 'fr' },
  de: { name: 'German', nativeName: 'Deutsch', htmlLang: 'de' },
  it: { name: 'Italian', nativeName: 'Italiano', htmlLang: 'it' },
  pt: { name: 'Portuguese', nativeName: 'Português', htmlLang: 'pt' },
} as const;
export type Lang = keyof typeof languages;
export const supportedLangs = Object.keys(languages) as Lang[];
export const localizedLangs = supportedLangs.filter((x): x is Exclude<Lang,'en'> => x !== 'en');
export function isLang(value:string|undefined): value is Lang { return !!value && value in languages; }
export function prefixFor(lang:Lang){ return lang === 'en' ? '' : `/${lang}`; }
export function localizePath(path:string, lang:Lang){
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${prefixFor(lang)}${clean}`.replace(/\/+/g,'/');
}
export function stripLocale(pathname:string){
  const parts=pathname.split('/').filter(Boolean);
  if(parts[0] && supportedLangs.includes(parts[0] as Lang) && parts[0] !== 'en') parts.shift();
  return '/' + parts.join('/') + (pathname.endsWith('/') || parts.length===0 ? '/' : '');
}
