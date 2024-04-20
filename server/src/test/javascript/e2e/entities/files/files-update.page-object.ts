import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class FilesUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.files.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  urlInput: ElementFinder = element(by.css('input#files-url'));

  typeSelect = element(by.css('select#files-type'));

  descriptionInput: ElementFinder = element(by.css('input#files-description'));

  universitySelect = element(by.css('select#files-university'));

  profileSelect = element(by.css('select#files-profile'));
}
