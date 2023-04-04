// cred = https://github.com/keystonejs/keystone-discussions-archive/discussions/54
// crd - https://stackoverflow.com/questions/70645438/how-to-seed-upload-images-in-keystonejs-6
// https://github.com/keystonejs/keystone/search?q=upload
// @ts-nocheck
import mime from 'mime'
import fs from 'fs'
import path from 'path'
// TODO why is this library messed up?
// import { Upload } from 'graphql-upload'
import { createUploadLink } from "apollo-upload-client";


export const prepareToUpload = (filePath: string) => {
  const filename = path.basename(filePath)
  console.log({filename});
  

  const createReadStream = () => fs.createReadStream(filePath)
  // @ts-ignore
  const mimetype = mime.getType(filePath)
  const encoding = 'utf-8'

  const image = {
    createReadStream,
    filename,
    mimetype,
    encoding,
  }

  const upload = new createUploadLink()
  upload.resolve(image)

  return upload
}