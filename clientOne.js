const mongoose = require("mongoose");
const ModelData = require("./ModelData");
const readLine = require("readline");
const { stdin: input, stdout: output } = require("process");
require("dotenv").config();

const rl = readLine.createInterface(input, output);

const createApp = async () => {
  // Подключение БД
  await mongoose
    .connect(process.env.TOKENBD)
    .then(() => console.log("DB OK"))
    .catch((err) => console.error(err));

  // Ввод данных из консоли
  rl.question("Please, input your title: ", async (title) => {
    // Сохранение данных в БД
    const data = new ModelData({ title });

    await data.save();

    console.log("Данные отправлены");

    rl.close();
  });
};

createApp();
