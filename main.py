import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neural_network import MLPRegressor

V1 = pd.read_csv('audi.csv')
V2 = pd.read_csv('bmw.csv')
V5 = pd.read_csv('ford.csv')
V6 = pd.read_csv('hyundi.csv')
V7 = pd.read_csv('merc.csv')
V8 = pd.read_csv('skoda.csv')
V9 = pd.read_csv('toyota.csv')
V12 = pd.read_csv('vauxhall.csv')
V13 = pd.read_csv('vw.csv')

datasets = [V1, V2, V5, V6, V7, V8, V9, V12, V13]
common_columns = {'transmission', 'fuelType', 'mileage', 'year', 'mpg', 'engineSize', 'price', 'model'}
for dataset in datasets:
    dataset.drop(columns=[col for col in dataset.columns if col not in common_columns], inplace=True)

df = pd.concat(datasets, ignore_index=True)
df.dropna(inplace=True)

encoder = LabelEncoder()
df['transmission'] = encoder.fit_transform(df['transmission'])
df['fuelType'] = encoder.fit_transform(df['fuelType'])
df['model'] = encoder.fit_transform(df['model'])

X = df.drop(columns=['mpg'])  
y = df['mpg']  

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
    
models = [
    ('Linear Regression', LinearRegression()),
    ('Random Forest', RandomForestRegressor()),
    ('Gradient Boosting', GradientBoostingRegressor()),
    ('Support Vector Regression', SVR()),
    ('K-Nearest Neighbors', KNeighborsRegressor()),
    ('MLP Regressor', MLPRegressor(hidden_layer_sizes=(200, 100, 50), activation='relu', solver='adam', max_iter=500))
]

results = []
with open('model_results.txt', 'w') as file:
    file.write("Model Evaluation Results:\n")
    file.write("Model, MAE, MSE, R2\n")
    for name, model in models:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        mae = mean_absolute_error(y_test, y_pred)
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        r2 = r2_score(y_test, y_pred)
        results.append((name, mae, mse, rmse, r2))
        file.write(f"{name}, {mae:.2f}, {mse:.2f}, {r2:.2f}\n")

results_df = pd.DataFrame(results, columns=['Model', 'MAE', 'MSE', 'RMSE', 'R2'])
print(results_df)

plt.figure(figsize=(15, 8))
metrics = ['MAE', 'MSE', 'RMSE', 'R2']
ylabels = ['Mean Absolute Error', 'Mean Squared Error', 'Root Mean Squared Error', 'R-Squared']

for i, (metric, ylabel) in enumerate(zip(metrics, ylabels)):
    plt.subplot(2, 2, i + 1)
    plt.bar(results_df['Model'], results_df[metric], color='skyblue')
    plt.ylabel(ylabel)
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()

plt.show()
