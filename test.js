


// Xbox IE and/or window phone browser
if (/Xbox|Windows Phone/i.test(navigator.userAgent)) {
    window.location.replace(mobileInterceptUrl);
}
    // referencing https://gist.github.com/dalethedeveloper/1503252
// the more commonly used http://detectmobilebrowsers.com/ does not detect ipads well
else if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(
        navigator.userAgent
    )
) {
    window.location.replace(mobileInterceptUrl);
}
// Mobile devices browsers suporting/requesting Desktop site
else if (
    navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 2 &&
    /MacIntel/i.test(navigator.platform)
) {
    window.location.replace(mobileInterceptUrl);
}

function isSupportedVersion(version, minVersion) {
    var splitVersion = version.split('.');
    var splitMinVersion = minVersion.split('.');

    for (var i = 0; i < splitMinVersion.length; i++) {
        // If the version is shorter than expected, just assume zero for this position.
        var parsedVersion = parseInt(splitVersion[i] || '0');
        var parsedMinVersion = parseInt(splitMinVersion[i]);
        if (parsedVersion !== parsedMinVersion) {
            return parsedVersion > parsedMinVersion;
        }
    }
    return true;
}

function isBrowserSupported() {
    // Note that order matters.  Some browsers will list other browsers in their user agent.
    var browsers = [
        { regex: /Edge?\/([\d\.]*)/, minVersion: '16.0' }, // Edge
        { regex: /Chrome\/([\d\.]*)/, minVersion: '95.0' }, // Chrome, and not "Edge"
        { regex: /Version\/([\d\.]*) .*Safari\/(?:[\d\.]*)/, minVersion: '12.0' }, // Safari, and not "Chrome" or "Edge"
        { regex: /Firefox\/([\d\.]*)/, minVersion: '70.0' }, // Firefox
        { regex: /Trident\/7\.0; .*rv:([\d\.]*)/, block: true }, // IE 11+
        { regex: /; MSIE ([\d\.]*);/, block: true } // IE 10 or less
    ];

    for (var i = 0; i < browsers.length; i++) {
        var browser = browsers[i];
        if (browser.block === true) {
            if (browser.regex.test(navigator.userAgent)) {
                return false;
            }
        } else if (browser.minVersion !== undefined) {
            var group = navigator.userAgent.match(browser.regex);
            if (group && group[1]) {
                return isSupportedVersion(group[1], browser.minVersion);
            }
        }
    }
    // Some other browser, so just assume it's supported.
    return true;
}
// Run browser support check if unsupported is still false
if (isBrowserSupported() === false) {
    window.location.replace('/intercept/unsupported.html');
}
    body {
        height: 100%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    @media (orientation: landscape) {
        body {
        background: url('/default-3840x2160.png');
    }
    }
    @media (orientation: portrait) {
        body {
        background: url('/default-1920x1536.png');
    }
    }
    #root {
        display: flex;
        height: 100%;
    }
    #logo {
        position: absolute;
        height: 100px;
        width: 100px;
        right: -150px;
        top: -150px;
    }
