Parse.Cloud.define("hello", function (request, response) {
    response.success("Hello world, trujunzhang!");
});

// Parse.Cloud.beforeSave("ShippingTask", function (request, response) {
//     var admin = request.object.get('admin');
//     var client = request.object.get('client');
//     var shipment = request.object.get('shipment');
//
//     console.log('before save ShippingTask:', request.object.toJSON());
//
//     // const Shipment = Parse.Object.extend('Shipment');
//
//     // new Parse.Query(Shipment).equalTo("objectId", shipmentId)
//     //     .first()
//     //     .then((invitedShipment) => {
//     //         console.log('found b4 save Testing1', invitedShipment.toJSON());
//     //         request.object.set("shipment", invitedShipment);
//     //         response.success();
//     //     }, (error) => {
//     //         response.success("error with push: " + error + ", before saved 'ShippingTask'!");
//     //     });
// });

Parse.Cloud.afterSave("ShippingTaskyyy", function (request, response) {

});

Parse.Cloud.afterSave("ShippingTask", function (request, response) {
    console.log('1. *** Change "Shipment.status" after save ShippingTask, shipmentId:', request.object.get('shipment').id);

    const Shipment = Parse.Object.extend('Shipment');
    new Parse.Query(Shipment).equalTo("objectId", request.object.get('shipment').id)
        .first()
        .then((invitedShipment) => {
            invitedShipment.set("status", "ordered");
            invitedShipment.save();

            console.log('2. ### First shipment after save ShippingTask:', invitedShipment.toJSON());

            // response.success();
        }, (error) => {
            // response.success("error with push: " + error + ", before saved 'ShippingTask'!");
        });

    console.log('3. *** Push Notification after save ShippingTask:', request.object.toJSON());

    // Find devices associated with these users
    var pushQuery = new Parse.Query(Parse.Installation);
    // need to have users linked to installations
    pushQuery.equalTo('user', request.object.get('client'));

    //Send Push message
    Parse.Push.send({
        where: pushQuery,
        data: {
            alert: `${request.object.get('adminName')}  invited you an order, ${request.object.get('shipName')}!`,
            sound: "default"
        },
    }, {
        success: function () {
            console.log('4. *** Push Notification successfully!');

            // Push was successful
            response.success("push sent, after saved 'ShippingTask'!");
        },
        error: function (error) {
            // Push was unsucessful
            response.success("error with push: " + error + ", after saved 'ShippingTask'!");
        },
        useMasterKey: true
    });
});