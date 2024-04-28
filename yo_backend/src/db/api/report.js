<<<<<<< HEAD


const db = require("../models");

class ReportDBApi {
    static async getReportData() {
        try {
            const reportData = await db.orders.findAll({
                include: [{
                    model: db.users,
                    attributes: ['id', 'bname', 'baddress', 'gst', 'pan'],
                    as: 'user',
                }],
                attributes: ['id', 'status', 'order_no', 'order_date'],
                raw: true, // To return raw JSON data instead of Sequelize instances
                nest: true // To include associations in nested objects
            });
            return reportData;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching report data from the database");
        }
    }
}

module.exports = ReportDBApi;
=======
// api/report.js

const db = require("../models");

class ReportDBApi {
    static async getReportData() {
        try {
            const reportData = await db.orders.findAll({
                include: [{
                    model: db.users,
                    attributes: ['id', 'bname', 'baddress', 'gst', 'pan'],
                    as: 'user',
                }],
                attributes: ['id', 'status', 'order_no', 'order_date'],
                raw: true, // To return raw JSON data instead of Sequelize instances
                nest: true // To include associations in nested objects
            });
            return reportData;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching report data from the database");
        }
    }
}

module.exports = ReportDBApi;
>>>>>>> 95c2e4e83befc92d5e48c2983e2f012a9cb57498
