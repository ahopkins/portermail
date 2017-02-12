// Load base templates and render to DOM
var app = nunjucks.render('/templates/layouts/base.html');
p.one('.portermail').innerHTML = app;

// On path change, update active link menu
p.events.add('pushPath', function () {
    var links = p.all('.places a');
    links.removeClass('active');
    links.forEach(function (link) {
        if (link.getAttribute('href') == p.router.current.path) {
            link.addClass('active');
        }
    });
});
