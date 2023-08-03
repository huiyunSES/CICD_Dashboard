import pandas as pd

def product_table_generator():
    
    products = ['ECP', 'Fabric', 'Platform', 'NE', 'DCIM']

    # Generate product IDs
    product_team_ids = [f"prodt-{str(i+1).zfill(6)}" for i in range(len(products))]

    data = {
        'product_team_id': product_team_ids,
        'product': products
    }
    df = pd.DataFrame(data)
    
    # Save the DataFrame to a CSV file
    filename = '../../data/product_team.csv'
    df.to_csv(filename, index=False)
    
    product_data = dict(zip(data['product_team_id'], data['product']))

   
    return product_data
