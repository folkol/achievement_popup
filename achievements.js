var Achievements = (function() {
    var container = null;

    var init = function(el) {
        container = $(el);
        container.addEvents({
            mouseenter: cancelFadeouts,
            mouseleave: beginFadeouts
        });
    }
    var cancelFadeouts = function (event) {
        $$('div.achievement_container > div').each(function(el) {
            el.get('tween').cancel().set('opacity', 1);
        });
    }
    var beginFadeouts = function (event) {
        $$('div.achievement_container > div').each(function(el) {
            fadeoutAndDestroy(el);
        });
    }
    var fadeoutAndDestroy = function(el) {
        el.get('tween').removeEvents();
        var opts =  {
            link: 'chain',
            property: 'opacity',
            duration: 3000,
            onChainComplete: function() {
                el.destroy();
            }
        };
        el.get('tween').setOptions(opts).start(1).start(0);
    }
    var show = function (text) {
        var el = new Element('div', { styles: {opacity: 0}});
        var top = new Element('div', { text: 'Achievement earned!' }).inject(el);
        var bottom = new Element('div', {'text': text}).inject(el);
        el.inject(container);

        var opts = {
            duration: 500,
            onComplete: function() {
                fadeoutAndDestroy(el);
            }
        };
        el.set('tween', opts).fade('in');
    }

    return {
        init: init,
        show: show
    };
})();
