const { MongoClient } = require('mongodb');
const dbName = 'test-dev';
const url = 'mongodb+srv://test-dev:xxxxxx@test-dev.ttnel.mongodb.net/test-dev';
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
  try{
    context.callbackWaitsForEmptyEventLoop = false
    if(event.userName.match(/google/)){
      let user;
      const usersCollection = await main();

      if(usersCollection){
        user = await usersCollection.find({email: event.request.userAttributes.email}).toArray();
        if(user){
          console.log('updating userAttributes')
          event.response.userAttributes = {
            "email": event.request.userAttributes.email,
            "email_verified": user[0].isEmailVerified.toString(),
            "custom:mongoId": user[0]._id.toString(),
            "custom:subscriptionIdV2": user[0].subscriptionId,
            "custom:isTrialUsedV2": user[0].isTrialUsed.toString(),
            "custom:customerIdV2": user[0].customerId,
            "custom:shareUserName": user[0].shareUserName,
            "name": user[0].fullName,
            "custom:analyticsCustomerId": user[0].analyticsCustomerId,
          };
          context.succeed(event);
        }else{
          callback("Wrong password");
        }
      }
    }
    event.response.autoConfirmUser = true;
  }catch(err){
    callback('error')
  }
  
    
  
  
};
