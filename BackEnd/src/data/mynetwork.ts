import mongoose from "mongoose";
import { MyNetworkSchema } from "schema/schema";

const mynetwork = mongoose.model("mynetworks", MyNetworkSchema);

export function saveMyNetwork(bodyData: any) {
    const new_mynetwork = new mynetwork(bodyData);
    return new_mynetwork.save();
}

export function saveMyNetworkUserAdd(bodyData: any, meetpeopleData: any) {
    return mynetwork.findOneAndUpdate({email: bodyData}, {$push:{"meetpeople": meetpeopleData}});
}

export function findMyNetworkUser(bodyData: any, meetpeopleData: any) {
    return mynetwork.findOne({ $and: [{email: bodyData}, {"meetpeople":{"$elemMatch":{"email": meetpeopleData.email}}} ]});
}

export function saveMyNetworkUserIncrease(bodyData: any) {
    console.log('-------------- saveMyNetworkUserIncrease()')
    console.log(bodyData.meetpeople[0].email)
    return (mynetwork.findOne({"meetpeople":{"$elemMatch":{"email": bodyData.meetpeople[0].email}}}).exec()
    .then((result:any) => {
        console.log(result)
        if(result != null){
            console.log('-------------- Start increase')
            mynetwork.findOneAndUpdate({"meetpeople":{"$elemMatch":{"email": bodyData.meetpeople[0].email}}}, {$inc:{"meetpeople.$.meetcount": 1}}, {returnNewDocument: true});
        } else {
            console.log('-------------- Start push')
            mynetwork.findOneAndUpdate({$push:{"meetpeople": bodyData.meetpeople[0]}}, {returnNewDocument: true});
        }
    })
    .catch((error:any) => {
      console.log('-------------- Start push')
      mynetwork.findOneAndUpdate({$push:{"meetpeople": bodyData.meetpeople[0]}}, {returnNewDocument: true});
    })
)}

export function saveMyNetworkUser(bodyData: any) {
    const finduser = mynetwork.findOne({email : bodyData.email}).exec()
    .then((result) => {
        console.log('-------------- find user success')
        result.saveMyNetworkUserIncrease(bodyData)
    })
    .catch((error) => {
        console.log('-------------- not found error')
        console.log(error)
    })

    // return (mynetwork.findOne({email : bodyData.email})
    // .then((result)=> {
    //     if(result != null)
    //     {
    //         console.log('-------------- find user success')
    //         console.log(bodyData)
    //         saveMyNetworkUserIncrease(bodyData)
    //         .then((result:any)=> {
    //             console.log('-------------- saveMyNetworkUserIncrease() success') 
    //             return; })
    //     }
    // })
    // .catch(e => {
    //     console.log(e)
    //     console.log('-------------- save new user success')
    //     const new_mynetwork = new mynetwork(bodyData);
    //     new_mynetwork.save();
    //     return;
    // })


//    await mynetwork.findOne({email : bodyData.email} , (err:mongoose.CallbackError, result:any) => {
//         if(err) {
//             console.log('-------------- not found error')
//             console.log('not found user')
//             const new_mynetwork = new mynetwork(bodyData);
//             return new_mynetwork.save();
//         } else {
//             console.log('-------------- find user success')
//         }
//     })
//     .findOne({ $and: [{email: bodyData.email}, {"meetpeople":{"$elemMatch":{"email": bodyData.meetpeople[0].email}}} ]}, (err:mongoose.CallbackError, result:any) => {
//         if(err) {
//             console.log('not found meet user')
//             mynetwork.findOneAndUpdate({email: bodyData.email}, {$push:{"meetpeople": bodyData.meetpeople[0]}}, {returnNewDocument: true},
//             function (error:mongoose.CallbackError, success:any) {
//                 if (error) {
//                     console.log('-------------- push error')
//                     console.log(error);
//                 } else {
//                     console.log('-------------- push success')
//                     console.log(success);
//                 }
//                 return 
//             });
//         } else {
//             console.log('-------------- find user and meetuser success')
//         }
//     })
//     .findOneAndUpdate({ $and: [{email: bodyData.email}, {"meetpeople":{"$elemMatch":{"email": bodyData.meetpeople[0].email}}} ]}, {$inc:{"meetpeople.$.meetcount": 1}}, {returnNewDocument: true},
//     function (error:mongoose.CallbackError, success:any) {
//         if (error) {
//             console.log('-------------- increase error')
//             console.log(error);
//         } else {
//             console.log('-------------- increase success')
//             console.log(success);
//         }
//         return
//     });

    }

export function findMyNetwork(bodyData: any) {
    return mynetwork.findOne({email : bodyData});
}