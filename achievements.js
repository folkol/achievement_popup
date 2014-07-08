var Achievements = (function() {

    var container = null;

    var init = function(el) {
        container = document.id(el);
        container.addEvents({
            mouseenter: cancelFadeouts,
            mouseleave: beginFadeouts
        });
    }
    var cancelFadeouts = function(event) {
        container.getChildren().each(function(el) {
            el.get('tween').cancel().set('opacity', 1);
        });
    }
    var beginFadeouts = function(event) {
        container.getChildren().each(function(el) {
            fadeoutAndDestroy(el);
        });
    }
    var fadeoutAndDestroy = function(el) {
        el.get('tween').removeEvents();
        var opts = {
            link: 'chain',
            property: 'opacity',
            duration: 3000,
            onChainComplete: function() {
                el.destroy();
            }
        };
        el.get('tween').setOptions(opts).start(1).start(0);
    }
    var show = function(opts) {
        if(typeof opts === 'undefined') opts = {};
        var text = opts.text || 'Lorem Ipsum Dolor';
        var label = opts.label || 'Achievement earned!';
        var url = opts.url;

        var div = new Element('div', {styles:{opacity: 0}});
        new Element('div', {text: label}).inject(div);
        new Element('div', {text: text}).inject(div);
        if(typeof opts.url !== 'undefined') {
            div.addClass('clickable');
            div.addEvent('click', function() {
                window.location = url;
            });
        }
        div.inject(container);

        var opts = {
            duration: 500,
            onComplete: function() {
                fadeoutAndDestroy(div);
            }
        };
        div.set('tween', opts).fade('in');
    }

    return {
        init: init,
        show: show
    };
})();
