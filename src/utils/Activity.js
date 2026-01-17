import Activity from '../models/Activity.model.js'


export async function RecordActivity(activitys){

    try{

        if(!activitys){
            throw new Error();
        }
        const newActivitys=await Activity(activitys)

        await newActivitys.save()

    }
    catch(err){
        console.log(err)
    }

}