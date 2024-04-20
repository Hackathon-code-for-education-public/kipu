import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.product.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-name'));

  priceInput: ElementFinder = element(by.css('input#product-price'));

  descriptionInput: ElementFinder = element(by.css('input#product-description'));

  universitySelect = element(by.css('select#product-university'));
}
