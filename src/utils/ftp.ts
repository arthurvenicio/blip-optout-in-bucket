import fs from "fs";
import Client from "ssh2-sftp-client";

export const SaveCsvFileOnFtp = async (
  fileName: string,
  fileNameDestination: string
) => {
  const sftpClient = new Client();
  const data = fs.createReadStream(fileName);

  await sftpClient.connect({
    host: process.env.FTP_HOST,
    port: 22,
    username: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
  });

  const list = await sftpClient.put(data, fileNameDestination);

  await sftpClient.end();
  console.log(__dirname + "optout.csv");
};
