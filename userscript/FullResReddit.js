// ==UserScript==
// @name         FullResReddit
// @namespace    https://github.com/jesterjunk
// @homepage     https://github.com/jesterjunk/FullResReddit
// @version      0
// @description  reddit.com - dynamically convert preview image urls to original image urls
// @author       a speck of dust on a tiny rock flying through a vast expanse of the universe
// @match        https://old.reddit.com/*
// @match        https://www.reddit.com/*
// @match        https://new.reddit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

/*
    DISCLAIMER FOR THE "FullResReddit" TAMPERMONKEY SCRIPT

    This script is provided "as is," without warranty of any kind, express or
    implied, including but not limited to the warranties of merchantability,
    fitness for a particular purpose, and noninfringement. In no event shall the
    authors or copyright holders be liable for any claim, damages, or other
    liability, whether in an action of contract, tort, or otherwise, arising
    from, out of, or in connection with the script or the use or other dealings
    in the script.

    USAGE AGREEMENT:
    1. This script is for personal use only and is not authorized for commercial
       purposes or distribution without explicit permission from the author.

    2. The user agrees to use this script responsibly and ethically, respecting
       the terms of service of reddit.com and any other websites it may affect.

    3. The user acknowledges that this script modifies the behavior of web pages
       loaded in their browser and agrees to use it at their own risk.

    4. The functionality of this script depends on the current design of the
       website it operates on (reddit.com), and as such, its functionality in
       the future cannot be guaranteed as websites evolve.

    SUPPORT AND FEEDBACK:
    Users are encouraged to report any bugs or issues to the author through the
    provided contact information in the script metadata. Suggestions for
    improvements are also welcome.

    By using this script, you acknowledge that you have read this disclaimer,
    agree to its terms, and understand that you are using the script at your own risk.


    Tested with Tampermonkey  v4.16.1  Chrome
                Tampermonkey  v5.1.0   Firefox

    This Tampermonkey script dynamically updates image URLs on reddit.com,
    converting preview image URLs to their original, full-resolution versions.
    It's designed to work automatically on page load and adjusts for new images
    that load dynamically or upon navigation within the site. The script supports
    both Chrome and Firefox via Tampermonkey and operates by identifying image
    elements with preview URLs, replacing these with their original counterparts.
    Additionally, it sets up a MutationObserver to handle new images added to the
    DOM and implements a polling mechanism to detect URL changes, ensuring that
    all images, regardless of how or when they are loaded, are processed to
    display in their original quality.

    https://ko-fi.com/jesterjunk
    https://www.buymeacoffee.com/jesterjunk
*/

(function() {
    'use strict';

    /**
     * Converts a preview image URL to its original image URL.
     * @param {HTMLImageElement} img - The image element to process.
     */
    function preview_img_url_to_original_img_url(img) {

        var original_image_url = ``;
        var src_parts = ``;
        var closest_a = ``;

        if (img.hasAttribute(`src`)) {

            if (img.src.includes(`//preview.redd.it`)) {

                original_image_url = img.src.split(`?`)[0].replace(`preview`, `i`);

                img.setAttribute('loading', 'lazy');
                img.src = original_image_url;

                src_parts = img.src.split(`-`);

                if (src_parts.length > 1) {
                    original_image_url = `https://i.redd.it/` + src_parts[src_parts.length - 1];
                    img.src = original_image_url;
                }

                closest_a = img.closest(`a`);

                if (closest_a && closest_a.hasAttribute(`href`)) {

                    closest_a.href = original_image_url;
                }
            }
        }

        if (img.hasAttribute(`data-lazy-src`)) {

            if (img.getAttribute(`data-lazy-src`).includes(`//preview.redd.it`)) {

                original_image_url = img.getAttribute(`data-lazy-src`).split(`?`)[0].replace(`preview`, `i`);

                img.setAttribute('loading', 'lazy');
                img.setAttribute(`data-lazy-src`, original_image_url);

                src_parts = img.getAttribute(`data-lazy-src`).split(`-`);

                if (src_parts.length > 1) {
                    original_image_url = `https://i.redd.it/` + src_parts[src_parts.length - 1];
                    img.setAttribute(`data-lazy-src`, original_image_url);
                }

                closest_a = img.closest(`a`);

                if (closest_a && closest_a.hasAttribute(`href`)) {

                    closest_a.href = original_image_url;
                }
            }
        }

        if (img.hasAttribute(`srcset`)) {

            img.removeAttribute(`srcset`);
        }

        if (img.hasAttribute(`sizes`)) {

            img.removeAttribute(`sizes`);
        }

        if (img.hasAttribute(`data-lazy-srcset`)) {

            img.removeAttribute(`data-lazy-srcset`);
        }

    }

    /**
     * Processes all images on the page, converting preview URLs to original URLs.
     */
    function processImages() {

        var imageElements = document.querySelectorAll(`img`);

        imageElements.forEach(img => {

            preview_img_url_to_original_img_url(img);
        });
    }

    /**
     * Call processImages initially
     */
    processImages();

    /**
     * Sets up a MutationObserver to watch for new images and process them.
     */
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.tagName === 'IMG') {
                        preview_img_url_to_original_img_url(node);
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    /**
     * Polling mechanism to detect URL changes and process images accordingly.
     */
    let lastHref = window.location.href;
    setInterval(function() {
        if (window.location.href !== lastHref) {
            lastHref = window.location.href;
            processImages();
        }
    }, 1000); // Check every second

})();
