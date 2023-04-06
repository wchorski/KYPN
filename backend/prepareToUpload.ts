import mime from 'mime'
import fs from 'fs'
import path from 'path'
// @ts-ignore
// import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
// import  Upload  from 'graphql-upload/Upload.mjs'
const { Upload } = import("graphql-upload/Upload.mjs")
// import type { FileUpload as FileUploadType } from 'graphql-upload/Upload.mjs'
//// @ts-ignore
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

export const prepareToUpload = (filePath:string) => {
  console.log('==========================');
  console.log(filePath);
  
  const filename = path.basename(filePath)
  console.log(filename);
  

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

  // const upload = new GraphQLUpload()
  const upload = new Upload()
  // @ts-ignore
  upload.resolve(image)

  return upload
}