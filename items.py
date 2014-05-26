import os
import json

def stick_items():
    import os
    with open('itemdata.json', 'a') as items:
      for file_name in os.listdir('./itemdata_4.3'):
          with open(os.path.join('./itemdata_4.3', file_name)) as item:
              items.write(item.read() + '\n')

def split_items():
    main_items = open('main_items.json', 'w')
    insert_items = open('insert_items.json', 'w')
    with open('itemdata.json') as items:
        cntr = 1
        for item in items.readlines():
            print cntr
            if cntr > 116679:
                insert_items.write(item)
            else:
                main_items.write(item)
            cntr += 1 
    main_items.close()
    insert_items.close()

class mongodb(object):
    from pymongo import MongoClient
    client = MongoClient()
    db = client['wow']
    items = db['items']

def fill_db():
    m = mongodb()
    items_store = m.items
    db_datafile = 'main_items.json' if os.path.exists('main_items.json') else 'itemdata.json'
    with open(db_datafile) as items:
        for item in items.readlines():
            item = json.loads(item)
            items_store.insert(item)

if __name__ == '__main__':
    # split_items()
    fill_db()