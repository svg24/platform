import path from 'path';
import { fileURLToPath } from 'url';
import sync from 'browser-sync';
import * as csso from 'csso';
import gulp from 'gulp';
import minifier from 'html-minifier';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const PACKAGES = path.resolve(dirname, 'packages');

/**
 * @param {string} pack
 * @returns {string}
 */
function getRoot(pack) {
  return `${PACKAGES}/${pack}/src`;
}

/**
 * @param {string} pack
 * @returns {string}
 */
function getOutput(pack) {
  return `${PACKAGES}/${pack}/dist`;
}

/**
 * @param {string} root
 * @param {string} output
 * @returns {NodeJS.ReadWriteStream}
 */
function copySome(root, output) {
  return gulp.src(root).pipe(gulp.dest(output));
}

/**
 * @param {string} root
 * @param {string} output
 * @returns {NodeJS.ReadWriteStream}
 */
function transformHTML(root, output) {
  return gulp.src(root)
    .on('data', (file) => Object.assign(file, {
      contents: Buffer.from(minifier.minify(file.contents.toString(), {
        collapseWhitespace: true,
      })),
    }))
    .pipe(gulp.dest(output));
}

/**
 * @param {string} root
 * @param {string} output
 * @returns {NodeJS.ReadWriteStream}
 */
function transformCSS(root, output) {
  return gulp.src(root)
    .on('data', (file) => Object.assign(file, {
      contents: Buffer.from(csso.minify(file.contents.toString()).css),
    }))
    .pipe(gulp.dest(output));
}

const ASSETS_ROOT = getRoot('assets');
const ASSETS_OUTPUT = getOutput('assets');
const ASSETS_WOFF_ROOT = `${ASSETS_ROOT}/fonts/*.woff2`;
const ASSETS_WOFF_OUTPUT = `${ASSETS_OUTPUT}/fonts`;
const ASSETS_SVG_ROOT = `${ASSETS_ROOT}/images/*.svg`;
const ASSETS_SVG_OUTPUT = `${ASSETS_OUTPUT}/images`;
const ASSETS_CSS_ROOT = `${ASSETS_ROOT}/styles/*.css`;
const ASSETS_CSS_OUTPUT = `${ASSETS_OUTPUT}/styles`;

const assets = {
  copyFonts() {
    return copySome(ASSETS_WOFF_ROOT, ASSETS_WOFF_OUTPUT);
  },
  transformSVG() {
    return transformHTML(ASSETS_SVG_ROOT, ASSETS_SVG_OUTPUT);
  },
  transformCSS() {
    return transformCSS(ASSETS_CSS_ROOT, ASSETS_CSS_OUTPUT);
  },
};

gulp.task('build-assets', gulp.series(
  assets.copyFonts,
  assets.transformSVG,
  assets.transformCSS,
));

const WWW_ROOT = getRoot('www');
const WWW_OUTPUT = getOutput('www');
const WWW_HTML_ROOT = `${WWW_ROOT}/*.html`;
const WWW_CSS_ROOT = `${WWW_ROOT}/*.css`;

const www = {
  transformHTML() {
    return transformHTML(WWW_HTML_ROOT, WWW_OUTPUT).pipe(sync.stream());
  },
  watchHTML() {
    return gulp.watch(WWW_HTML_ROOT, www.transformHTML);
  },
  transformCSS() {
    return transformCSS(WWW_CSS_ROOT, WWW_OUTPUT);
  },
  initSync() {
    sync.init({
      ui: false,
      notify: false,
      server: {
        baseDir: WWW_OUTPUT,
      },
    });
  },
};

gulp.task('serve-www', gulp.series(
  gulp.parallel(www.transformHTML, www.transformCSS),
  gulp.parallel(www.watchHTML, www.initSync),
));
