--- 
title: (J)GLtut
---

This is a tutorial I wrote for [one of my professors](http://www.dirkwhoffmann.de/) so he didn't have
to use DirectX to teach shaders any more.

Unfortunately this text - like all texts i wrote during the course of my studies - is in german.

It covers some basics on OpenGL, some supplementary libraries like glut and glew, loading and binding
of both ARB_PROGRAMS (pseudo-assembler) and ARB_SHADERS (GLSL, GLSlang) and finally
includes some simple shaders. The archive also contains the full source and linux binary with a small
sample program that can load and display shaders on the infamous teapot.

![toon shader](/images/gltut/toon.gif)<br/>
![per pixel lighting](/images/gltut/perpixel.gif)

You can either download just the paper [.pdf, ~200k](/files/tinkerings/gltut-paper.pdf),
the archive containing the full source of both the small sample application and the paper itself
[.tgz ~2.5M](/files/tinkerings/gltut.tgz). 

Some time later I created a Java version of this in order to learn about OpenGL in Java.
Sorry for the non-existing packaging, just [download](/files/tinkerings/jgltut.tgz) the .tgz file,
unpack it and start JGLtut with the yout Java-VM of choice.
You might need to recompile it if you're not using Sun's JDK 1.5.0.6 or whatever...

To run JGLtut needs to have jogl.jar in $CLASSPATH and the JoGL-natives in java.library.path, 
consult the README. Oh - and you can even press the printscreen button to take a screenshot!.


