# Patch issue between OTEL browser instrumentations

Steps to reproduce:

- clone this repo and `cd` into it
- run `npm install`
- run `npm run build` to get the latest version of the bundle
- run `npm run serve` to start the app
- visit `http:localhost:3000` and open the DevTools
- click on the links to navigate

On the console you will see Spans created by `@opentelemetry/instrumentation-user-interaction` but no logs.
The expected outcome is to have also logs from `@opentelemetry/instrumentation-browser-navigation`.
