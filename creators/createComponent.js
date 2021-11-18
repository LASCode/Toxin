const fs = require('fs')
const path = require('path')
const name = process.argv[2]
if (name){
  let componentsPath = path.resolve(__dirname, `../src/components`)
  const dir = path.resolve(componentsPath, name)
  console.log(fs.readFileSync(path.resolve(__dirname, '../src/styles/components.scss'), 'utf-8'))
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir)
    fs.writeFileSync(`${dir}/${name}.pug`, '')
    fs.writeFileSync(`${dir}/${name}.js`, '')
    fs.writeFileSync(`${dir}/${name}.scss`, '')
    fs.writeFileSync(
      path.resolve(__dirname, '../src/styles/components.scss'),
      `${fs.readFileSync(path.resolve(__dirname, '../src/styles/components.scss'), 'utf-8')}@import '../components/${name}/${name}.scss';\n`)
  }else{
    console.error('Такой компонент уже существует!')
  }
}else{
  console.error('Вы не ввели название блока')
}