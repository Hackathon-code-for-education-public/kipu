import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class UserToUniversityUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.userToUniversity.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  scienceDegreeSelect = element(by.css('select#user-to-university-scienceDegree'));
}
