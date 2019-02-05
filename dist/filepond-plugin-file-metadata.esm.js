/*
 * FilePondPluginFileMetadata 1.0.3
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */

/* eslint-disable */
var plugin$1 = ({ addFilter, utils }) => {
  // get quick reference to Type utils
  const { Type } = utils;

  // setup attribute mapping for accept
  addFilter('SET_ATTRIBUTE_TO_OPTION_MAP', map =>
    Object.assign(map, {
      '^fileMetadata': {
        group: 'fileMetadataObject'
      }
    })
  );

  addFilter(
    'DID_LOAD_ITEM',
    (item, { query }) =>
      new Promise(resolve => {
        if (!query('GET_ALLOW_FILE_METADATA')) {
          return resolve(item);
        }

        // get default object and add as metadata
        const data = query('GET_FILE_METADATA_OBJECT');
        if (typeof data === 'object') {
          Object.keys(data).forEach(key => {
            item.setMetadata(key, data[key]);
          });
        }

        resolve(item);
      })
  );

  return {
    options: {
      // Enable or disable file renaming
      allowFileMetadata: [true, Type.BOOLEAN],

      // A metadata object to add to all files
      fileMetadataObject: [null, Type.OBJECT]
    }
  };
};

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

if (isBrowser) {
  document.dispatchEvent(
    new CustomEvent('FilePond:pluginloaded', { detail: plugin$1 })
  );
}

export default plugin$1;
