import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class AdmissionUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.admission.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  universitySelect = element(by.css('select#admission-university'));

  directionSelect = element(by.css('select#admission-direction'));

  profileSelect = element(by.css('select#admission-profile'));
}
