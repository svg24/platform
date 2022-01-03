import path from 'path';
import { fileURLToPath } from 'url';
import sync from 'browser-sync';
import * as csso from 'csso';
import gulp from 'gulp';
import minifier from 'html-minifier';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const SOURCES = path.resolve(dirname, 'src');
const OUTPUT = path.resolve(dirname, 'dist');

const HTML_SOURCES = `${SOURCES}/*.html`;
const HTML_OPTIONS = {
  collapseWhitespace: true,
};

function transformHTML() {
  return gulp.src(HTML_SOURCES)
    .on('data', (file) => Object.assign(file, {
      contents: Buffer.from(minifier
        .minify(file.contents.toString(), HTML_OPTIONS)),
    }))
    .pipe(gulp.dest(OUTPUT))
    .pipe(sync.stream());
}

function watchHTML() {
  gulp.watch(HTML_SOURCES, transformHTML);
}

const STYLES_SOURCES = `${SOURCES}/*.css`;

function transformCSS() {
  return gulp.src(STYLES_SOURCES)
    .on('data', (file) => Object.assign(file, {
      contents: Buffer.from(csso.minify(file.contents.toString()).css),
    }))
    .pipe(gulp.dest(OUTPUT));
}

function initSync() {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: OUTPUT,
    },
  });
}

export const serve = gulp.series(
  gulp.parallel(transformHTML, transformCSS),
  gulp.parallel(watchHTML, initSync),
);
