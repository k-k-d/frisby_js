This is a template for the testing suite.

The files in \_\_tests\_\_/users/, namely 01ping.js, 02get_user.js, 05login_email_mobile.js have comments to explain the main components which are generally used.

Use 'npm test' to run the entire suite.

Use 'npm test -- <path_to_file_or_directory>' to run only specific files.

Some explanation with respect to the tools we use:

$ get(), post(), put(), del() can be called on the frisby object to send requests.

$ setup() can be called on the object also to set headers and authentication to be used with the next request.

$ expect() is used for assertions.
    The first argument passed in expect() refers to which part of the response we check.
    It can be any one of the following:
        'status' - status code of the response
        'json' - the json body of the response
        'jsonTypes' - the Joi schema of the response json (or nested objects or list elements)

$ then() can be called on the object to which a callback is passed which can use the response as a parameter and various actions can be performed using the response.

$ inspectJSON(), inspectResponse(), inspectRequest(), inspectHeaders(), inspectBody() etc are to be used to log the corresponding attribute to the console for debugging.

$ All above methods can be chained.