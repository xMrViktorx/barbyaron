"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_PortfolioImages_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../router */ "./resources/router/index.js");
/* harmony import */ var v_lazy_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! v-lazy-image */ "./node_modules/v-lazy-image/dist/v-lazy-image.es.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      images: {},
      modalImage: "",
      showModal: false,
      index: 0,
      appUrl: document.getElementById("app").getAttribute("app_url"),
      windowTop: 0,
      fileName: "",
      links: {},
      total: 0
    };
  },
  components: {
    VLazyImage: v_lazy_image__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mounted: function mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.getPortfolioImages("/?page=1");
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    getPortfolioImages: function getPortfolioImages(url) {
      var _this = this;

      if (!url) {
        return;
      }

      var loader = this.$loading.show({
        isFullPage: true,
        lockScroll: true,
        color: "#fff",
        backgroundColor: "#000",
        opacity: 0.8
      });
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/portfolio/images/" + this.$route.params.path + url).then(function (res) {
        if (res.data.error) {
          _router__WEBPACK_IMPORTED_MODULE_1__["default"].push({
            name: "Portfolio"
          });
          return;
        }

        res.data.links[0].label = "&laquo;";
        res.data.links[res.data.links.length - 1].label = "&raquo;";
        _this.total = res.data.total;
        _this.images = res.data.data;
        _this.links = res.data.links;
      })["catch"](function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      })["finally"](function () {
        return loader.hide();
      });
    },
    showImage: function showImage(image, index) {
      this.modalImage = "/storage/album-images/" + image;
      this.showModal = true;
      this.index = parseInt(index);
    },
    scrollToTop: function scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    nextImage: function nextImage() {
      this.showImage(this.images[this.index + 1], this.index + 1);
    },
    previousImage: function previousImage() {
      this.showImage(this.images[this.index - 1], this.index - 1);
    },
    downloadImage: function downloadImage() {
      var _this2 = this;

      var loader = this.$loading.show({
        isFullPage: true,
        enforceFocus: true,
        lockScroll: true,
        color: "#fff",
        backgroundColor: "#000",
        opacity: 0.8
      });
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        url: this.appUrl + this.modalImage,
        method: "GET",
        responseType: "blob"
      }).then(function (response) {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", _this2.modalImage.substr(_this2.modalImage.lastIndexOf("/") + 1, _this2.modalImage.length));
        document.body.appendChild(fileLink);
        fileLink.click();
      })["catch"](function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      })["finally"](function () {
        return setTimeout(function () {
          return loader.hide();
        }, 2000);
      });
    },
    onScroll: function onScroll(e) {
      this.windowTop = window.top.scrollY;
    },
    downloadAlbum: function downloadAlbum() {
      var _this3 = this;

      var loader = this.$loading.show({
        isFullPage: true,
        enforceFocus: true,
        lockScroll: true,
        color: "#fff",
        backgroundColor: "#000",
        opacity: 0.8
      });
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/portfolio/images/" + this.$route.params.path + "/download").then(function (res) {
        var url = _this3.appUrl + "/zip/" + res.data.fileName;
        window.open(url);
      })["catch"](function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      })["finally"](function () {
        return setTimeout(function () {
          return loader.hide();
        }, 2000);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=template&id=3bbf7a45&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=template&id=3bbf7a45&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _withScopeId = function _withScopeId(n) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)("data-v-3bbf7a45"), n = n(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)(), n;
};

var _hoisted_1 = {
  "class": "body"
};
var _hoisted_2 = {
  "class": "images"
};

var _hoisted_3 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-cloud-download-alt"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_4 = [_hoisted_3];
var _hoisted_5 = {
  "class": "pagination"
};
var _hoisted_6 = ["innerHTML", "onClick"];

var _hoisted_7 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-arrow-up"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_8 = [_hoisted_7];
var _hoisted_9 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_lazy_image = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("v-lazy-image");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.images, function (image, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_v_lazy_image, {
      key: image,
      src: '/storage/album-images/' + image,
      alt: "image",
      onClick: function onClick($event) {
        return $options.showImage(image, index);
      }
    }, null, 8
    /* PROPS */
    , ["src", "onClick"]);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "downloadButton",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.downloadAlbum();
    })
  }, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.links, function (link) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: link,
      innerHTML: link.label,
      onClick: function onClick($event) {
        return $options.getPortfolioImages(link.url);
      },
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        activeLink: link.active,
        disabledLink: !link.url
      })
    }, null, 10
    /* CLASS, PROPS */
    , _hoisted_6);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["scrollToTop", {
      showScrollToTop: $data.windowTop > 600
    }]),
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.scrollToTop();
    })
  }, _hoisted_8, 2
  /* CLASS */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["modal", {
      showModal: $data.showModal
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "close",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $data.showModal = false;
    })
  }, "×"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-download",
    id: "download",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.downloadImage();
    })
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-chevron-left",
    id: "leftArrow",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.previousImage();
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.index > 0]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-chevron-right",
    id: "rightArrow",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return $options.nextImage();
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.index + 1 < $data.total && $data.index < Object.keys(this.images)[Object.keys(this.images).length - 1]]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.modalImage,
    "class": "modalImg"
  }, null, 8
  /* PROPS */
  , _hoisted_9)], 2
  /* CLASS */
  )], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_images_background_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/images/background.jpg */ "./resources/assets/images/background.jpg");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_assets_images_background_jpg__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.body[data-v-3bbf7a45] {\r\n  /*width: 100vw;*/\r\n  min-height: 100vh;\r\n  display: flex;\r\n  align-items: center;\r\n  flex-direction: row;\r\n  flex-wrap: wrap;\r\n  justify-content: center;\r\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  background-repeat: no-repeat;\r\n  background-attachment: fixed;\n}\n.modal[data-v-3bbf7a45] {\r\n  display: none;\n}\n.showModal[data-v-3bbf7a45] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  position: fixed; /* Stay in place */\r\n  z-index: 103; /* Sit on top */\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%; /* Full width */\r\n  height: 100%; /* Full height */\r\n  overflow: auto; /* Enable scroll if needed */\r\n  background-color: rgb(0, 0, 0); /* Fallback color */\r\n  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */\n}\n.showModal .modalImg[data-v-3bbf7a45] {\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n  -webkit-animation-name: zoom-3bbf7a45;\r\n          animation-name: zoom-3bbf7a45;\r\n  -webkit-animation-duration: 0.6s;\r\n          animation-duration: 0.6s;\n}\n@-webkit-keyframes zoom-3bbf7a45 {\nfrom {\r\n    -webkit-transform: scale(0);\n}\nto {\r\n    -webkit-transform: scale(1);\n}\n}\n@keyframes zoom-3bbf7a45 {\nfrom {\r\n    transform: scale(0);\n}\nto {\r\n    transform: scale(1);\n}\n}\n.showModal .close[data-v-3bbf7a45] {\r\n  position: absolute;\r\n  cursor: pointer;\r\n  top: 15px;\r\n  right: 35px;\r\n  color: #fff;\r\n  font-size: 40px;\r\n  font-weight: bold;\r\n  transition: 0.3s;\n}\n#leftArrow[data-v-3bbf7a45],\r\n#rightArrow[data-v-3bbf7a45],\r\n#download[data-v-3bbf7a45] {\r\n  color: #fff;\r\n  font-size: 40px;\r\n  position: absolute;\r\n  cursor: pointer;\n}\n#leftArrow[data-v-3bbf7a45] {\r\n  left: 50px;\n}\n#rightArrow[data-v-3bbf7a45] {\r\n  right: 50px;\n}\n#download[data-v-3bbf7a45] {\r\n  font-size: 20px;\r\n  top: 28px;\r\n  right: 100px;\n}\n.images[data-v-3bbf7a45] {\r\n  line-height: 0;\r\n  -moz-column-gap: 0px;\r\n       column-gap: 0px;\r\n  -moz-column-count: 10;\r\n       column-count: 10;\r\n  margin: 50px;\r\n  margin-top: 100px;\n}\n.images img[data-v-3bbf7a45] {\r\n  width: 100% !important;\r\n  height: auto !important;\r\n  padding: 4px;\r\n  cursor: pointer;\n}\n@media (max-width: 1200px) {\n.images[data-v-3bbf7a45] {\r\n    -moz-column-count: 6;\r\n         column-count: 6;\n}\n}\n@media (max-width: 1000px) {\n.images[data-v-3bbf7a45] {\r\n    -moz-column-count: 5;\r\n         column-count: 5;\n}\n}\n@media (max-width: 800px) {\n.images[data-v-3bbf7a45] {\r\n    -moz-column-count: 3;\r\n         column-count: 3;\n}\n}\n@media (max-width: 400px) {\n.images[data-v-3bbf7a45] {\r\n    -moz-column-count: 2;\r\n         column-count: 2;\n}\n}\n.scrollToTop[data-v-3bbf7a45] {\r\n  display: none;\n}\n.showScrollToTop[data-v-3bbf7a45] {\r\n  display: block;\r\n  color: #fff;\r\n  font-size: 25px;\r\n  padding: 8px;\r\n  background-color: rgba(0, 0, 0, 0.7);\r\n  position: fixed;\r\n  bottom: 40px;\r\n  right: 20px;\r\n  cursor: pointer;\n}\n.downloadButton[data-v-3bbf7a45] {\r\n  color: #fff;\r\n  font-size: 35px;\r\n  padding: 5px;\r\n  position: fixed;\r\n  top: 70px;\r\n  right: 10px;\r\n  cursor: pointer;\r\n  z-index: 100;\n}\n.v-lazy-image[data-v-3bbf7a45] {\r\n  filter: blur(10px);\r\n  transition: filter 0.7s;\n}\n.v-lazy-image-loaded[data-v-3bbf7a45] {\r\n  filter: blur(0);\n}\n.pagination[data-v-3bbf7a45] {\r\n  color: #fff;\r\n  padding-bottom: 50px;\r\n  z-index: 102;\n}\n.pagination span[data-v-3bbf7a45] {\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  cursor: pointer;\r\n  font-size: 20px;\n}\n.pagination span.activeLink[data-v-3bbf7a45] {\r\n  font-weight: bold;\r\n  font-size: 24px;\n}\n.pagination span.disabledLink[data-v-3bbf7a45] {\r\n  cursor: default;\r\n  color: #aaa;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./resources/assets/images/background.jpg":
/*!************************************************!*\
  !*** ./resources/assets/images/background.jpg ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/background.jpg?25990133de6d8798a124a105333a6a6e");

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PortfolioImages_vue_vue_type_style_index_0_id_3bbf7a45_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PortfolioImages_vue_vue_type_style_index_0_id_3bbf7a45_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PortfolioImages_vue_vue_type_style_index_0_id_3bbf7a45_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/v-lazy-image/dist/v-lazy-image.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/v-lazy-image/dist/v-lazy-image.es.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ v)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
var e=Object.defineProperty,r=Object.defineProperties,t=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,c=(r,t,s)=>t in r?e(r,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[t]=s;var v={props:{src:{type:String,required:!0},srcPlaceholder:{type:String,default:"data:,"},srcset:{type:String},intersectionOptions:{type:Object,default:()=>({})},usePicture:{type:Boolean,default:!1}},inheritAttrs:!1,setup(e,{attrs:v,slots:b,emit:f}){const y=(0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null),O=(0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({observer:null,intersected:!1,loaded:!1}),g=(0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>O.intersected&&e.src?e.src:e.srcPlaceholder)),P=(0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>!(!O.intersected||!e.srcset)&&e.srcset)),m=()=>{y.value.getAttribute("src")!==e.srcPlaceholder&&(O.loaded=!0,f("load"))},w=()=>f("error",y.value);return (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)((()=>{"IntersectionObserver"in window&&(O.observer=new IntersectionObserver((e=>{e[0].isIntersecting&&(O.intersected=!0,O.observer.disconnect(),f("intersect"))}),e.intersectionOptions),O.observer.observe(y.value))})),(0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)((()=>{"IntersectionObserver"in window&&O.observer.disconnect()})),()=>{const i=(0,vue__WEBPACK_IMPORTED_MODULE_0__.h)("img",(a=((e,r)=>{for(var t in r||(r={}))o.call(r,t)&&c(e,t,r[t]);if(s)for(var t of s(r))n.call(r,t)&&c(e,t,r[t]);return e})({ref:y,src:g.value,srcset:P.value||null},v),l={class:[v.class,"v-lazy-image",{"v-lazy-image-loaded":O.loaded}],onLoad:m,onError:w},r(a,t(l))));var a,l;return e.usePicture?(0,vue__WEBPACK_IMPORTED_MODULE_0__.h)("picture",{ref:y,onLoad:m},O.intersected?[b.default,i]:[i]):i}}};


/***/ }),

/***/ "./resources/js/components/PortfolioImages.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/PortfolioImages.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PortfolioImages_vue_vue_type_template_id_3bbf7a45_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PortfolioImages.vue?vue&type=template&id=3bbf7a45&scoped=true */ "./resources/js/components/PortfolioImages.vue?vue&type=template&id=3bbf7a45&scoped=true");
/* harmony import */ var _PortfolioImages_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PortfolioImages.vue?vue&type=script&lang=js */ "./resources/js/components/PortfolioImages.vue?vue&type=script&lang=js");
/* harmony import */ var _PortfolioImages_vue_vue_type_style_index_0_id_3bbf7a45_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css */ "./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css");
/* harmony import */ var C_Users_Viktor_Documents_GitHub_barbyaron_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,C_Users_Viktor_Documents_GitHub_barbyaron_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PortfolioImages_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PortfolioImages_vue_vue_type_template_id_3bbf7a45_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3bbf7a45"],['__file',"resources/js/components/PortfolioImages.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/PortfolioImages.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/PortfolioImages.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PortfolioImages_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PortfolioImages_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PortfolioImages.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/PortfolioImages.vue?vue&type=template&id=3bbf7a45&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/PortfolioImages.vue?vue&type=template&id=3bbf7a45&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PortfolioImages_vue_vue_type_template_id_3bbf7a45_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PortfolioImages_vue_vue_type_template_id_3bbf7a45_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PortfolioImages.vue?vue&type=template&id=3bbf7a45&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=template&id=3bbf7a45&scoped=true");


/***/ }),

/***/ "./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PortfolioImages_vue_vue_type_style_index_0_id_3bbf7a45_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PortfolioImages.vue?vue&type=style&index=0&id=3bbf7a45&scoped=true&lang=css");


/***/ })

}]);