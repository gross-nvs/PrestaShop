// Import utils
import testContext from '@utils/testContext';

// Import commonTests
import loginCommon from '@commonTests/BO/loginBO';

// Import pages
// Import BO pages
import customerServicePage from '@pages/BO/customerService/customerService';
// Import FO pages
import {contactUsPage} from '@pages/FO/classic/contactUs';
import {homePage} from '@pages/FO/classic/home';
import {myAccountPage} from '@pages/FO/classic/myAccount';
import {gdprPersonalDataPage} from '@pages/FO/classic/myAccount/gdprPersonalData';

import {
  boDashboardPage,
  dataCustomers,
  dataOrders,
  FakerContactMessage,
  foClassicLoginPage,
  utilsFile,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

import {expect} from 'chai';
import type {BrowserContext, Page} from 'playwright';

const baseContext: string = 'functional_FO_classic_userAccount_contactUsOnGDPRPage';

describe('FO - Account : Contact us on GDPR page', async () => {
  let browserContext: BrowserContext;
  let page: Page;

  const contactUsData: FakerContactMessage = new FakerContactMessage({
    firstName: dataCustomers.johnDoe.firstName,
    lastName: dataCustomers.johnDoe.lastName,
    subject: 'Customer service',
    emailAddress: dataCustomers.johnDoe.email,
    reference: dataOrders.order_1.reference,
  });

  // before and after functions
  before(async function () {
    browserContext = await utilsPlaywright.createBrowserContext(this.browser);
    page = await utilsPlaywright.newTab(browserContext);

    await utilsFile.createFile('.', `${contactUsData.fileName}.txt`, 'new filename');
  });

  after(async () => {
    await utilsPlaywright.closeBrowserContext(browserContext);

    await utilsFile.deleteFile(`${contactUsData.fileName}.txt`);
  });

  it('should go to FO home page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToFo', baseContext);

    await homePage.goToFo(page);

    const isHomePage = await homePage.isHomePage(page);
    expect(isHomePage).to.eq(true);
  });

  it('should go to login page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToLoginFoPage', baseContext);

    await homePage.goToLoginPage(page);

    const pageHeaderTitle = await foClassicLoginPage.getPageTitle(page);
    expect(pageHeaderTitle).to.equal(foClassicLoginPage.pageTitle);
  });

  it('should sign in FO', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'signInFo', baseContext);

    await foClassicLoginPage.customerLogin(page, dataCustomers.johnDoe);

    const isCustomerConnected = await myAccountPage.isCustomerConnected(page);
    expect(isCustomerConnected, 'Customer is not connected').to.eq(true);
  });

  it('should go to my account page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToMyAccountPage', baseContext);

    await homePage.goToMyAccountPage(page);

    const pageTitle = await myAccountPage.getPageTitle(page);
    expect(pageTitle).to.equal(myAccountPage.pageTitle);
  });

  it('should go to \'GDPR - Personal data\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToGDPRPage', baseContext);

    await myAccountPage.goToMyGDPRPersonalDataPage(page);

    const pageTitle = await gdprPersonalDataPage.getPageTitle(page);
    expect(pageTitle).to.equal(gdprPersonalDataPage.pageTitle);
  });

  it('should click on \'Contact page\' link from Rectification & Erasure requests block', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToContactUsPage', baseContext);

    await gdprPersonalDataPage.goToContactUsPage(page);

    const pageTitle = await contactUsPage.getPageTitle(page);
    expect(pageTitle).to.equal(contactUsPage.pageTitle);
  });

  it('should send message to customer service', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'sendMessage', baseContext);

    await contactUsPage.sendMessage(page, contactUsData, `${contactUsData.fileName}.txt`);

    const validationMessage = await contactUsPage.getAlertSuccess(page);
    expect(validationMessage).to.equal(contactUsPage.validationMessage);
  });

  it('should login in BO', async function () {
    await loginCommon.loginBO(this, page);
  });

  it('should go to customer service page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToOrderMessagesPage', baseContext);

    await boDashboardPage.goToSubMenu(
      page,
      boDashboardPage.customerServiceParentLink,
      boDashboardPage.customerServiceLink,
    );

    const pageTitle = await customerServicePage.getPageTitle(page);
    expect(pageTitle).to.contains(customerServicePage.pageTitle);
  });

  it('should check message', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'checkMessage', baseContext);

    const message = await customerServicePage.getTextColumn(page, 1, 'message');
    expect(message).to.contain(contactUsData.message);
  });

  it('should delete the message', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'deleteMessage', baseContext);

    const textResult = await customerServicePage.deleteMessage(page, 1);
    expect(textResult).to.contains(customerServicePage.successfulDeleteMessage);
  });
});
