from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta
import pandas as pd

app = Flask(__name__)
CORS(app)  # This enables cross-origin requests from your React frontend

stock_names = pd.read_csv("backend/venv/StockNames.csv")

@app.route('/chart-data/<ticker_symbol>', methods=['GET'])
def chart_data(ticker_symbol):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)

    # stock = yf.Ticker(ticker_symbol)
    # hist = stock.history(start=start_date, end=end_date)

    hist = yf.download(ticker_symbol,start=start_date,end=end_date)

    # Extract the dates (as strings) and closing prices from the history
    dates = [date for date in hist.index]
    closing_prices = list(hist['Close'])

    if closing_prices[0] - closing_prices[-1] < 0:
        borderColor = "#1de190"
        backgroundColor = "rgba(126, 238, 194, 0.4)"
    else:
        borderColor = "#dc3545"
        backgroundColor = "rgba(220, 53, 69, 0.4)"

    data = {
        'labels': dates,
        'datasets': [{
            'label': f"Closing Price of {ticker_symbol.upper()}",
            'data': closing_prices,
            'fill' : True,
            'borderColor': borderColor,
            'backgroundColor': backgroundColor,
            'tension': 0.4,
            'pointRadius': 0
        }]
    }
    return jsonify(data)

@app.route('/search-result/<search_keyword>', methods=['GET'])
def search_result(search_keyword):
    # print(search_keyword)
    # return stock_names[stock_names["Name"].str.contains(search_keyword,case=False, na=False)][["Symbol","Company Name"]]
    # return jsonify({"message": f"Search keyword received: {search_keyword}"})
    # return jsonify(stock_names)
    filtered_stocks = stock_names[stock_names["Name"].str.contains(search_keyword, case=False, na=False)]
    
    # Select only the Symbol and Company Name columns
    result = filtered_stocks[["Symbol", "CompanyName"]]
    
    # Convert DataFrame to a list of dictionaries (one for each row)
    result_list = result.to_dict(orient='records')
    
    # Return JSON response
    return jsonify(result_list)
    


if __name__ == '__main__':
    app.run(debug=True)