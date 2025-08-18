from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route("/")
def index():
    action = request.args.get("action", "")
    result = subprocess.run(
        ["./cgi-bin/app.cgi"], 
        env={"QUERY_STRING": f"action={action}"}, 
        capture_output=True, 
        text=True
    )
    return result.stdout

if __name__ == "__main__":
    app.run(debug=True)