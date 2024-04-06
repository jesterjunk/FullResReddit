<h1>FullResReddit</h1>

<p>This userscript improves image quality on Reddit by automatically replacing preview images with full-resolution versions. It works on Chrome and Firefox, applies to new images as you browse, and ensures all images are upgraded even if loaded dynamically.<br></p>

<div align="center">
<p>
<strong>userscript URL</strong><br>
<a href="https://jesterjunk.github.io/FullResReddit/tampermonkey_script_-_FullResReddit.js" title="https://jesterjunk.github.io/FullResReddit/tampermonkey_script_-_FullResReddit.js" target="_blank">https://jesterjunk.github.io/FullResReddit/tampermonkey_script_-_FullResReddit.js</a><br>

<strong>Instructions for installing a Tampermonkey userscript from a URL</strong><br>
<a href="https://gist.github.com/jesterjunk/0344f1a7c1f67f52ffc716b17ee7f240" title="https://gist.github.com/jesterjunk/0344f1a7c1f67f52ffc716b17ee7f240" target="_blank">https://gist.github.com/jesterjunk/0344f1a7c1f67f52ffc716b17ee7f240</a><br><br>
</p>
</div>

<pre>
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
</pre>

<pre>
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
</pre>
