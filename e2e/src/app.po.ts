import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo(page: string) {
    return browser.get(`${browser.baseUrl}/${page}`) as Promise<any>;
  }

  getTitleText() {
    return element(by.css("app-root .content span")).getText() as Promise<
      string
    >;
  }

  getStationsButton() {
    return element(by.css('[routerlink="/stations"]'));
  }

  getCardTitleText() {
    return element(by.css("mat-card-title")).getText();
  }
}
