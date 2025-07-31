from flask import Flask, render_template, request, jsonify
import requests
import json
from datetime import datetime
import os

app = Flask(__name__)

def get_client_info():
    """Получает информацию о клиенте"""
    # Получаем IP адрес
    if request.headers.get('X-Forwarded-For'):
        ip = request.headers.get('X-Forwarded-For').split(',')[0]
    elif request.headers.get('X-Real-IP'):
        ip = request.headers.get('X-Real-IP')
    else:
        ip = request.remote_addr
    
    # Получаем User-Agent
    user_agent = request.headers.get('User-Agent', 'Неизвестно')
    
    # Получаем язык браузера
    accept_language = request.headers.get('Accept-Language', 'Неизвестно')
    
    # Получаем реферер
    referer = request.headers.get('Referer', 'Прямой переход')
    
    # Получаем время запроса
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Пытаемся получить геолокацию по IP
    location_info = {}
    try:
        response = requests.get(f'http://ip-api.com/json/{ip}', timeout=5)
        if response.status_code == 200:
            location_info = response.json()
    except:
        location_info = {'status': 'fail', 'message': 'Не удалось получить информацию о местоположении'}
    
    return {
        'ip': ip,
        'user_agent': user_agent,
        'accept_language': accept_language,
        'referer': referer,
        'timestamp': timestamp,
        'location': location_info,
        'headers': dict(request.headers)
    }

@app.route('/')
def index():
    """Главная страница"""
    client_info = get_client_info()
    return render_template('index.html', info=client_info)

@app.route('/api/info')
def api_info():
    """API endpoint для получения информации в JSON формате"""
    client_info = get_client_info()
    return jsonify(client_info)

@app.route('/api/ip')
def api_ip():
    """API endpoint только для IP адреса"""
    if request.headers.get('X-Forwarded-For'):
        ip = request.headers.get('X-Forwarded-For').split(',')[0]
    elif request.headers.get('X-Real-IP'):
        ip = request.headers.get('X-Real-IP')
    else:
        ip = request.remote_addr
    return jsonify({'ip': ip})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)