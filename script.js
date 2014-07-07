var Achievements = (function() {
    var popups = [];
    var container = null;
    var timeouts = [];

    var register = function(element) {
        container = $(element);
        container.addEvents({ mouseenter: clearTimeouts,
                              mouseleave: setTimeouts });
    }
    var clearTimeouts = function (event) {
        timeouts.forEach(function (e) {
            clearTimeout(e);
        });
        timeouts = [];
        $$('div.achievement_container div').each(function(el) {
            el.set('tween', { link: 'cancel' });
            el.setStyle('opacity', '1.0');
        });
    }
    var setTimeouts = function (event) {
        $$('div.achievement_container div').each(function(el) {
            var opts = {
                duration: 3000,
                onComplete: function() {
                    el.destroy();
                }
            };
            var setTimer = function() {
                el.set('tween', opts).fade('out');
            }
            timeouts.push(setTimer.delay(5000));
        });
    }
    var addPopup = function (achievement) {
        var el = new Element('div');
        var top = new Element('div', { text: 'Achievement earned!' }).inject(el);
        var bottom = new Element('div', {'text': achievement}).inject(el);
        el.inject(container);
        setTimeouts();
    }

    return {
        init: register,
        show: addPopup
    };
})();

window.addEvent('domready', function () {
    Achievements.init(document.id('achievements'));
    Achievements.show('You did it!');
    Achievements.show('Oups, I did it again...');
    Achievements.show('Oups, I did it again... \
                      And again and again and again \
                      and again and again and again \
                      and again and again and again \
                      and again and again and again \
                      and agains and again');

    $$('li').addEvent('click', function(event) {
        event.stop();
        this.highlight();
        Achievements.show(this.get('text'));
   });
});
