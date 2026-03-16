import { SDK_INFO } from '@opentelemetry/core';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { logs } from '@opentelemetry/api-logs';
import { ConsoleLogRecordExporter, LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import {resourceFromAttributes} from '@opentelemetry/resources';

import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { BrowserNavigationInstrumentation } from '@opentelemetry/instrumentation-browser-navigation';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';


globalThis['instrument'] = function instrument() {
  diag.setLogger(console, {logLevel: DiagLogLevel.DEBUG});
  diag.debug(`intialization`);
  const resourceAttributes = {};
  const resource = resourceFromAttributes({ ...resourceAttributes, ...SDK_INFO });
  const tracerProvider = new WebTracerProvider({
    resource,
    sampler: new TraceIdRatioBasedSampler(1),
    spanProcessors: [
      new SimpleSpanProcessor(
        new ConsoleSpanExporter(),
      ),
    ],
  });
  tracerProvider.register();

  const loggerProvider = new LoggerProvider({
      resource,
      processors: [
        new SimpleLogRecordProcessor(
          new ConsoleLogRecordExporter(),
        ),
      ],
  });
  logs.setGlobalLoggerProvider(loggerProvider);

  registerInstrumentations({
    instrumentations: [
      // NOTE: with this order the user interaction instrumentation
      // unwraps the previously wrapped history APIs by the browser navigation.
      // Reversing the order makes the trick
      new BrowserNavigationInstrumentation(),
      new UserInteractionInstrumentation(),
    ],
  });
}