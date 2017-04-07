import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from'rollup-plugin-commonjs';

import vue from 'rollup-plugin-vue2';
import css from 'rollup-plugin-css-only';
import sass from 'rollup-plugin-sass';

import uglify from 'rollup-plugin-uglify';

export default {
    entry : 'src/components/index.js',
    format : 'umd',
    moduleName : 'WebApi',
    dest : 'dist/scripts/components.js',
    sourceMap: true,
    plugins : [
        vue(),
        sass({
            output:'dist/styles/components.css'
        }),
        //uglify(),
        resolve({jsnext: true, main: true, browser: true}),
        commonjs({
            exclude: ['node_modules/vue/**']
        }),
        babel({
            exclude: ['node_modules/**', 'bower_components/**']
        }),
        json()
    ]
};