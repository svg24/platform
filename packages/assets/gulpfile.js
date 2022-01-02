import path from 'path';
import { fileURLToPath } from 'url';
import * as csso from 'csso';
import gulp from 'gulp';
import minifier from 'html-minifier';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const SOURCES = path.resolve(dirname, 'src');
const OUTPUT = path.resolve(dirname, 'dist');

const FONTS_SOURCES = `${SOURCES}/fonts/*.woff2`;
const FONT_OUTPUT = `${OUTPUT}/fonts`;

function copyFonts() {
  return gulp.src(FONTS_SOURCES).pipe(gulp.dest(FONT_OUTPUT));
}

const SVG_SOURCES = `${SOURCES}/images/*.svg`;
const SVG_OUTPUT = `${OUTPUT}/images`;
const SVG_OPTIONS = {
  collapseWhitespace: true,
};

function transformSVG() {
  return gulp.src(SVG_SOURCES)
    .on('data', (file) => Object.assign(file, {
      contents: Buffer.from(minifier
        .minify(file.contents.toString(), SVG_OPTIONS)),
    }))
    .pipe(gulp.dest(SVG_OUTPUT));
}

const STYLES_SOURCES = `${SOURCES}/styles/*.css`;
const STYLES_OUTPUT = `${OUTPUT}/styles`;

function transformCSS() {
  return gulp.src(STYLES_SOURCES)
    .on('data', (file) => Object.assign(file, {
      contents: Buffer.from(csso.minify(file.contents.toString()).css),
    }))
    .pipe(gulp.dest(STYLES_OUTPUT));
}

export const build = gulp.series(copyFonts, transformSVG, transformCSS);
