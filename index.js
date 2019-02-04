var binwrap = require('binwrap');
var path = require('path');

var packageInfo = require(path.join(__dirname, 'package.json'));
var version = packageInfo.version;
var root =
    'https://github.com/jmackie/elm-smuggle/releases/download/v' + version;

module.exports = binwrap({
    dirname: __dirname,
    binaries: ['elm-smuggle'],
    urls: {
        'linux-x64': root + '/linux.tar.gz',
        'darwin-x64': root + '/osx.tar.gz',
        'win32-x64': root + '/windows.tar.gz',
        'win32-ia32': root + '/windows.tar.gz',
    },
});
