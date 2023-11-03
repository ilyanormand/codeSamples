// Deploy code

const MailService = require('@sendgrid/mail').MailService
const { MongoClient, ObjectId } = require('mongodb');

const dbName = 'test-dev';
const url = 'mongodb+srv://test-dev:xxxxx@test-dev.ttnel.mongodb.net/test-dev'

const client = new MongoClient(url);

const templates = {
    welcomeEmail: 'xxxxx1',
    verifyEmail: 'xxxxx2',
    subscriptionUpdated: 'xxxxx3',
    trialWillEnd: 'xxxxx4',
    accountBalanceUpdated: 'xxxxx5',
    developerInstructions: 'xxxxx6',
    accountEmailChange: 'xxxxx7',
    accountDeletion: 'xxxxx8',
    accountPasswordChange: 'xxxxx9',
    updateAccountPasswordRequest: `xxxxx10`,
    passwordChangedSuccess: 'xxxxx11',
    firstFormIsPublished: 'xxxxx12',
    detachPaymentMethod: 'xxxxx13',
    regularPaymentNotReceivedInTime: 'xxxxx14',
    firstPaymentAfterPlanChanging: 'xxxxx15',
    scheduledPaymentWasReceived: 'xxxxx16',
    regularPaymentWasExpiredAt7Days: 'xxxxx17',
    welcomeToReferralProgram: `xxxxx18`,
    thanksForRecommending: `xxxxx19`,
    getReadyForRewards: `xxxxx20`,
    shopifyWebhookUserDataRequest: `xxxxx21`,
    gdprSendProjectsInZip: 'xxxxx22',
    hourWithoutProjects: 'xxxxx23',
}

const defaultMailer = new MailService();
const marketingMailer = new MailService();

marketingMailer.setApiKey('test_api_key');
defaultMailer.setApiKey('test_api_key');


async function checkingPlanLimits(submissionId, userId, projectId, sendType, dbCollectionsForNotifications){
}

async function main() {
  try{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const projects = db.collection('projects');
    const planLimits = db.collection('planlimits')
    const submissions = db.collection('submissions')
    const notifications = db.collection('notifications')
    return { projects, planLimits, submissions, notifications };
  }catch(err){
    console.log('main err: ', err)
  }
}

async function sendProjectNotifications(data, sendType, type, collections){
  console.log('submission collection: ', data)
  
  console.log('project collection: ', projects[0])
}


exports.handler = async (event) => {
    console.log('Deploy test')
    const dbCollectionsForNotifications = await main();
    for( let { body } of event.Records){
        try {
            console.log('body: ', body)
            body = JSON.parse(body)
            let mailer = defaultMailer;
            if (body?.submissionReq === false){
                if (body?.templateId === templates.hourWithoutProjects) {
              mailer = marketingMailer;
                }
                return await mailer.send({
                  to: body?.emailTo,
                  from: {
                      email: body?.from,
                      name: 'test',
                  },
                  templateId: body?.templateId,
                  dynamicTemplateData: body?.templateData,
                  attachments: body?.attachments,
                });
            } else { 
              const submission = await dbCollectionsForNotifications.submissions.find({_id: ObjectId(body?.submissionId)}).toArray()
              if(!submission){
                return
              }
              const project_id = submission[0]?.project_id
              const projects = await collections.projects.find({ project_id }).toArray()
              sendProjectNotifications(submission[0], 'submitted', '', dbCollectionsForNotifications)
            }
            
        } catch (err) {
            throw err;
        }
    }
};
