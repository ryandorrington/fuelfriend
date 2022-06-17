from fuelwatcher import FuelWatch

api = FuelWatch()


########### Unleaded ############
api.query(product=1, region=25)
north_river_parsed_query = api.get_json
north_river_parsed_query = north_river_parsed_query[:-2] + ",\n"

api.query(product=1, region=26)
south_river_parsed_query = api.get_json
south_river_parsed_query = south_river_parsed_query[1:-2] + ",\n"

api.query(product=1, region=27)
east_hills_parsed_query = api.get_json
east_hills_parsed_query = east_hills_parsed_query[1:]


parsed_query = north_river_parsed_query + south_river_parsed_query + east_hills_parsed_query


stations_file = open("unleadedStations.json", "w")
stations_file.write(parsed_query)
stations_file.close()


########### Premium ############
api.query(product=2, region=25)
north_river_parsed_query = api.get_json
north_river_parsed_query = north_river_parsed_query[:-2] + ",\n"

api.query(product=2, region=26)
south_river_parsed_query = api.get_json
south_river_parsed_query = south_river_parsed_query[1:-2] + ",\n"

api.query(product=2, region=27)
east_hills_parsed_query = api.get_json
east_hills_parsed_query = east_hills_parsed_query[1:]


parsed_query = north_river_parsed_query + south_river_parsed_query + east_hills_parsed_query


stations_file = open("premiumStations.json", "w")
stations_file.write(parsed_query)
stations_file.close()


########### Diesel ############
api.query(product=4, region=25)
north_river_parsed_query = api.get_json
north_river_parsed_query = north_river_parsed_query[:-2] + ",\n"

api.query(product=4, region=26)
south_river_parsed_query = api.get_json
south_river_parsed_query = south_river_parsed_query[1:-2] + ",\n"

api.query(product=4, region=27)
east_hills_parsed_query = api.get_json
east_hills_parsed_query = east_hills_parsed_query[1:]


parsed_query = north_river_parsed_query + south_river_parsed_query + east_hills_parsed_query


stations_file = open("dieselStations.json", "w")
stations_file.write(parsed_query)
stations_file.close()
