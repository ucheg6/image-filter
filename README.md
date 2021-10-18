# image-filter
Image filtering microservice that receives an image_url and downloads the image to a specified file path

- Built with Nodejs and Typescript
- Deployed on AWS Elastic beanstalk
- Here's a sample ebs endpoint to filter an image `http://uche-image-filter-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://mcdn.wallpapersafari.com/medium/49/9/jmz80P.jpg`
# How to setup:
- git clone https://github.com/ucheg6/image-filter.git
- npm install
- npm run dev
- The app should now be available `http://localhost:8082`
# Popular Issue with jimp
- Some images return this error ```Could not find MIME for buffer (null).```
- I've added a postman collection with a sample request that will help you test this
- Here's the [link](https://github.com/oliver-moran/jimp/issues/643) to the issue 
