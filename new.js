/* eslint-disable */
'use strict';

// Генератор файлов блока

// Использование: node new.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');
const projectConfig = require('./config.js');

const dir = projectConfig.dir;
const mkdirp = require('mkdirp');

const blockName = process.argv[2];
const defaultExtensions = ['scss']; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока
if (blockName) {
  const dirPath = `${dir.blocks}${blockName}/`; // полный путь к создаваемой папке блока

  const made = mkdirp.sync(dirPath);
  console.log(`[MSG] Создание папки: ${made}`);

  // Обходим массив расширений и создаем файлы, если они еще не созданы
  extensions.forEach((extension) => {
    const filePath = `${dirPath + blockName}.${extension}`; // полный путь к создаваемому файлу
    let fileContent = '';                                   // будущий контент файла
    let fileCreateMsg = '';                                 // будущее сообщение в консоли при создании файла

    if (extension === 'scss') {
      fileContent = `.${blockName} {\n  $block-name: &; // #{$block-name}__element\n}\n`;
      // fileCreateMsg = '';
    }

    else if (extension === 'js') {
      fileContent = `// import ready from "../../js/utils/documentReady.js";\n\n// ready(function () {\n//   \n// });\n`;
    }

    else if (extension === 'md') {
      fileContent = '';
    }

    else if (extension === 'pug') {
      fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})\n\nmixin ${blockName}(text, mods)\n\n  //- Принимает:\n  //-   text    {string} - текст\n  //-   mods    {string} - список модификаторов\n  //- Вызов:\n        +${blockName}('Текст', 'some-mod')\n\n  -\n    // список модификаторов\n    var allMods = '';\n    if(typeof(mods) !== 'undefined' && mods) {\n      var modsList = mods.split(',');\n      for (var i = 0; i < modsList.length; i++) {\n        allMods = allMods + '${blockName}--' + modsList[i].trim();\n      }\n    }\n\n  .${blockName}(class=allMods)&attributes(attributes)\n    .${blockName}__inner\n      block\n`;
    }

    else if (extension === 'img') {
      const imgFolder = `${dirPath}img/`;
      if (fileExist(imgFolder) === false) {
        const made = mkdirp.sync(imgFolder);
        console.log(`[MSG] Создание папки: ${made}`);
      } else {
        console.log(`[MSG] Папка ${imgFolder} НЕ создана (уже существует) `);
      }
    }

    else if (extension === 'symbols') {
      const symbolsFolder = `${dirPath}symbols/`;
      if (fileExist(symbolsFolder) === false) {
        const made = mkdirp.sync(symbolsFolder);
        console.log(`[MSG] Создание папки: ${made}`);
      } else {
        console.log(`[MSG] Папка ${symbolsFolder} НЕ создана (уже существует) `);
      }
    }

    if (fileExist(filePath) === false && extension !== 'img' && extension !== 'md' && extension !== 'symbols') {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          return console.log(`[MSG] Файл НЕ создан: ${err}`);
        }
        console.log(`[MSG] Файл создан: ${filePath}`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    }
    else if (extension !== 'img' && extension !== 'md') {
      console.log(`[MSG] Файл НЕ создан: ${filePath} (уже существует)`);
    }
    else if (extension === 'md') {
      fs.writeFile(`${dirPath}readme.md`, fileContent, (err) => {
        if (err) {
          return console.log(`[MSG] Файл НЕ создан: ${err}`);
        }
        console.log(`[MSG] Файл создан: ${dirPath}readme.md`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    }
  });
} else {
  console.log('[MSG] Отмена операции: не указан блок');
}



function uniqueArray(arr) {
  const objectTemp = {};
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    objectTemp[str] = true;
  }
  return Object.keys(objectTemp);
}

function fileExist(path) {
  const fs = require('fs');
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}
