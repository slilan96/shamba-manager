# Shamba Manager

## The Stack

The stack is powered by [FeathersJs](https://feathersjs.com/). At the heart
of this application is a lot of CRUD, and this framework abstracts a lot of
that into simple services.

## Testing

There are several environments where tests can be run each with it's own set
of challenges. I have tried to standardize the environment buy writing a
simple script that creates a postgres docker container for local development
and testing. If you prefer to use a custom postrges server that's not docker,
feel free to edit respective config files to match your configuration.
