const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

var CODE = "";
const SERVER_API_URL = "https://api.kuvera.in/mf/api/v4";
const GET_FUNDS = `${SERVER_API_URL}/fund_schemes/list.json?v=${moment().dayOfYear()}`;
const GET_FUNDS_DETAILS = (fundCodeListString) =>
	`${SERVER_API_URL}/fund_schemes/${fundCodeListString}.json?v=${moment().dayOfYear()}`;
let codes = [];

const main = () => {
	axios.get(GET_FUNDS).then(async (response) => {
		const { data } = response;
		const actualFunds = JSON.stringify(await formatData(data), (k, v) => {
			return v === null ? undefined : v;
		});
		fs.writeFile(
			"/home/harsha9554/code/projects/web/java/muffin-server/src/muffin-data-js/src/resources/muffin-data.json",
			actualFunds,
			(err) => {
				if (err) {
					throw err;
				}
				console.log("JSON write OK.");
			}
		);
	});
};

const formatData = async (data) => {
	let fundList = [];
	const categoryList = Object.keys(data);
	categoryList.forEach((category) => {
		const subCategoryList = Object.keys(data[category]);
		subCategoryList.forEach((subCategory) => {
			const fundHouseList = Object.keys(data[category][subCategory]);
			fundHouseList.forEach((fundHouse) => {
				data[category][subCategory][fundHouse].forEach((fund) => {
					const {
						c,
						kc,
						n,
						r,
						// re,
						v,
					} = fund;
					debugger;
					fundList.push({
						name: n,
						code: c,
						returns: r,
						volatility: v,
						categoryMentioned: kc,
						category,
						subCategory,
					});
				});
			});
		});
	});
	const DATA_BATCH_SIZE = 50;
	const NUMBER_OF_API_CALLS = Math.ceil(fundList.length / DATA_BATCH_SIZE);

	const promiseList = [];
	for (let i = 0; i < NUMBER_OF_API_CALLS; i++) {
		const fundCodeListString = fundList
			.slice(i * DATA_BATCH_SIZE, i * DATA_BATCH_SIZE + DATA_BATCH_SIZE)
			.reduce((prev, curr) => (prev ? `${prev}|${curr.code}` : curr.code), "");
		const apiPromise = axios
			.get(GET_FUNDS_DETAILS(fundCodeListString))
			.then((response) => {
				const { data } = response;
				data.forEach((details, index) => {
					/* [ 'code',
						'name',
						'short_name',
						'category',
						'fund_house',
						'fund_name',
						'short_code',
						'detail_info',
						'ISIN',
						'tax_period',
						'nav',
						'last_nav',
						'jan_31_nav',
						'start_date',
						'fund_type',
						'fund_category',
						'plan',
						'expense_ratio',
						'expense_ratio_date',
						'fund_manager',
						 ]

					 */
					const {
						short_name,
						fund_house,
						fund_name,
						short_code,
						detail_info,
						ISIN,
						tax_period,
						nav,
						start_date,
						fund_type,
						fund_category,
						plan,
						expense_ratio,
						expense_ratio_date,
						fund_manager,
					} = details;

					const FundKeys = Object.keys(details);
					if(FundKeys.includes('nav')) {
						fundList[i * DATA_BATCH_SIZE + index].details = {
							shortName: short_name,
							fundHouse: fund_house,
							fundName: fund_name,
							shortCode: short_code,
							detailInfo: detail_info,
							isin: ISIN,
							taxPeriod: tax_period,
							navData: nav,
							startDate: start_date,
							fundType: fund_type,
							fundCategory: fund_category,
							plan: plan,
							expenseRatio: expense_ratio,
							expenseRatioDate: expense_ratio_date,
							fundManager: fund_manager,
						};
					} else {
						fundList[i * DATA_BATCH_SIZE + index].details = {
							shortName: short_name,
							fundHouse: fund_house,
							fundName: fund_name,
							shortCode: short_code,
							detailInfo: detail_info,
							isin: ISIN,
							taxPeriod: tax_period,
							navData: {"nav":0,"date":""},
							startDate: start_date,
							fundType: fund_type,
							fundCategory: fund_category,
							plan: plan,
							expenseRatio: expense_ratio,
							expenseRatioDate: expense_ratio_date,
							fundManager: fund_manager,
						};

					}
				});
			});
		promiseList.push(apiPromise);
	}
	await Promise.all(promiseList);
	console.log(fundList[0]);
	return fundList;
};

main();

// {
// 	"name": "Taurus Flexi Cap Growth Direct Plan",
// 	"code": "TRSSG1-GR",
// 	"returns": {
// 	"1": 21.81,
// 		"3": 10.58,
// 		"5": 10.89,
// 		"inception": 10.01,
// 		"date": "2021-12-28"
// },
// 	"volatility": 16.97,
// 	"categoryMentioned": "Equity",
// 	"category": "Equity",
// 	"subCategory": "Flexi Cap Fund",
// 	"details": {
// 	"code": "TRSSG1-GR",
// 		"name": "Taurus Flexi Cap Growth Direct Plan",
// 		"shortName": "Taurus Flexi Cap",
// 		"categoty": "Equity",
// 		"fundHouse": "TAURUSMUTUALFUND_MF",
// 		"fundName": "TAURUS Mutual Fund",
// 		"shortCode": "taurus",
// 		"detailInfo": "https://www.taurusmutualfund.com/sid",
// 		"ISIN": "INF044D01BU9",
// 		"taxPeriod": 365,
// 		"nav": { "nav": 150.88, "date": "2021-12-28" },
// 	"lastNav": { "nav": 149.39, "date": "2021-12-27" },
// 	"jan31Nav": 122.82,
// 		"startDate": "2013-01-01",
// 		"fundType": "Equity",
// 		"fund_category": "Flexi Cap Fund",
// 		"plan": "GROWTH",
// 		"expenseRatio": "2.58",
// 		"expenseRatioData": "2021-11-30",
// 		"fundManager": "Prasanna Pathak; Ankit Tikmany"
// }
// }
