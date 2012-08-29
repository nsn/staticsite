-----
  kind: article
  created_at: 2012-08-30 00:59:02
  tags:
  - programming
  - jee
  - java
  - jersey
  - jackson
  title: "Consuming @GenericType REST-webservices with jersey-client"
  author_name: nsn
  abstract: "I just lost 2 hours of my life trying to consume a RESTful webservice that returns a java.util.List"
-----

... but jersey always complained about a missing message body reader:

<pre class="brush: plain">
SEVERE: A message body reader for Java class java.util.List, 
and Java type java.util.List&lt;MyClass>, 
and MIME media type application/json was not found 
</pre>

Turns out you have to add a matching provider to your <pre>com.sun.jersey.api.client.Client</pre>:

<pre class="brush: java">
ClientConfig clientConfig = new DefaultClientConfig();
clientConfig.getClasses().add(JacksonJsonProvider.class);
client = Client.create(clientConfig);
WebResource r = client.resource(endpoint);
List&lt;MyClass> list = r.accept(MediaType.APPLICATION_JSON).
    get(new GenericType&lt;List&ltMyClass>>() {
  });
</pre>

Thanks to [cobusbernard](http://stackoverflow.com/users/1278297/cobusbernard) on [stackoverflow](http://stackoverflow.com) for that one.
I hope this'll save somebody some time as it's a bit hard to find.
