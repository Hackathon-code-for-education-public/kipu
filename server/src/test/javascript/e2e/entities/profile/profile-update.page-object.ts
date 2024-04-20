import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProfileUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.profile.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  fullNameInput: ElementFinder = element(by.css('input#profile-fullName'));

  phoneNumberInput: ElementFinder = element(by.css('input#profile-phoneNumber'));

  descriptionInput: ElementFinder = element(by.css('input#profile-description'));

  ratingInput: ElementFinder = element(by.css('input#profile-rating'));

  userIdSelect = element(by.css('select#profile-userId'));

  avatarSelect = element(by.css('select#profile-avatar'));
}
