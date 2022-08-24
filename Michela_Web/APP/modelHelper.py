import pandas as pd
import datetime
import time
import pickle
import numpy as np

class ModelHelper():
    def __init__(self):
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

        return preds_singular[0]
