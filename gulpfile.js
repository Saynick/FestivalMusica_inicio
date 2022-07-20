const {src ,dest, watch, parallel} = require("gulp");

//CSS
const sass =require ("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//IMAGENES
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css (done){
     src('src/scss/**/*.scss')//Identificar el archivo de SASS
    .pipe(plumber())//Compila las funciones de plumber
    .pipe(sass())//Compilar las funciones de SASS
    .pipe(dest("build/css"));//Almacenarla en el disco duro

    done();//callback que avisa a gulp cuando llegamos al final
}

function versionWebp( done ){

    const opciones ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe( webp(opciones))
    .pipe( dest('build/img'))

    done();
}

function versionAvif( done ){

    const opciones ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe( avif(opciones))
    .pipe( dest('build/img'))

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    done ();
}

function imagenes (done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache (imagemin(opciones) ) )
    .pipe(dest ('build/img'))
    
    done();
}

exports.css = css; //npm run dev "O" npx gulp dev// esto será a manera de ejecutar cualquiera de las ambas opciones
exports.imagenes= imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev);
