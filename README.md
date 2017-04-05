# dev-env
A basic develop environment on gulp/webpack/vue

## Download
```
git clone https://github.com/xiaofuyesnew/dev-env.git
cd dev-env/
```

## Install
```
#normally
npm install

#China internet windows
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
npm install

#China internet MacOS & Linux
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install
```

## src
source code files directory structure

>```
> src
>   |-lib    //no code changed js file
>   |   |-dev       //dev static lib files
>   |       |-js
>   |       |-css  
>   |   |-dist      //minify static lib files
>   |       |-js
>   |       |-css  
>   |-image  //image files
>   |-script //customer js files
>   |-style  //style files sass and css
>   |   |-sass
>   |   |-css
>   |-tpl    //html files 
>```

## commands
```
#create dev and run browser-sync
gulp dev

#create dist and minify files
gulp build

```