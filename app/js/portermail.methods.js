function openEmail (a) {
    console.log('openEmail');
    console.log(a);
}

// Retrieve counts of new emails
function getCounts () {
    var req = new p.Request('/data/counts.json');
    req.get().then(function (response) { 
        p.stack.set('emailCounts', response.json);
    });
}

// Retrieve bundles of emails and store to stack
function getMail () {
    new pNotify('Checking the mail.');

    getCounts();

    var threadsReq = new p.Request('/data/threads.json');
    threadsReq.get().then(function (response) { 
        p.stack.set('emailThreads', response.json);

        var bundlesReq = new p.Request('/data/bundles.json');
        bundlesReq.get().then(function (response) { 
            console.log(response);
            p.stack.set('emailBundles', response.json);

            // If the browser is on the inbox page, reload inbox view
            if (window.location.pathname == '/inbox') {
                p.router.goto('inbox');
            }
        });
    });
}

function threadClick (e) {
    var target = p.getTarget(e),
        id = target.getAttribute('id').replace('email-', '');

    p.stack.update('emailThreads', id + ".is_read", true);
    p.stack.update('emailThreads', id + ".is_new", true);
    target.removeClass('new');
    if (target.hasClass('opened')) {
        target.removeClass('unread').addClass('read');
    }
}