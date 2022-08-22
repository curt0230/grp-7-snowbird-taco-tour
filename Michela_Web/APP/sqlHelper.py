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

    def getDataFromDatabase(self, city, state):

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
            city = ({city})
            AND state = ({state});
                    """

        print(query)

        df = pd.read_sql(query, con=self.engine)

        return df

