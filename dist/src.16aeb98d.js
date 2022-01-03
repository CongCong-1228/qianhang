// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Focm":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('.lastLi');
var $addButton = $('.addButton');
var x = localStorage.getItem('x'); // 先读取你的本地存储获取x对应的值

var xObject = JSON.parse(x); // 将字符串转换成对象

var hashMap = xObject || [// 如果xObject为空就用我默认的hashMap，第一次为空。
{
  logo: 'A',
  url: 'https://acfun.cn'
}, {
  logo: 'B',
  url: 'https://bilibili.com'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.lastLi)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n    <li class=\"li\">\n        <div class=\"site\">\n            <div class=\"logo\">".concat(node.logo, "</div>\n            <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n        </div>\n            <div class = \"close\">\n            <svg class=\"icon\" aria-hidden=\"true\">\n                <use class=\"use1\" xlink:href=\"#icon-delete\"></use>\n            </svg>\n        </div>\n    </li>\n    ")).insertBefore($lastLi);
    $li.on('click', function () {
      console.log(node.url);
      window.open(node.url);
    }); // 点击Li跳转到指定页面

    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    }); // 点击删除按钮删除haspMap中对应的数据，然后重新渲染
  });
}; // 每次渲染页面，先删除增加前的页面，遍历hasMap数组中的数据，放入hashMap


render(); // 先渲染页面

$addButton.on('click', function () {
  var url = window.prompt('请输入你的网址');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: "".concat(simplifyUrl(url)[0].toUpperCase()),
    logotype: 'text',
    url: "".concat(url)
  });
  render();
}); // 点击新增后，为hashMap增加数据，然后重新渲染页面

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
}; // 在页面关闭或刷新前，将hashMap的数据先转成字符串，再存放进localStorage本地存储


var $navList = $('.navList');
var $searchForm = $('.searchForm');
var $header = $('#header');
var $input1 = $header.find('.input');
var $use1 = $header.find('.use1');
$navList.on('click', function (e) {
  var t = e.target;

  if (t.id === 'baidu') {
    $searchForm.attr('action', 'https://www.baidu.com/s');
    $input1.attr('name', 'wd');
    $use1.attr('xlink:href', '#icon-baidu');
  } else if (t.id === 'google') {
    $searchForm.attr('action', 'https://www.google.com.hk/search');
    $input1.attr('name', 'q');
    $use1.attr('xlink:href', '#icon-google');
  }
}); // 点击切换搜索浏览器

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
}); // 键盘事件
},{}]},{},["Focm"], null)
//# sourceMappingURL=src.16aeb98d.js.map