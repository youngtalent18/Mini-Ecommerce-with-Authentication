import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/order.js";
export async function getAnalysis(req,res){
    try {
        const analysis = await AnalyticsModel();
        const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

        const salesData = await getDailySales(startDate, endDate);

           
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: error.message });
    }
}

export const AnalyticsModel = async (req,res) =>{
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: 1 },
                totalRevenue: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

    return {
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue
    }  
}

export const getDailySales = async (startDate, endDate) => {
    const salesData = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 },
                revenue: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
    return salesData;

}
    const dateArr = getDateArray(startDate, endDate);

    return dateArr.map(date => {
        const dailyData = salesData.find(sale => sale._id === date);
        return {
            date,
            count: dailyData ? dailyData.count : 0,
            revenue: dailyData ? dailyData.revenue : 0
        };
    });

function getDateArray(start, end) {
    const dates = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}