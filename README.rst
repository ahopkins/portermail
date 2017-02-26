PorterMail
==========

*The email platform proof of concept*

Built entirely from the ground up, this project is meant to mainly serve as an example as how to build a web app, with **client side rendering** using `PorterJS <http://porterjs.readthedocs.io/en/latest/>`_.

.. image::  http://i.imgur.com/z1D1dNq.png

What is PorterJS?
+++++++++++++++++

**PorterJS** is a simplified (yet powerful) adaptive JavaScript framework. It adheres to HTML5 compliance by using `data-XXX` attributes, as opposed to defining its own. And removes all the extra "fluff". It provides all the necessary components to build both **client-side** and **server-side** rendered single-page web applications.

To leverage it as a client-side framework, all you need to do is drop in your preferred template engine (*PorterJS does not ship with one, intentionally*). I have successfully used both `Markup.js <https://github.com/adammark/Markup.js>`_ and `Nunjucks.js <https://mozilla.github.io/nunjucks/>`_.

It's light-weight AND fast
--------------------------

PorterJS can be used from a CDN: `https://cdn.jsdelivr.net/porterjs/1.0.1/porter.min.js` for increased response times, and is extremely light-weight.

.. image::  http://i.imgur.com/Afvse5D.png

Delivered in just **33kb**.

What is PorterMail?
+++++++++++++++++++

First and foremost it is an example of how to build a client-side rendered single-page web application on PorterJS. Because the goal of *this* project is to show how you can go about building with PorterJS, it is intentionally built without the help of Babel and Webpack. The only thing it uses is Grunt to setup a webserver to deliver the files in development mode.

Templating
----------

As said before, you have the freedom to build with the template engine of your choice. PorterMail uses **Nunjucks.js**.

For example, to build the Inbox view: 

**inbox.html** ::

    <div class="email-list">
        {% for bundle in get_bundles() %}
            {% include "templates/components/inbox/bundle.html" %}
        {% endfor %}
    </div>

**bundle.html** ::

    <section>
        <h4>{{ bundle.title }}</h4>
        {% include "templates/components/inbox/email-action-bar.html" %}
        {% for thread_id in bundle.threads %}
            {% set thread=get_threads()[thread_id] %}
            {% include "templates/components/inbox/thread.html" %}
        {% endfor %}
    </section>

.. image::  http://i.imgur.com/JXE5DUp.png

Data Feeds
----------

The front end is built entirely from a stream of JSON data feeds. Because this is for example purposes only, you will find static JSON files in the `app/data` folder. 

How to test it out?
+++++++++++++++++++

To get up and running, you will need to clone the project, and run `grunt` from the project's root folder (the folder with `gruntfile.js` in it). Also, you will need to change `index.html` to use the PorterJS CDN `https://cdn.jsdelivr.net/porterjs/1.0.1/porter.min.js`.

That's it.

What next?
++++++++++

Well, this is not yet complete. I intend to continue building more functionality into the platform with the hopes of actually running it in production. My goal for this will be some time in Summer 2017.

If you would like to help please let me know.

A lot of the code is subject to change, and likely I will be moving some functionality from this project into PorterJS core (for example, `pView()`). I will continue working on documentation, and tests, so keep an eye out for more to come.

Questions/Comments/Concerns/Critiques/Compliments
-------------------------------------------------

All are welcome.