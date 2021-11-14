const fs = require('fs'),
      path = require('path')


const createProjectManager = (globalDir)=>{
  const getPageObj = ({pages, pagesDir})=>{
    return pages.map(page=>{
      const pageName = page,
        pagePath = path.resolve(pagesDir, page),
        pageFiles = fs.readdirSync(path.resolve(pagesDir, page)),
        pageObj = {pageName, pagePath, files: {}}
      pageFiles.forEach(file=>{
        pageObj.files[file.split('.')[1]] = {fileName: file, path: path.resolve(pagePath, file)}
      })
      return pageObj
    })
  }
  const getFilesByType = (pagesData, type)=>{
    return pagesData.filter(page => page.files[type]).map(page => ({
      filePath: page.files[type].path,
      pageName: page.pageName,
      fileName: page.files[type].fileName
    }))
  }
  const getEntries = (pagesObj, type)=>{
    let entries = {}
    getFilesByType(pagesObj, type).map(el=>(entries[el.pageName]= el.filePath))
    return entries
  }

  const srcDir= path.resolve(globalDir, 'src'),
        distDir= path.resolve(globalDir, 'dist'),
        pagesDir= path.resolve(srcDir, 'pages'),
        pagesList= fs.readdirSync(pagesDir),
        pagesObj = getPageObj({pages: pagesList, pagesDir: pagesDir}),
        entries = getEntries(pagesObj, 'js')

  return {
    PM_path: {
      global: globalDir,
      src: srcDir,
      dist: distDir,
      pages: pagesDir
    },
    PM_entries: {
      entries
    },
    PM_fun: {
      getFilesByType
    }
  }
}
module.exports = createProjectManager