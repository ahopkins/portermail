var pView = function (templateName, context, logic, elem) {
    return function (e) {
        logic = logic || null;
        elem = elem || p.one('#content');

        if (typeof logic == 'function') {
            logic.call();
        }

        var template = nunjucks.render(templateName, context);
        elem.innerHTML = template;

        p.load();
    };
};

var views = {
    inbox: pView('templates/views/inbox.html', {name: 'Adam'})
};