import { browser, element, by, ExpectedConditions as ec } from 'protractor';

import { NavBarPage, SignInPage } from '../page-objects/jhi-page-objects';

describe('account', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage(true);
    });

    it('should fail to login with bad password', async () => {
        const expect1 = /Welcome, Java Hipster!/;
        const value1 = await element(by.css('h1')).getText();
        expect(value1).toMatch(expect1);
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'foo');

        // Keycloak
        const alert = element(by.css('.alert-error'));
        if (await alert.isPresent()) {
            expect(await alert.getText()).toMatch('Invalid username or password.');
        } else {
            // Okta
            const error = element(by.css('.infobox-error'));
            expect(await error.getText()).toMatch('Sign in failed!');
        }
    });

    it('should login successfully with admin account', async () => {
        await signInPage.loginWithOAuth('', 'admin');

        const expect2 = /You are logged in as user "admin"/;
        const value2 = element(by.id('home-logged-message'));
        await browser.wait(ec.visibilityOf(value2), 5000);
        expect(await value2.getText()).toMatch(expect2);

        await navBarPage.autoSignOut();
    });
});
