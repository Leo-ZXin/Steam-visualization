import numpy as np
import pandas as pd

df = pd.read_json('../Data/world_new.json')
# df = pd.DataFrame(df)

df['value'] = np.random.normal(500, 166.66, 177)
pd.set_option('display.max_rows', None)
print(df.to_string())

df.to_json('../Data/world_new.json', orient='records')
