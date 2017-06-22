/* 
 * My approach to Typed.JS library
 * This JavaScript library type out all the given sentences, letter by letter.
 * It look like someone is typing some text on the website.
 * Author: Piotr Wróblewski
 * Date: 22.06.2017
 */
var MyTypedJS = {
    /*
     * 
     * @type type
     */
    strings: null,
    /*
     * 
     * @type Number
     */
    cursorSpeed: 1,
    textSpeed: null,
    initialDelay: null,
    selector: null,
    container: null,
    /*
     * 
     * @type Boolean
     */
    theEnd: false,
    cursorChild: null,
    textChild: null,
    
    /* This function will print all given sentences on the website
     * @selector {String} 
     * @params {Object} {strings: {Array of strings} Array of sentences, textSpeed {int} speed of text (1 - 10), initialDelay {int} initial delay, just before typing
     */
    typeText: function(selector, params) {
        this.selector = selector;
        this.container = document.querySelector(this.selector);
        this.strings = params.strings;
        this.textSpeed = params.textSpeed;
        this.initialDelay = params.initialDelay;
        if (this.textSpeed < 1 || this.textSpeed > 10) this.textSpeed = 5;
        
        this.textChild = document.createElement("span");
        this.container.appendChild(this.textChild);

        this.cursorChild = document.createElement("span");
        this.cursorChild.appendChild(document.createTextNode("|"));  
        this.container.appendChild(this.cursorChild);
        this.cursorChild.className = 'typed-cursor';
        
        var n = 0;
        var m = 0;
        var skipped = 0;
        var skip = false;
        var x = 0;
        var self = this;
        
        setTimeout(function() {
            var interval = setInterval(function() {
                x++;
                if (x + self.textSpeed > Math.floor(Math.random() * 5) + 7) {
                    x = 0;
                    if (skip) skipped++;
                    if (skipped > 4) {
                        skip = false;
                        self.textChild.innerHTML += '<br>';
                        skipped = 0;
                    }
                    if (!self.theEnd && !skip) {
                        if (self.strings[n][m] === ' ') {
                            x -= 10;
                        }
                        self.textChild.innerHTML += self.strings[n][m];
                        m++;
                        if (n >= self.strings.length-1 && m >= self.strings[n].length) {
                            this.theEnd = true;
                            //console.log('THE END');
                            clearInterval(interval);
                        }
                        if (m >= self.strings[n].length && !self.theEnd) {
                            m = 0;
                            skip = true;
                            n++;
                        }
                    }
                }
            }, 25);
        }
        , this.initialDelay);
    }
};
