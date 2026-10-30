"""NetSage local web server. Run: python server.py; open http://localhost:8000"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json, os, sys
sys.path.insert(0, str(Path(__file__).parent / 'data'))
from netsage_checker import run
os.chdir(Path(__file__).resolve().parent)
class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path != '/api/check':
            self.send_error(404); return
        try:
            n=int(self.headers.get('Content-Length','0'))
            if n > 2_000_000 or n < 1: raise ValueError('Invalid content length')
            data=json.loads(self.rfile.read(n))
            if not isinstance(data,dict): raise ValueError('JSON object expected')
            for key in ('devices','interfaces','switches','routes'):
                if key in data and not isinstance(data[key],list): raise ValueError(key+' must be an array')
            body=json.dumps({'findings':run(data)}).encode('utf-8')
            self.send_response(200)
        except Exception as exc:
            body=json.dumps({'error':str(exc)}).encode('utf-8'); self.send_response(400)
        self.send_header('Content-Type','application/json; charset=utf-8')
        self.send_header('Content-Length',str(len(body)))
        self.end_headers(); self.wfile.write(body)
if __name__=='__main__':
    print('NetSage AI website: http://localhost:8000')
    ThreadingHTTPServer(('127.0.0.1',8000),Handler).serve_forever()
