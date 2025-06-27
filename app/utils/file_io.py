import os
import json

def load_data(file_path):
    if not os.path.exists(file_path):
        return[]
    else:
        with open(file_path,"r") as file:
            content = file.read().strip()
            if not content:
                return []
            return json.loads(content)
def save_data(file_path,data):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path,"w") as file:
        json.dump(data,file,indent=4)