import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import esbuild from 'esbuild';
import gulp from 'gulp';
import gulpPostcss from 'gulp-postcss';
import gulpRev from 'gulp-rev';
import gulpRevRewrite from 'gulp-rev-rewrite';
import gulpSitemap from 'gulp-sitemap';
import htmlMinifier from 'html-minifier';
import nunjucks from 'nunjucks';
import postcssCsso from 'postcss-csso';
import postcssImport from 'postcss-import';
import postcssMediaMinmax from 'postcss-media-minmax';
import tailwindcss from 'tailwindcss';
import Vinyl from 'vinyl';
import tailwindConfig from './tailwind.config.cjs';

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = dirname(FILENAME);
const PACKAGES = resolve(DIRNAME, 'packages');

/**
 * @param {string} pack
 * @returns {string}
 */
function getTSConfig(pack) {
  return `${PACKAGES}/${pack}/tsconfig.json`;
}

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
 * @param {(content: string) => string} minifier
 * @param {object=} options
 * @returns {Transform}
 */
function transformBy(minifier, options) {
  return new Transform({
    objectMode: true,
    transform(chunk, _, cb) {
      if (chunk.isNull()) throw new Error('Chunk is null');
      if (chunk.isStream()) throw new Error('Streaming not supported');

      try {
        Object.assign(chunk, {
          contents: Buffer.from(minifier(chunk.contents.toString())),
          ...options || {},
        });
      } catch (err) {
        throw new Error(err);
      }

      cb(null, chunk);
    },
  });
}

/**
 * @param {import('esbuild').BuildOptions} options
 * @returns {Transform}
 */
function transformTS(options) {
  /**
   * @type {Buffer[]}
   */
  const chunks = [];

  return new Transform({
    objectMode: true,
    transform(chunk, _, cb) {
      if (!chunk.isBuffer()) throw new Error('Chunk is not Buffer');
      if (chunk.isNull()) throw new Error('Chunk is null');
      if (chunk.isStream()) throw new Error('Streaming not supported');

      chunks.push(chunk);
      cb(null);
    },
    async flush(cb) {
      try {
        const minifier = await esbuild.build({
          bundle: true,
          entryPoints: chunks.map((chunk) => chunk.path),
          format: 'esm',
          minify: true,
          outdir: '.',
          sourcemap: false,
          write: false,
          ...options,
        });

        minifier.outputFiles.forEach((file) => {
          this.push(new Vinyl({
            path: file.path,
            contents: Buffer.from(file.contents),
          }));
        });
      } catch (err) {
        throw new Error(err);
      }

      cb(null);
    },
  });
}

/**
 * @param {string} content
 * @returns {string}
 */
function minifyHTML(content) {
  return htmlMinifier.minify(content, { collapseWhitespace: true });
}

/**
 * @returns {Transform}
 */
function transformHTML() {
  return transformBy(minifyHTML);
}

/**
 * @param {string} searchPath
 * @returns {Transform}
 */
function transformNJK(searchPath) {
  const loader = new nunjucks.FileSystemLoader(searchPath);
  const env = new nunjucks.Environment(loader);

  return transformBy((content) => minifyHTML(env.renderString(content)), {
    extname: '.html',
  });
}

/**
 * @returns {Transform}
 */
function unlinkFiles() {
  return new Transform({
    objectMode: true,
    async transform(chunk, _, cb) {
      if (!chunk.isDirectory()) await fs.unlink(chunk.path);
      cb(null, chunk);
    },
  });
}

const assets = {
  root: getRoot('assets'),
  output: getOutput('assets'),
  copyFonts() {
    return gulp.src(`${assets.root}/fonts/*.woff2`)
      .pipe(gulp.dest(`${assets.output}/fonts`));
  },
  buildImages() {
    return gulp.src(`${assets.root}/images/*.svg`)
      .pipe(transformHTML())
      .pipe(gulp.dest(`${assets.output}/images`));
  },
  buildCSS() {
    return gulp.src(`${assets.root}/styles/core.css`)
      .pipe(gulpPostcss([postcssImport, autoprefixer, postcssCsso]))
      .pipe(gulp.dest(`${assets.output}/styles`));
  },
};

gulp.task('build-assets', gulp.series(
  assets.copyFonts,
  assets.buildImages,
  assets.buildCSS,
));

const www = {
  tsconfig: getTSConfig('www'),
  root: getRoot('www'),
  output: getOutput('www'),
  sync: browserSync.create(),
  initSync() {
    www.sync.init({
      ui: false,
      notify: false,
      server: {
        baseDir: www.output,
      },
    });
  },
  copyManifest() {
    return gulp.src(`${www.root}/manifest.json`).pipe(gulp.dest(www.output));
  },
  copyImages() {
    return gulp.src(`${www.root}/assets/images/*.webp`)
      .pipe(gulp.dest(`${www.output}/assets/images`));
  },
  buildScripts() {
    return gulp.src(`${www.root}/assets/scripts/core.ts`)
      .pipe(transformTS({ tsconfig: www.tsconfig }))
      .pipe(gulp.dest(`${www.output}/assets/scripts`));
  },
  watchScripts() {
    return gulp.watch(`${www.root}/assets/scripts/*.ts`, () => (
      www.buildScripts().pipe(www.sync.stream())
    ));
  },
  buildStyles() {
    return gulp.src(`${www.root}/assets/styles/core.css`)
      .pipe(gulpPostcss([
        postcssImport,
        tailwindcss(tailwindConfig),
        autoprefixer,
        postcssMediaMinmax,
        postcssCsso,
      ]))
      .pipe(gulp.dest(`${www.output}/assets/styles`));
  },
  watchStyles() {
    return gulp.watch(`${www.root}/assets/styles/*.css`, () => (
      www.buildStyles().pipe(www.sync.stream())
    ));
  },
  buildPages() {
    return gulp.src(`${www.root}/pages/*.njk`)
      .pipe(transformNJK(`${www.root}/snippets`))
      .pipe(gulp.dest(www.output));
  },
  watchPages() {
    return gulp.watch([
      `${www.root}/pages/*.njk`,
      `${www.root}/snippets/*.njk`,
    ], () => (
      www.buildPages().pipe(www.sync.stream())
    ));
  },
  createHash() {
    return gulp.src([
      `${www.output}/manifest.json`,
      `${www.output}/assets/images/*.webp`,
      `${www.output}/assets/styles/*.css`,
    ], { base: www.output })
      .pipe(unlinkFiles())
      .pipe(gulpRev())
      .pipe(gulp.dest(www.output))
      .pipe(gulpRev.manifest('rev.json'))
      .pipe(gulp.dest(www.output));
  },
  async replaceHash() {
    const manifest = await fs.readFile(`${www.output}/rev.json`);
    return gulp.src([
      `${www.output}/*.html`,
      `${www.output}/manifest-*.json`,
    ])
      .pipe(gulpRevRewrite({ manifest }))
      .pipe(gulp.dest(www.output));
  },
  createSitemap() {
    return gulp.src(`${www.output}/*.html`)
      .pipe(gulpSitemap({ siteUrl: 'https://svg24.dev/' }))
      .pipe(gulp.dest(www.output))
      .pipe(transformHTML())
      .pipe(gulp.dest(www.output));
  },
  async clearOutput() {
    return fs.unlink(`${www.output}/rev.json`);
  },
};

gulp.task('serve-www', gulp.series(
  gulp.parallel(
    www.copyManifest,
    www.copyImages,
    www.buildScripts,
    www.buildStyles,
    www.buildPages,
  ),
  gulp.parallel(
    www.watchScripts,
    www.watchStyles,
    www.watchPages,
    www.initSync,
  ),
));

gulp.task('build-www', gulp.series(
  www.copyManifest,
  www.copyImages,
  www.buildScripts,
  www.buildStyles,
  www.buildPages,
  www.createSitemap,
  www.createHash,
  www.replaceHash,
  www.clearOutput,
));
