//@flow
import express from 'express';
import { staticFolder, httpPort } from 'config';

class Server extends express
{
  constructor() {
    super(...arguments);

    // Set static folder
    this.use(express.static(staticFolder));

    // Start server & listen on port
    this.listen(httpPort);
  }
}

export default Server;
