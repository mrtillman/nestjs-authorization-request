# nestjs-authorization-request

Demonstrates [How to Send an Authorization Request](https://github.com/mrtillman/counter-culture.secure/wiki/How-To-Send-an-Authorization-Request) using [Nest](https://nestjs.com/).

---

## Prerequisites

When in development mode, be sure to start [counter-culture.api](https://github.com/mrtillman/counter-culture.api) and [counter-culture.secure](https://github.com/mrtillman/counter-culture.secure) on ports `4000` and `5000`, respectively. Also, remember to register your app locally via [counter-culture.dev](https://github.com/mrtillman/counter-culture.dev).

Next, find `.demo.env` in the project root, rename it to `.env`, and set your environment variables:

```sh
CLIENT_ID={CLIENT_ID}
CLIENT_SECRET={CLIENT_SECRET}
REDIRECT_URI=http://localhost:8080/oauth2/callback
NODE_ENV=development
```

## Installation

```bash
$ npm install
```

## Launching the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

Open [http://localhost:8080](http://localhost:8080) to view it in the browser. You can sign in using one of the [demo accounts](https://github.com/mrtillman/counter-culture.secure/blob/master/README.md#usage).

## License

[MIT](https://github.com/mrtillman/expressjs-authorization-request/blob/master/LICENSE)
