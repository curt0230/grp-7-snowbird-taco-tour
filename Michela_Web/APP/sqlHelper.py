import pandas as pd
import datetime
import time
import pickle
import numpy as np
from sqlalchemy import create_engine, inspect
import json

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
            ra.DietaryRestrictionsType IN ({DietaryRestrictionsType})
            AND ra.GoodForMealType IN ({GoodForMealType})
            And r.is_mexican_restaurant IN ({is_mexican_restaurant})
            And ra.RestaurantsType IN ({RestaurantsType})
                    """
        if (city !='"All Cities"'):
            query += f"AND r.city = {city}"
        if (state !='"All States"'):
            query += f"AND r.state = {state}"
        
        query += ";"    
        print(query)

        df = pd.read_sql(query, con=self.engine)
        return df

    
    def getcities(self):
        loc_query = f"""
                SELECT Distinct
                    r.city
                   
                FROM
                    Restaurants as r
                Order By r.city asc

                            """
        #create a df of all cities and states in df
        loc_df = pd.read_sql(loc_query, con=self.engine)
        
        return loc_df

    def getstates(self):
        loc_query = f"""
                SELECT Distinct
                    r.state
                   
                FROM
                    Restaurants as r
                Order By r.state asc

                            """
        #create a df of all cities and states in df
        loc_df = pd.read_sql(loc_query, con=self.engine)
        
        return loc_df
