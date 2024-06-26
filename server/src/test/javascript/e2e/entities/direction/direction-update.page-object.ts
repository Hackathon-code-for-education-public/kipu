import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class DirectionUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.direction.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#direction-name'));

  universitySelect = element(by.css('select#direction-university'));
}
