import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class AlbumUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.album.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#album-name'));

  universitySelect = element(by.css('select#album-university'));
}
