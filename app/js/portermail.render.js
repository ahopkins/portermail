// Load base templates and render to DOM
var app = nunjucks.render('/templates/layouts/base.html');
p.one('.portermail').innerHTML = app;

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
            "#4d4d4d",
            "#4d4d4d",
            "#4d4d4d",
            "#4d4d4d",
            "#4d4d4d",
            "#4d4d4d"
        ],
        hoverBackgroundColor: [
            "#FD5B03",
            "#FD5B03",
            "#FD5B03",
            "#FD5B03",
            "#FD5B03",
            "#FD5B03"
        ],
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