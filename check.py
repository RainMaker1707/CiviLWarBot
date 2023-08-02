import argparse as arg
import json



if __name__ == "__main__":
    parser = arg.ArgumentParser(prog="Checker for DB and whitelist.txt")
    parser.add_argument('-f', '--file', help='File txt list style', type=str)
    parser.add_argument('-d', '--database', help='File json export from MongoDB', type=str)

    args = parser.parse_args()

    list_of_wl = []
    list_of_db = []
    master_acc = ["76561198152677868", "76535198103677868", "76561199496104001"]

    with open(args.file, 'r') as file:
        content = file.read()
        list_of_wl = content.strip().split('\n')

    with open(args.database, 'r') as export:
        content = json.load(export)
        for d in content:
            list_of_db.append(d.get("steamID"))
    
    for elem in list_of_wl:
        if elem not in list_of_db and not elem in master_acc:
            print(elem)


