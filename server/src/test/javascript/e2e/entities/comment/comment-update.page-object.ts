import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class CommentUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('hackatonappApp.comment.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  contentInput: ElementFinder = element(by.css('input#comment-content'));

  rateInput: ElementFinder = element(by.css('input#comment-rate'));

  userSelect = element(by.css('select#comment-user'));

  universitySelect = element(by.css('select#comment-university'));
}
