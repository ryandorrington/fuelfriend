from fuelwatcher import FuelWatch

api = FuelWatch()

api.query(product=1, region=25)
north_river_parsed_query = api.get_json

api.query(product=1, region=26)
south_river_parsed_query = api.get_json

api.query(product=1, region=27)
east_hills_parsed_query = api.get_json


stations_file = open("stations.txt", "w")
stations_file.write(north_river_parsed_query)
stations_file.write(south_river_parsed_query)
stations_file.write(east_hills_parsed_query)
stations_file.close()