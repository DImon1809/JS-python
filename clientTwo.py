from pymongo import MongoClient
from bson.json_util import dumps
from dotenv import load_dotenv
import os

load_dotenv()

def monitor_mongodb():
    try:
        # Подключение к MongoDB
        client = MongoClient(os.getenv("TOKENBD"))

        print("Мониторинг запущен...")

        db = client["myData"]
        collection = db["datas"]

        # Прослушивание коллекции на изменения
        change_stream = collection.watch()

        for change in change_stream:
            if "title" in change["fullDocument"]:
                temp = change["fullDocument"]["title"]
                print("Добавлен заголовок:", temp)
                collection.delete_one({"_id": change["fullDocument"]["_id"]})
            else:
                print("Данные удалены")

    except Exception as e:
        print(e)

if __name__ == "__main__":
    monitor_mongodb()