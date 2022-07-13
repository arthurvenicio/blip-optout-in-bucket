import { createObjectCsvWriter } from "csv-writer";

export const WriteCsvFile = (data: any[], filename: string, header: any[]) => {
  const csvWriter = createObjectCsvWriter({
    path: filename,
    header,
  });

  csvWriter.writeRecords(data).then(() => {
    console.log("...Done");
  });
};
