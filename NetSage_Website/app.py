"""NetSage AI deployable Flask backend (rule-based; no live AI model)."""
from pathlib import Path
import csv
import json
import sys
from flask import Flask, jsonify, request, send_from_directory
from werkzeug.exceptions import BadRequest, RequestEntityTooLarge

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / 'data'))
from netsage_checker import run as check_network

app = Flask(__name__, static_folder=None)
app.config['MAX_CONTENT_LENGTH'] = 128 * 1024


def read_csv(name):
    with (ROOT / 'data' / name).open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


@app.get('/api/health')
def health():
    return jsonify(status='ok', service='NetSage AI', backend='Python/Flask', checker='deterministic')


@app.get('/api/cases')
def cases():
    return jsonify(cases=read_csv('cases.csv'))


@app.get('/api/reviews')
def reviews():
    return jsonify(reviews=read_csv('ai_human_review.csv'))


@app.get('/api/stats')
def stats():
    cases_data = read_csv('cases.csv')
    reviews_data = read_csv('ai_human_review.csv')
    decisions = {k: sum(r.get('human_decision') == k for r in reviews_data) for k in ('Accepted', 'Edited', 'Rejected')}
    types = {}
    for case in cases_data:
        typ = case.get('issue_type', 'Unspecified')
        types[typ] = types.get(typ, 0) + 1
    return jsonify(total_cases=len(cases_data), high_severity=sum(c.get('severity') == 'High' for c in cases_data), decisions=decisions, issue_types=types)


@app.post('/api/check')
def check():
    if not request.is_json:
        return jsonify(error='Use Content-Type: application/json'), 415
    data = request.get_json(silent=False)
    if not isinstance(data, dict):
        return jsonify(error='Expected a JSON object'), 400
    for key in ('devices', 'interfaces', 'switches', 'routes'):
        collection = data.get(key, [])
        if not isinstance(collection, list) or len(collection) > 500:
            return jsonify(error=f'{key} must be an array of at most 500 entries'), 400
        if any(not isinstance(item, dict) for item in collection):
            return jsonify(error=f'{key} entries must be objects'), 400
    try:
        findings = check_network(data)
    except (ValueError, TypeError, KeyError) as e:
        return jsonify(error=f'Invalid configuration values: {e}'), 400
    return jsonify(findings=findings, count=len(findings), engine='python', ai_generated=False, human_review_required=True)


@app.errorhandler(BadRequest)
def invalid_json(e):
    return jsonify(error='Malformed JSON request'), 400


@app.errorhandler(RequestEntityTooLarge)
def too_large(e):
    return jsonify(error='JSON request exceeds 128 KB'), 413


@app.get('/')
def home():
    return send_from_directory(ROOT, 'index.html')


@app.get('/<path:filename>')
def static_files(filename):
    # Never serve Python source, configuration or private project data through a static URL.
    if filename not in ('app.js', 'styles.css', 'favicon.ico', 'data/project_data.js'):
        return jsonify(error='Not found'), 404
    return send_from_directory(ROOT, filename)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=False)
