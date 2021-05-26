const LoginPage = require('../pageobjects/login.page');

describe('Testing Login section:', () => {
    describe ('Should allow access with correct credentials', () => {
        it ('standard user', () => {
            LoginPage.open();
            LoginPage.login('standard_user', 'secret_sauce');
        
            expect(browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');
        })

        it ('problem user', () => {
            LoginPage.open();
            LoginPage.login('problem_user', 'secret_sauce');
        
            expect(browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');
        })

        it ('performance glitch user', () => {
            LoginPage.open();
            LoginPage.login('performance_glitch_user', 'secret_sauce');
        
            expect(browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');
        })
    })
    
    describe ('Should deny access with wrong password', () => {
        it ('standard user', () => {
            LoginPage.open();
            LoginPage.login('standard_user', 'wrong_password');
        
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
        })
        
        it ('problem user', () => {
            LoginPage.open();
            LoginPage.login('problem_user', 'wrong_password');
        
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
        })

        it ('performance glitch user', () => {
            LoginPage.open();
            LoginPage.login('performance_glitch_user', 'wrong_password');
        
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
        })
    })


    it ('Should deny access when fields are left empty', () => {
        LoginPage.open();
        LoginPage.login('', '');
    
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username is required');
    })

    it ('Should deny access without username', () => {
        LoginPage.open();
        LoginPage.login('', 'secret_sauce');
    
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username is required');
    })

    describe ('Should deny access without password', () => {
        it ('standard user', () => {
            LoginPage.open();
            LoginPage.login('standard_user', '');
        
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Password is required');
        })
        
        it ('problem user', () => {
            LoginPage.open();
            LoginPage.login('problem_user', '');
        
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Password is required');
        })

        it ('performance glitch user', () => {
            LoginPage.open();
            LoginPage.login('performance_glitch_user', '');
        
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Password is required');
        })
    })


    it ('Should deny access to inexistent user', () => {
        LoginPage.open();
        LoginPage.login('different_user', 'secret_sauce');
    
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    it ('Should deny access to locked out user', () => {
        LoginPage.open();
        LoginPage.login('locked_out_user', 'secret_sauce');
    
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })
})