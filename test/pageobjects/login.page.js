const Page = require('./page');

class LoginPage extends Page {
    get inputUsername () { return $('input[name="user-name"]') }
    get inputPassword () { return $('input[name="password"]') }
    get submitBtn () { return $('input[type="submit"]') }
    get errorMsg () { return $('.error-message-container h3') }

    open () {
        super.open('');
    }

    login (username, password) {
        this.inputUsername.setValue(username);  
        this.inputPassword.setValue(password);
        this.submit();
    }

    standardLogin () {
        this.open();
        const username = 'standard_user';
        const password = 'secret_sauce';
        this.inputUsername.setValue(username);  
        this.inputPassword.setValue(password);
        this.submit();
    }

    submit () {
        this.submitBtn.click();
    }

    inputValue (field, value) {
        this[field].setValue(value);
        browser.keys('Tab');
    }   
}

module.exports = new LoginPage();
