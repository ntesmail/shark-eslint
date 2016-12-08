#!/usr/bin/env node

const fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec
    targetProjectPath = process.env.PWD,
    confFilesPath = path.resolve(__dirname, '../configDocs')
    npmScript = require('../configDocs/package.script')
    targetPackage = require(path.join(targetProjectPath, 'package.json'))

function copyFile(src, dist) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dist))
}

targetPackage.scripts = targetPackage.scripts.constructor === Object ? Object.assign(targetPackage.scripts, npmScript) : npmScript

copyFile(path.join(confFilesPath, '.editorconfig'), path.join(targetProjectPath, '.editorconfig'))
copyFile(path.join(confFilesPath, '.eslintrc.json'), path.join(targetProjectPath, '.eslintrc.json'))
copyFile(path.join(confFilesPath, '.eslintignore'), path.join(targetProjectPath, '.eslintignore'))

fs.writeFileSync(path.join(targetProjectPath, 'package.json'), JSON.stringify(targetPackage, null, 4))

const addPreCommit = exec('npm run postinstall -s', (err, stdout, stderr) => {
    if(err) throw err
    console.log(stdout)
})