#!/usr/bin/env node

const fs = require('fs'),
    rimraf = require('rimraf'),
    path = require('path'),
    argv = require('yargs').argv,
    exec = require('child_process').exec,
    targetProjectPath = process.env.PWD,
    // confFilesPath = path.resolve(__dirname, '../configDocs'),

    targetPackage = require(path.join(targetProjectPath, 'package.json'))

function copyFile(src, dist, cb) {
    // fs.createReadStream(src).pipe(fs.createWriteStream(dist))
    const writeStream = fs.createWriteStream(src)
    writeStream.on('finish', () => {
        cb && cb()
    })
    fs.createReadStream(src).pipe(writeStream)
}

function log(msg) {
    return () => console.log(msg)
}

if (fs.existsSync('shark-eslint-configs')) {
    rimraf.sync('shark-eslint-configs')
}

exec('git clone git@git.mail.netease.com:support/shark-eslint-configs.git', (err, stdout, stderr) => {
    if (err) throw err
    const confFilesPath = path.resolve(targetProjectPath, 'shark-eslint-configs')
    const npmScript = require(path.join(confFilesPath, 'package.script'))
    targetPackage.scripts = targetPackage.scripts.constructor === Object ? Object.assign(targetPackage.scripts, npmScript) : npmScript

    copyFile(path.join(confFilesPath, '.editorconfig'), path.join(targetProjectPath, '.editorconfig'), log('.editorconfig 写入成功'))
    copyFile(path.join(confFilesPath, `.eslintrc${argv.t ? `-${argv.t}` : ''}.json`), path.join(targetProjectPath, '.eslintrc.json'), log('.eslintrc.json 写入成功'))
    copyFile(path.join(confFilesPath, '.eslintignore'), path.join(targetProjectPath, '.eslintignore'), log('.eslintignore 写入成功'))

    fs.writeFile(path.join(targetProjectPath, 'package.json'), JSON.stringify(targetPackage, null, 4), log('npm scripts 写入成功'))

    const addPreCommit = exec('npm run postinstall -s', (err, stdout, stderr) => {
        if (err) throw err
        console.log('git pre commit 钩子写入成功')
    })

    rimraf.sync('shark-eslint-configs')
})
