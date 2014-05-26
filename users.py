import random
from collections import defaultdict

class mongodb(object):
    from pymongo import MongoClient
    client = MongoClient()
    db = client['wow']
    users = db['users']
    servers = db['servers']

users_db = mongodb().users
servers_db = mongodb().servers
servers = 500
users = 1000000
max_servers_per_user = 10
users_for_server = defaultdict(lambda: set())
user_types = ['active', 'inactive']
max_time_ingame = 4000000
first_names = ['Anton', 'Aleksandr', 'Frensis', 'Charles', 'Erich', 'Ernest', 'Terry', 'Fedor', 'George', 'Oldos', 'Stanislav']
last_names = ['Chehov', 'Pushkin', 'Fitzgerald', 'Bukowski', 'Remark', 'Hemingway', 'Pratchett', 'Dostoevsky', 'Orwell', 'Haksli', 'Lem']
for user in range(users):
	print user
	name = random.choice(first_names) + " " + random.choice(last_names)
	email = '_'.join(name.lower().split()) + '@mail.ru'
	user_record = {'uid': user, 'type': random.choice(user_types), 'servers': set(), 'name': name, 'email': email, 'time_in_game': random.randint(60, max_time_ingame)}
	for user_acc in range(random.randint(1, max_servers_per_user)):
		server_id = random.randint(0, servers)
		user_record['servers'].add(server_id)
		users_for_server[server_id].add(user)
	user_record['servers'] = list(user_record['servers'])
	users_db.insert(user_record)

for server in range(servers):
	print server
	users = users_for_server[server]
	users_count = len(users)
	horde = random.randint(1, users_count)
	alliance = users_count - horde
	ram = random.randint(4, 32)
	hard = random.choice(['SATA', 'SAS'])
	server_record = {'sid': server, 'users': list(users), 'population': {'total': users_count, 'horde': horde, 'alliance': alliance}, 'tech': {'serial_number': server + 11, 'RAM': ram, 'HDD_type': hard}}
	servers_db.insert(server_record)
if __name__ == '__main__':
    pass