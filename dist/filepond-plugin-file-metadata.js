/*
 * FilePondPluginFileMetadata 1.0.3
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */

/* eslint-disable */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
      ? define(factory)
      : (global.FilePondPluginFileMetadata = factory());
})(this, function() {
  'use strict';

  var _typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function(obj) {
          return typeof obj;
        }
      : function(obj) {
          return obj &&
            typeof Symbol === 'function' &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? 'symbol'
            : typeof obj;
        };

  var plugin$1 = function(_ref) {
    var addFilter = _ref.addFilter,
      utils = _ref.utils;

    // get quick reference to Type utils
    var Type = utils.Type;

    // setup attribute mapping for accept

    addFilter('SET_ATTRIBUTE_TO_OPTION_MAP', function(map) {
      return Object.assign(map, {
        '^fileMetadata': {
          group: 'fileMetadataObject'
        }
      });
    });

    addFilter('DID_LOAD_ITEM', function(item, _ref2) {
      var query = _ref2.query;
      return new Promise(function(resolve) {
        if (!query('GET_ALLOW_FILE_METADATA')) {
          return resolve(item);
        }

        // get default object and add as metadata
        var data = query('GET_FILE_METADATA_OBJECT');
        if (
          (typeof data === 'undefined' ? 'undefined' : _typeof(data)) ===
          'object'
        ) {
          Object.keys(data).forEach(function(key) {
            item.setMetadata(key, data[key]);
          });
        }

        resolve(item);
      });
    });

    return {
      options: {
        // Enable or disable file renaming
        allowFileMetadata: [true, Type.BOOLEAN],

        // A metadata object to add to all files
        fileMetadataObject: [null, Type.OBJECT]
      }
    };
  };

  var isBrowser =
    typeof window !== 'undefined' && typeof window.document !== 'undefined';

  if (isBrowser) {
    document.dispatchEvent(
      new CustomEvent('FilePond:pluginloaded', { detail: plugin$1 })
    );
  }

  return plugin$1;
});
