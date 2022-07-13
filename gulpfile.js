const {src ,dest, watch} = require("gulp");
const sass =require ("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

function css (done){
     src('src/scss/**/*.scss')//Identificar el archivo de SASS
    .pipe(plumber())//Compila las funciones de plumber
    .pipe(sass())//Compilar las funciones de SASS
    .pipe(dest("build/css"));//Almacenarla en el disco duro

    done();//callback que avisa a gulp cuando llegamos al final
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    done ();
}

exports.css = css; //npm run dev "O" npx gulp dev// esto será a manera de ejecutar cualquiera de las ambas opciones
exports.dev = dev;
