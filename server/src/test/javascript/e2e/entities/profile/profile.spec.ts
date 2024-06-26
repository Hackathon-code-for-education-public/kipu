/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProfileComponentsPage, { ProfileDeleteDialog } from './profile.page-object';
import ProfileUpdatePage from './profile-update.page-object';
import ProfileDetailsPage from './profile-details.page-object';

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

describe('Profile e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: ProfileUpdatePage;
  let detailsPage: ProfileDetailsPage;
  let listPage: ProfileComponentsPage;
  let deleteDialog: ProfileDeleteDialog;
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

  it('should load Profiles', async () => {
    await navBarPage.getEntityPage('profile');
    listPage = new ProfileComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Profile page', async () => {
      await listPage.createButton.click();
      updatePage = new ProfileUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/hackatonappApp.profile.home.createOrEditLabel/);
    });

    it('should create and save Profiles', async () => {
      await updatePage.fullNameInput.sendKeys('fullName');
      expect(await updatePage.fullNameInput.getAttribute('value')).to.match(/fullName/);

      await updatePage.phoneNumberInput.sendKeys('phoneNumber');
      expect(await updatePage.phoneNumberInput.getAttribute('value')).to.match(/phoneNumber/);

      await updatePage.descriptionInput.sendKeys('description');
      expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/description/);

      await updatePage.ratingInput.sendKeys('5');
      expect(await updatePage.ratingInput.getAttribute('value')).to.eq('5');

      // await selectLastOption(updatePage.userIdSelect);
      // await selectLastOption(updatePage.avatarSelect);

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

        deleteDialog = new ProfileDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/hackatonappApp.profile.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Profile page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new ProfileDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Profile page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.fullNameInput.clear();
        await updatePage.fullNameInput.sendKeys('modified');
        expect(await updatePage.fullNameInput.getAttribute('value')).to.match(/modified/);

        await updatePage.phoneNumberInput.clear();
        await updatePage.phoneNumberInput.sendKeys('modified');
        expect(await updatePage.phoneNumberInput.getAttribute('value')).to.match(/modified/);

        await updatePage.descriptionInput.clear();
        await updatePage.descriptionInput.sendKeys('modified');
        expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/modified/);

        await clear(updatePage.ratingInput);
        await updatePage.ratingInput.sendKeys('6');
        expect(await updatePage.ratingInput.getAttribute('value')).to.eq('6');

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
