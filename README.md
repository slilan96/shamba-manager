# Shamba Manager

## Prerequities

### Required

- Nodejs installed (v12+)
- `yarn`
- PostgreSQL

### Important to have but not required

- `docker`
- `docker-compose`

## The Stack

The stack is powered by [FeathersJs](https://feathersjs.com/). At the heart
of this application is a lot of CRUD, and this framework abstracts a lot of
that into simple services.

## Development

I encourage developers to use `docker-compose` since that creates a nice
self-contained environment. All changes to the files on your computers
disk are picked up by `nodemon` so you can go on with your regular dev
pattern.

If you wish to use your computer's local `postgres` server, then all
you need to do is change the database connection configuration in
`config/default.js`. Happy hacking!

## Testing

Tests are run both locally and on a CI/CD server (in this case, GITLAB). In
keeping with the self-contained theme of the application, I have dockerized
tests as well. To run the dockerized tests, run `yarn test:docker` and this
will run the whole test suite (unit + integration) using `docker-compose`.

I also deliberately set the `NODE_ENV=production` in order to replicate
the tests on a production like environment. This is important because some
of the packages make some changes and optimization when `NODE_ENV=production`
so it would be nice to test that as well.

If you prefer to use a custom postrges server that's not docker,
feel free to edit respective config files to meet your desires and run the
tests.
