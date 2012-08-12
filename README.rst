=======
Grommet
=======

A library for making it easy to make dependencies in JS. Grommet is largely
an abstraction of jQuery callbacks and deferred objects.

Examples
========

Run tasks in order
------------------

.. code:: js

    function task1() {}
    function task2() {}
    function task3() {}

    grom(task1).then(task2).then(task3).go();


Delay a task with a callback
----------------------------

.. code:: js

    var cb = grom(function() { /* callback */ });

    $.get("/path/to/url.html", cb.delay(function(data) {
        /* Process data */
    }));

    navigator.geolocation.getCurrentPosition(cb.delay(function(location) {
        /* Process the user's location */
    }));

    var i = new Image();
    i.onload = cb.delay(function() {});

    cb.go();


Delay tasks with other grommet tasks
------------------------------------

.. code:: js
    
    var master = grom(function() {
        /* Start video game logic */
    });

    var secondary = grom(function() {
        /* Initialize video game assets, hide loader */
    });

    for(var a in assets) {
        var asset = new Asset(a, secondary.delay(function() {
            loaded_assets[a] = asset;
        }));
    }
    master.after(secondary).go();
    secondary.go();
