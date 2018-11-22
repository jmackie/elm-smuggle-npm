'use strict';

const https = require('follow-redirects').https;
const tar = require('tar');
const fs = require('fs');
const version = require('./package.json').version;

const platform =
    { win32: 'win64', darwin: 'macos' }[process.platform] || 'linux64';

const binDir = 'bin';
const release = `https://github.com/jmackie/elm-smuggle/releases/download/v${version}/${platform}.tar.gz`;

function throwError(error) {
    if (error) {
        throw error;
    }
}

function mv(src, dst) {
    fs.rename(src, dst, throwError);
}

console.info(`Downloading ${release}...`);
https
    .get(release, (response) => {
        // TODO: should probably check the response.statusCode here...
        //
        response.pipe(
            tar
                .x({ cwd: binDir, strip: 1 }, ['elm-smuggle/elm-smuggle'])
                .on('finish', () => {
                    // Because we need to point to one file in the `bin` section
                    // of `package.json` we always give the executable an `.exe`
                    // extension, because unix doesn't care.
                    if (platform !== 'win64') {
                        mv(
                            `${binDir}/elm-smuggle`,
                            `${binDir}/elm-smuggle.exe`
                        );
                    }
                })
        );
    })
    .on('error', throwError);