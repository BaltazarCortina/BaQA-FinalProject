const Page = require('./page');

class FooterPage extends Page {
    get twitterBtn () { return $('a=Twitter') }
    get facebookBtn () { return $('a=Facebook') }
    get linkedinBtn () { return $('a=LinkedIn') }
    
    openTwitter () {
        this.twitterBtn.click();
    }

    openFacebook () {
        this.facebookBtn.click();
    }

    openLinkedin () {
        this.linkedinBtn.click();
    }
}

module.exports = new FooterPage();