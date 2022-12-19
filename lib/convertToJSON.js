import { parse } from "csv-parse";

export function parser(){

	parse({columns: true}, function (err, records) {
		console.log("in the parse function")
		return records; 
	});
}
