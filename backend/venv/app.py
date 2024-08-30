from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd

app = Flask(__name__)
CORS(app)
# Fix this FILE
stock_names = pd.read_csv("backend/venv/StockNames.csv")

@app.route('/price-chart-data/<ticker_symbol>/<data_range>', methods=['GET'])
def price_chart_data(ticker_symbol,data_range):

    interval = "1d"
    if data_range == "1d":
        interval = "1h"

    hist = yf.download(ticker_symbol,period=data_range,interval=interval)

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
            'pointRadius': 0,
            'borderWidth' : 2
        }]
    }
    return jsonify(data)

@app.route('/pe-chart-data/<ticker_symbol>/<data_range>', methods=['GET'])
def pe_chart_data(ticker_symbol,data_range):

    interval = "1d"
    if data_range == "1d":
        interval = "1h"

    hist = yf.download(ticker_symbol,period=data_range,interval=interval)

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
            'pointRadius': 0,
            'borderWidth' : 2
        }]
    }
    return jsonify(data)

@app.route('/search-result/<search_keyword>', methods=['GET'])
def search_result(search_keyword):
    filtered_stocks = stock_names[stock_names["Name"].str.contains(search_keyword, case=False, na=False)]
    result = filtered_stocks[["Symbol", "CompanyName"]]
    result_list = result.to_dict(orient='records')
    return jsonify(result_list)
    
@app.route('/get-name/<search_keyword>', methods=['GET'])
def get_name(search_keyword):
    company_name = stock_names[stock_names["Symbol"] == search_keyword].iloc[0]["CompanyName"]
    c_name = {"CompanyName" : company_name}
    return jsonify(c_name)
    
@app.route('/price-summary/<ticker_symbol>',methods = ["GET"])
def price_summary(ticker_symbol):
    ticker = yf.Ticker(ticker_symbol)
    ticker_1d = ticker.history(period="1d")
    to_return = {
            "Today High" : round(ticker_1d['High'][0],2),
            "Today Low" : round(ticker_1d['Low'][0],2),
            "52W High" : round(ticker.info["fiftyTwoWeekHigh"],2),
            "52W Low" : round(ticker.info['fiftyTwoWeekLow'],2)
        }
    return jsonify(to_return)

@app.route('/company-essentials/<ticker_symbol>',methods = ["GET"])
def company_essentials(ticker_symbol):
    ticker = yf.Ticker(ticker_symbol)
    info = ticker.info

    to_return = {
        "Market Cap (Cr.)": round(info.get('marketCap', 0) / 1e7, 2),
        "P/E Ratio": round(info.get('trailingPE', 0), 2),
        "P/B Ratio": round(info.get('priceToBook', 0), 2),
        "Sales Growth (%)": round(info.get('revenueGrowth', 0) * 100, 2),
        "Profit Growth (%)": round(info.get('earningsGrowth', 0) * 100, 2),
        "ROE (%)": round(info.get('returnOnEquity', 0) * 100, 2),
        "ROCE (%)": round(info.get('returnOnAssets', 0) * 100, 2),  # Approximation
        "Debt (Cr.)": round(info.get('totalDebt', 0) / 1e7, 2),
        "EPS (TTM)": round(info.get('trailingEps', 0), 2),
        "Cash (Cr.)": round(info.get('totalCash', 0) / 1e7, 2),
        "No. of Shares (Cr.)": round(info.get('sharesOutstanding', 0) / 1e7, 2),
        "Dividend Yield (%)": round(info.get('dividendYield', 0) * 100, 2)
    }

    return jsonify(to_return)


if __name__ == '__main__':
    app.run(debug=True)