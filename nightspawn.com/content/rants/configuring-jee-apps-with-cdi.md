-----
  kind: article
  created_at: 2011-11-07 13:32:51
  tags:
  - programming
  - jee
  - java
  - cdi
  title: "configuring jee apps with cdi"
  author_name: nsn
  abstract: "Every application has them - configuration parameters: admin credentials, support email addresses, urls for external services, the list is endless. 
             Either in .properties files or in a database, they are hell to keep track of and maintain. This post details a sane way to keep all meta-information
             on them strictly in the source code by using JSR-299 (CDI)."
-----

**Goal**: we want to maintain all our config params in the source code during development, but still be able to change them during compile- or even runtime later in the 
application's lifespan. We will achieve this by using JSR-299 dependency injection:

First we create a `@Qualifier` to label all our config params with:

<pre class="brush: java">
@Target(value = { FIELD, METHOD })
@Retention(value = RUNTIME)
@Dependent
@Inherited
@Qualifier
public @interface ConfigValue {
}
</pre>

We'll certainly need additional information about the config param: a symbolic name, a default value and a description about how the param is going to be used.
Unfortunately we can't just add methods to our qualifier-interface as CDI matches producer methods exactly - we cannot use the qualifier to specify more meta-information.
So we have the choice to either create a seperate annotation for each piece of meta-information we want to be able to specify, or just create a single annotation type
and add all needed methods there. Since Java does not allow `null` as `default` values in annotations (somehow `null` is not a 'constant expression', whatever...) I decided
to create one annotation for all mandatory data, and then create an annotation for each piece of optional information:


<pre class="brush: java">
@Target(value = { FIELD, METHOD })
@Retention(value = RUNTIME)
@Inherited
public @interface ConfigParams {
    /**
     * the {@link ConfigValue}'s default value, always a String, if a non-String
     * {@link ConfigValue} is annotated with a preset that cannot be converted
     * an exception is thrown in the producer method and 'svn blame' is going to
     * be used against you
     */
    String preset();

    /**
     * describes what the {@link ConfigValue} is used for, at this specific
     * injection point
     */
    String purpose();
}

/**
  * specifies an optional symbolic name for a {@link ConfigValue}
  */
@Target(value = { FIELD })
@Retention(value = RUNTIME)
@Inherited
public @interface ConfigKey {
    /**
     * the symbolic name to be used
     */
    String value();
}
</pre>

`ConfigParams` holds all mandatory information (default value and a short description on how the param is going to be used), 
while `ConfigKey` is optional and specifies a symbolic name for a `ConfigValue`. 
This is necessary because our producer service chooses the fully qualified classname and fieldname as a default name for a `ConfigValue`,
and the `ConfigKey` allows us to use the same `ConfigValue` at different locations in our project.
Now we just need to write `@Produces` methods for each annotated type, we'll just implement Strings for now:

<pre class="brush: java">
@ApplicationScoped
public class ConfigurationService {
    @Inject
    private ConfigStore store;

    @Produces
    @ConfigValue
    public String makeConfigString(InjectionPoint injectionPoint) throws ConfigMetaInfoException {
        // extract meta information
        ConfigParams params = injectionPoint.getAnnotated().getAnnotation(ConfigParams.class);
        if (params == null) {
            throw new ConfigMetaInfoException("ConfigParams annotation missing at injection point "
                    + injectionPoint.toString());
        }

        // key?
        String key = calcDefaultName(injectionPoint);
        ConfigKey cfgKey = injectionPoint.getAnnotated().getAnnotation(ConfigKey.class);
        if (cfgKey != null) {
            key = cfgKey.value();
        }

        // ask store for value
        String rv = store.getConfigValue(key, params.preset());
        // log.info(String.format("config %s => %s", key, rv));

        return rv;
    }
}
</pre>

The `ConfigStore` interface defines a store for `@ConfigValues`, in my current project this is a `@Singleton` bean that uses
JPA to persist config params to a database. Let's just use a Hashmap in memory to demonstrate:

<pre class="brush: java">
/**
 * default {@link ConfigStore} implementation, stores config values locally in a
 * HashMap, does not persist changes anywhere but in memory
 * 
 * @author nsn
 * 
 */
@Dependent
@Default
public class MockupConfigStoreImpl implements ConfigStore {
    private HashMap<String, String> values;

    /**
     * initializes the values map
     */
    @PostConstruct
    public void init() {
        values = new HashMap<String, String>();
    }

    @Override
    public String getConfigValue(String key, String preset) {
        if (values.containsKey(key)) {
            return values.get(key);
        }
        values.put(key, preset);
        return preset;
    }

}
</pre>

A real `ConfigStore` would probably need to provide a `getAllValues()` method that returns all `ConfigValues`, each with all their injection points, default value
and meaning meta-information. This method could then be used to create a simple web-frontend to actually set the config params.

This is the way my team and I manage our current project's configuration, and so far we like it a lot more than the .properties files we used for the
<a href="http://wizard101.de">Wizard101 website</a>.




