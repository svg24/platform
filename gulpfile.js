import path from 'path';
import { fileURLToPath } from 'url';
import sync from 'browser-sync';
import * as csso from 'csso';
import gulp from 'gulp';
import htmlMinifier from 'html-minifier';
import nunjucks from 'nunjucks';

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
 * @param {string} content
 * @returns {string}
 */
function minifyHTML(content) {
  return htmlMinifier.minify(content, { collapseWhitespace: true });
}

/**
 * @param {string} content
 * @returns {string}
 */
function minifyCSS(content) {
  return csso.minify(content).css;
}

/**
 * @param {string} root
 * @param {string} output
 * @param {(content: string) => string} minifier
 * @param {any?} options
 * @returns {NodeJS.ReadWriteStream}
 */
function transformSome(root, output, minifier, options) {
  return gulp.src(root)
    .on('data', (file) => Object.assign(file, {
      contents: Buffer.from(minifier(file.contents.toString())),
      ...options || {},
    }))
    .pipe(gulp.dest(output));
}

/**
 * @param {string} root
 * @param {string} output
 * @returns {NodeJS.ReadWriteStream}
 */
function transformHTML(root, output) {
  return transformSome(root, output, minifyHTML);
}

/**
 * @param {string} root
 * @param {string} output
 * @returns {NodeJS.ReadWriteStream}
 */
function transformCSS(root, output) {
  return transformSome(root, output, minifyCSS);
}

/**
 * @param {string} root
 * @param {string} output
 * @returns {NodeJS.ReadWriteStream}
 */
function transformNJK(root, output) {
  const loader = new nunjucks.FileSystemLoader(root.match(/.+\//)[0]);
  const env = new nunjucks.Environment(loader);
  const minifier = (content) => minifyHTML(env.renderString(content));
  return transformSome(root, output, minifier, { extname: '.html' });
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
const WWW_NJK_ROOT = `${WWW_ROOT}/*.njk`;
const WWW_CSS_ROOT = `${WWW_ROOT}/*.css`;

const www = {
  transformNJK() {
    return transformNJK(WWW_NJK_ROOT, WWW_OUTPUT);
  },
  streamNJK() {
    return www.transformNJK().pipe(sync.stream());
  },
  watchHTML() {
    return gulp.watch(WWW_NJK_ROOT, www.streamNJK);
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
  gulp.parallel(www.streamNJK, www.transformCSS),
  gulp.parallel(www.watchHTML, www.initSync),
));
gulp.task('build-www', gulp.parallel(www.transformNJK, www.transformCSS));
