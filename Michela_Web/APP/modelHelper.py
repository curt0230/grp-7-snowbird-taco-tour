from multiprocessing import connection
import pandas as pd
import datetime
import time
import pickle
import numpy as np
import random

# Database libraries
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, Integer, Table, Column, MetaData

class ModelHelper():
    def __init__(self):
        self.database_path = "restaurants.sqlite"
        self.conn_string = f"sqlite:///{self.database_path}"

        # Create an engine that can talk to the database
        self.engine = create_engine(self.conn_string)
        pass

    def makePredictions(self, BusinessAcceptsCreditCards, GoodForKids, WheelchairAccessible, AlcoholId,BusinessParkingTypeId, RestaurantsTypeId, GoodForMealTypeId, latitude, longitude):


        input_pred = [[BusinessAcceptsCreditCards, GoodForKids, WheelchairAccessible, AlcoholId,BusinessParkingTypeId, RestaurantsTypeId, GoodForMealTypeId, latitude, longitude]]


        filename = 'finalized_model.sav'
        ada_load = pickle.load(open(filename, 'rb'))

        X = np.array(input_pred)
        preds = ada_load.predict_proba(X)
        preds_singular = ada_load.predict(X)
        result = preds_singular.item()
        pct = round(preds[:,preds_singular-2].item()*100,2)
        result_dict = {"pct": pct,"result":result}
        return result_dict



    def convert_bit(self, input_val):
        if input_val=='False':
            return 0
        elif input_val=='True':
            return 1
        else:
            pass
    def convert_id(self, input_val, category):
        # Select data into dataframe
        sql_stmt = r"select id from " + category + "Type where description == '" + input_val + "';"
        input_val_df = pd.read_sql(sql_stmt, con=self.engine)
        return input_val_df["id"][0] if len(input_val_df)>0 else 0

    def get_category(self, name):
        # Select data into dataframe
        type = f"select description from {name}"
        type_df = pd.read_sql(type, con=self.engine)
        return type_df["description"].to_json()

    def get_value(self, type):
        if type == 'lat':
            num = random.uniform(31.5, 37.5)
        elif type == 'long':
            num = random.uniform(-109.5, -113.5)
        else:
            num = "Try again numbskull"
        return num   
