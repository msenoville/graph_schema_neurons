from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl


httpd = HTTPServer(('localhost', 8002), SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket (httpd.socket,
        keyfile="ssl/key.pem",
        certfile='ssl/cert.pem', server_side=True)

httpd.serve_forever()
