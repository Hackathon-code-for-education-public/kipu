import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ImageUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.image.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  imageURLInput: ElementFinder = element(by.css('input#image-imageURL'));

  dateInput: ElementFinder = element(by.css('input#image-date'));

  commentSelect = element(by.css('select#image-comment'));

  universitySelect = element(by.css('select#image-university'));

  productSelect = element(by.css('select#image-product'));
}
