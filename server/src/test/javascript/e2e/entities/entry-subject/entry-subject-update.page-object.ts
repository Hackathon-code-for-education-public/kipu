import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class EntrySubjectUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.entrySubject.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#entry-subject-name'));

  minimumScoreInput: ElementFinder = element(by.css('input#entry-subject-minimumScore'));

  examDateInput: ElementFinder = element(by.css('input#entry-subject-examDate'));

  directionSelect = element(by.css('select#entry-subject-direction'));
}
