const { UserModel } = require("../models/userModel");

async function intialBooking(req, res) {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        const productId = req.body.productId;
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        const price = product.price;
        const payment_capture = 1;
        const orderConfig = {
            amount: price * 100,
            currency: "INR",
            payment_capture
        }
        const order = await razorPayInstance.create(orderConfig);
        const bookingDetails = {
            price,
            payment_order_id: order.id,
            user: userId,
            product: productId
        }
        const booking = awaitBookingModel.create(bookingDetails);
        user.bookings.push(booking["_id"]);
        await user.save();

        res.status(200).json({
            status:"success",
            meessage:{
                order,
                email:user.email,
                
            }
        })
    } catch (err) {

    }
}