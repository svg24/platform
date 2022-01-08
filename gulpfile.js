import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpPostcss from 'gulp-postcss';
import gulpRev from 'gulp-rev';
import gulpRevRewrite from 'gulp-rev-rewrite';
import gulpSitemap from 'gulp-sitemap';
import htmlMinifier from 'html-minifier';
import nunjucks from 'nunjucks';
import postcssCsso from 'postcss-csso';
import postcssImport from 'postcss-import';

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = dirname(FILENAME);
const PACKAGES = resolve(DIRNAME, 'packages');

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
  const stream = new Transform({ objectMode: true });

  stream._transform = function transform(chunk, _, cb) {
    if (chunk.isNull()) throw new Error('File is null');
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
  };

  return stream;
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
  const stream = new Transform({ objectMode: true });

  stream._transform = async function transform(chunk, _, cb) {
    if (!chunk.isDirectory()) await fs.unlink(chunk.path);
    cb(null, chunk);
  };

  return stream;
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
  buildStyles() {
    return gulp.src(`${www.root}/assets/styles/core.css`)
      .pipe(gulpPostcss([postcssImport, autoprefixer, postcssCsso]))
      .pipe(gulp.dest(`${www.output}/assets/styles`));
  },
  watchStyles() {
    return gulp.watch(`${www.root}/assets/styles/*.css`, () => (
      www.buildStyles().pipe(www.sync.stream())
    ));
  },
  copyManifest() {
    return gulp.src(`${www.root}/manifest.json`).pipe(gulp.dest(www.output));
  },
  copyImages() {
    return gulp.src(`${www.root}/assets/images/*.webp`)
      .pipe(gulp.dest(`${www.output}/assets/images`));
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
  }
};

gulp.task('serve-www', gulp.series(
  gulp.parallel(www.buildPages, www.buildStyles),
  gulp.parallel(www.watchPages, www.initSync),
));

gulp.task('build-www', gulp.series(
  www.buildPages,
  www.buildStyles,
  www.copyManifest,
  www.copyImages,
  www.createHash,
  www.replaceHash,
  www.createSitemap,
  www.clearOutput,
));
