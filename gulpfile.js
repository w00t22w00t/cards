// Определяем переменную "preprocessor"
let preprocessor = 'sass'; 
 
// Определяем константы Gulp
const { src, dest, parallel, watch } = require('gulp');

// Подключение babel
const babel = require('gulp-babel');
 
// Подключаем Browsersync
const browserSync = require('browser-sync').create();

// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

// Подключаем модули gulp-sass 
const sass = require('gulp-sass');
 
// Подключаем gulp-concat
const concat = require('gulp-concat');
 
// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
 
// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');
 
// Подключаем gulp-imagemin для работы с изображениями
const imagemin = require('gulp-imagemin');
 
// Подключаем модуль gulp-newer
const newer = require('gulp-newer');
 
// Подключаем модуль del
const del = require('del');

 
function styles() {
	return src([
		'scss/general/main.scss',
		'scss/general/header.scss'
	]) // Выбираем источник: "sass/main.sass" или "less/main.less"
	.pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat('main.css')) // Конкатенируем в файл app.min.js
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest('build/css/')) // Выгрузим результат в папку "css/"
}

function customStyles() {
	return src([
		'scss/*.scss',
	]) // Выбираем источник: "sass/main.sass" или "less/main.less"
	.pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest('build/css/')) // Выгрузим результат в папку "css/"
}

function scripts() {
    return src([ // Берём файлы из источников
        'js/**/*.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
    ])
	.pipe(babel())
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest('build/scripts/')) // Выгружаем готовый файл в папку назначения
}


function startwatch() {
	 
    // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
    watch(['js/*.js', '!**/*.min.js'], scripts);
    
    // Мониторим файлы препроцессора на изменения
    watch(['scss/general/*.scss', '!css/**/*.min.css'], styles);
	watch(['scss/*.scss', '!css/**/*.min.css'], customStyles);

    // Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch('img/src/**/*', images);
 
}
 
function images() {
	return src('images/src/**/*') // Берём все изображения из папки источника
	.pipe(newer('build/images/')) // Проверяем, было ли изменено (сжато) изображение ранее
	.pipe(imagemin()) // Сжимаем и оптимизируем изображеня
	.pipe(dest('build/images/')) // Выгружаем оптимизированные изображения в папку назначения
}
 
function cleanimg() {
	return del('images/build/**/*', { force: true }) // Удаляем всё содержимое папки "images/dest/"
}

// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;
 
// Экспортируем функцию styles() в таск styles
exports.styles = styles;
exports.customStyles = customStyles;
 
// Экспорт функции images() в таск images
exports.images = images;
 
// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;
 
// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, customStyles, scripts, images, startwatch);