p.events.add('emailCountsStackChange', function (counts) {
    for (var key in counts) {
        var count = counts[key],
            element = p.one("#" + key);

        element.addClass('badge').addClass('new');
        element.setAttribute('data-badge', count);
    }
});

p.events.add('postLoaders', function () {
    console.log('postLoaders');
    renderLoad();
});