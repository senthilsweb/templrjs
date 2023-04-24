import { _ as __nuxt_component_0 } from './layout-87b4d106.mjs';
import { _ as __nuxt_component_1 } from './Logo-d1137ce0.mjs';
import { J as useSupabaseAuthClient, C as useSupabaseUser, d as useNuxtApp } from '../server.mjs';
import { ref, mergeProps, withCtx, createVNode, openBlock, createBlock, createTextVNode, createCommentVNode, withModifiers, withDirectives, vModelText, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import 'vue-router';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'ufo';
import 'radix3';
import 'cookie-es';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'defu';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/cloudflare-kv-http';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'node:fs';
import 'node:url';
import 'pathe';
import '@octokit/graphql';
import 'remark-github';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'slugify';
import 'unist-util-position';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';
import 'nanoid';
import '@supabase/supabase-js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/localeData.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'mitt';
import 'vue-i18n';
import 'underscore.string';
import 'lodash-es';

const __default__ = {
  components: {},
  data() {
    return {
      error: null,
      forgotPassword: false,
      formSignUp: false,
      formSignIn: true
    };
  },
  methods: {
    handleForgotPassword() {
      this.formSignIn = false;
      this.formSignUp = false;
      this.forgotPassword = !this.forgotPassword;
    },
    handleSignUpClick() {
      this.forgotPassword = false;
      this.formSignIn = false;
      this.formSignUp = !this.formSignUp;
    },
    handleSignInClick() {
      this.forgotPassword = false;
      this.formSignIn = !this.formSignIn;
      this.formSignUp = false;
    }
  },
  mounted() {
  },
  created() {
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const client = useSupabaseAuthClient();
    useSupabaseUser();
    const data = ref({});
    const email = ref("");
    ref("");
    const login = async () => {
      const { user, error } = await client.auth.signInWithPassword({
        email: data.value.email,
        password: data.value.password
      }, {
        //redirectTo: "/account/" + useSupabaseUser().value.email,
      });
      if (error) {
        useNuxtApp().$toast.show({ type: "danger", message: `${error.message}`, timeout: 6 });
      }
    };
    console.log("login=" + JSON.stringify(login));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_IconLogo = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "login" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:mx-auto sm:w-full sm:max-w-md py-40 ml-10"${_scopeId}><div class="object-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_IconLogo, null, null, _parent2, _scopeId));
            _push2(`</div><h2 class="mt-6 text-center text-2xl font-normal bg-clip-text"${_scopeId}> Login in to your account</h2><p${_scopeId}></p>`);
            if (_ctx.forgotPassword) {
              _push2(`<p class="mt-2 text-center text-sm text-gray-600 max-w"${_scopeId}> Go back to <a href="#" class="font-medium text-primary-500 hover:text-primary-600"${_scopeId}> Sign in </a></p>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.formSignUp) {
              _push2(`<p class="mt-2 text-center text-sm text-gray-600 max-w"${_scopeId}> Go back to <a href="#" class="font-medium text-primary-500 hover:text-primary-600"${_scopeId}> Sign in </a></p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="pt-6"${_scopeId}><div class="sm:mx-auto sm:w-full sm:max-w-md"${_scopeId}><div class="px-4 sm:rounded-lg sm:px-10"${_scopeId}>`);
            if (_ctx.formSignIn) {
              _push2(`<form${_scopeId}><input type="hidden" name="remember" value="true"${_scopeId}><div class="rounded-md shadow-sm"${_scopeId}><div${_scopeId}><input${ssrRenderAttr("value", data.value.email)} aria-label="Email address" name="email" type="email" required class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300" placeholder="Email address"${_scopeId}></div><div class="-mt-px"${_scopeId}><input${ssrRenderAttr("value", data.value.password)} aria-label="Password" name="password" type="password" required class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300" placeholder="Password"${_scopeId}></div></div><div class="mt-6 flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><input id="remember_me" type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"${_scopeId}><label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900"${_scopeId}> Remember me </label></div><div class="text-sm leading-5"${_scopeId}><a href="#" class="font-medium text-primary-500 hover:text-primary-600 focus:outline-none focus:underline transition ease-in-out duration-150"${_scopeId}> Forgot your password? </a></div></div><div class="mt-6"${_scopeId}><button id="btnSignIn" name="btnSignIn" type="submit" class="${ssrRenderClass(["zyn-button zyn-login-button zyn-button-contrast", "w-full"])}"${_scopeId}><span class="absolute left-0 inset-y-0 flex items-center pl-3"${_scopeId}><svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"${_scopeId}></path></svg></span> Sign in </button></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.formSignUp) {
              _push2(`<form class="space-y-4"${_scopeId}><div class="mt-10 flex items-center justify-center"${_scopeId}><div class="flex items-center"${_scopeId}><label class="ml-2 block text-sm leading-5 text-red-900"${_scopeId}>${ssrInterpolate(_ctx.error)}</label></div>`);
              if (!_ctx.notSamePassword) {
                _push2(`<div class="flex items-center"${_scopeId}><label class="ml-2 block text-sm leading-5 text-red-900"${_scopeId}><p${_scopeId}>Passwords don&#39;t match.</p></label></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="sm:col-span-6"${_scopeId}><label for="email" class="block text-sm font-medium text-gray-700"${_scopeId}> Email </label><div class="mt-1 rounded-md shadow-sm"${_scopeId}><input${ssrRenderAttr("value", data.value.email)} type="text" id="email" name="email" autocomplete="email" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" required${_scopeId}></div></div><div class="sm:col-span-6"${_scopeId}><label for="phone" class="block text-sm font-medium text-gray-700"${_scopeId}> Phone </label><div class="mt-1 rounded-md shadow-sm"${_scopeId}><input${ssrRenderAttr("value", data.value.phone)} type="text" id="phone" name="phone" autocomplete="phone" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" required${_scopeId}></div></div><div class="sm:col-span-6"${_scopeId}><label for="password" class="block text-sm font-medium text-gray-700"${_scopeId}> Password </label><div class="mt-1 rounded-md shadow-sm"${_scopeId}><input${ssrRenderAttr("value", data.value.password)} type="password" id="password" name="password" autocomplete="password" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" required${_scopeId}></div></div><div class="sm:col-span-6"${_scopeId}><label for="confirm_password" class="block text-sm font-medium text-gray-700"${_scopeId}> Confirm Password </label><div class="mt-1 rounded-md shadow-sm"${_scopeId}><input${ssrRenderAttr("value", data.value.confirm_password)} type="password" id="confirm_password" name="confirm_password" autocomplete="confirm_password" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" required${_scopeId}></div></div><div class="mt-6 flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><input id="terms" type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" required${_scopeId}><label for="terms" class="ml-2 block text-sm leading-5 text-gray-900"${_scopeId}> I agree to <a href="/legal/tc" class="font-medium text-primary-900 hover:text-primary-700 focus:outline-none focus:underline transition ease-in-out duration-150"${_scopeId}> terms &amp; conditions. </a></label></div></div><div class="mt-6"${_scopeId}><button id="btnSignUp" name="btnSignUp" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-primary-900 hover:bg-primary-500 focus:outline-none focus:border-primary-900 focus:shadow-outline-primary active:bg-primary-900 transition duration-150 ease-in-out"${_scopeId}>Sign Up</button></div><div class="mt-6"${_scopeId}><button id="btnReset" name="btnReset" type="reset" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"${_scopeId}>Reset</button></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.forgotPassword) {
              _push2(`<form${_scopeId}><div class="mt-10 flex items-center justify-center"${_scopeId}><div class="flex items-center"${_scopeId}><label class="ml-2 block text-sm leading-5 text-red-900"${_scopeId}>${ssrInterpolate(_ctx.error)}</label></div></div><div class="sm:col-span-6"${_scopeId}><div class="mt-1 rounded-md shadow-sm"${_scopeId}><input${ssrRenderAttr("value", email.value)} placeholder="Email address" aria-label="Email address" type="text" id="f_email" name="f_email" autocomplete="f_email" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"${_scopeId}></div></div><div class="mt-6"${_scopeId}><button id="btnForgotPassword" name="btnForgotPassword" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:border-lime-700 focus:shadow-outline-primary active:bg-lime-700 transition duration-150 ease-in-out"${_scopeId}>Reset</button></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sm:mx-auto sm:w-full sm:max-w-md py-40 ml-10" }, [
                createVNode("div", { class: "object-center" }, [
                  createVNode(_component_IconLogo)
                ]),
                createVNode("h2", { class: "mt-6 text-center text-2xl font-normal bg-clip-text" }, " Login in to your account"),
                createVNode("p"),
                _ctx.forgotPassword ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "mt-2 text-center text-sm text-gray-600 max-w"
                }, [
                  createTextVNode(" Go back to "),
                  createVNode("a", {
                    onClick: _ctx.handleSignInClick,
                    href: "#",
                    class: "font-medium text-primary-500 hover:text-primary-600"
                  }, " Sign in ", 8, ["onClick"])
                ])) : createCommentVNode("", true),
                _ctx.formSignUp ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: "mt-2 text-center text-sm text-gray-600 max-w"
                }, [
                  createTextVNode(" Go back to "),
                  createVNode("a", {
                    onClick: _ctx.handleSignInClick,
                    href: "#",
                    class: "font-medium text-primary-500 hover:text-primary-600"
                  }, " Sign in ", 8, ["onClick"])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "pt-6" }, [
                  createVNode("div", { class: "sm:mx-auto sm:w-full sm:max-w-md" }, [
                    createVNode("div", { class: "px-4 sm:rounded-lg sm:px-10" }, [
                      _ctx.formSignIn ? (openBlock(), createBlock("form", {
                        key: 0,
                        onSubmit: withModifiers(login, ["prevent"])
                      }, [
                        createVNode("input", {
                          type: "hidden",
                          name: "remember",
                          value: "true"
                        }),
                        createVNode("div", { class: "rounded-md shadow-sm" }, [
                          createVNode("div", null, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => data.value.email = $event,
                              "aria-label": "Email address",
                              name: "email",
                              type: "email",
                              required: "",
                              class: "flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300",
                              placeholder: "Email address"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, data.value.email]
                            ])
                          ]),
                          createVNode("div", { class: "-mt-px" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => data.value.password = $event,
                              "aria-label": "Password",
                              name: "password",
                              type: "password",
                              required: "",
                              class: "flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300",
                              placeholder: "Password"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, data.value.password]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-6 flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("input", {
                              id: "remember_me",
                              type: "checkbox",
                              class: "focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                            }),
                            createVNode("label", {
                              for: "remember_me",
                              class: "ml-2 block text-sm leading-5 text-gray-900"
                            }, " Remember me ")
                          ]),
                          createVNode("div", { class: "text-sm leading-5" }, [
                            createVNode("a", {
                              onClick: _ctx.handleForgotPassword,
                              href: "#",
                              class: "font-medium text-primary-500 hover:text-primary-600 focus:outline-none focus:underline transition ease-in-out duration-150"
                            }, " Forgot your password? ", 8, ["onClick"])
                          ])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode("button", {
                            id: "btnSignIn",
                            name: "btnSignIn",
                            type: "submit",
                            class: ["zyn-button zyn-login-button zyn-button-contrast", "w-full"]
                          }, [
                            createVNode("span", { class: "absolute left-0 inset-y-0 flex items-center pl-3" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                                  "clip-rule": "evenodd"
                                })
                              ]))
                            ]),
                            createTextVNode(" Sign in ")
                          ])
                        ])
                      ], 40, ["onSubmit"])) : createCommentVNode("", true),
                      _ctx.formSignUp ? (openBlock(), createBlock("form", {
                        key: 1,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "mt-10 flex items-center justify-center" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("label", { class: "ml-2 block text-sm leading-5 text-red-900" }, toDisplayString(_ctx.error), 1)
                          ]),
                          !_ctx.notSamePassword ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center"
                          }, [
                            createVNode("label", { class: "ml-2 block text-sm leading-5 text-red-900" }, [
                              createVNode("p", null, "Passwords don't match.")
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "sm:col-span-6" }, [
                          createVNode("label", {
                            for: "email",
                            class: "block text-sm font-medium text-gray-700"
                          }, " Email "),
                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => data.value.email = $event,
                              type: "text",
                              id: "email",
                              name: "email",
                              autocomplete: "email",
                              class: "flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, data.value.email]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "sm:col-span-6" }, [
                          createVNode("label", {
                            for: "phone",
                            class: "block text-sm font-medium text-gray-700"
                          }, " Phone "),
                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => data.value.phone = $event,
                              type: "text",
                              id: "phone",
                              name: "phone",
                              autocomplete: "phone",
                              class: "flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, data.value.phone]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "sm:col-span-6" }, [
                          createVNode("label", {
                            for: "password",
                            class: "block text-sm font-medium text-gray-700"
                          }, " Password "),
                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => data.value.password = $event,
                              type: "password",
                              id: "password",
                              name: "password",
                              autocomplete: "password",
                              class: "flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300",
                              onChange: _ctx.passwordValidation,
                              required: ""
                            }, null, 40, ["onUpdate:modelValue", "onChange"]), [
                              [vModelText, data.value.password]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "sm:col-span-6" }, [
                          createVNode("label", {
                            for: "confirm_password",
                            class: "block text-sm font-medium text-gray-700"
                          }, " Confirm Password "),
                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => data.value.confirm_password = $event,
                              type: "password",
                              id: "confirm_password",
                              name: "confirm_password",
                              autocomplete: "confirm_password",
                              class: "flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300",
                              onChange: _ctx.notSamePasswords,
                              required: ""
                            }, null, 40, ["onUpdate:modelValue", "onChange"]), [
                              [vModelText, data.value.confirm_password]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-6 flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("input", {
                              id: "terms",
                              type: "checkbox",
                              class: "focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300",
                              required: ""
                            }),
                            createVNode("label", {
                              for: "terms",
                              class: "ml-2 block text-sm leading-5 text-gray-900"
                            }, [
                              createTextVNode(" I agree to "),
                              createVNode("a", {
                                href: "/legal/tc",
                                class: "font-medium text-primary-900 hover:text-primary-700 focus:outline-none focus:underline transition ease-in-out duration-150"
                              }, " terms & conditions. ")
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode("button", {
                            id: "btnSignUp",
                            name: "btnSignUp",
                            type: "submit",
                            class: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-primary-900 hover:bg-primary-500 focus:outline-none focus:border-primary-900 focus:shadow-outline-primary active:bg-primary-900 transition duration-150 ease-in-out"
                          }, "Sign Up")
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode("button", {
                            id: "btnReset",
                            name: "btnReset",
                            type: "reset",
                            class: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
                          }, "Reset")
                        ])
                      ])) : createCommentVNode("", true),
                      _ctx.forgotPassword ? (openBlock(), createBlock("form", {
                        key: 2,
                        onSubmit: withModifiers(_ctx.signIn, ["prevent"])
                      }, [
                        createVNode("div", { class: "mt-10 flex items-center justify-center" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("label", { class: "ml-2 block text-sm leading-5 text-red-900" }, toDisplayString(_ctx.error), 1)
                          ])
                        ]),
                        createVNode("div", { class: "sm:col-span-6" }, [
                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => email.value = $event,
                              placeholder: "Email address",
                              "aria-label": "Email address",
                              type: "text",
                              id: "f_email",
                              name: "f_email",
                              autocomplete: "f_email",
                              class: "flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, email.value]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode("button", {
                            id: "btnForgotPassword",
                            name: "btnForgotPassword",
                            type: "submit",
                            class: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:border-lime-700 focus:shadow-outline-primary active:bg-lime-700 transition duration-150 ease-in-out"
                          }, "Reset")
                        ])
                      ], 40, ["onSubmit"])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
