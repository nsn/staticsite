-----
  kind: article
  created_at: 2011-11-30 12:12:31
  tags:
  - jee
  - java
  - cdi
  title: "choosing CDI @Alternatives at runtime"
  author_name: nsn
  abstract: "One of the coolest features of JSR-299 are @Alternatives, letting you choose concrete implementations by simply specifying them in your beans.xml, either each one seperately or
             grouped in @Alternative @Stereotypes.
             Since we have to choose @Alternatives according to the environment the application is deployed to (development, testing, staging, production...) I was looking
             for a way to configure the CDI-container whithout building seperate wars for each one." 
-----

I just could'nt believe I was the only person having this problem I searched the web for a solution, even made threads at the 
<a href="http://seamframework.org/Community/CDIConfigurationAtRuntime">Weld Users Forum</a> and  at 
<a href="http://stackoverflow.com/questions/8137696/jsr-299-cdi-configuration-at-runtime">stackoverflow</a>, but nobody was able to help me - so after sinking way to much time into
the JSR-299 spec and weld source code I came up with this:

**Goal**: we want to choose different sets of `@Alternative`s depending on the environment our war file is deployed to. First thing we do is create an `@Alternative @Stereotype` to
hold our meta-information and also in order to just add one type to the `beans.xml` `<alternatives>` section instead of adding each `@Alternative` seperately:

<pre class="brush: java">
@Alternative
@Stereotype
@Retention(RUNTIME)
@Target(TYPE)
public @interface EnvironmentAlternative {
    EnvironmentType[] value();
}
</pre>

`EnvironmentType` is just an `enum` detailing the different - wait for it... environment types:

<pre class="brush: java">
public enum EnvironmentType {
    DEVELOPMENT, TESTING, STAGING, PRODUCTION;
}
</pre>

We need to make sure to have a single `@Default` implementation for each interface, CDI will abort during deployment otherwise. All other implementations get annotated with our nnw
stereotype:

<pre class="brush: java">
@Default
public class MockupFoo implements Foo {
  ...
}

@EnvironmentAlternative({STAGING, PRODUCTION})
public class FooImpl implements Foo {
  ...
}
</pre>

As `EnvironmentAlternative` is an alternative stereotype `MockupFoo` is now choosen by the CDI container for all injection points. After we add the following lines to our beans.xml
`FooImpl` is choosen instead:

<pre class="brush: xml">
&lt;alternatives&gt;
  &lt;stereotype&gt;com.example.EnvironmentAlternative&lt;/stereotype&gt;
&lt;/alternatives&gt;
</pre>

Not exactly what we wanted, but there's something we can do about that: ever heard of CDI extensions? They are a way to extend CDI (duh) by observing CDI lifecycle events. Writing one
is quite easy, just extend the `Extension` interface:

<script type="syntaxhighlighter" class="brush: java"><![CDATA[
public class EnvironmentAlternativesExtension implements Extension {
    private EnvironmentType currentEnv = PRODUCTION;

    public <T> void processAnotated(@Observes ProcessAnnotatedType<T> event) {
        EnvironmentAlternative a = event.getAnnotatedType().getJavaClass().getAnnotation(EnvironmentAlternative.class);
        if (a != null && !containsCurrentEnv(a.value())) {
            // veto if currentEnv not in type's target environments
            log.info("veto! " + event.getAnnotatedType().getJavaClass());
            event.veto();
        }
    }

    private boolean containsCurrentEnv(EnvironmentType[] environments) {
        for (EnvironmentType env : environments) {
            if (env == currentEnv) {
                return true;
            }
        }
        return false;
    }
}
]]></script>

The extension itself is not very complicated: the `processAnotated` method gets called for each annotated type the container processes, and if it is annotated as `@EnvironmentAlternative`
*AND* the current environemnt is *NOT* in the specified environments we call the event's `veto()` method, this prevents the type from being processed any further. Easy! The only thing left
to do is create a file called `javax.enterprise.inject.spi.Extension` in your app's  `META-INF/services` directory containing a single line: our extension's fully qualified classname.

In a real application of course instead of hardcoding the `currentEnv` field you'd have to decide how to obtain the current environment type, I just use a system property in our different glassfish
installations that I create with 

<pre>
  nsn@nsn: ~> asadmin create-system-properties ENVIRONMENT=DEVELOPMENT
</pre>

and then simply obtain via

<pre class="brush: java">
    String propertyValue = System.getProperty("ENVIRONMENT");
    currentEnv = EnvironmentType.valueOf(propertyValue);
</pre>

In our current project my team and I use this method to be able to build our application once, then deploy it to different environments and have it behave differently there. The only
problem I wasn't able to solve with this technique is choosing which `@Decorators` are enabled, as if I just `veto()` a `@Decorator` that is explicitly enabled in the beans.xml the container
complains about not being able to find that class. If anybody comes up with a solution to this please contact me somehow, for now our `@Decorator`s themselves are responsible for when they 
are active and when not.

