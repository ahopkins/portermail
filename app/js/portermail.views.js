// var pView = function (templateName, context, preLogic, postLogic, elem) {
var pView = function (templateName, options) {
        return function (e) {
            options = Object.assign({
                preRender: null,
                preLoad: null,
                postRender: null,
                elem: p.one('#content'),
                context: {}
            }, options);

            if (typeof options.preRender == 'function') {
                options.preRender.call();
            }

            var template = nunjucks.render(templateName, options.context);
            options.elem.innerHTML = template;

            if (typeof options.preLoad == 'function') {
                options.preLoad.call();
            }

            p.load();

            if (typeof options.postRender == 'function') {
                options.postRender.call();
            }
        };
    };

var views = {
    inbox: pView('templates/views/inbox.html', {
        context: {
            name: 'Adam',
            get_threads: function () {
                return p.stack.get('emailThreads');
            },
            get_bundles: function () {
                return p.stack.get('emailBundles');
            }
        },
        postRender: function () {
            var regex = /#thread\/(.*)/g,
                hash = window.location.hash,
                m;

            while ((m = regex.exec(hash)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                
                var thread = p.one("#" + m[1]);
                if (thread !== null && thread.hasClass("opened") === false) {
                    thread.addClass("opened");
                }
            }
        }
    }),
    dashboard: pView('templates/views/dashboard.html', {
        postRender: function () {
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
        }
    })
};