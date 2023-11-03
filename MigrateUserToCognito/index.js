const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const dbName = 'test-dev';
const url = 'mongodb+srv://test-dev:xxxxx@test-dev.ttnel.mongodb.net/test-dev';
const client = new MongoClient(url);


async function main() {
  try{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const users = db.collection('users');
    return users;
  }catch(err){
    console.log('main err: ', err)
  }
  
}
exports.handler = async (event, context, callback) => {

    let user;
    
    const usersCollection = await main();
    
    
    if ( event.triggerSource == "UserMigration_Authentication" ) {
      const { userName } = event;
      console.log('user name: ', userName);
      user = await usersCollection.find({email: userName}).toArray();
      console.log('event: ', event.request.password)
      
      if(user){
        try{
            console.log('user: ', user[0]);
          // check password
          console.log('user password: ', user[0]?.password)
          const comparedPassword = await bcrypt.compare(event?.request?.password, user[0]?.password)
          console.log('comparedPassword before if: ', comparedPassword)
          if (comparedPassword){
            console.log('comparedPassword: ', comparedPassword)
            event.response.userAttributes = {
                  "email": userName,
                  "email_verified": "true"
            };
            console.log('event.response: ', event.response.userAttributes)
            event.response.finalUserStatus = "CONFIRMED";
            event.response.messageAction = "SUPPRESS";
            context.succeed(event);
          }else{
            console.log('Wrong password')
            callback("Wrong password");
          }
        }catch(err){
          console.log('err on event response: ', err)
        }
        
      }
    }
  }
    
};
