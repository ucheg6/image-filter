import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  app.get( "/filteredimage", async ( req: Request, res: Response ) => {
    const {image_url} = req.query
    let filteredImagePath: string

    if (!image_url) {
        return res
          .status(400)
          .send({Error: "Please supply a valid image_url"})
      }

      if (typeof image_url !== "string") {
        return res
          .status(422)
          .send({Error: "Please check that the image_url you supplied is a string"})
      }
  
    try {
        const filteredImage = await filterImageFromURL(image_url)
        if(filteredImage) {
            return res
            .status(200)
            .send({filteredImage, msg: "Image url filtered successfully"})
        }
        } catch (err) {
             console.error("Failed to filter image url:", err)
        return res
            .status(500)
            .send({Error: "The image Url couldn't be filtered, Try again"})
        }
     await deleteLocalFiles([filteredImagePath])
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();