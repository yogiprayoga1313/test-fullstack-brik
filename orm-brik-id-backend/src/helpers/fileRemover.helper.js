const fs = require('fs')
const fileRemover = (file) => {
    try {
        if(file){
            const fileName = `uploads/${file.filename}`
            if(fileName){
                fs.unlink(fileName, (err)=>{
                    if(err){
                        return console.log(err)
                    }
                })
            }
        }
    } catch (err) {
        throw Error('error')
    }
}

module.exports = fileRemover
