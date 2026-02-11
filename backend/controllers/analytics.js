import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/order.js";

/**
 * MAIN ANALYTICS CONTROLLER
 */
export const getAnalysis = async (req, res) => {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);

        const summary = await getSummaryAnalytics();
        const dailySales = await getDailySales(startDate, endDate);

        res.status(200).json({
            summary,
            dailySales
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * SUMMARY ANALYTICS
 */
const getSummaryAnalytics = async () => {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();

    const salesAgg = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: 1 },
                totalRevenue: { $sum: "$totalAmount" }
            }
        }
    ]);

    const { totalSales = 0, totalRevenue = 0 } = salesAgg[0] || {};

    return {
        users,
        products,
        totalSales,
        totalRevenue
    };
};

/**
 * DAILY SALES WITH EMPTY DAYS FILLED
 */
const getDailySales = async (startDate, endDate) => {
    const salesData = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt"
                    }
                },
                count: { $sum: 1 },
                revenue: { $sum: "$totalAmount" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    const dateArr = getDateArray(startDate, endDate);

    return dateArr.map(date => {
        const dailyData = salesData.find(sale => sale._id === date);
        return {
            date,
            count: dailyData ? dailyData.count : 0,
            revenue: dailyData ? dailyData.revenue : 0
        };
    });
};

/**
 * DATE HELPER
 */
const getDateArray = (start, end) => {
    const dates = [];
    let current = new Date(start);

    while (current <= end) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
    }

    return dates;
};
