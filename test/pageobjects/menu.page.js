const Page = require('./page');

class MenuPage extends Page {
    get menuBtn () { return $('#react-burger-menu-btn') }
    get closeBtn () { return $('#react-burger-cross-btn') }
    
    get allItemsBtn () { return $('#inventory_sidebar_link') }
    get aboutBtn () { return $('#about_sidebar_link') }
    get logoutBtn () { return $('#logout_sidebar_link') }
    get resetAppBtn () { return $('#reset_sidebar_link') }
    
    openMenu () {
        this.menuBtn.click();
    }

    closeMenu () {
        this.closeBtn.click();
    }

    goToItems () {
        this.allItemsBtn.click();
    }

    goToAbout () {
        this.aboutBtn.click();
    }

    logout () {
        this.logoutBtn.click();
    }

    resetApp () {
        this.resetAppBtn.click();
    }
}

module.exports = new MenuPage();
