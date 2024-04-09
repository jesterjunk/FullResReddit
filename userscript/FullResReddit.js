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


// Initiates an IIFE (Immediately Invoked Function Expression) in strict mode for safer code execution.
(function() {
    'use strict';


    /**
     * Converts preview Reddit image URLs to their original, higher resolution versions.
     * Operates on an `<img>` element by modifying its relevant attributes.
     * @param {HTMLImageElement} img - The image element to be processed.
     */
    function preview_image_url_to_original_image_url(img) {


        /**
         * Processes an image attribute to replace its value with the original image URL.
         * Modifies the image's attribute if it contains a preview Reddit URL.
         * @param {string} attribute - The attribute of the image to process.
         */
        function processImage(attribute) {

            // Return early if the image lacks the specified attribute or the attribute's value
            // doesn't include a Reddit preview URL.
            if (!img.hasAttribute(attribute)) return;
            let imageUrl = img.getAttribute(attribute);
            if (!imageUrl.includes('//preview.redd.it')) return;


            // Standardize the URL to point to the original image and update the attribute.
            imageUrl = imageUrl.split('?')[0].replace('preview', 'i');
            img.setAttribute('loading', 'lazy');
            img.setAttribute(attribute, imageUrl);


            // If the URL contains identifiable parts, reconstruct it to ensure it's the original.
            let srcParts = imageUrl.split('-');
            if (srcParts.length > 1) {

                imageUrl = `https://i.redd.it/` + srcParts[srcParts.length - 1];
                img.setAttribute(attribute, imageUrl);
            }


            // Update the closest anchor (`<a>`) element's `href` attribute to the original image URL.
            let closestA = img.closest('a');
            if (closestA && closestA.hasAttribute('href')) {

                closestA.href = imageUrl;
            }
        }


        // Process `src` and `data-lazy-src` attributes via loop to accommodate various loading strategies.
        ['src', 'data-lazy-src'].forEach(attr => {

            processImage(attr);
        });


        // Clean up by removing attributes that are no longer needed after the URL update.
        ['srcset', 'sizes', 'data-lazy-srcset'].forEach(attr => {

            if (img.hasAttribute(attr)) {
                img.removeAttribute(attr);
            }
        });
    }


    /**
     * Processes all `<img>` elements on the page to update preview URLs to original URLs.
     */
    function processImages(node = document) {

        // Ensure the context supports querySelectorAll
        if (!node.querySelectorAll) {

            // Fallback to the document if the node does not support querySelectorAll
            node = document;
        }

        node.querySelectorAll('img').forEach(img => preview_image_url_to_original_image_url(img));
    }


    /**
     * Cleans up the address bar URL by decoding it for improved readability and brevity.
     */
    window.location.href = decodeURIComponent(window.location.href);


    /**
     * Initially process all images.
     */
    processImages();


    /**
     * Observes document body for newly added images to process their URLs.
     */
    let observer = new MutationObserver(function(mutations) {

        mutations.forEach(function(mutation) {

            if (mutation.addedNodes) {

                mutation.addedNodes.forEach(function(node) {

                    processImages(node);
                });
            }
        });
    });


    observer.observe(document.body, { childList: true, subtree: true });


    /**
     * Periodically checks for URL changes to reprocess images, ensuring up-to-date URLs.
     */
    let lastHref = window.location.href;
    let tick_count = 0;

    setInterval(function() {

        if (window.location.href !== lastHref) {

            lastHref = window.location.href;
            processImages();
        }

        if (tick_count === 0) {

            processImages();

            tick_count += 1;
        }
    }, 1000); // Check every second

})();
