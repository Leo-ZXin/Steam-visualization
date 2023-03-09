import pandas as pd

data = pd.read_csv('../../Data/Games.csv')
data = pd.DataFrame(data).set_index('Rank')  # 各地区游戏销售总量
df = data.head(50)
df.to_json('./Games_new.json', orient='records')
print(df)