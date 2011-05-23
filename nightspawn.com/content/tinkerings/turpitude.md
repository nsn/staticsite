--- 
title: Turpitude/Thesis
---

Turpitude/Thesis
================

My diploma thesis/final year project was written while working at [1&1](http://einsundeins.com) and
consisted of a library that allows users to execute PHP-Code whithin a Java Virtual machine.
It is basically an implementation of [JSR 223](http://jcp.org/en/jsr/detail?id=223), although I never
checked for standard compliance. 
Additionally turpitude provides an easy way for PHP Code to access to Java Classes and Objects at runtime 
and call Methods on those objects. Turpitude even allows Java interfaces to be implemented in PHP and offers
native collection traversal for both Java-Collections in PHP and the other way around!


Turpitude
---------

Turpitude is fairly complete, but unfortunately only works in single threaded applications.
I fooled around with Zend engines TSRML_TS define, but was'nt able to get the Zend-Engine to be able to run
multiple scripts concurrently. This might be because I'm too stupid, but might also be because the Zend-Engine 
sourcecode and documentation is a horrendous pile of steaming horse manure - I'll let you decide on that...

Since I have moved on to greener pastures development on turpitude has stopped, either way I still provide 
the sources and some rudimetary documentation for download here in case somebody can pull some use out of it:

[turpitude.tgz ~4.5M](/files/tinkerings/turpitude.tgz) - source, docs and examples


Thesis
---------

Since turpitude was developed as part of my thesis I provide the thesis itself for download, as it contains
pretty good documentation on how turpitude works and what were the steps taken during development.

[thesis.pdf ~180k](/files/tinkerings/thesis.pdf)


