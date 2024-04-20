import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class UniversityUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.university.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#university-name'));

  desciptionInput: ElementFinder = element(by.css('input#university-desciption'));

  addressInput: ElementFinder = element(by.css('input#university-address'));

  phoneNumberInput: ElementFinder = element(by.css('input#university-phoneNumber'));

  emailInput: ElementFinder = element(by.css('input#university-email'));

  siteInput: ElementFinder = element(by.css('input#university-site'));

  phoneNumbersInput: ElementFinder = element(by.css('input#university-phoneNumbers'));

  emailsInput: ElementFinder = element(by.css('input#university-emails'));

  scheduleInput: ElementFinder = element(by.css('input#university-schedule'));

  responsiblePersonInput: ElementFinder = element(by.css('input#university-responsiblePerson'));

  idSelect = element(by.css('select#university-id'));
}
