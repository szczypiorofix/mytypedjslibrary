/* 
 * Author: Piotr Wróblewski
 * Date: 22.06.2017
 * 
 */

function MyTypedJS (selector, params) {
    this.strings = params.strings;
    this.cursorSpeed = 1;
    this.textSpeed = params.speed;
    this.initialDelay = params.initialDelay;
    this.selector = selector;
    this.container = null;
    this.theEnd = false;
    this.cursorChild = null;
    this.textChild = null;
}


MyTypedJS.prototype.typeText = function() {
    var self = this;
    self.container = document.querySelector(this.selector);
    
    self.textChild = document.createElement("span");
    self.container.appendChild(self.textChild);
    
    self.cursorChild = document.createElement("span");
    var textnode = document.createTextNode("|");
    self.cursorChild.appendChild(textnode);  
    self.container.appendChild(self.cursorChild);
    self.cursorChild.className = 'typed-cursor';
     
    var n = 0;
    var m = 0;
    var skipped = 0;
    var skip = false;
    var x = 0;
    
    setTimeout(function() {
        setInterval(function() {
            
            x++;
            if (x > Math.floor(Math.random() * 5)) {
                x = 0;
                if (skip) skipped++;
                if (skipped > 3) {
                    skip = false;
                    self.textChild.innerHTML += '<br>';
                    skipped = 0;
                }

                if (!self.theEnd && !skip) {
                    self.textChild.innerHTML += self.strings[n][m];
                    m++;
                    if (n >= self.strings.length-1 && m >= self.strings[n].length) {
                        self.theEnd = true;
                        //self.textChild.innerHTML += '<br><p>THE END.</p>';
                        console.log('THE END');
                    }
                    if (m >= self.strings[n].length && !self.theEnd) {
                        m = 0;
                        skip = true;
                        n++;
                    }
                }
            }
        }, 50);
        
    }
    , self.initialDelay);
};
