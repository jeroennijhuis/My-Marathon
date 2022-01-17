import { Language } from './models/language';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly LANGUAGE = 'lang';

  public constructor(private translateService: TranslateService)
  {
  }

  public setup(): void {
    const defaultLang = this.languageToString(Language.English);
    this.translateService.setDefaultLang(defaultLang);

    const value = sessionStorage.getItem(this.LANGUAGE);
    this.translateService.use(value ?? defaultLang);
  }

  public switchLanguage(lang: Language): void{
    if(this.getCurrentLanguage() !== lang){
      const newLang = this.languageToString(lang);
      this.translateService.use(newLang);
      sessionStorage.setItem(this.LANGUAGE, newLang);
    }
  }

  public getCurrentLanguage(): Language {
    return this.stringToLanguage(this.translateService.currentLang);

  }

  private stringToLanguage(value: string): Language{
    switch (value) {
      case 'en':
        return Language.English;
      case 'nl':
        return Language.Dutch;
      default:
        return Language.Unknown;
    }
  }

  private languageToString(lang: Language): string{
    switch (lang) {
      case Language.English:
        return 'en';
      case Language.Dutch:
        return 'nl';
      default:
        return '';
    }
  }
}
