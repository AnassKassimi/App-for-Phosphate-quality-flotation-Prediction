
from sklearn.externals import joblib
import pandas as pd
import numpy as np

from sklearn import model_selection
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


data=pd.read_csv('Final_data.csv')



X = data.drop(['Date','BPL_NF','CO2_NF','MgO_NF','Cd_NF_(ppm)'],1)
Y = data[['CO2_NF']]
scaler = StandardScaler()
X_scaled = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)
X_train, X_test, Y_train, Y_test = train_test_split(X_scaled, Y, test_size=0.2, random_state=30)
RandomForestRegModel= RandomForestRegressor(n_estimators=50, min_samples_leaf=1, max_features=None, n_jobs=-1,max_depth=8)
RandomForestRegModel.fit(X_train,Y_train)




joblib.dump(RandomForestRegModel, 'model_CO2.joblib')
