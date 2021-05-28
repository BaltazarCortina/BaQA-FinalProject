const Page = require('./page');

class MenuPage extends Page {
    get menuBtn () { return $('#react-burger-menu-btn') }
    get closeBtn () { return $('#react-burger-cross-btn') }
    get menuContainer () { return $('#menu_button_container .bm-menu-wrap') }
    
    get allItemsBtn () { return $('#inventory_sidebar_link') }
    get aboutBtn () { return $('#about_sidebar_link') }
    get logoutBtn () { return $('#logout_sidebar_link') }
    get resetAppBtn () { return $('#reset_sidebar_link') }
    
    openMenu () {
        this.menuBtn.click();
        browser.pause(500);
    }

    closeMenu () {
        this.closeBtn.click();
    }

    goToItems () {
        this.openMenu();
        this.allItemsBtn.click();
    }

    goToAbout () {
        this.openMenu();
        this.aboutBtn.click();
    }

    logout () {
        this.openMenu();
        this.logoutBtn.click();
    }

    resetApp () {
        this.openMenu();
        this.resetAppBtn.click();
    }
}

module.exports = new MenuPage();
