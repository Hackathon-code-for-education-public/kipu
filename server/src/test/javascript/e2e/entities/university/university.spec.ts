/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import UniversityComponentsPage, { UniversityDeleteDialog } from './university.page-object';
import UniversityUpdatePage from './university-update.page-object';
import UniversityDetailsPage from './university-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden,
} from '../../util/utils';

const expect = chai.expect;

describe('University e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: UniversityUpdatePage;
  let detailsPage: UniversityDetailsPage;
  let listPage: UniversityComponentsPage;
  let deleteDialog: UniversityDeleteDialog;
  let beforeRecordsCount = 0;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login(username, password);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Universities', async () => {
    await navBarPage.getEntityPage('university');
    listPage = new UniversityComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create University page', async () => {
      await listPage.createButton.click();
      updatePage = new UniversityUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/hackatonappApp.university.home.createOrEditLabel/);
    });

    it('should create and save Universities', async () => {
      await updatePage.nameInput.sendKeys('name');
      expect(await updatePage.nameInput.getAttribute('value')).to.match(/name/);

      await updatePage.desciptionInput.sendKeys('desciption');
      expect(await updatePage.desciptionInput.getAttribute('value')).to.match(/desciption/);

      await updatePage.addressInput.sendKeys('address');
      expect(await updatePage.addressInput.getAttribute('value')).to.match(/address/);

      await updatePage.phoneNumberInput.sendKeys('phoneNumber');
      expect(await updatePage.phoneNumberInput.getAttribute('value')).to.match(/phoneNumber/);

      await updatePage.emailInput.sendKeys('email');
      expect(await updatePage.emailInput.getAttribute('value')).to.match(/email/);

      await updatePage.siteInput.sendKeys('site');
      expect(await updatePage.siteInput.getAttribute('value')).to.match(/site/);

      await updatePage.phoneNumbersInput.sendKeys('phoneNumbers');
      expect(await updatePage.phoneNumbersInput.getAttribute('value')).to.match(/phoneNumbers/);

      await updatePage.emailsInput.sendKeys('emails');
      expect(await updatePage.emailsInput.getAttribute('value')).to.match(/emails/);

      await updatePage.scheduleInput.sendKeys('schedule');
      expect(await updatePage.scheduleInput.getAttribute('value')).to.match(/schedule/);

      await updatePage.responsiblePersonInput.sendKeys('responsiblePerson');
      expect(await updatePage.responsiblePersonInput.getAttribute('value')).to.match(/responsiblePerson/);

      // await selectLastOption(updatePage.idSelect);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });

    describe('Details, Update, Delete flow', () => {
      after(async () => {
        const deleteButton = listPage.getDeleteButton(listPage.records.last());
        await click(deleteButton);

        deleteDialog = new UniversityDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/hackatonappApp.university.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details University page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new UniversityDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit University page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.nameInput.clear();
        await updatePage.nameInput.sendKeys('modified');
        expect(await updatePage.nameInput.getAttribute('value')).to.match(/modified/);

        await updatePage.desciptionInput.clear();
        await updatePage.desciptionInput.sendKeys('modified');
        expect(await updatePage.desciptionInput.getAttribute('value')).to.match(/modified/);

        await updatePage.addressInput.clear();
        await updatePage.addressInput.sendKeys('modified');
        expect(await updatePage.addressInput.getAttribute('value')).to.match(/modified/);

        await updatePage.phoneNumberInput.clear();
        await updatePage.phoneNumberInput.sendKeys('modified');
        expect(await updatePage.phoneNumberInput.getAttribute('value')).to.match(/modified/);

        await updatePage.emailInput.clear();
        await updatePage.emailInput.sendKeys('modified');
        expect(await updatePage.emailInput.getAttribute('value')).to.match(/modified/);

        await updatePage.siteInput.clear();
        await updatePage.siteInput.sendKeys('modified');
        expect(await updatePage.siteInput.getAttribute('value')).to.match(/modified/);

        await updatePage.phoneNumbersInput.clear();
        await updatePage.phoneNumbersInput.sendKeys('modified');
        expect(await updatePage.phoneNumbersInput.getAttribute('value')).to.match(/modified/);

        await updatePage.emailsInput.clear();
        await updatePage.emailsInput.sendKeys('modified');
        expect(await updatePage.emailsInput.getAttribute('value')).to.match(/modified/);

        await updatePage.scheduleInput.clear();
        await updatePage.scheduleInput.sendKeys('modified');
        expect(await updatePage.scheduleInput.getAttribute('value')).to.match(/modified/);

        await updatePage.responsiblePersonInput.clear();
        await updatePage.responsiblePersonInput.sendKeys('modified');
        expect(await updatePage.responsiblePersonInput.getAttribute('value')).to.match(/modified/);

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
