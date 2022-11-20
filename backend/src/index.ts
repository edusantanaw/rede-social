import {httpServer} from './socket/socket'
const Port = process.env.PORT || 5001;

httpServer.listen(Port, (): void => {
  console.log(`Server is running on port:${Port}`);
});
