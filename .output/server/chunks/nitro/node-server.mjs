globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { withoutTrailingSlash, getQuery as getQuery$1, parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, isRelative } from 'ufo';
import { createRouter as createRouter$1, toRouteMatcher } from 'radix3';
import { serialize, parse as parse$2 } from 'cookie-es';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase, kebabCase, pascalCase, camelCase } from 'scule';
import defu, { defuFn, defu as defu$1 } from 'defu';
import { hash } from 'ohash';
import { createStorage, prefixStorage } from 'unstorage';
import unstorage_47drivers_47cloudflare_45kv_45http from 'unstorage/drivers/cloudflare-kv-http';
import overlay from 'unstorage/drivers/overlay';
import memory$1 from 'unstorage/drivers/memory';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, join } from 'pathe';
import { graphql } from '@octokit/graphql';
import remarkGithub from 'remark-github';
import { unified } from 'unified';
import { toString } from 'mdast-util-to-string';
import { preprocess } from 'micromark/lib/preprocess.js';
import { postprocess } from 'micromark/lib/postprocess.js';
import { stringifyPosition } from 'unist-util-stringify-position';
import { markdownLineEnding, markdownSpace } from 'micromark-util-character';
import { push, splice } from 'micromark-util-chunked';
import { resolveAll } from 'micromark-util-resolve-all';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';
import rehypeRaw from 'rehype-raw';
import remarkMDC, { parseFrontMatter } from 'remark-mdc';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { all } from 'mdast-util-to-hast';
import { detab } from 'detab';
import { u } from 'unist-builder';
import { encode } from 'mdurl';
import slugify from 'slugify';
import { position } from 'unist-util-position';
import { visit } from 'unist-util-visit';
import { BUNDLED_LANGUAGES, BUNDLED_THEMES, getHighlighter } from 'shiki-es';
import consola from 'unenv/runtime/npm/consola';

class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = void 0;
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
H3Error.__h3_error__ = true;
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(
    input.message ?? input.statusMessage,
    // @ts-ignore
    input.cause ? { cause: input.cause } : void 0
  );
  if ("stack" in input) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.node.res.writableEnded) {
    return;
  }
  const h3Error = isError(error) ? error : createError(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.node.res.writableEnded) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.node.req.url || "");
}
function getMethod(event, defaultMethod = "GET") {
  return (event.node.req.method || defaultMethod).toUpperCase();
}
function isMethod(event, expected, allowHead) {
  const method = getMethod(event);
  if (allowHead && method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (method === expected) {
      return true;
    }
  } else if (expected.includes(method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event.node.req[RawBodySymbol] || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(
      Buffer.isBuffer(_rawBody) ? _rawBody : Buffer.from(_rawBody)
    );
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event) {
  if (ParsedBodySymbol in event.node.req) {
    return event.node.req[ParsedBodySymbol];
  }
  const body = await readRawBody(event, "utf8");
  if (event.node.req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const form = new URLSearchParams(body);
    const parsedForm = /* @__PURE__ */ Object.create(null);
    for (const [key, value] of form.entries()) {
      if (key in parsedForm) {
        if (!Array.isArray(parsedForm[key])) {
          parsedForm[key] = [parsedForm[key]];
        }
        parsedForm[key].push(value);
      } else {
        parsedForm[key] = value;
      }
    }
    return parsedForm;
  }
  const json = destr(body);
  event.node.req[ParsedBodySymbol] = json;
  return json;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

function parseCookies(event) {
  return parse$2(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  const cookieStr = serialize(name, value, {
    path: "/",
    ...serializeOptions
  });
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && !cookieValue.startsWith(name + "=");
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function splitCookiesString(cookiesString) {
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host"
]);
async function proxyRequest(event, target, opts = {}) {
  const method = getMethod(event);
  let body;
  if (PayloadMethods.has(method)) {
    body = await readRawBody(event).catch(() => void 0);
  }
  const headers = getProxyRequestHeaders(event);
  if (opts.fetchOptions?.headers) {
    Object.assign(headers, opts.fetchOptions.headers);
  }
  if (opts.headers) {
    Object.assign(headers, opts.headers);
  }
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      headers,
      method,
      body,
      ...opts.fetchOptions
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      const cookies = splitCookiesString(value).map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      });
      event.node.res.setHeader("set-cookie", cookies);
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  for await (const chunk of response.body) {
    event.node.res.write(chunk);
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}

const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event.node.res.end(data);
      resolve();
    });
  });
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function defaultContentType(event, type) {
  if (type && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
const appendHeader = appendResponseHeader;
function isStream(data) {
  return data && typeof data === "object" && typeof data.pipe === "function" && typeof data.on === "function";
}
function sendStream(event, data) {
  return new Promise((resolve, reject) => {
    data.pipe(event.node.res);
    data.on("end", () => resolve());
    data.on("error", (error) => reject(createError(error)));
  });
}

class H3Headers {
  constructor(init) {
    if (!init) {
      this._headers = {};
    } else if (Array.isArray(init)) {
      this._headers = Object.fromEntries(
        init.map(([key, value]) => [key.toLowerCase(), value])
      );
    } else if (init && "append" in init) {
      this._headers = Object.fromEntries(init.entries());
    } else {
      this._headers = Object.fromEntries(
        Object.entries(init).map(([key, value]) => [key.toLowerCase(), value])
      );
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  entries() {
    throw Object.entries(this._headers)[Symbol.iterator]();
  }
  keys() {
    return Object.keys(this._headers)[Symbol.iterator]();
  }
  values() {
    throw Object.values(this._headers)[Symbol.iterator]();
  }
  append(name, value) {
    const _name = name.toLowerCase();
    this.set(_name, [this.get(_name), value].filter(Boolean).join(", "));
  }
  delete(name) {
    delete this._headers[name.toLowerCase()];
  }
  get(name) {
    return this._headers[name.toLowerCase()];
  }
  has(name) {
    return name.toLowerCase() in this._headers;
  }
  set(name, value) {
    this._headers[name.toLowerCase()] = String(value);
  }
  forEach(callbackfn) {
    for (const [key, value] of Object.entries(this._headers)) {
      callbackfn(value, key, this);
    }
  }
}

class H3Response {
  constructor(body = null, init = {}) {
    // TODO: yet to implement
    this.body = null;
    this.type = "default";
    this.bodyUsed = false;
    this.headers = new H3Headers(init.headers);
    this.status = init.status ?? 200;
    this.statusText = init.statusText || "";
    this.redirected = !!init.status && [301, 302, 307, 308].includes(init.status);
    this._body = body;
    this.url = "";
    this.ok = this.status < 300 && this.status > 199;
  }
  clone() {
    return new H3Response(this.body, {
      headers: this.headers,
      status: this.status,
      statusText: this.statusText
    });
  }
  arrayBuffer() {
    return Promise.resolve(this._body);
  }
  blob() {
    return Promise.resolve(this._body);
  }
  formData() {
    return Promise.resolve(this._body);
  }
  json() {
    return Promise.resolve(this._body);
  }
  text() {
    return Promise.resolve(this._body);
  }
}

class H3Event {
  constructor(req, res) {
    this["__is_event__"] = true;
    this.context = {};
    this.node = { req, res };
  }
  get path() {
    return this.req.url;
  }
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
  // Implementation of FetchEvent
  respondWith(r) {
    Promise.resolve(r).then((_response) => {
      if (this.res.writableEnded) {
        return;
      }
      const response = _response instanceof H3Response ? _response : new H3Response(_response);
      for (const [key, value] of response.headers.entries()) {
        this.res.setHeader(key, value);
      }
      if (response.status) {
        this.res.statusCode = sanitizeStatusCode(
          response.status,
          this.res.statusCode
        );
      }
      if (response.statusText) {
        this.res.statusMessage = sanitizeStatusMessage(response.statusText);
      }
      if (response.redirected) {
        this.res.setHeader("location", response.url);
      }
      if (!response._body) {
        return this.res.end();
      }
      if (typeof response._body === "string" || "buffer" in response._body || "byteLength" in response._body) {
        return this.res.end(response._body);
      }
      if (!response.headers.has("content-type")) {
        response.headers.set("content-type", MIMES.json);
      }
      this.res.end(JSON.stringify(response._body));
    });
  }
}
function createEvent(req, res) {
  return new H3Event(req, res);
}

function defineEventHandler(handler) {
  handler.__is_handler__ = true;
  return handler;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return "__is_handler__" in input;
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler = r.default || r;
        if (typeof handler !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler
          );
        }
        _resolved = toEventHandler(r.default || r);
        return _resolved;
      });
    }
    return _promise;
  };
  return eventHandler((event) => {
    if (_resolved) {
      return _resolved(event);
    }
    return resolveHandler().then((handler) => handler(event));
  });
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const app = {
    // @ts-ignore
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    handler,
    stack,
    options
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(
      normalizeLayer({ ...arg2, route: "/", handler: arg1 })
    );
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const reqUrl = event.node.req.url || "/";
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!reqUrl.startsWith(layer.route)) {
          continue;
        }
        event.node.req.url = reqUrl.slice(layer.route.length) || "/";
      } else {
        event.node.req.url = reqUrl;
      }
      if (layer.match && !layer.match(event.node.req.url, event)) {
        continue;
      }
      const val = await layer.handler(event);
      if (event.node.res.writableEnded) {
        return;
      }
      const type = typeof val;
      if (type === "string") {
        return send(event, val, MIMES.html);
      } else if (isStream(val)) {
        return sendStream(event, val);
      } else if (val === null) {
        event.node.res.statusCode = 204;
        return send(event);
      } else if (type === "object" || type === "boolean" || type === "number") {
        if (val.buffer) {
          return send(event, val);
        } else if (val instanceof Error) {
          throw createError(val);
        } else {
          return send(
            event,
            JSON.stringify(val, void 0, spacing),
            MIMES.json
          );
        }
      }
    }
    if (!event.node.res.writableEnded) {
      throw createError({
        statusCode: 404,
        statusMessage: `Cannot find any route matching ${event.node.req.url || "/"}.`
      });
    }
  });
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      } else {
        if (error.unhandled || error.fatal) {
          console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
        }
        await sendError(event, error, !!app.options.debug);
      }
    }
  };
  return toNodeHandle;
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  router.handler = eventHandler((event) => {
    let path = event.node.req.url || "/";
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      if (opts.preemptive || opts.preemtive) {
        throw createError({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${event.node.req.url || "/"}.`
        });
      } else {
        return;
      }
    }
    const method = (event.node.req.method || "get").toLowerCase();
    const handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      throw createError({
        statusCode: 405,
        name: "Method Not Allowed",
        statusMessage: `Method ${method} is not allowed on this route.`
      });
    }
    const params = matched.params || {};
    event.context.params = params;
    return handler(event);
  });
  return router;
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  docus: {
    title: "Docus",
    description: "The best place to start your documentation.",
    image: "https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png",
    socials: {},
    layout: "default",
    header: {
      title: "",
      logo: false,
      showLinkIcon: false,
      fluid: false,
      exclude: []
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    footer: {
      credits: {
        icon: "IconDocus",
        text: "Powered by Docus",
        href: "https://docus.dev"
      },
      textLinks: [],
      iconLinks: [],
      fluid: false
    },
    github: {
      dir: void 0,
      branch: void 0,
      repo: void 0,
      owner: void 0,
      edit: false
    }
  }
});

const appConfig1 = defineAppConfig({
  prose: {
    copyButton: {
      iconCopy: "ph:copy",
      iconCopied: "ph:check"
    },
    headings: {
      icon: "ph:link"
    }
  }
});

const appConfig2 = defineAppConfig({});

const inlineAppConfig = {};

const appConfig = defuFn(appConfig0, appConfig1, appConfig2, inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{"TEMPLRJS_BASE_URL":"http://localhost:3000","SUPABASE_URL":"https://your_supabase_host.supabase.co","SUPABASE_STORAGE_URL":"https://your_supabase_host.supabase.co/storage/v1/object/public","content":{"locales":[],"defaultLocale":"","integrity":1682373264351,"experimental":{"stripQueryParameters":false,"clientDB":false},"api":{"baseURL":"/api/_content"},"navigation":{"fields":["icon","titleTemplate","header","main","aside","footer","layout"]},"tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"highlight":{"theme":{"dark":"github-dark","default":"github-light"},"preload":["json","js","ts","html","css","vue","diff","shell","markdown","yaml","bash","ini"]},"wsUrl":"","documentDriven":{"page":true,"navigation":true,"surround":true,"globals":{},"layoutFallbacks":["theme"],"injectPage":true},"host":"","trailingSlash":false,"anchorLinks":{"depth":4,"exclude":[1]}},"supabase":{"url":"https://your_supabase_host.supabase.co","key":"your_supabase_key","client":{},"redirect":false,"cookies":{"name":"sb","lifetime":28800,"domain":"","path":"/","sameSite":"lax"}},"github":{"api":"https://api.github.com","owner":"","branch":"main","repo":"","disableCache":false,"parseContents":true,"maxContributors":100},"studio":{"apiURL":"https://api.nuxt.studio"}},"GOOGLE_MAP_TOKEN":"","content":{"cacheVersion":2,"cacheIntegrity":"l08ig8BKLQ","transformers":[],"base":"","api":{"baseURL":"/api/_content"},"watch":{"ws":{"port":{"port":4000,"portRange":[4000,4040]},"hostname":"localhost","showURL":false}},"sources":{},"ignores":["\\.","-"],"locales":[],"defaultLocale":"","highlight":{"theme":{"dark":"github-dark","default":"github-light"},"preload":["json","js","ts","html","css","vue","diff","shell","markdown","yaml","bash","ini"]},"markdown":{"tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"anchorLinks":{"depth":4,"exclude":[1]},"remarkPlugins":{},"rehypePlugins":{}},"yaml":{},"csv":{"delimeter":",","json":true},"navigation":{"fields":["icon","titleTemplate","header","main","aside","footer","layout"]},"documentDriven":true,"experimental":{"clientDB":false,"stripQueryParameters":false}},"supabase":{"serviceKey":""},"github":{"api":"https://api.github.com","owner":"","branch":"main","repo":"","disableCache":false,"parseContents":true,"maxContributors":100},"studio":{},"pinceau":{"studio":true,"outputDir":"/Users/nathansweb/senthilsweb/templrjs/.nuxt/pinceau/"},"appConfigSchema":{"properties":{"id":"#appConfig","properties":{"prose":{"title":"Prose configuration from Nuxt Typography","description":"","tags":["@studioIcon material-symbols:short-text-rounded","@studioInput icon"],"id":"#appConfig/prose","properties":{"copyButton":{"title":"Copy button (used in code blocks)","description":"","tags":["@studioIcon material-symbols:content-copy"],"id":"#appConfig/prose/copyButton","properties":{"iconCopy":{"title":"Icon displayed to copy","description":"","tags":[],"id":"#appConfig/prose/copyButton/iconCopy","default":"ph:copy","type":"string"},"iconCopied":{"title":"Icon displayed when copied","description":"","tags":[],"id":"#appConfig/prose/copyButton/iconCopied","default":"ph:check","type":"string"}},"type":"object","default":{"iconCopy":"ph:copy","iconCopied":"ph:check"}},"headings":{"title":"Default configuration for all headings (h1, h2, h3, h4, h5 and h6)","description":"","tags":["@studioIcon material-symbols:title"],"id":"#appConfig/prose/headings","properties":{"icon":{"title":"Default icon for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/headings/icon","default":"ph:link","type":"string"}},"type":"object","default":{"icon":"ph:link"}},"h1":{"title":"First heading configuration","description":"","tags":["@studioIcon material-symbols:format-h1"],"id":"#appConfig/prose/h1","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h1/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h2":{"title":"Second heading configuration","description":"","tags":["@studioIcon material-symbols:format-h2"],"id":"#appConfig/prose/h2","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h2/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h3":{"title":"Third heading configuration","description":"","tags":["@studioIcon material-symbols:format-h3"],"id":"#appConfig/prose/h3","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h3/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h4":{"title":"Fourth heading configuration","description":"","tags":["@studioIcon material-symbols:format-h4"],"id":"#appConfig/prose/h4","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h4/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h5":{"title":"Fifth heading configuration","description":"","tags":["@studioIcon material-symbols:format-h5"],"id":"#appConfig/prose/h5","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h5/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h6":{"title":"Sixth heading configuration","description":"","tags":["@studioIcon material-symbols:format-h6"],"id":"#appConfig/prose/h6","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h6/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}}},"type":"object","default":{"copyButton":{"iconCopy":"ph:copy","iconCopied":"ph:check"},"headings":{"icon":"ph:link"},"h1":{"icon":""},"h2":{"icon":""},"h3":{"icon":""},"h4":{"icon":""},"h5":{"icon":""},"h6":{"icon":""}}},"docus":{"title":"Docus theme configuration.","description":"","tags":["@studioIcon material-symbols:docs"],"id":"#appConfig/docus","properties":{"title":{"title":"Website title, used as header default title and meta title.","description":"","tags":["@studioIcon material-symbols:title"],"id":"#appConfig/docus/title","default":"Docus","type":"string"},"titleTemplate":{"title":"The website title template, to overwrite the default one.","description":"","tags":[],"id":"#appConfig/docus/titleTemplate","default":"%s · Docus","type":"string"},"description":{"title":"Website description, used for meta description.","description":"","tags":["@studioIcon material-symbols:description"],"id":"#appConfig/docus/description","default":"The best place to start your documentation.","type":"string"},"image":{"title":"Cover image.","description":"","tags":["@example '/cover.jpg'","@studioIcon dashicons:cover-image","@studioInput file"],"id":"#appConfig/docus/image","default":"https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png","type":"string"},"socials":{"title":"Social links","description":"Will be used in AppSocialIcons component.","tags":["@studioIcon material-symbols:share-outline"],"id":"#appConfig/docus/socials","properties":{"twitter":{"title":"Twitter social handle","description":"","tags":["@example 'nuxt_js'","@studioIcon simple-icons:twitter"],"id":"#appConfig/docus/socials/twitter","default":"","type":"string"},"github":{"title":"GitHub org or repository","description":"","tags":["@example 'nuxt/framework'","@studioIcon simple-icons:github"],"id":"#appConfig/docus/socials/github","default":"","type":"string"},"facebook":{"title":"Facebook page url","description":"","tags":["@example https://www.facebook.com/groups/nuxtjs","@studioIcon simple-icons:facebook"],"id":"#appConfig/docus/socials/facebook","default":"","type":"string"},"instagram":{"title":"Instagram page url","description":"","tags":["@example https://www.instagram.com/wearenuxt","@studioIcon simple-icons:instagram"],"id":"#appConfig/docus/socials/instagram","default":"","type":"string"},"youtube":{"title":"Instagram page url","description":"","tags":["@example https://www.youtube.com/@NuxtLabs","@studioIcon simple-icons:youtube"],"id":"#appConfig/docus/socials/youtube","default":"","type":"string"},"medium":{"title":"Medium page url","description":"","tags":["@example https://medium.com/nuxt","@studioIcon simple-icons:medium"],"id":"#appConfig/docus/socials/medium","default":"","type":"string"}},"type":"object","default":{"twitter":"","github":"","facebook":"","instagram":"","youtube":"","medium":""}},"layout":{"title":"Theme layout configuration.","description":"","tags":["@studioIcon tabler:arrow-autofit-width"],"tsType":"'default'|'page'","id":"#appConfig/docus/layout","default":"default","type":"string"},"aside":{"title":"Aside navigation configuration.","description":"","tags":["@studioIcon fluent:document-page-24-regular"],"id":"#appConfig/docus/aside","properties":{"level":{"title":"Aside navigation level","description":"Use 0 to disable all nesting. Use 1 and more to display nested navigation in header and aside navigation.","tags":[],"id":"#appConfig/docus/aside/level","default":0,"type":"number"},"collapsed":{"title":"Specify if default collapsibles state globally for aside navigation.","description":"","tags":[],"id":"#appConfig/docus/aside/collapsed","default":false,"type":"boolean"},"exclude":{"title":"Paths to be excluded from aside navigation.","description":"","tags":[],"tsType":"string[]","id":"#appConfig/docus/aside/exclude","default":[],"type":"array","items":{"type":"any"}}},"type":"object","default":{"level":0,"collapsed":false,"exclude":[]}},"header":{"title":"Header configuration.","description":"","tags":["@studioIcon fluent:document-header-24-regular"],"id":"#appConfig/docus/header","properties":{"title":{"title":"Website title","description":"Title to be displayed in header or as aria-label if logo is defined.\nDefault to docus.title","tags":["@studioIcon material-symbols:title"],"id":"#appConfig/docus/header/title","default":"","type":"string"},"logo":{"title":"Logo configuration","description":"Boolean to disable or use the `Logo.vue` component.\nString to be used as a name of a component.","tags":["@example 'MyLogo'","@studioInput boolean"],"id":"#appConfig/docus/header/logo","default":false,"type":"boolean"},"showLinkIcon":{"title":"Header links","description":"Toggle links icons in the header.","tags":[],"id":"#appConfig/docus/header/showLinkIcon","default":false,"type":"boolean"},"exclude":{"title":"Paths to be excluded from header links.","description":"","tags":[],"tsType":"string[]","id":"#appConfig/docus/header/exclude","default":[],"type":"array","items":{"type":"any"}},"fluid":{"title":"Makes the content of the header fluid.","description":"","tags":[],"id":"#appConfig/docus/header/fluid","default":false,"type":"boolean"}},"type":"object","default":{"title":"","logo":false,"showLinkIcon":false,"exclude":[],"fluid":false}},"main":{"title":"Main content configuration.","description":"","tags":["@studioIcon fluent:document-header-footer-24-filled"],"id":"#appConfig/docus/main","properties":{"fluid":{"title":"Makes the content of the main container fluid.","description":"","tags":[],"id":"#appConfig/docus/main/fluid","default":false,"type":"boolean"},"padded":{"title":"Makes the content of the main container padded.","description":"","tags":[],"id":"#appConfig/docus/main/padded","default":true,"type":"boolean"}},"type":"object","default":{"fluid":false,"padded":true}},"footer":{"title":"Footer configuration","description":"","tags":["@studioIcon fluent:document-footer-24-regular"],"id":"#appConfig/docus/footer","properties":{"credits":{"title":"Website credits configuration.","description":"","tags":["@studioIcon material-symbols:copyright"],"tsType":"false|{icon: string, text: string, href: string}","id":"#appConfig/docus/footer/credits","properties":{"icon":{"title":"Icon to show on credits","description":"","tags":["@formtype Icon"],"id":"#appConfig/docus/footer/credits/icon","default":"IconDocus","type":"string"},"text":{"type":"string","id":"#appConfig/docus/footer/credits/text","default":"Powered by Docus"},"href":{"type":"string","id":"#appConfig/docus/footer/credits/href","default":"https://docus.dev"}},"type":"object","default":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"}},"textLinks":{"type":"array","items":{"type":"object","required":["text","href"],"properties":{"href":{"type":"string","description":"URL when clicking the link"},"text":{"type":"string","description":"Text of the link"},"target":{"type":"string","description":"Target attribute of the link"}}},"title":"Text links","description":"Will be added into center section of the footer.","tags":["@studioIcon material-symbols:add-link"],"id":"#appConfig/docus/footer/textLinks"},"iconLinks":{"type":"array","items":{"type":"object","required":["icon","href"],"properties":{"icon":{"type":"string","description":"Icon name"},"href":{"type":"string","description":"Link when clicking on the icon"},"label":{"type":"string","description":"Label of the icon"}}},"title":"Icon links","description":"Icons to be added to Social Icons in footer.","tags":["@studioIcon material-symbols:add-link"],"id":"#appConfig/docus/footer/iconLinks"},"fluid":{"title":"Makes the content of the footer fluid.","description":"","tags":[],"id":"#appConfig/docus/footer/fluid","default":true,"type":"boolean"}},"type":"object","default":{"credits":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"},"fluid":true}},"github":{"title":"GitHub integration","description":"Configure the Edit on Github integration.","tags":["@studioIcon simple-icons:github"],"id":"#appConfig/docus/github","properties":{"dir":{"title":"Directory","description":"Your GitHub repository root directory.","tags":[],"id":"#appConfig/docus/github/dir","default":"","type":"string"},"branch":{"title":"Branch","description":"Your GitHub repository branch.","tags":[],"id":"#appConfig/docus/github/branch","default":"","type":"string"},"repo":{"title":"Repository","description":"Your GitHub repository name.","tags":[],"id":"#appConfig/docus/github/repo","default":"","type":"string"},"owner":{"title":"Owner","description":"Your GitHub repository owner.","tags":[],"id":"#appConfig/docus/github/owner","default":"","type":"string"},"edit":{"title":"EditOnGithub","description":"Display EditOnGithub button.","tags":[],"id":"#appConfig/docus/github/edit","default":false,"type":"boolean"}},"type":"object","default":{"dir":"","branch":"","repo":"","owner":"","edit":false}}},"type":"object","default":{"title":"Docus","titleTemplate":"%s · Docus","description":"The best place to start your documentation.","image":"https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png","socials":{"twitter":"","github":"","facebook":"","instagram":"","youtube":"","medium":""},"layout":"default","aside":{"level":0,"collapsed":false,"exclude":[]},"header":{"title":"","logo":false,"showLinkIcon":false,"exclude":[],"fluid":false},"main":{"fluid":false,"padded":true},"footer":{"credits":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"},"fluid":true},"github":{"dir":"","branch":"","repo":"","owner":"","edit":false}}}},"type":"object","default":{"prose":{"copyButton":{"iconCopy":"ph:copy","iconCopied":"ph:check"},"headings":{"icon":"ph:link"},"h1":{"icon":""},"h2":{"icon":""},"h3":{"icon":""},"h4":{"icon":""},"h5":{"icon":""},"h6":{"icon":""}},"docus":{"title":"Docus","titleTemplate":"%s · Docus","description":"The best place to start your documentation.","image":"https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png","socials":{"twitter":"","github":"","facebook":"","instagram":"","youtube":"","medium":""},"layout":"default","aside":{"level":0,"collapsed":false,"exclude":[]},"header":{"title":"","logo":false,"showLinkIcon":false,"exclude":[],"fluid":false},"main":{"fluid":false,"padded":true},"footer":{"credits":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"},"fluid":true},"github":{"dir":"","branch":"","repo":"","owner":"","edit":false}}}},"default":{"prose":{"copyButton":{"iconCopy":"ph:copy","iconCopied":"ph:check"},"headings":{"icon":"ph:link"},"h1":{"icon":""},"h2":{"icon":""},"h3":{"icon":""},"h4":{"icon":""},"h5":{"icon":""},"h6":{"icon":""}},"docus":{"title":"Docus","titleTemplate":"%s · Docus","description":"The best place to start your documentation.","image":"https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png","socials":{"twitter":"","github":"","facebook":"","instagram":"","youtube":"","medium":""},"layout":"default","aside":{"level":0,"collapsed":false,"exclude":[]},"header":{"title":"","logo":false,"showLinkIcon":false,"exclude":[],"fluid":false},"main":{"fluid":false,"padded":true},"footer":{"credits":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"},"fluid":true},"github":{"dir":"","branch":"","repo":"","owner":"","edit":false}}}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig$1(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function isObject$1(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig$1(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject$1(obj[key])) {
      if (isObject$1(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig$1(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {
  ["nitro:bundled:pinceau:index.css"]: {
    import: () => import('../raw/index.mjs').then(r => r.default || r),
    meta: {"type":"text/css; charset=utf-8","etag":"\"62f7-eJImC3DZM08ejOUQDoIdP9q3iv0\"","mtime":"2023-04-24T21:57:52.223Z"}
  },
  ["nitro:bundled:cache:content:content-index.json"]: {
    import: () => import('../raw/content-index.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"125a-NEVJ0vKWVZ9HwUqUaLyMxJzVS74\"","mtime":"2023-04-24T21:57:52.224Z"}
  },
  ["nitro:bundled:cache:content:content-navigation.json"]: {
    import: () => import('../raw/content-navigation.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"363-GVsEBLHmPMt8YPBadDPlFl8BMXQ\"","mtime":"2023-04-24T21:57:52.224Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:0.index.md"]: {
    import: () => import('../raw/0.index.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"158f-L4no/Yrp6BfShGdgJiUcii3JLRI\"","mtime":"2023-04-24T21:57:52.229Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:architecture.md"]: {
    import: () => import('../raw/architecture.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"189f-KKo/6YxIcCj4l1F7PG1nvZrOxTQ\"","mtime":"2023-04-24T21:57:52.225Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.Introduction:1.setup.md"]: {
    import: () => import('../raw/1.setup.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3980-KYVXk7Y3cHiPX5UeMvkxEx2C124\"","mtime":"2023-04-24T21:57:52.234Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.Introduction:2.options.md"]: {
    import: () => import('../raw/2.options.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"87d4-ZIPlvsPsAzzt5z7aTSUC01W0YN8\"","mtime":"2023-04-24T21:57:52.232Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.Introduction:_dir.yml"]: {
    import: () => import('../raw/_dir.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"143-7f5ylRxYXUfv+HO3QoOW83jXO1w\"","mtime":"2023-04-24T21:57:52.234Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_letters:_confirmation-of-kattalai.md"]: {
    import: () => import('../raw/_confirmation-of-kattalai.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"6f9-QM7zLKJk4YrjtLN8qfZ6BTcgLaM\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_letters:_dir.yml"]: {
    import: () => import('../raw/_dir2.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"10c-jffQQfBYhgVIszubzihEcTnIeec\"","mtime":"2023-04-24T21:57:52.225Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:_dir.yml"]: {
    import: () => import('../raw/_dir3.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"118-gWB/dconkKgy4xnxljCNlSQ9E+o\"","mtime":"2023-04-24T21:57:52.234Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:clients.json"]: {
    import: () => import('../raw/clients.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"1be-tKBQA7NJhd94H0mY52Wl/zydSTs\"","mtime":"2023-04-24T21:57:52.234Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:countries.json"]: {
    import: () => import('../raw/countries.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"e2e7-NAUtTjHnGl2ehSgd5DJTWuhIqas\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:departments.json"]: {
    import: () => import('../raw/departments.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"20a-BCkwPDL2MraLl6aUdv7D/5Gd+1g\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:employees.json"]: {
    import: () => import('../raw/employees.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"5f4-0yGcwKDHl8x4Iu6MBoEZ3D8TG2I\"","mtime":"2023-04-24T21:57:52.224Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:heroicons.json"]: {
    import: () => import('../raw/heroicons.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"2032-DZaXn8GEYibxDfHfvJlCjEskNd0\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:properties.json"]: {
    import: () => import('../raw/properties.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"36b-9HpDswPUY8cZfBhL5JP5EBtCVi4\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:roles.json"]: {
    import: () => import('../raw/roles.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"24e-GRDaJClM3Xv+RgG8k1UlmfZlAkQ\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_masters-db:setups-link.json"]: {
    import: () => import('../raw/setups-link.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"a63-t5adAaZlSqPO8II3czGsiBhR6p4\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:accounting.json"]: {
    import: () => import('../raw/accounting.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"352-BiXtNLguM5Vur5UtHDGM0ZWeAtA\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:carousel.json"]: {
    import: () => import('../raw/carousel.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"488-Q5BzM7X7QyjQt3mBGJB5XboeOMM\"","mtime":"2023-04-24T21:57:52.225Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:crm.json"]: {
    import: () => import('../raw/crm.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"366-OlhPCtmDV4GAfCsH1PfuFBx8LAU\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:designer-navs.json"]: {
    import: () => import('../raw/designer-navs.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"28e-fCFwxJfrKLyo0aM+2MEkUiE2q4U\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:footer-support-nav.json"]: {
    import: () => import('../raw/footer-support-nav.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"64d-dc5GKxkRL8LbyVkQyllDlFDB4ME\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:iam.json"]: {
    import: () => import('../raw/iam.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"516-kMA1bB7LYz0htenzcQLlg6v9AW4\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:navigation-navs.json"]: {
    import: () => import('../raw/navigation-navs.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"2d2-DgySE5fxsNUJy/hVUFQNciTyJu8\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:notification-channels.json"]: {
    import: () => import('../raw/notification-channels.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"625-UkjOfHfXOx7TUEFlX2xFdTkUqG4\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:organization.json"]: {
    import: () => import('../raw/organization.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"91b-QMgOotAHraTeN5Ekjcj1RDU0FIk\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:products.json"]: {
    import: () => import('../raw/products.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"385-rvKrf0bG55cP0l0Z3vDjLnVPZ8I\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:profile.json"]: {
    import: () => import('../raw/profile.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"426-Cx8IDMS4eHRxEtcike4UeP4AseM\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:sales.json"]: {
    import: () => import('../raw/sales.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"368-id6Zva4gPopWog0yMFKlRE4+XMk\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:setups.json"]: {
    import: () => import('../raw/setups.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"7e5-SnRzNnmA0tj46yll3YsGdCMNcQ0\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:site-navs.json"]: {
    import: () => import('../raw/site-navs.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"1b26-OOxvu2LUm3hm3g+b+Bouc8xhEdI\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:test-bench.json"]: {
    import: () => import('../raw/test-bench.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"4d6-IHWKJk/bad+3PClbnemZjDK6I5E\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_navigation:things.json"]: {
    import: () => import('../raw/things.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"4c1-YivT2uZBZGVOUN5Jx1Ya+S6NSFQ\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_stats:_dir.yml"]: {
    import: () => import('../raw/_dir4.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"104-SY7c6BjORIR4IkH/61anfGtSVOU\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:_stats:dashboard-stats.json"]: {
    import: () => import('../raw/dashboard-stats.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"4b1-YAZDyFTW72+SHFmPTM8QaQlE2bg\"","mtime":"2023-04-24T21:57:52.225Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:blog:_dir.yml"]: {
    import: () => import('../raw/_dir5.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"fc-nv/HugGCNNPCjjqrPN26uozvUO8\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:blog:blog.md"]: {
    import: () => import('../raw/blog.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"252a-4/d6gH9SdtmLb6ZodISuuhuCk+0\"","mtime":"2023-04-24T21:57:52.226Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:1.getting-started.md"]: {
    import: () => import('../raw/1.getting-started.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3f67-pgrYMYVzeNXZgJWNR/7ppNPdyT4\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:2.development-environment.md"]: {
    import: () => import('../raw/2.development-environment.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"8140-rPpB5GIiZkVFzUZVzimBba7A3x4\"","mtime":"2023-04-24T21:57:52.227Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:3.architecture.md"]: {
    import: () => import('../raw/3.architecture.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"15f7-zsXWb6JAHjCuh3eMucXahTUBlgQ\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:4.db-model.md"]: {
    import: () => import('../raw/4.db-model.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1535f-V1eu24dd3ysa2jXqZWjVsACUHD4\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:5.application-configuration.md"]: {
    import: () => import('../raw/5.application-configuration.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"601c-XWlzwy+gQ3UN6SZq1LwNIvMLhw8\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:6.deployment.md"]: {
    import: () => import('../raw/6.deployment.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1f4-whf2hPybYF0WCVjiyetAcSyBgjk\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:7.backup-and-restore.md"]: {
    import: () => import('../raw/7.backup-and-restore.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"42b3-Giy6t40MMK3BYHn3NNBUcafnFA4\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:8.db-init-sql-scripts.md"]: {
    import: () => import('../raw/8.db-init-sql-scripts.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"398-Z81n+PMG1jhWuLNl4U82ATAbVHk\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs:regex.js"]: {
    import: () => import('../raw/regex.mjs').then(r => r.default || r),
    meta: {"type":"application/javascript","etag":"\"4a-161MZUjZKf7N54FkurVVuvisI3I\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:_dir.yml"]: {
    import: () => import('../raw/_dir6.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"108-lg0va/7wmt5x5Uxw8DgmclHJ97c\"","mtime":"2023-04-24T21:57:52.228Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:architecture-guide.md"]: {
    import: () => import('../raw/architecture-guide.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3a3a-UxQbJ5s82HIiQ16Ny2Oyo9klopk\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:basics-of-time-travel.md"]: {
    import: () => import('../raw/basics-of-time-travel.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e55-3JEFR3WbfVWS39Tyi0iDvJawdM4\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:cacheadvance-flush.md"]: {
    import: () => import('../raw/cacheadvance-flush.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e4b-nyDfxUu8j3JH6KAtQ2FvuFR2Hc0\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:cacheadvance-predict.md"]: {
    import: () => import('../raw/cacheadvance-predict.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e53-LGDnl8gy8qbo/tdoA2UCR/9QcQc\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:cacheadvance-regret.md"]: {
    import: () => import('../raw/cacheadvance-regret.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e4f-KE1m/HMDSu4psUR/WRhkBWcEMmg\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:cacheadvance-revert.md"]: {
    import: () => import('../raw/cacheadvance-revert.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e4f-kVm4jO4a9rKpbrmGqLq96pmwW4s\"","mtime":"2023-04-24T21:57:52.232Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:compile-time-caching.md"]: {
    import: () => import('../raw/compile-time-caching.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e51-VZSmtR/KLUozkTYBfquHSs2ppls\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:design-principles.md"]: {
    import: () => import('../raw/design-principles.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e45-YxNmAC/TEd8hilcqUZ/TJPlv0Go\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:getting-started.md"]: {
    import: () => import('../raw/getting-started.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"6dd2-T9cgI4yDyyIFLMml6KVwIv6BoM0\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:how-to-contribute.md"]: {
    import: () => import('../raw/how-to-contribute.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e45-9Un9Q+6ej7XGiPadK+hXB1G3nqY\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:installation.md"]: {
    import: () => import('../raw/installation.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e31-Vstcf5yURKW+xDtRMhd0DwwLWlY\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:introduction-to-string-theory.md"]: {
    import: () => import('../raw/introduction-to-string-theory.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e74-9cWiZ27r7iTKlQWXd7f6aJbsh8k\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:neuralink-integration.md"]: {
    import: () => import('../raw/neuralink-integration.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e55-f06DcumoUM5uE+YwqcvYU/4fiQA\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:predicting-user-behavior.md"]: {
    import: () => import('../raw/predicting-user-behavior.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e61-tFTU+b0YYhcEragfaq5V9JzruI0\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:predictive-data-generation.md"]: {
    import: () => import('../raw/predictive-data-generation.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e69-L/vDbovYNOKCXQqyL5YnWHKQPJM\"","mtime":"2023-04-24T21:57:52.232Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:temporal-paradoxes.md"]: {
    import: () => import('../raw/temporal-paradoxes.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e49-UGNmOMqIZEI1QWK9Zto4Ne4qCIU\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:testing.md"]: {
    import: () => import('../raw/testing.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e1d-hg/rk/l8geg6bZ1El6Ja7GzVBQE\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:the-butterfly-effect.md"]: {
    import: () => import('../raw/the-butterfly-effect.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e51-OUBtOIMYeOqikd99QELFZKJmRxM\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:understanding-caching.md"]: {
    import: () => import('../raw/understanding-caching.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e55-FtykPlBgRVEcBWJ/EUePzmgG9Lc\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:website-settings.md"]: {
    import: () => import('../raw/website-settings.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"39f5-5IKqJb2aD0UygbsRHch0uWu/svI\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:docs_bk:writing-plugins.md"]: {
    import: () => import('../raw/writing-plugins.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e3d-1CrXqZZ9ItBLUttX2Sq4DrEXGqM\"","mtime":"2023-04-24T21:57:52.231Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:instructors:_dir.yml"]: {
    import: () => import('../raw/_dir7.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"118-P2KCBi8KOPTX64C2tFcXQ/xEpEk\"","mtime":"2023-04-24T21:57:52.227Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:instructors:bhargavi.json"]: {
    import: () => import('../raw/bhargavi.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"52e-P+C4MywJ41GbMJFgramxs844DFo\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:instructors:sangeetha.json"]: {
    import: () => import('../raw/sangeetha.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"8d8-tKwffIpiX/AvcEnxslNjIWLcQz4\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:instructors:santoshi.json"]: {
    import: () => import('../raw/santoshi.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"2b4-+6uSLLiz5KrNKC9U0UFRKpCPrbM\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:instructors:tamara.json"]: {
    import: () => import('../raw/tamara.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"9a7-+7aEMGwPN/gBv77PbI6hTvwvOQA\"","mtime":"2023-04-24T21:57:52.230Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:legal:_dir.yml"]: {
    import: () => import('../raw/_dir8.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"100-CBU8kywKpKsX46YUdWewZumb5uE\"","mtime":"2023-04-24T21:57:52.227Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:legal:tc.md"]: {
    import: () => import('../raw/tc.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2440-XrPQurDuwzwqX4gv52stw3Ujkpw\"","mtime":"2023-04-24T21:57:52.230Z"}
  }
};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('cms', unstorage_47drivers_47cloudflare_45kv_45http({"driver":"cloudflare-kv-http","accountId":"4ab70cb705b6c844de6565161cd09b11","namespaceId":"34a3c98ce2a54164ae258f365fdd5c46","email":"nathansweb@icloud.com","apiKey":"11d03bdf02f6e55d539ac8bbcd7bc439da5e1"}));

const bundledStorage = ["/cache/content","pinceau"];
for (const base of bundledStorage) {
  storage.mount(base, overlay({
    layers: [
      memory$1(),
      // TODO
      // prefixStorage(storage, base),
      prefixStorage(storage, 'assets:nitro:bundled:' + base)
    ]
  }));
}

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config$1.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const nitro = (async function(nitro) {
  nitro.hooks.hook("render:html", async (htmlContext, { event }) => {
    const theme = await useStorage().getItem("pinceau:index.css");
    const pinceauContent = event?.pinceauContent || { theme: void 0, runtime: void 0 };
    if (!theme?.runtime) {
      htmlContext.head.splice(2, 0, `<style id="pinceau-runtime-hydratable">${pinceauContent.runtime}</style>`);
    }
    if (!theme?.theme) {
      htmlContext.head.splice(2, 0, `<style id="pinceau-theme">${theme}</style>`);
    }
  });
});

const script = "\"use strict\";const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"\",t=\"theme\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"\",t=\"theme\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _fLQnvMei9K = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  nitro,
_fLQnvMei9K
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-KhUwhJZJegodU+KE1auz30x/OvM\"",
    "mtime": "2023-04-24T21:56:58.353Z",
    "size": 8196,
    "path": "../public/.DS_Store"
  },
  "/__studio.json": {
    "type": "application/json",
    "etag": "\"b290-QWLNextGXmh7DEb4csX4src0zDY\"",
    "mtime": "2023-04-24T21:57:51.921Z",
    "size": 45712,
    "path": "../public/__studio.json"
  },
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"1d80-Le8/AeckWyc585dqXYDJ8F/tJ1E\"",
    "mtime": "2023-04-24T21:56:58.341Z",
    "size": 7552,
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"8753-U7HP8ASkbsor2QEreNQFFnn8trU\"",
    "mtime": "2023-04-24T21:56:58.335Z",
    "size": 34643,
    "path": "../public/android-chrome-512x512.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"1a33-kCzpVQ9H4xA2fh7vBS4WNPmyplg\"",
    "mtime": "2023-04-24T21:56:58.334Z",
    "size": 6707,
    "path": "../public/apple-touch-icon.png"
  },
  "/browserconfig.xml": {
    "type": "application/xml",
    "etag": "\"119-hTOJtsQnOWWJnrEwLWZeuROV/Qw\"",
    "mtime": "2023-04-24T21:56:58.333Z",
    "size": 281,
    "path": "../public/browserconfig.xml"
  },
  "/child_nav copy.json": {
    "type": "application/json",
    "etag": "\"3820-zQQMx7F4OTxOuWD0/0XFMBoRAzU\"",
    "mtime": "2023-04-24T21:56:58.332Z",
    "size": 14368,
    "path": "../public/child_nav copy.json"
  },
  "/child_nav.json": {
    "type": "application/json",
    "etag": "\"20f5-jCxSk1IEJVS3CmOn24djuEvPhBw\"",
    "mtime": "2023-04-24T21:56:58.331Z",
    "size": 8437,
    "path": "../public/child_nav.json"
  },
  "/company.json": {
    "type": "application/json",
    "etag": "\"444-oM/OgTmwkdDvKaOhbhJAUhjLXKo\"",
    "mtime": "2023-04-24T21:56:58.330Z",
    "size": 1092,
    "path": "../public/company.json"
  },
  "/countries.json": {
    "type": "application/json",
    "etag": "\"51e5-4CDCdbXhkgDzu2lkArzOuKbWBgM\"",
    "mtime": "2023-04-24T21:56:58.329Z",
    "size": 20965,
    "path": "../public/countries.json"
  },
  "/cover.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b4567-q8vnXAo8+cTQwvnkPQE5FesU7KA\"",
    "mtime": "2023-04-24T21:56:58.328Z",
    "size": 2835815,
    "path": "../public/cover.jpg"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"17a-A1E1Qhyv2DKOGezcY2wTGBPF56A\"",
    "mtime": "2023-04-24T21:56:58.180Z",
    "size": 378,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"27a-KdGbftMJoYPgcKz4cFOYfn31dPk\"",
    "mtime": "2023-04-24T21:56:58.179Z",
    "size": 634,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-hmhs6rq+Hhm4XrmEObEBkldF+6k\"",
    "mtime": "2023-04-24T21:56:58.178Z",
    "size": 15406,
    "path": "../public/favicon.ico"
  },
  "/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"1757-C/SXv2AD6VmMpoOVMRabWAzHbF0\"",
    "mtime": "2023-04-24T21:56:58.172Z",
    "size": 5975,
    "path": "../public/logo.svg"
  },
  "/manifest.json": {
    "type": "application/json",
    "etag": "\"2d0-0R/r+ecIqeEbruN+19xemZAlgL4\"",
    "mtime": "2023-04-24T21:56:58.171Z",
    "size": 720,
    "path": "../public/manifest.json"
  },
  "/parent_nav copy.json": {
    "type": "application/json",
    "etag": "\"355e-50WSY6pY65IGCrtOdurD3jaYVw4\"",
    "mtime": "2023-04-24T21:56:58.170Z",
    "size": 13662,
    "path": "../public/parent_nav copy.json"
  },
  "/parent_nav.json": {
    "type": "application/json",
    "etag": "\"3587-v0zvIqj8+PNsNMIZbMvR2MKJ0yI\"",
    "mtime": "2023-04-24T21:56:58.169Z",
    "size": 13703,
    "path": "../public/parent_nav.json"
  },
  "/properties.json": {
    "type": "application/json",
    "etag": "\"1ab4-kplkPMNXQEybZ1zk2Uu7WDckCKM\"",
    "mtime": "2023-04-24T21:56:58.168Z",
    "size": 6836,
    "path": "../public/properties.json"
  },
  "/site.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"1b1-7ZCZwOkvqxiPYHBF5/DobN2RVZo\"",
    "mtime": "2023-04-24T21:56:58.163Z",
    "size": 433,
    "path": "../public/site.webmanifest"
  },
  "/_nuxt/Account.6c4d0876.js": {
    "type": "application/javascript",
    "etag": "\"b02-y1ZfDCG/yAfHa56L8n37msEbAb0\"",
    "mtime": "2023-04-24T21:56:58.162Z",
    "size": 2818,
    "path": "../public/_nuxt/Account.6c4d0876.js"
  },
  "/_nuxt/AccountPageHeader.43da39f6.js": {
    "type": "application/javascript",
    "etag": "\"46d-5pN4DkNZGPL8bU/WIA4SIeKJ4lU\"",
    "mtime": "2023-04-24T21:56:58.161Z",
    "size": 1133,
    "path": "../public/_nuxt/AccountPageHeader.43da39f6.js"
  },
  "/_nuxt/Alert.361f0899.js": {
    "type": "application/javascript",
    "etag": "\"25b-28dxn+sOiNIUIsvRsYBZJIYVH6A\"",
    "mtime": "2023-04-24T21:56:58.161Z",
    "size": 603,
    "path": "../public/_nuxt/Alert.361f0899.js"
  },
  "/_nuxt/Alert.f24f4058.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a16-VRNQaIyOAuOBb3PXRl6WhnRkudc\"",
    "mtime": "2023-04-24T21:56:58.161Z",
    "size": 6678,
    "path": "../public/_nuxt/Alert.f24f4058.css"
  },
  "/_nuxt/AppFooter.9a2581e0.js": {
    "type": "application/javascript",
    "etag": "\"982-SpdilNGOzgO4AVeOSL/CNu3UpqM\"",
    "mtime": "2023-04-24T21:56:58.160Z",
    "size": 2434,
    "path": "../public/_nuxt/AppFooter.9a2581e0.js"
  },
  "/_nuxt/AppFooter.d9da4c47.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"90a-Lc61rN3cPfDVC0adGTwZa+xMOhQ\"",
    "mtime": "2023-04-24T21:56:58.160Z",
    "size": 2314,
    "path": "../public/_nuxt/AppFooter.d9da4c47.css"
  },
  "/_nuxt/AppHeader.4a243a79.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b2-r02+CPFN7bhK/XB6uJMQFjvI1p4\"",
    "mtime": "2023-04-24T21:56:58.159Z",
    "size": 1458,
    "path": "../public/_nuxt/AppHeader.4a243a79.css"
  },
  "/_nuxt/AppHeader.a85b999e.js": {
    "type": "application/javascript",
    "etag": "\"7dd-TOed0xd3OLeJFQEVvQIgeVa6RD0\"",
    "mtime": "2023-04-24T21:56:58.159Z",
    "size": 2013,
    "path": "../public/_nuxt/AppHeader.a85b999e.js"
  },
  "/_nuxt/AppHeaderDialog.79842f4f.js": {
    "type": "application/javascript",
    "etag": "\"621-9pGGjzC0qUVRH14Qg4ozEs7EqTo\"",
    "mtime": "2023-04-24T21:56:58.158Z",
    "size": 1569,
    "path": "../public/_nuxt/AppHeaderDialog.79842f4f.js"
  },
  "/_nuxt/AppHeaderDialog.cbeb060a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61c-3AJdDPBsgCOsNAKmcSay/nZt9So\"",
    "mtime": "2023-04-24T21:56:58.158Z",
    "size": 1564,
    "path": "../public/_nuxt/AppHeaderDialog.cbeb060a.css"
  },
  "/_nuxt/AppHeaderLogo.2c6ca093.js": {
    "type": "application/javascript",
    "etag": "\"385-0Ioub6+smdSKwy9HAx3EWkSm4tE\"",
    "mtime": "2023-04-24T21:56:58.157Z",
    "size": 901,
    "path": "../public/_nuxt/AppHeaderLogo.2c6ca093.js"
  },
  "/_nuxt/AppHeaderLogo.44fb35fd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"12b-47y9pKIMv8c2eabWNc3TzL4l57k\"",
    "mtime": "2023-04-24T21:56:58.157Z",
    "size": 299,
    "path": "../public/_nuxt/AppHeaderLogo.44fb35fd.css"
  },
  "/_nuxt/AppHeaderNavigation.14b5f96e.js": {
    "type": "application/javascript",
    "etag": "\"51b-POrSt2JnnVq7HXZtJgddiK0nW2k\"",
    "mtime": "2023-04-24T21:56:58.156Z",
    "size": 1307,
    "path": "../public/_nuxt/AppHeaderNavigation.14b5f96e.js"
  },
  "/_nuxt/AppHeaderNavigation.3c8937f5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"44a-AwybalLZ6JAE4MwtAoaP6bj8NJs\"",
    "mtime": "2023-04-24T21:56:58.156Z",
    "size": 1098,
    "path": "../public/_nuxt/AppHeaderNavigation.3c8937f5.css"
  },
  "/_nuxt/AppLayout.52d27119.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"74-g3yLtkJjXhqoemFMOJg38YZoobU\"",
    "mtime": "2023-04-24T21:56:58.155Z",
    "size": 116,
    "path": "../public/_nuxt/AppLayout.52d27119.css"
  },
  "/_nuxt/AppLayout.7e58067d.js": {
    "type": "application/javascript",
    "etag": "\"713-dC3AWe8nYSCd296TnVkxxlDnt1I\"",
    "mtime": "2023-04-24T21:56:58.154Z",
    "size": 1811,
    "path": "../public/_nuxt/AppLayout.7e58067d.js"
  },
  "/_nuxt/AppLoadingBar.0e7896d5.js": {
    "type": "application/javascript",
    "etag": "\"439-kXksQqAaQ/yIU+fj9ZqBzg56do0\"",
    "mtime": "2023-04-24T21:56:58.154Z",
    "size": 1081,
    "path": "../public/_nuxt/AppLoadingBar.0e7896d5.js"
  },
  "/_nuxt/AppLoadingBar.2d9149fe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"162-9aovZ4HoIbWvF8vyrFE5eU+MyRA\"",
    "mtime": "2023-04-24T21:56:58.153Z",
    "size": 354,
    "path": "../public/_nuxt/AppLoadingBar.2d9149fe.css"
  },
  "/_nuxt/AppSearch.271fbd2e.js": {
    "type": "application/javascript",
    "etag": "\"39e-siD8DloeOA8TCKQcPFAlphAXKyE\"",
    "mtime": "2023-04-24T21:56:58.153Z",
    "size": 926,
    "path": "../public/_nuxt/AppSearch.271fbd2e.js"
  },
  "/_nuxt/AppSearch.82c5ea5d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4a8-4QfoklM9sCrJ70Txqho6di2RhuE\"",
    "mtime": "2023-04-24T21:56:58.152Z",
    "size": 1192,
    "path": "../public/_nuxt/AppSearch.82c5ea5d.css"
  },
  "/_nuxt/AppSocialIcons.743c87bb.js": {
    "type": "application/javascript",
    "etag": "\"43a-v1m6Xnf7mZAYlkAAq70Tz2kI/UE\"",
    "mtime": "2023-04-24T21:56:58.152Z",
    "size": 1082,
    "path": "../public/_nuxt/AppSocialIcons.743c87bb.js"
  },
  "/_nuxt/AppSocialIcons.e35e076a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"103-YkwgKpq9swbaOWlVjRexe1Kj+MQ\"",
    "mtime": "2023-04-24T21:56:58.151Z",
    "size": 259,
    "path": "../public/_nuxt/AppSocialIcons.e35e076a.css"
  },
  "/_nuxt/ApplicationGrid.c632b9c2.js": {
    "type": "application/javascript",
    "etag": "\"bec-XJQqm20SzIrffHBkkhfdZQNBe9Q\"",
    "mtime": "2023-04-24T21:56:58.151Z",
    "size": 3052,
    "path": "../public/_nuxt/ApplicationGrid.c632b9c2.js"
  },
  "/_nuxt/ApplicationPageHeader.e74959ed.js": {
    "type": "application/javascript",
    "etag": "\"808-YjG9/3kJVxWxCtP/2SyXtJ25syA\"",
    "mtime": "2023-04-24T21:56:58.150Z",
    "size": 2056,
    "path": "../public/_nuxt/ApplicationPageHeader.e74959ed.js"
  },
  "/_nuxt/ApplicationSearch.f016bd10.js": {
    "type": "application/javascript",
    "etag": "\"7bf-fQSGH+A8hl/0G1iUAGHuBs6+YVo\"",
    "mtime": "2023-04-24T21:56:58.150Z",
    "size": 1983,
    "path": "../public/_nuxt/ApplicationSearch.f016bd10.js"
  },
  "/_nuxt/ApplicationUpsert.03fcb0bf.js": {
    "type": "application/javascript",
    "etag": "\"20bc-2aS2fuNqV11dekxIpetL9hMjRlk\"",
    "mtime": "2023-04-24T21:56:58.149Z",
    "size": 8380,
    "path": "../public/_nuxt/ApplicationUpsert.03fcb0bf.js"
  },
  "/_nuxt/Avatar.764a71f7.js": {
    "type": "application/javascript",
    "etag": "\"112f-xf+nMqeFQWr45Z/MGFj4hCiockk\"",
    "mtime": "2023-04-24T21:56:58.148Z",
    "size": 4399,
    "path": "../public/_nuxt/Avatar.764a71f7.js"
  },
  "/_nuxt/Badge.05529646.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a36-wZcWUaatyZNJYT/1H8a99Hxtqb4\"",
    "mtime": "2023-04-24T21:56:58.148Z",
    "size": 6710,
    "path": "../public/_nuxt/Badge.05529646.css"
  },
  "/_nuxt/Badge.e9ca32b1.js": {
    "type": "application/javascript",
    "etag": "\"229-p3s11v7ULAe6l2uv+yegNmgxDtQ\"",
    "mtime": "2023-04-24T21:56:58.147Z",
    "size": 553,
    "path": "../public/_nuxt/Badge.e9ca32b1.js"
  },
  "/_nuxt/Billing.6d578537.js": {
    "type": "application/javascript",
    "etag": "\"146f-6RRoi4sp6EFOec0+kCE2m7+/EAc\"",
    "mtime": "2023-04-24T21:56:58.146Z",
    "size": 5231,
    "path": "../public/_nuxt/Billing.6d578537.js"
  },
  "/_nuxt/BillingDisplay.e1f9cbc5.js": {
    "type": "application/javascript",
    "etag": "\"11d3-GI9YDMnCyG82rKUjkEchf1XCGTc\"",
    "mtime": "2023-04-24T21:56:58.146Z",
    "size": 4563,
    "path": "../public/_nuxt/BillingDisplay.e1f9cbc5.js"
  },
  "/_nuxt/BillingDisplay.f25a7506.js": {
    "type": "application/javascript",
    "etag": "\"11d4-pgsvvZ3B6I/eRBiQwlZaYiXs2uw\"",
    "mtime": "2023-04-24T21:56:58.145Z",
    "size": 4564,
    "path": "../public/_nuxt/BillingDisplay.f25a7506.js"
  },
  "/_nuxt/BillingInformation.23a4ff47.js": {
    "type": "application/javascript",
    "etag": "\"9c7-i2Mb8Ltnoo8huo+37t7865AboTQ\"",
    "mtime": "2023-04-24T21:56:58.145Z",
    "size": 2503,
    "path": "../public/_nuxt/BillingInformation.23a4ff47.js"
  },
  "/_nuxt/BillingPlansUpsert.05d0c61c.js": {
    "type": "application/javascript",
    "etag": "\"1980-g6+bIwUI70n0yZFLtjxYiTHUROk\"",
    "mtime": "2023-04-24T21:56:58.144Z",
    "size": 6528,
    "path": "../public/_nuxt/BillingPlansUpsert.05d0c61c.js"
  },
  "/_nuxt/BillingPlansUpsert.2e7d5db8.js": {
    "type": "application/javascript",
    "etag": "\"1eeb-myOEfEfHXP1qNmL56xDwfKNJKl0\"",
    "mtime": "2023-04-24T21:56:58.143Z",
    "size": 7915,
    "path": "../public/_nuxt/BillingPlansUpsert.2e7d5db8.js"
  },
  "/_nuxt/BlockHero.295e6b11.js": {
    "type": "application/javascript",
    "etag": "\"897-1Rj7MISZQKFTMTV2q8bbZADNTW4\"",
    "mtime": "2023-04-24T21:56:58.143Z",
    "size": 2199,
    "path": "../public/_nuxt/BlockHero.295e6b11.js"
  },
  "/_nuxt/BlockHero.bbfbfa5f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a56-EDxR5JzWg9DN/x26HQaXDTNMse4\"",
    "mtime": "2023-04-24T21:56:58.142Z",
    "size": 2646,
    "path": "../public/_nuxt/BlockHero.bbfbfa5f.css"
  },
  "/_nuxt/BusinessCardForm.0ba5037a.js": {
    "type": "application/javascript",
    "etag": "\"17d9-e7xXsFBRsLM+f6Ep0Cyu/S+tV/w\"",
    "mtime": "2023-04-24T21:56:58.142Z",
    "size": 6105,
    "path": "../public/_nuxt/BusinessCardForm.0ba5037a.js"
  },
  "/_nuxt/ButtonLink.df24cc57.js": {
    "type": "application/javascript",
    "etag": "\"69a-BaXYIGDkhbOh3VXljN6bpux0HLE\"",
    "mtime": "2023-04-24T21:56:58.141Z",
    "size": 1690,
    "path": "../public/_nuxt/ButtonLink.df24cc57.js"
  },
  "/_nuxt/ButtonLink.fcbdda0b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"296-7N6MBPwbn9wwihdyS57DILo91fE\"",
    "mtime": "2023-04-24T21:56:58.141Z",
    "size": 662,
    "path": "../public/_nuxt/ButtonLink.fcbdda0b.css"
  },
  "/_nuxt/Callout.85492eba.js": {
    "type": "application/javascript",
    "etag": "\"457-0zc6y7V4GYx0HqRQ33666HYkHjY\"",
    "mtime": "2023-04-24T21:56:58.140Z",
    "size": 1111,
    "path": "../public/_nuxt/Callout.85492eba.js"
  },
  "/_nuxt/Callout.a5db879a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ccd-PVf6hQKz6CPZgMy7HKkzqR3Kiso\"",
    "mtime": "2023-04-24T21:56:58.139Z",
    "size": 7373,
    "path": "../public/_nuxt/Callout.a5db879a.css"
  },
  "/_nuxt/Card.8460d175.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"37b-MEHuI1QkYahhVcK1rw2NP65MlpY\"",
    "mtime": "2023-04-24T21:56:58.139Z",
    "size": 891,
    "path": "../public/_nuxt/Card.8460d175.css"
  },
  "/_nuxt/Card.d4ba4afb.js": {
    "type": "application/javascript",
    "etag": "\"388-lPuIuvtvLlk26U2VdQ+SG+FVpRA\"",
    "mtime": "2023-04-24T21:56:58.138Z",
    "size": 904,
    "path": "../public/_nuxt/Card.d4ba4afb.js"
  },
  "/_nuxt/CardGrid.f3b655b5.js": {
    "type": "application/javascript",
    "etag": "\"2a4-0eW1/DvewT03WSlUzMzAxBxVDRk\"",
    "mtime": "2023-04-24T21:56:58.138Z",
    "size": 676,
    "path": "../public/_nuxt/CardGrid.f3b655b5.js"
  },
  "/_nuxt/CardGrid.fb979640.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"407-HPXBt/a/0gpJcGD3T83JvD0Liow\"",
    "mtime": "2023-04-24T21:56:58.137Z",
    "size": 1031,
    "path": "../public/_nuxt/CardGrid.fb979640.css"
  },
  "/_nuxt/CheckBoxGroup.8cc628b7.js": {
    "type": "application/javascript",
    "etag": "\"595-clCQPcXUfbkUhTIgz4mgf9f34lc\"",
    "mtime": "2023-04-24T21:56:58.137Z",
    "size": 1429,
    "path": "../public/_nuxt/CheckBoxGroup.8cc628b7.js"
  },
  "/_nuxt/ClientAllocationUpsert.8b72ec22.js": {
    "type": "application/javascript",
    "etag": "\"5960-wLnldI8Zq8UrhUjcPXE7QBGHrrU\"",
    "mtime": "2023-04-24T21:56:58.136Z",
    "size": 22880,
    "path": "../public/_nuxt/ClientAllocationUpsert.8b72ec22.js"
  },
  "/_nuxt/ClientGrid.1b1b6e9c.js": {
    "type": "application/javascript",
    "etag": "\"daa-3qGZU0yB95xj0LAXAiIGj86Xlxk\"",
    "mtime": "2023-04-24T21:56:58.135Z",
    "size": 3498,
    "path": "../public/_nuxt/ClientGrid.1b1b6e9c.js"
  },
  "/_nuxt/ClientPageHeader.d52ebd1d.js": {
    "type": "application/javascript",
    "etag": "\"7f0-xAVjr25tNRL3PiBsZHCYAB3pDPo\"",
    "mtime": "2023-04-24T21:56:58.135Z",
    "size": 2032,
    "path": "../public/_nuxt/ClientPageHeader.d52ebd1d.js"
  },
  "/_nuxt/ClientSearch.6e67765d.js": {
    "type": "application/javascript",
    "etag": "\"1163-ZvnqQJZ8Be87//D0TUKi/h/ChmE\"",
    "mtime": "2023-04-24T21:56:58.135Z",
    "size": 4451,
    "path": "../public/_nuxt/ClientSearch.6e67765d.js"
  },
  "/_nuxt/ClientUpsert.977d4121.js": {
    "type": "application/javascript",
    "etag": "\"2dc6-Kr7vGiFyLgZLFFN+ObrEDFF0EpU\"",
    "mtime": "2023-04-24T21:56:58.134Z",
    "size": 11718,
    "path": "../public/_nuxt/ClientUpsert.977d4121.js"
  },
  "/_nuxt/CodeBlock.8ad2abbe.js": {
    "type": "application/javascript",
    "etag": "\"1fd-AGKIsgGJOEKzUXBo6WQ1crZZUOo\"",
    "mtime": "2023-04-24T21:56:58.134Z",
    "size": 509,
    "path": "../public/_nuxt/CodeBlock.8ad2abbe.js"
  },
  "/_nuxt/CodeBlock.e43dab4c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5d-nweqRivy9aabD6QXnxHC31KLDvo\"",
    "mtime": "2023-04-24T21:56:58.133Z",
    "size": 93,
    "path": "../public/_nuxt/CodeBlock.e43dab4c.css"
  },
  "/_nuxt/CodeGroup.50231b95.js": {
    "type": "application/javascript",
    "etag": "\"4cb-T78PzZrr0kJd5Ct51AhvBXRGll8\"",
    "mtime": "2023-04-24T21:56:58.132Z",
    "size": 1227,
    "path": "../public/_nuxt/CodeGroup.50231b95.js"
  },
  "/_nuxt/CodeGroup.a88f53ac.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ed-XIiT7MVoKTa1mF948ZxyTjbSfa8\"",
    "mtime": "2023-04-24T21:56:58.132Z",
    "size": 493,
    "path": "../public/_nuxt/CodeGroup.a88f53ac.css"
  },
  "/_nuxt/ComponentPlayground.02ad673c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4d7-EvOZuENL1OTaDrOAytx97Wqy+fY\"",
    "mtime": "2023-04-24T21:56:58.131Z",
    "size": 1239,
    "path": "../public/_nuxt/ComponentPlayground.02ad673c.css"
  },
  "/_nuxt/ComponentPlayground.95eb4fc8.js": {
    "type": "application/javascript",
    "etag": "\"c9f-M56jxEKZofCFJ0eXy/q03RMC+eY\"",
    "mtime": "2023-04-24T21:56:58.131Z",
    "size": 3231,
    "path": "../public/_nuxt/ComponentPlayground.95eb4fc8.js"
  },
  "/_nuxt/ComponentPlaygroundData.2ba66f99.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e8-eRIBDachbuHQgcxmMyQhlHa6tXo\"",
    "mtime": "2023-04-24T21:56:58.131Z",
    "size": 232,
    "path": "../public/_nuxt/ComponentPlaygroundData.2ba66f99.css"
  },
  "/_nuxt/ComponentPlaygroundData.5b72dd64.js": {
    "type": "application/javascript",
    "etag": "\"785-UJaAlxsSjlaM2oBGHfrLDziQth4\"",
    "mtime": "2023-04-24T21:56:58.130Z",
    "size": 1925,
    "path": "../public/_nuxt/ComponentPlaygroundData.5b72dd64.js"
  },
  "/_nuxt/ComponentPlaygroundProps.29ba2800.js": {
    "type": "application/javascript",
    "etag": "\"6ec-+ASumxAn+7+fqqywZHZMneC2Bcw\"",
    "mtime": "2023-04-24T21:56:58.130Z",
    "size": 1772,
    "path": "../public/_nuxt/ComponentPlaygroundProps.29ba2800.js"
  },
  "/_nuxt/ComponentPlaygroundProps.54f42c7a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"339-BJnAxWNkwK91+x6XqFg1Bh8QVR8\"",
    "mtime": "2023-04-24T21:56:58.129Z",
    "size": 825,
    "path": "../public/_nuxt/ComponentPlaygroundProps.54f42c7a.css"
  },
  "/_nuxt/ComponentPlaygroundSlots.0f3c4cd8.js": {
    "type": "application/javascript",
    "etag": "\"71-Sj33Nv6QFb+EovVhs5x2g4UnC54\"",
    "mtime": "2023-04-24T21:56:58.128Z",
    "size": 113,
    "path": "../public/_nuxt/ComponentPlaygroundSlots.0f3c4cd8.js"
  },
  "/_nuxt/ComponentPlaygroundSlots.vue.5dd37ea7.js": {
    "type": "application/javascript",
    "etag": "\"140-oDup1vSEbGKZ/TeOaSiF3NPMC7o\"",
    "mtime": "2023-04-24T21:56:58.128Z",
    "size": 320,
    "path": "../public/_nuxt/ComponentPlaygroundSlots.vue.5dd37ea7.js"
  },
  "/_nuxt/ComponentPlaygroundTokens.841f4fba.js": {
    "type": "application/javascript",
    "etag": "\"72-ZMQeVhbKqOUiCDBqc364BM03fLA\"",
    "mtime": "2023-04-24T21:56:58.128Z",
    "size": 114,
    "path": "../public/_nuxt/ComponentPlaygroundTokens.841f4fba.js"
  },
  "/_nuxt/ComponentPlaygroundTokens.vue.28c59f2c.js": {
    "type": "application/javascript",
    "etag": "\"118-oNORmVoAnnmW8nXrNQvSD/iq6Rg\"",
    "mtime": "2023-04-24T21:56:58.127Z",
    "size": 280,
    "path": "../public/_nuxt/ComponentPlaygroundTokens.vue.28c59f2c.js"
  },
  "/_nuxt/ConfigurationGrid.757fe25d.js": {
    "type": "application/javascript",
    "etag": "\"e4f-ngybpxJHHeAya9WRIzPm3BMIbKU\"",
    "mtime": "2023-04-24T21:56:58.127Z",
    "size": 3663,
    "path": "../public/_nuxt/ConfigurationGrid.757fe25d.js"
  },
  "/_nuxt/ConfigurationPageHeader.f5ed66b6.js": {
    "type": "application/javascript",
    "etag": "\"7dd-kic+nza0P7QYrb6yaCT/tktCF8U\"",
    "mtime": "2023-04-24T21:56:58.126Z",
    "size": 2013,
    "path": "../public/_nuxt/ConfigurationPageHeader.f5ed66b6.js"
  },
  "/_nuxt/ConfigurationSearch.c2007824.js": {
    "type": "application/javascript",
    "etag": "\"11b8-yZ6AI5xc/cIZkU+88u4m3Q/fBw8\"",
    "mtime": "2023-04-24T21:56:58.126Z",
    "size": 4536,
    "path": "../public/_nuxt/ConfigurationSearch.c2007824.js"
  },
  "/_nuxt/ConfigurationUpsert.79b0ecfa.js": {
    "type": "application/javascript",
    "etag": "\"275e-5Yta9WG3nFgGSXnaSal6Y0Dqj3g\"",
    "mtime": "2023-04-24T21:56:58.125Z",
    "size": 10078,
    "path": "../public/_nuxt/ConfigurationUpsert.79b0ecfa.js"
  },
  "/_nuxt/ContactGrid.23de52d9.js": {
    "type": "application/javascript",
    "etag": "\"d42-h7u9zUa9ITb97qE/tQpoJEo46VA\"",
    "mtime": "2023-04-24T21:56:58.125Z",
    "size": 3394,
    "path": "../public/_nuxt/ContactGrid.23de52d9.js"
  },
  "/_nuxt/ContactPageHeader.759d39cc.js": {
    "type": "application/javascript",
    "etag": "\"7cb-ytQaILdFFlHTtKul67ejhazLUqM\"",
    "mtime": "2023-04-24T21:56:58.124Z",
    "size": 1995,
    "path": "../public/_nuxt/ContactPageHeader.759d39cc.js"
  },
  "/_nuxt/ContactSearch.a6ca679f.js": {
    "type": "application/javascript",
    "etag": "\"175a-wZVri9iOjofElXrbVPwoXga5Ddk\"",
    "mtime": "2023-04-24T21:56:58.124Z",
    "size": 5978,
    "path": "../public/_nuxt/ContactSearch.a6ca679f.js"
  },
  "/_nuxt/ContactUpsert.30d046e0.js": {
    "type": "application/javascript",
    "etag": "\"36ca-1TDYqDXXpqNEAZ0PyEs0Wo48a4Q\"",
    "mtime": "2023-04-24T21:56:58.123Z",
    "size": 14026,
    "path": "../public/_nuxt/ContactUpsert.30d046e0.js"
  },
  "/_nuxt/Container.d2175a66.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a-WgWHeDnuZUg+r4GmJ3puLH6s8is\"",
    "mtime": "2023-04-24T21:56:58.123Z",
    "size": 138,
    "path": "../public/_nuxt/Container.d2175a66.css"
  },
  "/_nuxt/Container.e3ae9bf6.js": {
    "type": "application/javascript",
    "etag": "\"375-KO8Vq+a8V3GtoaC6nXSzokLM/ew\"",
    "mtime": "2023-04-24T21:56:58.122Z",
    "size": 885,
    "path": "../public/_nuxt/Container.e3ae9bf6.js"
  },
  "/_nuxt/ContentDoc.41391f2c.js": {
    "type": "application/javascript",
    "etag": "\"595-x0wOYjfCwBDbSAoxcDFrCtjicy4\"",
    "mtime": "2023-04-24T21:56:58.122Z",
    "size": 1429,
    "path": "../public/_nuxt/ContentDoc.41391f2c.js"
  },
  "/_nuxt/ContentList.67558bf8.js": {
    "type": "application/javascript",
    "etag": "\"343-8TKs2Iw/YHGYljxKWvCyaG58Dt8\"",
    "mtime": "2023-04-24T21:56:58.121Z",
    "size": 835,
    "path": "../public/_nuxt/ContentList.67558bf8.js"
  },
  "/_nuxt/ContentNavigation.3e582f13.js": {
    "type": "application/javascript",
    "etag": "\"d72-xDXIh2LKKyrsCfQRLCcER4WaeR4\"",
    "mtime": "2023-04-24T21:56:58.121Z",
    "size": 3442,
    "path": "../public/_nuxt/ContentNavigation.3e582f13.js"
  },
  "/_nuxt/ContentNavigation.66bbe8f4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3e20-uPP07nzP9mgY5OJcKUMIz2lOaUM\"",
    "mtime": "2023-04-24T21:56:58.120Z",
    "size": 15904,
    "path": "../public/_nuxt/ContentNavigation.66bbe8f4.css"
  },
  "/_nuxt/ContentPreviewMode.3a7c2607.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"db3-IHbvooV2xBtLdv60Wn8vYlapjvE\"",
    "mtime": "2023-04-24T21:56:58.119Z",
    "size": 3507,
    "path": "../public/_nuxt/ContentPreviewMode.3a7c2607.css"
  },
  "/_nuxt/ContentQuery.bfb9d625.js": {
    "type": "application/javascript",
    "etag": "\"894-OW/ZVjJe4SuTsYJ10YeGbyIdh6s\"",
    "mtime": "2023-04-24T21:56:58.119Z",
    "size": 2196,
    "path": "../public/_nuxt/ContentQuery.bfb9d625.js"
  },
  "/_nuxt/ContentRenderer.8b3b4311.js": {
    "type": "application/javascript",
    "etag": "\"4bc-vhKEr4BHLepSWz8A1oZARx6en6M\"",
    "mtime": "2023-04-24T21:56:58.118Z",
    "size": 1212,
    "path": "../public/_nuxt/ContentRenderer.8b3b4311.js"
  },
  "/_nuxt/ContentRendererMarkdown.ad11805f.js": {
    "type": "application/javascript",
    "etag": "\"5711-urdhbPcXjo5XnnsT898pigkptnY\"",
    "mtime": "2023-04-24T21:56:58.117Z",
    "size": 22289,
    "path": "../public/_nuxt/ContentRendererMarkdown.ad11805f.js"
  },
  "/_nuxt/ContentSlot.9bf0258b.js": {
    "type": "application/javascript",
    "etag": "\"3c5-OqmyAZnK5toddQ3uP8egi8u86GU\"",
    "mtime": "2023-04-24T21:56:58.117Z",
    "size": 965,
    "path": "../public/_nuxt/ContentSlot.9bf0258b.js"
  },
  "/_nuxt/CopyButton.1b373238.js": {
    "type": "application/javascript",
    "etag": "\"35a-CZ7FWiGB8TO7R49OlPP7+oua8UE\"",
    "mtime": "2023-04-24T21:56:58.116Z",
    "size": 858,
    "path": "../public/_nuxt/CopyButton.1b373238.js"
  },
  "/_nuxt/DepartmentGrid.b22e2252.js": {
    "type": "application/javascript",
    "etag": "\"dd9-WIys4TKnOgguWjtrcTTl7nubpDw\"",
    "mtime": "2023-04-24T21:56:58.115Z",
    "size": 3545,
    "path": "../public/_nuxt/DepartmentGrid.b22e2252.js"
  },
  "/_nuxt/DepartmentPageHeader.547249ef.js": {
    "type": "application/javascript",
    "etag": "\"7d4-aoplIZ6UEOPwA0Ywg/+7CjKWdvI\"",
    "mtime": "2023-04-24T21:56:58.115Z",
    "size": 2004,
    "path": "../public/_nuxt/DepartmentPageHeader.547249ef.js"
  },
  "/_nuxt/DepartmentSearch.2696a452.js": {
    "type": "application/javascript",
    "etag": "\"11a3-7caxQmOZjyuKIGEW7p8zq9tu9Ms\"",
    "mtime": "2023-04-24T21:56:58.114Z",
    "size": 4515,
    "path": "../public/_nuxt/DepartmentSearch.2696a452.js"
  },
  "/_nuxt/DepartmentUpsert.489ae4e5.js": {
    "type": "application/javascript",
    "etag": "\"22ff-U/k4c628B+9zVUu556q93t01IY4\"",
    "mtime": "2023-04-24T21:56:58.114Z",
    "size": 8959,
    "path": "../public/_nuxt/DepartmentUpsert.489ae4e5.js"
  },
  "/_nuxt/DesignerPageHeader.54b1584a.js": {
    "type": "application/javascript",
    "etag": "\"262-J2sBL6NTT+bnqTAWtAeIt87Vwu0\"",
    "mtime": "2023-04-24T21:56:58.113Z",
    "size": 610,
    "path": "../public/_nuxt/DesignerPageHeader.54b1584a.js"
  },
  "/_nuxt/DocsAside.785782ea.js": {
    "type": "application/javascript",
    "etag": "\"3b5-to0YgG28mFwXU8ccak4E+WgdFgs\"",
    "mtime": "2023-04-24T21:56:58.113Z",
    "size": 949,
    "path": "../public/_nuxt/DocsAside.785782ea.js"
  },
  "/_nuxt/DocsAside.d7386185.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"184-OaIRdlbrcpL3aLRHpjv+7bKCT54\"",
    "mtime": "2023-04-24T21:56:58.112Z",
    "size": 388,
    "path": "../public/_nuxt/DocsAside.d7386185.css"
  },
  "/_nuxt/DocsAsideTree.cfe0905a.js": {
    "type": "application/javascript",
    "etag": "\"b5f-3HXEgNin+z4mRGG+0Mm274m0crI\"",
    "mtime": "2023-04-24T21:56:58.112Z",
    "size": 2911,
    "path": "../public/_nuxt/DocsAsideTree.cfe0905a.js"
  },
  "/_nuxt/DocsAsideTree.d7e845f8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9a1-oU3fGlVvqii2w81yRYb0EdYB1r0\"",
    "mtime": "2023-04-24T21:56:58.112Z",
    "size": 2465,
    "path": "../public/_nuxt/DocsAsideTree.d7e845f8.css"
  },
  "/_nuxt/DocsPageBottom.ae096619.js": {
    "type": "application/javascript",
    "etag": "\"4f1-IY8lMytp85TJ4H5Enq/JEqUXOd4\"",
    "mtime": "2023-04-24T21:56:58.111Z",
    "size": 1265,
    "path": "../public/_nuxt/DocsPageBottom.ae096619.js"
  },
  "/_nuxt/DocsPageBottom.d9d559e1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"18d-3SsJYeCkQDp6A8J4aU2CqxW3UrQ\"",
    "mtime": "2023-04-24T21:56:58.111Z",
    "size": 397,
    "path": "../public/_nuxt/DocsPageBottom.d9d559e1.css"
  },
  "/_nuxt/DocsPageLayout.076483e9.js": {
    "type": "application/javascript",
    "etag": "\"ebd-SHJoch1WvOirmDluupi0tzrEBvk\"",
    "mtime": "2023-04-24T21:56:58.110Z",
    "size": 3773,
    "path": "../public/_nuxt/DocsPageLayout.076483e9.js"
  },
  "/_nuxt/DocsPageLayout.7258118b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1311-yUgv5G86gJDZew7V7/cXo1jNTQw\"",
    "mtime": "2023-04-24T21:56:58.110Z",
    "size": 4881,
    "path": "../public/_nuxt/DocsPageLayout.7258118b.css"
  },
  "/_nuxt/DocsPrevNext.0cead60a.js": {
    "type": "application/javascript",
    "etag": "\"59f-YzMduNI3KU92ht/5Lam8/oDYDis\"",
    "mtime": "2023-04-24T21:56:58.109Z",
    "size": 1439,
    "path": "../public/_nuxt/DocsPrevNext.0cead60a.js"
  },
  "/_nuxt/DocsPrevNext.13fdb256.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7d4-T9lNE0e8f3jM36TD48LXowBGmUs\"",
    "mtime": "2023-04-24T21:56:58.109Z",
    "size": 2004,
    "path": "../public/_nuxt/DocsPrevNext.13fdb256.css"
  },
  "/_nuxt/DocsToc.6b8d2996.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"152-IGAxzjejnjGbLV2E97EuYir+0vo\"",
    "mtime": "2023-04-24T21:56:58.109Z",
    "size": 338,
    "path": "../public/_nuxt/DocsToc.6b8d2996.css"
  },
  "/_nuxt/DocsToc.e09be09c.js": {
    "type": "application/javascript",
    "etag": "\"315-Hx3VGB2xs+9WJLzR1TAQSKBgwGY\"",
    "mtime": "2023-04-24T21:56:58.108Z",
    "size": 789,
    "path": "../public/_nuxt/DocsToc.e09be09c.js"
  },
  "/_nuxt/DocsTocLinks.9573fea7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c8-WtPYQqKGpNQH0qzGbh90W1lwkKQ\"",
    "mtime": "2023-04-24T21:56:58.108Z",
    "size": 712,
    "path": "../public/_nuxt/DocsTocLinks.9573fea7.css"
  },
  "/_nuxt/DocsTocLinks.c8b225db.js": {
    "type": "application/javascript",
    "etag": "\"69b-bTqKUkBoQW/tzQ6+jEK+sfmwZCc\"",
    "mtime": "2023-04-24T21:56:58.107Z",
    "size": 1691,
    "path": "../public/_nuxt/DocsTocLinks.c8b225db.js"
  },
  "/_nuxt/Dropdownlist.1b365210.js": {
    "type": "application/javascript",
    "etag": "\"676-W24JR3qwMSS2SinDs9QR5mD9PIo\"",
    "mtime": "2023-04-24T21:56:58.106Z",
    "size": 1654,
    "path": "../public/_nuxt/Dropdownlist.1b365210.js"
  },
  "/_nuxt/EditOnLink.c4bf35bb.js": {
    "type": "application/javascript",
    "etag": "\"80-SwxIdzhoyvK8h7TISbqxbvCVP0s\"",
    "mtime": "2023-04-24T21:56:58.106Z",
    "size": 128,
    "path": "../public/_nuxt/EditOnLink.c4bf35bb.js"
  },
  "/_nuxt/EditOnLink.vue.862264db.js": {
    "type": "application/javascript",
    "etag": "\"8ef-nSEgnD7kCMoTBqpodRFkg1vdCqw\"",
    "mtime": "2023-04-24T21:56:58.105Z",
    "size": 2287,
    "path": "../public/_nuxt/EditOnLink.vue.862264db.js"
  },
  "/_nuxt/Ellipsis.78e1a4dc.js": {
    "type": "application/javascript",
    "etag": "\"593-mNh4FiT+5p4ji0gzeUvvZZMmPqk\"",
    "mtime": "2023-04-24T21:56:58.105Z",
    "size": 1427,
    "path": "../public/_nuxt/Ellipsis.78e1a4dc.js"
  },
  "/_nuxt/Ellipsis.7a0b54f8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1aa-ZBsQ4t+AsCchpHMJOH2gFqrcYyA\"",
    "mtime": "2023-04-24T21:56:58.104Z",
    "size": 426,
    "path": "../public/_nuxt/Ellipsis.7a0b54f8.css"
  },
  "/_nuxt/EmployeeGrid.1edf97db.js": {
    "type": "application/javascript",
    "etag": "\"bb0-QTxdgCp1WGkmPTPTWcxub+t9Kso\"",
    "mtime": "2023-04-24T21:56:58.104Z",
    "size": 2992,
    "path": "../public/_nuxt/EmployeeGrid.1edf97db.js"
  },
  "/_nuxt/EmployeePageHeader.4f2b264a.js": {
    "type": "application/javascript",
    "etag": "\"7ce-jQewYRCOfmuxHPvTcM0fIFpQdq0\"",
    "mtime": "2023-04-24T21:56:58.103Z",
    "size": 1998,
    "path": "../public/_nuxt/EmployeePageHeader.4f2b264a.js"
  },
  "/_nuxt/EmployeeSearch.a0ff3418.js": {
    "type": "application/javascript",
    "etag": "\"cf0-XW/hfAXn/8TycrhHy0Oqn+wMPdQ\"",
    "mtime": "2023-04-24T21:56:58.103Z",
    "size": 3312,
    "path": "../public/_nuxt/EmployeeSearch.a0ff3418.js"
  },
  "/_nuxt/EmployeeUpsert.d6912350.js": {
    "type": "application/javascript",
    "etag": "\"325d-c22WIA/JQRuixtQjKB/jFl+GmPA\"",
    "mtime": "2023-04-24T21:56:58.102Z",
    "size": 12893,
    "path": "../public/_nuxt/EmployeeUpsert.d6912350.js"
  },
  "/_nuxt/GithubCommits.5e276d62.js": {
    "type": "application/javascript",
    "etag": "\"201-pnyDMPw2ek0eMQUjTVShCnw1wWA\"",
    "mtime": "2023-04-24T21:56:58.101Z",
    "size": 513,
    "path": "../public/_nuxt/GithubCommits.5e276d62.js"
  },
  "/_nuxt/GithubContributors.f0bef307.js": {
    "type": "application/javascript",
    "etag": "\"21a-vxZTeN08ibRvVmZdYFiFnTbq2Vg\"",
    "mtime": "2023-04-24T21:56:58.101Z",
    "size": 538,
    "path": "../public/_nuxt/GithubContributors.f0bef307.js"
  },
  "/_nuxt/GithubFileContributors.3ce23b87.js": {
    "type": "application/javascript",
    "etag": "\"260-wtcuefsHCER3ymk3xZVg4vKtyyY\"",
    "mtime": "2023-04-24T21:56:58.101Z",
    "size": 608,
    "path": "../public/_nuxt/GithubFileContributors.3ce23b87.js"
  },
  "/_nuxt/GithubLastRelease.831b899f.js": {
    "type": "application/javascript",
    "etag": "\"20a-JeBr6eH1tDwtaeBkb/7i1BYpN/Q\"",
    "mtime": "2023-04-24T21:56:58.100Z",
    "size": 522,
    "path": "../public/_nuxt/GithubLastRelease.831b899f.js"
  },
  "/_nuxt/GithubLink.a432a78e.js": {
    "type": "application/javascript",
    "etag": "\"771-EpRaYyjRPOIT4PREY+2DijRoRVI\"",
    "mtime": "2023-04-24T21:56:58.100Z",
    "size": 1905,
    "path": "../public/_nuxt/GithubLink.a432a78e.js"
  },
  "/_nuxt/GithubReadme.9ec20367.js": {
    "type": "application/javascript",
    "etag": "\"1fc-MG7A8TdPHRwSqKdC59jgYSEQLI0\"",
    "mtime": "2023-04-24T21:56:58.099Z",
    "size": 508,
    "path": "../public/_nuxt/GithubReadme.9ec20367.js"
  },
  "/_nuxt/GithubRelease.0cbe7653.js": {
    "type": "application/javascript",
    "etag": "\"21d-3slYV8M4vZuLCZiSAuZWp/dcLn8\"",
    "mtime": "2023-04-24T21:56:58.099Z",
    "size": 541,
    "path": "../public/_nuxt/GithubRelease.0cbe7653.js"
  },
  "/_nuxt/GithubReleases.c82fc304.js": {
    "type": "application/javascript",
    "etag": "\"206-d8kSq/dGmIxRmIidSqHeEnuyQxU\"",
    "mtime": "2023-04-24T21:56:58.099Z",
    "size": 518,
    "path": "../public/_nuxt/GithubReleases.c82fc304.js"
  },
  "/_nuxt/GithubRepository.972b6680.js": {
    "type": "application/javascript",
    "etag": "\"210-eJwXRsuxMj74Q5DTGvb9SktF1SY\"",
    "mtime": "2023-04-24T21:56:58.098Z",
    "size": 528,
    "path": "../public/_nuxt/GithubRepository.972b6680.js"
  },
  "/_nuxt/Hero.d5adc09e.js": {
    "type": "application/javascript",
    "etag": "\"1f6-1worru/EvXdeMLc8PkNKUp/I8ks\"",
    "mtime": "2023-04-24T21:56:58.098Z",
    "size": 502,
    "path": "../public/_nuxt/Hero.d5adc09e.js"
  },
  "/_nuxt/Icon.8176002f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-PRHTGHNRBQb9uYRx5D3mYmFcu/A\"",
    "mtime": "2023-04-24T21:56:58.097Z",
    "size": 67,
    "path": "../public/_nuxt/Icon.8176002f.css"
  },
  "/_nuxt/Icon.84acb30e.js": {
    "type": "application/javascript",
    "etag": "\"573-Wkk1Imxts06QUW3ACJ3oRsHQO9s\"",
    "mtime": "2023-04-24T21:56:58.097Z",
    "size": 1395,
    "path": "../public/_nuxt/Icon.84acb30e.js"
  },
  "/_nuxt/Icon.vue.2d0699de.js": {
    "type": "application/javascript",
    "etag": "\"4c65-rx7yOelg4Sn4Edsb6tO6LHHGzGs\"",
    "mtime": "2023-04-24T21:56:58.096Z",
    "size": 19557,
    "path": "../public/_nuxt/Icon.vue.2d0699de.js"
  },
  "/_nuxt/IconCodeSandBox.4c17e755.js": {
    "type": "application/javascript",
    "etag": "\"1de-aqvdLxcwj3I3dR4H87yW+PYjy9M\"",
    "mtime": "2023-04-24T21:56:58.095Z",
    "size": 478,
    "path": "../public/_nuxt/IconCodeSandBox.4c17e755.js"
  },
  "/_nuxt/IconDocus.02a58d2a.js": {
    "type": "application/javascript",
    "etag": "\"34a-DKDAJTBlBsXJXqsWae1lRnp+MGc\"",
    "mtime": "2023-04-24T21:56:58.095Z",
    "size": 842,
    "path": "../public/_nuxt/IconDocus.02a58d2a.js"
  },
  "/_nuxt/IconNuxt.acaf382d.js": {
    "type": "application/javascript",
    "etag": "\"4c7-tFYBFg892D+VQ+GPUJUs2qgzg50\"",
    "mtime": "2023-04-24T21:56:58.094Z",
    "size": 1223,
    "path": "../public/_nuxt/IconNuxt.acaf382d.js"
  },
  "/_nuxt/IconNuxtContent.6e4c5caf.js": {
    "type": "application/javascript",
    "etag": "\"4c7-rCw8e82MA3xgLA3HPMlm/26a0Aw\"",
    "mtime": "2023-04-24T21:56:58.093Z",
    "size": 1223,
    "path": "../public/_nuxt/IconNuxtContent.6e4c5caf.js"
  },
  "/_nuxt/IconNuxtLabs.6fe8e7f8.js": {
    "type": "application/javascript",
    "etag": "\"4c7-R92EdQVwd4VqU1zQKrXGK+eFJA4\"",
    "mtime": "2023-04-24T21:56:58.093Z",
    "size": 1223,
    "path": "../public/_nuxt/IconNuxtLabs.6fe8e7f8.js"
  },
  "/_nuxt/IconNuxtStudio.34390cd8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"66-AA2ErH34Xmax3511FiYX4lQ+vjs\"",
    "mtime": "2023-04-24T21:56:58.092Z",
    "size": 102,
    "path": "../public/_nuxt/IconNuxtStudio.34390cd8.css"
  },
  "/_nuxt/IconNuxtStudio.73672603.js": {
    "type": "application/javascript",
    "etag": "\"552-HCd/omMp/Ccm+z7fE4RfTvoQH5o\"",
    "mtime": "2023-04-24T21:56:58.092Z",
    "size": 1362,
    "path": "../public/_nuxt/IconNuxtStudio.73672603.js"
  },
  "/_nuxt/IconStackBlitz.2711dac8.js": {
    "type": "application/javascript",
    "etag": "\"19a-ZjGEPe7idZA2fNmW7cjZ5R7mJN8\"",
    "mtime": "2023-04-24T21:56:58.091Z",
    "size": 410,
    "path": "../public/_nuxt/IconStackBlitz.2711dac8.js"
  },
  "/_nuxt/IconVueTelescope.d85b1c6a.js": {
    "type": "application/javascript",
    "etag": "\"304-AfeaMLHgzZDoi2V++R0ro2WiAc0\"",
    "mtime": "2023-04-24T21:56:58.090Z",
    "size": 772,
    "path": "../public/_nuxt/IconVueTelescope.d85b1c6a.js"
  },
  "/_nuxt/InquiriesGrid.3ec7ceaa.js": {
    "type": "application/javascript",
    "etag": "\"7ec-t0K28roCDEX9wRHhYtqY+DVOjaA\"",
    "mtime": "2023-04-24T21:56:58.090Z",
    "size": 2028,
    "path": "../public/_nuxt/InquiriesGrid.3ec7ceaa.js"
  },
  "/_nuxt/InquiriesPageHeader.01d5edc2.js": {
    "type": "application/javascript",
    "etag": "\"5ee-vmEY0W0/r+M25mqOezVxgmyk8M8\"",
    "mtime": "2023-04-24T21:56:58.089Z",
    "size": 1518,
    "path": "../public/_nuxt/InquiriesPageHeader.01d5edc2.js"
  },
  "/_nuxt/InquiriesSearch.05d08154.js": {
    "type": "application/javascript",
    "etag": "\"9fe-/Il3Gtuufl8E0Fv5nM1t0KuT3xE\"",
    "mtime": "2023-04-24T21:56:58.088Z",
    "size": 2558,
    "path": "../public/_nuxt/InquiriesSearch.05d08154.js"
  },
  "/_nuxt/LeftNavSecondary.8f4c2d5e.js": {
    "type": "application/javascript",
    "etag": "\"5e6-DZ8r9mPBqZNBq4t9y3TSpHkvgpc\"",
    "mtime": "2023-04-24T21:56:58.088Z",
    "size": 1510,
    "path": "../public/_nuxt/LeftNavSecondary.8f4c2d5e.js"
  },
  "/_nuxt/List.8844e032.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2fa-M/Bh4G5w1whUmQr09457kF58o+8\"",
    "mtime": "2023-04-24T21:56:58.087Z",
    "size": 762,
    "path": "../public/_nuxt/List.8844e032.css"
  },
  "/_nuxt/List.d5e77d96.js": {
    "type": "application/javascript",
    "etag": "\"3fe-oGZtY40Y3zopfVhfe4cubqI0CM4\"",
    "mtime": "2023-04-24T21:56:58.087Z",
    "size": 1022,
    "path": "../public/_nuxt/List.d5e77d96.js"
  },
  "/_nuxt/Logo.6bb4b00c.js": {
    "type": "application/javascript",
    "etag": "\"18a-kak6vzbMhLuYtO4bW1GVgsQejG0\"",
    "mtime": "2023-04-24T21:56:58.086Z",
    "size": 394,
    "path": "../public/_nuxt/Logo.6bb4b00c.js"
  },
  "/_nuxt/Logo.6f53c586.js": {
    "type": "application/javascript",
    "etag": "\"16f6-J2ZAQCjjwZC+U5ghainyEL35yIg\"",
    "mtime": "2023-04-24T21:56:58.086Z",
    "size": 5878,
    "path": "../public/_nuxt/Logo.6f53c586.js"
  },
  "/_nuxt/Logo.82cdf2ff.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d4-fX4kxqvAEJrTliGGbMu2HybrCjg\"",
    "mtime": "2023-04-24T21:56:58.085Z",
    "size": 212,
    "path": "../public/_nuxt/Logo.82cdf2ff.css"
  },
  "/_nuxt/LogosGallery.ec1bf0af.js": {
    "type": "application/javascript",
    "etag": "\"6cd-AgW/wzxg9ZKf6HbDt6FxP4T+dQI\"",
    "mtime": "2023-04-24T21:56:58.085Z",
    "size": 1741,
    "path": "../public/_nuxt/LogosGallery.ec1bf0af.js"
  },
  "/_nuxt/LogosPageHeader.0a1894b7.js": {
    "type": "application/javascript",
    "etag": "\"42f-xSLeyYh65hZleCg0Z1BOYyLXj10\"",
    "mtime": "2023-04-24T21:56:58.084Z",
    "size": 1071,
    "path": "../public/_nuxt/LogosPageHeader.0a1894b7.js"
  },
  "/_nuxt/LogosUpsert.12456590.js": {
    "type": "application/javascript",
    "etag": "\"1ccf-9lWaqqwMcqZ7ehMV8HpAQmOByjg\"",
    "mtime": "2023-04-24T21:56:58.084Z",
    "size": 7375,
    "path": "../public/_nuxt/LogosUpsert.12456590.js"
  },
  "/_nuxt/Markdown.dd909d2b.js": {
    "type": "application/javascript",
    "etag": "\"14b-5BgunLiD2j9a25EMlt8jPpuSNhI\"",
    "mtime": "2023-04-24T21:56:58.083Z",
    "size": 331,
    "path": "../public/_nuxt/Markdown.dd909d2b.js"
  },
  "/_nuxt/Marquee.de1fcb79.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"52-i17uzJXi2A/EQ5CvaUnrOwYgnxo\"",
    "mtime": "2023-04-24T21:56:58.083Z",
    "size": 82,
    "path": "../public/_nuxt/Marquee.de1fcb79.css"
  },
  "/_nuxt/NavSearch.6b44df6a.js": {
    "type": "application/javascript",
    "etag": "\"ebd-rgvsfQZIVkhN43Tyxb+gi4tw8Cs\"",
    "mtime": "2023-04-24T21:56:58.082Z",
    "size": 3773,
    "path": "../public/_nuxt/NavSearch.6b44df6a.js"
  },
  "/_nuxt/NavigationGrid.c2afc36d.js": {
    "type": "application/javascript",
    "etag": "\"dea-LIblgA8QBSq9ThOoOUAHJfQvCu0\"",
    "mtime": "2023-04-24T21:56:58.082Z",
    "size": 3562,
    "path": "../public/_nuxt/NavigationGrid.c2afc36d.js"
  },
  "/_nuxt/NavigationPageHeader.0408c6a8.js": {
    "type": "application/javascript",
    "etag": "\"6cd-LU7cDtzi3iDr+yuf8sw7TlfNtw0\"",
    "mtime": "2023-04-24T21:56:58.081Z",
    "size": 1741,
    "path": "../public/_nuxt/NavigationPageHeader.0408c6a8.js"
  },
  "/_nuxt/NavigationSearchForm.d6806b2c.js": {
    "type": "application/javascript",
    "etag": "\"17dd-JFLfi5LXzHdYl0ac6UeEG/wnKu4\"",
    "mtime": "2023-04-24T21:56:58.081Z",
    "size": 6109,
    "path": "../public/_nuxt/NavigationSearchForm.d6806b2c.js"
  },
  "/_nuxt/NavigationUpsert.8ad37486.js": {
    "type": "application/javascript",
    "etag": "\"3649-YMWOtbo2ZgYfEAfMvRbiGO9KH7E\"",
    "mtime": "2023-04-24T21:56:58.080Z",
    "size": 13897,
    "path": "../public/_nuxt/NavigationUpsert.8ad37486.js"
  },
  "/_nuxt/NuxtImg.c57ba9b1.js": {
    "type": "application/javascript",
    "etag": "\"60-Fu6ykgvsYgDzgyut4oDomJuOD98\"",
    "mtime": "2023-04-24T21:56:58.079Z",
    "size": 96,
    "path": "../public/_nuxt/NuxtImg.c57ba9b1.js"
  },
  "/_nuxt/NuxtImg.vue.f9891d31.js": {
    "type": "application/javascript",
    "etag": "\"26c-Hq6ibl0BJ5U3xN1IGc4CkjQtm3c\"",
    "mtime": "2023-04-24T21:56:58.079Z",
    "size": 620,
    "path": "../public/_nuxt/NuxtImg.vue.f9891d31.js"
  },
  "/_nuxt/OrganizationPageHeader.67f79074.js": {
    "type": "application/javascript",
    "etag": "\"431-r/uqxrE8x3v/C7r3QQoeVZvjb20\"",
    "mtime": "2023-04-24T21:56:58.078Z",
    "size": 1073,
    "path": "../public/_nuxt/OrganizationPageHeader.67f79074.js"
  },
  "/_nuxt/PaymentInformation.9c3acbe8.js": {
    "type": "application/javascript",
    "etag": "\"88b-LkFFXAGMgradWHZYbkbys3wpdZg\"",
    "mtime": "2023-04-24T21:56:58.077Z",
    "size": 2187,
    "path": "../public/_nuxt/PaymentInformation.9c3acbe8.js"
  },
  "/_nuxt/PreviewLayout.05ed95ae.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4e-6E2gPJaG4gG9DuSxb51gBBQNOWI\"",
    "mtime": "2023-04-24T21:56:58.077Z",
    "size": 78,
    "path": "../public/_nuxt/PreviewLayout.05ed95ae.css"
  },
  "/_nuxt/PreviewLayout.c5a5c863.js": {
    "type": "application/javascript",
    "etag": "\"15d-NaBtA4tSBKfNWWUW5wgPFgHq4Ws\"",
    "mtime": "2023-04-24T21:56:58.076Z",
    "size": 349,
    "path": "../public/_nuxt/PreviewLayout.c5a5c863.js"
  },
  "/_nuxt/ProfileUpsert.cdb54410.js": {
    "type": "application/javascript",
    "etag": "\"1a9a-Bn83aFN0K7OrKxGfLzR39Kd+nV0\"",
    "mtime": "2023-04-24T21:56:58.076Z",
    "size": 6810,
    "path": "../public/_nuxt/ProfileUpsert.cdb54410.js"
  },
  "/_nuxt/ProfilesGrid.34204c7e.js": {
    "type": "application/javascript",
    "etag": "\"aea-xGOEBxz8Cf3vMpN3l/AEWGgSvaU\"",
    "mtime": "2023-04-24T21:56:58.075Z",
    "size": 2794,
    "path": "../public/_nuxt/ProfilesGrid.34204c7e.js"
  },
  "/_nuxt/ProfilesPageHeader.612d8e23.js": {
    "type": "application/javascript",
    "etag": "\"71b-64kmSTYYnnogNdQbe2uWZdhl9OE\"",
    "mtime": "2023-04-24T21:56:58.075Z",
    "size": 1819,
    "path": "../public/_nuxt/ProfilesPageHeader.612d8e23.js"
  },
  "/_nuxt/ProfilesSearch.06aa00c7.js": {
    "type": "application/javascript",
    "etag": "\"7ab-FSE9QEd0ga3nn1sK6GpzPP0Jzfw\"",
    "mtime": "2023-04-24T21:56:58.075Z",
    "size": 1963,
    "path": "../public/_nuxt/ProfilesSearch.06aa00c7.js"
  },
  "/_nuxt/ProfilesUpsert.9b44cce3.js": {
    "type": "application/javascript",
    "etag": "\"2a1d-pzeOVj6rW/8Be1uUfjL5dUcVV7A\"",
    "mtime": "2023-04-24T21:56:58.074Z",
    "size": 10781,
    "path": "../public/_nuxt/ProfilesUpsert.9b44cce3.js"
  },
  "/_nuxt/PropertiesGrid.84565028.js": {
    "type": "application/javascript",
    "etag": "\"c19-lwPluVDhitahlhNeOX0ZPbNzNnI\"",
    "mtime": "2023-04-24T21:56:58.074Z",
    "size": 3097,
    "path": "../public/_nuxt/PropertiesGrid.84565028.js"
  },
  "/_nuxt/PropertiesPageHeader.27e8ffd1.js": {
    "type": "application/javascript",
    "etag": "\"6aa-I9N/3v3Q9p7zyfLzgMeY8tP9n7w\"",
    "mtime": "2023-04-24T21:56:58.073Z",
    "size": 1706,
    "path": "../public/_nuxt/PropertiesPageHeader.27e8ffd1.js"
  },
  "/_nuxt/PropertiesSearch.06cdb8df.js": {
    "type": "application/javascript",
    "etag": "\"c1b-b7S9LOj67Zz2iFMicfYqPTndYd4\"",
    "mtime": "2023-04-24T21:56:58.073Z",
    "size": 3099,
    "path": "../public/_nuxt/PropertiesSearch.06cdb8df.js"
  },
  "/_nuxt/PropertiesUpsert.def003a1.js": {
    "type": "application/javascript",
    "etag": "\"249e-BOaWScim0upBEW1Ba1IwGic82+M\"",
    "mtime": "2023-04-24T21:56:58.072Z",
    "size": 9374,
    "path": "../public/_nuxt/PropertiesUpsert.def003a1.js"
  },
  "/_nuxt/Props.1524028e.js": {
    "type": "application/javascript",
    "etag": "\"d34-xehrzFGjm9qYdlh6rnW8biiaLMw\"",
    "mtime": "2023-04-24T21:56:58.072Z",
    "size": 3380,
    "path": "../public/_nuxt/Props.1524028e.js"
  },
  "/_nuxt/ProseA.cbe14f21.js": {
    "type": "application/javascript",
    "etag": "\"21a-DsMJoJCAV9VDeTgJj9/k2b3s6MU\"",
    "mtime": "2023-04-24T21:56:58.071Z",
    "size": 538,
    "path": "../public/_nuxt/ProseA.cbe14f21.js"
  },
  "/_nuxt/ProseA.e2976377.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"47f-Bd1cJI2QymcfBXsls3kQ5ZE7caw\"",
    "mtime": "2023-04-24T21:56:58.070Z",
    "size": 1151,
    "path": "../public/_nuxt/ProseA.e2976377.css"
  },
  "/_nuxt/ProseBlockquote.830ba946.js": {
    "type": "application/javascript",
    "etag": "\"14e-CzXIdWB5cZ6I4GrPQ+JxTfonpEI\"",
    "mtime": "2023-04-24T21:56:58.070Z",
    "size": 334,
    "path": "../public/_nuxt/ProseBlockquote.830ba946.js"
  },
  "/_nuxt/ProseBlockquote.fa85f476.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"262-fs+d+3AfSUaK8XtPGzf+VqUouFo\"",
    "mtime": "2023-04-24T21:56:58.069Z",
    "size": 610,
    "path": "../public/_nuxt/ProseBlockquote.fa85f476.css"
  },
  "/_nuxt/ProseCode.b2c88ada.js": {
    "type": "application/javascript",
    "etag": "\"7b9-Zu97i+mK7NY98nkIUDkAKEYO2/Q\"",
    "mtime": "2023-04-24T21:56:58.069Z",
    "size": 1977,
    "path": "../public/_nuxt/ProseCode.b2c88ada.js"
  },
  "/_nuxt/ProseCode.c324a1f0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c74-JYWe5NjI8c18zcuTkkAFtBy+9Z0\"",
    "mtime": "2023-04-24T21:56:58.068Z",
    "size": 3188,
    "path": "../public/_nuxt/ProseCode.c324a1f0.css"
  },
  "/_nuxt/ProseCodeInline.21ce328c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d1-1/Z1/IkqkivW4P3OS3+WKgWaimM\"",
    "mtime": "2023-04-24T21:56:58.067Z",
    "size": 721,
    "path": "../public/_nuxt/ProseCodeInline.21ce328c.css"
  },
  "/_nuxt/ProseCodeInline.8aece371.js": {
    "type": "application/javascript",
    "etag": "\"148-S7K6TCD/clv8cSNuWc+jw6McSx4\"",
    "mtime": "2023-04-24T21:56:58.067Z",
    "size": 328,
    "path": "../public/_nuxt/ProseCodeInline.8aece371.js"
  },
  "/_nuxt/ProseEm.26a085fc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f-/WrDUH4MFh0hLZFKn/kRGt7Vtc0\"",
    "mtime": "2023-04-24T21:56:58.066Z",
    "size": 79,
    "path": "../public/_nuxt/ProseEm.26a085fc.css"
  },
  "/_nuxt/ProseEm.62605d65.js": {
    "type": "application/javascript",
    "etag": "\"139-OTIr83vYyH6Dmp77Ipq3Rs7Vt8c\"",
    "mtime": "2023-04-24T21:56:58.066Z",
    "size": 313,
    "path": "../public/_nuxt/ProseEm.62605d65.js"
  },
  "/_nuxt/ProseH1.bd732a34.js": {
    "type": "application/javascript",
    "etag": "\"3bd-ANJFGQ7OlkIcDxVWDIEH/n78D5g\"",
    "mtime": "2023-04-24T21:56:58.065Z",
    "size": 957,
    "path": "../public/_nuxt/ProseH1.bd732a34.js"
  },
  "/_nuxt/ProseH1.e1e961cd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f8-aRnNfaUDYvwsTmpejIkdpTXZ8AU\"",
    "mtime": "2023-04-24T21:56:58.065Z",
    "size": 504,
    "path": "../public/_nuxt/ProseH1.e1e961cd.css"
  },
  "/_nuxt/ProseH2.c52aed63.js": {
    "type": "application/javascript",
    "etag": "\"3bd-K2DuMiB070rq29ZrIoSD9R+9P50\"",
    "mtime": "2023-04-24T21:56:58.064Z",
    "size": 957,
    "path": "../public/_nuxt/ProseH2.c52aed63.js"
  },
  "/_nuxt/ProseH2.e253cafd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f8-DBrRnkd6yf3z/zIIyppkmqYx2W8\"",
    "mtime": "2023-04-24T21:56:58.063Z",
    "size": 504,
    "path": "../public/_nuxt/ProseH2.e253cafd.css"
  },
  "/_nuxt/ProseH3.7fc1be82.js": {
    "type": "application/javascript",
    "etag": "\"3bd-mS+jxe47hrMnm1+KE5pmEttnpd8\"",
    "mtime": "2023-04-24T21:56:58.063Z",
    "size": 957,
    "path": "../public/_nuxt/ProseH3.7fc1be82.js"
  },
  "/_nuxt/ProseH3.8da2d137.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f8-yrzO+JVGtF+0WpTe1DRwu+ioKMM\"",
    "mtime": "2023-04-24T21:56:58.062Z",
    "size": 504,
    "path": "../public/_nuxt/ProseH3.8da2d137.css"
  },
  "/_nuxt/ProseH4.3bd8e4d1.js": {
    "type": "application/javascript",
    "etag": "\"3bd-hIpTd1MEUY0hz0OWKdDBRayUwMI\"",
    "mtime": "2023-04-24T21:56:58.062Z",
    "size": 957,
    "path": "../public/_nuxt/ProseH4.3bd8e4d1.js"
  },
  "/_nuxt/ProseH4.f75faa9e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f8-IEZZ3MAByjJ08BMJ9M2UiD87q44\"",
    "mtime": "2023-04-24T21:56:58.061Z",
    "size": 504,
    "path": "../public/_nuxt/ProseH4.f75faa9e.css"
  },
  "/_nuxt/ProseH5.6e4f468f.js": {
    "type": "application/javascript",
    "etag": "\"3bd-zqpv5jTikMMqzfWuTmE4mOGYa/o\"",
    "mtime": "2023-04-24T21:56:58.061Z",
    "size": 957,
    "path": "../public/_nuxt/ProseH5.6e4f468f.js"
  },
  "/_nuxt/ProseH5.ad165fe2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c9-JNEeBDZizdcYFbqjVlZYi8vlP+o\"",
    "mtime": "2023-04-24T21:56:58.060Z",
    "size": 457,
    "path": "../public/_nuxt/ProseH5.ad165fe2.css"
  },
  "/_nuxt/ProseH6.4b379fb1.js": {
    "type": "application/javascript",
    "etag": "\"3bd-3iIXzmDhz0PwnQBRLvdKVu5qOrE\"",
    "mtime": "2023-04-24T21:56:58.059Z",
    "size": 957,
    "path": "../public/_nuxt/ProseH6.4b379fb1.js"
  },
  "/_nuxt/ProseH6.98a17339.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c9-vYqtKF5eq2j8R20k5Awp5jy1eXk\"",
    "mtime": "2023-04-24T21:56:58.059Z",
    "size": 457,
    "path": "../public/_nuxt/ProseH6.98a17339.css"
  },
  "/_nuxt/ProseHr.9b0d9aac.js": {
    "type": "application/javascript",
    "etag": "\"10d-ZMWLPSewo56vaeAARF900ntGu0o\"",
    "mtime": "2023-04-24T21:56:58.058Z",
    "size": 269,
    "path": "../public/_nuxt/ProseHr.9b0d9aac.js"
  },
  "/_nuxt/ProseHr.c7c78bbe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"80-INEPhPPD9t2+R6o6gFRIQ5CI4Ik\"",
    "mtime": "2023-04-24T21:56:58.058Z",
    "size": 128,
    "path": "../public/_nuxt/ProseHr.c7c78bbe.css"
  },
  "/_nuxt/ProseImg.018721e2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"35-/P+VAtl+aDWpPVCPQAbTsFW52HM\"",
    "mtime": "2023-04-24T21:56:58.057Z",
    "size": 53,
    "path": "../public/_nuxt/ProseImg.018721e2.css"
  },
  "/_nuxt/ProseImg.5f98402d.js": {
    "type": "application/javascript",
    "etag": "\"2c0-8xTLibyIkBBDZPHal3j1kV/XuFk\"",
    "mtime": "2023-04-24T21:56:58.056Z",
    "size": 704,
    "path": "../public/_nuxt/ProseImg.5f98402d.js"
  },
  "/_nuxt/ProseLi.62ca0107.js": {
    "type": "application/javascript",
    "etag": "\"139-t2VeWttd/7kIurgZeF5njUrDaUI\"",
    "mtime": "2023-04-24T21:56:58.056Z",
    "size": 313,
    "path": "../public/_nuxt/ProseLi.62ca0107.js"
  },
  "/_nuxt/ProseLi.ac05b421.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"91-eiqKu/ywnE10Nr/KZRFEXPPAFjo\"",
    "mtime": "2023-04-24T21:56:58.055Z",
    "size": 145,
    "path": "../public/_nuxt/ProseLi.ac05b421.css"
  },
  "/_nuxt/ProseOl.0b68a383.js": {
    "type": "application/javascript",
    "etag": "\"13e-No3zZ687OfMBRutmQDEJTO7QM7Y\"",
    "mtime": "2023-04-24T21:56:58.055Z",
    "size": 318,
    "path": "../public/_nuxt/ProseOl.0b68a383.js"
  },
  "/_nuxt/ProseOl.987a3cd5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17b-Uspv2a4Jau9LfRlhs7gh7b1macE\"",
    "mtime": "2023-04-24T21:56:58.054Z",
    "size": 379,
    "path": "../public/_nuxt/ProseOl.987a3cd5.css"
  },
  "/_nuxt/ProseP.0926b9f3.js": {
    "type": "application/javascript",
    "etag": "\"13c-Tt6V2wmcMFQfWRuFf90czUJd/O0\"",
    "mtime": "2023-04-24T21:56:58.053Z",
    "size": 316,
    "path": "../public/_nuxt/ProseP.0926b9f3.js"
  },
  "/_nuxt/ProseP.945916cd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f0-wFnUHeg48g/JyGSDwWH/o0sfb10\"",
    "mtime": "2023-04-24T21:56:58.053Z",
    "size": 240,
    "path": "../public/_nuxt/ProseP.945916cd.css"
  },
  "/_nuxt/ProseStrong.1352f042.js": {
    "type": "application/javascript",
    "etag": "\"141-ZhWfR0HpZf4GF9Vg4U/bsKyw924\"",
    "mtime": "2023-04-24T21:56:58.052Z",
    "size": 321,
    "path": "../public/_nuxt/ProseStrong.1352f042.js"
  },
  "/_nuxt/ProseStrong.263d77e1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6c-MD65Ps8jSjh1cMdTmfC4f+7oAlU\"",
    "mtime": "2023-04-24T21:56:58.052Z",
    "size": 108,
    "path": "../public/_nuxt/ProseStrong.263d77e1.css"
  },
  "/_nuxt/ProseTable.547347fc.js": {
    "type": "application/javascript",
    "etag": "\"16d-5SKImyt5PS5KZI5zlJPq65BUKfY\"",
    "mtime": "2023-04-24T21:56:58.051Z",
    "size": 365,
    "path": "../public/_nuxt/ProseTable.547347fc.js"
  },
  "/_nuxt/ProseTable.c65fbffe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"164-lnhXgUriM9WndiBRXv31OET1Xko\"",
    "mtime": "2023-04-24T21:56:58.050Z",
    "size": 356,
    "path": "../public/_nuxt/ProseTable.c65fbffe.css"
  },
  "/_nuxt/ProseTbody.e73b0914.js": {
    "type": "application/javascript",
    "etag": "\"f2-l+7otV9ZJS+ympKikt8xRe2oRtM\"",
    "mtime": "2023-04-24T21:56:58.050Z",
    "size": 242,
    "path": "../public/_nuxt/ProseTbody.e73b0914.js"
  },
  "/_nuxt/ProseTd.8dff6631.js": {
    "type": "application/javascript",
    "etag": "\"139-evkDkuUfuLzGMhGYOIGr7oZV/tQ\"",
    "mtime": "2023-04-24T21:56:58.049Z",
    "size": 313,
    "path": "../public/_nuxt/ProseTd.8dff6631.js"
  },
  "/_nuxt/ProseTd.cd8fde4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10e-PtYThxn1bqNyaoIsMlARhEWZZ04\"",
    "mtime": "2023-04-24T21:56:58.048Z",
    "size": 270,
    "path": "../public/_nuxt/ProseTd.cd8fde4d.css"
  },
  "/_nuxt/ProseTh.4e8fa436.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"161-WEYZi3wV7//CXzgqZKUKB3hDs7g\"",
    "mtime": "2023-04-24T21:56:58.048Z",
    "size": 353,
    "path": "../public/_nuxt/ProseTh.4e8fa436.css"
  },
  "/_nuxt/ProseTh.79beac1f.js": {
    "type": "application/javascript",
    "etag": "\"139-rHk47ioYMzkXd6a1WsA2/o7PHgI\"",
    "mtime": "2023-04-24T21:56:58.047Z",
    "size": 313,
    "path": "../public/_nuxt/ProseTh.79beac1f.js"
  },
  "/_nuxt/ProseThead.332c0b8a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"172-PHOMt/h1NbLuYickVBw+mixlAp4\"",
    "mtime": "2023-04-24T21:56:58.047Z",
    "size": 370,
    "path": "../public/_nuxt/ProseThead.332c0b8a.css"
  },
  "/_nuxt/ProseThead.342ca747.js": {
    "type": "application/javascript",
    "etag": "\"13f-L1j5gSrRPfFOW7GfLOZ5Ah6NKck\"",
    "mtime": "2023-04-24T21:56:58.046Z",
    "size": 319,
    "path": "../public/_nuxt/ProseThead.342ca747.js"
  },
  "/_nuxt/ProseTr.65bec588.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a4-8+Ah6srlM/sVnhpyI2/xpaSKd9I\"",
    "mtime": "2023-04-24T21:56:58.045Z",
    "size": 164,
    "path": "../public/_nuxt/ProseTr.65bec588.css"
  },
  "/_nuxt/ProseTr.f871d67c.js": {
    "type": "application/javascript",
    "etag": "\"139-m9nmQTVqXTug/XLCE8zs0FD4Dtg\"",
    "mtime": "2023-04-24T21:56:58.045Z",
    "size": 313,
    "path": "../public/_nuxt/ProseTr.f871d67c.js"
  },
  "/_nuxt/ProseUl.a51ada81.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17b-W/sUvlix7f9Qo8Scw39EZDaMj3w\"",
    "mtime": "2023-04-24T21:56:58.044Z",
    "size": 379,
    "path": "../public/_nuxt/ProseUl.a51ada81.css"
  },
  "/_nuxt/ProseUl.ce85b305.js": {
    "type": "application/javascript",
    "etag": "\"139-EEDDe4ksm72b6gxPUOulZhAiVIM\"",
    "mtime": "2023-04-24T21:56:58.043Z",
    "size": 313,
    "path": "../public/_nuxt/ProseUl.ce85b305.js"
  },
  "/_nuxt/RegistrationGrid.61d1cd31.js": {
    "type": "application/javascript",
    "etag": "\"9ba-ydGz5c5XyC0qr5FB8/IhEpnkeqw\"",
    "mtime": "2023-04-24T21:56:58.043Z",
    "size": 2490,
    "path": "../public/_nuxt/RegistrationGrid.61d1cd31.js"
  },
  "/_nuxt/RegistrationPageHeader.877014aa.js": {
    "type": "application/javascript",
    "etag": "\"6bb-joXh2cYc0CCR+cnsi9elzJFQU6w\"",
    "mtime": "2023-04-24T21:56:58.042Z",
    "size": 1723,
    "path": "../public/_nuxt/RegistrationPageHeader.877014aa.js"
  },
  "/_nuxt/RegistrationSearch.1963cd66.js": {
    "type": "application/javascript",
    "etag": "\"d37-ufE68LEvLeUpTh5KIzwUWwvc+OU\"",
    "mtime": "2023-04-24T21:56:58.042Z",
    "size": 3383,
    "path": "../public/_nuxt/RegistrationSearch.1963cd66.js"
  },
  "/_nuxt/RegistrationUpsert.d8f4eab2.js": {
    "type": "application/javascript",
    "etag": "\"42fb-p0B86SNkSxIJfGRSgPW59L9lyRI\"",
    "mtime": "2023-04-24T21:56:58.041Z",
    "size": 17147,
    "path": "../public/_nuxt/RegistrationUpsert.d8f4eab2.js"
  },
  "/_nuxt/RoleGrid.2db04e4e.js": {
    "type": "application/javascript",
    "etag": "\"da9-cfmupz6Wao+JVT4A4yZIopcK5Og\"",
    "mtime": "2023-04-24T21:56:58.040Z",
    "size": 3497,
    "path": "../public/_nuxt/RoleGrid.2db04e4e.js"
  },
  "/_nuxt/RoleGrid.c9929602.js": {
    "type": "application/javascript",
    "etag": "\"6ed-OfyuFCSOFr7zT0+c2+Bp+LAwdio\"",
    "mtime": "2023-04-24T21:56:58.040Z",
    "size": 1773,
    "path": "../public/_nuxt/RoleGrid.c9929602.js"
  },
  "/_nuxt/RoleGrid.cd2bf997.js": {
    "type": "application/javascript",
    "etag": "\"da9-50yQd3djeBovvatcZDIMv0zTkUs\"",
    "mtime": "2023-04-24T21:56:58.040Z",
    "size": 3497,
    "path": "../public/_nuxt/RoleGrid.cd2bf997.js"
  },
  "/_nuxt/RoleGridTable.a789a363.js": {
    "type": "application/javascript",
    "etag": "\"28c-etTjUURBUnKKmrBfD1jT1ofnW40\"",
    "mtime": "2023-04-24T21:56:58.039Z",
    "size": 652,
    "path": "../public/_nuxt/RoleGridTable.a789a363.js"
  },
  "/_nuxt/RolePageHeader.3f262e21.js": {
    "type": "application/javascript",
    "etag": "\"7c2-FkpjJP2712IOIkSebm1LKofI3g0\"",
    "mtime": "2023-04-24T21:56:58.039Z",
    "size": 1986,
    "path": "../public/_nuxt/RolePageHeader.3f262e21.js"
  },
  "/_nuxt/RolePageHeader.5c6c2b8d.js": {
    "type": "application/javascript",
    "etag": "\"7c2-FkpjJP2712IOIkSebm1LKofI3g0\"",
    "mtime": "2023-04-24T21:56:58.038Z",
    "size": 1986,
    "path": "../public/_nuxt/RolePageHeader.5c6c2b8d.js"
  },
  "/_nuxt/RolePageHeader.bcaee1b7.js": {
    "type": "application/javascript",
    "etag": "\"7bd-e2pNYbUL1JFMYXsQ3UPMX0BT4l8\"",
    "mtime": "2023-04-24T21:56:58.038Z",
    "size": 1981,
    "path": "../public/_nuxt/RolePageHeader.bcaee1b7.js"
  },
  "/_nuxt/RoleSearch.3d2be193.js": {
    "type": "application/javascript",
    "etag": "\"1143-gBHuQf/5sIKNFnP59HOQtcr2cdM\"",
    "mtime": "2023-04-24T21:56:58.037Z",
    "size": 4419,
    "path": "../public/_nuxt/RoleSearch.3d2be193.js"
  },
  "/_nuxt/RoleSearch.5837da35.js": {
    "type": "application/javascript",
    "etag": "\"9f5-qb3Q6RMbUyDCuv7YzF53JACVyZE\"",
    "mtime": "2023-04-24T21:56:58.037Z",
    "size": 2549,
    "path": "../public/_nuxt/RoleSearch.5837da35.js"
  },
  "/_nuxt/RoleSearch.df0ea072.js": {
    "type": "application/javascript",
    "etag": "\"1143-7O4ac5f6hRc/zyfQJWQGqXxyUeo\"",
    "mtime": "2023-04-24T21:56:58.036Z",
    "size": 4419,
    "path": "../public/_nuxt/RoleSearch.df0ea072.js"
  },
  "/_nuxt/RoleUpsert.80d7158c.js": {
    "type": "application/javascript",
    "etag": "\"2214-2dt3S2aNZPcCMYswf5lKR4tGVcU\"",
    "mtime": "2023-04-24T21:56:58.035Z",
    "size": 8724,
    "path": "../public/_nuxt/RoleUpsert.80d7158c.js"
  },
  "/_nuxt/RoleUpsert.bcc6612d.js": {
    "type": "application/javascript",
    "etag": "\"2214-AINN/W7NbKFGa7JwBOfN6kfBV8A\"",
    "mtime": "2023-04-24T21:56:58.034Z",
    "size": 8724,
    "path": "../public/_nuxt/RoleUpsert.bcc6612d.js"
  },
  "/_nuxt/RoleUpsert.f45ea1fd.js": {
    "type": "application/javascript",
    "etag": "\"1861-BQTS3stPSR009kNaaal8in+gZSM\"",
    "mtime": "2023-04-24T21:56:58.034Z",
    "size": 6241,
    "path": "../public/_nuxt/RoleUpsert.f45ea1fd.js"
  },
  "/_nuxt/Sandbox.22b84bde.js": {
    "type": "application/javascript",
    "etag": "\"63d-CPCeJilPpEU0P0KYfN9PJgGI598\"",
    "mtime": "2023-04-24T21:56:58.034Z",
    "size": 1597,
    "path": "../public/_nuxt/Sandbox.22b84bde.js"
  },
  "/_nuxt/Sandbox.cca703cd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b3-mHxEbUrTDVS69EfFsv//OsC6XxA\"",
    "mtime": "2023-04-24T21:56:58.033Z",
    "size": 435,
    "path": "../public/_nuxt/Sandbox.cca703cd.css"
  },
  "/_nuxt/SecondaryNav.0f62e6aa.js": {
    "type": "application/javascript",
    "etag": "\"719-Be6qk27yUp3cI8Xuon5Kg2jvRbw\"",
    "mtime": "2023-04-24T21:56:58.032Z",
    "size": 1817,
    "path": "../public/_nuxt/SecondaryNav.0f62e6aa.js"
  },
  "/_nuxt/Security.afae6cae.js": {
    "type": "application/javascript",
    "etag": "\"ec8-Sq5/WrnBZQfsy00SJPgEVPI7dT8\"",
    "mtime": "2023-04-24T21:56:58.032Z",
    "size": 3784,
    "path": "../public/_nuxt/Security.afae6cae.js"
  },
  "/_nuxt/SoftwareVersion.259c96c0.js": {
    "type": "application/javascript",
    "etag": "\"61a3-0TEk6rdNf6WjRC0x1AQPpd81s9s\"",
    "mtime": "2023-04-24T21:56:58.031Z",
    "size": 24995,
    "path": "../public/_nuxt/SoftwareVersion.259c96c0.js"
  },
  "/_nuxt/SourceLink.2c6db1d2.js": {
    "type": "application/javascript",
    "etag": "\"13e-2GQmrFrR0n9pPwJFiUHrZPlN30M\"",
    "mtime": "2023-04-24T21:56:58.030Z",
    "size": 318,
    "path": "../public/_nuxt/SourceLink.2c6db1d2.js"
  },
  "/_nuxt/TabsHeader.56d3bbc7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6a6-LCAge+xW5+p5e4FXAJ85Zxp0wtc\"",
    "mtime": "2023-04-24T21:56:58.030Z",
    "size": 1702,
    "path": "../public/_nuxt/TabsHeader.56d3bbc7.css"
  },
  "/_nuxt/TabsHeader.70d7923a.js": {
    "type": "application/javascript",
    "etag": "\"4e4-ycHfGGV9rp4lXB0bGmbZOD2yP0w\"",
    "mtime": "2023-04-24T21:56:58.029Z",
    "size": 1252,
    "path": "../public/_nuxt/TabsHeader.70d7923a.js"
  },
  "/_nuxt/Terminal.c7b70f5d.js": {
    "type": "application/javascript",
    "etag": "\"532-4/1sHrZiZ6X8zbayvdrRdUbEAm0\"",
    "mtime": "2023-04-24T21:56:58.028Z",
    "size": 1330,
    "path": "../public/_nuxt/Terminal.c7b70f5d.js"
  },
  "/_nuxt/Terminal.f422c615.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b1e-ZLxn7N24puHhqaOZYtjgtCfm+ps\"",
    "mtime": "2023-04-24T21:56:58.028Z",
    "size": 2846,
    "path": "../public/_nuxt/Terminal.f422c615.css"
  },
  "/_nuxt/ThemeSelect.035fd382.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"117-WJqLkY2GMozR8GzNZ942SpXF21w\"",
    "mtime": "2023-04-24T21:56:58.027Z",
    "size": 279,
    "path": "../public/_nuxt/ThemeSelect.035fd382.css"
  },
  "/_nuxt/ThemeSelect.5d526c7c.js": {
    "type": "application/javascript",
    "etag": "\"49a-PhK483zpJIMcqQDsWJuyVfqkZ9M\"",
    "mtime": "2023-04-24T21:56:58.026Z",
    "size": 1178,
    "path": "../public/_nuxt/ThemeSelect.5d526c7c.js"
  },
  "/_nuxt/TokensPlayground.9198d9f0.js": {
    "type": "application/javascript",
    "etag": "\"ff-E/hBmyg8Uv6N1F2Mthj+Ngju4uc\"",
    "mtime": "2023-04-24T21:56:58.026Z",
    "size": 255,
    "path": "../public/_nuxt/TokensPlayground.9198d9f0.js"
  },
  "/_nuxt/TypeGrid.e9888dcb.js": {
    "type": "application/javascript",
    "etag": "\"d9a-koTs0aWRUHiBdDlIBc90Z3ED97U\"",
    "mtime": "2023-04-24T21:56:58.025Z",
    "size": 3482,
    "path": "../public/_nuxt/TypeGrid.e9888dcb.js"
  },
  "/_nuxt/TypePageHeader.26922a3b.js": {
    "type": "application/javascript",
    "etag": "\"7c2-cR04o77K1dm+/4y0qXrQEiYLmHg\"",
    "mtime": "2023-04-24T21:56:58.025Z",
    "size": 1986,
    "path": "../public/_nuxt/TypePageHeader.26922a3b.js"
  },
  "/_nuxt/TypeSearch.71196b0c.js": {
    "type": "application/javascript",
    "etag": "\"113e-VGdzfN6lpJhjrPBafY7Q4wJj4LY\"",
    "mtime": "2023-04-24T21:56:58.024Z",
    "size": 4414,
    "path": "../public/_nuxt/TypeSearch.71196b0c.js"
  },
  "/_nuxt/TypeUpsert.48c53052.js": {
    "type": "application/javascript",
    "etag": "\"2218-32UiX9zMNxJMfY8kCEZ13Y3qCQk\"",
    "mtime": "2023-04-24T21:56:58.023Z",
    "size": 8728,
    "path": "../public/_nuxt/TypeUpsert.48c53052.js"
  },
  "/_nuxt/UserGrid.4d047c8e.js": {
    "type": "application/javascript",
    "etag": "\"71b-LWQxw+Tao+jDV5XEax0xGV5naBk\"",
    "mtime": "2023-04-24T21:56:58.023Z",
    "size": 1819,
    "path": "../public/_nuxt/UserGrid.4d047c8e.js"
  },
  "/_nuxt/UserGridTable.bf807747.js": {
    "type": "application/javascript",
    "etag": "\"28c-d6FxLCaKYJRZaT5det6/ZkkOjiw\"",
    "mtime": "2023-04-24T21:56:58.022Z",
    "size": 652,
    "path": "../public/_nuxt/UserGridTable.bf807747.js"
  },
  "/_nuxt/UserPageHeader.e820d79b.js": {
    "type": "application/javascript",
    "etag": "\"7bd-s4/jk+DspDYWXS5LzAdwfq2/jcg\"",
    "mtime": "2023-04-24T21:56:58.022Z",
    "size": 1981,
    "path": "../public/_nuxt/UserPageHeader.e820d79b.js"
  },
  "/_nuxt/UserProfile.22bc5d09.js": {
    "type": "application/javascript",
    "etag": "\"10d4-RVSw2zYBVuZ64nX9H/0f4hPJyhU\"",
    "mtime": "2023-04-24T21:56:58.021Z",
    "size": 4308,
    "path": "../public/_nuxt/UserProfile.22bc5d09.js"
  },
  "/_nuxt/UserSearch.52df10f3.js": {
    "type": "application/javascript",
    "etag": "\"9fe-dJubkTYK+aWvlRYqLcl3yWn5PF4\"",
    "mtime": "2023-04-24T21:56:58.021Z",
    "size": 2558,
    "path": "../public/_nuxt/UserSearch.52df10f3.js"
  },
  "/_nuxt/UserSignup.b374da2b.js": {
    "type": "application/javascript",
    "etag": "\"1208-WaYdvjmTfZLbfeRXsvUlNl2TvbY\"",
    "mtime": "2023-04-24T21:56:58.020Z",
    "size": 4616,
    "path": "../public/_nuxt/UserSignup.b374da2b.js"
  },
  "/_nuxt/UserSignup.cc1ed525.js": {
    "type": "application/javascript",
    "etag": "\"128c-BumkxbfMwuCe5XNwoMcbKz5wJic\"",
    "mtime": "2023-04-24T21:56:58.020Z",
    "size": 4748,
    "path": "../public/_nuxt/UserSignup.cc1ed525.js"
  },
  "/_nuxt/UserUpsert.62c92877.js": {
    "type": "application/javascript",
    "etag": "\"24e6-HJ460xiq+6iGPRdM6apiM+rpsEY\"",
    "mtime": "2023-04-24T21:56:58.019Z",
    "size": 9446,
    "path": "../public/_nuxt/UserUpsert.62c92877.js"
  },
  "/_nuxt/UsersGrid.06147d00.js": {
    "type": "application/javascript",
    "etag": "\"a34-oL1ufblh5pFUdw2D7G6Cki7aLUE\"",
    "mtime": "2023-04-24T21:56:58.018Z",
    "size": 2612,
    "path": "../public/_nuxt/UsersGrid.06147d00.js"
  },
  "/_nuxt/UsersPageHeader.d5491167.js": {
    "type": "application/javascript",
    "etag": "\"708-dD1Aiz8cs2pQebtoBgTbvCHC+mY\"",
    "mtime": "2023-04-24T21:56:58.017Z",
    "size": 1800,
    "path": "../public/_nuxt/UsersPageHeader.d5491167.js"
  },
  "/_nuxt/UsersPageHeader.f98f042a.js": {
    "type": "application/javascript",
    "etag": "\"63b-L9DVpJvl2yldIJLmV8TN4vcEyc8\"",
    "mtime": "2023-04-24T21:56:58.016Z",
    "size": 1595,
    "path": "../public/_nuxt/UsersPageHeader.f98f042a.js"
  },
  "/_nuxt/UsersSearch.7825d6c3.js": {
    "type": "application/javascript",
    "etag": "\"ac5-vSmDEyZQXAdZ2N33v4+l6uANBwY\"",
    "mtime": "2023-04-24T21:56:58.015Z",
    "size": 2757,
    "path": "../public/_nuxt/UsersSearch.7825d6c3.js"
  },
  "/_nuxt/UsersSearch.94f0e0ff.js": {
    "type": "application/javascript",
    "etag": "\"7a3-SS759IFVymexTYYU73DpweuriR4\"",
    "mtime": "2023-04-24T21:56:58.015Z",
    "size": 1955,
    "path": "../public/_nuxt/UsersSearch.94f0e0ff.js"
  },
  "/_nuxt/UsersUpsert.333e8d7b.js": {
    "type": "application/javascript",
    "etag": "\"1edb-4elJQUeerD9CmKd9ToxSVP9xV28\"",
    "mtime": "2023-04-24T21:56:58.014Z",
    "size": 7899,
    "path": "../public/_nuxt/UsersUpsert.333e8d7b.js"
  },
  "/_nuxt/UsersUpsert.e5568aca.js": {
    "type": "application/javascript",
    "etag": "\"1a9e-2DCOhFF6ZKtkJ2Yk6sDkXFB1WL0\"",
    "mtime": "2023-04-24T21:56:58.013Z",
    "size": 6814,
    "path": "../public/_nuxt/UsersUpsert.e5568aca.js"
  },
  "/_nuxt/VideoPlayer.55bb32ed.js": {
    "type": "application/javascript",
    "etag": "\"7af-nRPwnpeZBdNqSByrL0qfrC/VXmE\"",
    "mtime": "2023-04-24T21:56:58.013Z",
    "size": 1967,
    "path": "../public/_nuxt/VideoPlayer.55bb32ed.js"
  },
  "/_nuxt/VideoPlayer.afedae8c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5d8-IrkmvEwgcTRtoeLS0SMvnBUVGkg\"",
    "mtime": "2023-04-24T21:56:58.012Z",
    "size": 1496,
    "path": "../public/_nuxt/VideoPlayer.afedae8c.css"
  },
  "/_nuxt/VoltaBoard.1bf08498.js": {
    "type": "application/javascript",
    "etag": "\"151-cNrZWWp7PWSg6QSQ78v6zvkJvYQ\"",
    "mtime": "2023-04-24T21:56:58.011Z",
    "size": 337,
    "path": "../public/_nuxt/VoltaBoard.1bf08498.js"
  },
  "/_nuxt/VoltaBoard.a5d6b336.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4ce-T4Y7eyTZZLXoes5nCIc24C8K79M\"",
    "mtime": "2023-04-24T21:56:58.011Z",
    "size": 1230,
    "path": "../public/_nuxt/VoltaBoard.a5d6b336.css"
  },
  "/_nuxt/XMarkIcon.eb0e8bbc.js": {
    "type": "application/javascript",
    "etag": "\"149-A6LE5aDE0RywCtbNjMumVHkvdXk\"",
    "mtime": "2023-04-24T21:56:58.010Z",
    "size": 329,
    "path": "../public/_nuxt/XMarkIcon.eb0e8bbc.js"
  },
  "/_nuxt/_...slug_.075d05f5.js": {
    "type": "application/javascript",
    "etag": "\"2fa9-PXukXhHGcl8PEwOG/y8DZwFD0XE\"",
    "mtime": "2023-04-24T21:56:58.008Z",
    "size": 12201,
    "path": "../public/_nuxt/_...slug_.075d05f5.js"
  },
  "/_nuxt/_...slug_.476f2b79.js": {
    "type": "application/javascript",
    "etag": "\"268f-y9ZkFMsBuF7E3VKmhztnKg1KWdM\"",
    "mtime": "2023-04-24T21:56:58.007Z",
    "size": 9871,
    "path": "../public/_nuxt/_...slug_.476f2b79.js"
  },
  "/_nuxt/_...slug_.7a82acff.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e0-IAk1caIx0+PIvu0Lvu9vrk3QRjU\"",
    "mtime": "2023-04-24T21:56:58.006Z",
    "size": 736,
    "path": "../public/_nuxt/_...slug_.7a82acff.css"
  },
  "/_nuxt/_...slug_.8211bf9c.js": {
    "type": "application/javascript",
    "etag": "\"f40-VAXA2hgI2eS4HMN3mGB+Uordi/w\"",
    "mtime": "2023-04-24T21:56:58.006Z",
    "size": 3904,
    "path": "../public/_nuxt/_...slug_.8211bf9c.js"
  },
  "/_nuxt/_...slug_.b58f70b3.js": {
    "type": "application/javascript",
    "etag": "\"1259-GQDSOyr2umGL9mM5hVxD9whGo1E\"",
    "mtime": "2023-04-24T21:56:58.005Z",
    "size": 4697,
    "path": "../public/_nuxt/_...slug_.b58f70b3.js"
  },
  "/_nuxt/_arrayEach.0e9334a0.js": {
    "type": "application/javascript",
    "etag": "\"65-BlN4ojEOuqHqc1MGRJ/d6ESsulQ\"",
    "mtime": "2023-04-24T21:56:58.005Z",
    "size": 101,
    "path": "../public/_nuxt/_arrayEach.0e9334a0.js"
  },
  "/_nuxt/_baseEach.ed2de8af.js": {
    "type": "application/javascript",
    "etag": "\"1df-5CVsSj90F+qkcNK8HaVniexcmYU\"",
    "mtime": "2023-04-24T21:56:58.004Z",
    "size": 479,
    "path": "../public/_nuxt/_baseEach.ed2de8af.js"
  },
  "/_nuxt/_baseIteratee.580569b5.js": {
    "type": "application/javascript",
    "etag": "\"1cd9-NmnegGG7+G+0jC+kz6ewE1ckLYQ\"",
    "mtime": "2023-04-24T21:56:58.004Z",
    "size": 7385,
    "path": "../public/_nuxt/_baseIteratee.580569b5.js"
  },
  "/_nuxt/_baseProperty.3973c195.js": {
    "type": "application/javascript",
    "etag": "\"4d-NNax7rHKMW4XrHMU+70nyejZf4Q\"",
    "mtime": "2023-04-24T21:56:58.003Z",
    "size": 77,
    "path": "../public/_nuxt/_baseProperty.3973c195.js"
  },
  "/_nuxt/_plugin-vue_export-helper.c27b6911.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2023-04-24T21:56:58.003Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.c27b6911.js"
  },
  "/_nuxt/_stringToArray.5b71c590.js": {
    "type": "application/javascript",
    "etag": "\"3d6-HEioyKo0lql0/3UW0VoikZr07+E\"",
    "mtime": "2023-04-24T21:56:58.002Z",
    "size": 982,
    "path": "../public/_nuxt/_stringToArray.5b71c590.js"
  },
  "/_nuxt/_…slug_.3be1666d.js": {
    "type": "application/javascript",
    "etag": "\"25e6-/0tFQS/8lF2XhhFR2orQEEJ1tNI\"",
    "mtime": "2023-04-24T21:56:58.001Z",
    "size": 9702,
    "path": "../public/_nuxt/_…slug_.3be1666d.js"
  },
  "/_nuxt/_…slug_.e296fdbe.js": {
    "type": "application/javascript",
    "etag": "\"3f2-LwcudexZrZpZMzaNNbPoCQ8S9PE\"",
    "mtime": "2023-04-24T21:56:58.000Z",
    "size": 1010,
    "path": "../public/_nuxt/_…slug_.e296fdbe.js"
  },
  "/_nuxt/admin.97891dfe.js": {
    "type": "application/javascript",
    "etag": "\"9c8-dc2ApTXC9XfqxawKR+5GFH6hWmE\"",
    "mtime": "2023-04-24T21:56:58.000Z",
    "size": 2504,
    "path": "../public/_nuxt/admin.97891dfe.js"
  },
  "/_nuxt/auth.6bc6e8f4.js": {
    "type": "application/javascript",
    "etag": "\"83-Bzg1LYSL1Yw8AWzxjE6LhztNV9g\"",
    "mtime": "2023-04-24T21:56:57.999Z",
    "size": 131,
    "path": "../public/_nuxt/auth.6bc6e8f4.js"
  },
  "/_nuxt/billing.5d4c336d.js": {
    "type": "application/javascript",
    "etag": "\"5d6-qEmKECRV8Df+3m06xW7V68Gn+z0\"",
    "mtime": "2023-04-24T21:56:57.998Z",
    "size": 1494,
    "path": "../public/_nuxt/billing.5d4c336d.js"
  },
  "/_nuxt/business-card.2604f359.js": {
    "type": "application/javascript",
    "etag": "\"b9f-NqKvkT2sOpGuP6gGUFi2BqE680o\"",
    "mtime": "2023-04-24T21:56:57.998Z",
    "size": 2975,
    "path": "../public/_nuxt/business-card.2604f359.js"
  },
  "/_nuxt/client-db.aee2cd7e.js": {
    "type": "application/javascript",
    "etag": "\"2b3b-ECGH89mseXrcI1yMiyppPGkonX8\"",
    "mtime": "2023-04-24T21:56:57.997Z",
    "size": 11067,
    "path": "../public/_nuxt/client-db.aee2cd7e.js"
  },
  "/_nuxt/client-only.e4cde69a.js": {
    "type": "application/javascript",
    "etag": "\"1d4-rSDZP7mUTGYMoOsimVfjTM8Rysg\"",
    "mtime": "2023-04-24T21:56:57.996Z",
    "size": 468,
    "path": "../public/_nuxt/client-only.e4cde69a.js"
  },
  "/_nuxt/composables.073efbd9.js": {
    "type": "application/javascript",
    "etag": "\"5a-UQNLvIOQhpwvhdIFDPSLcG9nJjM\"",
    "mtime": "2023-04-24T21:56:57.996Z",
    "size": 90,
    "path": "../public/_nuxt/composables.073efbd9.js"
  },
  "/_nuxt/config.a5798137.js": {
    "type": "application/javascript",
    "etag": "\"3b1-rucavdVIAlipgquMk6cuBvVstw4\"",
    "mtime": "2023-04-24T21:56:57.995Z",
    "size": 945,
    "path": "../public/_nuxt/config.a5798137.js"
  },
  "/_nuxt/debug.f1b1ad21.js": {
    "type": "application/javascript",
    "etag": "\"253-4lO7R/O28NPmupaALY65sLkCXHA\"",
    "mtime": "2023-04-24T21:56:57.995Z",
    "size": 595,
    "path": "../public/_nuxt/debug.f1b1ad21.js"
  },
  "/_nuxt/default.e66f2529.js": {
    "type": "application/javascript",
    "etag": "\"504-rfosxHCFZsZ3mq32xVzxdWiz/1g\"",
    "mtime": "2023-04-24T21:56:57.994Z",
    "size": 1284,
    "path": "../public/_nuxt/default.e66f2529.js"
  },
  "/_nuxt/description.3cfaa39b.js": {
    "type": "application/javascript",
    "etag": "\"615-5XRvq9ljRXemLqbbu/js6EXYgqI\"",
    "mtime": "2023-04-24T21:56:57.994Z",
    "size": 1557,
    "path": "../public/_nuxt/description.3cfaa39b.js"
  },
  "/_nuxt/document-driven.3628ce9b.js": {
    "type": "application/javascript",
    "etag": "\"391-Tp+EyTeUOLDgCHErIt4JzIYGd+M\"",
    "mtime": "2023-04-24T21:56:57.992Z",
    "size": 913,
    "path": "../public/_nuxt/document-driven.3628ce9b.js"
  },
  "/_nuxt/dom.cb3029af.js": {
    "type": "application/javascript",
    "etag": "\"d11-fQlm8GIpwDKuqDJVsKq9KWVFchA\"",
    "mtime": "2023-04-24T21:56:57.992Z",
    "size": 3345,
    "path": "../public/_nuxt/dom.cb3029af.js"
  },
  "/_nuxt/entry.5eee13ba.js": {
    "type": "application/javascript",
    "etag": "\"81184-m6eVKR5D/Miqo9DC7hQnb0bzfqs\"",
    "mtime": "2023-04-24T21:56:57.991Z",
    "size": 528772,
    "path": "../public/_nuxt/entry.5eee13ba.js"
  },
  "/_nuxt/entry.80271485.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c563-lWLo7M32I6aDJY/XxbwMbHIWhqU\"",
    "mtime": "2023-04-24T21:56:57.988Z",
    "size": 116067,
    "path": "../public/_nuxt/entry.80271485.css"
  },
  "/_nuxt/error-component.4b60cc32.js": {
    "type": "application/javascript",
    "etag": "\"2b8-KbyXRjjow40UzYJXgDuHkNxfW+A\"",
    "mtime": "2023-04-24T21:56:57.987Z",
    "size": 696,
    "path": "../public/_nuxt/error-component.4b60cc32.js"
  },
  "/_nuxt/exportToPDF.465c687d.js": {
    "type": "application/javascript",
    "etag": "\"a88c3-WWUyGkDPMSlfusY45ko0kH6Kcsg\"",
    "mtime": "2023-04-24T21:56:57.985Z",
    "size": 690371,
    "path": "../public/_nuxt/exportToPDF.465c687d.js"
  },
  "/_nuxt/filter.443d3446.js": {
    "type": "application/javascript",
    "etag": "\"118-kA4bBNVKlfIriEpSHQlpU+sYSrg\"",
    "mtime": "2023-04-24T21:56:57.982Z",
    "size": 280,
    "path": "../public/_nuxt/filter.443d3446.js"
  },
  "/_nuxt/focus-management.fc3e9b19.js": {
    "type": "application/javascript",
    "etag": "\"d1b-RwRnD4qLXEhYT8MFkTm9AaHN9S4\"",
    "mtime": "2023-04-24T21:56:57.981Z",
    "size": 3355,
    "path": "../public/_nuxt/focus-management.fc3e9b19.js"
  },
  "/_nuxt/head.0454c221.js": {
    "type": "application/javascript",
    "etag": "\"24d-1airW7QO/fycLPnQTfwJKzuVp1c\"",
    "mtime": "2023-04-24T21:56:57.981Z",
    "size": 589,
    "path": "../public/_nuxt/head.0454c221.js"
  },
  "/_nuxt/highlighter.5e09c982.js": {
    "type": "application/javascript",
    "etag": "\"45713-XACn7FxTuETtouuRRB+JVs9FZrk\"",
    "mtime": "2023-04-24T21:56:57.979Z",
    "size": 284435,
    "path": "../public/_nuxt/highlighter.5e09c982.js"
  },
  "/_nuxt/html2canvas.esm.0a33ed42.js": {
    "type": "application/javascript",
    "etag": "\"3165d-s3ts3WDwI4ZgJRb4+yrIZyl0sWI\"",
    "mtime": "2023-04-24T21:56:57.976Z",
    "size": 202333,
    "path": "../public/_nuxt/html2canvas.esm.0a33ed42.js"
  },
  "/_nuxt/index.01d53c2e.js": {
    "type": "application/javascript",
    "etag": "\"ab6-153ueAIAlKjvTZFkHdGChxJyElc\"",
    "mtime": "2023-04-24T21:56:57.974Z",
    "size": 2742,
    "path": "../public/_nuxt/index.01d53c2e.js"
  },
  "/_nuxt/index.0c288cc6.js": {
    "type": "application/javascript",
    "etag": "\"b2b-LgsTMhrKbS/r0dRX/B6nOxY4Csg\"",
    "mtime": "2023-04-24T21:56:57.973Z",
    "size": 2859,
    "path": "../public/_nuxt/index.0c288cc6.js"
  },
  "/_nuxt/index.0e1303bd.js": {
    "type": "application/javascript",
    "etag": "\"b60-3TjRu7OBJCcv1L+ZjwDFNhPWxHQ\"",
    "mtime": "2023-04-24T21:56:57.973Z",
    "size": 2912,
    "path": "../public/_nuxt/index.0e1303bd.js"
  },
  "/_nuxt/index.18005c48.js": {
    "type": "application/javascript",
    "etag": "\"b13-EuSBIgeQ4HJGGwtYbAg1L09QJbY\"",
    "mtime": "2023-04-24T21:56:57.972Z",
    "size": 2835,
    "path": "../public/_nuxt/index.18005c48.js"
  },
  "/_nuxt/index.23de1adc.js": {
    "type": "application/javascript",
    "etag": "\"b46-lJZge0H01knVG86aDDbD/+HfDZk\"",
    "mtime": "2023-04-24T21:56:57.971Z",
    "size": 2886,
    "path": "../public/_nuxt/index.23de1adc.js"
  },
  "/_nuxt/index.2d41e66c.js": {
    "type": "application/javascript",
    "etag": "\"ba8-w1TweLxPQCMobsINA1/wYV9cRhg\"",
    "mtime": "2023-04-24T21:56:57.971Z",
    "size": 2984,
    "path": "../public/_nuxt/index.2d41e66c.js"
  },
  "/_nuxt/index.31697715.js": {
    "type": "application/javascript",
    "etag": "\"86b-6tkUaFo/F7FLqa74mxOJTS0NGYg\"",
    "mtime": "2023-04-24T21:56:57.970Z",
    "size": 2155,
    "path": "../public/_nuxt/index.31697715.js"
  },
  "/_nuxt/index.35e4c453.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f0b-4DkaJSIsMaynoenauCkQxk3RRYU\"",
    "mtime": "2023-04-24T21:56:57.970Z",
    "size": 24331,
    "path": "../public/_nuxt/index.35e4c453.css"
  },
  "/_nuxt/index.3708a647.js": {
    "type": "application/javascript",
    "etag": "\"74c-UDqJiM/CGbB4ZmH5MqI+WPZLrCI\"",
    "mtime": "2023-04-24T21:56:57.969Z",
    "size": 1868,
    "path": "../public/_nuxt/index.3708a647.js"
  },
  "/_nuxt/index.3be5ccd0.js": {
    "type": "application/javascript",
    "etag": "\"a5e-PzHNFrUuZhxaWutTs5Za72O7AC8\"",
    "mtime": "2023-04-24T21:56:57.969Z",
    "size": 2654,
    "path": "../public/_nuxt/index.3be5ccd0.js"
  },
  "/_nuxt/index.4607f6e8.js": {
    "type": "application/javascript",
    "etag": "\"b2b-fbnNdQnUC087ANcM2RjxvX51DaY\"",
    "mtime": "2023-04-24T21:56:57.968Z",
    "size": 2859,
    "path": "../public/_nuxt/index.4607f6e8.js"
  },
  "/_nuxt/index.4d6025c7.js": {
    "type": "application/javascript",
    "etag": "\"ba3-ZUf8FP6GQWV5bq2SbeGRYjYjt4Y\"",
    "mtime": "2023-04-24T21:56:57.967Z",
    "size": 2979,
    "path": "../public/_nuxt/index.4d6025c7.js"
  },
  "/_nuxt/index.5b433ad6.js": {
    "type": "application/javascript",
    "etag": "\"b58-BM0mOq84hLx0occeqA0vU5FItoQ\"",
    "mtime": "2023-04-24T21:56:57.966Z",
    "size": 2904,
    "path": "../public/_nuxt/index.5b433ad6.js"
  },
  "/_nuxt/index.68a99025.js": {
    "type": "application/javascript",
    "etag": "\"3b54-CrD2vLoRFPQFU7jwHgJ2IOrt2u0\"",
    "mtime": "2023-04-24T21:56:57.966Z",
    "size": 15188,
    "path": "../public/_nuxt/index.68a99025.js"
  },
  "/_nuxt/index.76300623.js": {
    "type": "application/javascript",
    "etag": "\"b8e-kTIpR3V/mY4zBzTbTZED9eMdqD4\"",
    "mtime": "2023-04-24T21:56:57.965Z",
    "size": 2958,
    "path": "../public/_nuxt/index.76300623.js"
  },
  "/_nuxt/index.79fffb63.js": {
    "type": "application/javascript",
    "etag": "\"20da8-onahdJ+HCHpVcLpy1ZJHu8ZG178\"",
    "mtime": "2023-04-24T21:56:57.964Z",
    "size": 134568,
    "path": "../public/_nuxt/index.79fffb63.js"
  },
  "/_nuxt/index.7c1852bb.js": {
    "type": "application/javascript",
    "etag": "\"ba0-VmLtjPHBHIZjc6OxzB+pmxWJ2C0\"",
    "mtime": "2023-04-24T21:56:57.962Z",
    "size": 2976,
    "path": "../public/_nuxt/index.7c1852bb.js"
  },
  "/_nuxt/index.7de56156.js": {
    "type": "application/javascript",
    "etag": "\"1397-7ftndpeiIp550G4T/KfEEU+vQ+8\"",
    "mtime": "2023-04-24T21:56:57.961Z",
    "size": 5015,
    "path": "../public/_nuxt/index.7de56156.js"
  },
  "/_nuxt/index.8f85f4fd.js": {
    "type": "application/javascript",
    "etag": "\"b58-OgFpyqITxwBf+FbYf8oOq0H1PA0\"",
    "mtime": "2023-04-24T21:56:57.961Z",
    "size": 2904,
    "path": "../public/_nuxt/index.8f85f4fd.js"
  },
  "/_nuxt/index.9669c578.js": {
    "type": "application/javascript",
    "etag": "\"75d-pkPect5LTXL84sELMwfwxClWGjw\"",
    "mtime": "2023-04-24T21:56:57.960Z",
    "size": 1885,
    "path": "../public/_nuxt/index.9669c578.js"
  },
  "/_nuxt/index.9fea434a.js": {
    "type": "application/javascript",
    "etag": "\"903f-9YjJ9Op1NyGGTL/ntvXf+JpE2bU\"",
    "mtime": "2023-04-24T21:56:57.959Z",
    "size": 36927,
    "path": "../public/_nuxt/index.9fea434a.js"
  },
  "/_nuxt/index.a81c171e.js": {
    "type": "application/javascript",
    "etag": "\"2491-USdxadhZNPUySDtn/qOGY9SEP04\"",
    "mtime": "2023-04-24T21:56:57.958Z",
    "size": 9361,
    "path": "../public/_nuxt/index.a81c171e.js"
  },
  "/_nuxt/index.ad211773.js": {
    "type": "application/javascript",
    "etag": "\"b58-xGeib7OWlumzSyz3cPg3BGM+Bhk\"",
    "mtime": "2023-04-24T21:56:57.957Z",
    "size": 2904,
    "path": "../public/_nuxt/index.ad211773.js"
  },
  "/_nuxt/index.c158f5b5.js": {
    "type": "application/javascript",
    "etag": "\"ba4-2yU9elb79Qu0bEIvCFddNYXFTLc\"",
    "mtime": "2023-04-24T21:56:57.956Z",
    "size": 2980,
    "path": "../public/_nuxt/index.c158f5b5.js"
  },
  "/_nuxt/index.cbd63c76.js": {
    "type": "application/javascript",
    "etag": "\"2a5a-eW3L+Xg3OzljxgqOyoiYKSRKWxo\"",
    "mtime": "2023-04-24T21:56:57.955Z",
    "size": 10842,
    "path": "../public/_nuxt/index.cbd63c76.js"
  },
  "/_nuxt/index.ddd014c9.js": {
    "type": "application/javascript",
    "etag": "\"b48-CBtBk8r30iTNXCExVnpxZYZb2iE\"",
    "mtime": "2023-04-24T21:56:57.954Z",
    "size": 2888,
    "path": "../public/_nuxt/index.ddd014c9.js"
  },
  "/_nuxt/index.e3effb28.js": {
    "type": "application/javascript",
    "etag": "\"b07-b8dgKHn5X+R8YfxDGAq/vjKHXpQ\"",
    "mtime": "2023-04-24T21:56:57.953Z",
    "size": 2823,
    "path": "../public/_nuxt/index.e3effb28.js"
  },
  "/_nuxt/index.e444a097.js": {
    "type": "application/javascript",
    "etag": "\"be6-kU/bkedvyY0UlZZm/vbIxqJ4+2k\"",
    "mtime": "2023-04-24T21:56:57.952Z",
    "size": 3046,
    "path": "../public/_nuxt/index.e444a097.js"
  },
  "/_nuxt/index.e9ee68cf.js": {
    "type": "application/javascript",
    "etag": "\"b58-zmehYX0dpMymoVHDl3d8a9SLn5A\"",
    "mtime": "2023-04-24T21:56:57.952Z",
    "size": 2904,
    "path": "../public/_nuxt/index.e9ee68cf.js"
  },
  "/_nuxt/index.ed4ffa6a.js": {
    "type": "application/javascript",
    "etag": "\"ce6-KEmtFA3k+7hXZI7LFTlpXOKW1P8\"",
    "mtime": "2023-04-24T21:56:57.951Z",
    "size": 3302,
    "path": "../public/_nuxt/index.ed4ffa6a.js"
  },
  "/_nuxt/index.es.55cbc1ed.js": {
    "type": "application/javascript",
    "etag": "\"24c49-tRkXXusdUGCNnEJfgaBvufHUuKU\"",
    "mtime": "2023-04-24T21:56:57.950Z",
    "size": 150601,
    "path": "../public/_nuxt/index.es.55cbc1ed.js"
  },
  "/_nuxt/index.f361c0c8.js": {
    "type": "application/javascript",
    "etag": "\"66f-YKzQ7I87SCL10m+/2hwja4IBMB4\"",
    "mtime": "2023-04-24T21:56:57.948Z",
    "size": 1647,
    "path": "../public/_nuxt/index.f361c0c8.js"
  },
  "/_nuxt/index.fae43da5.js": {
    "type": "application/javascript",
    "etag": "\"ae3-OofyWn4tt7lLnRtwl0+JFibk9XM\"",
    "mtime": "2023-04-24T21:56:57.948Z",
    "size": 2787,
    "path": "../public/_nuxt/index.fae43da5.js"
  },
  "/_nuxt/index.fb436837.js": {
    "type": "application/javascript",
    "etag": "\"bb4-MR+Qddf98foke8AEFgSoBn94Ndw\"",
    "mtime": "2023-04-24T21:56:57.947Z",
    "size": 2996,
    "path": "../public/_nuxt/index.fb436837.js"
  },
  "/_nuxt/index.fe1a8152.js": {
    "type": "application/javascript",
    "etag": "\"b58-e6/FLjwDZFF+6i1Wb46f4GBrFGs\"",
    "mtime": "2023-04-24T21:56:57.947Z",
    "size": 2904,
    "path": "../public/_nuxt/index.fe1a8152.js"
  },
  "/_nuxt/join.4243fb1a.js": {
    "type": "application/javascript",
    "etag": "\"14c-ATizSoEkTa7wGrqHpdvIN1TznwQ\"",
    "mtime": "2023-04-24T21:56:57.946Z",
    "size": 332,
    "path": "../public/_nuxt/join.4243fb1a.js"
  },
  "/_nuxt/label.0680d1f4.js": {
    "type": "application/javascript",
    "etag": "\"7db-FKOJNekoBvw9jPm7IPAgF+xm0kM\"",
    "mtime": "2023-04-24T21:56:57.945Z",
    "size": 2011,
    "path": "../public/_nuxt/label.0680d1f4.js"
  },
  "/_nuxt/landing.b563a7bd.js": {
    "type": "application/javascript",
    "etag": "\"b008-S2vz9DEMFRkOZ+DYMNWy0fu9C/c\"",
    "mtime": "2023-04-24T21:56:57.945Z",
    "size": 45064,
    "path": "../public/_nuxt/landing.b563a7bd.js"
  },
  "/_nuxt/layout.71555ab6.js": {
    "type": "application/javascript",
    "etag": "\"298-s9dlJvaZoAZJ2w/uBJCnp/9jd6M\"",
    "mtime": "2023-04-24T21:56:57.944Z",
    "size": 664,
    "path": "../public/_nuxt/layout.71555ab6.js"
  },
  "/_nuxt/login.20dce01f.js": {
    "type": "application/javascript",
    "etag": "\"23c5-EK7JDm2OlHyq2NKO2rDsMl2ZxRM\"",
    "mtime": "2023-04-24T21:56:57.943Z",
    "size": 9157,
    "path": "../public/_nuxt/login.20dce01f.js"
  },
  "/_nuxt/login.bd95dddb.js": {
    "type": "application/javascript",
    "etag": "\"17a-diA4xXNMvDxkCup4M6jAWSOtKtk\"",
    "mtime": "2023-04-24T21:56:57.942Z",
    "size": 378,
    "path": "../public/_nuxt/login.bd95dddb.js"
  },
  "/_nuxt/mermaid.4b1cd600.js": {
    "type": "application/javascript",
    "etag": "\"e97c-QU788ZTvgQgsJFQtZZX3eMsvsIc\"",
    "mtime": "2023-04-24T21:56:57.941Z",
    "size": 59772,
    "path": "../public/_nuxt/mermaid.4b1cd600.js"
  },
  "/_nuxt/mermaid.84edc3ae.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e14-yBDkHc6e8oNG2/iDgbK7oY2b3PM\"",
    "mtime": "2023-04-24T21:56:57.940Z",
    "size": 7700,
    "path": "../public/_nuxt/mermaid.84edc3ae.css"
  },
  "/_nuxt/micro-task.89dcd6af.js": {
    "type": "application/javascript",
    "etag": "\"90-L+vmpYXKtWfVvfoQuvT0iSCG5+I\"",
    "mtime": "2023-04-24T21:56:57.939Z",
    "size": 144,
    "path": "../public/_nuxt/micro-task.89dcd6af.js"
  },
  "/_nuxt/nuxt-link.3a28fc5d.js": {
    "type": "application/javascript",
    "etag": "\"10e1-PwarOIdaSdqzlmQIJaasfATZivs\"",
    "mtime": "2023-04-24T21:56:57.939Z",
    "size": 4321,
    "path": "../public/_nuxt/nuxt-link.3a28fc5d.js"
  },
  "/_nuxt/page.011a6e6c.js": {
    "type": "application/javascript",
    "etag": "\"2da-UJM9zL7GDK+Jc2sRMNB7kXPvyss\"",
    "mtime": "2023-04-24T21:56:57.938Z",
    "size": 730,
    "path": "../public/_nuxt/page.011a6e6c.js"
  },
  "/_nuxt/page.70291227.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"54-uOA00wk0cEmpJxEpeb5dxVl/zhQ\"",
    "mtime": "2023-04-24T21:56:57.938Z",
    "size": 84,
    "path": "../public/_nuxt/page.70291227.css"
  },
  "/_nuxt/path-meta.97a25ced.js": {
    "type": "application/javascript",
    "etag": "\"1b5-fFB9Ink6TJDpHKvJN4e390OvbWY\"",
    "mtime": "2023-04-24T21:56:57.937Z",
    "size": 437,
    "path": "../public/_nuxt/path-meta.97a25ced.js"
  },
  "/_nuxt/purify.es.9f923ed6.js": {
    "type": "application/javascript",
    "etag": "\"545f-P4HKDNRjDo9BkramojoYi4hLFM0\"",
    "mtime": "2023-04-24T21:56:57.936Z",
    "size": 21599,
    "path": "../public/_nuxt/purify.es.9f923ed6.js"
  },
  "/_nuxt/slugify.e3037ea1.js": {
    "type": "application/javascript",
    "etag": "\"2081-RSLfWefJphSwxg6Z3Ws7sOPebNo\"",
    "mtime": "2023-04-24T21:56:57.935Z",
    "size": 8321,
    "path": "../public/_nuxt/slugify.e3037ea1.js"
  },
  "/_nuxt/sortBy.8d8ec6a0.js": {
    "type": "application/javascript",
    "etag": "\"596-BZmYDdLvXaqdcXiszrQjbBaI1Sg\"",
    "mtime": "2023-04-24T21:56:57.934Z",
    "size": 1430,
    "path": "../public/_nuxt/sortBy.8d8ec6a0.js"
  },
  "/_nuxt/switch.ce1b5e48.js": {
    "type": "application/javascript",
    "etag": "\"9bb-7NvwTCooDzs7Mk5nVP2rFOq7lQw\"",
    "mtime": "2023-04-24T21:56:57.934Z",
    "size": 2491,
    "path": "../public/_nuxt/switch.ce1b5e48.js"
  },
  "/_nuxt/toInteger.4d2e8b31.js": {
    "type": "application/javascript",
    "etag": "\"301-yEvU/pHC2oEqmG1ytO7Zt6DzrWc\"",
    "mtime": "2023-04-24T21:56:57.933Z",
    "size": 769,
    "path": "../public/_nuxt/toInteger.4d2e8b31.js"
  },
  "/_nuxt/toString.53aed50c.js": {
    "type": "application/javascript",
    "etag": "\"b8e-DiuQZoEprQ02yAJyftE/2xvUpps\"",
    "mtime": "2023-04-24T21:56:57.932Z",
    "size": 2958,
    "path": "../public/_nuxt/toString.53aed50c.js"
  },
  "/_nuxt/transition.53e4b0e7.js": {
    "type": "application/javascript",
    "etag": "\"5655-5wO2929QErjQPeDyjZEzK+o4cac\"",
    "mtime": "2023-04-24T21:56:57.932Z",
    "size": 22101,
    "path": "../public/_nuxt/transition.53e4b0e7.js"
  },
  "/_nuxt/truncate.7e323d76.js": {
    "type": "application/javascript",
    "etag": "\"60e-e0WZZ5f6w5R791C5rb/8a1Mb4eE\"",
    "mtime": "2023-04-24T21:56:57.931Z",
    "size": 1550,
    "path": "../public/_nuxt/truncate.7e323d76.js"
  },
  "/_nuxt/use-outside-click.7b609489.js": {
    "type": "application/javascript",
    "etag": "\"530-nV1aqPbVXBdSNELGYnI93cdUq4w\"",
    "mtime": "2023-04-24T21:56:57.930Z",
    "size": 1328,
    "path": "../public/_nuxt/use-outside-click.7b609489.js"
  },
  "/_nuxt/use-resolve-button-type.941463e9.js": {
    "type": "application/javascript",
    "etag": "\"1c5-sZGQxImzacodp48eNgSB8X1e74M\"",
    "mtime": "2023-04-24T21:56:57.929Z",
    "size": 453,
    "path": "../public/_nuxt/use-resolve-button-type.941463e9.js"
  },
  "/_nuxt/use-tree-walker.2682f761.js": {
    "type": "application/javascript",
    "etag": "\"177-xU0FJG6p8Oxg7wvVY+oNEdFC8uM\"",
    "mtime": "2023-04-24T21:56:57.928Z",
    "size": 375,
    "path": "../public/_nuxt/use-tree-walker.2682f761.js"
  },
  "/_nuxt/useDocus.12d1b929.js": {
    "type": "application/javascript",
    "etag": "\"652-prt8b3L/dv3OmnuPD1t6fh0JhnU\"",
    "mtime": "2023-04-24T21:56:57.928Z",
    "size": 1618,
    "path": "../public/_nuxt/useDocus.12d1b929.js"
  },
  "/_nuxt/useGithub.20dff59c.js": {
    "type": "application/javascript",
    "etag": "\"3ed-96BKS7QYI0Ci2InDrkJqcpud/yY\"",
    "mtime": "2023-04-24T21:56:57.927Z",
    "size": 1005,
    "path": "../public/_nuxt/useGithub.20dff59c.js"
  },
  "/_nuxt/useStudio.0c14a809.js": {
    "type": "application/javascript",
    "etag": "\"1747-CWMp6NmnNDASvmXrURUWPAuYT1E\"",
    "mtime": "2023-04-24T21:56:57.926Z",
    "size": 5959,
    "path": "../public/_nuxt/useStudio.0c14a809.js"
  },
  "/_nuxt/vue-ctk-date-time-picker.common.40ab6fad.js": {
    "type": "application/javascript",
    "etag": "\"645bf-Td9GwyCkihTPOMAPOfz+s9qKwwg\"",
    "mtime": "2023-04-24T21:56:57.924Z",
    "size": 411071,
    "path": "../public/_nuxt/vue-ctk-date-time-picker.common.40ab6fad.js"
  },
  "/_nuxt/vue-ctk-date-time-picker.d937f736.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"85df-+0p+p0f/72yHa9/MSR+q7iRrwjA\"",
    "mtime": "2023-04-24T21:56:57.921Z",
    "size": 34271,
    "path": "../public/_nuxt/vue-ctk-date-time-picker.d937f736.css"
  },
  "/_nuxt/zynomi-stats-simple.c51aae7a.js": {
    "type": "application/javascript",
    "etag": "\"f8b-5aeQaVG4fc5C6bIhePcIO4CCraY\"",
    "mtime": "2023-04-24T21:56:57.918Z",
    "size": 3979,
    "path": "../public/_nuxt/zynomi-stats-simple.c51aae7a.js"
  },
  "/docs/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-uE+PlLQmSeEJEbh91+gQGohYHYQ\"",
    "mtime": "2023-04-24T21:56:58.315Z",
    "size": 8196,
    "path": "../public/docs/.DS_Store"
  },
  "/docs/component.application-hero.png": {
    "type": "image/png",
    "etag": "\"550fa-eDsj03bYYHB4FhR1Z6W0M5+vjyY\"",
    "mtime": "2023-04-24T21:56:58.314Z",
    "size": 348410,
    "path": "../public/docs/component.application-hero.png"
  },
  "/docs/navigation.grid.png": {
    "type": "image/png",
    "etag": "\"6ebd8-haVCbxFDrnLkeIlwX7destmE/HQ\"",
    "mtime": "2023-04-24T21:56:58.311Z",
    "size": 453592,
    "path": "../public/docs/navigation.grid.png"
  },
  "/docs/properties.app-logo-edit.png": {
    "type": "image/png",
    "etag": "\"52fc6-TspnVLMC0ssi/OdZDw3Nc1p4OqA\"",
    "mtime": "2023-04-24T21:56:58.306Z",
    "size": 339910,
    "path": "../public/docs/properties.app-logo-edit.png"
  },
  "/docs/properties.app-logo-grid.png": {
    "type": "image/png",
    "etag": "\"5874f-gTIlrK0QtiX7T6xt7KjDqDGouS4\"",
    "mtime": "2023-04-24T21:56:58.301Z",
    "size": 362319,
    "path": "../public/docs/properties.app-logo-grid.png"
  },
  "/docs/properties.app-page-head-title.png": {
    "type": "image/png",
    "etag": "\"5c994-2kTNNhShiAyXRPHQ7OOSvqJjQ7w\"",
    "mtime": "2023-04-24T21:56:58.298Z",
    "size": 379284,
    "path": "../public/docs/properties.app-page-head-title.png"
  },
  "/docs/properties.component-application-hero-edit.png": {
    "type": "image/png",
    "etag": "\"62847-uvEbC13TbslE5g9/VMJQjgNTQNY\"",
    "mtime": "2023-04-24T21:56:58.294Z",
    "size": 403527,
    "path": "../public/docs/properties.component-application-hero-edit.png"
  },
  "/docs/properties.component-application-hero-grid.png": {
    "type": "image/png",
    "etag": "\"66680-v6FtUCtsG+ZRWjyOAVzSTIytmQU\"",
    "mtime": "2023-04-24T21:56:58.291Z",
    "size": 419456,
    "path": "../public/docs/properties.component-application-hero-grid.png"
  },
  "/docs/properties.mega-menu-01.png": {
    "type": "image/png",
    "etag": "\"64cd3-9q+EerwNh2JDZzKBOM4q4rMmSig\"",
    "mtime": "2023-04-24T21:56:58.288Z",
    "size": 412883,
    "path": "../public/docs/properties.mega-menu-01.png"
  },
  "/docs/properties.mega-menu-02.png": {
    "type": "image/png",
    "etag": "\"74a03-NHcEkr0A+qrl+YS1Z5KongHHPXk\"",
    "mtime": "2023-04-24T21:56:58.283Z",
    "size": 477699,
    "path": "../public/docs/properties.mega-menu-02.png"
  },
  "/docs/properties.mega-menu-edit.png": {
    "type": "image/png",
    "etag": "\"520d4-MDtXA/2BVWrwbo3TxSud/HbeOIQ\"",
    "mtime": "2023-04-24T21:56:58.280Z",
    "size": 336084,
    "path": "../public/docs/properties.mega-menu-edit.png"
  },
  "/docs/properties.pick-list-inquiry-reason-form.png": {
    "type": "image/png",
    "etag": "\"c8b07-pfbEGsM07Kp2RtpZdmRzMeUyu5o\"",
    "mtime": "2023-04-24T21:56:58.276Z",
    "size": 822023,
    "path": "../public/docs/properties.pick-list-inquiry-reason-form.png"
  },
  "/docs/properties.pick-list-inquiry-reason.png": {
    "type": "image/png",
    "etag": "\"3cb99-VxnQ1WC1PFEiWQabOSb4JsUZzT0\"",
    "mtime": "2023-04-24T21:56:58.272Z",
    "size": 248729,
    "path": "../public/docs/properties.pick-list-inquiry-reason.png"
  },
  "/docs/properties.site-layout-style-narrow.png": {
    "type": "image/png",
    "etag": "\"7ebff-4cLv5YF4JtrtdCHJxsOx3g64iyA\"",
    "mtime": "2023-04-24T21:56:58.270Z",
    "size": 519167,
    "path": "../public/docs/properties.site-layout-style-narrow.png"
  },
  "/docs/properties.site-layout-style-wide.png": {
    "type": "image/png",
    "etag": "\"2abee2-EHa18F8VwOJTkz0Sb8hHNjsZbxs\"",
    "mtime": "2023-04-24T21:56:58.261Z",
    "size": 2801378,
    "path": "../public/docs/properties.site-layout-style-wide.png"
  },
  "/docs/properties.social-media-head-metadata.png": {
    "type": "image/png",
    "etag": "\"73e82-kd9+d0GqBtdtsz8PE1imzhShWa4\"",
    "mtime": "2023-04-24T21:56:58.253Z",
    "size": 474754,
    "path": "../public/docs/properties.social-media-head-metadata.png"
  },
  "/docs/supabase-schemas.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ede-diMySrPrmdhjnGmSmZczqZnU30M\"",
    "mtime": "2023-04-24T21:56:58.250Z",
    "size": 7902,
    "path": "../public/docs/supabase-schemas.svg"
  },
  "/docs/supabase.email.provider.1.png": {
    "type": "image/png",
    "etag": "\"3c827-iy01blMtvDAb88h1enzX2WmvU8U\"",
    "mtime": "2023-04-24T21:56:58.248Z",
    "size": 247847,
    "path": "../public/docs/supabase.email.provider.1.png"
  },
  "/docs/supabase.email.provider.2.png": {
    "type": "image/png",
    "etag": "\"5cc83-qb8+O9D2s4/3vceo8p9xVBYF29I\"",
    "mtime": "2023-04-24T21:56:58.245Z",
    "size": 380035,
    "path": "../public/docs/supabase.email.provider.2.png"
  },
  "/docs/supabase.settings.api.png": {
    "type": "image/png",
    "etag": "\"54dcf-hNu6XQOEKpSXSt0qfA2mL0KeKIs\"",
    "mtime": "2023-04-24T21:56:58.242Z",
    "size": 347599,
    "path": "../public/docs/supabase.settings.api.png"
  },
  "/docs/supabase.settings.db.png": {
    "type": "image/png",
    "etag": "\"3bd64-CxtyD71HugutKSrhlejymxfzlc8\"",
    "mtime": "2023-04-24T21:56:58.239Z",
    "size": 245092,
    "path": "../public/docs/supabase.settings.db.png"
  },
  "/docs/supabase.settings.new-project-a.png": {
    "type": "image/png",
    "etag": "\"d84f-QAwtGaD1tkv9jGCYaKt72lofAy4\"",
    "mtime": "2023-04-24T21:56:58.237Z",
    "size": 55375,
    "path": "../public/docs/supabase.settings.new-project-a.png"
  },
  "/docs/supabase.settings.new-project-b.png": {
    "type": "image/png",
    "etag": "\"428d5-QuoHjw2u0/48m5w6Tbxl5XgicAU\"",
    "mtime": "2023-04-24T21:56:58.235Z",
    "size": 272597,
    "path": "../public/docs/supabase.settings.new-project-b.png"
  },
  "/docs/supabase.settings.new-project-c.png": {
    "type": "image/png",
    "etag": "\"19ea0-7aySvXc+mEV2an8+szxOjMRXK20\"",
    "mtime": "2023-04-24T21:56:58.232Z",
    "size": 106144,
    "path": "../public/docs/supabase.settings.new-project-c.png"
  },
  "/docs/v8.isolates.png": {
    "type": "image/png",
    "etag": "\"4c57-c7apHKh08bKy213y+r96T7VpeNg\"",
    "mtime": "2023-04-24T21:56:58.230Z",
    "size": 19543,
    "path": "../public/docs/v8.isolates.png"
  },
  "/docs/zytes-architecture.svg": {
    "type": "image/svg+xml",
    "etag": "\"40713d-RIsqvKGcMeEdvIJtlH+yLho82oE\"",
    "mtime": "2023-04-24T21:56:58.225Z",
    "size": 4223293,
    "path": "../public/docs/zytes-architecture.svg"
  },
  "/docs/zytes.db-tables-design.png": {
    "type": "image/png",
    "etag": "\"33ec02-sFHnjcws15NRGjpU3MS+mCATO3k\"",
    "mtime": "2023-04-24T21:56:58.198Z",
    "size": 3402754,
    "path": "../public/docs/zytes.db-tables-design.png"
  },
  "/docs/zytes.db.png": {
    "type": "image/png",
    "etag": "\"b3fa3-79bmy+E/ULj6IQZv75RhN0GsgT4\"",
    "mtime": "2023-04-24T21:56:58.187Z",
    "size": 737187,
    "path": "../public/docs/zytes.db.png"
  },
  "/docs/zytes.v8.isolates.png": {
    "type": "image/png",
    "etag": "\"2d2c0-Abv7rqRupyjQAlIqdQt5Fb+5k5g\"",
    "mtime": "2023-04-24T21:56:58.183Z",
    "size": 185024,
    "path": "../public/docs/zytes.v8.isolates.png"
  },
  "/docs/zytes_default_db_tables.svg": {
    "type": "image/svg+xml",
    "etag": "\"5923-U0egn1Tyt0+S5GKtIrMrSqA0a84\"",
    "mtime": "2023-04-24T21:56:58.181Z",
    "size": 22819,
    "path": "../public/docs/zytes_default_db_tables.svg"
  },
  "/fonts/Inter-italic.var.woff2": {
    "type": "font/woff2",
    "etag": "\"3bd2c-byCgRpF7+G1LbMKcTiUVvWTSy5s\"",
    "mtime": "2023-04-24T21:56:58.176Z",
    "size": 245036,
    "path": "../public/fonts/Inter-italic.var.woff2"
  },
  "/fonts/Inter-roman.var.woff2": {
    "type": "font/woff2",
    "etag": "\"3776c-eiYC0uuwjOiV4zrdtv5ZXxApQx4\"",
    "mtime": "2023-04-24T21:56:58.174Z",
    "size": 227180,
    "path": "../public/fonts/Inter-roman.var.woff2"
  },
  "/api/_github/contributors": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w\"",
    "mtime": "2023-04-24T21:57:51.358Z",
    "size": 2,
    "path": "../public/api/_github/contributors"
  },
  "/api/_github/releases": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w\"",
    "mtime": "2023-04-24T21:57:51.052Z",
    "size": 2,
    "path": "../public/api/_github/releases"
  },
  "/api/_content/cache.1682373264351.json": {
    "type": "application/json",
    "etag": "\"9d886-+SY+XWKpUFheI0g3MJ1CWWJVUbE\"",
    "mtime": "2023-04-24T21:57:51.041Z",
    "size": 645254,
    "path": "../public/api/_content/cache.1682373264351.json"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _0zzkFl = defineEventHandler((event) => {
  getQuery(event);
  event.req.url.split("/").pop();
});

const get = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
const _pick = (obj, condition) => Object.keys(obj).filter(condition).reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
const apply = (fn) => (data) => Array.isArray(data) ? data.map((item) => fn(item)) : fn(data);
const detectProperties = (keys) => {
  const prefixes = [];
  const properties = [];
  for (const key of keys) {
    if (["$", "_"].includes(key)) {
      prefixes.push(key);
    } else {
      properties.push(key);
    }
  }
  return { prefixes, properties };
};
const withoutKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => !properties.includes(key) && !prefixes.includes(key[0]));
};
const withKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => properties.includes(key) || prefixes.includes(key[0]));
};
const sortList = (data, params) => {
  const comperable = new Intl.Collator(params.$locale, {
    numeric: params.$numeric,
    caseFirst: params.$caseFirst,
    sensitivity: params.$sensitivity
  });
  const keys = Object.keys(params).filter((key) => !key.startsWith("$"));
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)].map((value) => {
        if (value === null) {
          return void 0;
        }
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      if (params[key] === -1) {
        values.reverse();
      }
      return comperable.compare(values[0], values[1]);
    });
  }
  return data;
};
const assertArray = (value, message = "Expected an array") => {
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
};
const ensureArray = (value) => Array.isArray(value) ? value : value ? [value] : [];

const arrayParams = ["sort", "where", "only", "without"];
const createQuery = (fetcher, intitialParams) => {
  const queryParams = {
    ...intitialParams
  };
  for (const key of arrayParams) {
    if (queryParams[key]) {
      queryParams[key] = ensureArray(queryParams[key]);
    }
  }
  const $set = (key, fn = (v) => v) => {
    return (...values) => {
      queryParams[key] = fn(...values);
      return query;
    };
  };
  const query = {
    params: () => queryParams,
    only: $set("only", ensureArray),
    without: $set("without", ensureArray),
    where: $set("where", (q) => [...ensureArray(queryParams.where), ...ensureArray(q)]),
    sort: $set("sort", (sort) => [...ensureArray(queryParams.sort), ...ensureArray(sort)]),
    limit: $set("limit", (v) => parseInt(String(v), 10)),
    skip: $set("skip", (v) => parseInt(String(v), 10)),
    // find
    find: () => fetcher(query),
    findOne: () => {
      queryParams.first = true;
      return fetcher(query);
    },
    findSurround: (surroundQuery, options) => {
      queryParams.surround = { query: surroundQuery, ...options };
      return fetcher(query);
    },
    // locale
    locale: (_locale) => query.where({ _locale })
  };
  return query;
};

function createMatch(opts = {}) {
  const operators = createOperators(match, opts.operators);
  function match(item, conditions) {
    if (typeof conditions !== "object" || conditions instanceof RegExp) {
      return operators.$eq(item, conditions);
    }
    return Object.keys(conditions || {}).every((key) => {
      const condition = conditions[key];
      if (key.startsWith("$") && operators[key]) {
        const fn = operators[key];
        return typeof fn === "function" ? fn(item, condition) : false;
      }
      return match(get(item, key), condition);
    });
  }
  return match;
}
function createOperators(match, operators = {}) {
  return {
    $match: (item, condition) => match(item, condition),
    /**
     * Match if item equals condition
     **/
    $eq: (item, condition) => condition instanceof RegExp ? condition.test(item) : item === condition,
    /**
     * Match if item not equals condition
     **/
    $ne: (item, condition) => condition instanceof RegExp ? !condition.test(item) : item !== condition,
    /**
     * Match is condition is false
     **/
    $not: (item, condition) => !match(item, condition),
    /**
     * Match only if all of nested conditions are true
     **/
    $and: (item, condition) => {
      assertArray(condition, "$and requires an array as condition");
      return condition.every((cond) => match(item, cond));
    },
    /**
     * Match if any of nested conditions is true
     **/
    $or: (item, condition) => {
      assertArray(condition, "$or requires an array as condition");
      return condition.some((cond) => match(item, cond));
    },
    /**
     * Match if item is in condition array
     **/
    $in: (item, condition) => ensureArray(condition).some(
      (cond) => Array.isArray(item) ? match(item, { $contains: cond }) : match(item, cond)
    ),
    /**
     * Match if item contains every condition or math every rule in condition array
     **/
    $contains: (item, condition) => {
      item = Array.isArray(item) ? item : String(item);
      return ensureArray(condition).every((i) => item.includes(i));
    },
    /**
     * Ignore case contains
     **/
    $icontains: (item, condition) => {
      if (typeof condition !== "string") {
        throw new TypeError("$icontains requires a string, use $contains instead");
      }
      item = String(item).toLocaleLowerCase();
      return ensureArray(condition).every((i) => item.includes(i.toLocaleLowerCase()));
    },
    /**
     * Match if item contains at least one rule from condition array
     */
    $containsAny: (item, condition) => {
      assertArray(condition, "$containsAny requires an array as condition");
      item = Array.isArray(item) ? item : String(item);
      return condition.some((i) => item.includes(i));
    },
    /**
     * Check key existence
     */
    $exists: (item, condition) => condition ? typeof item !== "undefined" : typeof item === "undefined",
    /**
     * Match if type of item equals condition
     */
    $type: (item, condition) => typeof item === String(condition),
    /**
     * Provides regular expression capabilities for pattern matching strings.
     */
    $regex: (item, condition) => {
      if (!(condition instanceof RegExp)) {
        const matched = String(condition).match(/\/(.*)\/([dgimsuy]*)$/);
        condition = matched ? new RegExp(matched[1], matched[2] || "") : new RegExp(condition);
      }
      return condition.test(String(item || ""));
    },
    /**
     * Check if item is less than condition
     */
    $lt: (item, condition) => {
      return item < condition;
    },
    /**
     * Check if item is less than or equal to condition
     */
    $lte: (item, condition) => {
      return item <= condition;
    },
    /**
     * Check if item is greater than condition
     */
    $gt: (item, condition) => {
      return item > condition;
    },
    /**
     * Check if item is greater than or equal to condition
     */
    $gte: (item, condition) => {
      return item >= condition;
    },
    ...operators || {}
  };
}

function createPipelineFetcher(getContentsList) {
  const match = createMatch();
  const surround = (data, { query, before, after }) => {
    const matchQuery = typeof query === "string" ? { _path: query } : query;
    const index = data.findIndex((item) => match(item, matchQuery));
    before = before ?? 1;
    after = after ?? 1;
    const slice = new Array(before + after).fill(null, 0);
    return index === -1 ? slice : slice.map((_, i) => data[index - before + i + Number(i >= before)] || null);
  };
  const pipelines = [
    // Conditions
    (data, params) => data.filter((item) => ensureArray(params.where).every((matchQuery) => match(item, matchQuery))),
    // Sort data
    (data, params) => ensureArray(params.sort).forEach((options) => sortList(data, options)),
    // Surround logic
    (data, params) => params.surround ? surround(data, params.surround) : data,
    // Skip first items
    (data, params) => params.skip ? data.slice(params.skip) : data,
    // Pick first items
    (data, params) => params.limit ? data.slice(0, params.limit) : data,
    // Remove unwanted fields
    (data, params) => apply(withoutKeys(params.without))(data),
    // Select only wanted fields
    (data, params) => apply(withKeys(params.only))(data)
  ];
  return async (query) => {
    const data = await getContentsList();
    const params = query.params();
    const filteredData = pipelines.reduce(($data, pipe) => pipe($data, params) || $data, data);
    if (params.first) {
      return filteredData[0];
    }
    return filteredData;
  };
}

const defineTransformer = (transformer) => {
  return transformer;
};
const createSingleton = (fn) => {
  let instance;
  return (...args) => {
    if (!instance) {
      instance = fn(...args);
    }
    return instance;
  };
};

function createTokenizer(parser, initialize, from) {
  let point = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  const effects = {
    consume,
    enter,
    exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    return Object.assign({}, point);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    while (point._index < chunks.length) {
      const chunk = chunks[point._index];
      if (typeof chunk === "string") {
        chunkIndex = point._index;
        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }
        while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code) {
    state = state(code);
  }
  function consume(code) {
    if (markdownLineEnding(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    }
    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++;
      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    }
    context.previous = code;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs) ? (
        /* c8 ignore next 1 */
        handleListOfConstructs(constructs)
      ) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
      function handleMapOfConstructs(map) {
        return start;
        function start(code) {
          const def = code !== null && map[code];
          const all = code !== null && map.null;
          const list = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all) ? all : all ? [all] : []
          ];
          return handleListOfConstructs(list)(code);
        }
      }
      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        if (list.length === 0) {
          return bogusState;
        }
        return handleConstruct(list[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok,
            nok
          )(code);
        }
      }
      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index = -1;
  const result = [];
  let atTab;
  while (++index < chunks.length) {
    const chunk = chunks[index];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}

function initializeDocument(effects) {
  const self = this;
  const delimiter = (this.parser.delimiter || ",").charCodeAt(0);
  return enterRow;
  function enterRow(code) {
    return effects.attempt(
      { tokenize: attemptLastLine },
      (code2) => {
        effects.consume(code2);
        return enterRow;
      },
      (code2) => {
        effects.enter("row");
        return enterColumn(code2);
      }
    )(code);
  }
  function enterColumn(code) {
    effects.enter("column");
    return content(code);
  }
  function content(code) {
    if (code === null) {
      effects.exit("column");
      effects.exit("row");
      effects.consume(code);
      return content;
    }
    if (code === 34) {
      return quotedData(code);
    }
    if (code === delimiter) {
      if (self.previous === delimiter || markdownLineEnding(self.previous) || self.previous === null) {
        effects.enter("data");
        effects.exit("data");
      }
      effects.exit("column");
      effects.enter("columnSeparator");
      effects.consume(code);
      effects.exit("columnSeparator");
      effects.enter("column");
      return content;
    }
    if (markdownLineEnding(code)) {
      effects.exit("column");
      effects.enter("newline");
      effects.consume(code);
      effects.exit("newline");
      effects.exit("row");
      return enterRow;
    }
    return data(code);
  }
  function data(code) {
    effects.enter("data");
    return dataChunk(code);
  }
  function dataChunk(code) {
    if (code === null || markdownLineEnding(code) || code === delimiter) {
      effects.exit("data");
      return content(code);
    }
    if (code === 92) {
      return escapeCharacter(code);
    }
    effects.consume(code);
    return dataChunk;
  }
  function escapeCharacter(code) {
    effects.consume(code);
    return function(code2) {
      effects.consume(code2);
      return content;
    };
  }
  function quotedData(code) {
    effects.enter("quotedData");
    effects.enter("quotedDataChunk");
    effects.consume(code);
    return quotedDataChunk;
  }
  function quotedDataChunk(code) {
    if (code === 92) {
      return escapeCharacter(code);
    }
    if (code === 34) {
      return effects.attempt(
        { tokenize: attemptDoubleQuote },
        (code2) => {
          effects.exit("quotedDataChunk");
          effects.enter("quotedDataChunk");
          return quotedDataChunk(code2);
        },
        (code2) => {
          effects.consume(code2);
          effects.exit("quotedDataChunk");
          effects.exit("quotedData");
          return content;
        }
      )(code);
    }
    effects.consume(code);
    return quotedDataChunk;
  }
}
function attemptDoubleQuote(effects, ok, nok) {
  return startSequence;
  function startSequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.enter("quoteFence");
    effects.consume(code);
    return sequence;
  }
  function sequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.consume(code);
    effects.exit("quoteFence");
    return (code2) => ok(code2);
  }
}
function attemptLastLine(effects, ok, nok) {
  return enterLine;
  function enterLine(code) {
    if (!markdownSpace(code) && code !== null) {
      return nok(code);
    }
    effects.enter("emptyLine");
    return continueLine(code);
  }
  function continueLine(code) {
    if (markdownSpace(code)) {
      effects.consume(code);
      return continueLine;
    }
    if (code === null) {
      effects.exit("emptyLine");
      return ok(code);
    }
    return nok(code);
  }
}
const parse$1 = (options) => {
  return createTokenizer(
    { ...options },
    { tokenize: initializeDocument },
    void 0
  );
};

const own = {}.hasOwnProperty;
const initialPoint = {
  line: 1,
  column: 1,
  offset: 0
};
const fromCSV = function(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler$1()(
    postprocess(
      parse$1(options).write(preprocess()(value, encoding, true))
    )
  );
};
function compiler$1() {
  const config = {
    enter: {
      column: opener(openColumn),
      row: opener(openRow),
      data: onenterdata,
      quotedData: onenterdata
    },
    exit: {
      row: closer(),
      column: closer(),
      data: onexitdata,
      quotedData: onexitQuotedData
    }
  };
  return compile;
  function compile(events) {
    const tree = {
      type: "root",
      children: []
    };
    const stack = [tree];
    const tokenStack = [];
    const context = {
      stack,
      tokenStack,
      config,
      enter,
      exit,
      resume
    };
    let index = -1;
    while (++index < events.length) {
      const handler = config[events[index][0]];
      if (own.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index][2].sliceSerialize
            },
            context
          ),
          events[index][1]
        );
      }
    }
    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point(
        events.length > 0 ? events[0][1].start : initialPoint
      ),
      end: point(
        events.length > 0 ? events[events.length - 2][1].end : initialPoint
      )
    };
    return tree;
  }
  function point(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }
  function opener(create, and) {
    return open;
    function open(token) {
      enter.call(this, create(token), token);
      if (and) {
        and.call(this, token);
      }
    }
  }
  function enter(node, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node);
    this.stack.push(node);
    this.tokenStack.push([token, errorHandler]);
    node.position = {
      start: point(token.start)
    };
    return node;
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and) {
        and.call(this, token);
      }
      exit.call(this, token);
    }
  }
  function exit(token, onExitError) {
    const node = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node.position.end = point(token.end);
    return node;
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterdata(token) {
    const parent = this.stack[this.stack.length - 1];
    let tail = parent.children[parent.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text();
      tail.position = {
        start: point(token.start)
      };
      parent.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token).trim().replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function onexitQuotedData(token) {
    const tail = this.stack.pop();
    const value = this.sliceSerialize(token);
    tail.value += this.sliceSerialize(token).trim().substring(1, value.length - 1).replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function text() {
    return {
      type: "text",
      value: ""
    };
  }
  function openColumn() {
    return {
      type: "column",
      children: []
    };
  }
  function openRow() {
    return {
      type: "row",
      children: []
    };
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      "Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open"
    );
  }
}

function csvParse(options) {
  const parser = (doc) => {
    return fromCSV(doc, options);
  };
  Object.assign(this, { Parser: parser });
  const toJsonObject = (tree) => {
    const [header, ...rows] = tree.children;
    const columns = header.children.map((col) => col.children[0].value);
    const data = rows.map((row) => {
      return row.children.reduce((acc, col, i) => {
        acc[String(columns[i])] = col.children[0]?.value;
        return acc;
      }, {});
    });
    return data;
  };
  const toJsonArray = (tree) => {
    const data = tree.children.map((row) => {
      return row.children.map((col) => col.children[0]?.value);
    });
    return data;
  };
  const compiler = (doc) => {
    if (options.json) {
      return toJsonObject(doc);
    }
    return toJsonArray(doc);
  };
  Object.assign(this, { Compiler: compiler });
}
const csv = defineTransformer({
  name: "csv",
  extensions: [".csv"],
  parse: async (_id, content, options = {}) => {
    const stream = unified().use(csvParse, {
      delimiter: ",",
      json: true,
      ...options
    });
    const { result } = await stream.process(content);
    return {
      _id,
      _type: "csv",
      body: result
    };
  }
});

function flattenNodeText(node) {
  if (node.type === "text") {
    return node.value || "";
  } else {
    return (node.children || []).reduce((text, child) => {
      return text.concat(flattenNodeText(child));
    }, "");
  }
}
function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node];
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ];
}

const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const TOC_TAGS_DEPTH = TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const getHeaderDepth = (node) => TOC_TAGS_DEPTH[node.tag];
const getTocTags = (depth) => {
  if (depth < 1 || depth > 5) {
    console.log(`\`toc.depth\` is set to ${depth}. It should be a number between 1 and 5. `);
    depth = 1;
  }
  return TOC_TAGS.slice(0, depth);
};
function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers;
  }
  const toc = [];
  let parent;
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = [];
      parent = header;
      toc.push(header);
    } else {
      parent.children.push(header);
    }
  });
  toc.forEach((header) => {
    if (header.children?.length) {
      header.children = nestHeaders(header.children);
    } else {
      delete header.children;
    }
  });
  return toc;
}
function generateFlatToc(body, options) {
  const { searchDepth, depth, title = "" } = options;
  const tags = getTocTags(depth);
  const headers = flattenNode(body, searchDepth).filter((node) => tags.includes(node.tag || ""));
  const links = headers.map((node) => ({
    id: node.props?.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }));
  return {
    title,
    searchDepth,
    depth,
    links
  };
}
function generateToc(body, options) {
  const toc = generateFlatToc(body, options);
  toc.links = nestHeaders(toc.links);
  return toc;
}

function emphasis(h, node) {
  return h(node, "em", node.attributes, all(h, node));
}

function parseThematicBlock(lang) {
  if (!lang) {
    return {
      language: void 0,
      highlights: void 0,
      fileName: void 0
    };
  }
  const language = lang.replace(/[{|[](.+)/, "").match(/^[^ \t]+(?=[ \t]|$)/);
  const highlightTokens = lang.match(/{([^}]+)}/);
  const filenameTokens = lang.match(/\[(.+)\]/);
  return {
    language: language ? language[0] : void 0,
    highlights: parseHighlightedLines(highlightTokens && highlightTokens[1]),
    filename: Array.isArray(filenameTokens) ? filenameTokens[1] : void 0
  };
}
function parseHighlightedLines(lines) {
  const lineArray = String(lines || "").split(",").filter(Boolean).flatMap((line) => {
    const [start, end] = line.trim().split("-").map((a) => Number(a.trim()));
    return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i);
  });
  return lineArray.length ? lineArray : void 0;
}
const TAG_NAME_REGEXP = /^<\/?([A-Za-z0-9-_]+) ?[^>]*>/;
function getTagName(value) {
  const result = String(value).match(TAG_NAME_REGEXP);
  return result && result[1];
}
function wrap(nodes, loose = false) {
  const result = [];
  let index = -1;
  if (loose) {
    result.push(u("text", "\n"));
  }
  while (++index < nodes.length) {
    if (index) {
      result.push(u("text", "\n"));
    }
    result.push(nodes[index]);
  }
  if (loose && nodes.length > 0) {
    result.push(u("text", "\n"));
  }
  return result;
}

const code = (h, node) => {
  const lang = (node.lang || "") + " " + (node.meta || "");
  const { language, highlights, filename } = parseThematicBlock(lang);
  const code = node.value ? detab(node.value + "\n") : "";
  return h(
    node.position,
    "code",
    {
      language,
      filename,
      highlights,
      meta: node.meta,
      code
    },
    [h(node, "pre", {}, [h(node, "code", { __ignoreMap: "" }, [u("text", code)])])]
  );
};

function html(h, node) {
  const tagName = getTagName(node.value);
  if (tagName && /[A-Z]/.test(tagName)) {
    node.value = node.value.replace(tagName, kebabCase(tagName));
  }
  if (tagName === "code") {
    node.value = node.value.replace(tagName, "code-inline");
  }
  return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
}

function heading(h, node) {
  return h(node, "h" + node.depth, all(h, node));
}

const SEMVER_REGEX = /^(\d+)(\.\d+)*(\.x)?$/;
const describeId = (_id) => {
  const [_source, ...parts] = _id.split(":");
  const [, filename, _extension] = parts[parts.length - 1].match(/(.*)\.([^.]+)$/);
  parts[parts.length - 1] = filename;
  const _path = parts.join("/");
  return {
    _source,
    _path,
    _extension,
    _file: _extension ? `${_path}.${_extension}` : _path
  };
};
const pathMeta = defineTransformer({
  name: "path-meta",
  extensions: [".*"],
  transform(content, options = {}) {
    const { locales = [], defaultLocale = "en" } = options;
    const { _source, _file, _path, _extension } = describeId(content._id);
    const parts = _path.split("/");
    const _locale = locales.includes(parts[0]) ? parts.shift() : defaultLocale;
    const filePath = generatePath(parts.join("/"));
    return {
      _path: filePath,
      _dir: filePath.split("/").slice(-2)[0],
      _draft: isDraft(_path),
      _partial: isPartial(_path),
      _locale,
      ...content,
      // TODO: move title to Markdown parser
      title: content.title || generateTitle(refineUrlPart(parts[parts.length - 1])),
      _source,
      _file,
      _extension
    };
  }
});
const isDraft = (path) => !!path.match(/\.draft(\/|\.|$)/);
const isPartial = (path) => path.split(/[:/]/).some((part) => part.match(/^_.*/));
const generatePath = (path, { forceLeadingSlash = true } = {}) => {
  path = path.split("/").map((part) => slugify(refineUrlPart(part), { lower: true })).join("/");
  return forceLeadingSlash ? withLeadingSlash(withoutTrailingSlash(path)) : path;
};
const generateTitle = (path) => path.split(/[\s-]/g).map(pascalCase).join(" ");
function refineUrlPart(name) {
  name = name.split(/[/:]/).pop();
  if (SEMVER_REGEX.test(name)) {
    return name;
  }
  return name.replace(/(\d+\.)?(.*)/, "$2").replace(/^index(\.draft)?$/, "").replace(/\.draft$/, "");
}

function link(h, node) {
  const props = {
    ...node.attributes || {},
    href: encode(normalizeLink(node.url))
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "a", props, all(h, node));
}
function normalizeLink(link2) {
  if (link2.endsWith(".md") && (isRelative(link2) || !/^https?/.test(link2) && !link2.startsWith("/"))) {
    return generatePath(link2.replace(/\.md$/, ""), { forceLeadingSlash: false });
  } else {
    return link2;
  }
}

function list(h, node) {
  const props = {};
  const name = `${node.ordered ? "ol" : "ul"}`;
  if (typeof node.start === "number" && node.start !== 1) {
    props.start = node.start;
  }
  if ((node.children || []).some((child) => typeof child.checked === "boolean")) {
    props.className = ["contains-task-list"];
  }
  return h(node, name, props, wrap(all(h, node), true));
}

function listItem(h, node, parent) {
  const result = all(h, node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const props = {};
  let wrapped = [];
  let index;
  let child;
  if (typeof node.checked === "boolean") {
    result.unshift(
      h({}, "input", {
        type: "checkbox",
        checked: node.checked,
        disabled: true
      })
    );
    props.className = ["task-list-item"];
  }
  const length = result.length;
  index = -1;
  while (++index < length) {
    child = result[index];
    if (child.tagName === "p" && !loose) {
      wrapped = wrapped.concat(child.children || []);
    } else {
      wrapped.push(child);
    }
  }
  return h(node, "li", props, wrapped);
}
function listLoose(node) {
  let loose = node.spread;
  const children = node.children;
  const length = children.length;
  let index = -1;
  while (!loose && ++index < length) {
    loose = listItemLoose(children[index]);
  }
  return loose;
}
function listItemLoose(node) {
  const spread = node.spread;
  const children = node.children || [];
  return spread === void 0 || spread === null ? children.length > 1 : spread;
}

function table(h, node) {
  const rows = node.children;
  const align = node.align || [];
  const result = rows.map((row, index) => {
    const childres = row.children;
    const name = index === 0 ? "th" : "td";
    let pos = node.align ? align.length : childres.length;
    const out = [];
    while (pos--) {
      const cell = childres[pos];
      out[pos] = h(cell, name, { align: align[pos] }, cell ? all(h, cell) : []);
    }
    return h(row, "tr", wrap(out, true));
  });
  const body = result[1] && h(
    {
      start: position(result[1]).start,
      end: position(result[result.length - 1]).end
    },
    "tbody",
    wrap(result.slice(1), true)
  );
  return h(node, "table", wrap([h(result[0].position, "thead", wrap([result[0]], true))].concat(body || []), true));
}

const htmlTags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
];

function paragraph(h, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return all(h, node);
    }
  }
  return h(node, "p", all(h, node));
}

function image(h, node) {
  const props = {
    ...node.attributes,
    src: encode(node.url),
    alt: node.alt
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "img", props);
}

function blockquote(h, node) {
  return h(node, "blockquote", wrap(all(h, node), true));
}

function strong(h, node) {
  return h(node, "strong", node.attributes, all(h, node));
}

function inlineCode(h, node) {
  return h(node, "code-inline", node.attributes, [
    // @ts-ignore
    u("text", node.value.replace(/\r?\n|\r/g, " "))
  ]);
}

function thematicBreak(h, node) {
  return h(node, "hr");
}

function containerComponent(h, node) {
  const hast = h(node, node.tagName, node.attributes, all(h, node));
  hast.attributes = node.attributes;
  hast.fmAttributes = node.fmAttributes;
  return hast;
}

const handlers$1 = {
  emphasis,
  code,
  paragraph,
  html,
  link,
  list,
  listItem,
  heading,
  table,
  image,
  blockquote,
  strong,
  inlineCode,
  thematicBreak,
  containerComponent
};

function compiler(_options) {
  function parseAsJSON(node) {
    if (Array.isArray(node)) {
      return node.map(parseAsJSON).filter(Boolean);
    }
    if (node.tagName?.startsWith("h") && node.properties.id) {
      node.properties.id = node.properties.id.replace(/-+/g, "-").replace(/-$/, "").replace(/^-/, "");
    }
    if (node.type === "element") {
      if (node.tagName === "li") {
        let hasPreviousParagraph = false;
        node.children = node.children?.flatMap((child) => {
          if (child.tagName === "p") {
            if (hasPreviousParagraph) {
              child.children.unshift({
                type: "element",
                tagName: "br",
                properties: {}
              });
            }
            hasPreviousParagraph = true;
            return child.children;
          }
          return child;
        });
      }
      if (node.tagName === "component-slot") {
        node.tagName = "template";
      }
      return {
        type: "element",
        tag: node.tagName,
        props: node.properties,
        children: parseAsJSON(node.children || [])
      };
    }
    if (node.type === "text") {
      if (node.value === "\n") {
        return void 0;
      }
      return {
        type: "text",
        value: node.value
      };
    }
    if (node.type === "comment") {
      return void 0;
    }
    node.children = parseAsJSON(node.children || []);
    return node;
  }
  this.Compiler = function(root) {
    return {
      type: "root",
      children: parseAsJSON(root.children || [])
    };
  };
}

function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || typeof vnode.children === "string";
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children?.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value;
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).join("");
  }
  return "";
}

const usePlugins = (plugins, stream) => {
  for (const plugin of Object.values(plugins)) {
    if (plugin) {
      const { instance, ...options } = plugin;
      stream.use(instance, options);
    }
  }
};
function generateBody(content, options) {
  const rehypeOptions = {
    handlers: handlers$1,
    allowDangerousHtml: true
  };
  return new Promise((resolve, reject) => {
    const stream = unified().use(remarkParse);
    if (options.mdc) {
      stream.use(remarkMDC);
    }
    usePlugins(options.remarkPlugins, stream);
    stream.use(remark2rehype, rehypeOptions);
    usePlugins(options.rehypePlugins, stream);
    stream.use(compiler, options);
    stream.process(
      {
        value: content,
        data: options.data
      },
      (error, file) => {
        if (error) {
          return reject(error);
        }
        Object.assign(options.data, file?.data || {});
        resolve(file?.result);
      }
    );
  });
}
function contentHeading(body) {
  let title = "";
  let description = "";
  const children = body.children.filter((node) => node.type !== "text" && node.tag !== "hr");
  if (children.length && children[0].tag === "h1") {
    const node = children.shift();
    title = nodeTextContent(node);
  }
  if (children.length && children[0].tag === "p") {
    const node = children.shift();
    description = nodeTextContent(node);
  }
  return {
    title,
    description
  };
}

const useDefaultOptions = () => ({
  mdc: true,
  toc: {
    depth: 2,
    searchDepth: 2
  },
  tags: {},
  remarkPlugins: {
    "remark-emoji": {
      instance: remarkEmoji
    },
    "remark-squeeze-paragraphs": {
      instance: remarkSqueezeParagraphs
    },
    "remark-gfm": {
      instance: remarkGfm
    }
  },
  rehypePlugins: {
    "rehype-slug": {
      instance: rehypeSlug
    },
    "rehype-external-links": {
      instance: rehypeExternalLinks
    },
    "rehype-sort-attribute-values": {
      instance: rehypeSortAttributeValues
    },
    "rehype-sort-attributes": {
      instance: rehypeSortAttributes
    },
    "rehype-raw": {
      instance: rehypeRaw,
      passThrough: ["element"]
    }
  }
});
async function parse(file, userOptions = {}) {
  const options = defu(userOptions, useDefaultOptions());
  const { content, data } = await parseFrontMatter(file);
  const body = await generateBody(content, { ...options, data });
  let toc;
  if (data.toc !== false) {
    const tocOption = defu(data.toc || {}, options.toc);
    toc = generateToc(body, tocOption);
  }
  const excerptString = useExcerpt(content);
  const excerpt = excerptString ? await generateBody(excerptString, { ...options, data }) : void 0;
  const heading = contentHeading(body);
  return {
    body: {
      ...body,
      toc
    },
    meta: {
      _empty: content.trim().length === 0,
      title: heading.title,
      description: heading.description,
      excerpt,
      ...data
    }
  };
}
function useExcerpt(content, delimiter = /<!--\s*?more\s*?-->/i) {
  if (!delimiter) {
    return "";
  }
  let idx = -1;
  const match = delimiter.exec(content);
  if (match) {
    idx = match.index;
  }
  if (idx !== -1) {
    return content.slice(0, idx);
  }
}

const markdown = defineTransformer({
  name: "markdown",
  extensions: [".md"],
  parse: async (_id, content, options = {}) => {
    const config = { ...options };
    config.rehypePlugins = await importPlugins(config.rehypePlugins);
    config.remarkPlugins = await importPlugins(config.remarkPlugins);
    const parsed = await parse(content, config);
    return {
      ...parsed.meta,
      body: parsed.body,
      _type: "markdown",
      _id
    };
  }
});
async function importPlugins(plugins = {}) {
  const resolvedPlugins = {};
  for (const [name, plugin] of Object.entries(plugins)) {
    if (plugin) {
      resolvedPlugins[name] = {
        instance: plugin.instance || await import(
          /* @vite-ignore */
          name
        ).then((m) => m.default || m),
        ...plugin
      };
    } else {
      resolvedPlugins[name] = false;
    }
  }
  return resolvedPlugins;
}

const yaml = defineTransformer({
  name: "Yaml",
  extensions: [".yml", ".yaml"],
  parse: async (_id, content) => {
    const { data } = await parseFrontMatter(`---
${content}
---`);
    let parsed = data;
    if (Array.isArray(data)) {
      console.warn(`YAML array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = { body: data };
    }
    return {
      ...parsed,
      _id,
      _type: "yaml"
    };
  }
});

const grammar = {
  "information_for_contributors": [
    "This file has been converted from https://github.com/docusgen/vscode-extension/blob/main/syntaxes/mdc.tmLanguage.json",
    "If you want to provide a fix or improvement, please create a pull request against the original repository.",
    "Once accepted there, we are happy to receive an update request."
  ],
  "version": "https://github.com/docusgen/vscode-extension/blob/1303abd16342880a42a4d143a660da049c79ea6c/syntaxes/mdc.tmLanguage.json",
  "name": "markdown",
  "injectionSelector": "L:text.html.markdown",
  "scopeName": "text.markdown.mdc",
  "patterns": [
    {
      "include": "text.html.markdown#frontMatter"
    },
    {
      "include": "#component_block"
    },
    {
      "include": "#block"
    }
  ],
  "repository": {
    "block": {
      "comment": "Same as `text.html.markdown#block`, but without `raw_block`",
      "patterns": [
        {
          "include": "#component_block"
        },
        {
          "include": "text.html.markdown#separator"
        },
        {
          "include": "#heading"
        },
        {
          "include": "#blockquote"
        },
        {
          "include": "#lists"
        },
        {
          "include": "#paragraph"
        },
        {
          "include": "text.html.markdown#fenced_code_block"
        },
        {
          "include": "text.html.markdown#link-def"
        },
        {
          "include": "text.html.markdown#html"
        }
      ]
    },
    "inline": {
      "patterns": [
        {
          "include": "#component_inline"
        },
        {
          "include": "#span"
        },
        {
          "include": "#markdown_attributes"
        }
      ]
    },
    "markdown_attributes": {
      "match": "(?x)([^ ])(               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )",
      "name": "markup.component.attribute",
      "captures": {
        "4": {
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        }
      }
    },
    "span": {
      "match": "(?x)\n  (\\[)           # Open\n    ([^]]*)\n  (\\])\n  (               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )?",
      "name": "markup.component.span",
      "captures": {
        "2": {
          "name": "string.other.link.description.title.markdown"
        },
        "4": {
          "patterns": [
            {
              "include": "#attributes"
            }
          ]
        }
      }
    },
    "attributes": {
      "match": "(?x)(               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )",
      "name": "markup.attributes",
      "captures": {
        "3": {
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        }
      }
    },
    "component_inline": {
      "match": "(?x)\n  (^|\\G|\\s+)\n  (:)           # component colon\n  (?i:             # component name\n    (\\w[\\w\\d-]*)\n  )\n  (\n      ({[^}]*})        # attributes\n      (\\[[^\\]]*\\]?) # slot\n      # reverse order\n    | (\\[[^\\]]*\\])  # slot\n      ({[^}]*})?       # attributes\n  )?",
      "name": "markup.component.inline",
      "captures": {
        "2": {
          "name": "punctuation.definition.tag.start.component"
        },
        "3": {
          "name": "entity.name.tag.component"
        },
        "5": {
          "patterns": [
            {
              "include": "#attributes"
            }
          ]
        },
        "6": {
          "patterns": [
            {
              "include": "#span"
            }
          ]
        },
        "7": {
          "patterns": [
            {
              "include": "#span"
            }
          ]
        },
        "8": {
          "patterns": [
            {
              "include": "#attributes"
            }
          ]
        }
      }
    },
    "component_block": {
      "begin": "(?x)\n  (^|\\G)(\\s*)\n  (:{2,})     # component colons\n  (?i:\n    (\\w[\\w\\d-]+)   # component name\n    (                 # folowing spaces or attributes\n        \\s*\n      | {([^{]*)}\n    )\n    $\n  )",
      "name": "markup.component.block",
      "end": "(^|\\G)(\\2)(\\3)\\s*$",
      "beginCaptures": {
        "4": {
          "name": "entity.name.tag.component"
        },
        "5": {
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        }
      },
      "patterns": [
        {
          "include": "#content"
        }
      ]
    },
    "content": {
      "begin": "(^|\\G)(\\s*)(.*)",
      "while": "(^|\\G)(?!\\s*([:]{2,})\\s*$)",
      "contentName": "meta.embedded.block.component",
      "patterns": [
        {
          "begin": "(^|\\G)(\\s*)(-{3})(\\s*)$",
          "end": "(^|\\G)(\\s*(-{3})(\\s*)$)",
          "patterns": [
            {
              "include": "source.yaml"
            }
          ]
        },
        {
          "match": "^(\\s*)(#[\\w\\-\\_]*)\\s*(<!--(.*)-->)?$",
          "captures": {
            "2": {
              "name": "entity.other.attribute-name.html"
            },
            "3": {
              "name": "comment.block.html"
            }
          }
        },
        {
          "comment": "Block Repository created to disable 4-space raw block inside components",
          "include": "#block"
        }
      ]
    },
    "attribute": {
      "patterns": [
        {
          "match": `(?x)
  (
    ([^=><\\s]*)  # attribute name
    (             # attribute value
        =["]([^"]*)(["])|[']([^']*)(['])
      | =[^\\s'"]*
    )?
    \\s*
  )`,
          "captures": {
            "2": {
              "name": "entity.other.attribute-name.html"
            },
            "3": {
              "patterns": [
                {
                  "include": "#attribute-interior"
                }
              ]
            }
          }
        }
      ]
    },
    "attribute-interior": {
      "comment": "https://github.com/microsoft/vscode/blob/08d59c432609ae9306eb3889815977e93bb548de/extensions/html/syntaxes/html.tmLanguage.json#L376",
      "patterns": [
        {
          "begin": "=",
          "beginCaptures": {
            "0": {
              "name": "punctuation.separator.key-value.html"
            }
          },
          "end": "(?<=[^\\s=])(?!\\s*=)|(?=/?>)",
          "patterns": [
            {
              "match": "([^\\s\"'=<>`/]|/(?!>))+",
              "name": "string.unquoted.html"
            },
            {
              "begin": '"',
              "beginCaptures": {
                "0": {
                  "name": "punctuation.definition.string.begin.html"
                }
              },
              "end": '"',
              "endCaptures": {
                "0": {
                  "name": "punctuation.definition.string.end.html"
                }
              },
              "name": "string.quoted.double.html",
              "patterns": [
                {
                  "include": "#entities"
                }
              ]
            },
            {
              "begin": "'",
              "beginCaptures": {
                "0": {
                  "name": "punctuation.definition.string.begin.html"
                }
              },
              "end": "'",
              "endCaptures": {
                "0": {
                  "name": "punctuation.definition.string.end.html"
                }
              },
              "name": "string.quoted.single.html",
              "patterns": [
                {
                  "include": "#entities"
                }
              ]
            },
            {
              "match": "=",
              "name": "invalid.illegal.unexpected-equals-sign.html"
            }
          ]
        }
      ]
    },
    "entities": {
      "comment": "https://github.com/microsoft/vscode/blob/08d59c432609ae9306eb3889815977e93bb548de/extensions/html/syntaxes/html.tmLanguage.json#L532",
      "patterns": [
        {
          "captures": {
            "1": {
              "name": "punctuation.definition.entity.html"
            },
            "912": {
              "name": "punctuation.definition.entity.html"
            }
          },
          "comment": "Yes this is a bit ridiculous, there are quite a lot of these",
          "match": "(?x)\n						(&)	(?=[a-zA-Z])\n						(\n							(a(s(ymp(eq)?|cr|t)|n(d(slope|d|v|and)?|g(s(t|ph)|zarr|e|le|rt(vb(d)?)?|msd(a(h|c|d|e|f|a|g|b))?)?)|c(y|irc|d|ute|E)?|tilde|o(pf|gon)|uml|p(id|os|prox(eq)?|e|E|acir)?|elig|f(r)?|w(conint|int)|l(pha|e(ph|fsym))|acute|ring|grave|m(p|a(cr|lg))|breve)|A(s(sign|cr)|nd|MP|c(y|irc)|tilde|o(pf|gon)|uml|pplyFunction|fr|Elig|lpha|acute|ring|grave|macr|breve))\n						  | (B(scr|cy|opf|umpeq|e(cause|ta|rnoullis)|fr|a(ckslash|r(v|wed))|reve)|b(s(cr|im(e)?|ol(hsub|b)?|emi)|n(ot|e(quiv)?)|c(y|ong)|ig(s(tar|qcup)|c(irc|up|ap)|triangle(down|up)|o(times|dot|plus)|uplus|vee|wedge)|o(t(tom)?|pf|wtie|x(h(d|u|D|U)?|times|H(d|u|D|U)?|d(R|l|r|L)|u(R|l|r|L)|plus|D(R|l|r|L)|v(R|h|H|l|r|L)?|U(R|l|r|L)|V(R|h|H|l|r|L)?|minus|box))|Not|dquo|u(ll(et)?|mp(e(q)?|E)?)|prime|e(caus(e)?|t(h|ween|a)|psi|rnou|mptyv)|karow|fr|l(ock|k(1(2|4)|34)|a(nk|ck(square|triangle(down|left|right)?|lozenge)))|a(ck(sim(eq)?|cong|prime|epsilon)|r(vee|wed(ge)?))|r(eve|vbar)|brk(tbrk)?))\n						  | (c(s(cr|u(p(e)?|b(e)?))|h(cy|i|eck(mark)?)|ylcty|c(irc|ups(sm)?|edil|a(ps|ron))|tdot|ir(scir|c(eq|le(d(R|circ|S|dash|ast)|arrow(left|right)))?|e|fnint|E|mid)?|o(n(int|g(dot)?)|p(y(sr)?|f|rod)|lon(e(q)?)?|m(p(fn|le(xes|ment))?|ma(t)?))|dot|u(darr(l|r)|p(s|c(up|ap)|or|dot|brcap)?|e(sc|pr)|vee|wed|larr(p)?|r(vearrow(left|right)|ly(eq(succ|prec)|vee|wedge)|arr(m)?|ren))|e(nt(erdot)?|dil|mptyv)|fr|w(conint|int)|lubs(uit)?|a(cute|p(s|c(up|ap)|dot|and|brcup)?|r(on|et))|r(oss|arr))|C(scr|hi|c(irc|onint|edil|aron)|ircle(Minus|Times|Dot|Plus)|Hcy|o(n(tourIntegral|int|gruent)|unterClockwiseContourIntegral|p(f|roduct)|lon(e)?)|dot|up(Cap)?|OPY|e(nterDot|dilla)|fr|lo(seCurly(DoubleQuote|Quote)|ckwiseContourIntegral)|a(yleys|cute|p(italDifferentialD)?)|ross))\n						  | (d(s(c(y|r)|trok|ol)|har(l|r)|c(y|aron)|t(dot|ri(f)?)|i(sin|e|v(ide(ontimes)?|onx)?|am(s|ond(suit)?)?|gamma)|Har|z(cy|igrarr)|o(t(square|plus|eq(dot)?|minus)?|ublebarwedge|pf|wn(harpoon(left|right)|downarrows|arrow)|llar)|d(otseq|a(rr|gger))?|u(har|arr)|jcy|e(lta|g|mptyv)|f(isht|r)|wangle|lc(orn|rop)|a(sh(v)?|leth|rr|gger)|r(c(orn|rop)|bkarow)|b(karow|lac)|Arr)|D(s(cr|trok)|c(y|aron)|Scy|i(fferentialD|a(critical(Grave|Tilde|Do(t|ubleAcute)|Acute)|mond))|o(t(Dot|Equal)?|uble(Right(Tee|Arrow)|ContourIntegral|Do(t|wnArrow)|Up(DownArrow|Arrow)|VerticalBar|L(ong(RightArrow|Left(RightArrow|Arrow))|eft(RightArrow|Tee|Arrow)))|pf|wn(Right(TeeVector|Vector(Bar)?)|Breve|Tee(Arrow)?|arrow|Left(RightVector|TeeVector|Vector(Bar)?)|Arrow(Bar|UpArrow)?))|Zcy|el(ta)?|D(otrahd)?|Jcy|fr|a(shv|rr|gger)))\n						  | (e(s(cr|im|dot)|n(sp|g)|c(y|ir(c)?|olon|aron)|t(h|a)|o(pf|gon)|dot|u(ro|ml)|p(si(v|lon)?|lus|ar(sl)?)|e|D(ot|Dot)|q(s(im|lant(less|gtr))|c(irc|olon)|u(iv(DD)?|est|als)|vparsl)|f(Dot|r)|l(s(dot)?|inters|l)?|a(ster|cute)|r(Dot|arr)|g(s(dot)?|rave)?|x(cl|ist|p(onentiale|ectation))|m(sp(1(3|4))?|pty(set|v)?|acr))|E(s(cr|im)|c(y|irc|aron)|ta|o(pf|gon)|NG|dot|uml|TH|psilon|qu(ilibrium|al(Tilde)?)|fr|lement|acute|grave|x(ists|ponentialE)|m(pty(SmallSquare|VerySmallSquare)|acr)))\n						  | (f(scr|nof|cy|ilig|o(pf|r(k(v)?|all))|jlig|partint|emale|f(ilig|l(ig|lig)|r)|l(tns|lig|at)|allingdotseq|r(own|a(sl|c(1(2|8|3|4|5|6)|78|2(3|5)|3(8|4|5)|45|5(8|6)))))|F(scr|cy|illed(SmallSquare|VerySmallSquare)|o(uriertrf|pf|rAll)|fr))\n						  | (G(scr|c(y|irc|edil)|t|opf|dot|T|Jcy|fr|amma(d)?|reater(Greater|SlantEqual|Tilde|Equal(Less)?|FullEqual|Less)|g|breve)|g(s(cr|im(e|l)?)|n(sim|e(q(q)?)?|E|ap(prox)?)|c(y|irc)|t(c(c|ir)|dot|quest|lPar|r(sim|dot|eq(qless|less)|less|a(pprox|rr)))?|imel|opf|dot|jcy|e(s(cc|dot(o(l)?)?|l(es)?)?|q(slant|q)?|l)?|v(nE|ertneqq)|fr|E(l)?|l(j|E|a)?|a(cute|p|mma(d)?)|rave|g(g)?|breve))\n						  | (h(s(cr|trok|lash)|y(phen|bull)|circ|o(ok(leftarrow|rightarrow)|pf|arr|rbar|mtht)|e(llip|arts(uit)?|rcon)|ks(earow|warow)|fr|a(irsp|lf|r(dcy|r(cir|w)?)|milt)|bar|Arr)|H(s(cr|trok)|circ|ilbertSpace|o(pf|rizontalLine)|ump(DownHump|Equal)|fr|a(cek|t)|ARDcy))\n						  | (i(s(cr|in(s(v)?|dot|v|E)?)|n(care|t(cal|prod|e(rcal|gers)|larhk)?|odot|fin(tie)?)?|c(y|irc)?|t(ilde)?|i(nfin|i(nt|int)|ota)?|o(cy|ta|pf|gon)|u(kcy|ml)|jlig|prod|e(cy|xcl)|quest|f(f|r)|acute|grave|m(of|ped|a(cr|th|g(part|e|line))))|I(scr|n(t(e(rsection|gral))?|visible(Comma|Times))|c(y|irc)|tilde|o(ta|pf|gon)|dot|u(kcy|ml)|Ocy|Jlig|fr|Ecy|acute|grave|m(plies|a(cr|ginaryI))?))\n						  | (j(s(cr|ercy)|c(y|irc)|opf|ukcy|fr|math)|J(s(cr|ercy)|c(y|irc)|opf|ukcy|fr))\n						  | (k(scr|hcy|c(y|edil)|opf|jcy|fr|appa(v)?|green)|K(scr|c(y|edil)|Hcy|opf|Jcy|fr|appa))\n						  | (l(s(h|cr|trok|im(e|g)?|q(uo(r)?|b)|aquo)|h(ar(d|u(l)?)|blk)|n(sim|e(q(q)?)?|E|ap(prox)?)|c(y|ub|e(il|dil)|aron)|Barr|t(hree|c(c|ir)|imes|dot|quest|larr|r(i(e|f)?|Par))?|Har|o(ng(left(arrow|rightarrow)|rightarrow|mapsto)|times|z(enge|f)?|oparrow(left|right)|p(f|lus|ar)|w(ast|bar)|a(ng|rr)|brk)|d(sh|ca|quo(r)?|r(dhar|ushar))|ur(dshar|uhar)|jcy|par(lt)?|e(s(s(sim|dot|eq(qgtr|gtr)|approx|gtr)|cc|dot(o(r)?)?|g(es)?)?|q(slant|q)?|ft(harpoon(down|up)|threetimes|leftarrows|arrow(tail)?|right(squigarrow|harpoons|arrow(s)?))|g)?|v(nE|ertneqq)|f(isht|loor|r)|E(g)?|l(hard|corner|tri|arr)?|a(ng(d|le)?|cute|t(e(s)?|ail)?|p|emptyv|quo|rr(sim|hk|tl|pl|fs|lp|b(fs)?)?|gran|mbda)|r(har(d)?|corner|tri|arr|m)|g(E)?|m(idot|oust(ache)?)|b(arr|r(k(sl(d|u)|e)|ac(e|k))|brk)|A(tail|arr|rr))|L(s(h|cr|trok)|c(y|edil|aron)|t|o(ng(RightArrow|left(arrow|rightarrow)|rightarrow|Left(RightArrow|Arrow))|pf|wer(RightArrow|LeftArrow))|T|e(ss(Greater|SlantEqual|Tilde|EqualGreater|FullEqual|Less)|ft(Right(Vector|Arrow)|Ceiling|T(ee(Vector|Arrow)?|riangle(Bar|Equal)?)|Do(ubleBracket|wn(TeeVector|Vector(Bar)?))|Up(TeeVector|DownVector|Vector(Bar)?)|Vector(Bar)?|arrow|rightarrow|Floor|A(ngleBracket|rrow(RightArrow|Bar)?)))|Jcy|fr|l(eftarrow)?|a(ng|cute|placetrf|rr|mbda)|midot))\n						  | (M(scr|cy|inusPlus|opf|u|e(diumSpace|llintrf)|fr|ap)|m(s(cr|tpos)|ho|nplus|c(y|omma)|i(nus(d(u)?|b)?|cro|d(cir|dot|ast)?)|o(dels|pf)|dash|u(ltimap|map)?|p|easuredangle|DDot|fr|l(cp|dr)|a(cr|p(sto(down|up|left)?)?|l(t(ese)?|e)|rker)))\n						  | (n(s(hort(parallel|mid)|c(cue|e|r)?|im(e(q)?)?|u(cc(eq)?|p(set(eq(q)?)?|e|E)?|b(set(eq(q)?)?|e|E)?)|par|qsu(pe|be)|mid)|Rightarrow|h(par|arr|Arr)|G(t(v)?|g)|c(y|ong(dot)?|up|edil|a(p|ron))|t(ilde|lg|riangle(left(eq)?|right(eq)?)|gl)|i(s(d)?|v)?|o(t(ni(v(c|a|b))?|in(dot|v(c|a|b)|E)?)?|pf)|dash|u(m(sp|ero)?)?|jcy|p(olint|ar(sl|t|allel)?|r(cue|e(c(eq)?)?)?)|e(s(im|ear)|dot|quiv|ar(hk|r(ow)?)|xist(s)?|Arr)?|v(sim|infin|Harr|dash|Dash|l(t(rie)?|e|Arr)|ap|r(trie|Arr)|g(t|e))|fr|w(near|ar(hk|r(ow)?)|Arr)|V(dash|Dash)|l(sim|t(ri(e)?)?|dr|e(s(s)?|q(slant|q)?|ft(arrow|rightarrow))?|E|arr|Arr)|a(ng|cute|tur(al(s)?)?|p(id|os|prox|E)?|bla)|r(tri(e)?|ightarrow|arr(c|w)?|Arr)|g(sim|t(r)?|e(s|q(slant|q)?)?|E)|mid|L(t(v)?|eft(arrow|rightarrow)|l)|b(sp|ump(e)?))|N(scr|c(y|edil|aron)|tilde|o(nBreakingSpace|Break|t(R(ightTriangle(Bar|Equal)?|everseElement)|Greater(Greater|SlantEqual|Tilde|Equal|FullEqual|Less)?|S(u(cceeds(SlantEqual|Tilde|Equal)?|perset(Equal)?|bset(Equal)?)|quareSu(perset(Equal)?|bset(Equal)?))|Hump(DownHump|Equal)|Nested(GreaterGreater|LessLess)|C(ongruent|upCap)|Tilde(Tilde|Equal|FullEqual)?|DoubleVerticalBar|Precedes(SlantEqual|Equal)?|E(qual(Tilde)?|lement|xists)|VerticalBar|Le(ss(Greater|SlantEqual|Tilde|Equal|Less)?|ftTriangle(Bar|Equal)?))?|pf)|u|e(sted(GreaterGreater|LessLess)|wLine|gative(MediumSpace|Thi(nSpace|ckSpace)|VeryThinSpace))|Jcy|fr|acute))\n						  | (o(s(cr|ol|lash)|h(m|bar)|c(y|ir(c)?)|ti(lde|mes(as)?)|S|int|opf|d(sold|iv|ot|ash|blac)|uml|p(erp|lus|ar)|elig|vbar|f(cir|r)|l(c(ir|ross)|t|ine|arr)|a(st|cute)|r(slope|igof|or|d(er(of)?|f|m)?|v|arr)?|g(t|on|rave)|m(i(nus|cron|d)|ega|acr))|O(s(cr|lash)|c(y|irc)|ti(lde|mes)|opf|dblac|uml|penCurly(DoubleQuote|Quote)|ver(B(ar|rac(e|ket))|Parenthesis)|fr|Elig|acute|r|grave|m(icron|ega|acr)))\n						  | (p(s(cr|i)|h(i(v)?|one|mmat)|cy|i(tchfork|v)?|o(intint|und|pf)|uncsp|er(cnt|tenk|iod|p|mil)|fr|l(us(sim|cir|two|d(o|u)|e|acir|mn|b)?|an(ck(h)?|kv))|ar(s(im|l)|t|a(llel)?)?|r(sim|n(sim|E|ap)|cue|ime(s)?|o(d|p(to)?|f(surf|line|alar))|urel|e(c(sim|n(sim|eqq|approx)|curlyeq|eq|approx)?)?|E|ap)?|m)|P(s(cr|i)|hi|cy|i|o(incareplane|pf)|fr|lusMinus|artialD|r(ime|o(duct|portion(al)?)|ecedes(SlantEqual|Tilde|Equal)?)?))\n						  | (q(scr|int|opf|u(ot|est(eq)?|at(int|ernions))|prime|fr)|Q(scr|opf|UOT|fr))\n						  | (R(s(h|cr)|ho|c(y|edil|aron)|Barr|ight(Ceiling|T(ee(Vector|Arrow)?|riangle(Bar|Equal)?)|Do(ubleBracket|wn(TeeVector|Vector(Bar)?))|Up(TeeVector|DownVector|Vector(Bar)?)|Vector(Bar)?|arrow|Floor|A(ngleBracket|rrow(Bar|LeftArrow)?))|o(undImplies|pf)|uleDelayed|e(verse(UpEquilibrium|E(quilibrium|lement)))?|fr|EG|a(ng|cute|rr(tl)?)|rightarrow)|r(s(h|cr|q(uo(r)?|b)|aquo)|h(o(v)?|ar(d|u(l)?))|nmid|c(y|ub|e(il|dil)|aron)|Barr|t(hree|imes|ri(e|f|ltri)?)|i(singdotseq|ng|ght(squigarrow|harpoon(down|up)|threetimes|left(harpoons|arrows)|arrow(tail)?|rightarrows))|Har|o(times|p(f|lus|ar)|a(ng|rr)|brk)|d(sh|ca|quo(r)?|ldhar)|uluhar|p(polint|ar(gt)?)|e(ct|al(s|ine|part)?|g)|f(isht|loor|r)|l(har|arr|m)|a(ng(d|e|le)?|c(ute|e)|t(io(nals)?|ail)|dic|emptyv|quo|rr(sim|hk|c|tl|pl|fs|w|lp|ap|b(fs)?)?)|rarr|x|moust(ache)?|b(arr|r(k(sl(d|u)|e)|ac(e|k))|brk)|A(tail|arr|rr)))\n						  | (s(s(cr|tarf|etmn|mile)|h(y|c(hcy|y)|ort(parallel|mid)|arp)|c(sim|y|n(sim|E|ap)|cue|irc|polint|e(dil)?|E|a(p|ron))?|t(ar(f)?|r(ns|aight(phi|epsilon)))|i(gma(v|f)?|m(ne|dot|plus|e(q)?|l(E)?|rarr|g(E)?)?)|zlig|o(pf|ftcy|l(b(ar)?)?)|dot(e|b)?|u(ng|cc(sim|n(sim|eqq|approx)|curlyeq|eq|approx)?|p(s(im|u(p|b)|et(neq(q)?|eq(q)?)?)|hs(ol|ub)|1|n(e|E)|2|d(sub|ot)|3|plus|e(dot)?|E|larr|mult)?|m|b(s(im|u(p|b)|et(neq(q)?|eq(q)?)?)|n(e|E)|dot|plus|e(dot)?|E|rarr|mult)?)|pa(des(uit)?|r)|e(swar|ct|tm(n|inus)|ar(hk|r(ow)?)|xt|mi|Arr)|q(su(p(set(eq)?|e)?|b(set(eq)?|e)?)|c(up(s)?|ap(s)?)|u(f|ar(e|f))?)|fr(own)?|w(nwar|ar(hk|r(ow)?)|Arr)|larr|acute|rarr|m(t(e(s)?)?|i(d|le)|eparsl|a(shp|llsetminus))|bquo)|S(scr|hort(RightArrow|DownArrow|UpArrow|LeftArrow)|c(y|irc|edil|aron)?|tar|igma|H(cy|CHcy)|opf|u(c(hThat|ceeds(SlantEqual|Tilde|Equal)?)|p(set|erset(Equal)?)?|m|b(set(Equal)?)?)|OFTcy|q(uare(Su(perset(Equal)?|bset(Equal)?)|Intersection|Union)?|rt)|fr|acute|mallCircle))\n						  | (t(s(hcy|c(y|r)|trok)|h(i(nsp|ck(sim|approx))|orn|e(ta(sym|v)?|re(4|fore))|k(sim|ap))|c(y|edil|aron)|i(nt|lde|mes(d|b(ar)?)?)|o(sa|p(cir|f(ork)?|bot)?|ea)|dot|prime|elrec|fr|w(ixt|ohead(leftarrow|rightarrow))|a(u|rget)|r(i(sb|time|dot|plus|e|angle(down|q|left(eq)?|right(eq)?)?|minus)|pezium|ade)|brk)|T(s(cr|trok)|RADE|h(i(nSpace|ckSpace)|e(ta|refore))|c(y|edil|aron)|S(cy|Hcy)|ilde(Tilde|Equal|FullEqual)?|HORN|opf|fr|a(u|b)|ripleDot))\n						  | (u(scr|h(ar(l|r)|blk)|c(y|irc)|t(ilde|dot|ri(f)?)|Har|o(pf|gon)|d(har|arr|blac)|u(arr|ml)|p(si(h|lon)?|harpoon(left|right)|downarrow|uparrows|lus|arrow)|f(isht|r)|wangle|l(c(orn(er)?|rop)|tri)|a(cute|rr)|r(c(orn(er)?|rop)|tri|ing)|grave|m(l|acr)|br(cy|eve)|Arr)|U(scr|n(ion(Plus)?|der(B(ar|rac(e|ket))|Parenthesis))|c(y|irc)|tilde|o(pf|gon)|dblac|uml|p(si(lon)?|downarrow|Tee(Arrow)?|per(RightArrow|LeftArrow)|DownArrow|Equilibrium|arrow|Arrow(Bar|DownArrow)?)|fr|a(cute|rr(ocir)?)|ring|grave|macr|br(cy|eve)))\n						  | (v(s(cr|u(pn(e|E)|bn(e|E)))|nsu(p|b)|cy|Bar(v)?|zigzag|opf|dash|prop|e(e(eq|bar)?|llip|r(t|bar))|Dash|fr|ltri|a(ngrt|r(s(igma|u(psetneq(q)?|bsetneq(q)?))|nothing|t(heta|riangle(left|right))|p(hi|i|ropto)|epsilon|kappa|r(ho)?))|rtri|Arr)|V(scr|cy|opf|dash(l)?|e(e|r(yThinSpace|t(ical(Bar|Separator|Tilde|Line))?|bar))|Dash|vdash|fr|bar))\n						  | (w(scr|circ|opf|p|e(ierp|d(ge(q)?|bar))|fr|r(eath)?)|W(scr|circ|opf|edge|fr))\n						  | (X(scr|i|opf|fr)|x(s(cr|qcup)|h(arr|Arr)|nis|c(irc|up|ap)|i|o(time|dot|p(f|lus))|dtri|u(tri|plus)|vee|fr|wedge|l(arr|Arr)|r(arr|Arr)|map))\n						  | (y(scr|c(y|irc)|icy|opf|u(cy|ml)|en|fr|ac(y|ute))|Y(scr|c(y|irc)|opf|uml|Icy|Ucy|fr|acute|Acy))\n						  | (z(scr|hcy|c(y|aron)|igrarr|opf|dot|e(ta|etrf)|fr|w(nj|j)|acute)|Z(scr|c(y|aron)|Hcy|opf|dot|e(ta|roWidthSpace)|fr|acute))\n						)\n						(;)\n					",
          "name": "constant.character.entity.named.$2.html"
        },
        {
          "captures": {
            "1": {
              "name": "punctuation.definition.entity.html"
            },
            "3": {
              "name": "punctuation.definition.entity.html"
            }
          },
          "match": "(&)#[0-9]+(;)",
          "name": "constant.character.entity.numeric.decimal.html"
        },
        {
          "captures": {
            "1": {
              "name": "punctuation.definition.entity.html"
            },
            "3": {
              "name": "punctuation.definition.entity.html"
            }
          },
          "match": "(&)#[xX][0-9a-fA-F]+(;)",
          "name": "constant.character.entity.numeric.hexadecimal.html"
        },
        {
          "match": "&(?=[a-zA-Z0-9]+;)",
          "name": "invalid.illegal.ambiguous-ampersand.html"
        }
      ]
    },
    "heading": {
      "match": "(?:^|\\G)[ ]*(#{1,6}\\s+(.*?)(\\s+#{1,6})?\\s*)$",
      "captures": {
        "1": {
          "patterns": [
            {
              "match": "(#{6})\\s+(.*?)(?:\\s+(#+))?\\s*$",
              "name": "heading.6.markdown",
              "captures": {
                "1": {
                  "name": "punctuation.definition.heading.markdown"
                },
                "2": {
                  "name": "entity.name.section.markdown",
                  "patterns": [
                    {
                      "include": "text.html.markdown#inline"
                    },
                    {
                      "include": "text.html.derivative"
                    }
                  ]
                },
                "3": {
                  "name": "punctuation.definition.heading.markdown"
                }
              }
            },
            {
              "match": "(#{5})\\s+(.*?)(?:\\s+(#+))?\\s*$",
              "name": "heading.5.markdown",
              "captures": {
                "1": {
                  "name": "punctuation.definition.heading.markdown"
                },
                "2": {
                  "name": "entity.name.section.markdown",
                  "patterns": [
                    {
                      "include": "text.html.markdown#inline"
                    },
                    {
                      "include": "text.html.derivative"
                    }
                  ]
                },
                "3": {
                  "name": "punctuation.definition.heading.markdown"
                }
              }
            },
            {
              "match": "(#{4})\\s+(.*?)(?:\\s+(#+))?\\s*$",
              "name": "heading.4.markdown",
              "captures": {
                "1": {
                  "name": "punctuation.definition.heading.markdown"
                },
                "2": {
                  "name": "entity.name.section.markdown",
                  "patterns": [
                    {
                      "include": "text.html.markdown#inline"
                    },
                    {
                      "include": "text.html.derivative"
                    }
                  ]
                },
                "3": {
                  "name": "punctuation.definition.heading.markdown"
                }
              }
            },
            {
              "match": "(#{3})\\s+(.*?)(?:\\s+(#+))?\\s*$",
              "name": "heading.3.markdown",
              "captures": {
                "1": {
                  "name": "punctuation.definition.heading.markdown"
                },
                "2": {
                  "name": "entity.name.section.markdown",
                  "patterns": [
                    {
                      "include": "text.html.markdown#inline"
                    },
                    {
                      "include": "text.html.derivative"
                    }
                  ]
                },
                "3": {
                  "name": "punctuation.definition.heading.markdown"
                }
              }
            },
            {
              "match": "(#{2})\\s+(.*?)(?:\\s+(#+))?\\s*$",
              "name": "heading.2.markdown",
              "captures": {
                "1": {
                  "name": "punctuation.definition.heading.markdown"
                },
                "2": {
                  "name": "entity.name.section.markdown",
                  "patterns": [
                    {
                      "include": "text.html.markdown#inline"
                    },
                    {
                      "include": "text.html.derivative"
                    }
                  ]
                },
                "3": {
                  "name": "punctuation.definition.heading.markdown"
                }
              }
            },
            {
              "match": "(#{1})\\s+(.*?)(?:\\s+(#+))?\\s*$",
              "name": "heading.1.markdown",
              "captures": {
                "1": {
                  "name": "punctuation.definition.heading.markdown"
                },
                "2": {
                  "name": "entity.name.section.markdown",
                  "patterns": [
                    {
                      "include": "text.html.markdown#inline"
                    },
                    {
                      "include": "text.html.derivative"
                    }
                  ]
                },
                "3": {
                  "name": "punctuation.definition.heading.markdown"
                }
              }
            }
          ]
        }
      },
      "name": "markup.heading.markdown",
      "patterns": [
        {
          "include": "text.html.markdown#inline"
        }
      ]
    },
    "heading-setext": {
      "patterns": [
        {
          "match": "^(={3,})(?=[ \\t]*$\\n?)",
          "name": "markup.heading.setext.1.markdown"
        },
        {
          "match": "^(-{3,})(?=[ \\t]*$\\n?)",
          "name": "markup.heading.setext.2.markdown"
        }
      ]
    },
    "lists": {
      "patterns": [
        {
          "begin": "(^|\\G)([ ]*)([*+-])([ \\t])",
          "beginCaptures": {
            "3": {
              "name": "punctuation.definition.list.begin.markdown"
            }
          },
          "comment": "Currently does not support un-indented second lines.",
          "name": "markup.list.unnumbered.markdown",
          "patterns": [
            {
              "include": "#block"
            },
            {
              "include": "text.html.markdown#list_paragraph"
            }
          ],
          "while": "((^|\\G)([ ]*|\\t))|(^[ \\t]*$)"
        },
        {
          "begin": "(^|\\G)([ ]*)([0-9]+\\.)([ \\t])",
          "beginCaptures": {
            "3": {
              "name": "punctuation.definition.list.begin.markdown"
            }
          },
          "name": "markup.list.numbered.markdown",
          "patterns": [
            {
              "include": "#block"
            },
            {
              "include": "text.html.markdown#list_paragraph"
            }
          ],
          "while": "((^|\\G)([ ]*|\\t))|(^[ \\t]*$)"
        }
      ]
    },
    "paragraph": {
      "begin": "(^|\\G)[ ]*(?=\\S)",
      "name": "meta.paragraph.markdown",
      "patterns": [
        {
          "include": "#inline"
        },
        {
          "include": "text.html.markdown#inline"
        },
        {
          "include": "text.html.derivative"
        },
        {
          "include": "#heading-setext"
        }
      ],
      "while": "(^|\\G)((?=\\s*[-=]{3,}\\s*$)|[ ]{4,}(?=\\S))"
    },
    "blockquote": {
      "begin": "(^|\\G)[ ]*(>) ?",
      "captures": {
        "2": {
          "name": "punctuation.definition.quote.begin.markdown"
        }
      },
      "name": "markup.quote.markdown",
      "patterns": [
        {
          "include": "#block"
        }
      ],
      "while": "(^|\\G)\\s*(>) ?"
    }
  }
};
const mdcTMLanguage = grammar;

const logger = consola.withScope("@nuxt/content");
const resolveLang = (lang) => BUNDLED_LANGUAGES.find((l) => l.id === lang || l.aliases?.includes(lang));
const resolveTheme = (theme) => {
  if (!theme) {
    return;
  }
  if (typeof theme === "string") {
    theme = {
      default: theme
    };
  }
  return Object.entries(theme).reduce((acc, [key, value]) => {
    acc[key] = BUNDLED_THEMES.find((t) => t === value);
    return acc;
  }, {});
};
const useShikiHighlighter = createSingleton((opts) => {
  const { theme, preload } = opts || {};
  let promise;
  const getShikiHighlighter = () => {
    if (!promise) {
      promise = getHighlighter({
        theme: theme?.default || theme || "dark-plus",
        langs: [
          ...preload || [],
          "diff",
          "json",
          "js",
          "ts",
          "css",
          "shell",
          "html",
          "md",
          "yaml",
          "vue",
          {
            id: "md",
            scopeName: "text.markdown.mdc",
            path: "mdc.tmLanguage.json",
            aliases: ["markdown", "md", "mdc"],
            grammar: mdcTMLanguage
          }
        ]
      }).then((highlighter) => {
        const themes = Object.values(typeof theme === "string" ? { default: theme } : theme || {});
        if (themes.length) {
          return Promise.all(themes.map((theme2) => highlighter.loadTheme(theme2))).then(() => highlighter);
        }
        return highlighter;
      });
    }
    return promise;
  };
  const getHighlightedTokens = async (code, lang, theme2) => {
    const highlighter = await getShikiHighlighter();
    code = code.replace(/\n+$/, "");
    lang = resolveLang(lang || "")?.id || lang;
    theme2 = resolveTheme(theme2 || "") || { default: highlighter.getTheme() };
    if (!lang) {
      return [[{ content: code }]];
    }
    if (!highlighter.getLoadedLanguages().includes(lang)) {
      const languageRegistration = resolveLang(lang);
      if (languageRegistration) {
        await highlighter.loadLanguage(languageRegistration);
      } else {
        logger.warn(`Language '${lang}' is not supported by shiki. Skipping highlight.`);
        return [[{ content: code }]];
      }
    }
    const newThemes = Object.values(theme2).filter((t) => !highlighter.getLoadedThemes().includes(t));
    if (newThemes.length) {
      await Promise.all(newThemes.map(highlighter.loadTheme));
    }
    const coloredTokens = Object.entries(theme2).map(([key, theme3]) => {
      const tokens = highlighter.codeToThemedTokens(code, lang, theme3, { includeExplanation: false });
      return {
        key,
        theme: theme3,
        tokens
      };
    });
    const highlightedCode = [];
    for (const line in coloredTokens[0].tokens) {
      highlightedCode[line] = coloredTokens.reduce((acc, color) => {
        return mergeLines({
          key: coloredTokens[0].key,
          tokens: acc
        }, {
          key: color.key,
          tokens: color.tokens[line]
        });
      }, coloredTokens[0].tokens[line]);
    }
    return highlightedCode;
  };
  const getHighlightedAST = async (code, lang, theme2, opts2) => {
    const lines = await getHighlightedTokens(code, lang, theme2);
    const { highlights = [], colorMap = {} } = opts2 || {};
    return lines.map((line, lineIndex) => ({
      type: "element",
      tag: "div",
      props: { class: ["line", highlights.includes(lineIndex + 1) ? "highlight" : ""].join(" ").trim() },
      children: line.map(tokenSpan)
    }));
    function getColorProps(token) {
      if (!token.color) {
        return {};
      }
      if (typeof token.color === "string") {
        return { style: { color: token.color } };
      }
      const key = Object.values(token.color).join("");
      if (!colorMap[key]) {
        colorMap[key] = {
          colors: token.color,
          className: "ct-" + Math.random().toString(16).substring(2, 8)
          // hash(key)
        };
      }
      return { class: colorMap[key].className };
    }
    function tokenSpan(token) {
      return {
        type: "element",
        tag: "span",
        props: getColorProps(token),
        children: [{ type: "text", value: token.content }]
      };
    }
  };
  const getHighlightedCode = async (code, lang, theme2, opts2) => {
    const colorMap = opts2?.colorMap || {};
    const highlights = opts2?.highlights || [];
    const ast = await getHighlightedAST(code, lang, theme2, { colorMap, highlights });
    function renderNode(node) {
      if (node.type === "text") {
        return node.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      const children = node.children.map(renderNode).join("");
      return `<${node.tag} class="${node.props.class}">${children}</${node.tag}>`;
    }
    return {
      code: ast.map(renderNode).join(""),
      styles: generateStyles(colorMap)
    };
  };
  const generateStyles = (colorMap) => {
    const colors = [];
    for (const colorClass of Object.values(colorMap)) {
      Object.entries(colorClass.colors).forEach(([variant, color]) => {
        if (variant === "default") {
          colors.unshift(`.${colorClass.className}{color:${color}}`);
        } else {
          colors.push(`.${variant} .${colorClass.className}{color:${color}}`);
        }
      });
    }
    return colors.join("\n");
  };
  return {
    getHighlightedTokens,
    getHighlightedAST,
    getHighlightedCode,
    generateStyles
  };
});
function mergeLines(line1, line2) {
  const mergedTokens = [];
  const getColors = (h, i) => typeof h.tokens[i].color === "string" ? { [h.key]: h.tokens[i].color } : h.tokens[i].color;
  const right = {
    key: line1.key,
    tokens: line1.tokens.slice()
  };
  const left = {
    key: line2.key,
    tokens: line2.tokens.slice()
  };
  let index = 0;
  while (index < right.tokens.length) {
    const rightToken = right.tokens[index];
    const leftToken = left.tokens[index];
    if (rightToken.content === leftToken.content) {
      mergedTokens.push({
        content: rightToken.content,
        color: {
          ...getColors(right, index),
          ...getColors(left, index)
        }
      });
      index += 1;
      continue;
    }
    if (rightToken.content.startsWith(leftToken.content)) {
      const nextRightToken = {
        ...rightToken,
        content: rightToken.content.slice(leftToken.content.length)
      };
      rightToken.content = leftToken.content;
      right.tokens.splice(index + 1, 0, nextRightToken);
      continue;
    }
    if (leftToken.content.startsWith(rightToken.content)) {
      const nextLeftToken = {
        ...leftToken,
        content: leftToken.content.slice(rightToken.content.length)
      };
      leftToken.content = rightToken.content;
      left.tokens.splice(index + 1, 0, nextLeftToken);
      continue;
    }
    throw new Error("Unexpected token");
  }
  return mergedTokens;
}

const shiki = defineTransformer({
  name: "highlight",
  extensions: [".md"],
  transform: async (content, options = {}) => {
    const shikiHighlighter = useShikiHighlighter(options);
    await Promise.all([
      highlight(content.body),
      highlight(content.excerpt)
    ]);
    return content;
    async function highlight(document) {
      if (!document) {
        return;
      }
      const colorMap = {};
      const codeBlocks = [];
      const inlineCodes = [];
      visit(
        document,
        (node) => node?.tag === "code" && node?.props.code || node?.tag === "code-inline" && (node.props?.lang || node.props?.language),
        (node) => {
          if (node?.tag === "code") {
            codeBlocks.push(node);
          } else if (node?.tag === "code-inline") {
            inlineCodes.push(node);
          }
        }
      );
      await Promise.all(codeBlocks.map((node) => highlightBlock(node, colorMap)));
      await Promise.all(inlineCodes.map((node) => highlightInline(node, colorMap)));
      if (Object.values(colorMap).length) {
        document?.children.push({
          type: "element",
          tag: "style",
          children: [{ type: "text", value: shikiHighlighter.generateStyles(colorMap) }]
        });
      }
    }
    async function highlightInline(node, colorMap) {
      const code = node.children[0].value;
      const lines = await shikiHighlighter.getHighlightedAST(code, node.props.lang || node.props.language, options.theme, { colorMap });
      node.children = lines[0].children;
      node.props = Object.assign(node.props || {}, { class: "colored" });
      return node;
    }
    async function highlightBlock(node, colorMap) {
      const { code, language: lang, highlights = [] } = node.props;
      const innerCodeNode = node.children[0].children[0];
      innerCodeNode.children = await shikiHighlighter.getHighlightedAST(code, lang, options.theme, { colorMap, highlights });
      return node;
    }
  }
});

const json = defineTransformer({
  name: "Json",
  extensions: [".json", ".json5"],
  parse: async (_id, content) => {
    let parsed;
    if (typeof content === "string") {
      if (_id.endsWith("json5")) {
        parsed = (await import('json5').then((m) => m.default || m)).parse(content);
      } else if (_id.endsWith("json")) {
        parsed = destr(content);
      }
    } else {
      parsed = content;
    }
    if (Array.isArray(parsed)) {
      console.warn(`JSON array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = {
        body: parsed
      };
    }
    return {
      ...parsed,
      _id,
      _type: "json"
    };
  }
});

const TRANSFORMERS = [
  csv,
  markdown,
  json,
  yaml,
  shiki,
  pathMeta
];
function getParser(ext, additionalTransformers = []) {
  let parser = additionalTransformers.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  if (!parser) {
    parser = TRANSFORMERS.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  }
  return parser;
}
function getTransformers(ext, additionalTransformers = []) {
  return [
    ...additionalTransformers.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform),
    ...TRANSFORMERS.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform)
  ];
}
async function transformContent(id, content, options = {}) {
  const { transformers = [] } = options;
  const file = { _id: id, body: content };
  const ext = extname(id);
  const parser = getParser(ext, transformers);
  if (!parser) {
    console.warn(`${ext} files are not supported, "${id}" falling back to raw content`);
    return file;
  }
  const parserOptions = options[camelCase(parser.name)] || {};
  const parsed = await parser.parse(file._id, file.body, parserOptions);
  const matchedTransformers = getTransformers(ext, transformers);
  const result = await matchedTransformers.reduce(async (prev, cur) => {
    const next = await prev || parsed;
    const transformOptions = options[camelCase(cur.name)];
    if (transformOptions === false) {
      return next;
    }
    return cur.transform(next, transformOptions || {});
  }, Promise.resolve(parsed));
  return result;
}

const isPreview = (event) => {
  const previewToken = getQuery(event).previewToken || getCookie(event, "previewToken");
  return !!previewToken;
};
const getPreview = (event) => {
  const key = getQuery(event).previewToken || getCookie(event, "previewToken");
  return { key };
};

async function getContentIndex(event) {
  const defaultLocale = useRuntimeConfig().content.defaultLocale;
  let contentIndex = await cacheStorage.getItem("content-index.json");
  if (!contentIndex) {
    const data = await getContentsList(event);
    contentIndex = data.reduce((acc, item) => {
      acc[item._path] = acc[item._path] || [];
      if (item._locale === defaultLocale) {
        acc[item._path].unshift(item._id);
      } else {
        acc[item._path].push(item._id);
      }
      return acc;
    }, {});
    await cacheStorage.setItem("content-index.json", contentIndex);
  }
  return contentIndex;
}
async function getIndexedContentsList(event, query) {
  const params = query.params();
  const path = params?.where?.find((wh) => wh._path)?._path;
  if (!isPreview(event) && (typeof path === "string" || path instanceof RegExp)) {
    const index = await getContentIndex(event);
    const keys = Object.keys(index).filter((key) => path.test ? path.test(key) : key === String(path)).flatMap((key) => index[key]);
    const contents = await Promise.all(keys.map((key) => getContent(event, key)));
    return contents;
  }
  return getContentsList(event);
}

const transformers = [];

const sourceStorage = prefixStorage(useStorage(), "content:source");
const cacheStorage = prefixStorage(useStorage(), "cache:content");
const cacheParsedStorage = prefixStorage(useStorage(), "cache:content:parsed");
const contentConfig = useRuntimeConfig().content;
const contentIgnores = contentConfig.ignores.map(
  (p) => typeof p === "string" ? new RegExp(`^${p}|:${p}`) : p
);
const invalidKeyCharacters = `'"?#/`.split("");
const contentIgnorePredicate = (key) => {
  if (key.startsWith("preview:") || contentIgnores.some((prefix) => prefix.test(key))) {
    return false;
  }
  if (invalidKeyCharacters.some((ik) => key.includes(ik))) {
    console.warn(`Ignoring [${key}]. File name should not contain any of the following characters: ${invalidKeyCharacters.join(", ")}`);
    return false;
  }
  return true;
};
const getContentsIds = async (event, prefix) => {
  let keys = [];
  {
    keys = await cacheParsedStorage.getKeys(prefix);
  }
  if (keys.length === 0) {
    keys = await sourceStorage.getKeys(prefix);
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewPrefix = `preview:${key}:${prefix || ""}`;
    const previewKeys = await sourceStorage.getKeys(previewPrefix);
    if (previewKeys.length) {
      const keysSet = new Set(keys);
      await Promise.all(
        previewKeys.map(async (key2) => {
          const meta = await sourceStorage.getMeta(key2);
          if (meta?.__deleted) {
            keysSet.delete(key2.substring(previewPrefix.length));
          } else {
            keysSet.add(key2.substring(previewPrefix.length));
          }
        })
      );
      keys = Array.from(keysSet);
    }
  }
  return keys.filter(contentIgnorePredicate);
};
const getContentsList = async (event, prefix) => {
  const keys = await getContentsIds(event, prefix);
  const contents = await Promise.all(keys.map((key) => getContent(event, key)));
  return contents;
};
const getContent = async (event, id) => {
  const contentId = id;
  if (!contentIgnorePredicate(id)) {
    return { _id: contentId, body: null };
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewId = `preview:${key}:${id}`;
    const draft = await sourceStorage.getItem(previewId);
    if (draft) {
      id = previewId;
    }
  }
  const cached = await cacheParsedStorage.getItem(id);
  if (cached) {
    return cached.parsed;
  }
  const meta = await sourceStorage.getMeta(id);
  const mtime = meta.mtime;
  const size = meta.size || 0;
  const hash$1 = hash({
    // Last modified time
    mtime,
    // File size
    size,
    // Add Content version to the hash, to revalidate the cache on content update
    version: contentConfig.cacheVersion,
    integrity: contentConfig.cacheIntegrity
  });
  if (cached?.hash === hash$1) {
    return cached.parsed;
  }
  const body = await sourceStorage.getItem(id);
  if (body === null) {
    return { _id: contentId, body: null };
  }
  const parsed = await parseContent(contentId, body);
  await cacheParsedStorage.setItem(id, { parsed, hash: hash$1 }).catch(() => {
  });
  return parsed;
};
async function parseContent(id, content, opts = {}) {
  const nitroApp = useNitroApp();
  const options = defu(
    opts,
    {
      markdown: contentConfig.markdown,
      csv: contentConfig.csv,
      yaml: contentConfig.yaml,
      highlight: contentConfig.highlight,
      transformers: transformers,
      pathMeta: {
        defaultLocale: contentConfig.defaultLocale,
        locales: contentConfig.locales
      }
    }
  );
  const file = { _id: id, body: content };
  await nitroApp.hooks.callHook("content:file:beforeParse", file);
  const result = await transformContent(id, file.body, options);
  await nitroApp.hooks.callHook("content:file:afterParse", result);
  return result;
}
const createServerQueryFetch = (event) => (query) => {
  return createPipelineFetcher(() => getIndexedContentsList(event, query))(query);
};
function serverQueryContent(event, query, ...pathParts) {
  const queryBuilder = createQuery(createServerQueryFetch(event), typeof query !== "string" ? query || {} : {});
  let path;
  if (typeof query === "string") {
    path = withLeadingSlash(joinURL(query, ...pathParts));
  }
  const originalParamsFn = queryBuilder.params;
  queryBuilder.params = () => {
    const params = originalParamsFn();
    if (path) {
      params.where = params.where || [];
      if (params.first && (params.where || []).length === 0) {
        params.where.push({ _path: withoutTrailingSlash(path) });
      } else {
        params.where.push({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
      }
    }
    if (!params.sort?.length) {
      params.sort = [{ _file: 1, $numeric: true }];
    }
    if (contentConfig.locales.length) {
      const queryLocale = params.where?.find((w) => w._locale)?._locale;
      if (!queryLocale) {
        params.where = params.where || [];
        params.where.push({ _locale: contentConfig.defaultLocale });
      }
    }
    return params;
  };
  return queryBuilder;
}

function decodeParams(params = "") {
  const result = {};
  params = params.replace(/\.json$/, "");
  for (const param of params.split(":")) {
    const [key, ...value] = param.split("_");
    result[key] = value.join("_");
  }
  return result;
}
function isBot(user) {
  return user.login.includes("[bot]") || user.login.includes("-bot") || user.login.includes(".bot");
}
function normalizeRelease(release) {
  return {
    name: normalizeReleaseName(release?.name || release?.tag_name),
    tag_name: release?.tag_name,
    date: release?.published_at,
    body: release?.body,
    v: +normalizeReleaseName(release?.tag_name)?.substring(1, 2) || 0,
    url: release?.html_url,
    tarball: release?.tarball_url,
    zipball: release?.zipball_url,
    prerelease: release?.prerelease,
    reactions: release?.reactions,
    author: {
      name: release?.author?.login,
      url: release?.author?.html_url,
      avatar: release?.author?.avatar_url
    }
  };
}
function normalizeReleaseName(name) {
  if (!name) {
    return "";
  }
  name = name.replace("Release ", "");
  if (!name.match(/^[a-zA-Z]/)) {
    name = `v${name}`;
  }
  return name;
}
function githubGraphqlQuery(query, options) {
  const gq = graphql.defaults({
    headers: {
      authorization: `token ${options.token}`
    }
  });
  return gq(query);
}
const parseRelease = async (release, githubConfig) => {
  let parsedRelease;
  try {
    parsedRelease = {
      ...release,
      ...typeof parseContent === "function" && release?.body && release?.name ? await parseContent(`github:${release.name}.md`, release.body, {
        markdown: {
          remarkPlugins: {
            "remark-github": {
              instance: remarkGithub,
              repository: `${githubConfig.owner}/${githubConfig.repo}`
            }
          }
        }
      }) : {}
    };
  } catch (_err) {
    console.warn(`Cannot parse release ${release?.name} [${_err.response?.status || 500}]`);
    return;
  }
  return parsedRelease;
};
function overrideConfig(config, query) {
  return (({ owner, repo, branch, api, token }) => ({ owner, repo, branch, api, token }))(defu$1(query, config));
}
async function fetchRepository({ api, owner, repo, token }) {
  const url = `${api}/repos/${owner}/${repo}`;
  const repository = await $fetch(url, {
    headers: {
      Authorization: token ? `token ${token}` : void 0
    }
  }).catch((_) => {
    return {};
  });
  return repository;
}
async function fetchRepositoryContributors({ max }, { api, owner, repo, token }) {
  let url = `${api}/repos/${owner}/${repo}/contributors`;
  url = withQuery(url, { max });
  const contributors = await $fetch(url, {
    headers: {
      Authorization: token ? `token ${token}` : void 0
    }
  }).catch((_) => {
    return [];
  });
  return contributors.map(({ avatar_url, login }) => ({ avatar_url, login }));
}
async function fetchCommits({ date, source }, { owner, repo, branch, token }) {
  const daysAgo = () => {
    if (date) {
      return date.toISOString();
    }
    const now = new Date();
    now.setDate(now.getDate() - 30);
    return now.toISOString();
  };
  const path = source ? `path: "${source}",` : "";
  const data = await githubGraphqlQuery(
    `
      query {
        repository(owner: "${owner}", name: "${repo}") {
          object(expression: "${branch}") {
            ... on Commit {
              history(since: "${daysAgo()}", ${path}) {
                nodes {
                  oid
                  messageHeadlineHTML
                  authors(first: ${5}) {
                    nodes {
                      user {
                        name
                        avatarUrl
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    { token }
  );
  if (!data?.repository?.object?.history?.nodes) {
    return [];
  }
  const commits = data.repository.object.history.nodes.map((node) => ({
    hash: node.oid,
    message: node.messageHeadlineHTML,
    authors: node.authors.nodes.map((author) => author.user).filter((user) => user?.name && !isBot(user))
  }));
  return commits;
}
async function fetchFileContributors({ source, max }, { owner, repo, branch, token }) {
  const data = await githubGraphqlQuery(
    `
  query {
    repository(owner: "${owner}", name: "${repo}") {
      object(expression: "${branch}") {
        ... on Commit {
          history(first: ${max}, path: "${source}") {
            nodes {
              authors(first: ${max}) {
                nodes {
                  user {
                    name
                    avatarUrl
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }`,
    { token }
  ).catch((_) => {
  });
  if (!data?.repository?.object?.history?.nodes) {
    return [];
  }
  let users = data.repository.object.history.nodes.map((node) => node.authors.nodes).flat().map((node) => node.user).filter((user) => user && user.name).filter((user) => !isBot(user));
  users = users.reduce((unique, user) => unique.find((u) => u.login === user.login) ? unique : unique.concat(user), []);
  return users.map(({ avatarUrl, name, login }) => ({ avatar_url: avatarUrl, name, login }));
}
async function fetchReleases(query, { api, repo, token, owner }) {
  const page = query?.page || 1;
  const perPage = query?.per_page || 100;
  const last = query?.last || false;
  const tag = query?.tag || false;
  let url = `${api}/repos/${owner}/${repo}/releases`;
  if (tag) {
    url = joinURL(url, "tags", tag);
  } else if (last) {
    url = joinURL(url, "latest");
  } else {
    url = withQuery(url, { per_page: perPage, page });
  }
  const rawReleases = await $fetch(url, {
    headers: {
      Authorization: token ? `token ${token}` : void 0
    }
  }).catch((_) => {
  });
  if (!rawReleases) {
    return last ? {} : [];
  }
  return last || tag ? normalizeRelease(rawReleases) : rawReleases.filter((r) => !r.draft).map(normalizeRelease);
}
async function fetchReadme({ api, owner, repo, token }) {
  const url = `${api}/repos/${owner}/${repo}/readme`;
  const readme = await $fetch(url, {
    headers: {
      Authorization: token ? `token ${token}` : void 0
    }
  }).catch((_) => {
    return {};
  });
  return readme;
}

const moduleConfig$5 = useRuntimeConfig().github;
let handler$5;
if (moduleConfig$5.disableCache) {
  handler$5 = defineEventHandler;
} else {
  handler$5 = defineCachedEventHandler;
}
const _2KggeI = handler$5(
  async (event) => {
    const query = decodeParams(event.context.params.query);
    const githubConfig = overrideConfig(moduleConfig$5, query);
    return await fetchRepository(githubConfig);
  },
  {
    maxAge: 60
  }
);

const moduleConfig$4 = useRuntimeConfig().github;
let handler$4;
if (moduleConfig$4.disableCache) {
  handler$4 = defineEventHandler;
} else {
  handler$4 = defineCachedEventHandler;
}
const _0ciJvO = handler$4(
  async (event) => {
    const query = decodeParams(event.context.params.query);
    const githubConfig = overrideConfig(moduleConfig$4, query);
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.api) {
      return [];
    }
    const readme = await fetchReadme(githubConfig);
    const content = Buffer.from(readme.content ?? "", "base64").toString();
    if (moduleConfig$4.parseContents) {
      return await parseContent(`${githubConfig.owner}:${githubConfig.repo}:readme.md`, content, {
        markdown: {
          remarkPlugins: {
            "remark-github": {
              repository: `${githubConfig.owner}/${githubConfig.repo}`
            }
          }
        }
      });
    }
    return content;
  },
  {
    maxAge: 60
  }
);

const moduleConfig$3 = useRuntimeConfig().github;
let handler$3;
if (moduleConfig$3.disableCache) {
  handler$3 = defineEventHandler;
} else {
  handler$3 = defineCachedEventHandler;
}
const _oKef6Q = handler$3(
  async (event) => {
    const query = decodeParams(event.context.params.query);
    const githubConfig = overrideConfig(moduleConfig$3, query);
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.api) {
      return [];
    }
    let releases = await fetchReleases(query, githubConfig);
    if (!releases) {
      return;
    }
    if (moduleConfig$3.parseContents) {
      if (Array.isArray(releases)) {
        releases = await Promise.all(releases.map((release) => parseRelease(release, githubConfig)));
      } else {
        return await parseRelease(releases, githubConfig);
      }
    }
    return (releases || []).sort((a, b) => a.v !== b.v ? b.v - a.v : a.date - b.date).filter(Boolean);
  },
  {
    maxAge: 60
  }
);

const moduleConfig$2 = useRuntimeConfig().github;
let handler$2;
if (moduleConfig$2.disableCache) {
  handler$2 = defineEventHandler;
} else {
  handler$2 = defineCachedEventHandler;
}
const _iRciH8 = handler$2(
  async (event) => {
    const query = decodeParams(event.context.params.query);
    const githubConfig = overrideConfig(moduleConfig$2, query);
    return await fetchRepositoryContributors(query, githubConfig);
  },
  {
    maxAge: 60
  }
);

const moduleConfig$1 = useRuntimeConfig().github;
let handler$1;
if (moduleConfig$1.disableCache) {
  handler$1 = defineEventHandler;
} else {
  handler$1 = defineCachedEventHandler;
}
const _twuXZl = handler$1(
  async (event) => {
    const query = decodeParams(event.context.params.query);
    const githubConfig = overrideConfig(moduleConfig$1, query);
    query.max = query.max ? Number(query.max) : moduleConfig$1.maxContributors;
    return await fetchFileContributors(query, githubConfig);
  },
  {
    maxAge: 60
  }
);

const moduleConfig = useRuntimeConfig().github ?? {};
let handler;
if (moduleConfig.disableCache) {
  handler = defineEventHandler;
} else {
  handler = defineCachedEventHandler;
}
const _5eULYJ = handler(
  async (event) => {
    const query = decodeParams(event.context.params.query);
    const normalizedQuery = {
      ...query,
      date: query.date ? new Date(query.date) : void 0
    };
    const githubConfig = overrideConfig(moduleConfig, query);
    return await fetchCommits(normalizedQuery, githubConfig);
  },
  {
    maxAge: 60
  }
);

const config = useRuntimeConfig().public;
const _daWlwH = defineEventHandler(async (event) => {
  assertMethod(event, "POST");
  const body = await readBody(event);
  const cookieOptions = config.supabase.cookies;
  const { event: signEvent, session } = body;
  if (!event) {
    throw new Error("Auth event missing!");
  }
  if (signEvent === "SIGNED_IN" || signEvent === "TOKEN_REFRESHED") {
    if (!session) {
      throw new Error("Auth session missing!");
    }
    setCookie(
      event,
      `${cookieOptions.name}-access-token`,
      session.access_token,
      {
        domain: cookieOptions.domain,
        maxAge: cookieOptions.lifetime ?? 0,
        path: cookieOptions.path,
        sameSite: cookieOptions.sameSite
      }
    );
    setCookie(event, `${cookieOptions.name}-refresh-token`, session.refresh_token, {
      domain: cookieOptions.domain,
      maxAge: cookieOptions.lifetime ?? 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite
    });
  }
  if (signEvent === "SIGNED_OUT") {
    setCookie(event, `${cookieOptions.name}-access-token`, "", {
      maxAge: -1,
      path: cookieOptions.path
    });
    setCookie(event, `${cookieOptions.name}-refresh-token`, "", {
      maxAge: -1,
      path: cookieOptions.path
    });
  }
  return "auth cookie set";
});

var version = "0.3.12";

const components = {
  "Hero": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/components/content/Hero.vue",
    "pascalName": "Hero",
    "kebabName": "hero",
    "chunkName": "components/hero",
    "shortPath": "components/content/Hero.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/content/Hero.vue",
    "meta": {
      "props": [
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80&h=400\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AboutZynomi": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/AboutZynomi.vue",
    "pascalName": "AboutZynomi",
    "kebabName": "about-zynomi",
    "chunkName": "components/about-zynomi",
    "shortPath": "components/AboutZynomi.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/AboutZynomi.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Account": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Account.vue",
    "pascalName": "Account",
    "kebabName": "account",
    "chunkName": "components/account",
    "shortPath": "components/Account.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Account.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "BarChart": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/BarChart.vue",
    "pascalName": "BarChart",
    "kebabName": "bar-chart",
    "chunkName": "components/bar-chart",
    "shortPath": "components/BarChart.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/BarChart.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        },
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "label",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "selected_item",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "api",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Blog": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Blog.vue",
    "pascalName": "Blog",
    "kebabName": "blog",
    "chunkName": "components/blog",
    "shortPath": "components/Blog.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Blog.vue",
    "meta": {
      "props": [
        {
          "name": "articles",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "BusinessCardForm": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/BusinessCardForm.vue",
    "pascalName": "BusinessCardForm",
    "kebabName": "business-card-form",
    "chunkName": "components/business-card-form",
    "shortPath": "components/BusinessCardForm.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/BusinessCardForm.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Carousel": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Carousel.vue",
    "pascalName": "Carousel",
    "kebabName": "carousel",
    "chunkName": "components/carousel",
    "shortPath": "components/Carousel.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Carousel.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "CheckBoxGroup": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/CheckBoxGroup.vue",
    "pascalName": "CheckBoxGroup",
    "kebabName": "check-box-group",
    "chunkName": "components/check-box-group",
    "shortPath": "components/CheckBoxGroup.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/CheckBoxGroup.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any"
        },
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "api",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "checked_value",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any"
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "checked_item",
          "type": "any[]",
          "signature": "(event: \"checked_item\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "ComboChart": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ComboChart.vue",
    "pascalName": "ComboChart",
    "kebabName": "combo-chart",
    "chunkName": "components/combo-chart",
    "shortPath": "components/ComboChart.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ComboChart.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        },
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "label",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "selected_item",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "api",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContactSales": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ContactSales.vue",
    "pascalName": "ContactSales",
    "kebabName": "contact-sales",
    "chunkName": "components/contact-sales",
    "shortPath": "components/ContactSales.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ContactSales.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Cta": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Cta.vue",
    "pascalName": "Cta",
    "kebabName": "cta",
    "chunkName": "components/cta",
    "shortPath": "components/Cta.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Cta.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocumentDrivenEmpty": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/DocumentDrivenEmpty.vue",
    "pascalName": "DocumentDrivenEmpty",
    "kebabName": "document-driven-empty",
    "chunkName": "components/document-driven-empty",
    "shortPath": "components/DocumentDrivenEmpty.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/DocumentDrivenEmpty.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocumentDrivenNotFound": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/DocumentDrivenNotFound.vue",
    "pascalName": "DocumentDrivenNotFound",
    "kebabName": "document-driven-not-found",
    "chunkName": "components/document-driven-not-found",
    "shortPath": "components/DocumentDrivenNotFound.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/DocumentDrivenNotFound.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Dropdownlist": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Dropdownlist.vue",
    "pascalName": "Dropdownlist",
    "kebabName": "dropdownlist",
    "chunkName": "components/dropdownlist",
    "shortPath": "components/Dropdownlist.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Dropdownlist.vue",
    "meta": {
      "props": [
        {
          "name": "show_label",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "readonly",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        },
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "label",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "api",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "selected_value",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "selected_text",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "selected_item",
          "type": "any[]",
          "signature": "(event: \"selected_item\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "Faq": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Faq.vue",
    "pascalName": "Faq",
    "kebabName": "faq",
    "chunkName": "components/faq",
    "shortPath": "components/Faq.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Faq.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Footer": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Footer.vue",
    "pascalName": "Footer",
    "kebabName": "footer",
    "chunkName": "components/footer",
    "shortPath": "components/Footer.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Footer.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Header": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Header.vue",
    "pascalName": "Header",
    "kebabName": "header",
    "chunkName": "components/header",
    "shortPath": "components/Header.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Header.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "HeaderDocs": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/HeaderDocs.vue",
    "pascalName": "HeaderDocs",
    "kebabName": "header-docs",
    "chunkName": "components/header-docs",
    "shortPath": "components/HeaderDocs.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/HeaderDocs.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "HeroSingleGrid": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Hero-single-grid.vue",
    "pascalName": "HeroSingleGrid",
    "kebabName": "hero-single-grid",
    "chunkName": "components/hero-single-grid",
    "shortPath": "components/Hero-single-grid.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Hero-single-grid.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconLogo": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Icon/Logo.vue",
    "pascalName": "IconLogo",
    "kebabName": "icon-logo",
    "chunkName": "components/icon-logo",
    "shortPath": "components/Icon/Logo.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Icon/Logo.vue",
    "meta": {
      "props": [
        {
          "name": "logo_url",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "InstagramPosts": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/InstagramPosts.vue",
    "pascalName": "InstagramPosts",
    "kebabName": "instagram-posts",
    "chunkName": "components/instagram-posts",
    "shortPath": "components/InstagramPosts.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/InstagramPosts.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Marquee": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Marquee.vue",
    "pascalName": "Marquee",
    "kebabName": "marquee",
    "chunkName": "components/marquee",
    "shortPath": "components/Marquee.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Marquee.vue",
    "meta": {
      "props": [
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "SetupsMenu": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/SetupsMenu.vue",
    "pascalName": "SetupsMenu",
    "kebabName": "setups-menu",
    "chunkName": "components/setups-menu",
    "shortPath": "components/SetupsMenu.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/SetupsMenu.vue",
    "meta": {
      "props": [
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "SignUp": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/SignUp.vue",
    "pascalName": "SignUp",
    "kebabName": "sign-up",
    "chunkName": "components/sign-up",
    "shortPath": "components/SignUp.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/SignUp.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Tab": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Tab.vue",
    "pascalName": "Tab",
    "kebabName": "tab",
    "chunkName": "components/tab",
    "shortPath": "components/Tab.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Tab.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Testimonials": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Testimonials.vue",
    "pascalName": "Testimonials",
    "kebabName": "testimonials",
    "chunkName": "components/testimonials",
    "shortPath": "components/Testimonials.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Testimonials.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Toc": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Toc.vue",
    "pascalName": "Toc",
    "kebabName": "toc",
    "chunkName": "components/toc",
    "shortPath": "components/Toc.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/Toc.vue",
    "meta": {
      "props": [
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiBlogPosts": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiBlogPosts.vue",
    "pascalName": "ZynomiBlogPosts",
    "kebabName": "zynomi-blog-posts",
    "chunkName": "components/zynomi-blog-posts",
    "shortPath": "components/ZynomiBlogPosts.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiBlogPosts.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiClientsMarquee": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiClientsMarquee.vue",
    "pascalName": "ZynomiClientsMarquee",
    "kebabName": "zynomi-clients-marquee",
    "chunkName": "components/zynomi-clients-marquee",
    "shortPath": "components/ZynomiClientsMarquee.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiClientsMarquee.vue",
    "meta": {
      "props": [
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiContactUs": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiContactUs.vue",
    "pascalName": "ZynomiContactUs",
    "kebabName": "zynomi-contact-us",
    "chunkName": "components/zynomi-contact-us",
    "shortPath": "components/ZynomiContactUs.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiContactUs.vue",
    "meta": {
      "props": [
        {
          "name": "organization",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiDynamicDataDisplay": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiDynamicDataDisplay.vue",
    "pascalName": "ZynomiDynamicDataDisplay",
    "kebabName": "zynomi-dynamic-data-display",
    "chunkName": "components/zynomi-dynamic-data-display",
    "shortPath": "components/ZynomiDynamicDataDisplay.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiDynamicDataDisplay.vue",
    "meta": {
      "props": [
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          }
        },
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "title_description",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiFooterLinks": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiFooterLinks.vue",
    "pascalName": "ZynomiFooterLinks",
    "kebabName": "zynomi-footer-links",
    "chunkName": "components/zynomi-footer-links",
    "shortPath": "components/ZynomiFooterLinks.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiFooterLinks.vue",
    "meta": {
      "props": [
        {
          "name": "module_name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiHero": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiHero.vue",
    "pascalName": "ZynomiHero",
    "kebabName": "zynomi-hero",
    "chunkName": "components/zynomi-hero",
    "shortPath": "components/ZynomiHero.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiHero.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiLegalTermsAndConditions": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiLegalTermsAndConditions.vue",
    "pascalName": "ZynomiLegalTermsAndConditions",
    "kebabName": "zynomi-legal-terms-and-conditions",
    "chunkName": "components/zynomi-legal-terms-and-conditions",
    "shortPath": "components/ZynomiLegalTermsAndConditions.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiLegalTermsAndConditions.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiMarkdownRenderer": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiMarkdownRenderer.vue",
    "pascalName": "ZynomiMarkdownRenderer",
    "kebabName": "zynomi-markdown-renderer",
    "chunkName": "components/zynomi-markdown-renderer",
    "shortPath": "components/ZynomiMarkdownRenderer.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiMarkdownRenderer.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiSocialLinks": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/ZynomiSocialLinks.vue",
    "pascalName": "ZynomiSocialLinks",
    "kebabName": "zynomi-social-links",
    "chunkName": "components/zynomi-social-links",
    "shortPath": "components/ZynomiSocialLinks.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/ZynomiSocialLinks.vue",
    "meta": {
      "props": [
        {
          "name": "module_name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "CommonsCompanyForm": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/commons/CompanyForm.vue",
    "pascalName": "CommonsCompanyForm",
    "kebabName": "commons-company-form",
    "chunkName": "components/commons-company-form",
    "shortPath": "components/commons/CompanyForm.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/commons/CompanyForm.vue",
    "meta": {
      "props": [
        {
          "name": "form_title",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "form_description",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "CommonsInquiryForm": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/commons/InquiryForm.vue",
    "pascalName": "CommonsInquiryForm",
    "kebabName": "commons-inquiry-form",
    "chunkName": "components/commons-inquiry-form",
    "shortPath": "components/commons/InquiryForm.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/commons/InquiryForm.vue",
    "meta": {
      "props": [
        {
          "name": "form_title",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "form_description",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "CommonsSecondaryNav": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/commons/SecondaryNav.vue",
    "pascalName": "CommonsSecondaryNav",
    "kebabName": "commons-secondary-nav",
    "chunkName": "components/commons-secondary-nav",
    "shortPath": "components/commons/SecondaryNav.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/commons/SecondaryNav.vue",
    "meta": {
      "props": [
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "CommonsSignUpForm": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/commons/SignUpForm.vue",
    "pascalName": "CommonsSignUpForm",
    "kebabName": "commons-sign-up-form",
    "chunkName": "components/commons-sign-up-form",
    "shortPath": "components/commons/SignUpForm.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/commons/SignUpForm.vue",
    "meta": {
      "props": [
        {
          "name": "form_title",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "form_description",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "CommonsUploaderForm": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/commons/UploaderForm.vue",
    "pascalName": "CommonsUploaderForm",
    "kebabName": "commons-uploader-form",
    "chunkName": "components/commons-uploader-form",
    "shortPath": "components/commons/UploaderForm.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/commons/UploaderForm.vue",
    "meta": {
      "props": [
        {
          "name": "logo_url",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DashboardStats": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/dashboard-stats.vue",
    "pascalName": "DashboardStats",
    "kebabName": "dashboard-stats",
    "chunkName": "components/dashboard-stats",
    "shortPath": "components/dashboard-stats.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/dashboard-stats.vue",
    "meta": {
      "props": [
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Docnav": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/docnav.vue",
    "pascalName": "Docnav",
    "kebabName": "docnav",
    "chunkName": "components/docnav",
    "shortPath": "components/docnav.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/docnav.vue",
    "meta": {
      "props": [
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Fullheader": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/fullheader.vue",
    "pascalName": "Fullheader",
    "kebabName": "fullheader",
    "chunkName": "components/fullheader",
    "shortPath": "components/fullheader.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/fullheader.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ManagementBrandMenu": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/management/BrandMenu.vue",
    "pascalName": "ManagementBrandMenu",
    "kebabName": "management-brand-menu",
    "chunkName": "components/management-brand-menu",
    "shortPath": "components/management/BrandMenu.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/management/BrandMenu.vue",
    "meta": {
      "props": [
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ManagementFooterSupportNav": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/management/FooterSupportNav.vue",
    "pascalName": "ManagementFooterSupportNav",
    "kebabName": "management-footer-support-nav",
    "chunkName": "components/management-footer-support-nav",
    "shortPath": "components/management/FooterSupportNav.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/management/FooterSupportNav.vue",
    "meta": {
      "props": [
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ManagementLeftNavBar": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/management/LeftNavBar.vue",
    "pascalName": "ManagementLeftNavBar",
    "kebabName": "management-left-nav-bar",
    "chunkName": "components/management-left-nav-bar",
    "shortPath": "components/management/LeftNavBar.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/management/LeftNavBar.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ManagementLeftNavProfileBar": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/management/LeftNavProfileBar.vue",
    "pascalName": "ManagementLeftNavProfileBar",
    "kebabName": "management-left-nav-profile-bar",
    "chunkName": "components/management-left-nav-profile-bar",
    "shortPath": "components/management/LeftNavProfileBar.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/management/LeftNavProfileBar.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ManagementLeftNavSecondary": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/management/LeftNavSecondary.vue",
    "pascalName": "ManagementLeftNavSecondary",
    "kebabName": "management-left-nav-secondary",
    "chunkName": "components/management-left-nav-secondary",
    "shortPath": "components/management/LeftNavSecondary.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/management/LeftNavSecondary.vue",
    "meta": {
      "props": [
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        },
        {
          "name": "api",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ManagementSoftwareVersion": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/management/SoftwareVersion.vue",
    "pascalName": "ManagementSoftwareVersion",
    "kebabName": "management-software-version",
    "chunkName": "components/management-software-version",
    "shortPath": "components/management/SoftwareVersion.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/management/SoftwareVersion.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ManagementUserAccountDropdownMenu": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/management/UserAccountDropdownMenu.vue",
    "pascalName": "ManagementUserAccountDropdownMenu",
    "kebabName": "management-user-account-dropdown-menu",
    "chunkName": "components/management-user-account-dropdown-menu",
    "shortPath": "components/management/UserAccountDropdownMenu.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/management/UserAccountDropdownMenu.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ModalAlert": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/modal/alert.vue",
    "pascalName": "ModalAlert",
    "kebabName": "modal-alert",
    "chunkName": "components/modal-alert",
    "shortPath": "components/modal/alert.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/modal/alert.vue",
    "meta": {
      "props": [
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "payload",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          }
        },
        {
          "name": "content",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "buttontext",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "buttoncolor",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "showmodal",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "showicon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "confirmDelete",
          "type": "any[]",
          "signature": "(event: \"confirmDelete\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "StatActions": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/stat-actions.vue",
    "pascalName": "StatActions",
    "kebabName": "stat-actions",
    "chunkName": "components/stat-actions",
    "shortPath": "components/stat-actions.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/stat-actions.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        },
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "label",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "selected_item",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "api",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "StatsSimple": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/stats-simple.vue",
    "pascalName": "StatsSimple",
    "kebabName": "stats-simple",
    "chunkName": "components/stats-simple",
    "shortPath": "components/stats-simple.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/stats-simple.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "unknown[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "unknown[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "unknown[]",
                "schema": [
                  "unknown"
                ]
              }
            ]
          }
        },
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "label",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "selected_item",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "api",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ZynomiStatsSimple": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/zynomi-stats-simple.vue",
    "pascalName": "ZynomiStatsSimple",
    "kebabName": "zynomi-stats-simple",
    "chunkName": "components/zynomi-stats-simple",
    "shortPath": "components/zynomi-stats-simple.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/components/zynomi-stats-simple.vue",
    "meta": {
      "props": [
        {
          "name": "data",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          }
        },
        {
          "name": "api_end_point",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppFooter": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppFooter.vue",
    "pascalName": "AppFooter",
    "kebabName": "app-footer",
    "chunkName": "components/app-footer",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppFooter.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppFooter.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppHeader": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppHeader.vue",
    "pascalName": "AppHeader",
    "kebabName": "app-header",
    "chunkName": "components/app-header",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppHeader.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppHeader.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppHeaderDialog": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppHeaderDialog.vue",
    "pascalName": "AppHeaderDialog",
    "kebabName": "app-header-dialog",
    "chunkName": "components/app-header-dialog",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppHeaderDialog.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppHeaderDialog.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppHeaderLogo": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppHeaderLogo.vue",
    "pascalName": "AppHeaderLogo",
    "kebabName": "app-header-logo",
    "chunkName": "components/app-header-logo",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppHeaderLogo.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppHeaderLogo.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppHeaderNavigation": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppHeaderNavigation.vue",
    "pascalName": "AppHeaderNavigation",
    "kebabName": "app-header-navigation",
    "chunkName": "components/app-header-navigation",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppHeaderNavigation.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppHeaderNavigation.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppLayout": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppLayout.vue",
    "pascalName": "AppLayout",
    "kebabName": "app-layout",
    "chunkName": "components/app-layout",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppLayout.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppLayout.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "AppLoadingBar": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppLoadingBar.vue",
    "pascalName": "AppLoadingBar",
    "kebabName": "app-loading-bar",
    "chunkName": "components/app-loading-bar",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppLoadingBar.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppLoadingBar.vue",
    "meta": {
      "props": [
        {
          "name": "throttle",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "200"
        },
        {
          "name": "duration",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "2000"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppSearch": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppSearch.vue",
    "pascalName": "AppSearch",
    "kebabName": "app-search",
    "chunkName": "components/app-search",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppSearch.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppSearch.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppSocialIcons": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppSocialIcons.vue",
    "pascalName": "AppSocialIcons",
    "kebabName": "app-social-icons",
    "chunkName": "components/app-social-icons",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppSocialIcons.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/AppSocialIcons.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Ellipsis": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/Ellipsis.vue",
    "pascalName": "Ellipsis",
    "kebabName": "ellipsis",
    "chunkName": "components/ellipsis",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/Ellipsis.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/Ellipsis.vue",
    "meta": {
      "props": [
        {
          "name": "width",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"10rem\""
        },
        {
          "name": "height",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"10rem\""
        },
        {
          "name": "zIndex",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"10\""
        },
        {
          "name": "top",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"0\""
        },
        {
          "name": "left",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"auto\""
        },
        {
          "name": "right",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"auto\""
        },
        {
          "name": "blur",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"50px\""
        },
        {
          "name": "colors",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          },
          "default": "[\"rgba(0, 71, 225, 0.22)\", \"rgba(26, 214, 255, 0.22)\", \"rgba(0, 220, 130, 0.22)\"]"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Logo": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/Logo.vue",
    "pascalName": "Logo",
    "kebabName": "logo",
    "chunkName": "components/logo",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/Logo.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/Logo.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ThemeSelect": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/ThemeSelect.vue",
    "pascalName": "ThemeSelect",
    "kebabName": "theme-select",
    "chunkName": "components/theme-select",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/ThemeSelect.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/app/ThemeSelect.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsAside": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsAside.vue",
    "pascalName": "DocsAside",
    "kebabName": "docs-aside",
    "chunkName": "components/docs-aside",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsAside.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/DocsAside.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsAsideTree": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsAsideTree.vue",
    "pascalName": "DocsAsideTree",
    "kebabName": "docs-aside-tree",
    "chunkName": "components/docs-aside-tree",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsAsideTree.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/DocsAsideTree.vue",
    "meta": {
      "props": [
        {
          "name": "links",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any",
          "default": "[]"
        },
        {
          "name": "level",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "0"
        },
        {
          "name": "max",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "null"
        },
        {
          "name": "parent",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any",
          "default": "null"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsPageBottom": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsPageBottom.vue",
    "pascalName": "DocsPageBottom",
    "kebabName": "docs-page-bottom",
    "chunkName": "components/docs-page-bottom",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsPageBottom.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/DocsPageBottom.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsPageLayout": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsPageLayout.vue",
    "pascalName": "DocsPageLayout",
    "kebabName": "docs-page-layout",
    "chunkName": "components/docs-page-layout",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsPageLayout.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/DocsPageLayout.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "DocsPrevNext": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsPrevNext.vue",
    "pascalName": "DocsPrevNext",
    "kebabName": "docs-prev-next",
    "chunkName": "components/docs-prev-next",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsPrevNext.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/DocsPrevNext.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsToc": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsToc.vue",
    "pascalName": "DocsToc",
    "kebabName": "docs-toc",
    "chunkName": "components/docs-toc",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsToc.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/DocsToc.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [
        {
          "name": "move",
          "type": "any[]",
          "signature": "(event: \"move\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "DocsTocLinks": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsTocLinks.vue",
    "pascalName": "DocsTocLinks",
    "kebabName": "docs-toc-links",
    "chunkName": "components/docs-toc-links",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsTocLinks.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/DocsTocLinks.vue",
    "meta": {
      "props": [
        {
          "name": "links",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "TocLink[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "TocLink[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "TocLink[]",
                "schema": [
                  {
                    "kind": "object",
                    "type": "TocLink",
                    "schema": {
                      "id": {
                        "name": "id",
                        "global": false,
                        "description": "",
                        "tags": [],
                        "required": true,
                        "type": "string",
                        "schema": "string"
                      },
                      "text": {
                        "name": "text",
                        "global": false,
                        "description": "",
                        "tags": [],
                        "required": true,
                        "type": "string",
                        "schema": "string"
                      },
                      "depth": {
                        "name": "depth",
                        "global": false,
                        "description": "",
                        "tags": [],
                        "required": true,
                        "type": "number",
                        "schema": "number"
                      },
                      "children": {
                        "name": "children",
                        "global": false,
                        "description": "",
                        "tags": [],
                        "required": false,
                        "type": "TocLink[] | undefined",
                        "schema": "TocLink[] | undefined"
                      }
                    }
                  }
                ]
              }
            ]
          },
          "default": "[]"
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "move",
          "type": "any[]",
          "signature": "(event: \"move\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "EditOnLink": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/EditOnLink.vue",
    "pascalName": "EditOnLink",
    "kebabName": "edit-on-link",
    "chunkName": "components/edit-on-link",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/EditOnLink.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/EditOnLink.vue",
    "meta": {
      "props": [
        {
          "name": "owner",
          "global": false,
          "description": "Repository owner.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.docus?.github?.owner"
        },
        {
          "name": "repo",
          "global": false,
          "description": "Repository name.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.docus?.github?.repo"
        },
        {
          "name": "branch",
          "global": false,
          "description": "The branch to use for the edit link.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.docus?.github?.branch"
        },
        {
          "name": "dir",
          "global": false,
          "description": "A base directory to append to the source path.\n\nWon't be used if `page` is set.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.docus?.github?.dir"
        },
        {
          "name": "source",
          "global": false,
          "description": "Source file path.\n\nWon't be used if `page` is set.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "undefined"
        },
        {
          "name": "page",
          "global": false,
          "description": "Use page from @nuxt/content.",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any",
          "default": "undefined"
        },
        {
          "name": "contentDir",
          "global": false,
          "description": "Content directory (to be used with `page`)",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.docus?.github?.dir || \"content\""
        },
        {
          "name": "edit",
          "global": false,
          "description": "Send to an edit page or not.",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "useAppConfig()?.docus?.github?.edit"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "SourceLink": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/SourceLink.vue",
    "pascalName": "SourceLink",
    "kebabName": "source-link",
    "chunkName": "components/source-link",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/SourceLink.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/docus/components/docs/SourceLink.vue",
    "meta": {
      "props": [
        {
          "name": "source",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ProseA": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseA.vue",
    "pascalName": "ProseA",
    "kebabName": "prose-a",
    "chunkName": "components/prose-a",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseA.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseA.vue",
    "meta": {
      "props": [
        {
          "name": "href",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "target",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "undefined"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseBlockquote": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseBlockquote.vue",
    "pascalName": "ProseBlockquote",
    "kebabName": "prose-blockquote",
    "chunkName": "components/prose-blockquote",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseBlockquote.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseBlockquote.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseCode": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseCode.vue",
    "pascalName": "ProseCode",
    "kebabName": "prose-code",
    "chunkName": "components/prose-code",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseCode.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseCode.vue",
    "meta": {
      "props": [
        {
          "name": "code",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "language",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Lang | undefined",
          "schema": {
            "kind": "enum",
            "type": "Lang | undefined",
            "schema": [
              "undefined",
              "\"vue\"",
              "\"abap\"",
              "\"actionscript-3\"",
              "\"ada\"",
              "\"apache\"",
              "\"apex\"",
              "\"apl\"",
              "\"applescript\"",
              "\"asm\"",
              "\"astro\"",
              "\"awk\"",
              "\"ballerina\"",
              "\"bat\"",
              "\"batch\"",
              "\"berry\"",
              "\"be\"",
              "\"bibtex\"",
              "\"bicep\"",
              "\"blade\"",
              "\"c\"",
              "\"cadence\"",
              "\"cdc\"",
              "\"clarity\"",
              "\"clojure\"",
              "\"clj\"",
              "\"cmake\"",
              "\"cobol\"",
              "\"codeql\"",
              "\"ql\"",
              "\"coffee\"",
              "\"cpp\"",
              "\"crystal\"",
              "\"csharp\"",
              "\"c#\"",
              "\"cs\"",
              "\"css\"",
              "\"cue\"",
              "\"d\"",
              "\"dart\"",
              "\"diff\"",
              "\"docker\"",
              "\"dream-maker\"",
              "\"elixir\"",
              "\"elm\"",
              "\"erb\"",
              "\"erlang\"",
              "\"erl\"",
              "\"fish\"",
              "\"fsharp\"",
              "\"f#\"",
              "\"fs\"",
              "\"gherkin\"",
              "\"git-commit\"",
              "\"git-rebase\"",
              "\"glsl\"",
              "\"gnuplot\"",
              "\"go\"",
              "\"graphql\"",
              "\"groovy\"",
              "\"hack\"",
              "\"haml\"",
              "\"handlebars\"",
              "\"hbs\"",
              "\"haskell\"",
              "\"hs\"",
              "\"hcl\"",
              "\"hlsl\"",
              "\"html\"",
              "\"imba\"",
              "\"ini\"",
              "\"java\"",
              "\"javascript\"",
              "\"js\"",
              "\"jinja-html\"",
              "\"json\"",
              "\"json5\"",
              "\"jsonc\"",
              "\"jsonnet\"",
              "\"jssm\"",
              "\"fsl\"",
              "\"jsx\"",
              "\"julia\"",
              "\"kotlin\"",
              "\"latex\"",
              "\"less\"",
              "\"liquid\"",
              "\"lisp\"",
              "\"logo\"",
              "\"lua\"",
              "\"make\"",
              "\"makefile\"",
              "\"markdown\"",
              "\"md\"",
              "\"marko\"",
              "\"matlab\"",
              "\"mdx\"",
              "\"mermaid\"",
              "\"nginx\"",
              "\"nim\"",
              "\"nix\"",
              "\"objective-c\"",
              "\"objc\"",
              "\"objective-cpp\"",
              "\"ocaml\"",
              "\"pascal\"",
              "\"perl\"",
              "\"php\"",
              "\"plsql\"",
              "\"postcss\"",
              "\"powershell\"",
              "\"ps\"",
              "\"ps1\"",
              "\"prisma\"",
              "\"prolog\"",
              "\"proto\"",
              "\"pug\"",
              "\"jade\"",
              "\"puppet\"",
              "\"purescript\"",
              "\"python\"",
              "\"py\"",
              "\"r\"",
              "\"raku\"",
              "\"perl6\"",
              "\"razor\"",
              "\"rel\"",
              "\"riscv\"",
              "\"rst\"",
              "\"ruby\"",
              "\"rb\"",
              "\"rust\"",
              "\"rs\"",
              "\"sas\"",
              "\"sass\"",
              "\"scala\"",
              "\"scheme\"",
              "\"scss\"",
              "\"shaderlab\"",
              "\"shader\"",
              "\"shellscript\"",
              "\"shell\"",
              "\"bash\"",
              "\"sh\"",
              "\"zsh\"",
              "\"smalltalk\"",
              "\"solidity\"",
              "\"sparql\"",
              "\"sql\"",
              "\"ssh-config\"",
              "\"stata\"",
              "\"stylus\"",
              "\"styl\"",
              "\"svelte\"",
              "\"swift\"",
              "\"system-verilog\"",
              "\"tasl\"",
              "\"tcl\"",
              "\"tex\"",
              "\"toml\"",
              "\"tsx\"",
              "\"turtle\"",
              "\"twig\"",
              "\"typescript\"",
              "\"ts\"",
              "\"v\"",
              "\"vb\"",
              "\"cmd\"",
              "\"verilog\"",
              "\"vhdl\"",
              "\"viml\"",
              "\"vim\"",
              "\"vimscript\"",
              "\"vue-html\"",
              "\"wasm\"",
              "\"wenyan\"",
              "\"文言\"",
              "\"xml\"",
              "\"xsl\"",
              "\"yaml\"",
              "\"zenscript\""
            ]
          },
          "default": "null"
        },
        {
          "name": "filename",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "null"
        },
        {
          "name": "highlights",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "number[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "number[]",
                "schema": [
                  "number"
                ]
              }
            ]
          },
          "default": "[]"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseCodeInline": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseCodeInline.vue",
    "pascalName": "ProseCodeInline",
    "kebabName": "prose-code-inline",
    "chunkName": "components/prose-code-inline",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseCodeInline.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseCodeInline.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseEm": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseEm.vue",
    "pascalName": "ProseEm",
    "kebabName": "prose-em",
    "chunkName": "components/prose-em",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseEm.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseEm.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseH1": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH1.vue",
    "pascalName": "ProseH1",
    "kebabName": "prose-h1",
    "chunkName": "components/prose-h1",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH1.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseH1.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseH2": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH2.vue",
    "pascalName": "ProseH2",
    "kebabName": "prose-h2",
    "chunkName": "components/prose-h2",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH2.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseH2.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseH3": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH3.vue",
    "pascalName": "ProseH3",
    "kebabName": "prose-h3",
    "chunkName": "components/prose-h3",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH3.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseH3.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseH4": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH4.vue",
    "pascalName": "ProseH4",
    "kebabName": "prose-h4",
    "chunkName": "components/prose-h4",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH4.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseH4.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseH5": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH5.vue",
    "pascalName": "ProseH5",
    "kebabName": "prose-h5",
    "chunkName": "components/prose-h5",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH5.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseH5.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseH6": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH6.vue",
    "pascalName": "ProseH6",
    "kebabName": "prose-h6",
    "chunkName": "components/prose-h6",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH6.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseH6.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseHr": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseHr.vue",
    "pascalName": "ProseHr",
    "kebabName": "prose-hr",
    "chunkName": "components/prose-hr",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseHr.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseHr.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ProseImg": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseImg.vue",
    "pascalName": "ProseImg",
    "kebabName": "prose-img",
    "chunkName": "components/prose-img",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseImg.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseImg.vue",
    "meta": {
      "props": [
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "alt",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "width",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | number | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | number | undefined",
            "schema": [
              "undefined",
              "string",
              "number"
            ]
          },
          "default": "undefined"
        },
        {
          "name": "height",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | number | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | number | undefined",
            "schema": [
              "undefined",
              "string",
              "number"
            ]
          },
          "default": "undefined"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ProseLi": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseLi.vue",
    "pascalName": "ProseLi",
    "kebabName": "prose-li",
    "chunkName": "components/prose-li",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseLi.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseLi.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseOl": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseOl.vue",
    "pascalName": "ProseOl",
    "kebabName": "prose-ol",
    "chunkName": "components/prose-ol",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseOl.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseOl.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseP": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseP.vue",
    "pascalName": "ProseP",
    "kebabName": "prose-p",
    "chunkName": "components/prose-p",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseP.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseP.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseStrong": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseStrong.vue",
    "pascalName": "ProseStrong",
    "kebabName": "prose-strong",
    "chunkName": "components/prose-strong",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseStrong.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseStrong.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTable": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTable.vue",
    "pascalName": "ProseTable",
    "kebabName": "prose-table",
    "chunkName": "components/prose-table",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTable.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseTable.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTbody": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTbody.vue",
    "pascalName": "ProseTbody",
    "kebabName": "prose-tbody",
    "chunkName": "components/prose-tbody",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTbody.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseTbody.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTd": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTd.vue",
    "pascalName": "ProseTd",
    "kebabName": "prose-td",
    "chunkName": "components/prose-td",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTd.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseTd.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTh": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTh.vue",
    "pascalName": "ProseTh",
    "kebabName": "prose-th",
    "chunkName": "components/prose-th",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTh.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseTh.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseThead": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseThead.vue",
    "pascalName": "ProseThead",
    "kebabName": "prose-thead",
    "chunkName": "components/prose-thead",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseThead.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseThead.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTr": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTr.vue",
    "pascalName": "ProseTr",
    "kebabName": "prose-tr",
    "chunkName": "components/prose-tr",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTr.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseTr.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseUl": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseUl.vue",
    "pascalName": "ProseUl",
    "kebabName": "prose-ul",
    "chunkName": "components/prose-ul",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseUl.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/global/ProseUl.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseCodeCopyButton": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/ProseCodeCopyButton.vue",
    "pascalName": "ProseCodeCopyButton",
    "kebabName": "prose-code-copy-button",
    "chunkName": "components/prose-code-copy-button",
    "shortPath": "node_modules/@nuxt-themes/typography/components/ProseCodeCopyButton.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/typography/components/ProseCodeCopyButton.vue",
    "meta": {
      "props": [
        {
          "name": "content",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "show",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Alert": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Alert.vue",
    "pascalName": "Alert",
    "kebabName": "alert",
    "chunkName": "components/alert",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Alert.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/Alert.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [
            {
              "name": "values",
              "text": "info, success, warning, danger"
            }
          ],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"info\""
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "Badge": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Badge.vue",
    "pascalName": "Badge",
    "kebabName": "badge",
    "chunkName": "components/badge",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Badge.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/Badge.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [
            {
              "name": "values",
              "text": "info, success, warning, danger"
            }
          ],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"info\""
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ButtonLink": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/ButtonLink.vue",
    "pascalName": "ButtonLink",
    "kebabName": "button-link",
    "chunkName": "components/button-link",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/ButtonLink.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/ButtonLink.vue",
    "meta": {
      "props": [
        {
          "name": "color",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "ComputedStyleProp<string | number | symbol> | undefined",
          "schema": {
            "kind": "enum",
            "type": "ComputedStyleProp<string | number | symbol> | undefined",
            "schema": [
              "undefined",
              "string",
              "number",
              "symbol",
              "{ dark?: string | number | symbol | undefined; light?: string | number | symbol | undefined; initial?: string | number | symbol | undefined; }"
            ]
          }
        },
        {
          "name": "blank",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "href",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "size",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "\"small\" | \"medium\" | \"large\" | \"giant\" | { dark?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; light?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; initial?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; } | undefined",
          "schema": {
            "kind": "enum",
            "type": "\"small\" | \"medium\" | \"large\" | \"giant\" | { dark?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; light?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; initial?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; } | undefined",
            "schema": [
              "undefined",
              "\"small\"",
              "\"medium\"",
              "\"large\"",
              "\"giant\"",
              "{ dark?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; light?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; initial?: \"small\" | \"medium\" | \"large\" | \"giant\" | undefined; }"
            ]
          }
        },
        {
          "name": "transparent",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | { dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; } | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | { dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; } | undefined",
            "schema": [
              "undefined",
              "false",
              "true",
              "{ dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; }"
            ]
          }
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "Callout": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Callout.vue",
    "pascalName": "Callout",
    "kebabName": "callout",
    "chunkName": "components/callout",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Callout.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/Callout.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [
            {
              "name": "values",
              "text": "info, success, warning, danger"
            }
          ],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"info\""
        },
        {
          "name": "modelValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any",
          "default": "ref(false)"
        }
      ],
      "slots": [
        {
          "name": "summary",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "content",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [
        {
          "name": "update:modelValue",
          "type": "any[]",
          "signature": "(event: \"update:modelValue\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "CodeBlock": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/CodeBlock.vue",
    "pascalName": "CodeBlock",
    "kebabName": "code-block",
    "chunkName": "components/code-block",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/CodeBlock.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/CodeBlock.vue",
    "meta": {
      "props": [
        {
          "name": "label",
          "global": false,
          "description": "Label to display for the tab",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        },
        {
          "name": "active",
          "global": false,
          "description": "Select which tab should be active\nTODO: seems like it's not used",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "preview",
          "global": false,
          "description": "Preview block are bordered and have small padding.\nTODO: seems like it's not used",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "CodeGroup": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/CodeGroup.vue",
    "pascalName": "CodeGroup",
    "kebabName": "code-group",
    "chunkName": "components/code-group",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/CodeGroup.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/CodeGroup.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Container": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Container.vue",
    "pascalName": "Container",
    "kebabName": "container",
    "chunkName": "components/container",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Container.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/Container.vue",
    "meta": {
      "props": [
        {
          "name": "as",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "keyof HTMLElementTagNameMap | undefined",
          "schema": {
            "kind": "enum",
            "type": "keyof HTMLElementTagNameMap | undefined",
            "schema": [
              "undefined",
              "\"object\"",
              "\"map\"",
              "\"style\"",
              "\"label\"",
              "\"a\"",
              "\"abbr\"",
              "\"address\"",
              "\"area\"",
              "\"article\"",
              "\"aside\"",
              "\"audio\"",
              "\"b\"",
              "\"base\"",
              "\"bdi\"",
              "\"bdo\"",
              "\"blockquote\"",
              "\"body\"",
              "\"br\"",
              "\"button\"",
              "\"canvas\"",
              "\"caption\"",
              "\"cite\"",
              "\"code\"",
              "\"col\"",
              "\"colgroup\"",
              "\"data\"",
              "\"datalist\"",
              "\"dd\"",
              "\"del\"",
              "\"details\"",
              "\"dfn\"",
              "\"dialog\"",
              "\"div\"",
              "\"dl\"",
              "\"dt\"",
              "\"em\"",
              "\"embed\"",
              "\"fieldset\"",
              "\"figcaption\"",
              "\"figure\"",
              "\"footer\"",
              "\"form\"",
              "\"h1\"",
              "\"h2\"",
              "\"h3\"",
              "\"h4\"",
              "\"h5\"",
              "\"h6\"",
              "\"head\"",
              "\"header\"",
              "\"hgroup\"",
              "\"hr\"",
              "\"html\"",
              "\"i\"",
              "\"iframe\"",
              "\"img\"",
              "\"input\"",
              "\"ins\"",
              "\"kbd\"",
              "\"legend\"",
              "\"li\"",
              "\"link\"",
              "\"main\"",
              "\"mark\"",
              "\"menu\"",
              "\"meta\"",
              "\"meter\"",
              "\"nav\"",
              "\"noscript\"",
              "\"ol\"",
              "\"optgroup\"",
              "\"option\"",
              "\"output\"",
              "\"p\"",
              "\"picture\"",
              "\"pre\"",
              "\"progress\"",
              "\"q\"",
              "\"rp\"",
              "\"rt\"",
              "\"ruby\"",
              "\"s\"",
              "\"samp\"",
              "\"script\"",
              "\"section\"",
              "\"select\"",
              "\"slot\"",
              "\"small\"",
              "\"source\"",
              "\"span\"",
              "\"strong\"",
              "\"sub\"",
              "\"summary\"",
              "\"sup\"",
              "\"table\"",
              "\"tbody\"",
              "\"td\"",
              "\"template\"",
              "\"textarea\"",
              "\"tfoot\"",
              "\"th\"",
              "\"thead\"",
              "\"time\"",
              "\"title\"",
              "\"tr\"",
              "\"track\"",
              "\"u\"",
              "\"ul\"",
              "\"var\"",
              "\"video\"",
              "\"wbr\""
            ]
          },
          "default": "\"div\""
        },
        {
          "name": "padded",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | { dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; } | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | { dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; } | undefined",
            "schema": [
              "undefined",
              "false",
              "true",
              "{ dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; }"
            ]
          }
        },
        {
          "name": "fluid",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | { dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; } | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | { dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; } | undefined",
            "schema": [
              "undefined",
              "false",
              "true",
              "{ dark?: boolean | undefined; light?: boolean | undefined; initial?: boolean | undefined; }"
            ]
          }
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "CopyButton": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/CopyButton.vue",
    "pascalName": "CopyButton",
    "kebabName": "copy-button",
    "chunkName": "components/copy-button",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/CopyButton.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/CopyButton.vue",
    "meta": {
      "props": [
        {
          "name": "content",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "List": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/List.vue",
    "pascalName": "List",
    "kebabName": "list",
    "chunkName": "components/list",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/List.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/List.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtImg": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/NuxtImg.vue",
    "pascalName": "NuxtImg",
    "kebabName": "nuxt-img",
    "chunkName": "components/nuxt-img",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/NuxtImg.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/NuxtImg.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Props": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Props.vue",
    "pascalName": "Props",
    "kebabName": "props",
    "chunkName": "components/props",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Props.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/Props.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Sandbox": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Sandbox.vue",
    "pascalName": "Sandbox",
    "kebabName": "sandbox",
    "chunkName": "components/sandbox",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Sandbox.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/Sandbox.vue",
    "meta": {
      "props": [
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "repo",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "branch",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "dir",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "file",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"app.vue\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "TabsHeader": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/TabsHeader.vue",
    "pascalName": "TabsHeader",
    "kebabName": "tabs-header",
    "chunkName": "components/tabs-header",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/TabsHeader.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/TabsHeader.vue",
    "meta": {
      "props": [
        {
          "name": "tabs",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "{ label: string; }[]",
          "schema": {
            "kind": "array",
            "type": "{ label: string; }[]",
            "schema": [
              {
                "kind": "object",
                "type": "{ label: string; }",
                "schema": {
                  "label": {
                    "name": "label",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": true,
                    "type": "string",
                    "schema": "string"
                  }
                }
              }
            ]
          }
        },
        {
          "name": "activeTabIndex",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "number",
          "schema": "number"
        }
      ],
      "slots": [
        {
          "name": "footer",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [
        {
          "name": "update:activeTabIndex",
          "type": "any[]",
          "signature": "(event: \"update:activeTabIndex\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "Terminal": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Terminal.vue",
    "pascalName": "Terminal",
    "kebabName": "terminal",
    "chunkName": "components/terminal",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Terminal.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/Terminal.vue",
    "meta": {
      "props": [
        {
          "name": "content",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string | string[]",
          "schema": {
            "kind": "enum",
            "type": "string | string[]",
            "schema": [
              "string",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "VideoPlayer": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/VideoPlayer.vue",
    "pascalName": "VideoPlayer",
    "kebabName": "video-player",
    "chunkName": "components/video-player",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/VideoPlayer.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/globals/VideoPlayer.vue",
    "meta": {
      "props": [
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "poster",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "sources",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "any[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "any[]",
                "schema": [
                  "any"
                ]
              }
            ]
          },
          "default": "[]"
        },
        {
          "name": "autoplay",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconCodeSandBox": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconCodeSandBox.vue",
    "pascalName": "IconCodeSandBox",
    "kebabName": "icon-code-sand-box",
    "chunkName": "components/icon-code-sand-box",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconCodeSandBox.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/icons/IconCodeSandBox.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconDocus": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconDocus.vue",
    "pascalName": "IconDocus",
    "kebabName": "icon-docus",
    "chunkName": "components/icon-docus",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconDocus.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/icons/IconDocus.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconNuxt": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconNuxt.vue",
    "pascalName": "IconNuxt",
    "kebabName": "icon-nuxt",
    "chunkName": "components/icon-nuxt",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconNuxt.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/icons/IconNuxt.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconNuxtContent": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconNuxtContent.vue",
    "pascalName": "IconNuxtContent",
    "kebabName": "icon-nuxt-content",
    "chunkName": "components/icon-nuxt-content",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconNuxtContent.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/icons/IconNuxtContent.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconNuxtLabs": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconNuxtLabs.vue",
    "pascalName": "IconNuxtLabs",
    "kebabName": "icon-nuxt-labs",
    "chunkName": "components/icon-nuxt-labs",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconNuxtLabs.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/icons/IconNuxtLabs.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconNuxtStudio": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconNuxtStudio.vue",
    "pascalName": "IconNuxtStudio",
    "kebabName": "icon-nuxt-studio",
    "chunkName": "components/icon-nuxt-studio",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconNuxtStudio.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/icons/IconNuxtStudio.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconStackBlitz": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconStackBlitz.vue",
    "pascalName": "IconStackBlitz",
    "kebabName": "icon-stack-blitz",
    "chunkName": "components/icon-stack-blitz",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconStackBlitz.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/icons/IconStackBlitz.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconVueTelescope": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconVueTelescope.vue",
    "pascalName": "IconVueTelescope",
    "kebabName": "icon-vue-telescope",
    "chunkName": "components/icon-vue-telescope",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconVueTelescope.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/icons/IconVueTelescope.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "BlockHero": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/landing/BlockHero.vue",
    "pascalName": "BlockHero",
    "kebabName": "block-hero",
    "chunkName": "components/block-hero",
    "shortPath": "node_modules/@nuxt-themes/elements/components/landing/BlockHero.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/landing/BlockHero.vue",
    "meta": {
      "props": [
        {
          "name": "cta",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          },
          "default": "[]"
        },
        {
          "name": "secondary",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          },
          "default": "[]"
        },
        {
          "name": "video",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "snippet",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | string[] | undefined",
            "schema": [
              "undefined",
              "string",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          },
          "default": "\"\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Card": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/landing/Card.vue",
    "pascalName": "Card",
    "kebabName": "card",
    "chunkName": "components/card",
    "shortPath": "node_modules/@nuxt-themes/elements/components/landing/Card.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/landing/Card.vue",
    "meta": {
      "props": [
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "CardGrid": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/landing/CardGrid.vue",
    "pascalName": "CardGrid",
    "kebabName": "card-grid",
    "chunkName": "components/card-grid",
    "shortPath": "node_modules/@nuxt-themes/elements/components/landing/CardGrid.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/landing/CardGrid.vue",
    "meta": {
      "props": [
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Features\""
        }
      ],
      "slots": [
        {
          "name": "root",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "VoltaBoard": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/volta/VoltaBoard.vue",
    "pascalName": "VoltaBoard",
    "kebabName": "volta-board",
    "chunkName": "components/volta-board",
    "shortPath": "node_modules/@nuxt-themes/elements/components/volta/VoltaBoard.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/volta/VoltaBoard.vue",
    "meta": {
      "props": [
        {
          "name": "token",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ComponentPlayground": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlayground.vue",
    "pascalName": "ComponentPlayground",
    "kebabName": "component-playground",
    "chunkName": "components/component-playground",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlayground.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/meta/ComponentPlayground.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ComponentPlaygroundData": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundData.vue",
    "pascalName": "ComponentPlaygroundData",
    "kebabName": "component-playground-data",
    "chunkName": "components/component-playground-data",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundData.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundData.vue",
    "meta": {
      "props": [
        {
          "name": "modelValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          },
          "default": "{}"
        },
        {
          "name": "componentData",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          },
          "default": "{}"
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "update:modelValue",
          "type": "any[]",
          "signature": "(event: \"update:modelValue\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "ComponentPlaygroundProps": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundProps.vue",
    "pascalName": "ComponentPlaygroundProps",
    "kebabName": "component-playground-props",
    "chunkName": "components/component-playground-props",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundProps.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundProps.vue",
    "meta": {
      "props": [
        {
          "name": "modelValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        },
        {
          "name": "componentData",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "update:modelValue",
          "type": "any[]",
          "signature": "(event: \"update:modelValue\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "ComponentPlaygroundSlots": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundSlots.vue",
    "pascalName": "ComponentPlaygroundSlots",
    "kebabName": "component-playground-slots",
    "chunkName": "components/component-playground-slots",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundSlots.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundSlots.vue",
    "meta": {
      "props": [
        {
          "name": "componentData",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ComponentPlaygroundTokens": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundTokens.vue",
    "pascalName": "ComponentPlaygroundTokens",
    "kebabName": "component-playground-tokens",
    "chunkName": "components/component-playground-tokens",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundTokens.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundTokens.vue",
    "meta": {
      "props": [
        {
          "name": "componentData",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "PreviewLayout": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/PreviewLayout.vue",
    "pascalName": "PreviewLayout",
    "kebabName": "preview-layout",
    "chunkName": "components/preview-layout",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/PreviewLayout.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/meta/PreviewLayout.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "TokensPlayground": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/TokensPlayground.vue",
    "pascalName": "TokensPlayground",
    "kebabName": "tokens-playground",
    "chunkName": "components/tokens-playground",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/TokensPlayground.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt-themes/elements/components/meta/TokensPlayground.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentDoc": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "pascalName": "ContentDoc",
    "kebabName": "content-doc",
    "chunkName": "components/content-doc",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "meta": {
      "props": [
        {
          "name": "tag",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"div\""
        },
        {
          "name": "excerpt",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "path",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "void 0"
        },
        {
          "name": "query",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "QueryBuilderParams | undefined",
          "schema": {
            "kind": "enum",
            "type": "QueryBuilderParams | undefined",
            "schema": [
              "undefined",
              {
                "kind": "object",
                "type": "QueryBuilderParams",
                "schema": {
                  "first": {
                    "name": "first",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "boolean | undefined",
                      "schema": [
                        "undefined",
                        "false",
                        "true"
                      ]
                    }
                  },
                  "skip": {
                    "name": "skip",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "number | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "number | undefined",
                      "schema": [
                        "undefined",
                        "number"
                      ]
                    }
                  },
                  "limit": {
                    "name": "limit",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "number | undefined",
                    "schema": "number | undefined"
                  },
                  "only": {
                    "name": "only",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "string[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "string[]",
                          "schema": [
                            "string"
                          ]
                        }
                      ]
                    }
                  },
                  "without": {
                    "name": "without",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string[] | undefined",
                    "schema": "string[] | undefined"
                  },
                  "sort": {
                    "name": "sort",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "SortOptions[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "SortOptions[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "SortOptions[]",
                          "schema": [
                            {
                              "kind": "enum",
                              "type": "SortOptions",
                              "schema": [
                                {
                                  "kind": "object",
                                  "type": "SortParams",
                                  "schema": {
                                    "$locale": {
                                      "name": "$locale",
                                      "global": false,
                                      "description": "Locale specifier for sorting\nA string with a BCP 47 language tag",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "undefined"
                                        }
                                      ],
                                      "required": false,
                                      "type": "string | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "string | undefined",
                                        "schema": [
                                          "undefined",
                                          "string"
                                        ]
                                      }
                                    },
                                    "$numeric": {
                                      "name": "$numeric",
                                      "global": false,
                                      "description": "Whether numeric collation should be used, such that \"1\" < \"2\" < \"10\".\nPossible values are `true` and `false`;",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "false"
                                        }
                                      ],
                                      "required": false,
                                      "type": "boolean | undefined",
                                      "schema": "boolean | undefined"
                                    },
                                    "$caseFirst": {
                                      "name": "$caseFirst",
                                      "global": false,
                                      "description": "Whether upper case or lower case should sort first.\nPossible values are `\"upper\"`, `\"lower\"`, or `\"false\"`",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "\"depends on locale\""
                                        }
                                      ],
                                      "required": false,
                                      "type": "\"upper\" | \"lower\" | \"false\" | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "\"upper\" | \"lower\" | \"false\" | undefined",
                                        "schema": [
                                          "undefined",
                                          "\"upper\"",
                                          "\"lower\"",
                                          "\"false\""
                                        ]
                                      }
                                    },
                                    "$sensitivity": {
                                      "name": "$sensitivity",
                                      "global": false,
                                      "description": "Which differences in the strings should lead to non-zero result values. Possible values are:\n - \"base\": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.\n - \"accent\": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.\n - \"case\": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.\n - \"variant\": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "\"variant\""
                                        }
                                      ],
                                      "required": false,
                                      "type": "\"base\" | \"accent\" | \"case\" | \"variant\" | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "\"base\" | \"accent\" | \"case\" | \"variant\" | undefined",
                                        "schema": [
                                          "undefined",
                                          "\"base\"",
                                          "\"accent\"",
                                          "\"case\"",
                                          "\"variant\""
                                        ]
                                      }
                                    }
                                  }
                                },
                                {
                                  "kind": "object",
                                  "type": "SortFields",
                                  "schema": {}
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "where": {
                    "name": "where",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "QueryBuilderWhere[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "QueryBuilderWhere[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "QueryBuilderWhere[]",
                          "schema": [
                            {
                              "kind": "object",
                              "type": "QueryBuilderWhere",
                              "schema": {
                                "$and": {
                                  "name": "$and",
                                  "global": false,
                                  "description": "Match only if all of nested conditions are true",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n $and: [\n   { score: { $gte: 5 } },\n   { score: { $lte: 10 } }\n ]\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "QueryBuilderWhere[] | undefined",
                                  "schema": "QueryBuilderWhere[] | undefined"
                                },
                                "$or": {
                                  "name": "$or",
                                  "global": false,
                                  "description": "Match if any of nested conditions is true",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n $or: [\n   { score: { $gt: 5 } },\n   { score: { $lt: 3 } }\n ]\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "QueryBuilderWhere[] | undefined",
                                  "schema": "QueryBuilderWhere[] | undefined"
                                },
                                "$not": {
                                  "name": "$not",
                                  "global": false,
                                  "description": "Match is condition is false",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $not: 'Hello World'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      {
                                        "kind": "object",
                                        "type": "RegExp",
                                        "schema": {
                                          "exec": {
                                            "name": "exec",
                                            "global": false,
                                            "description": "Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string The String object or string literal on which to perform the search."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => RegExpExecArray | null",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): RegExpExecArray | null",
                                              "schema": []
                                            }
                                          },
                                          "test": {
                                            "name": "test",
                                            "global": false,
                                            "description": "Returns a Boolean value that indicates whether or not a pattern exists in a searched string.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string String on which to perform the search."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => boolean",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): boolean",
                                              "schema": []
                                            }
                                          },
                                          "source": {
                                            "name": "source",
                                            "global": false,
                                            "description": "Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal.",
                                            "tags": [],
                                            "required": true,
                                            "type": "string",
                                            "schema": "string"
                                          },
                                          "global": {
                                            "name": "global",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": {
                                              "kind": "enum",
                                              "type": "boolean",
                                              "schema": [
                                                "false",
                                                "true"
                                              ]
                                            }
                                          },
                                          "ignoreCase": {
                                            "name": "ignoreCase",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "multiline": {
                                            "name": "multiline",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "lastIndex": {
                                            "name": "lastIndex",
                                            "global": false,
                                            "description": "",
                                            "tags": [],
                                            "required": true,
                                            "type": "number",
                                            "schema": "number"
                                          },
                                          "compile": {
                                            "name": "compile",
                                            "global": false,
                                            "description": "",
                                            "tags": [
                                              {
                                                "name": "deprecated",
                                                "text": "A legacy feature for browser compatibility"
                                              }
                                            ],
                                            "required": true,
                                            "type": "(pattern: string, flags?: string | undefined) => RegExp",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(pattern: string, flags?: string | undefined): RegExp",
                                              "schema": []
                                            }
                                          },
                                          "flags": {
                                            "name": "flags",
                                            "global": false,
                                            "description": "Returns a string indicating the flags of the regular expression in question. This field is read-only.\nThe characters in this string are sequenced and concatenated in the following order:\n\n   - \"g\" for global\n   - \"i\" for ignoreCase\n   - \"m\" for multiline\n   - \"u\" for unicode\n   - \"y\" for sticky\n\nIf no flags are set, the value is the empty string.",
                                            "tags": [],
                                            "required": true,
                                            "type": "string",
                                            "schema": "string"
                                          },
                                          "sticky": {
                                            "name": "sticky",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the sticky flag (y) used with a regular\nexpression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "unicode": {
                                            "name": "unicode",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular\nexpression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "dotAll": {
                                            "name": "dotAll",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression.\nDefault is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "hasIndices": {
                                            "name": "hasIndices",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the hasIndices flag (d) used with with a regular expression.\nDefault is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "__@match@9959": {
                                            "name": "__@match@9959",
                                            "global": false,
                                            "description": "Matches a string with this regular expression, and returns an array containing the results of\nthat search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => RegExpMatchArray | null",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): RegExpMatchArray | null",
                                              "schema": []
                                            }
                                          },
                                          "__@replace@9961": {
                                            "name": "__@replace@9961",
                                            "global": false,
                                            "description": "Replaces text in a string, using this regular expression.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                              },
                                              {
                                                "name": "param",
                                                "text": "replaceValue A String object or string literal containing the text to replace for every\nsuccessful match of this regular expression."
                                              },
                                              {
                                                "name": "param",
                                                "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                              },
                                              {
                                                "name": "param",
                                                "text": "replacer A function that returns the replacement text."
                                              }
                                            ],
                                            "required": true,
                                            "type": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }",
                                            "schema": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }"
                                          },
                                          "__@search@9964": {
                                            "name": "__@search@9964",
                                            "global": false,
                                            "description": "Finds the position beginning first substring match in a regular expression search\nusing this regular expression.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string The string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => number",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): number",
                                              "schema": []
                                            }
                                          },
                                          "__@split@9966": {
                                            "name": "__@split@9966",
                                            "global": false,
                                            "description": "Returns an array of substrings that were delimited by strings in the original input that\nmatch against this regular expression.\n\nIf the regular expression contains capturing parentheses, then each time this\nregular expression matches, the results (including any undefined results) of the\ncapturing parentheses are spliced.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string string value to split"
                                              },
                                              {
                                                "name": "param",
                                                "text": "limit if not undefined, the output array is truncated so that it contains no more\nthan 'limit' elements."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string, limit?: number | undefined) => string[]",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string, limit?: number | undefined): string[]",
                                              "schema": []
                                            }
                                          },
                                          "__@matchAll@9968": {
                                            "name": "__@matchAll@9968",
                                            "global": false,
                                            "description": "Matches a string with this regular expression, and returns an iterable of matches\ncontaining the results of that search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(str: string) => IterableIterator<RegExpMatchArray>",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(str: string): IterableIterator<RegExpMatchArray>",
                                              "schema": []
                                            }
                                          }
                                        }
                                      },
                                      "QueryBuilderWhere"
                                    ]
                                  }
                                },
                                "$eq": {
                                  "name": "$eq",
                                  "global": false,
                                  "description": "Match if item equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $eq: 'Hello World'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | RegExp | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      "RegExp"
                                    ]
                                  }
                                },
                                "$ne": {
                                  "name": "$ne",
                                  "global": false,
                                  "description": "Match if item not equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $ne: 100\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | undefined",
                                  "schema": "string | number | boolean | RegExp | undefined"
                                },
                                "$gt": {
                                  "name": "$gt",
                                  "global": false,
                                  "description": "Check if item is greater than condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $gt: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$gte": {
                                  "name": "$gte",
                                  "global": false,
                                  "description": "Check if item is greater than or equal to condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $gte: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$lt": {
                                  "name": "$lt",
                                  "global": false,
                                  "description": "Check if item is less than condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $lt: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$lte": {
                                  "name": "$lte",
                                  "global": false,
                                  "description": "Check if item is less than or equal to condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $lte: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$regex": {
                                  "name": "$regex",
                                  "global": false,
                                  "description": "Provides regular expression capabilities for pattern matching strings.",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $regex: /^foo/\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | RegExp | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | RegExp | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "RegExp"
                                    ]
                                  }
                                },
                                "$type": {
                                  "name": "$type",
                                  "global": false,
                                  "description": "Match if type of item equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n field: {\n   $type: 'boolean'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | undefined",
                                  "schema": "string | undefined"
                                },
                                "$exists": {
                                  "name": "$exists",
                                  "global": false,
                                  "description": "Check key existence",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n tag: {\n   $exists: false\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "boolean | undefined",
                                  "schema": "boolean | undefined"
                                },
                                "$contains": {
                                  "name": "$contains",
                                  "global": false,
                                  "description": "Match if item contains every condition or math every rule in condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $contains: ['Hello', 'World']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | (string | number | boolean)[] | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | (string | number | boolean)[] | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      {
                                        "kind": "array",
                                        "type": "(string | number | boolean)[]",
                                        "schema": [
                                          {
                                            "kind": "enum",
                                            "type": "string | number | boolean",
                                            "schema": [
                                              "string",
                                              "number",
                                              "false",
                                              "true"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                },
                                "$containsAny": {
                                  "name": "$containsAny",
                                  "global": false,
                                  "description": "Match if item contains at least one rule from condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $containsAny: ['Hello', 'World']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "(string | number | boolean)[] | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "(string | number | boolean)[] | undefined",
                                    "schema": [
                                      "undefined",
                                      "(string | number | boolean)[]"
                                    ]
                                  }
                                },
                                "$icontains": {
                                  "name": "$icontains",
                                  "global": false,
                                  "description": "Ignore case contains",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $icontains: 'hello world'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | undefined",
                                  "schema": "string | undefined"
                                },
                                "$in": {
                                  "name": "$in",
                                  "global": false,
                                  "description": "Match if item is in condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n category: {\n   $in: ['sport', 'nature', 'travel']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "(string | number | boolean)[] | undefined",
                                  "schema": "(string | number | boolean)[] | undefined"
                                },
                                "title": {
                                  "name": "title",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_id": {
                                  "name": "_id",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_source": {
                                  "name": "_source",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_path": {
                                  "name": "_path",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_draft": {
                                  "name": "_draft",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_partial": {
                                  "name": "_partial",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_locale": {
                                  "name": "_locale",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_type": {
                                  "name": "_type",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_file": {
                                  "name": "_file",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_extension": {
                                  "name": "_extension",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "surround": {
                    "name": "surround",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; } | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; } | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "object",
                          "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; }",
                          "schema": {
                            "query": {
                              "name": "query",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": true,
                              "type": "string | QueryBuilderWhere",
                              "schema": {
                                "kind": "enum",
                                "type": "string | QueryBuilderWhere",
                                "schema": [
                                  "string",
                                  "QueryBuilderWhere"
                                ]
                              }
                            },
                            "before": {
                              "name": "before",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "number | undefined",
                              "schema": "number | undefined"
                            },
                            "after": {
                              "name": "after",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "number | undefined",
                              "schema": "number | undefined"
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ]
          },
          "default": "void 0"
        },
        {
          "name": "head",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "true"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentList": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "pascalName": "ContentList",
    "kebabName": "content-list",
    "chunkName": "components/content-list",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "meta": {
      "props": [
        {
          "name": "path",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "void 0"
        },
        {
          "name": "query",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "QueryBuilderParams | undefined",
          "schema": {
            "kind": "enum",
            "type": "QueryBuilderParams | undefined",
            "schema": [
              "undefined",
              {
                "kind": "object",
                "type": "QueryBuilderParams",
                "schema": {
                  "first": {
                    "name": "first",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "boolean | undefined",
                      "schema": [
                        "undefined",
                        "false",
                        "true"
                      ]
                    }
                  },
                  "skip": {
                    "name": "skip",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "number | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "number | undefined",
                      "schema": [
                        "undefined",
                        "number"
                      ]
                    }
                  },
                  "limit": {
                    "name": "limit",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "number | undefined",
                    "schema": "number | undefined"
                  },
                  "only": {
                    "name": "only",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "string[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "string[]",
                          "schema": [
                            "string"
                          ]
                        }
                      ]
                    }
                  },
                  "without": {
                    "name": "without",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string[] | undefined",
                    "schema": "string[] | undefined"
                  },
                  "sort": {
                    "name": "sort",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "SortOptions[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "SortOptions[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "SortOptions[]",
                          "schema": [
                            {
                              "kind": "enum",
                              "type": "SortOptions",
                              "schema": [
                                {
                                  "kind": "object",
                                  "type": "SortParams",
                                  "schema": {
                                    "$locale": {
                                      "name": "$locale",
                                      "global": false,
                                      "description": "Locale specifier for sorting\nA string with a BCP 47 language tag",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "undefined"
                                        }
                                      ],
                                      "required": false,
                                      "type": "string | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "string | undefined",
                                        "schema": [
                                          "undefined",
                                          "string"
                                        ]
                                      }
                                    },
                                    "$numeric": {
                                      "name": "$numeric",
                                      "global": false,
                                      "description": "Whether numeric collation should be used, such that \"1\" < \"2\" < \"10\".\nPossible values are `true` and `false`;",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "false"
                                        }
                                      ],
                                      "required": false,
                                      "type": "boolean | undefined",
                                      "schema": "boolean | undefined"
                                    },
                                    "$caseFirst": {
                                      "name": "$caseFirst",
                                      "global": false,
                                      "description": "Whether upper case or lower case should sort first.\nPossible values are `\"upper\"`, `\"lower\"`, or `\"false\"`",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "\"depends on locale\""
                                        }
                                      ],
                                      "required": false,
                                      "type": "\"upper\" | \"lower\" | \"false\" | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "\"upper\" | \"lower\" | \"false\" | undefined",
                                        "schema": [
                                          "undefined",
                                          "\"upper\"",
                                          "\"lower\"",
                                          "\"false\""
                                        ]
                                      }
                                    },
                                    "$sensitivity": {
                                      "name": "$sensitivity",
                                      "global": false,
                                      "description": "Which differences in the strings should lead to non-zero result values. Possible values are:\n - \"base\": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.\n - \"accent\": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.\n - \"case\": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.\n - \"variant\": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "\"variant\""
                                        }
                                      ],
                                      "required": false,
                                      "type": "\"base\" | \"accent\" | \"case\" | \"variant\" | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "\"base\" | \"accent\" | \"case\" | \"variant\" | undefined",
                                        "schema": [
                                          "undefined",
                                          "\"base\"",
                                          "\"accent\"",
                                          "\"case\"",
                                          "\"variant\""
                                        ]
                                      }
                                    }
                                  }
                                },
                                {
                                  "kind": "object",
                                  "type": "SortFields",
                                  "schema": {}
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "where": {
                    "name": "where",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "QueryBuilderWhere[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "QueryBuilderWhere[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "QueryBuilderWhere[]",
                          "schema": [
                            {
                              "kind": "object",
                              "type": "QueryBuilderWhere",
                              "schema": {
                                "$and": {
                                  "name": "$and",
                                  "global": false,
                                  "description": "Match only if all of nested conditions are true",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n $and: [\n   { score: { $gte: 5 } },\n   { score: { $lte: 10 } }\n ]\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "QueryBuilderWhere[] | undefined",
                                  "schema": "QueryBuilderWhere[] | undefined"
                                },
                                "$or": {
                                  "name": "$or",
                                  "global": false,
                                  "description": "Match if any of nested conditions is true",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n $or: [\n   { score: { $gt: 5 } },\n   { score: { $lt: 3 } }\n ]\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "QueryBuilderWhere[] | undefined",
                                  "schema": "QueryBuilderWhere[] | undefined"
                                },
                                "$not": {
                                  "name": "$not",
                                  "global": false,
                                  "description": "Match is condition is false",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $not: 'Hello World'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      {
                                        "kind": "object",
                                        "type": "RegExp",
                                        "schema": {
                                          "exec": {
                                            "name": "exec",
                                            "global": false,
                                            "description": "Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string The String object or string literal on which to perform the search."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => RegExpExecArray | null",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): RegExpExecArray | null",
                                              "schema": []
                                            }
                                          },
                                          "test": {
                                            "name": "test",
                                            "global": false,
                                            "description": "Returns a Boolean value that indicates whether or not a pattern exists in a searched string.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string String on which to perform the search."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => boolean",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): boolean",
                                              "schema": []
                                            }
                                          },
                                          "source": {
                                            "name": "source",
                                            "global": false,
                                            "description": "Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal.",
                                            "tags": [],
                                            "required": true,
                                            "type": "string",
                                            "schema": "string"
                                          },
                                          "global": {
                                            "name": "global",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": {
                                              "kind": "enum",
                                              "type": "boolean",
                                              "schema": [
                                                "false",
                                                "true"
                                              ]
                                            }
                                          },
                                          "ignoreCase": {
                                            "name": "ignoreCase",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "multiline": {
                                            "name": "multiline",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "lastIndex": {
                                            "name": "lastIndex",
                                            "global": false,
                                            "description": "",
                                            "tags": [],
                                            "required": true,
                                            "type": "number",
                                            "schema": "number"
                                          },
                                          "compile": {
                                            "name": "compile",
                                            "global": false,
                                            "description": "",
                                            "tags": [
                                              {
                                                "name": "deprecated",
                                                "text": "A legacy feature for browser compatibility"
                                              }
                                            ],
                                            "required": true,
                                            "type": "(pattern: string, flags?: string | undefined) => RegExp",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(pattern: string, flags?: string | undefined): RegExp",
                                              "schema": []
                                            }
                                          },
                                          "flags": {
                                            "name": "flags",
                                            "global": false,
                                            "description": "Returns a string indicating the flags of the regular expression in question. This field is read-only.\nThe characters in this string are sequenced and concatenated in the following order:\n\n   - \"g\" for global\n   - \"i\" for ignoreCase\n   - \"m\" for multiline\n   - \"u\" for unicode\n   - \"y\" for sticky\n\nIf no flags are set, the value is the empty string.",
                                            "tags": [],
                                            "required": true,
                                            "type": "string",
                                            "schema": "string"
                                          },
                                          "sticky": {
                                            "name": "sticky",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the sticky flag (y) used with a regular\nexpression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "unicode": {
                                            "name": "unicode",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular\nexpression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "dotAll": {
                                            "name": "dotAll",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression.\nDefault is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "hasIndices": {
                                            "name": "hasIndices",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the hasIndices flag (d) used with with a regular expression.\nDefault is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "__@match@9959": {
                                            "name": "__@match@9959",
                                            "global": false,
                                            "description": "Matches a string with this regular expression, and returns an array containing the results of\nthat search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => RegExpMatchArray | null",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): RegExpMatchArray | null",
                                              "schema": []
                                            }
                                          },
                                          "__@replace@9961": {
                                            "name": "__@replace@9961",
                                            "global": false,
                                            "description": "Replaces text in a string, using this regular expression.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                              },
                                              {
                                                "name": "param",
                                                "text": "replaceValue A String object or string literal containing the text to replace for every\nsuccessful match of this regular expression."
                                              },
                                              {
                                                "name": "param",
                                                "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                              },
                                              {
                                                "name": "param",
                                                "text": "replacer A function that returns the replacement text."
                                              }
                                            ],
                                            "required": true,
                                            "type": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }",
                                            "schema": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }"
                                          },
                                          "__@search@9964": {
                                            "name": "__@search@9964",
                                            "global": false,
                                            "description": "Finds the position beginning first substring match in a regular expression search\nusing this regular expression.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string The string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => number",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): number",
                                              "schema": []
                                            }
                                          },
                                          "__@split@9966": {
                                            "name": "__@split@9966",
                                            "global": false,
                                            "description": "Returns an array of substrings that were delimited by strings in the original input that\nmatch against this regular expression.\n\nIf the regular expression contains capturing parentheses, then each time this\nregular expression matches, the results (including any undefined results) of the\ncapturing parentheses are spliced.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string string value to split"
                                              },
                                              {
                                                "name": "param",
                                                "text": "limit if not undefined, the output array is truncated so that it contains no more\nthan 'limit' elements."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string, limit?: number | undefined) => string[]",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string, limit?: number | undefined): string[]",
                                              "schema": []
                                            }
                                          },
                                          "__@matchAll@9968": {
                                            "name": "__@matchAll@9968",
                                            "global": false,
                                            "description": "Matches a string with this regular expression, and returns an iterable of matches\ncontaining the results of that search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(str: string) => IterableIterator<RegExpMatchArray>",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(str: string): IterableIterator<RegExpMatchArray>",
                                              "schema": []
                                            }
                                          }
                                        }
                                      },
                                      "QueryBuilderWhere"
                                    ]
                                  }
                                },
                                "$eq": {
                                  "name": "$eq",
                                  "global": false,
                                  "description": "Match if item equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $eq: 'Hello World'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | RegExp | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      "RegExp"
                                    ]
                                  }
                                },
                                "$ne": {
                                  "name": "$ne",
                                  "global": false,
                                  "description": "Match if item not equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $ne: 100\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | undefined",
                                  "schema": "string | number | boolean | RegExp | undefined"
                                },
                                "$gt": {
                                  "name": "$gt",
                                  "global": false,
                                  "description": "Check if item is greater than condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $gt: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$gte": {
                                  "name": "$gte",
                                  "global": false,
                                  "description": "Check if item is greater than or equal to condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $gte: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$lt": {
                                  "name": "$lt",
                                  "global": false,
                                  "description": "Check if item is less than condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $lt: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$lte": {
                                  "name": "$lte",
                                  "global": false,
                                  "description": "Check if item is less than or equal to condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $lte: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$regex": {
                                  "name": "$regex",
                                  "global": false,
                                  "description": "Provides regular expression capabilities for pattern matching strings.",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $regex: /^foo/\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | RegExp | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | RegExp | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "RegExp"
                                    ]
                                  }
                                },
                                "$type": {
                                  "name": "$type",
                                  "global": false,
                                  "description": "Match if type of item equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n field: {\n   $type: 'boolean'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | undefined",
                                  "schema": "string | undefined"
                                },
                                "$exists": {
                                  "name": "$exists",
                                  "global": false,
                                  "description": "Check key existence",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n tag: {\n   $exists: false\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "boolean | undefined",
                                  "schema": "boolean | undefined"
                                },
                                "$contains": {
                                  "name": "$contains",
                                  "global": false,
                                  "description": "Match if item contains every condition or math every rule in condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $contains: ['Hello', 'World']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | (string | number | boolean)[] | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | (string | number | boolean)[] | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      {
                                        "kind": "array",
                                        "type": "(string | number | boolean)[]",
                                        "schema": [
                                          {
                                            "kind": "enum",
                                            "type": "string | number | boolean",
                                            "schema": [
                                              "string",
                                              "number",
                                              "false",
                                              "true"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                },
                                "$containsAny": {
                                  "name": "$containsAny",
                                  "global": false,
                                  "description": "Match if item contains at least one rule from condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $containsAny: ['Hello', 'World']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "(string | number | boolean)[] | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "(string | number | boolean)[] | undefined",
                                    "schema": [
                                      "undefined",
                                      "(string | number | boolean)[]"
                                    ]
                                  }
                                },
                                "$icontains": {
                                  "name": "$icontains",
                                  "global": false,
                                  "description": "Ignore case contains",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $icontains: 'hello world'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | undefined",
                                  "schema": "string | undefined"
                                },
                                "$in": {
                                  "name": "$in",
                                  "global": false,
                                  "description": "Match if item is in condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n category: {\n   $in: ['sport', 'nature', 'travel']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "(string | number | boolean)[] | undefined",
                                  "schema": "(string | number | boolean)[] | undefined"
                                },
                                "title": {
                                  "name": "title",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_id": {
                                  "name": "_id",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_source": {
                                  "name": "_source",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_path": {
                                  "name": "_path",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_draft": {
                                  "name": "_draft",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_partial": {
                                  "name": "_partial",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_locale": {
                                  "name": "_locale",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_type": {
                                  "name": "_type",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_file": {
                                  "name": "_file",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_extension": {
                                  "name": "_extension",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "surround": {
                    "name": "surround",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; } | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; } | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "object",
                          "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; }",
                          "schema": {
                            "query": {
                              "name": "query",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": true,
                              "type": "string | QueryBuilderWhere",
                              "schema": {
                                "kind": "enum",
                                "type": "string | QueryBuilderWhere",
                                "schema": [
                                  "string",
                                  "QueryBuilderWhere"
                                ]
                              }
                            },
                            "before": {
                              "name": "before",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "number | undefined",
                              "schema": "number | undefined"
                            },
                            "after": {
                              "name": "after",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "number | undefined",
                              "schema": "number | undefined"
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ]
          },
          "default": "void 0"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentNavigation": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "pascalName": "ContentNavigation",
    "kebabName": "content-navigation",
    "chunkName": "components/content-navigation",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "meta": {
      "props": [
        {
          "name": "query",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "QueryBuilderParams | QueryBuilder<ParsedContentMeta> | undefined",
          "schema": {
            "kind": "enum",
            "type": "QueryBuilderParams | QueryBuilder<ParsedContentMeta> | undefined",
            "schema": [
              "undefined",
              {
                "kind": "object",
                "type": "QueryBuilderParams",
                "schema": {
                  "first": {
                    "name": "first",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "boolean | undefined",
                      "schema": [
                        "undefined",
                        "false",
                        "true"
                      ]
                    }
                  },
                  "skip": {
                    "name": "skip",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "number | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "number | undefined",
                      "schema": [
                        "undefined",
                        "number"
                      ]
                    }
                  },
                  "limit": {
                    "name": "limit",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "number | undefined",
                    "schema": "number | undefined"
                  },
                  "only": {
                    "name": "only",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "string[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "string[]",
                          "schema": [
                            "string"
                          ]
                        }
                      ]
                    }
                  },
                  "without": {
                    "name": "without",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string[] | undefined",
                    "schema": "string[] | undefined"
                  },
                  "sort": {
                    "name": "sort",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "SortOptions[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "SortOptions[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "SortOptions[]",
                          "schema": [
                            {
                              "kind": "enum",
                              "type": "SortOptions",
                              "schema": [
                                {
                                  "kind": "object",
                                  "type": "SortParams",
                                  "schema": {
                                    "$locale": {
                                      "name": "$locale",
                                      "global": false,
                                      "description": "Locale specifier for sorting\nA string with a BCP 47 language tag",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "undefined"
                                        }
                                      ],
                                      "required": false,
                                      "type": "string | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "string | undefined",
                                        "schema": [
                                          "undefined",
                                          "string"
                                        ]
                                      }
                                    },
                                    "$numeric": {
                                      "name": "$numeric",
                                      "global": false,
                                      "description": "Whether numeric collation should be used, such that \"1\" < \"2\" < \"10\".\nPossible values are `true` and `false`;",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "false"
                                        }
                                      ],
                                      "required": false,
                                      "type": "boolean | undefined",
                                      "schema": "boolean | undefined"
                                    },
                                    "$caseFirst": {
                                      "name": "$caseFirst",
                                      "global": false,
                                      "description": "Whether upper case or lower case should sort first.\nPossible values are `\"upper\"`, `\"lower\"`, or `\"false\"`",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "\"depends on locale\""
                                        }
                                      ],
                                      "required": false,
                                      "type": "\"upper\" | \"lower\" | \"false\" | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "\"upper\" | \"lower\" | \"false\" | undefined",
                                        "schema": [
                                          "undefined",
                                          "\"upper\"",
                                          "\"lower\"",
                                          "\"false\""
                                        ]
                                      }
                                    },
                                    "$sensitivity": {
                                      "name": "$sensitivity",
                                      "global": false,
                                      "description": "Which differences in the strings should lead to non-zero result values. Possible values are:\n - \"base\": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.\n - \"accent\": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.\n - \"case\": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.\n - \"variant\": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.",
                                      "tags": [
                                        {
                                          "name": "default",
                                          "text": "\"variant\""
                                        }
                                      ],
                                      "required": false,
                                      "type": "\"base\" | \"accent\" | \"case\" | \"variant\" | undefined",
                                      "schema": {
                                        "kind": "enum",
                                        "type": "\"base\" | \"accent\" | \"case\" | \"variant\" | undefined",
                                        "schema": [
                                          "undefined",
                                          "\"base\"",
                                          "\"accent\"",
                                          "\"case\"",
                                          "\"variant\""
                                        ]
                                      }
                                    }
                                  }
                                },
                                {
                                  "kind": "object",
                                  "type": "SortFields",
                                  "schema": {}
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "where": {
                    "name": "where",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "QueryBuilderWhere[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "QueryBuilderWhere[] | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "array",
                          "type": "QueryBuilderWhere[]",
                          "schema": [
                            {
                              "kind": "object",
                              "type": "QueryBuilderWhere",
                              "schema": {
                                "$and": {
                                  "name": "$and",
                                  "global": false,
                                  "description": "Match only if all of nested conditions are true",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n $and: [\n   { score: { $gte: 5 } },\n   { score: { $lte: 10 } }\n ]\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "QueryBuilderWhere[] | undefined",
                                  "schema": "QueryBuilderWhere[] | undefined"
                                },
                                "$or": {
                                  "name": "$or",
                                  "global": false,
                                  "description": "Match if any of nested conditions is true",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n $or: [\n   { score: { $gt: 5 } },\n   { score: { $lt: 3 } }\n ]\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "QueryBuilderWhere[] | undefined",
                                  "schema": "QueryBuilderWhere[] | undefined"
                                },
                                "$not": {
                                  "name": "$not",
                                  "global": false,
                                  "description": "Match is condition is false",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $not: 'Hello World'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      {
                                        "kind": "object",
                                        "type": "RegExp",
                                        "schema": {
                                          "exec": {
                                            "name": "exec",
                                            "global": false,
                                            "description": "Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string The String object or string literal on which to perform the search."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => RegExpExecArray | null",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): RegExpExecArray | null",
                                              "schema": []
                                            }
                                          },
                                          "test": {
                                            "name": "test",
                                            "global": false,
                                            "description": "Returns a Boolean value that indicates whether or not a pattern exists in a searched string.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string String on which to perform the search."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => boolean",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): boolean",
                                              "schema": []
                                            }
                                          },
                                          "source": {
                                            "name": "source",
                                            "global": false,
                                            "description": "Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal.",
                                            "tags": [],
                                            "required": true,
                                            "type": "string",
                                            "schema": "string"
                                          },
                                          "global": {
                                            "name": "global",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": {
                                              "kind": "enum",
                                              "type": "boolean",
                                              "schema": [
                                                "false",
                                                "true"
                                              ]
                                            }
                                          },
                                          "ignoreCase": {
                                            "name": "ignoreCase",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "multiline": {
                                            "name": "multiline",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "lastIndex": {
                                            "name": "lastIndex",
                                            "global": false,
                                            "description": "",
                                            "tags": [],
                                            "required": true,
                                            "type": "number",
                                            "schema": "number"
                                          },
                                          "compile": {
                                            "name": "compile",
                                            "global": false,
                                            "description": "",
                                            "tags": [
                                              {
                                                "name": "deprecated",
                                                "text": "A legacy feature for browser compatibility"
                                              }
                                            ],
                                            "required": true,
                                            "type": "(pattern: string, flags?: string | undefined) => RegExp",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(pattern: string, flags?: string | undefined): RegExp",
                                              "schema": []
                                            }
                                          },
                                          "flags": {
                                            "name": "flags",
                                            "global": false,
                                            "description": "Returns a string indicating the flags of the regular expression in question. This field is read-only.\nThe characters in this string are sequenced and concatenated in the following order:\n\n   - \"g\" for global\n   - \"i\" for ignoreCase\n   - \"m\" for multiline\n   - \"u\" for unicode\n   - \"y\" for sticky\n\nIf no flags are set, the value is the empty string.",
                                            "tags": [],
                                            "required": true,
                                            "type": "string",
                                            "schema": "string"
                                          },
                                          "sticky": {
                                            "name": "sticky",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the sticky flag (y) used with a regular\nexpression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "unicode": {
                                            "name": "unicode",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular\nexpression. Default is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "dotAll": {
                                            "name": "dotAll",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression.\nDefault is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "hasIndices": {
                                            "name": "hasIndices",
                                            "global": false,
                                            "description": "Returns a Boolean value indicating the state of the hasIndices flag (d) used with with a regular expression.\nDefault is false. Read-only.",
                                            "tags": [],
                                            "required": true,
                                            "type": "boolean",
                                            "schema": "boolean"
                                          },
                                          "__@match@9959": {
                                            "name": "__@match@9959",
                                            "global": false,
                                            "description": "Matches a string with this regular expression, and returns an array containing the results of\nthat search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => RegExpMatchArray | null",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): RegExpMatchArray | null",
                                              "schema": []
                                            }
                                          },
                                          "__@replace@9961": {
                                            "name": "__@replace@9961",
                                            "global": false,
                                            "description": "Replaces text in a string, using this regular expression.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                              },
                                              {
                                                "name": "param",
                                                "text": "replaceValue A String object or string literal containing the text to replace for every\nsuccessful match of this regular expression."
                                              },
                                              {
                                                "name": "param",
                                                "text": "string A String object or string literal whose contents matching against\nthis regular expression will be replaced"
                                              },
                                              {
                                                "name": "param",
                                                "text": "replacer A function that returns the replacement text."
                                              }
                                            ],
                                            "required": true,
                                            "type": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }",
                                            "schema": "{ (string: string, replaceValue: string): string; (string: string, replacer: (substring: string, ...args: any[]) => string): string; }"
                                          },
                                          "__@search@9964": {
                                            "name": "__@search@9964",
                                            "global": false,
                                            "description": "Finds the position beginning first substring match in a regular expression search\nusing this regular expression.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string The string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string) => number",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string): number",
                                              "schema": []
                                            }
                                          },
                                          "__@split@9966": {
                                            "name": "__@split@9966",
                                            "global": false,
                                            "description": "Returns an array of substrings that were delimited by strings in the original input that\nmatch against this regular expression.\n\nIf the regular expression contains capturing parentheses, then each time this\nregular expression matches, the results (including any undefined results) of the\ncapturing parentheses are spliced.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string string value to split"
                                              },
                                              {
                                                "name": "param",
                                                "text": "limit if not undefined, the output array is truncated so that it contains no more\nthan 'limit' elements."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(string: string, limit?: number | undefined) => string[]",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(string: string, limit?: number | undefined): string[]",
                                              "schema": []
                                            }
                                          },
                                          "__@matchAll@9968": {
                                            "name": "__@matchAll@9968",
                                            "global": false,
                                            "description": "Matches a string with this regular expression, and returns an iterable of matches\ncontaining the results of that search.",
                                            "tags": [
                                              {
                                                "name": "param",
                                                "text": "string A string to search within."
                                              }
                                            ],
                                            "required": true,
                                            "type": "(str: string) => IterableIterator<RegExpMatchArray>",
                                            "schema": {
                                              "kind": "event",
                                              "type": "(str: string): IterableIterator<RegExpMatchArray>",
                                              "schema": []
                                            }
                                          }
                                        }
                                      },
                                      "QueryBuilderWhere"
                                    ]
                                  }
                                },
                                "$eq": {
                                  "name": "$eq",
                                  "global": false,
                                  "description": "Match if item equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $eq: 'Hello World'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | RegExp | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      "RegExp"
                                    ]
                                  }
                                },
                                "$ne": {
                                  "name": "$ne",
                                  "global": false,
                                  "description": "Match if item not equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $ne: 100\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | undefined",
                                  "schema": "string | number | boolean | RegExp | undefined"
                                },
                                "$gt": {
                                  "name": "$gt",
                                  "global": false,
                                  "description": "Check if item is greater than condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $gt: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$gte": {
                                  "name": "$gte",
                                  "global": false,
                                  "description": "Check if item is greater than or equal to condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $gte: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$lt": {
                                  "name": "$lt",
                                  "global": false,
                                  "description": "Check if item is less than condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $lt: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$lte": {
                                  "name": "$lte",
                                  "global": false,
                                  "description": "Check if item is less than or equal to condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n score: {\n   $lte: 99.5\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "number | undefined",
                                  "schema": "number | undefined"
                                },
                                "$regex": {
                                  "name": "$regex",
                                  "global": false,
                                  "description": "Provides regular expression capabilities for pattern matching strings.",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $regex: /^foo/\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | RegExp | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | RegExp | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "RegExp"
                                    ]
                                  }
                                },
                                "$type": {
                                  "name": "$type",
                                  "global": false,
                                  "description": "Match if type of item equals condition",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n field: {\n   $type: 'boolean'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | undefined",
                                  "schema": "string | undefined"
                                },
                                "$exists": {
                                  "name": "$exists",
                                  "global": false,
                                  "description": "Check key existence",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n tag: {\n   $exists: false\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "boolean | undefined",
                                  "schema": "boolean | undefined"
                                },
                                "$contains": {
                                  "name": "$contains",
                                  "global": false,
                                  "description": "Match if item contains every condition or math every rule in condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $contains: ['Hello', 'World']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | number | boolean | (string | number | boolean)[] | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "string | number | boolean | (string | number | boolean)[] | undefined",
                                    "schema": [
                                      "undefined",
                                      "string",
                                      "number",
                                      "false",
                                      "true",
                                      {
                                        "kind": "array",
                                        "type": "(string | number | boolean)[]",
                                        "schema": [
                                          {
                                            "kind": "enum",
                                            "type": "string | number | boolean",
                                            "schema": [
                                              "string",
                                              "number",
                                              "false",
                                              "true"
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                },
                                "$containsAny": {
                                  "name": "$containsAny",
                                  "global": false,
                                  "description": "Match if item contains at least one rule from condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $containsAny: ['Hello', 'World']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "(string | number | boolean)[] | undefined",
                                  "schema": {
                                    "kind": "enum",
                                    "type": "(string | number | boolean)[] | undefined",
                                    "schema": [
                                      "undefined",
                                      "(string | number | boolean)[]"
                                    ]
                                  }
                                },
                                "$icontains": {
                                  "name": "$icontains",
                                  "global": false,
                                  "description": "Ignore case contains",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n title: {\n   $icontains: 'hello world'\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "string | undefined",
                                  "schema": "string | undefined"
                                },
                                "$in": {
                                  "name": "$in",
                                  "global": false,
                                  "description": "Match if item is in condition array",
                                  "tags": [
                                    {
                                      "name": "example",
                                      "text": "```ts\nqueryContent().where({\n category: {\n   $in: ['sport', 'nature', 'travel']\n }\n})\n```"
                                    }
                                  ],
                                  "required": false,
                                  "type": "(string | number | boolean)[] | undefined",
                                  "schema": "(string | number | boolean)[] | undefined"
                                },
                                "title": {
                                  "name": "title",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_id": {
                                  "name": "_id",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_source": {
                                  "name": "_source",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_path": {
                                  "name": "_path",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_draft": {
                                  "name": "_draft",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_partial": {
                                  "name": "_partial",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_locale": {
                                  "name": "_locale",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_type": {
                                  "name": "_type",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_file": {
                                  "name": "_file",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                },
                                "_extension": {
                                  "name": "_extension",
                                  "global": false,
                                  "description": "",
                                  "tags": [],
                                  "required": false,
                                  "type": "string | number | boolean | RegExp | QueryBuilderWhere | undefined",
                                  "schema": "string | number | boolean | RegExp | QueryBuilderWhere | undefined"
                                }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "surround": {
                    "name": "surround",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; } | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; } | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "object",
                          "type": "{ query: string | QueryBuilderWhere; before?: number | undefined; after?: number | undefined; }",
                          "schema": {
                            "query": {
                              "name": "query",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": true,
                              "type": "string | QueryBuilderWhere",
                              "schema": {
                                "kind": "enum",
                                "type": "string | QueryBuilderWhere",
                                "schema": [
                                  "string",
                                  "QueryBuilderWhere"
                                ]
                              }
                            },
                            "before": {
                              "name": "before",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "number | undefined",
                              "schema": "number | undefined"
                            },
                            "after": {
                              "name": "after",
                              "global": false,
                              "description": "",
                              "tags": [],
                              "required": false,
                              "type": "number | undefined",
                              "schema": "number | undefined"
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              "QueryBuilder<ParsedContentMeta>"
            ]
          },
          "default": "void 0"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentQuery": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "pascalName": "ContentQuery",
    "kebabName": "content-query",
    "chunkName": "components/content-query",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "meta": {
      "props": [
        {
          "name": "sort",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "SortParams | undefined",
          "schema": {
            "kind": "enum",
            "type": "SortParams | undefined",
            "schema": [
              "undefined",
              {
                "kind": "object",
                "type": "SortParams",
                "schema": {
                  "$locale": {
                    "name": "$locale",
                    "global": false,
                    "description": "Locale specifier for sorting\nA string with a BCP 47 language tag",
                    "tags": [
                      {
                        "name": "default",
                        "text": "undefined"
                      }
                    ],
                    "required": false,
                    "type": "string | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "string | undefined",
                      "schema": [
                        "undefined",
                        "string"
                      ]
                    }
                  },
                  "$numeric": {
                    "name": "$numeric",
                    "global": false,
                    "description": "Whether numeric collation should be used, such that \"1\" < \"2\" < \"10\".\nPossible values are `true` and `false`;",
                    "tags": [
                      {
                        "name": "default",
                        "text": "false"
                      }
                    ],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "boolean | undefined",
                      "schema": [
                        "undefined",
                        "false",
                        "true"
                      ]
                    }
                  },
                  "$caseFirst": {
                    "name": "$caseFirst",
                    "global": false,
                    "description": "Whether upper case or lower case should sort first.\nPossible values are `\"upper\"`, `\"lower\"`, or `\"false\"`",
                    "tags": [
                      {
                        "name": "default",
                        "text": "\"depends on locale\""
                      }
                    ],
                    "required": false,
                    "type": "\"upper\" | \"lower\" | \"false\" | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "\"upper\" | \"lower\" | \"false\" | undefined",
                      "schema": [
                        "undefined",
                        "\"upper\"",
                        "\"lower\"",
                        "\"false\""
                      ]
                    }
                  },
                  "$sensitivity": {
                    "name": "$sensitivity",
                    "global": false,
                    "description": "Which differences in the strings should lead to non-zero result values. Possible values are:\n - \"base\": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.\n - \"accent\": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.\n - \"case\": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.\n - \"variant\": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.",
                    "tags": [
                      {
                        "name": "default",
                        "text": "\"variant\""
                      }
                    ],
                    "required": false,
                    "type": "\"base\" | \"accent\" | \"case\" | \"variant\" | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "\"base\" | \"accent\" | \"case\" | \"variant\" | undefined",
                      "schema": [
                        "undefined",
                        "\"base\"",
                        "\"accent\"",
                        "\"case\"",
                        "\"variant\""
                      ]
                    }
                  }
                }
              }
            ]
          },
          "default": "void 0"
        },
        {
          "name": "find",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "\"one\" | \"surround\" | undefined",
          "schema": {
            "kind": "enum",
            "type": "\"one\" | \"surround\" | undefined",
            "schema": [
              "undefined",
              "\"one\"",
              "\"surround\""
            ]
          },
          "default": "void 0"
        },
        {
          "name": "path",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "void 0"
        },
        {
          "name": "only",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          },
          "default": "void 0"
        },
        {
          "name": "without",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          },
          "default": "void 0"
        },
        {
          "name": "where",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "{ [key: string]: any; } | undefined",
          "schema": {
            "kind": "enum",
            "type": "{ [key: string]: any; } | undefined",
            "schema": [
              "undefined",
              {
                "kind": "object",
                "type": "{ [key: string]: any; }",
                "schema": {}
              }
            ]
          },
          "default": "void 0"
        },
        {
          "name": "limit",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "void 0"
        },
        {
          "name": "skip",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "void 0"
        },
        {
          "name": "locale",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "void 0"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentRenderer": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "pascalName": "ContentRenderer",
    "kebabName": "content-renderer",
    "chunkName": "components/content-renderer",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "meta": {
      "props": [
        {
          "name": "value",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          },
          "default": "{}"
        },
        {
          "name": "tag",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"div\""
        },
        {
          "name": "excerpt",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentRendererMarkdown": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "pascalName": "ContentRendererMarkdown",
    "kebabName": "content-renderer-markdown",
    "chunkName": "components/content-renderer-markdown",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "meta": {
      "props": [
        {
          "name": "value",
          "global": false,
          "description": "Content to render",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        },
        {
          "name": "components",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          },
          "default": "{}"
        },
        {
          "name": "tag",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"div\""
        },
        {
          "name": "excerpt",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentSlot": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "pascalName": "ContentSlot",
    "kebabName": "content-slot",
    "chunkName": "components/content-slot",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Markdown": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "pascalName": "Markdown",
    "kebabName": "markdown",
    "chunkName": "components/markdown",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentPreviewMode": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxthq/studio/dist/runtime/components/ContentPreviewMode.vue",
    "pascalName": "ContentPreviewMode",
    "kebabName": "content-preview-mode",
    "chunkName": "components/content-preview-mode",
    "shortPath": "node_modules/@nuxthq/studio/dist/runtime/components/ContentPreviewMode.vue",
    "export": "default",
    "priority": 1,
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxthq/studio/dist/runtime/components/ContentPreviewMode.vue",
    "meta": {
      "props": [
        {
          "name": "refresh",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Function",
          "schema": {
            "kind": "object",
            "type": "Function",
            "schema": {
              "apply": {
                "name": "apply",
                "global": false,
                "description": "Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the this object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A set of arguments to be passed to the function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, argArray?: any) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, argArray?: any): any",
                  "schema": []
                }
              },
              "call": {
                "name": "call",
                "global": false,
                "description": "Calls a method of an object, substituting another object for the current object.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the current object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the method."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "bind": {
                "name": "bind",
                "global": false,
                "description": "For a given function, creates a bound function that has the same body as the original function.\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg An object to which the this keyword can refer inside the new function."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the new function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "toString": {
                "name": "toString",
                "global": false,
                "description": "Returns a string representation of a function.",
                "tags": [],
                "required": true,
                "type": "() => string",
                "schema": {
                  "kind": "event",
                  "type": "(): string"
                }
              },
              "prototype": {
                "name": "prototype",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "length": {
                "name": "length",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "number",
                "schema": "number"
              },
              "arguments": {
                "name": "arguments",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "caller": {
                "name": "caller",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "Function",
                "schema": "Function"
              },
              "name": {
                "name": "name",
                "global": false,
                "description": "Returns the name of the function. Function names are read-only and can not be changed.",
                "tags": [],
                "required": true,
                "type": "string",
                "schema": "string"
              },
              "__@hasInstance@793": {
                "name": "__@hasInstance@793",
                "global": false,
                "description": "Determines whether the given value inherits from this function if this function was used\nas a constructor function.\n\nA constructor function can control which objects are recognized as its instances by\n'instanceof' by overriding this method.",
                "tags": [],
                "required": true,
                "type": "(value: any) => boolean",
                "schema": {
                  "kind": "event",
                  "type": "(value: any): boolean",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "previewToken",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        },
        {
          "name": "apiURL",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        },
        {
          "name": "storageReady",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Ref<boolean>",
          "schema": "Ref<boolean>"
        },
        {
          "name": "init",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Function",
          "schema": {
            "kind": "object",
            "type": "Function",
            "schema": {
              "apply": {
                "name": "apply",
                "global": false,
                "description": "Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the this object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A set of arguments to be passed to the function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, argArray?: any) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, argArray?: any): any",
                  "schema": []
                }
              },
              "call": {
                "name": "call",
                "global": false,
                "description": "Calls a method of an object, substituting another object for the current object.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the current object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the method."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "bind": {
                "name": "bind",
                "global": false,
                "description": "For a given function, creates a bound function that has the same body as the original function.\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg An object to which the this keyword can refer inside the new function."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the new function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "toString": {
                "name": "toString",
                "global": false,
                "description": "Returns a string representation of a function.",
                "tags": [],
                "required": true,
                "type": "() => string",
                "schema": {
                  "kind": "event",
                  "type": "(): string"
                }
              },
              "prototype": {
                "name": "prototype",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "length": {
                "name": "length",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "number",
                "schema": "number"
              },
              "arguments": {
                "name": "arguments",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "caller": {
                "name": "caller",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "Function",
                "schema": "Function"
              },
              "name": {
                "name": "name",
                "global": false,
                "description": "Returns the name of the function. Function names are read-only and can not be changed.",
                "tags": [],
                "required": true,
                "type": "string",
                "schema": "string"
              },
              "__@hasInstance@793": {
                "name": "__@hasInstance@793",
                "global": false,
                "description": "Determines whether the given value inherits from this function if this function was used\nas a constructor function.\n\nA constructor function can control which objects are recognized as its instances by\n'instanceof' by overriding this method.",
                "tags": [],
                "required": true,
                "type": "(value: any) => boolean",
                "schema": {
                  "kind": "event",
                  "type": "(value: any): boolean",
                  "schema": []
                }
              }
            }
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtWelcome": {
    "export": "default",
    "chunkName": "components/nuxt-welcome",
    "global": false,
    "kebabName": "nuxt-welcome",
    "pascalName": "NuxtWelcome",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/ui-templates/dist/templates/welcome.vue",
    "priority": 10,
    "name": "NuxtWelcome",
    "filePath": "/node_modules/@nuxt/ui-templates/dist/templates/welcome.vue",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxt/ui-templates/dist/templates/welcome.vue",
    "meta": {
      "props": [
        {
          "name": "appName",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Nuxt\""
        },
        {
          "name": "version",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Welcome to Nuxt!\""
        },
        {
          "name": "readDocs",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"We highly recommend you take a look at the Nuxt documentation, whether you are new or have previous experience with the framework.\""
        },
        {
          "name": "followTwitter",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Follow the Nuxt Twitter account to get latest news about releases, new modules, tutorials and tips.\""
        },
        {
          "name": "starGitHub",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Nuxt is open source and the code is available on GitHub, feel free to star it, participate in discussions or dive into the source.\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtLayout": {
    "export": "default",
    "chunkName": "components/nuxt-layout",
    "global": false,
    "kebabName": "nuxt-layout",
    "pascalName": "NuxtLayout",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/layout",
    "priority": 10,
    "name": "NuxtLayout",
    "filePath": "/node_modules/nuxt/dist/app/components/layout.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/layout.js",
    "meta": {
      "props": [
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | false | Ref<string | false> | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | false | Ref<string | false> | undefined",
            "schema": [
              "undefined",
              "string",
              "false",
              "Ref<string | false>"
            ]
          },
          "default": "null"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtErrorBoundary": {
    "export": "default",
    "chunkName": "components/nuxt-error-boundary",
    "global": false,
    "kebabName": "nuxt-error-boundary",
    "pascalName": "NuxtErrorBoundary",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/nuxt-error-boundary",
    "priority": 10,
    "name": "NuxtErrorBoundary",
    "filePath": "/node_modules/nuxt/dist/app/components/nuxt-error-boundary.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/nuxt-error-boundary.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [
        {
          "name": "error",
          "type": "[_error: unknown]",
          "signature": "(event: \"error\", _error: unknown): void",
          "schema": [
            "unknown"
          ]
        }
      ],
      "exposed": []
    }
  },
  "ClientOnly": {
    "export": "default",
    "chunkName": "components/client-only",
    "global": false,
    "kebabName": "client-only",
    "pascalName": "ClientOnly",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/client-only",
    "priority": 10,
    "name": "ClientOnly",
    "filePath": "/node_modules/nuxt/dist/app/components/client-only.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/client-only.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DevOnly": {
    "export": "default",
    "chunkName": "components/dev-only",
    "global": false,
    "kebabName": "dev-only",
    "pascalName": "DevOnly",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/dev-only",
    "priority": 10,
    "name": "DevOnly",
    "filePath": "/node_modules/nuxt/dist/app/components/dev-only.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/dev-only.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ServerPlaceholder": {
    "export": "default",
    "chunkName": "components/server-placeholder",
    "global": false,
    "kebabName": "server-placeholder",
    "pascalName": "ServerPlaceholder",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/server-placeholder",
    "priority": 10,
    "name": "ServerPlaceholder",
    "filePath": "/node_modules/nuxt/dist/app/components/server-placeholder.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/server-placeholder.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtLink": {
    "export": "default",
    "chunkName": "components/nuxt-link",
    "global": false,
    "kebabName": "nuxt-link",
    "pascalName": "NuxtLink",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/nuxt-link",
    "priority": 10,
    "name": "NuxtLink",
    "filePath": "/node_modules/nuxt/dist/app/components/nuxt-link.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/nuxt-link.js",
    "meta": {
      "props": [
        {
          "name": "to",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "RouteLocationRaw | undefined",
          "schema": {
            "kind": "enum",
            "type": "RouteLocationRaw | undefined",
            "schema": [
              "undefined",
              "string",
              {
                "kind": "object",
                "type": "RouteLocationPathRaw",
                "schema": {
                  "query": {
                    "name": "query",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "LocationQueryRaw | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "LocationQueryRaw | undefined",
                      "schema": [
                        "undefined",
                        "LocationQueryRaw"
                      ]
                    }
                  },
                  "hash": {
                    "name": "hash",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "string | undefined",
                      "schema": [
                        "undefined",
                        "string"
                      ]
                    }
                  },
                  "path": {
                    "name": "path",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": true,
                    "type": "string",
                    "schema": "string"
                  },
                  "replace": {
                    "name": "replace",
                    "global": false,
                    "description": "Replace the entry in the history instead of pushing a new entry",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "boolean | undefined",
                      "schema": [
                        "undefined",
                        "false",
                        "true"
                      ]
                    }
                  },
                  "force": {
                    "name": "force",
                    "global": false,
                    "description": "Triggers the navigation even if the location is the same as the current one.\r\nNote this will also add a new entry to the history unless `replace: true`\r\nis passed.",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": "boolean | undefined"
                  },
                  "state": {
                    "name": "state",
                    "global": false,
                    "description": "State to save using the History API. This cannot contain any reactive\r\nvalues and some primitives like Symbols are forbidden. More info at\r\nhttps://developer.mozilla.org/en-US/docs/Web/API/History/state",
                    "tags": [],
                    "required": false,
                    "type": "HistoryState | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "HistoryState | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "object",
                          "type": "HistoryState",
                          "schema": {}
                        }
                      ]
                    }
                  }
                }
              },
              {
                "kind": "object",
                "type": "RouteLocationNamedRaw",
                "schema": {
                  "query": {
                    "name": "query",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "LocationQueryRaw | undefined",
                    "schema": "LocationQueryRaw | undefined"
                  },
                  "hash": {
                    "name": "hash",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string | undefined",
                    "schema": "string | undefined"
                  },
                  "name": {
                    "name": "name",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "RouteRecordName | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "RouteRecordName | undefined",
                      "schema": [
                        "undefined",
                        "string",
                        "symbol"
                      ]
                    }
                  },
                  "params": {
                    "name": "params",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "RouteParamsRaw | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "RouteParamsRaw | undefined",
                      "schema": [
                        "undefined",
                        "RouteParamsRaw"
                      ]
                    }
                  },
                  "replace": {
                    "name": "replace",
                    "global": false,
                    "description": "Replace the entry in the history instead of pushing a new entry",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": "boolean | undefined"
                  },
                  "force": {
                    "name": "force",
                    "global": false,
                    "description": "Triggers the navigation even if the location is the same as the current one.\r\nNote this will also add a new entry to the history unless `replace: true`\r\nis passed.",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": "boolean | undefined"
                  },
                  "state": {
                    "name": "state",
                    "global": false,
                    "description": "State to save using the History API. This cannot contain any reactive\r\nvalues and some primitives like Symbols are forbidden. More info at\r\nhttps://developer.mozilla.org/en-US/docs/Web/API/History/state",
                    "tags": [],
                    "required": false,
                    "type": "HistoryState | undefined",
                    "schema": "HistoryState | undefined"
                  }
                }
              }
            ]
          }
        },
        {
          "name": "replace",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "href",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "RouteLocationRaw | undefined",
          "schema": {
            "kind": "enum",
            "type": "RouteLocationRaw | undefined",
            "schema": [
              "undefined",
              "string",
              {
                "kind": "object",
                "type": "RouteLocationPathRaw",
                "schema": {
                  "query": {
                    "name": "query",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "LocationQueryRaw | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "LocationQueryRaw | undefined",
                      "schema": [
                        "undefined",
                        "LocationQueryRaw"
                      ]
                    }
                  },
                  "hash": {
                    "name": "hash",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "string | undefined",
                      "schema": [
                        "undefined",
                        "string"
                      ]
                    }
                  },
                  "path": {
                    "name": "path",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": true,
                    "type": "string",
                    "schema": "string"
                  },
                  "replace": {
                    "name": "replace",
                    "global": false,
                    "description": "Replace the entry in the history instead of pushing a new entry",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "boolean | undefined",
                      "schema": [
                        "undefined",
                        "false",
                        "true"
                      ]
                    }
                  },
                  "force": {
                    "name": "force",
                    "global": false,
                    "description": "Triggers the navigation even if the location is the same as the current one.\r\nNote this will also add a new entry to the history unless `replace: true`\r\nis passed.",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": "boolean | undefined"
                  },
                  "state": {
                    "name": "state",
                    "global": false,
                    "description": "State to save using the History API. This cannot contain any reactive\r\nvalues and some primitives like Symbols are forbidden. More info at\r\nhttps://developer.mozilla.org/en-US/docs/Web/API/History/state",
                    "tags": [],
                    "required": false,
                    "type": "HistoryState | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "HistoryState | undefined",
                      "schema": [
                        "undefined",
                        {
                          "kind": "object",
                          "type": "HistoryState",
                          "schema": {}
                        }
                      ]
                    }
                  }
                }
              },
              {
                "kind": "object",
                "type": "RouteLocationNamedRaw",
                "schema": {
                  "query": {
                    "name": "query",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "LocationQueryRaw | undefined",
                    "schema": "LocationQueryRaw | undefined"
                  },
                  "hash": {
                    "name": "hash",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "string | undefined",
                    "schema": "string | undefined"
                  },
                  "name": {
                    "name": "name",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "RouteRecordName | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "RouteRecordName | undefined",
                      "schema": [
                        "undefined",
                        "string",
                        "symbol"
                      ]
                    }
                  },
                  "params": {
                    "name": "params",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "RouteParamsRaw | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "RouteParamsRaw | undefined",
                      "schema": [
                        "undefined",
                        "RouteParamsRaw"
                      ]
                    }
                  },
                  "replace": {
                    "name": "replace",
                    "global": false,
                    "description": "Replace the entry in the history instead of pushing a new entry",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": "boolean | undefined"
                  },
                  "force": {
                    "name": "force",
                    "global": false,
                    "description": "Triggers the navigation even if the location is the same as the current one.\r\nNote this will also add a new entry to the history unless `replace: true`\r\nis passed.",
                    "tags": [],
                    "required": false,
                    "type": "boolean | undefined",
                    "schema": "boolean | undefined"
                  },
                  "state": {
                    "name": "state",
                    "global": false,
                    "description": "State to save using the History API. This cannot contain any reactive\r\nvalues and some primitives like Symbols are forbidden. More info at\r\nhttps://developer.mozilla.org/en-US/docs/Web/API/History/state",
                    "tags": [],
                    "required": false,
                    "type": "HistoryState | undefined",
                    "schema": "HistoryState | undefined"
                  }
                }
              }
            ]
          }
        },
        {
          "name": "external",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "custom",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "target",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\" | (string & {}) | null | undefined",
          "schema": {
            "kind": "enum",
            "type": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\" | (string & {}) | null | undefined",
            "schema": [
              "undefined",
              "null",
              "\"_blank\"",
              "\"_parent\"",
              "\"_self\"",
              "\"_top\"",
              {
                "kind": "object",
                "type": "string & {}",
                "schema": {
                  "toString": {
                    "name": "toString",
                    "global": false,
                    "description": "Returns a string representation of a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "charAt": {
                    "name": "charAt",
                    "global": false,
                    "description": "Returns the character at the specified index.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "pos The zero-based index of the desired character."
                      }
                    ],
                    "required": true,
                    "type": "(pos: number) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(pos: number): string",
                      "schema": []
                    }
                  },
                  "charCodeAt": {
                    "name": "charCodeAt",
                    "global": false,
                    "description": "Returns the Unicode value of the character at the specified location.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned."
                      }
                    ],
                    "required": true,
                    "type": "(index: number) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(index: number): number",
                      "schema": []
                    }
                  },
                  "concat": {
                    "name": "concat",
                    "global": false,
                    "description": "Returns a string that contains the concatenation of two or more strings.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "strings The strings to append to the end of the string."
                      }
                    ],
                    "required": true,
                    "type": "(...strings: string[]) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(...strings: string[]): string",
                      "schema": [
                        "string"
                      ]
                    }
                  },
                  "indexOf": {
                    "name": "indexOf",
                    "global": false,
                    "description": "Returns the position of the first occurrence of a substring.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString The substring to search for in the string"
                      },
                      {
                        "name": "param",
                        "text": "position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): number",
                      "schema": []
                    }
                  },
                  "lastIndexOf": {
                    "name": "lastIndexOf",
                    "global": false,
                    "description": "Returns the last occurrence of a substring in the string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString The substring to search for."
                      },
                      {
                        "name": "param",
                        "text": "position The index at which to begin searching. If omitted, the search begins at the end of the string."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): number",
                      "schema": []
                    }
                  },
                  "localeCompare": {
                    "name": "localeCompare",
                    "global": false,
                    "description": "Determines whether two strings are equivalent in the current locale.\nDetermines whether two strings are equivalent in the current or specified locale.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "that String to compare to target string"
                      },
                      {
                        "name": "param",
                        "text": "that String to compare to target string"
                      },
                      {
                        "name": "param",
                        "text": "locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details."
                      },
                      {
                        "name": "param",
                        "text": "options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details."
                      }
                    ],
                    "required": true,
                    "type": "{ (that: string): number; (that: string, locales?: string | string[] | undefined, options?: CollatorOptions | undefined): number; }",
                    "schema": "{ (that: string): number; (that: string, locales?: string | string[] | undefined, options?: CollatorOptions | undefined): number; }"
                  },
                  "match": {
                    "name": "match",
                    "global": false,
                    "description": "Matches a string with a regular expression, and returns an array containing the results of that search.\nMatches a string or an object that supports being matched against, and returns an array\ncontaining the results of that search, or null if no matches are found.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp A variable name or string literal containing the regular expression pattern and flags."
                      },
                      {
                        "name": "param",
                        "text": "matcher An object that supports being matched against."
                      }
                    ],
                    "required": true,
                    "type": "{ (regexp: string | RegExp): RegExpMatchArray | null; (matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null; }",
                    "schema": "{ (regexp: string | RegExp): RegExpMatchArray | null; (matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null; }"
                  },
                  "replace": {
                    "name": "replace",
                    "global": false,
                    "description": "Replaces text in a string, using a regular expression or search string.\nPasses a string and {@linkcode replaceValue} to the `[Symbol.replace]` method on {@linkcode searchValue}. This method is expected to implement its own replacement algorithm.\nReplaces text in a string, using an object that supports replacement within a string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchValue A string or regular expression to search for."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue A string containing the text to replace. When the {@linkcode searchValue} is a `RegExp`, all matches are replaced if the `g` flag is set (or only those matches at the beginning, if the `y` flag is also present). Otherwise, only the first match of {@linkcode searchValue} is replaced."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      },
                      {
                        "name": "param",
                        "text": "searchValue An object that supports searching for and replacing matches within a string."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue The replacement text."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A object can search for and replace matches within a string."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      }
                    ],
                    "required": true,
                    "type": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { ...; }, replaceValue: string): string; (searchValue: { ...; }, replacer: (substring: string, ...args: any[]) => string): string; }",
                    "schema": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { ...; }, replaceValue: string): string; (searchValue: { ...; }, replacer: (substring: string, ...args: any[]) => string): string; }"
                  },
                  "search": {
                    "name": "search",
                    "global": false,
                    "description": "Finds the first substring match in a regular expression search.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp The regular expression pattern and applicable flags."
                      },
                      {
                        "name": "param",
                        "text": "searcher An object which supports searching within a string."
                      }
                    ],
                    "required": true,
                    "type": "{ (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }",
                    "schema": "{ (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }"
                  },
                  "slice": {
                    "name": "slice",
                    "global": false,
                    "description": "Returns a section of a string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "start The index to the beginning of the specified portion of stringObj."
                      },
                      {
                        "name": "param",
                        "text": "end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.\nIf this value is not specified, the substring continues to the end of stringObj."
                      }
                    ],
                    "required": true,
                    "type": "(start?: number | undefined, end?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(start?: number | undefined, end?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "split": {
                    "name": "split",
                    "global": false,
                    "description": "Split a string into substrings using the specified separator and return them as an array.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned."
                      },
                      {
                        "name": "param",
                        "text": "limit A value used to limit the number of elements returned in the array."
                      },
                      {
                        "name": "param",
                        "text": "splitter An object that can split a string."
                      },
                      {
                        "name": "param",
                        "text": "limit A value used to limit the number of elements returned in the array."
                      }
                    ],
                    "required": true,
                    "type": "{ (separator: string | RegExp, limit?: number | undefined): string[]; (splitter: { [Symbol.split](string: string, limit?: number | undefined): string[]; }, limit?: number | undefined): string[]; }",
                    "schema": "{ (separator: string | RegExp, limit?: number | undefined): string[]; (splitter: { [Symbol.split](string: string, limit?: number | undefined): string[]; }, limit?: number | undefined): string[]; }"
                  },
                  "substring": {
                    "name": "substring",
                    "global": false,
                    "description": "Returns the substring at the specified location within a String object.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "start The zero-based index number indicating the beginning of the substring."
                      },
                      {
                        "name": "param",
                        "text": "end Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.\nIf end is omitted, the characters from start through the end of the original string are returned."
                      }
                    ],
                    "required": true,
                    "type": "(start: number, end?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(start: number, end?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "toLowerCase": {
                    "name": "toLowerCase",
                    "global": false,
                    "description": "Converts all the alphabetic characters in a string to lowercase.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "toLocaleLowerCase": {
                    "name": "toLocaleLowerCase",
                    "global": false,
                    "description": "Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.",
                    "tags": [],
                    "required": true,
                    "type": "(locales?: string | string[] | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(locales?: string | string[] | undefined): string",
                      "schema": []
                    }
                  },
                  "toUpperCase": {
                    "name": "toUpperCase",
                    "global": false,
                    "description": "Converts all the alphabetic characters in a string to uppercase.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "toLocaleUpperCase": {
                    "name": "toLocaleUpperCase",
                    "global": false,
                    "description": "Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.",
                    "tags": [],
                    "required": true,
                    "type": "(locales?: string | string[] | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(locales?: string | string[] | undefined): string",
                      "schema": []
                    }
                  },
                  "trim": {
                    "name": "trim",
                    "global": false,
                    "description": "Removes the leading and trailing white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "length": {
                    "name": "length",
                    "global": false,
                    "description": "Returns the length of a String object.",
                    "tags": [],
                    "required": true,
                    "type": "number",
                    "schema": "number"
                  },
                  "substr": {
                    "name": "substr",
                    "global": false,
                    "description": "Gets a substring beginning at the specified location and having the specified length.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "param",
                        "text": "from The starting position of the desired substring. The index of the first character in the string is zero."
                      },
                      {
                        "name": "param",
                        "text": "length The number of characters to include in the returned substring."
                      }
                    ],
                    "required": true,
                    "type": "(from: number, length?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(from: number, length?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "valueOf": {
                    "name": "valueOf",
                    "global": false,
                    "description": "Returns the primitive value of the specified object.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "codePointAt": {
                    "name": "codePointAt",
                    "global": false,
                    "description": "Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point\nvalue of the UTF-16 encoded code point starting at the string element at position pos in\nthe String resulting from converting this object to a String.\nIf there is no element at that position, the result is undefined.\nIf a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.",
                    "tags": [],
                    "required": true,
                    "type": "(pos: number) => number | undefined",
                    "schema": {
                      "kind": "event",
                      "type": "(pos: number): number | undefined",
                      "schema": []
                    }
                  },
                  "includes": {
                    "name": "includes",
                    "global": false,
                    "description": "Returns true if searchString appears as a substring of the result of converting this\nobject to a String, at one or more positions that are\ngreater than or equal to position; otherwise, returns false.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString search string"
                      },
                      {
                        "name": "param",
                        "text": "position If position is undefined, 0 is assumed, so as to search all of the String."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "endsWith": {
                    "name": "endsWith",
                    "global": false,
                    "description": "Returns true if the sequence of elements of searchString converted to a String is the\nsame as the corresponding elements of this object (converted to a String) starting at\nendPosition – length(this). Otherwise returns false.",
                    "tags": [],
                    "required": true,
                    "type": "(searchString: string, endPosition?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, endPosition?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "normalize": {
                    "name": "normalize",
                    "global": false,
                    "description": "Returns the String value result of normalizing the string into the normalization form\nnamed by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "form Applicable values: \"NFC\", \"NFD\", \"NFKC\", or \"NFKD\", If not specified default\nis \"NFC\""
                      },
                      {
                        "name": "param",
                        "text": "form Applicable values: \"NFC\", \"NFD\", \"NFKC\", or \"NFKD\", If not specified default\nis \"NFC\""
                      }
                    ],
                    "required": true,
                    "type": "{ (form: \"NFC\" | \"NFD\" | \"NFKC\" | \"NFKD\"): string; (form?: string | undefined): string; }",
                    "schema": "{ (form: \"NFC\" | \"NFD\" | \"NFKC\" | \"NFKD\"): string; (form?: string | undefined): string; }"
                  },
                  "repeat": {
                    "name": "repeat",
                    "global": false,
                    "description": "Returns a String value that is made from count copies appended together. If count is 0,\nthe empty string is returned.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "count number of copies to append"
                      }
                    ],
                    "required": true,
                    "type": "(count: number) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(count: number): string",
                      "schema": []
                    }
                  },
                  "startsWith": {
                    "name": "startsWith",
                    "global": false,
                    "description": "Returns true if the sequence of elements of searchString converted to a String is the\nsame as the corresponding elements of this object (converted to a String) starting at\nposition. Otherwise returns false.",
                    "tags": [],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "anchor": {
                    "name": "anchor",
                    "global": false,
                    "description": "Returns an `<a>` HTML anchor element and sets the name attribute to the text value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "param",
                        "text": "name"
                      }
                    ],
                    "required": true,
                    "type": "(name: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(name: string): string",
                      "schema": []
                    }
                  },
                  "big": {
                    "name": "big",
                    "global": false,
                    "description": "Returns a `<big>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "blink": {
                    "name": "blink",
                    "global": false,
                    "description": "Returns a `<blink>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "bold": {
                    "name": "bold",
                    "global": false,
                    "description": "Returns a `<b>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "fixed": {
                    "name": "fixed",
                    "global": false,
                    "description": "Returns a `<tt>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "fontcolor": {
                    "name": "fontcolor",
                    "global": false,
                    "description": "Returns a `<font>` HTML element and sets the color attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "(color: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(color: string): string",
                      "schema": []
                    }
                  },
                  "fontsize": {
                    "name": "fontsize",
                    "global": false,
                    "description": "Returns a `<font>` HTML element and sets the size attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "{ (size: number): string; (size: string): string; }",
                    "schema": "{ (size: number): string; (size: string): string; }"
                  },
                  "italics": {
                    "name": "italics",
                    "global": false,
                    "description": "Returns an `<i>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "link": {
                    "name": "link",
                    "global": false,
                    "description": "Returns an `<a>` HTML element and sets the href attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "(url: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(url: string): string",
                      "schema": []
                    }
                  },
                  "small": {
                    "name": "small",
                    "global": false,
                    "description": "Returns a `<small>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "strike": {
                    "name": "strike",
                    "global": false,
                    "description": "Returns a `<strike>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "sub": {
                    "name": "sub",
                    "global": false,
                    "description": "Returns a `<sub>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "sup": {
                    "name": "sup",
                    "global": false,
                    "description": "Returns a `<sup>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "padStart": {
                    "name": "padStart",
                    "global": false,
                    "description": "Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.\nThe padding is applied from the start (left) of the current string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "maxLength The length of the resulting string once the current string has been padded.\nIf this parameter is smaller than the current string's length, the current string will be returned as it is."
                      },
                      {
                        "name": "param",
                        "text": "fillString The string to pad the current string with.\nIf this string is too long, it will be truncated and the left-most part will be applied.\nThe default value for this parameter is \" \" (U+0020)."
                      }
                    ],
                    "required": true,
                    "type": "(maxLength: number, fillString?: string | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(maxLength: number, fillString?: string | undefined): string",
                      "schema": []
                    }
                  },
                  "padEnd": {
                    "name": "padEnd",
                    "global": false,
                    "description": "Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.\nThe padding is applied from the end (right) of the current string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "maxLength The length of the resulting string once the current string has been padded.\nIf this parameter is smaller than the current string's length, the current string will be returned as it is."
                      },
                      {
                        "name": "param",
                        "text": "fillString The string to pad the current string with.\nIf this string is too long, it will be truncated and the left-most part will be applied.\nThe default value for this parameter is \" \" (U+0020)."
                      }
                    ],
                    "required": true,
                    "type": "(maxLength: number, fillString?: string | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(maxLength: number, fillString?: string | undefined): string",
                      "schema": []
                    }
                  },
                  "trimEnd": {
                    "name": "trimEnd",
                    "global": false,
                    "description": "Removes the trailing white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimStart": {
                    "name": "trimStart",
                    "global": false,
                    "description": "Removes the leading white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimLeft": {
                    "name": "trimLeft",
                    "global": false,
                    "description": "Removes the leading white space and line terminator characters from a string.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility. Use `trimStart` instead"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimRight": {
                    "name": "trimRight",
                    "global": false,
                    "description": "Removes the trailing white space and line terminator characters from a string.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility. Use `trimEnd` instead"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "matchAll": {
                    "name": "matchAll",
                    "global": false,
                    "description": "Matches a string with a regular expression, and returns an iterable of matches\ncontaining the results of that search.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp A variable name or string literal containing the regular expression pattern and flags."
                      }
                    ],
                    "required": true,
                    "type": "(regexp: RegExp) => IterableIterator<RegExpMatchArray>",
                    "schema": {
                      "kind": "event",
                      "type": "(regexp: RegExp): IterableIterator<RegExpMatchArray>",
                      "schema": []
                    }
                  },
                  "replaceAll": {
                    "name": "replaceAll",
                    "global": false,
                    "description": "Replace all instances of a substring in a string, using a regular expression or search string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue A string containing the text to replace for every successful match of searchValue in this string."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      }
                    ],
                    "required": true,
                    "type": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; }",
                    "schema": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; }"
                  },
                  "at": {
                    "name": "at",
                    "global": false,
                    "description": "Returns a new String consisting of the single UTF-16 code unit located at the specified index.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "index The zero-based index of the desired code unit. A negative index will count back from the last item."
                      }
                    ],
                    "required": true,
                    "type": "(index: number) => string | undefined",
                    "schema": {
                      "kind": "event",
                      "type": "(index: number): string | undefined",
                      "schema": []
                    }
                  },
                  "__@iterator@644": {
                    "name": "__@iterator@644",
                    "global": false,
                    "description": "Iterator",
                    "tags": [],
                    "required": true,
                    "type": "() => IterableIterator<string>",
                    "schema": {
                      "kind": "event",
                      "type": "(): IterableIterator<string>"
                    }
                  }
                }
              }
            ]
          }
        },
        {
          "name": "rel",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | null | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | null | undefined",
            "schema": [
              "undefined",
              "null",
              "string"
            ]
          }
        },
        {
          "name": "noRel",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "prefetch",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "noPrefetch",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "activeClass",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "exactActiveClass",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "ariaCurrentValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtLoadingIndicator": {
    "export": "default",
    "chunkName": "components/nuxt-loading-indicator",
    "global": false,
    "kebabName": "nuxt-loading-indicator",
    "pascalName": "NuxtLoadingIndicator",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/nuxt-loading-indicator",
    "priority": 10,
    "name": "NuxtLoadingIndicator",
    "filePath": "/node_modules/nuxt/dist/app/components/nuxt-loading-indicator.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/app/components/nuxt-loading-indicator.js",
    "meta": {
      "props": [
        {
          "name": "color",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | boolean | undefined",
            "schema": [
              "undefined",
              "string",
              "false",
              "true"
            ]
          },
          "default": "\"repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)\""
        },
        {
          "name": "throttle",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "200"
        },
        {
          "name": "duration",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "2000"
        },
        {
          "name": "height",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "3"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Icon": {
    "export": "default",
    "chunkName": "components/icon",
    "global": true,
    "kebabName": "icon",
    "pascalName": "Icon",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt-icon/dist/runtime/Icon.vue",
    "priority": 0,
    "name": "Icon",
    "filePath": "/node_modules/nuxt-icon/dist/runtime/Icon.vue",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt-icon/dist/runtime/Icon.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubRepository": {
    "export": "default",
    "chunkName": "components/github-repository",
    "global": true,
    "kebabName": "github-repository",
    "pascalName": "GithubRepository",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubRepository.mjs",
    "priority": 0,
    "name": "GithubRepository",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubRepository.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubRepository.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubLink": {
    "export": "default",
    "chunkName": "components/github-link",
    "global": true,
    "kebabName": "github-link",
    "pascalName": "GithubLink",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubLink.mjs",
    "priority": 0,
    "name": "GithubLink",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubLink.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubLink.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubReadme": {
    "export": "default",
    "chunkName": "components/github-readme",
    "global": true,
    "kebabName": "github-readme",
    "pascalName": "GithubReadme",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubReadme.mjs",
    "priority": 0,
    "name": "GithubReadme",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubReadme.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubReadme.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubReleases": {
    "export": "default",
    "chunkName": "components/github-releases",
    "global": true,
    "kebabName": "github-releases",
    "pascalName": "GithubReleases",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubReleases.mjs",
    "priority": 0,
    "name": "GithubReleases",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubReleases.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubReleases.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubLastRelease": {
    "export": "default",
    "chunkName": "components/github-last-release",
    "global": true,
    "kebabName": "github-last-release",
    "pascalName": "GithubLastRelease",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubLastRelease.mjs",
    "priority": 0,
    "name": "GithubLastRelease",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubLastRelease.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubLastRelease.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubRelease": {
    "export": "default",
    "chunkName": "components/github-release",
    "global": true,
    "kebabName": "github-release",
    "pascalName": "GithubRelease",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubRelease.mjs",
    "priority": 0,
    "name": "GithubRelease",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubRelease.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubRelease.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubContributors": {
    "export": "default",
    "chunkName": "components/github-contributors",
    "global": true,
    "kebabName": "github-contributors",
    "pascalName": "GithubContributors",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubContributors.mjs",
    "priority": 0,
    "name": "GithubContributors",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubContributors.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubContributors.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubFileContributors": {
    "export": "default",
    "chunkName": "components/github-file-contributors",
    "global": true,
    "kebabName": "github-file-contributors",
    "pascalName": "GithubFileContributors",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubFileContributors.mjs",
    "priority": 0,
    "name": "GithubFileContributors",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubFileContributors.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubFileContributors.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "GithubCommits": {
    "export": "default",
    "chunkName": "components/github-commits",
    "global": true,
    "kebabName": "github-commits",
    "pascalName": "GithubCommits",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubCommits.mjs",
    "priority": 0,
    "name": "GithubCommits",
    "filePath": "/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubCommits.mjs",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtlabs/github-module/dist/runtime/components/GithubCommits.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ColorScheme": {
    "export": "default",
    "chunkName": "components/color-scheme",
    "global": false,
    "kebabName": "color-scheme",
    "pascalName": "ColorScheme",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue",
    "priority": 0,
    "name": "ColorScheme",
    "filePath": "/node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtPage": {
    "export": "default",
    "chunkName": "components/nuxt-page",
    "global": false,
    "kebabName": "nuxt-page",
    "pascalName": "NuxtPage",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/pages/runtime/page",
    "priority": 10,
    "name": "NuxtPage",
    "filePath": "/node_modules/nuxt/dist/pages/runtime/page.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/pages/runtime/page.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NoScript": {
    "export": "NoScript",
    "chunkName": "components/no-script",
    "global": false,
    "kebabName": "NoScript",
    "pascalName": "NoScript",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "NoScript",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Link": {
    "export": "Link",
    "chunkName": "components/link",
    "global": false,
    "kebabName": "Link",
    "pascalName": "Link",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "Link",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Base": {
    "export": "Base",
    "chunkName": "components/base",
    "global": false,
    "kebabName": "Base",
    "pascalName": "Base",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "Base",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Title": {
    "export": "Title",
    "chunkName": "components/title",
    "global": false,
    "kebabName": "Title",
    "pascalName": "Title",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "Title",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Meta": {
    "export": "Meta",
    "chunkName": "components/meta",
    "global": false,
    "kebabName": "Meta",
    "pascalName": "Meta",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "Meta",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Style": {
    "export": "Style",
    "chunkName": "components/style",
    "global": false,
    "kebabName": "Style",
    "pascalName": "Style",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "Style",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Head": {
    "export": "Head",
    "chunkName": "components/head",
    "global": false,
    "kebabName": "Head",
    "pascalName": "Head",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "Head",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Html": {
    "export": "Html",
    "chunkName": "components/html",
    "global": false,
    "kebabName": "Html",
    "pascalName": "Html",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "Html",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Body": {
    "export": "Body",
    "chunkName": "components/body",
    "global": false,
    "kebabName": "Body",
    "pascalName": "Body",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components",
    "priority": 10,
    "name": "Body",
    "filePath": "/node_modules/nuxt/dist/head/runtime/components.js",
    "fullPath": "/Users/nathansweb/senthilsweb/templrjs/node_modules/nuxt/dist/head/runtime/components.js",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  }
};

const _CfuwKo = eventHandler(async (event) => {
  const filteredComponents = Object.values(components).filter((c) => c.global).filter((c) => !c.pascalName.startsWith("Content")).filter((c) => !c.pascalName.startsWith("DocumentDriven")).filter((c) => !c.pascalName.startsWith("Markdown")).filter((c) => !c.pascalName.startsWith("Prose")).map(({ pascalName, filePath, meta }) => {
    return {
      name: pascalName,
      path: filePath,
      meta: {
        props: meta.props,
        slots: meta.slots,
        events: meta.events
      }
    };
  });
  const runtimeConfig = useRuntimeConfig();
  const { app, content: { sources, ignores, locales, highlight, navigation, documentDriven, experiment } } = runtimeConfig;
  const appConfigSchema = runtimeConfig?.appConfigSchema;
  let appConfig = {};
  if (appConfigSchema) {
    appConfig = await $fetch.native(joinURL(app.baseURL, "/__app_config.json")).then((r) => r.json());
  }
  const tokensConfigSchema = runtimeConfig?.tokensConfigSchema;
  let tokensConfig;
  if (tokensConfigSchema) {
    tokensConfig = await $fetch.native(joinURL(app.baseURL, "/__tokens_config.json")).then((r) => r.json());
  }
  return {
    version,
    appConfigSchema: appConfigSchema || {},
    appConfig,
    tokensConfigSchema,
    tokensConfig,
    content: { sources, ignores, locales, highlight, navigation, documentDriven, experiment },
    components: filteredComponents
  };
});

const _ag7c5W = defineEventHandler((event) => {
  appendHeader(event, "Access-Control-Allow-Origin", "*");
  const componentName = event.context.params["component?"];
  if (componentName) {
    const meta = components[pascalCase(componentName)];
    if (!meta) {
      throw createError({
        statusMessage: "Components not found!",
        statusCode: 404,
        data: {
          description: "Please make sure you are looking for correct component"
        }
      });
    }
    return meta;
  }
  return components;
});

function jsonParse(value) {
  return JSON.parse(value, regExpReviver);
}
function regExpReviver(_key, value) {
  const withOperator = typeof value === "string" && value.match(/^--([A-Z]+) (.+)$/) || [];
  if (withOperator[1] === "REGEX") {
    const regex = withOperator[2].match(/\/(.*)\/([dgimsuy]*)$/);
    return regex ? new RegExp(regex[1], regex[2] || "") : value;
  }
  return value;
}

const parseJSONQueryParams = (body) => {
  try {
    return jsonParse(body);
  } catch (e) {
    throw createError({ statusCode: 400, message: "Invalid _params query" });
  }
};
const decodeQueryParams = (encoded) => {
  encoded = encoded.replace(/\//g, "");
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  encoded = encoded.padEnd(encoded.length + (4 - encoded.length % 4) % 4, "=");
  return parseJSONQueryParams(typeof Buffer !== "undefined" ? Buffer.from(encoded, "base64").toString() : atob(encoded));
};
const memory = {};
const getContentQuery = (event) => {
  const { params } = event.context.params || {};
  if (params) {
    return decodeQueryParams(params.replace(/.json$/, ""));
  }
  const qid = event.context.params?.qid?.replace(/.json$/, "");
  const query = getQuery(event) || {};
  if (qid && query._params) {
    memory[qid] = parseJSONQueryParams(decodeURIComponent(query._params));
    if (memory[qid].where && !Array.isArray(memory[qid].where)) {
      memory[qid].where = [memory[qid].where];
    }
    return memory[qid];
  }
  if (qid && memory[qid]) {
    return memory[qid];
  }
  if (query._params) {
    return parseJSONQueryParams(decodeURIComponent(query._params));
  }
  if (typeof query.only === "string" && query.only.includes(",")) {
    query.only = query.only.split(",").map((s) => s.trim());
  }
  if (typeof query.without === "string" && query.without.includes(",")) {
    query.without = query.without.split(",").map((s) => s.trim());
  }
  const where = query.where || {};
  for (const key of ["draft", "partial", "empty"]) {
    if (query[key] && ["true", "false"].includes(query[key])) {
      where[key] = query[key] === "true";
      delete query[key];
    }
  }
  if (query.sort) {
    query.sort = String(query.sort).split(",").map((s) => {
      const [key, order] = s.split(":");
      return [key, +order];
    });
  }
  const reservedKeys = ["partial", "draft", "only", "without", "where", "sort", "limit", "skip"];
  for (const key of Object.keys(query)) {
    if (reservedKeys.includes(key)) {
      continue;
    }
    query.where = query.where || {};
    query.where[key] = query[key];
  }
  if (Object.keys(where).length > 0) {
    query.where = [where];
  } else {
    delete query.where;
  }
  return query;
};

const _knh9dr = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (query.first) {
    const content = await serverQueryContent(event, query).findOne();
    const path = content?._path || query.where?.find((w) => w._path)?._path;
    if (path) {
      const _dir = await serverQueryContent(event).where({ _path: join(path, "_dir") }).without("_").findOne();
      if (_dir && !Array.isArray(_dir)) {
        return {
          _path: path,
          ...content || {},
          _dir
        };
      }
    }
    if (!content) {
      throw createError({
        statusMessage: "Document not found!",
        statusCode: 404,
        data: {
          description: "Could not find document for the given query.",
          query
        }
      });
    }
    return content;
  }
  const contents = await serverQueryContent(event, query).find();
  return contents;
});

const _UB01uI = defineEventHandler(async (event) => {
  const { content } = useRuntimeConfig();
  const now = Date.now();
  const contents = await serverQueryContent(event).find();
  await getContentIndex(event);
  const navigation = await $fetch(`${content.api.baseURL}/navigation`);
  await cacheStorage.setItem("content-navigation.json", navigation);
  return {
    generatedAt: now,
    generateTime: Date.now() - now,
    contents,
    navigation
  };
});

function createNav(contents, configs) {
  const { navigation } = useRuntimeConfig().content;
  const pickNavigationFields = (content) => ({
    ...pick(["title", ...navigation.fields])(content),
    ...isObject(content?.navigation) ? content.navigation : {}
  });
  const nav = contents.sort((a, b) => a._path.localeCompare(b._path)).reduce((nav2, content) => {
    const parts = content._path.substring(1).split("/");
    const idParts = content._id.split(":").slice(1);
    const isIndex = !!idParts[idParts.length - 1].match(/([1-9][0-9]*\.)?index.md/g);
    const getNavItem = (content2) => ({
      title: content2.title,
      _path: content2._path,
      _file: content2._file,
      children: [],
      ...pickNavigationFields(content2),
      ...content2._draft ? { _draft: true } : {}
    });
    const navItem = getNavItem(content);
    if (isIndex) {
      const dirConfig = configs[navItem._path];
      if (typeof dirConfig?.navigation !== "undefined" && !dirConfig?.navigation) {
        return nav2;
      }
      if (content._path !== "/") {
        const indexItem = getNavItem(content);
        navItem.children.push(indexItem);
      }
      Object.assign(
        navItem,
        pickNavigationFields(dirConfig)
      );
    }
    if (parts.length === 1) {
      nav2.push(navItem);
      return nav2;
    }
    const siblings = parts.slice(0, -1).reduce((nodes, part, i) => {
      const currentPathPart = "/" + parts.slice(0, i + 1).join("/");
      const conf = configs[currentPathPart];
      if (typeof conf?.navigation !== "undefined" && !conf.navigation) {
        return [];
      }
      let parent = nodes.find((n) => n._path === currentPathPart);
      if (!parent) {
        parent = {
          title: generateTitle(part),
          _path: currentPathPart,
          _file: content._file,
          children: [],
          ...pickNavigationFields(conf)
        };
        nodes.push(parent);
      }
      return parent.children;
    }, nav2);
    siblings.push(navItem);
    return nav2;
  }, []);
  return sortAndClear(nav);
}
const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function sortAndClear(nav) {
  const sorted = nav.sort((a, b) => collator.compare(a._file, b._file));
  for (const item of sorted) {
    if (item.children?.length) {
      sortAndClear(item.children);
    } else {
      delete item.children;
    }
    delete item._file;
  }
  return nav;
}
function pick(keys) {
  return (obj) => {
    obj = obj || {};
    if (keys && keys.length) {
      return keys.filter((key) => typeof obj[key] !== "undefined").reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
    }
    return obj;
  };
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

const _LSOa8F = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (!isPreview(event) && Object.keys(query).length === 0) {
    const cache = await cacheStorage.getItem("content-navigation.json");
    if (cache) {
      return cache;
    }
  }
  const contents = await serverQueryContent(event, query).where({
    /**
     * Partial contents are not included in the navigation
     * A partial content is a content that has `_` prefix in its path
     */
    _partial: false,
    /**
     * Exclude any pages which have opted out of navigation via frontmatter.
     */
    navigation: {
      $ne: false
    }
  }).find();
  const dirConfigs = await serverQueryContent(event).where({ _path: /\/_dir$/i, _partial: true }).find();
  const configs = dirConfigs.reduce((configs2, conf) => {
    if (conf.title?.toLowerCase() === "dir") {
      conf.title = void 0;
    }
    const key = conf._path.split("/").slice(0, -1).join("/") || "/";
    configs2[key] = {
      ...conf,
      // Extract meta from body. (non MD files)
      ...conf.body
    };
    return configs2;
  }, {});
  return createNav(contents, configs);
});

const _lazy_B4DfyE = () => import('../_id_.delete.mjs');
const _lazy_rWntho = () => import('../_id_.put.mjs');
const _lazy_W1ZSVV = () => import('../_id_.mjs');
const _lazy_CPnm1Q = () => import('../create.post.mjs');
const _lazy_Is4gfQ = () => import('../index.mjs');
const _lazy_p5Vkc8 = () => import('../signin.post.mjs');
const _lazy_cbbJRf = () => import('../signup.post.mjs');
const _lazy_lREGC7 = () => import('../_id_.delete2.mjs');
const _lazy_euIOFh = () => import('../_id_.put2.mjs');
const _lazy_jzlixU = () => import('../_id_2.mjs');
const _lazy_uHHfbW = () => import('../create.post2.mjs');
const _lazy_Jkh6Ux = () => import('../index.get.mjs');
const _lazy_eG7Mx3 = () => import('../_id_.delete3.mjs');
const _lazy_EWvNbT = () => import('../_id_.put3.mjs');
const _lazy_fjeY66 = () => import('../_id_3.mjs');
const _lazy_OXWtbh = () => import('../create.post3.mjs');
const _lazy_8NfMvP = () => import('../index2.mjs');
const _lazy_TbDijo = () => import('../_slug_.get.mjs');
const _lazy_eY7PUU = () => import('../_slug_.put.mjs');
const _lazy_TcQUFn = () => import('../_id_.delete4.mjs');
const _lazy_jMMtjX = () => import('../_id_.put4.mjs');
const _lazy_dFDiGw = () => import('../_id_4.mjs');
const _lazy_uVd5kR = () => import('../create.post4.mjs');
const _lazy_4YyQXA = () => import('../index.get2.mjs');
const _lazy_zoLb1X = () => import('../_id_.delete5.mjs');
const _lazy_FrzJvk = () => import('../_id_.put5.mjs');
const _lazy_IO3NNW = () => import('../_id_5.mjs');
const _lazy_lxKLmq = () => import('../create.post5.mjs');
const _lazy_QJ1rsa = () => import('../index3.mjs');
const _lazy_9bSalm = () => import('../_id_.delete6.mjs');
const _lazy_grQMEP = () => import('../_id_.put6.mjs');
const _lazy_jy0zp0 = () => import('../_id_6.mjs');
const _lazy_Xv4grM = () => import('../create.post6.mjs');
const _lazy_u62oSR = () => import('../index.get3.mjs');
const _lazy_UX1sE1 = () => import('../_id_.delete7.mjs');
const _lazy_1lIY1A = () => import('../_id_.put7.mjs');
const _lazy_6hF4q5 = () => import('../_id_7.mjs');
const _lazy_E6XldI = () => import('../create.post7.mjs');
const _lazy_P5aqiV = () => import('../index4.mjs');
const _lazy_6Voph8 = () => import('../image2base64.post.mjs');
const _lazy_3rBd4Q = () => import('../word.post.mjs');
const _lazy_LmpbJA = () => import('../_id_.delete8.mjs');
const _lazy_4sg5p5 = () => import('../_id_.put8.mjs');
const _lazy_1IENH2 = () => import('../_id_8.mjs');
const _lazy_YYbuqD = () => import('../create.post8.mjs');
const _lazy_AAusP3 = () => import('../index.get4.mjs');
const _lazy_fKVMje = () => import('../_id_.delete9.mjs');
const _lazy_LCBSdK = () => import('../_id_.put9.mjs');
const _lazy_02cMxq = () => import('../_id_9.mjs');
const _lazy_Sm09Pv = () => import('../create.post9.mjs');
const _lazy_FxuKVz = () => import('../index.get5.mjs');
const _lazy_0jiqrZ = () => import('../_id_.delete10.mjs');
const _lazy_SlHknk = () => import('../_id_.put10.mjs');
const _lazy_5J6JnN = () => import('../_id_10.mjs');
const _lazy_NsN8HA = () => import('../create.post10.mjs');
const _lazy_f4b7WY = () => import('../index.get6.mjs');
const _lazy_sNVzAq = () => import('../aggregate.post.mjs');
const _lazy_YC8ChO = () => import('../execute.post.mjs');
const _lazy_12kJNV = () => import('../_id_.delete11.mjs');
const _lazy_jdulbp = () => import('../_id_.put11.mjs');
const _lazy_eHYziT = () => import('../_id_11.mjs');
const _lazy_ubFy0M = () => import('../create.post11.mjs');
const _lazy_q46I9i = () => import('../index.get7.mjs');
const _lazy_NfF8PT = () => import('../menu.get.mjs');
const _lazy_TEkERE = () => import('../_id_.delete12.mjs');
const _lazy_hPraCb = () => import('../_id_.put12.mjs');
const _lazy_2nKodq = () => import('../_id_12.mjs');
const _lazy_t1owuv = () => import('../create.post12.mjs');
const _lazy_9HXbt1 = () => import('../index5.mjs');
const _lazy_TpDpna = () => import('../email.mjs');
const _lazy_TsgRLz = () => import('../email2.mjs');
const _lazy_0SbWBM = () => import('../image2base64.get.mjs');
const _lazy_eJEFG0 = () => import('../index.get8.mjs');
const _lazy_28tckW = () => import('../scrape.post.mjs');
const _lazy_vuXUa9 = () => import('../navigation_child.get.mjs');
const _lazy_w8nYhB = () => import('../navigation_parent.get.mjs');
const _lazy_Yj41lK = () => import('../navigation.get.mjs');
const _lazy_yUSEG3 = () => import('../_id_.delete13.mjs');
const _lazy_LVBDvw = () => import('../_id_.put13.mjs');
const _lazy_Ta4dHm = () => import('../_id_13.mjs');
const _lazy_g4xxNn = () => import('../create.post13.mjs');
const _lazy_f77EIM = () => import('../index.get9.mjs');
const _lazy_UwJKav = () => import('../_id_.delete14.mjs');
const _lazy_Ggt3J4 = () => import('../_id_.put14.mjs');
const _lazy_xVR8eB = () => import('../_id_14.mjs');
const _lazy_TrW7wA = () => import('../create.post14.mjs');
const _lazy_V5Iqww = () => import('../index.get10.mjs');
const _lazy_x3Duhc = () => import('../_id_.delete15.mjs');
const _lazy_iZdlOP = () => import('../_id_.put15.mjs');
const _lazy_YIPCl7 = () => import('../_id_15.mjs');
const _lazy_CeBRBU = () => import('../create.post15.mjs');
const _lazy_b2EnZJ = () => import('../index6.mjs');
const _lazy_x8TZc3 = () => import('../_id_16.mjs');
const _lazy_kaWsEr = () => import('../_id_.delete16.mjs');
const _lazy_UDpsS5 = () => import('../_id_.put16.mjs');
const _lazy_9bkFsC = () => import('../_id_17.mjs');
const _lazy_auhGuq = () => import('../create.post16.mjs');
const _lazy_WvjWYL = () => import('../index.get11.mjs');
const _lazy_bYcPvJ = () => import('../_id_.delete17.mjs');
const _lazy_zGdPA5 = () => import('../_id_.put17.mjs');
const _lazy_nisIYK = () => import('../_id_18.mjs');
const _lazy_yEyzsJ = () => import('../create.post17.mjs');
const _lazy_3pgacE = () => import('../index.get12.mjs');
const _lazy_bNgDzE = () => import('../_id_.post.mjs');
const _lazy_uIWeS0 = () => import('../avatar.post.mjs');
const _lazy_6Aul77 = () => import('../logo.post.mjs');
const _lazy_6ehyuV = () => import('../signup.post2.mjs');
const _lazy_9JkOny = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _0zzkFl, lazy: false, middleware: true, method: undefined },
  { route: '/api/account/:id', handler: _lazy_B4DfyE, lazy: true, middleware: false, method: "delete" },
  { route: '/api/account/:id', handler: _lazy_rWntho, lazy: true, middleware: false, method: "put" },
  { route: '/api/account/:id', handler: _lazy_W1ZSVV, lazy: true, middleware: false, method: undefined },
  { route: '/api/account/create', handler: _lazy_CPnm1Q, lazy: true, middleware: false, method: "post" },
  { route: '/api/account', handler: _lazy_Is4gfQ, lazy: true, middleware: false, method: undefined },
  { route: '/api/account/signin', handler: _lazy_p5Vkc8, lazy: true, middleware: false, method: "post" },
  { route: '/api/account/signup', handler: _lazy_cbbJRf, lazy: true, middleware: false, method: "post" },
  { route: '/api/applications/:id', handler: _lazy_lREGC7, lazy: true, middleware: false, method: "delete" },
  { route: '/api/applications/:id', handler: _lazy_euIOFh, lazy: true, middleware: false, method: "put" },
  { route: '/api/applications/:id', handler: _lazy_jzlixU, lazy: true, middleware: false, method: undefined },
  { route: '/api/applications/create', handler: _lazy_uHHfbW, lazy: true, middleware: false, method: "post" },
  { route: '/api/applications', handler: _lazy_Jkh6Ux, lazy: true, middleware: false, method: "get" },
  { route: '/api/clients/:id', handler: _lazy_eG7Mx3, lazy: true, middleware: false, method: "delete" },
  { route: '/api/clients/:id', handler: _lazy_EWvNbT, lazy: true, middleware: false, method: "put" },
  { route: '/api/clients/:id', handler: _lazy_fjeY66, lazy: true, middleware: false, method: undefined },
  { route: '/api/clients/create', handler: _lazy_OXWtbh, lazy: true, middleware: false, method: "post" },
  { route: '/api/clients', handler: _lazy_8NfMvP, lazy: true, middleware: false, method: undefined },
  { route: '/api/cms/:slug', handler: _lazy_TbDijo, lazy: true, middleware: false, method: "get" },
  { route: '/api/cms/:slug', handler: _lazy_eY7PUU, lazy: true, middleware: false, method: "put" },
  { route: '/api/company/:id', handler: _lazy_TcQUFn, lazy: true, middleware: false, method: "delete" },
  { route: '/api/company/:id', handler: _lazy_jMMtjX, lazy: true, middleware: false, method: "put" },
  { route: '/api/company/:id', handler: _lazy_dFDiGw, lazy: true, middleware: false, method: undefined },
  { route: '/api/company/create', handler: _lazy_uVd5kR, lazy: true, middleware: false, method: "post" },
  { route: '/api/company', handler: _lazy_4YyQXA, lazy: true, middleware: false, method: "get" },
  { route: '/api/configurations/:id', handler: _lazy_zoLb1X, lazy: true, middleware: false, method: "delete" },
  { route: '/api/configurations/:id', handler: _lazy_FrzJvk, lazy: true, middleware: false, method: "put" },
  { route: '/api/configurations/:id', handler: _lazy_IO3NNW, lazy: true, middleware: false, method: undefined },
  { route: '/api/configurations/create', handler: _lazy_lxKLmq, lazy: true, middleware: false, method: "post" },
  { route: '/api/configurations', handler: _lazy_QJ1rsa, lazy: true, middleware: false, method: undefined },
  { route: '/api/country/:id', handler: _lazy_9bSalm, lazy: true, middleware: false, method: "delete" },
  { route: '/api/country/:id', handler: _lazy_grQMEP, lazy: true, middleware: false, method: "put" },
  { route: '/api/country/:id', handler: _lazy_jy0zp0, lazy: true, middleware: false, method: undefined },
  { route: '/api/country/create', handler: _lazy_Xv4grM, lazy: true, middleware: false, method: "post" },
  { route: '/api/country', handler: _lazy_u62oSR, lazy: true, middleware: false, method: "get" },
  { route: '/api/departments/:id', handler: _lazy_UX1sE1, lazy: true, middleware: false, method: "delete" },
  { route: '/api/departments/:id', handler: _lazy_1lIY1A, lazy: true, middleware: false, method: "put" },
  { route: '/api/departments/:id', handler: _lazy_6hF4q5, lazy: true, middleware: false, method: undefined },
  { route: '/api/departments/create', handler: _lazy_E6XldI, lazy: true, middleware: false, method: "post" },
  { route: '/api/departments', handler: _lazy_P5aqiV, lazy: true, middleware: false, method: undefined },
  { route: '/api/export/image2base64', handler: _lazy_6Voph8, lazy: true, middleware: false, method: "post" },
  { route: '/api/export/word', handler: _lazy_3rBd4Q, lazy: true, middleware: false, method: "post" },
  { route: '/api/gateway_frequency/:id', handler: _lazy_LmpbJA, lazy: true, middleware: false, method: "delete" },
  { route: '/api/gateway_frequency/:id', handler: _lazy_4sg5p5, lazy: true, middleware: false, method: "put" },
  { route: '/api/gateway_frequency/:id', handler: _lazy_1IENH2, lazy: true, middleware: false, method: undefined },
  { route: '/api/gateway_frequency/create', handler: _lazy_YYbuqD, lazy: true, middleware: false, method: "post" },
  { route: '/api/gateway_frequency', handler: _lazy_AAusP3, lazy: true, middleware: false, method: "get" },
  { route: '/api/gateway/:id', handler: _lazy_fKVMje, lazy: true, middleware: false, method: "delete" },
  { route: '/api/gateway/:id', handler: _lazy_LCBSdK, lazy: true, middleware: false, method: "put" },
  { route: '/api/gateway/:id', handler: _lazy_02cMxq, lazy: true, middleware: false, method: undefined },
  { route: '/api/gateway/create', handler: _lazy_Sm09Pv, lazy: true, middleware: false, method: "post" },
  { route: '/api/gateway', handler: _lazy_FxuKVz, lazy: true, middleware: false, method: "get" },
  { route: '/api/inquiries/:id', handler: _lazy_0jiqrZ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/inquiries/:id', handler: _lazy_SlHknk, lazy: true, middleware: false, method: "put" },
  { route: '/api/inquiries/:id', handler: _lazy_5J6JnN, lazy: true, middleware: false, method: undefined },
  { route: '/api/inquiries/create', handler: _lazy_NsN8HA, lazy: true, middleware: false, method: "post" },
  { route: '/api/inquiries', handler: _lazy_f4b7WY, lazy: true, middleware: false, method: "get" },
  { route: '/api/mongodb/query/aggregate', handler: _lazy_sNVzAq, lazy: true, middleware: false, method: "post" },
  { route: '/api/mongodb/query/execute', handler: _lazy_YC8ChO, lazy: true, middleware: false, method: "post" },
  { route: '/api/nav/:id', handler: _lazy_12kJNV, lazy: true, middleware: false, method: "delete" },
  { route: '/api/nav/:id', handler: _lazy_jdulbp, lazy: true, middleware: false, method: "put" },
  { route: '/api/nav/:id', handler: _lazy_eHYziT, lazy: true, middleware: false, method: undefined },
  { route: '/api/nav/create', handler: _lazy_ubFy0M, lazy: true, middleware: false, method: "post" },
  { route: '/api/nav', handler: _lazy_q46I9i, lazy: true, middleware: false, method: "get" },
  { route: '/api/nav/menu', handler: _lazy_NfF8PT, lazy: true, middleware: false, method: "get" },
  { route: '/api/navigations/:id', handler: _lazy_TEkERE, lazy: true, middleware: false, method: "delete" },
  { route: '/api/navigations/:id', handler: _lazy_hPraCb, lazy: true, middleware: false, method: "put" },
  { route: '/api/navigations/:id', handler: _lazy_2nKodq, lazy: true, middleware: false, method: undefined },
  { route: '/api/navigations/create', handler: _lazy_t1owuv, lazy: true, middleware: false, method: "post" },
  { route: '/api/navigations', handler: _lazy_9HXbt1, lazy: true, middleware: false, method: undefined },
  { route: '/api/notification/cloudflare/email', handler: _lazy_TpDpna, lazy: true, middleware: false, method: undefined },
  { route: '/api/notification/sendgrid/email', handler: _lazy_TsgRLz, lazy: true, middleware: false, method: undefined },
  { route: '/api/postgres/instagram/image2base64', handler: _lazy_0SbWBM, lazy: true, middleware: false, method: "get" },
  { route: '/api/postgres/instagram', handler: _lazy_eJEFG0, lazy: true, middleware: false, method: "get" },
  { route: '/api/postgres/instagram/scrape', handler: _lazy_28tckW, lazy: true, middleware: false, method: "post" },
  { route: '/api/postgres/navigation_child', handler: _lazy_vuXUa9, lazy: true, middleware: false, method: "get" },
  { route: '/api/postgres/navigation_parent', handler: _lazy_w8nYhB, lazy: true, middleware: false, method: "get" },
  { route: '/api/postgres/navigation', handler: _lazy_Yj41lK, lazy: true, middleware: false, method: "get" },
  { route: '/api/profiles/:id', handler: _lazy_yUSEG3, lazy: true, middleware: false, method: "delete" },
  { route: '/api/profiles/:id', handler: _lazy_LVBDvw, lazy: true, middleware: false, method: "put" },
  { route: '/api/profiles/:id', handler: _lazy_Ta4dHm, lazy: true, middleware: false, method: undefined },
  { route: '/api/profiles/create', handler: _lazy_g4xxNn, lazy: true, middleware: false, method: "post" },
  { route: '/api/profiles', handler: _lazy_f77EIM, lazy: true, middleware: false, method: "get" },
  { route: '/api/properties/:id', handler: _lazy_UwJKav, lazy: true, middleware: false, method: "delete" },
  { route: '/api/properties/:id', handler: _lazy_Ggt3J4, lazy: true, middleware: false, method: "put" },
  { route: '/api/properties/:id', handler: _lazy_xVR8eB, lazy: true, middleware: false, method: undefined },
  { route: '/api/properties/create', handler: _lazy_TrW7wA, lazy: true, middleware: false, method: "post" },
  { route: '/api/properties', handler: _lazy_V5Iqww, lazy: true, middleware: false, method: "get" },
  { route: '/api/roles/:id', handler: _lazy_x3Duhc, lazy: true, middleware: false, method: "delete" },
  { route: '/api/roles/:id', handler: _lazy_iZdlOP, lazy: true, middleware: false, method: "put" },
  { route: '/api/roles/:id', handler: _lazy_YIPCl7, lazy: true, middleware: false, method: undefined },
  { route: '/api/roles/create', handler: _lazy_CeBRBU, lazy: true, middleware: false, method: "post" },
  { route: '/api/roles', handler: _lazy_b2EnZJ, lazy: true, middleware: false, method: undefined },
  { route: '/api/storage/:id', handler: _lazy_x8TZc3, lazy: true, middleware: false, method: undefined },
  { route: '/api/supabase/registration/:id', handler: _lazy_kaWsEr, lazy: true, middleware: false, method: "delete" },
  { route: '/api/supabase/registration/:id', handler: _lazy_UDpsS5, lazy: true, middleware: false, method: "put" },
  { route: '/api/supabase/registration/:id', handler: _lazy_9bkFsC, lazy: true, middleware: false, method: undefined },
  { route: '/api/supabase/registration/create', handler: _lazy_auhGuq, lazy: true, middleware: false, method: "post" },
  { route: '/api/supabase/registration', handler: _lazy_WvjWYL, lazy: true, middleware: false, method: "get" },
  { route: '/api/things/applications/:id', handler: _lazy_bYcPvJ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/things/applications/:id', handler: _lazy_zGdPA5, lazy: true, middleware: false, method: "put" },
  { route: '/api/things/applications/:id', handler: _lazy_nisIYK, lazy: true, middleware: false, method: undefined },
  { route: '/api/things/applications/create', handler: _lazy_yEyzsJ, lazy: true, middleware: false, method: "post" },
  { route: '/api/things/applications', handler: _lazy_3pgacE, lazy: true, middleware: false, method: "get" },
  { route: '/api/upload/:id', handler: _lazy_bNgDzE, lazy: true, middleware: false, method: "post" },
  { route: '/api/upload/avatar', handler: _lazy_uIWeS0, lazy: true, middleware: false, method: "post" },
  { route: '/api/upload/logo', handler: _lazy_6Aul77, lazy: true, middleware: false, method: "post" },
  { route: '/api/users/signup', handler: _lazy_6ehyuV, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_9JkOny, lazy: true, middleware: false, method: undefined },
  { route: '/api/_github/repository', handler: _2KggeI, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/repository/:query', handler: _2KggeI, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/readme', handler: _0ciJvO, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/readme/:query', handler: _0ciJvO, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/releases', handler: _oKef6Q, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/releases/:query', handler: _oKef6Q, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/contributors', handler: _iRciH8, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/contributors/:query', handler: _iRciH8, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/contributors/file', handler: _twuXZl, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/contributors/file/:query', handler: _twuXZl, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/commits', handler: _5eULYJ, lazy: false, middleware: false, method: undefined },
  { route: '/api/_github/commits/:query', handler: _5eULYJ, lazy: false, middleware: false, method: undefined },
  { route: '/api/_supabase/session', handler: _daWlwH, lazy: false, middleware: false, method: undefined },
  { route: '/__studio.json', handler: _CfuwKo, lazy: false, middleware: false, method: "get" },
  { route: '/api/component-meta', handler: _ag7c5W, lazy: false, middleware: false, method: "get" },
  { route: '/api/component-meta/:component?', handler: _ag7c5W, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query/:qid/**:params', handler: _knh9dr, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query/:qid', handler: _knh9dr, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query', handler: _knh9dr, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/cache.1682373264351.json', handler: _UB01uI, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid/**:params', handler: _LSOa8F, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid', handler: _LSOa8F, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation', handler: _LSOa8F, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_9JkOny, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { readRawBody as a, useRuntimeConfig as b, setResponseStatus as c, defineEventHandler as d, eventHandler as e, useNitroApp as f, getQuery as g, createError as h, getRouteRules as i, sendRedirect as j, appendHeader as k, nodeServer as n, readBody as r, sendStream as s, useStorage as u };
