const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

const SERVER_API_URL = "https://api.kuvera.in/mf/api/v4";
const GET_FUNDS = `${SERVER_API_URL}/fund_schemes/list.json?v=${moment().dayOfYear()}`;

const main = () => {
	axios.get(GET_FUNDS).then(async (response) => {
		const { data } = response;
		const actualFunds = JSON.stringify(await formatData(data));
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
	return fundList;
};

main();
