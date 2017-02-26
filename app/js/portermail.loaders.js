            
function attachMomentWatchers () {
    var moments = p.all('body [data-moment]');
    moments.forEach( function(m) {
        
        var setTime = function () {
                if (document.body.contains(this) === false) {
                    clearInterval(interval);
                }
                var datetime = this.getAttribute('data-datetime');
                var method = this.getAttribute('data-moment');
                if (method == 'fromNow') {
                    this.innerHTML = moment(datetime).fromNow();
                } else if (method == 'now') {
                    this.innerHTML = moment(new Date()).format('LT');
                }
            };

        if (m.hasAttribute('data-moment-live')) {
            return;
        }
        var interval = setInterval(setTime.bind(m), 60000);
        setTime.bind(m).call();
        m.setAttribute('data-moment-live', null);
        m.setAttribute('data-moment-id', p.randomCharacters(18));
    });
}

function renderLoad () {
    console.log('renderLoad');
    attachMomentWatchers();
}