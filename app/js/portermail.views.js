var pView = function (templateName, context, preLogic, postLogic, elem) {
    return function (e) {
        preLogic = preLogic || null;
        postLogic = postLogic || null;
        elem = elem || p.one('#content');

        if (typeof preLogic == 'function') {
            preLogic.call();
        }

        var template = nunjucks.render(templateName, context);
        elem.innerHTML = template;

        p.load();

        if (typeof postLogic == 'function') {
            postLogic.call();
        }
    };
};

var views = {
    inbox: pView('templates/views/inbox.html', {name: 'Adam'}),
    dashboard: pView('templates/views/dashboard.html', null, null, function () {
        var data = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3,
                    14,
                    21
                ],
                backgroundColor: [
                    "#fd0328",
                    "#fdd803",
                    "#5b03fd",
                    "#03fd5b",
                    "#FD5B03",
                    "#4d4d4d"
                ],
                // hoverBackgroundColor: [
                //     "#FD5B03",
                //     "#FD5B03",
                //     "#FD5B03",
                //     "#FD5B03",
                //     "#FD5B03",
                //     "#FD5B03"
                // ],
                label: 'My dataset' // for legend
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue",
                "Last"
            ]
        };

        new Chart(p.one("#recipient-chart"), {
            data: data,
            type: 'polarArea',
            options: {
                elements: {
                    arc: {
                        // borderColor: "#757575"
                    }
                }
            }
        });
    }),
};