import pandas as pd
import datetime
import time
import pickle
import numpy as np
from sqlalchemy import create_engine, inspect

class SQLHelper():
    def __init__(self):
        self.database_path = "restaurants.sqlite"
        self.conn_string = f"sqlite:///{self.database_path}"

        # Create an engine that can talk to the database
        self.engine = create_engine(self.conn_string)

    def getDataFromDatabase(self, city, state, DietaryRestrictionsType,GoodForMealType, is_mexican_restaurant, RestaurantsType):

        query = f"""
                        SELECT
              r.name,
              r.address,
              r.city,
              r.state,
              r.postal_code,
              r.review_count,
              r.stars
        FROM
            Restaurants as r
        INNER JOIN 
            RestaurantAttributes as ra
            ON r.business_id = ra.business_id        
        WHERE
            r.city in ({city})
            AND r.state in ({state})
            AND ra.DietaryRestrictionsType = {DietaryRestrictionsType}
            AND ra.GoodForMealType = {GoodForMealType}
            And r.is_mexican_restaurant = {is_mexican_restaurant}
            And ra.RestaurantsType = {RestaurantsType};
                    """

        print(query)

        df = pd.read_sql(query, con=self.engine)

        return df

